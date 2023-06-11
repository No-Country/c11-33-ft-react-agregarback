import fs, { readdirSync } from 'fs';

/**
 * Mapea todos los elementos dentro de una carpeta y sus subcarpetas.
 * @param {string} folderPath La ruta de la carpeta a mapear.
 * @returns {Array<string>} Un array con las rutas de todos los elementos dentro de la carpeta y sus subcarpetas.
 */

function sortNumericPaths(array) {
  return array.sort((a, b) => {
    const regex = /(\d+)/g;
    const aMatches = a.match(regex);
    const bMatches = b.match(regex);
    for (let i = 0; i < Math.min(aMatches.length, bMatches.length); i++) {
      const aMatch = Number.parseInt(aMatches[i]);
      const bMatch = Number.parseInt(bMatches[i]);
      if (aMatch < bMatch) {
        return -1;
      } else if (aMatch > bMatch) {
        return 1;
      }
    }
    return 0;
  });
}


function mapAllElements(folderPath) {
  const result = [];
  const elements = readdirSync(folderPath, { withFileTypes: true });

  // Ordena las carpetas numéricamente según su nombre.
  elements
    .filter(element => element.isDirectory())
    .sort((a, b) => Number.parseInt(a.name) - Number.parseInt(b.name))
    .forEach(folder => {
      const folderPathWithFolderName = `${folderPath}/${folder.name}`;
      // Mapea los elementos dentro de la carpeta y los añade al resultado.
      readdirSync(folderPathWithFolderName, { withFileTypes: true })
        .filter(element => element.isFile())
        .forEach(element => {
          const elementPath = `${folder.name}/${element.name}`;
          result.push(`exercises/${elementPath}`);
        });
    });

  return result;
}

function writeArrayToFile(array, filePath, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath, options);
    stream.on('open', () => {
      const urls = [];
      array.forEach(element => {
        urls.push(`'${element}'`);
      });
      stream.write(`const urls = [${urls.join(', ')}];\n`);
      stream.end();
    });
    stream.on('error', error => {
      reject(error);
    });
    stream.on('finish', () => {
      resolve();
    });
  });
}

// Ejemplo de uso
const folderPath = '../../public/exercises';
const filePath = './urls.js'
const elements = mapAllElements(folderPath);
const orden = sortNumericPaths(elements);
console.log(`Las rutas de los elementos dentro de la carpeta ${orden} son:`, elements);
console.log('-------------');
console.log('----Creando archivo----');
console.log('-------------');

writeArrayToFile(orden, filePath)
  .then(() => {
    console.log(`El archivo ${filePath} se ha creado correctamente.`);
  })
  .catch(error => {
    console.error(`Ha ocurrido un error al crear el archivo ${filePath}:`, error);
  });