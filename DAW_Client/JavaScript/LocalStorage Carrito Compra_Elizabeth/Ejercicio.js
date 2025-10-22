
const carritoTbody = document.querySelector('#carrito tbody'); // donde mostraremos las filas
const listaCursos = document.querySelector('#lista-cursos');   // donde están los productos
const btnVaciarCarrito = document.querySelector('#vaciar-carrito'); // botón para vaciar el carrito

//Iniciamos el carrito con lo que hay en el localStorage
let articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para pintar el carrito, esta recorre el array articulosCarritos
// y crea las filas usando Template Strings
function pintarCarrito() {
    carritoTbody.innerHTML = ''; // vaciamos la tabla para luego volver a mostrarla

    articulosCarrito.forEach(curso => {
        carritoTbody.innerHTML += `
            <tr>
                <td><img src="${curso.imagen}" width="50"></td>
                <td>${curso.titulo}</td>
                <td>${curso.precio}</td>
                <td>${curso.cantidad}</td>
                <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
            </tr>
        `;
    });
}

document.addEventListener('DOMContentLoaded', function () {

    //ponemos aqui la funcion pintarCarrito para que lo primero que haga sea volver a imprimir la lista de cursos
    pintarCarrito();
    // Para añadir cursos al carrito
    listaCursos.addEventListener('click', function (e) {
        if (e.target.classList.contains('agregar-carrito')) {
            e.preventDefault();

            //Aceder al curso y recoger los datos
            const cursoElem = e.target.parentElement.parentElement;
            const infoCurso = {
                imagen: cursoElem.querySelector('img').src,
                titulo: cursoElem.querySelector('h4').textContent,
                precio: cursoElem.querySelector('.precio span').textContent,
                id: cursoElem.querySelector('a').getAttribute('data-id'),
                cantidad: 1
            };

            // AModificar la cantidad
            if (articulosCarrito.some(c => c.id === infoCurso.id)) {
                //si existe aumentamos las cantidad
                articulosCarrito = articulosCarrito.map(c => {
                    if (c.id === infoCurso.id) {
                        c.cantidad++;
                    }
                    return c;
                });
            } else {
                //si no, al array
                articulosCarrito.push(infoCurso);
            }
            //cada vez que se añada un curso lo guardamos en el localStorage
            localStorage.setItem("carrito", JSON.stringify(articulosCarrito));

            pintarCarrito();
        }
    });

    // Para borrar un curso del carrito
    carritoTbody.addEventListener('click', function (e) {
        if (e.target.classList.contains('borrar-curso')) {
            const idCurso = e.target.getAttribute('data-id');
            //filtramos para eliminar po id
            articulosCarrito = articulosCarrito.filter(c => c.id !== idCurso);
            //actualizamos el localStorage con el nuevo carrito (con un articulo eliminado)
            localStorage.setItem("carrito",JSON.stringify(articulosCarrito));
            pintarCarrito();
        }
    });

    // Para vaciar el carrito
    btnVaciarCarrito.addEventListener('click', function (e) {
        e.preventDefault();
        articulosCarrito = [];
        //ponemos aqui el localStorage.clear() para eliminar el localStorage entero
        localStorage.clear();
        pintarCarrito();
    });

});


