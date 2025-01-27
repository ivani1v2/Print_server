const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: "src/background.js", // ✅ Archivo principal de entrada
      builderOptions: {
        productName: "Domotica Sis",
        appId: "com.domotica.sis",
        publish: ["github"],
        directories: {
          output: "dist_electron",
        },
        files: ["**/*", "bin/**/*"],
        extraResources: [
          {
            from: "public/favicon.png", // Ruta del icono a empaquetar
            to: "favicon.png", // Ruta dentro de la carpeta de producción
          },
          {
            from: "bin/",
            to: "bin/",
            filter: ["**/*"],
          },
          {
            from: "data/mongo-data", // ✅ Asegurarse de incluir la carpeta en la instalación
            to: "data/mongo-data",
          },
        ],
        win: {
          icon: "public/favicon.png",
          target: ["nsis"],
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          runAfterFinish: true,
        },
      },
    },
  },
});
