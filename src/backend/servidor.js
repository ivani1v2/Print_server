import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import os from "os";
import path from "path";
import { getPrinters, print } from "pdf-to-printer";
import http from "http"; // Necesario para integrar con Socket.IO
import { Server as SocketIOServer } from "socket.io";
const {
  startMongoDB,
  crear_uno,
  crear_varios,
  leer_tabla,
  leer_id_tabla,
  leer_con_filtro,
  actualizar_uno,
  observarColeccion,
  actualizar_varios,
  upsert_uno,
  eliminar_uno,
  eliminar_varios,
  eliminar_todo,
} = require("./mongodb");
const { imprimir_doc } = require("./impresion");
import cors from "cors";
// ✅ Importar `electron` solo cuando esté disponible
let electronApp;
try {
  electronApp = require("electron").app;
} catch (error) {
  console.warn("⚠️ Ejecutando sin Electron");
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.raw({ type: "application/pdf", limit: "10mb" }));
app.use(express.json());
let serve = null;
let io;
const isDevelopment = process.env.NODE_ENV !== "production"; // ✅ Definido aquí

// ✅ Usar una ruta segura para producción
const configPath = isDevelopment
  ? path.join(__dirname, "config.txt")
  : electronApp
  ? path.join(electronApp.getPath("userData"), "config.txt")
  : path.join(__dirname, "config.txt"); // Fallback si Electron no está disponible

// ✅ Cargar puerto desde archivo de configuración
let puertoActual = cargarPuertoDesdeArchivo();

// ✅ Función para leer el puerto desde el archivo
function cargarPuertoDesdeArchivo() {
  try {
    if (fs.existsSync(configPath)) {
      const data = fs.readFileSync(configPath, "utf-8");
      const puerto = parseInt(data.trim(), 10);
      if (!isNaN(puerto)) {
        console.log(`📦 Puerto cargado desde archivo: ${puerto}`);
        return puerto;
      }
    }
  } catch (error) {
    console.error("❌ Error al cargar el archivo de configuración:", error);
  }
  console.log(
    "📦 No se encontró archivo de configuración. Usando puerto por defecto: 3000"
  );
  return 3030; // Puerto por defecto
}

// ✅ Guardar puerto en el archivo de configuración
function guardarPuertoEnArchivo(nuevoPuerto) {
  try {
    fs.writeFileSync(configPath, nuevoPuerto.toString(), "utf-8");
    console.log(`📂 Ruta completa del archivo config.txt: ${configPath}`);
    console.log(`✅ Puerto guardado en archivo: ${nuevoPuerto}`);
  } catch (error) {
    console.error("❌ Error al guardar el puerto en archivo:", error);
  }
}

// ✅ Iniciar Servidor
export const iniciarServidor = () => {
  if (!serve) {
    startMongoDB();
    serve = app.listen(puertoActual, () => {
      console.log(`✅ Servidor activo en http://localhost:${puertoActual}`);
    });
    // Vincular Socket.IO al servidor existente
    // Configura Socket.IO con CORS
    io = new SocketIOServer(serve, {
      cors: {
        origin: "*", // Cambia a tu dominio permitido
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
      },
    });
    // Configuración de eventos de Socket.IO
    io.on("connection", (socket) => {
      console.log(`⚡ Cliente conectado: ${socket.id}`);

      // Escuchar mensajes del cliente
      socket.on("mensaje-cliente", (data) => {
        console.log(`Mensaje recibido: ${data}`);
        // Emitir respuesta al cliente
        socket.emit("mensaje-servidor", `Hola, recibí tu mensaje: ${data}`);
      });

      // Manejo de desconexión
      socket.on("disconnect", () => {
        console.log(`❌ Cliente desconectado: ${socket.id}`);
      });
    });
  } else {
    console.log("⚠️ El servidor ya está en ejecución.");
  }
};

// ✅ Detener Servidor
export const detenerServidor = () => {
  if (serve) {
    serve.close(() => {
      console.log("❌ Servidor detenido");
      serve = null;
    });
  } else {
    console.log("⚠️ El servidor no estaba en ejecución.");
  }
};

// ✅ Cambiar Puerto del Servidor y Guardarlo en Configuración
export const cambiarPuerto = (nuevoPuerto) => {
  if (serve) detenerServidor(); // Detiene el servidor antes de cambiar
  puertoActual = nuevoPuerto;
  guardarPuertoEnArchivo(nuevoPuerto); // Guarda el nuevo puerto en el archivo
  iniciarServidor();
};

