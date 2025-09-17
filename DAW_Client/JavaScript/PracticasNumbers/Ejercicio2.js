//Ejercicio 2 - Restaurante

let nComensales = parseInt(window.prompt("¿Con cuántos comensales vamos a contar?"))
let comensalesMayor65 = parseInt(window.prompt("¿Cuántos comensales tenemos mayores de 65 años?"))
let comensalesMenores10 = parseInt(window.prompt("¿Cuántos comensales son menores  de 10 años con menú infantil?"))

let totalMM = comensalesMayor65 + comensalesMenores10 // nº comensales no normales
let comensalesMayores = nComensales - comensalesMenores10 // comensales que no son niños

switch (true) {
    case (nComensales > totalMM):
        console.log("Perfecto puede continual")
        window.alert("Estas son las opciones de menú para adultos... \n " + "1.-Menú del día --> 12,50$\n" + "2.-Menú del día PREMIUM --> 17,45$\n" + "3.-Menú Buffet Libre --> 23,85$\n" + "NOTA: Todos los precios son sin IVA")
        let nMenus = comensalesMayores
        console.log(comensalesMayores)

        window.alert("De momento llevas " + (nMenus - nMenus) + " menus elegidos...\n" + "Te quedan " + nMenus +" por elegir")
        
        let menu1 = parseInt(window.prompt("¿Cuántos comensales quieren el menú 1? \n" + "1.-Menú del día --> 12,50$"))
        console.log(menu1)
        window.alert("De momento llevas " + (menu1) + "menús elegidos...\n Te quedan " + (nMenus - menu1) + " por elegir")
        
        let menu2 = parseInt(window.prompt("¿Cuántos comensales quieren el menú número 2?\n" + "2.-Menú del día PREMIUM --> 17.45$"))
        console.log(menu2)
        
        let menu3 = nMenus - (menu1 + menu2)
        window.alert(`El menú 3 lo han elegido ${menu3} personas`)
        console.log(menu3)

        window.alert(`Contamos con un total de 8 comensales : ${comensalesMenores10} niños y ${comensalesMayores} adultos\n
            Los menus que se servirás serán los siguientes:\n
            ${menu1} menú/s del día\n
            ${menu2} menú/s PREMIUM y\n
            ${menu3} menú/s Buffet Libre\n
            ${comensalesMenores10} menú/s infantil/es`)

        window.alert(`Debe saber que ${comensalesMayor65} menú/s se beneficiarán de un 15% de descuento, respecto al menú de adultos por ser mayores de 65 años\n
            NOTA: El descuento será aplicado a los menús más económicos`)
        window.alert(`Los menús infantiles tienen un precio de 9.25$ + IVA\n
            En su caso, se le aplicará este precio a ${comensalesMenores10} comensales`)


        let arrMenus = [menu1,menu2,menu3]
        let  arrMayores = [comensalesMayor65,comensalesMayor65,comensalesMayor65]
        
        let resta = [];
        for (let i = 0; i < arrMenus.length; i++) {
            resta.push(arrMenus[i] - arrMayores[i]);
        }

        let descuento = [];
        for (let i=0; i<resta.length;i++){
            if(resta[i] <= 0){
                descuento.push(arrMenus[i])
            }else{
                let desc3 = descuento[0] + descuento [1] 
                let descuento3= comensalesMayor65 - desc3
                descuento.push(descuento3)
            }
        }
        console.log(descuento)

        
        let menu1desc = descuento[0] * 12.5
        let menu1normal = menu1 - descuento[0] * 12.5
        let descuento1 = menu1desc * 0.15 + menu1normal
        let menu2desc = descuento[1] * 17.45
        let menu2normal = menu1 - descuento[1] * 17.45
        let descuento2 = menu2desc * 0.15 + menu2normal
        let menu3desc = descuento[2] * 23.85
        let menu3normal = menu1 - descuento[2] * 23.85
        let descuento3 = menu3desc * 0.15 + menu3normal
        let total = descuento1+descuento2+descuento3+(comensalesMenores10*9.25)
        window.alert(`Los menús que se servirán serán los siguientes:\n
            ${menu1} menú/s del día x 12.50$ ........${descuento1}$\n
            ${menu2} menú/s PREMIUM x 17,45$.........${descuento2}$\n
            ${menu3} menú/s Buffet x 23,85$.........${descuento3}$\n
            ${comensalesMenores10} menús infantil ..${comensalesMenores10*9.25}$\n
            Total ...................................${total}$\n
            IVA .....................................${total*0.10}$\n
            TOTAL IVA INCLUIDO ......................${total+(total*0.10)}
            `)

        break;
    default:
        window.alert("Numero de comensales introducidos incorrectamente")
}


