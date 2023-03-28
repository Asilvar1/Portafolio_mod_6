      document.addEventListener('DOMContentLoaded', () => {
        // Variables
        const baseDeDatos = [
            {
                id: 1,
                nombre: 'Analisis ROI',
                precio: 6000,
                imagen: '/public/images/Foto5.jpg',
                stock: 5
            },
            {
                id: 2,
                nombre: 'Evaluacion Psicolaboral',
                precio: 8000,
                imagen: '/public/images/Foto5.jpg',
                stock: 5
            },
            {
                id: 3,
                nombre: 'Atracción de Talento',
                precio: 4000,
                imagen: '/public/images/Foto5.jpg',
                stock: 5
            }
            

        ];
        /* const baseDeDatos = fetch('http://localhost:3000/productos') */
        
        let carrito = [];
        const divisa = '$';
        const DOMitems = document.querySelector('#items');
        const DOMcarrito = document.querySelector('#carrito');
        const DOMtotal = document.querySelector('#total');
        const DOMbotonVaciar = document.querySelector('#boton-vaciar');
        const DOMbotonDescuento = document.querySelector('#boton-descuento');
        const DOMdiscountCode = document.querySelector('#discountCode');

        // Funciones

        /**
        * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
        */
        function renderizarProductos() {
            baseDeDatos.forEach((info) => {
                // Estructura
                const miNodo = document.createElement('div');
                miNodo.classList.add('card', 'col-12', 'h-5', 'w-50');
                // Body
                const miNodoCardBody = document.createElement('div');
                miNodoCardBody.classList.add('card-body');
                // Titulo
                const miNodoTitle = document.createElement('h5');
                miNodoTitle.classList.add('card-title');
                miNodoTitle.textContent = info.nombre;
                // Imagen
                const miNodoImagen = document.createElement('img');
                miNodoImagen.classList.add('img-fluid','w-25',);
                miNodoImagen.setAttribute('src', info.imagen);
                // Precio
                const miNodoPrecio = document.createElement('p');
                miNodoPrecio.classList.add('card-text');
                miNodoPrecio.textContent = `${info.precio}${divisa}`;
                // Boton 
                const miNodoBoton = document.createElement('button');
                miNodoBoton.classList.add('btn', 'btn-secondary');
                miNodoBoton.textContent = '+';
                miNodoBoton.setAttribute('marcador', info.id);
                miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
                // Insertamos
                miNodoCardBody.appendChild(miNodoImagen);
                miNodoCardBody.appendChild(miNodoTitle);
                miNodoCardBody.appendChild(miNodoPrecio);
                miNodoCardBody.appendChild(miNodoBoton);
                miNodo.appendChild(miNodoCardBody);
                DOMitems.appendChild(miNodo);
            });
        }

        /**
        * Evento para añadir un producto al carrito de la compra
        */
        function anyadirProductoAlCarrito(evento) {
            // Anyadimos el Nodo a nuestro carrito
            carrito.push(evento.target.getAttribute('marcador'))
            // Actualizamos el carrito 
            renderizarCarrito();

        }
        console.log('calcularTotal')
        /**
        * Dibuja todos los productos guardados en el carrito
        */
        function renderizarCarrito() {
            // Vaciamos todo el html
            DOMcarrito.textContent = '';
            // Quitamos los duplicados
            const carritoSinDuplicados = [...new Set(carrito)];
            // Generamos los Nodos a partir de carrito
            carritoSinDuplicados.forEach((item) => {
                // Obtenemos el item que necesitamos de la variable base de datos
                const miItem = baseDeDatos.filter((itemBaseDatos) => {
                    // ¿Coincide las id? Solo puede existir un caso
                    return itemBaseDatos.id === parseInt(item);
                });
                // Cuenta el número de veces que se repite el producto
                const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                    // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                    return itemId === item ? total += 1 : total;
                }, 0);
                // Creamos el nodo del item del carrito
                const miNodo = document.createElement('li');
                miNodo.classList.add('list-group-item', 'text-left', 'mx-5', 'h5');
                miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
                // Boton de borrar
                const miBoton = document.createElement('button');
                miBoton.classList.add('btn', 'bg-info', 'sm-5', 'w-50', 'd-flex');
                miBoton.textContent = 'X';
                miBoton.style.marginLeft = '0rem';
                miBoton.dataset.item = item;
                miBoton.addEventListener('click', borrarItemCarrito);
                // Mezclamos nodos
                miNodo.appendChild(miBoton);
                DOMcarrito.appendChild(miNodo);
            });
           // Renderizamos el precio total en el HTML
           DOMtotal.textContent = calcularTotal();
        }

        /**
        * Evento para borrar un elemento del carrito
        */
        function borrarItemCarrito(evento) {
            // Obtenemos el producto ID que hay en el boton pulsado
            const id = evento.target.dataset.item;
            // Borramos todos los productos
            carrito = carrito.filter((carritoId) => {
                return carritoId !== id;
            });
            // volvemos a renderizar
            renderizarCarrito();
        }

        /**
         * Calcula el precio total teniendo en cuenta los productos repetidos
         */
        function calcularTotal() {
            console.log('calcularTotal')
            // Recorremos el array del carrito 
            return carrito.reduce((total, item) => {
                // De cada elemento obtenemos su precio
                const miItem = baseDeDatos.filter((itemBaseDatos) => {
                    return itemBaseDatos.id === parseInt(item);
                });
                
                // Los sumamos al total
                return (total + miItem[0].precio);
            }, 0) - calculateDiscount(DOMdiscountCode.value);
        }

        /**
        * Varia el carrito y vuelve a dibujarlo
        */
        function vaciarCarrito() {
            // Limpiamos los productos guardados
            carrito = [];
            // Renderizamos los cambios
            renderizarCarrito();
        }

        // Eventos
        DOMbotonVaciar.addEventListener('click', vaciarCarrito);
        DOMbotonDescuento.addEventListener('click', renderizarCarrito)

        // Inicio
        renderizarProductos();
        renderizarCarrito();
      });

      // descuento

      

function calculateDiscount(discountCode) {
    console.log(discountCode)
    if(discountCode == 'port1000') {
        console.log('1000')
        return 1000;
    }else{
        return 0;
    }
}
//const id=sdf [(1,23,45,6)]


