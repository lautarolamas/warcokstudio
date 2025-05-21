const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../public/mockups');
const exts = ['.png', '.jpg', '.jpeg', '.JPG', '.PNG', '.JPEG'];

async function optimizeImage(filePath) {
  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  await sharp(filePath)
    .webp({ quality: 80 })
    .toFile(webpPath);
  fs.unlinkSync(filePath); // Elimina el original
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (exts.includes(path.extname(fullPath))) {
      optimizeImage(fullPath);
    }
  });
}

walkDir(rootDir); 