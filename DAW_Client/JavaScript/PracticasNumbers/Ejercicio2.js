//Ejercicio 2 - Restaurante

let nComensales = window.prompt("¿Con cuántos comensales vamos a contar?")
let comensalesMayor65 = window.prompt("¿Cuántos comensales tenemos mayores de 65 años?")
let comensalesMenores10 = window.prompt("¿Cuántos comensales son menores  de 10 años con menú infantil?")

let totalMM = comensalesMayor65 + comensalesMenores10
let comensalesMayores = nComensales - comensalesMenores10
switch(true){
    case(nComensales > totalMM):
        console.log("Perfecto puede continual")
        window.alert("Estas son las opciones de menú para adultos... \n " + "1.-Menú del día --> 12,50$\n" + "2.-Menú del día PREMIUM --> 17,45$\n" + "3.-Menú Buffet Libre --> 23,85$\n" + "NOTA: Todos los precios son sin IVA")
        let nMenus=6
        do{
            let menu1 = window.prompt("¿Cuántos comensales quieren el menú 1? \n"+"1.-Menú del día --> 12,50$")
            let menu2 = window.prompt("¿Cuántos comensales quieren el menú número 2?\n" + "2.-Menú del día PREMIUM --> 17.45$")
        }while(nMenus === 0)
        
        for(i = 1; i <= comensalesMayores; i++){
            window.alert("Comensal número "+ i)
        }
        break;
    default:
        window.alert("Numero de comensales introducidos incorrectamente")
}