// ✅ Obtener Puerto Actual
export const obtenerPuerto = () => puertoActual;
// Endpoint básico
app.get("/", (req, res) => {
  res.send("Servidor funcionando con Socket.IO");
});
// Ruta para recibir el ArrayBuffer y enviarlo a la impresora
app.post("/print", async (req, res) => {
  try {
    const { printernames } = req.headers;

    // Valida los parámetros

    if (!printernames) {
      return res.status(400).json({
        message:
          "Faltan los nombres de las impresoras en el encabezado (printerNames).",
      });
    }

    // Convierte los nombres de impresoras en un array
    const printerList = JSON.parse(printernames);

    if (!Array.isArray(printerList) || printerList.length === 0) {
      return res.status(400).json({
        message:
          "El encabezado printerNames debe ser un array con al menos una impresora.",
      });
    }

    // Accede al archivo enviado como ArrayBuffer
    const file = req.body;

    await imprimir_doc(file, printerList);

    res.status(200).json({
      message: "Documento enviado a las impresoras seleccionadas.",
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      message: "Error interno al procesar el documento.",
      error: error.message,
    });
  }
});

app.get("/api/impresoras", async (req, res) => {
  try {
    const printers = await getPrinters();
    res.status(200).json(printers);
  } catch (error) {
    console.error("❌ Error al obtener la lista de impresoras:", error);
    res.status(500).json({ error: "No se pudieron obtener las impresoras" });
  }
});
app.get("/api/server-info", (req, res) => {
  try {
    const interfaces = os.networkInterfaces();
    let ipAddress = "127.0.0.1"; // IP predeterminada

    // Buscar la primera IP IPv4 válida
    for (const interfaceName in interfaces) {
      for (const iface of interfaces[interfaceName]) {
        if (iface.family === "IPv4" && !iface.internal) {
          ipAddress = iface.address;
          break;
        }
      }
    }

    res.status(200).json({
      ip: ipAddress,
      port: 3030, // Puerto del servidor
    });
  } catch (error) {
    console.error("❌ Error al obtener información del servidor:", error);
    res
      .status(500)
      .json({ error: "No se pudo obtener información del servidor" });
  }
});

// ✅ Notificar cambios en tablas
const notificarCambio = async (tabla) => {
  try {
    const datos = await leer_tabla(tabla);
    io.emit(`${tabla}-actualizacion`, datos); // Emitir cambios a los clientes conectados
  } catch (error) {
    console.error(`❌ Error al emitir cambios para la tabla ${tabla}:`, error);
  }
};
// ✅ Endpoint CRUD MONGO
app.post("/api/crud", async (req, res) => {
  try {
    const data = req.body;
    let result = "";

    switch (data.metodo) {
      case "crear_uno":
        result = await crear_uno(data.tabla, data.value);
        notificarCambio(data.tabla); // Notificar cambios
        res.status(201).json({ message: "Documento creado", result });
        break;

      case "crear_varios":
        result = await crear_varios(data.tabla, data.value);
        notificarCambio(data.tabla); // Notificar cambios
        res.status(201).json({ message: "Documentos creados", result });
        break;

      case "leer_tabla":
        result = await leer_tabla(data.tabla);
        res.status(200).json({ message: "Lectura completa", result });
        break;

      case "leer_id_tabla":
        result = await leer_id_tabla(data.tabla, data.value);
        res.status(200).json({ message: "Documento encontrado", result });
        break;

      case "leer_con_filtro":
        result = await leer_con_filtro(data.tabla, data.value);
        res.status(200).json({ message: "Documentos encontrados", result });
        break;

      case "actualizar_uno":
        result = await actualizar_uno(
          data.tabla,
          data.value.id,
          data.value.data
        );
        notificarCambio(data.tabla); // Notificar cambios
        res.status(200).json({ message: "Documento actualizado", result });
        break;
      case "insertar_uno":
        result = await upsert_uno(data.tabla, data.value.id, data.value.data);
        notificarCambio(data.tabla); // Notificar cambios
        res.status(200).json({ message: "Documento actualizado", result });
        break;
      case "eliminar_uno":
        result = await eliminar_uno(data.tabla, data.value);
        notificarCambio(data.tabla); // Notificar cambios
        res.status(200).json({ message: "Documento eliminado", result });
        break;

      default:
        res.status(400).json({ error: "Método no soportado" });
        break;
    }
  } catch (error) {
    console.error("❌ Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

iniciarServidor();
