let carrito = document.querySelector('#carrito');
let eliminarCurso = document.querySelector();
let vaciarCarrito = document.querySelector('#vaciar-carrito'); 
let cursoSeleccionado = document.querySelector();

const btnsAgregarCarrito = document.querySelectorAll('.miBoton')

btnsAgregarCarrito.forEach(function(btnsAgregarCarrito) {
    btnAgragarCarrito.addEventListener('click', function() {
        console.log('Botón clickeado:', btnsAgregarCarrito.textContent);
    });
});


const infoCurso = [];
infoCurso = {
    imagen :cursoSeleccionado.querySelector("img").src,
    titulo : cursoSeleccionado.querySelector("h4").textContent,
    precio: cursoSeleccionado.querySelector('.precio span').textContent,
    id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
    cantidad : 1
}

let listaCarrito = [];

if(listaCarrito){
    //si el curso se comprado se agrega
    let cursoClicado = curso
}

btnAgragarCarrito.addEventListener("click",() =>{
    const titulo = document.createElement(infoCurso.titulo);
    const precio = document.createElement(infoCurso.precio);
    carrito.appendChild(titulo)
    carrito.appendChild(precio)
}
)
let cursoExiste;
if(cursoExiste){
    //tenemos que añadir uno a la cantidad
}else{
    //agregamos uno nuevo
}