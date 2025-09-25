
let entrada = prompt("Introduce un número con prefijo (0b, 0o, 0x) para binario, octal o hexadecimal:");

// Miramos que el prefijo sea el correcto
while (!entrada.startsWith("0b") && !entrada.startsWith("0o") && !entrada.startsWith("0x")) {
    entrada = prompt("Prefijo inválido. Introduce un número con 0b, 0o o 0x:");
}

// Lo pasamos a decimal según el prefijo
let numeroDecimal;
if (entrada.startsWith("0b")) {
    numeroDecimal = parseInt(entrada.slice(2), 2);
} else if (entrada.startsWith("0o")) {
    numeroDecimal = parseInt(entrada.slice(2), 8);
} else if (entrada.startsWith("0x")) {
    numeroDecimal = parseInt(entrada.slice(2), 16);
}

// Mostramos conversiones en otras bases
console.log(`Número decimal: ${numeroDecimal}`);
console.log(`Binario: 0b${numeroDecimal.toString(2)}`);
console.log(`Octal: 0o${numeroDecimal.toString(8)}`);
console.log(`Hexadecimal: 0x${numeroDecimal.toString(16).toUpperCase()}`);
