let palabra1, palabra2, palabra3;

//Introducen las 3 palabras
do {
    palabra1 = prompt("Introduce la primera palabra (mínimo 4 caracteres, sin espacios):").trim();
} while (palabra1.length < 4);

do {
    palabra2 = prompt("Introduce la segunda palabra (mínimo 5 caracteres, sin espacios):").trim();
} while (palabra2.length < 5);

do {
    palabra3 = prompt("Introduce la tercera palabra (mínimo 6 caracteres, sin espacios):").trim();
} while (palabra3.length < 6);

//Se coge la primera parte de la palabra(2 caracteres) y se pasa a mayuscula
let inicio = palabra1.substring(0, 2).toUpperCase();

//se coge la parte del medio , si es par se toman dos caracteres, si es impar se toman 3 y se pone todo a minusculas
let medio;
if (palabra2.length % 2 === 0) {
    let mitad = palabra2.length / 2;
    medio = palabra2.substring(mitad - 1, mitad + 1).toLowerCase();
} else {
    let mitad = Math.floor(palabra2.length / 2);
    medio = palabra2.substring(mitad - 1, mitad + 2).toLowerCase();
}

//Se toman los caracteres finales de la palabra
let fin = palabra3.substring(palabra3.length - 2).toUpperCase();

//Se juntan las tres partes
let nuevaPalabra = inicio + medio + fin;

alert(`La nueva palabra formada es: ${nuevaPalabra}`);
