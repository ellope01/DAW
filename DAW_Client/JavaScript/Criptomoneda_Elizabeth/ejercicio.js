//Coger el campo del formulario
const campoCriptomoneda = document.querySelector("#criptomonedas");
const campoMoneda = document.querySelector('#moneda').value;
const formulario = document.querySelector('#formulario');
const btnResultados = formulario.querySelector('input[type=submit]');


function comprobarCampos() {
    if (campoMoneda === null || campoCriptomoneda === "") {
        console.log("los campos estan vacios")
    }
}

btnResultados.addEventListener('click', () => {
})