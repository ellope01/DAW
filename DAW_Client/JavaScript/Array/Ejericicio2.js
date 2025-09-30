// Array inicial con 20 números aleatorios
let numeros = [];
for (let i = 0; i < 20; i++) {
    numeros.push(Math.floor(Math.random() * 11));
}
console.log("Array inicial:", numeros);

//Separar en pares e impares
let pares = numeros.filter(n => n % 2 === 0);
let impares = numeros.filter(n => n % 2 !== 0);
console.log("Pares:", pares);
console.log("Impares:", impares);

// Eliminar elementos
// Pares: eliminar primer y último
pares.shift();
pares.pop();

// Impares: eliminar elementos centrales
if (impares.length % 2 === 0) {
    let centro1 = impares.length / 2 - 1;
    impares.splice(centro1, 2);
} else {
    let centro = Math.floor(impares.length / 2);
    impares.splice(centro, 1);
}

console.log("Pares tras eliminar extremos:", pares);
console.log("Impares tras eliminar centro(s):", impares);

//Sumar elementos y añadir al final
let sumaPares = pares.reduce((a, b) => a + b, 0);
let sumaImpares = impares.reduce((a, b) => a + b, 0);
pares.push(sumaPares);
impares.push(sumaImpares);
console.log("Pares con suma al final:", pares);
console.log("Impares con suma al final:", impares);

//Calcular media 
let mediaPares = Math.floor(sumaPares / (pares.length - 1));
let mediaImpares = Math.floor(sumaImpares / (impares.length - 1));
pares.unshift(mediaPares);
impares.unshift(mediaImpares);
console.log("Pares con media al inicio:", pares);
console.log("Impares con media al inicio:", impares);

//Multiplicar cada elemento por la media
pares = pares.map(n => n * pares[0]);
impares = impares.map(n => n * impares[0]);
console.log("Pares multiplicados por media:", pares);
console.log("Impares multiplicados por media:", impares);

// Unir arrays y ordenar 
let combinado = pares.concat(impares);
combinado.sort((a, b) => a - b);
console.log("Array combinado y ordenado:", combinado);

// Eliminar repetidos
let finalSinRepetidos = [...new Set(combinado)];
console.log("Array final sin repetidos:", finalSinRepetidos);
