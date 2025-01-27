"use strict";

import {
  app,
  protocol,
  BrowserWindow,
  Menu,
  nativeImage,
  Tray,
  dialog,
  ipcMain,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { autoUpdater } from "electron-updater";
import path from "path";
import os from "os";
import {
  iniciarServidor,
  detenerServidor,
  obtenerPuerto,
  cambiarPuerto,
} from "./backend/servidor";

const isDevelopment = process.env.NODE_ENV !== "production";
let tray = null;
let mainWindow = null;
let servidorActivo = false;
let puertoActual = obtenerPuerto();

const appIconPath = isDevelopment
  ? path.join(__dirname, "public", "favicon.png") // Ruta en desarrollo
  : path.join(process.resourcesPath, "favicon.png"); // Ruta empaquetada en producción
console.log(appIconPath);
// ✅ Prevenir múltiples instancias
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
app.setLoginItemSettings({
  openAtLogin: true, // Iniciar automáticamente con Windows
  openAsHidden: false, // No iniciar minimizado
});
// ✅ Registrar esquemas antes de que la app esté lista
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

// ✅ Obtener la IP Local
function obtenerIPLocal() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
}

// ✅ Crear la bandeja del sistema con un icono dinámico
function createTray() {
  if (!tray) {
    tray = new Tray(nativeImage.createFromPath(appIconPath));
  }

  const contextMenu = Menu.buildFromTemplate([
    { label: "Abrir", click: () => mainWindow.show() },
    { label: "Salir", click: () => app.quit() },
  ]);

  tray.setToolTip("Estado de Conexión");
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    mainWindow.show();
  });
}

// ✅ Control de cierre de ventanas
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// ✅ Crear Ventana Principal y Menú Interactivo
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: appIconPath,
    title: "Domotica Sis",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol("app");
    mainWindow.loadURL("app://./index.html");
    configurarActualizaciones();
  }

  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.key === "F12" && input.type === "keyDown") {
      mainWindow.webContents.openDevTools({ mode: "detach" });
    }
  });
  // ✅ Evitar que la ventana se cierre al hacer clic en la "X"
  mainWindow.on("close", (event) => {
    event.preventDefault();
    mainWindow.hide(); // Ocultar ventana, no cerrar
    if (!tray) createTray();
  });

  // ✅ Mostrar ventana al hacer doble clic en el icono de la bandeja
  mainWindow.on("minimize", (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  const menuTemplate = [
    {
      label: "Servidor",
      submenu: [
        {
          label: "Estado del Servidor",
          click: () => {
            const estado = servidorActivo ? "Activo ✅" : "Inactivo ❌";
            const ip = obtenerIPLocal();
            const puerto = obtenerPuerto();
            dialog.showMessageBox({
              type: "info",
              message: `Estado: ${estado}\nIP: ${ip}\nPuerto: ${puerto}`,
            });
          },
        },
        {
          label: "Cambiar Puerto",
          click: createPortModal,
        },
        {
          label: "Encender Servidor",
          click: async () => {
            iniciarServidor();
            servidorActivo = true;
            dialog.showMessageBox({
              type: "info",
              message: `Servidor activo en ${obtenerIPLocal()}:${puertoActual}`,
            });
          },
        },
        {
          label: "Apagar Servidor",
          click: () => {
            detenerServidor();
            servidorActivo = false;
            dialog.showMessageBox({
              type: "info",
              message: "Servidor detenido.",
            });
          },
        },
      ],
    },
    {
      label: "Aplicación",
      submenu: [{ role: "reload" }, { role: "quit" }],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

// ✅ Inicializar la aplicación con MongoDB Embebido solo en producción
app.on("ready", async () => {
  try {
    iniciarServidor();
    servidorActivo = true;
    if (isDevelopment && !process.env.IS_TEST) {
      //await installExtension(VUEJS_DEVTOOLS);
    }
    createWindow();
  } catch (error) {
    console.error("❌ Error al iniciar la aplicación:", error);
  }
});
// ✅ Control de cierre de ventanas
app.on("window-all-closed", (event) => {
  event.preventDefault(); // Evitar el cierre completo
  if (process.platform !== "darwin") {
    mainWindow.hide();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// ✅ Crear la ventana modal para cambiar puerto
function createPortModal() {
  const modal = new BrowserWindow({
    width: 400,
    height: 200,
    modal: true,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  modal.loadURL(`data:text/html;charset=UTF-8,
    <html>
      <body>
        <h2>Ingrese el nuevo puerto</h2>
        <input id="puertoInput" type="number" value="${puertoActual}" />
        <button onclick="sendNewPort()">Cambiar Puerto</button>
        <script>
          const { ipcRenderer } = require('electron');
          function sendNewPort() {
            const newPort = document.getElementById('puertoInput').value;
            ipcRenderer.send('update-port', newPort);
          }
        </script>
      </body>
    </html>`);
}
ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});
// ✅ Escuchar evento de cambio de puerto
ipcMain.on("update-port", (event, newPort) => {
  if (newPort) {
    cambiarPuerto(parseInt(newPort));
    puertoActual = newPort;
    dialog.showMessageBox({
      type: "info",
      message: `Puerto cambiado a: ${newPort}`,
    });
  }
});

function configurarActualizaciones() {
  // Comprobar actualizaciones y notificar automáticamente
  autoUpdater.checkForUpdatesAndNotify();

  // Cuando hay una actualización disponible
  autoUpdater.on("update-available", () => {
    if (mainWindow) {
      mainWindow.webContents.send("update_available");
    }
  });

  // Cuando la actualización se ha descargado
  autoUpdater.on("update-downloaded", () => {
    if (mainWindow) {
      mainWindow.webContents.send("update_downloaded");
    }
  });

  // Manejo de errores durante la actualización
  autoUpdater.on("error", (error) => {
    if (mainWindow) {
      mainWindow.webContents.send(
        "update_error",
        error.message || "Error desconocido"
      );
    }
    console.error("❌ Error en autoUpdater:", error);
  });

  // Información adicional (opcional): progreso de la descarga
  autoUpdater.on("download-progress", (progressObj) => {
    if (mainWindow) {
      const progressInfo = {
        percent: progressObj.percent.toFixed(2),
        transferred: progressObj.transferred,
        total: progressObj.total,
      };
      mainWindow.webContents.send("update_progress", progressInfo);
    }
  });
}
