var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// asyncronico para generación de venta 

router.post('/', async (req, res) => {
  const venta = { id: uuidv4(), fecha: new Date(), productoId: req.body.id, cantidadvendida: req.body.cantidadvendida, stockproducto: req.body.stock};
  const arrayventa = []
  arrayventa.push(venta)
  try {
    const data = await fs.promises.readFile('ventas.json', 'utf-8');
    const ventas = JSON.parse(data);
    ventas.push(venta);
    await fs.promises.writeFile('ventas.json', JSON.stringify(ventas));
    actualizarInventario(arrayventa)    
    res.status(200).send('Venta registrada correctamente.');

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar la venta.');
  }
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('./ventas.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// --------------FUNCIÓN ACTUALIZAR

async function actualizarInventario(ventas) {
  try {
    const data = await fs.promises.readFile('productos.json', 'utf-8');
    const inventario = JSON.parse(data);

    // Recorrer cada venta y actualizar el stock correspondiente
    ventas.forEach((venta) => {
      const producto = inventario.find((p) => p.id === venta.productoId);
      if (producto) {
        producto.stock -= venta.cantidad;
      }
    });

    // Escribir el inventario actualizado en el archivo
    await fs.promises.writeFile('productos.json', JSON.stringify(inventario));
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;

