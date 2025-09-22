function convertirNumero() {
    let entrada = prompt("Introduce un número positivo con prefijo (0b, 0o, 0x o decimal):");

    
    if (!entrada) {
        console.log("No se introdujo ningún valor.");
        return;
    }

    let numero;

    try {
        
        numero = Number(entrada);

        if (isNaN(numero)) {
            console.log("Formato no válido. Usa 0b (binario), 0o (octal), 0x (hexadecimal) o decimal.");
            return;
        }

        if (numero < 0) {
            console.log("El número debe ser positivo.");
            return;
        }

    } catch (e) {
        console.log("Error en la conversión:", e.message);
        return;
    }

    
    console.log(`Número introducido: ${entrada}`);
    console.log(`Decimal: ${numero}`);
    console.log(`Binario: 0b${numero.toString(2)}`);
    console.log(`Octal: 0o${numero.toString(8)}`);
    console.log(`Hexadecimal: 0x${numero.toString(16).toUpperCase()}`);
}

convertirNumero();
