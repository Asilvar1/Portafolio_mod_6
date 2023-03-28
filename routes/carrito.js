var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('./productos.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
// Ruta para almacenar un nuevo producto
router.post('/', (req, res) => {
  // Lógica para almacenar el nuevo producto
  fs.writeFile('Producto almacenado');
});
module.exports = router;

