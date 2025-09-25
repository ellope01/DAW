const texto = prompt("Introduce el texto a cifrar:");
let desplazamiento;

do {
    desplazamiento = parseInt(prompt("Introduce el número de desplazamiento (entero):"), 10);
} while (isNaN(desplazamiento));

let textoCifrado = "";

for (let i = 0; i < texto.length; i++) {
    let codigo = texto.charCodeAt(i);
    let nuevoCodigo = codigo + desplazamiento;
    textoCifrado += String.fromCharCode(nuevoCodigo);
}

alert(`El texto "${texto}" se ha convertido en "${textoCifrado}".`);
