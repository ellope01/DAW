let carrito = document.querySelector('#carrito');
let eliminarCurso = document.querySelector();
let btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let cursoSeleccionado = document.querySelector();

const btnsAgregarCarrito = document.querySelectorAll('.miBoton')

//Ponerlo siempre al principio para cargar la pagina y evitar descordinación
document.addEventListener('DOMContentLoaded');



btnsAgregarCarrito.forEach(function (btnsAgregarCarrito) {
    btnAgragarCarrito.addEventListener('click', function () {
        console.log('Botón clickeado:', btnsAgregarCarrito.textContent);
    });
});


const infoCurso = [];
infoCurso = {
    imagen: cursoSeleccionado.querySelector("img").src,
    titulo: cursoSeleccionado.querySelector("h4").textContent,
    precio: cursoSeleccionado.querySelector('.precio span').textContent,
    id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}

let listaCarrito = [];

if (listaCarrito) {
    //si el curso se comprado se agrega
    let cursoClicado = curso
}

btnAgragarCarrito.addEventListener("click", () => {
    const titulo = document.createElement(infoCurso.titulo);
    const precio = document.createElement(infoCurso.precio);
    const imagen = document.createElement(infoCurso.imagen);

    carrito.appendChild(imagen)
    carrito.appendChild(titulo)
    carrito.appendChild(precio)
}
)

//tr fila
//td celda
//Ejem. createElement('tr');
const existe = carrito.some(curso = curso.cursoSeleccionado === infoCurso.id)
if (carrito !== null) {
    //cuando el carrito tiene elementos
    if (existe) {
        let cont = btnsAgregarCarrito.infoCurso.contador;
        cont++;
        let contCambiado = contador.textContent = cont;
        carrito.appendChild(carrito.infoCurso.contador(contCambiado))

    } else {
        let curso = carrito.push;
    }
}

//Funcion Borrar Curso del carrito que cuando se clicke sobre la x se borrara el curso del carrito
function borrarCurso() {
    btnBorrarCurso.addEventListener("click", () => {

    })
}


//Funcion vaciar Carrito que cuando los clickes se borra el carrito entero
function vaciarCarrito() {
    btnVaciarCarrito.addEventListener("click", () => {
        let nuevoCarrito = [];
        listaCarrito = nuevoCarrito;
    })
}
