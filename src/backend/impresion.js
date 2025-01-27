import { print } from "pdf-to-printer";
import fs from "fs";
import path from "path";
import os from "os";
export const imprimir_doc = async (file, printerList) => {
  // Guardar temporalmente el archivo PDF

  // Ruta al ejecutable de SumatraPDF desde la carpeta bin
  const getSumatraPDFPath = () => {
    const basePath =
      process.env.NODE_ENV === "production"
        ? path.join(process.resourcesPath, "bin")
        : path.join(__dirname, "bin");

    return path.join(basePath, "SumatraPDF.exe");
  };

  const tempFilePath = path.join(os.tmpdir(), `temp_${Date.now()}.pdf`);
  fs.writeFileSync(tempFilePath, file);
  // Opciones de impresión para mantener el tamaño del PDF
  const printOptions = {
    scale: "noscale", // Ajusta el tamaño del PDF al papel, manteniendo el aspecto
    silent: true, // Desactiva los cuadros de diálogo
    sumatraPdfPath: getSumatraPDFPath(),
  };

  // Imprimir el archivo en cada impresora
  for (const printer of printerList) {
    try {
      await print(tempFilePath, { ...printOptions, printer });
      console.log(`Documento enviado a la impresora ${printer}`);
    } catch (err) {
      console.error(
        `Error al imprimir en la impresora ${printer}:`,
        err.message
      );
    }
  }
  // Eliminar el archivo temporal
  fs.unlinkSync(tempFilePath);
};
