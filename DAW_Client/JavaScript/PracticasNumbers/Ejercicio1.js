let numero = parseFloat(prompt("Introduce un número diferente de -1 a 1:"));

// Miramos que no este entre 1 y -1
while (numero > -1 && numero < 1) {
    numero = parseFloat(prompt("Número inválido. Introduce un número fuera del rango -1 a 1:"));
}

let numeroInicial = numero; 
let resultado = numero;      
let contador = 0;

do {
    resultado = resultado * numeroInicial;  
    contador++;
    console.log(`${numero} x ${resultado / numeroInicial} = ${resultado}`);
} while (resultado !== Infinity && resultado !== -Infinity); 

console.log(`El número de operaciones necesarias han sido ${contador}`);
