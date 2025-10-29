//Coger el campo del formulario
const campoCriptomoneda = document.querySelector("#criptomonedas");
const campoMoneda = document.querySelector('#moneda').value;
const formulario = document.querySelector('#formulario');
const btnResultados = formulario.querySelector('input[type=submit]');

//funcion para comprobar si los campos estan vacios
function comprobarCampos() {
    if (campoMoneda === "" || campoCriptomoneda === "") {
        console.log("los campos estan vacios")
    }
}

//funcion para mostrar los errores por pantalla
function mostrarErrores(){

}

//Funcion para sacar las 10 mejores monedas
async function obtenerNombreCriptomonedas(params) {
    try{
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        //se tiene que poner después porque hay que esperar a que se convierta en JSON
        //creamos un array para los resultados
        const resultado = []
        for(i=0;i<10;i++){
            resultado.push(datos.Data[i].CoinInfo.Name) 
        }
        console.log(resultado);
        return resultado;
    }catch(error){
        console.log(error)
    }
}

//funcion para cargar las criptomonedas en la pagina
function mostrarCriptomoneda(){

}

//funcion para cargar resultados de la moneda que tiene como parametros lo que hemos seleccionado
function obtenerDatosCriptomoneda(moneda,criptomonedas){

}


const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

document.addEventListener('DOMContentLoaded',obtenerNombreCriptomonedas)