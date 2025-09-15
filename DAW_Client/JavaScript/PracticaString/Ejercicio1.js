/*
Seguir ofreciendo hasta que el usuario desee cancelar
*/
do{
const cadena1 = prompt("Introduce la primera cadena ")
const cadena2 = prompt("Introduce la segunda cadena ")

let cadena1SE = cadena1.trim()
let cadena2SE = cadena2.trim()

const compararFrases = (cadena1SE, cadena2SE) => {
    let sn
    if (cadena1SE === cadena2SE){
        sn = "si"
    }else{sn="no"}
    return sn
}

let respuesta = compararFrases(cadena1SE,cadena2SE)

window.confirm("¿Quieres comparar otras cadenas?")


window.alert(`Los textos ${cadena1} y ${cadena2} ${respuesta} son iguales`)
}
while(true)