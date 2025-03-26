const fs = require('fs');
const path = require('path');

const deleteTempFiles = ()=>{
    const uploadFolder = path.join(__dirname, '../public/uploads');
    console.log(uploadFolder)

    fs.readdir(uploadFolder, (err, files) => {
        if (err) {
          console.log('No se pudo leer la carpeta');
        }
    
        // Si la carpeta está vacía
        if (files.length === 0) {
          console.log('No hay archivos para borrar');
        }
    
        let deletePromises = files.map(file => {
          const filePath = path.join(uploadFolder, file);
          return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
        });
    
        
        Promise.all(deletePromises)
          .then(() => {
            console.log('Todos los archivos han sido borrados');
          })
          .catch((err) => {
            console.log('Error al borrar uno o más archivos');
          });
    })
}

module.exports = deleteTempFiles