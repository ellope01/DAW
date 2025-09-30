function dobles(numero, veces) {
    if (veces === 0) { veces = 3 }
    alert(`Ha elegido el número ${numero}, ${veces} veces`)
    for(let i = 0; i<3; i++){
        numero= numero*2
        console.log(numero)
    }
}

const numeroUsuario = parseFloat(prompt("Introduce un número:"));
const vecesUsuario = parseInt(prompt("Número de veces a duplicar (opcional):"));

dobles(numeroUsuario,vecesUsuario)