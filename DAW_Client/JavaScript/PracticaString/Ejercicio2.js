const texto = prompt("Introduce el texto a cifrar:");

let desplazamiento;
do {
    let input = prompt("Introduce el número de desplazamiento (entero):");
    desplazamiento = parseInt(input);
} while (isNaN(desplazamiento));

let textoCifrado = "";
let posicionesUnicode = "";


for (let i = 0; i < texto.length; i++) {
    let codigoOriginal = texto.charCodeAt(i);
    let nuevoCodigo = codigoOriginal + desplazamiento;   
    // Guardar posición numérica Unicode
    posicionesUnicode += nuevoCodigo;    
    // Guardar nuevo carácter 
    textoCifrado += String.fromCharCode(nuevoCodigo);
}
let resultadoFinal = textoCifrado + posicionesUnicode;
alert(`"${texto}" se ha convertido en ${resultadoFinal}`);