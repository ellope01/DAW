const formulario = document.querySelector('#formulario');
const btnAgregar = formulario.querySelector('input[type=submit]');

const texto=32;
let error;

if(texto>30){
    error = "LA TAREA ES DEMASIADO LARGA ...";
}else if(texto === ""){
    error = "NO HAS PUESTO NINGUNA TAREA ...";
}else{
    error= "LA TAREA YA EXISTE";
}