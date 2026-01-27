const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/cartel-magdalena-2026.jpg');
const outputPath = path.join(__dirname, '../public/images/cartel-magdalena-2026-compressed.jpg');

async function compressImage() {
  try {
    console.log('Comprimiendo imagen del cartel de Magdalena 2026...');
    
    const inputStats = fs.statSync(inputPath);
    console.log(`Tamaño original: ${(inputStats.size / 1024).toFixed(2)} KB`);

    await sharp(inputPath)
      .resize(1600, null, { // Ancho máximo de 1600px para mejor calidad
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({
        quality: 95, // Calidad muy alta
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    console.log(`Tamaño comprimido: ${(outputStats.size / 1024).toFixed(2)} KB`);
    console.log(`Reducción: ${((1 - outputStats.size / inputStats.size) * 100).toFixed(2)}%`);
    
    // Reemplazar el archivo original con el comprimido
    fs.unlinkSync(inputPath);
    fs.renameSync(outputPath, inputPath);
    
    console.log('✅ Imagen comprimida y reemplazada exitosamente');
  } catch (error) {
    console.error('❌ Error al comprimir la imagen:', error);
    process.exit(1);
  }
}

compressImage();
