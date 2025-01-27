import axios from "axios";
import { io } from "socket.io-client";
// Configuración global para la URL del servidor
const BASE_URL = "http://localhost:3030/api/crud";
const SOCKET_URL = "http://localhost:3030";
let socket = null; // Instancia de Socket.IO
// ✅ Función genérica para solicitudes CRUD
const enviarSolicitudCrud = async (metodo, tabla, value = null) => {
  try {
    const payload = { metodo, tabla, value };
    const response = await axios.post(BASE_URL, payload);
    console.log(`✅ Operación "${metodo}" completada:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `❌ Error en operación "${metodo}":`,
      error.response?.data || error.message
    );
    throw error; // Propaga el error para manejarlo en el frontend si es necesario
  }
};

// ✅ Funciones específicas basadas en la genérica
export const crearDocumento = async (tabla, value) => {
  console.log((tabla, value));
  return await enviarSolicitudCrud("crear_uno", tabla, value);
};

export const crearVariosDocumentos = async (tabla, value) => {
  return await enviarSolicitudCrud("crear_varios", tabla, value);
};

export const leerTabla = async (tabla) => {
  return await enviarSolicitudCrud("leer_tabla", tabla);
};

export const leerDocumentoPorId = async (tabla, id) => {
  return await enviarSolicitudCrud("leer_id_tabla", tabla, id);
};

export const actualizarDocumento = async (tabla, id, data) => {
  const value = { id, data };
  return await enviarSolicitudCrud("actualizar_uno", tabla, value);
};

export const actualizarVariosDocumentos = async (tabla, filtro, data) => {
  const value = { filtro, data };
  return await enviarSolicitudCrud("actualizar_varios", tabla, value);
};

export const eliminarDocumento = async (tabla, id) => {
  return await enviarSolicitudCrud("eliminar_uno", tabla, id);
};

export const eliminarVariosDocumentos = async (tabla, filtro) => {
  return await enviarSolicitudCrud("eliminar_varios", tabla, filtro);
};

export const eliminarTodo = async (tabla) => {
  return await enviarSolicitudCrud("eliminar_todo", tabla);
};

export const insertar_uno = async (tabla, id, data) => {
  const value = { id, data };
  return await enviarSolicitudCrud("insertar_uno", tabla, value);
};

// ✅ Escucha activa mediante Socket.IO
export const iniciarEscuchaActiva = (tabla, callback) => {
  if (!socket) {
    socket = io(SOCKET_URL); // Conexión al servidor de Socket.IO
  }

  // Escuchar eventos de actualización para la tabla especificada
  socket.on(`${tabla}-actualizacion`, (data) => {
    callback(data); // Llamar a la función proporcionada con los datos actualizados
  });

  // Limpiar la escucha al desconectar
  socket.on("disconnect", () => {
    console.warn("❌ Desconectado del servidor de Socket.IO");
  });
};

// ✅ Desconectar el Socket.IO cuando sea necesario
export const detenerEscuchaActiva = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("✅ Conexión con Socket.IO cerrada.");
  }
};
