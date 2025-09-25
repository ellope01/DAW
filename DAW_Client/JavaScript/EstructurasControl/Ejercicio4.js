
do {
    //generamos el numero aleatorio
    const numeroAleatorio = Math.floor(Math.random() * 11); // 0-10
    let intentos = 0;
    let acertado = false;

    while (!acertado) {
        let entrada = prompt("Adivina un número entre 0 y 10:");
        //se compurba si la entrada esta vacia 
        if (entrada === null || entrada.trim() === "") {
            if (!confirm("¿Quieres seguir jugando?")) {
                acertado = true;
                break;
            } else {
                continue;
            }
        }

        //se combierte el numero a entero y se mira si es valido o no
        let numero = parseInt(entrada, 10);

        if (isNaN(numero) || numero < 0 || numero > 10) {
            alert("Número no válido. Debe ser un entero entre 0 y 10.");
            continue;
        }

        //se hace un contador de intentos y se da pistas sobre el numero
        intentos++;

        if (numero < numeroAleatorio) {
            alert(`El número es mayor. Intentos: ${intentos}`);
        } else if (numero > numeroAleatorio) {
            alert(`El número es menor. Intentos: ${intentos}`);
        } else {
            alert(`¡Felicidades! Has acertado en ${intentos} intentos.`);
            acertado = true;
        }
    }
} while (confirm("¿Quieres jugar otra vez?"));
