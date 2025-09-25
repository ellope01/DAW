do {
    const cadena1 = prompt("Introduce la primera cadena:");
    const cadena2 = prompt("Introduce la segunda cadena:");

    let cadena1SE = cadena1.trim();
    let cadena2SE = cadena2.trim();

    const compararFrases = (c1, c2) => {
        let resultado;
        if (c1 === c2) {
            resultado = "sí";
        } else {
            resultado = "no";
        }
        return resultado;
    };
    
    let resultado = compararFrases(cadena1SE, cadena2SE);

    alert(`Los textos "${cadena1SE}" y "${cadena2SE}" ${resultado === "sí" ? "son iguales" : "no son iguales"}.`);
} while (confirm("¿Quieres comparar más textos?"));
