var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('./productos.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
/* // Ruta para almacenar un nuevo producto
router.post('/', (req, res) => {
  // Lógica para almacenar el nuevo producto
  fs.writeFile('Producto almacenado');
}); */


// ------------------------------------------ EJERCICIO 4 PORTAFOLIO---//


// Ruta POST para registrar un nuevo producto
router.post('/', (req, res) => {

  try {
   
  const nuevoproducto = { id: req.body.id, nombre:req.body.nombre , precio:req.body.precio , imagen:req.body.imagen , stock: req.body.stock, token: uuidv4()};
     // Leer los productos existentes del archivo JSON
  const productosJSON = fs.readFileSync('productos.json', 'utf8');
  const productos = JSON.parse(productosJSON);

  // Agregar el nuevo producto al arreglo de productos
  productos.push(nuevoproducto);

  // Guardar los productos actualizados en el archivo JSON
  fs.writeFileSync('productos.json', JSON.stringify(productos, null, 2));

  // Responder con el producto registrado
  /* res.json(nuevoproducto); */
  res.status(200).send('Nuevo producto registrado.');

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar producto.');
  }
});

// put
router.put('/', async (req, res) => {
  try {
  const productosJSON = fs.readFileSync('productos.json', 'utf8');
  const productos = JSON.parse(productosJSON);
  // buscamos el nuevo producto
    const productoamodificar = productos.find((p) => p.id === req.body.id);
    productos.find((p) => p.id === req.body.id).nombre = req.body.nombre;
    productos.find((p) => p.id === req.body.id).precio = req.body.precio;
    productos.find((p) => p.id === req.body.id).imagen = req.body.imagen;
    productos.find((p) => p.id === req.body.id).stock = req.body.stock; 
    await fs.promises.writeFile('productos.json', JSON.stringify(productos));
    res.status(200).send('Registro actualizado.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al modificar producto.');
  }
})


// DELETE

router.delete('/:id', async (req, res) => {
  try {
    const productosJSON = fs.readFileSync('productos.json', 'utf8');
    const productos = JSON.parse(productosJSON);
    const productId = req.params.id;
    const arreglomodificado =  productos.filter((p) => p.id != req.params.id)
    await fs.promises.writeFile('productos.json', JSON.stringify(arreglomodificado));
    console.log(arreglomodificado);
    res.status(200).send('Registro eliminado.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar id.');
  }
})


module.exports = router;








// ---------------------------------------prueba actualizar inventario // 


/* const nuevoProducto = {
  id: req.body.id,
  nombre: req.body.nombre,
  precio: req.body.precio,
  imagen: req.body.imagen,
  stock: req.body.stock
}; */




// ---------------------------------------prueba actualizar inventario // 
