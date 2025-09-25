//funcion que recibe dos parametros
function imprimirDobles(numero, veces) {
    if (!veces) veces = 3;//por defecto tres veces
    alert(`Número inicial: ${numero}, se duplicará ${veces} veces:`);
    //Se repite todas las veces necesarias
    for (let i = 1; i <= veces; i++) {
        numero *= 2;
        console.log(`Doble ${i}: ${numero}`);
    }
}


const numeroUsuario = parseFloat(prompt("Introduce un número:"));
const vecesUsuario = parseInt(prompt("Número de veces a duplicar (opcional):"), 10);

imprimirDobles(numeroUsuario, vecesUsuario);
