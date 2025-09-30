// Ejercicio 2 - Restaurante (Parte del descuento corregida)

let nComensales = parseInt(window.prompt("¿Con cuántos comensales vamos a contar?"))
let comensalesMayor65 = parseInt(window.prompt("¿Cuántos comensales tenemos mayores de 65 años?"))
let comensalesMenores10 = parseInt(window.prompt("¿Cuántos comensales son menores de 10 años con menú infantil?"))

let totalMM = comensalesMayor65 + comensalesMenores10
let comensalesMayores = nComensales - comensalesMenores10

switch (true) {
    case (nComensales >= totalMM): 
        console.log("Perfecto puede continuar")
        window.alert("Estas son las opciones de menú para adultos... \n " + 
                    "1.-Menú del día --> 12,50€\n" + 
                    "2.-Menú del día PREMIUM --> 17,45€\n" + 
                    "3.-Menú Buffet Libre --> 23,85€\n" + 
                    "NOTA: Todos los precios son sin IVA")
        
        let nMenus = comensalesMayores
        console.log(comensalesMayores)

        window.alert("De momento llevas " + 0 + " menús elegidos...\n" + "Te quedan " + nMenus + " por elegir")
        
        let menu1 = parseInt(window.prompt("¿Cuántos comensales quieren el menú 1? \n" + "1.-Menú del día --> 12,50€"))
        console.log(menu1)
        window.alert("De momento llevas " + menu1 + " menús elegidos...\n Te quedan " + (nMenus - menu1) + " por elegir")
        
        let menu2 = parseInt(window.prompt("¿Cuántos comensales quieren el menú número 2?\n" + "2.-Menú del día PREMIUM --> 17.45€"))
        console.log(menu2)
        
        let menu3 = nMenus - (menu1 + menu2)
        window.alert(`El menú 3 lo han elegido ${menu3} personas`)
        console.log(menu3)

        window.alert(`Contamos con un total de ${nComensales} comensales: ${comensalesMenores10} niños y ${comensalesMayores} adultos\n
            Los menús que se servirán serán los siguientes:\n
            ${menu1} menú/s del día\n
            ${menu2} menú/s PREMIUM y\n
            ${menu3} menú/s Buffet Libre\n
            ${comensalesMenores10} menú/s infantil/es`)

        window.alert(`Debe saber que ${comensalesMayor65} menú/s se beneficiarán de un 15% de descuento, respecto al menú de adultos por ser mayores de 65 años\n
            NOTA: El descuento será aplicado a los menús más económicos`)
        window.alert(`Los menús infantiles tienen un precio de 9.25€ + IVA\n
            En su caso, se le aplicará este precio a ${comensalesMenores10} comensales`)

        let precios = [12.50, 17.45, 23.85];
        let cantidades = [menu1, menu2, menu3];
        
        let menusConPrecio = [
            { tipo: "menu1", precio: 12.50, cantidad: menu1 },
            { tipo: "menu2", precio: 17.45, cantidad: menu2 },
            { tipo: "menu3", precio: 23.85, cantidad: menu3 }
        ];
        
        menusConPrecio.sort((a, b) => a.precio - b.precio);
        
        let descuentosRestantes = comensalesMayor65;
        let totalSinIva = 0;
        
        for (let menu of menusConPrecio) {
            if (descuentosRestantes > 0 && menu.cantidad > 0) {
                let menusConDescuento = Math.min(menu.cantidad, descuentosRestantes);
                let menusSinDescuento = menu.cantidad - menusConDescuento;
                
                totalSinIva += (menusConDescuento * menu.precio * 0.85) + (menusSinDescuento * menu.precio);
                descuentosRestantes -= menusConDescuento;
            } else {
                totalSinIva += menu.cantidad * menu.precio;
            }
        }
        
        totalSinIva += comensalesMenores10 * 9.25;
        
        let iva = totalSinIva * 0.10;
        let totalConIva = totalSinIva + iva;
        
        window.alert(`Los menús que se servirán serán los siguientes:\n
            ${menu1} menú/s del día x 12.50€ ........${(menu1 * 12.50).toFixed(2)}€\n
            ${menu2} menú/s PREMIUM x 17.45€.........${(menu2 * 17.45).toFixed(2)}€\n
            ${menu3} menú/s Buffet x 23.85€.........${(menu3 * 23.85).toFixed(2)}€\n
            ${comensalesMenores10} menús infantil x 9.25€.....${(comensalesMenores10 * 9.25).toFixed(2)}€\n
            Total sin IVA ..........................${totalSinIva.toFixed(2)}€\n
            IVA (10%) .............................${iva.toFixed(2)}€\n
            TOTAL IVA INCLUIDO ....................${totalConIva.toFixed(2)}€`);

        break;
    default:
        window.alert("Número de comensales introducidos incorrectamente")
}