const fs = require('fs');

const productos = [
  {
    id: 1,
    nombre: 'Analisis ROI',
    precio: 6000,
    imagen: './Assets/img/Foto5.jpg',
    stock: 5
},
{
    id: 2,
    nombre: 'Evaluacion Psicolaboral',
    precio: 8000,
    imagen: './Assets/img/Foto5.jpg',
    stock: 5
},
{
    id: 3,
    nombre: 'Atracción de Talento',
    precio: 4000,
    imagen: './Assets/img/Foto5.jpg',
    stock: 5
}
];

const jsonProductos = JSON.stringify(productos);

fs.writeFile('productos.json', jsonProductos, (err) => {
  if (err) throw err;
  console.log('El archivo productos.json ha sido creado exitosamente!');
});

