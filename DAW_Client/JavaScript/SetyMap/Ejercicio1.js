let tipo;
do {
    tipo = prompt("¿Quieres trabajar con letras (L) o números (N)?")?.toUpperCase();
    if (tipo === null) {
        console.log("NO se va a hacer nada");
        break;
    }
} while (tipo !== "L" && tipo !== "N");

if (tipo !== null) {
    let conjuntoA = new Set();
    let conjuntoB = new Set();

    if (tipo === 'N') {
        while (conjuntoA.size < 10) {
            conjuntoA.add(Math.floor(Math.random() * 21));
        }
        while (conjuntoB.size < 10) {
            conjuntoB.add(Math.floor(Math.random() * 21));
        }
    } else { 
        let abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        while (conjuntoA.size < 10) {
            let letra = abecedario[Math.floor(Math.random() * abecedario.length)];
            conjuntoA.add(letra);
        }
        while (conjuntoB.size < 10) {
            let letra = abecedario[Math.floor(Math.random() * abecedario.length)];
            conjuntoB.add(letra);
        }
    }

    console.log("Conjunto A:", conjuntoA);
    console.log("Conjunto B:", conjuntoB);
    
    let union = new Set([...conjuntoA, ...conjuntoB]);
    console.log("Unión:", union);

    
    let interseccion = new Set([...conjuntoA].filter(x => conjuntoB.has(x)));
    console.log("Intersección:", interseccion);

    
    let diferencia = new Set([...conjuntoA].filter(x => !conjuntoB.has(x)));
    console.log("Diferencia (A - B):", diferencia);
}
