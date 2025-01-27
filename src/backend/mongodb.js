const mongoose = require("mongoose");
const { exec } = require("child_process");
import path from "path";
import { app } from "electron";
const fs = require("fs");
// Definir rutas para MongoDB Embebido
const mongoPath = path.join(__dirname, "../bin/mongod.exe");
const dbPath = app.getPath("userData") + "/mongo-data";
const logFilePath = path.join(app.getPath("userData"), "mongo-error.log");
const isDevelopment = process.env.NODE_ENV !== "production"; // ✅ Definido aquí
// ✅ Función para escribir en archivo de log
const writeLog = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, "utf8");
};
const ensureMongoDataPath = () => {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath, { recursive: true });
      console.log("✅ Carpeta 'mongo-data' creada exitosamente.");
    } else {
      console.log("✅ La carpeta 'mongo-data' ya existe.");
    }
  } catch (error) {
    console.error("❌ Error al crear la carpeta mongo-data:", error);
  }
};
// ✅ Iniciar MongoDB según el entorno
export const startMongoDB = () => {
  ensureMongoDataPath();
  if (isDevelopment) {
    console.log("🛠️ Modo Desarrollo: Conectando a MongoDB Local.");
  } else {
    console.log("🚀 Producción: Iniciando MongoDB Embebido.");
    exec(`"${mongoPath}" --dbpath "${dbPath}" --port 27017`, (err) => {
      if (err) {
        writeLog(err);
        console.error("❌ Error al iniciar MongoDB Embebido:", err);
      } else {
        writeLog("✅ MongoDB Embebido iniciado.");
        console.log("✅ MongoDB Embebido iniciado.");
      }
    });
  }
};

// ✅ Conexión con MongoDB
mongoose
  .connect("mongodb://localhost:27017/restaurant_local_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("❌ Error de conexión:", err);
  });

const db = mongoose.connection;

// ✅ Configuración para observar cambios en una colección
const coleccionesObservadas = {};

export const observarColeccion = (tabla, io) => {
  if (coleccionesObservadas[tabla]) {
    console.log(`⚠️ La colección "${tabla}" ya está siendo observada.`);
    return;
  }

  const changeStream = db.collection(tabla).watch();
  coleccionesObservadas[tabla] = changeStream;

  changeStream.on("change", (change) => {
    console.log(`🔄 Cambio detectado en la colección "${tabla}":`, change);
    if (io) {
      io.emit(`${tabla}-actualizacion`, change);
    }
  });

  console.log(`✅ Observando cambios en la colección "${tabla}".`);
};

// ✅ Crear un documento
export const crear_uno = async (tabla, data) => {
  const dbCollection = mongoose.connection.collection(tabla);
  return await dbCollection.insertOne(data);
};

// ✅ Crear múltiples documentos
export const crear_varios = async (tabla, data) => {
  const dbCollection = mongoose.connection.collection(tabla);
  return await dbCollection.insertMany(data);
};

// ✅ Leer todos los documentos de una tabla
export const leer_tabla = async (tabla) => {
  const dbCollection = mongoose.connection.collection(tabla);
  return await dbCollection.find().toArray();
};

// ✅ Leer un documento por ID
export const leer_id_tabla = async (tabla, id) => {
  const dbCollection = mongoose.connection.collection(tabla);
  return await dbCollection.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });
};

// ✅ Leer documentos con filtro
export const leer_con_filtro = async (tabla, filtro) => {
  const dbCollection = mongoose.connection.collection(tabla);
  return await dbCollection.find(filtro).toArray();
};

// ✅ Actualizar un documento por ID
export const actualizar_uno = async (tabla, id, data) => {
  console.log(tabla, id, data);
  const dbCollection = mongoose.connection.collection(tabla);
  return await dbCollection.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: data }
  );
};

// ✅ Actualizar múltiples documentos con filtro
export const actualizar_varios = async (tabla, filtro, data) => {
  const dbCollection = mongoose.connection.collection(tabla);
  return await dbCollection.updateMany(filtro, { $set: data });
};

// ✅ Actualizar o crear (upsert) un documento por ID
export const upsert_uno = async (tabla, id, data) => {
  const dbCollection = mongoose.connection.collection(tabla);
  return await dbCollection.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: data },
    { upsert: true }
  );
};

// ✅ Eliminar un documento por ID
export const eliminar_uno = async (tabla, id) => {
  const dbCollection = mongoose.connection.collection(tabla);
  console.log(tabla, id);
  let resp = await dbCollection.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  if (resp.deletedCount === 0) {
    resp = await dbCollection.deleteOne({
      _id: id,
    });
  }
  return resp;
};

// ✅ Eliminar múltiples documentos con filtro
export const eliminar_varios = async (tabla, filtro) => {
  const dbCollection = mongoose.connection.collection(tabla);
  return await dbCollection.deleteMany(filtro);
};

// ✅ Eliminar todos los documentos de una tabla
export const eliminar_todo = async (tabla) => {
  const dbCollection = mongoose.connection.collection(tabla);
  return await dbCollection.deleteMany({});
};

// ✅ Exportar funciones
exports = {
  mongoose,
  observarColeccion,
  crear_uno,
  crear_varios,
  leer_tabla,
  leer_id_tabla,
  leer_con_filtro,
  actualizar_uno,
  actualizar_varios,
  upsert_uno,
  eliminar_uno,
  eliminar_varios,
  eliminar_todo,
};
