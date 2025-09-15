//Ejercicio 1 -> ejercicio que multiplique el numero por si mismo hasta que de infinito

//let numero = window.prompt("Introduce el número")
let numero = -492382032
let numeroInfinito
let numeroInicial = numero*2
let contador=0

do{
    
    numeroInfinito = numero * numeroInicial
    numeroInicial = numeroInfinito
    contador++
    console.log( `${numero} x ${numeroInfinito/2} es: ${numeroInfinito}` )
}
while(numeroInfinito !== Infinity )

console.log(`El número de operaciones necesarias han sido ${contador}`)
