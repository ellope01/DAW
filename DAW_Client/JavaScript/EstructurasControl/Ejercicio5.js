//funcion para saber si es primo o no
function esPrimo(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true; //Si es primo devuleve true
}

const opcion = parseInt(prompt("Elige una opción:\n1. Saber si un número es primo\n2. Listar primos hasta un número"), 10);

const numero = parseInt(prompt("Introduce un número:"), 10);

//Buscamos si es primo
if (opcion === 1) {
    if (esPrimo(numero)) {
        alert(`${numero} es primo`);
    } else {
        alert(`${numero} no es primo`);
    }
} else if (opcion === 2) { //se empiezan a poner los primos en una lista
    const primos = [];
    for (let i = 2; i <= numero; i++) {
        if (esPrimo(i)) primos.push(i);
    }
    console.log(`Números primos hasta ${numero}: ${primos.join(", ")}`);
    console.log(`Cantidad de primos: ${primos.length}`);
} else { //si el usuario no elige la opcion 1 o la 2
    alert("Opción no válida");
}
