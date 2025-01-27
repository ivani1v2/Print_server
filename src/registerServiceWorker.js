/* eslint-disable no-console */
import { register } from "register-service-worker";

// ✅ Solo registrar Service Worker si es https o en modo desarrollo
if (
  window.location.protocol.includes("https") ||
  process.env.NODE_ENV === "development"
) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log("✅ Service Worker activo y listo.");
    },
    registered() {
      console.log("✅ Service Worker registrado correctamente.");
    },
    cached() {
      console.log("✅ Contenido cacheado para uso offline.");
    },
    updatefound() {
      console.log("🆕 Nuevo contenido encontrado y descargando.");
    },
    updated() {
      console.log("🔄 Nuevo contenido disponible. Por favor, recargar.");
    },
    offline() {
      console.warn("⚠️ Estás trabajando sin conexión a Internet.");
    },
    error(error) {
      console.error("❌ Error durante el registro del Service Worker:", error);
    },
  });
} else {
  console.warn(
    "⚠️ Service Worker deshabilitado debido al protocolo no seguro (app://)."
  );
}
