do{
    numeroAleatorio= Math.floor(Math.random()*11);
    let intentos=0;
    let acertado=false;

    while(!acertado){
        let numeroEntrada = prompt("Adivina un número entre 0 y 10:");
        if(numeroEntrada === null || numeroEntrada === ' '){
            if (!confirm("¿Quieres seguir jugando?")) { 
                acertado = true;
                break;
            } else {
                continue;
            }
        }
        let numero = parseInt(numeroEntrada, 10);

        if (isNaN(numero) || numero < 0 || numero > 10) {
            alert("Número no válido. Debe ser un entero entre 0 y 10.");
            continue;
        }
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


}while(confirm("¿Quieres jugar otra vez?"));
