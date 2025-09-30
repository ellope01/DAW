function validarFecha(fechaStr) {
    let regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(fechaStr)) return null;
    
    let partes = fechaStr.split("/");
    let dia = parseInt(partes[0]);
    let mes = parseInt(partes[1]) - 1;
    let anio = parseInt(partes[2]);
    
    let fecha = new Date(anio, mes, dia);
    
    // Verificar que la fecha es lógica (no 31/02/2023, etc.)
    if (fecha.getDate() !== dia || fecha.getMonth() !== mes || fecha.getFullYear() !== anio) {
        return null;
    }
    
    return fecha;
}

function calcularDiferenciaCompleta(fecha1, fecha2) {
    // Asegurar que fecha1 es la más antigua
    if (fecha1 > fecha2) {
        [fecha1, fecha2] = [fecha2, fecha1];
    }
    
    let diffDias = Math.floor(Math.abs(fecha2 - fecha1) / (1000 * 60 * 60 * 24));
    
    // Calcular años, meses y días
    let anios = fecha2.getFullYear() - fecha1.getFullYear();
    let meses = fecha2.getMonth() - fecha1.getMonth();
    let dias = fecha2.getDate() - fecha1.getDate();
    
    if (dias < 0) {
        meses--;
        // Obtener último día del mes anterior
        let ultimoDiaMesAnterior = new Date(fecha2.getFullYear(), fecha2.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
    }
    
    if (meses < 0) {
        anios--;
        meses += 12;
    }
    
    return { dias: diffDias, anios, meses, diasRestantes: dias };
}

// Pedir primera fecha
let fecha1;
do {
    let fecha1Str = prompt("Introduce la primera fecha (dd/mm/aaaa):");
    if (fecha1Str === null) {
        break;
    }
    fecha1 = validarFecha(fecha1Str);
    if (!fecha1) {
        alert("Fecha inválida. Formato: dd/mm/aaaa y debe ser una fecha lógica");
    }
} while (!fecha1);

if (fecha1) {
    // Pedir segunda fecha
    let fecha2;
    do {
        let fecha2Str = prompt("Introduce la segunda fecha (dd/mm/aaaa):");
        if (fecha2Str === null) {
            break;
        }
        fecha2 = validarFecha(fecha2Str);
        if (!fecha2) {
            alert("Fecha inválida. Formato: dd/mm/aaaa y debe ser una fecha lógica");
        }
    } while (!fecha2);
    
    if (fecha2) {
        let diferencia = calcularDiferenciaCompleta(fecha1, fecha2);
        
        // Formatear fechas en español (sin horas)
        let formatoFecha1 = `${fecha1.getDate()}/${fecha1.getMonth() + 1}/${fecha1.getFullYear()}`;
        let formatoFecha2 = `${fecha2.getDate()}/${fecha2.getMonth() + 1}/${fecha2.getFullYear()}`;
        
        alert(`Entre ${formatoFecha1} y ${formatoFecha2} hay ${diferencia.dias} días:\n` +
            `${diferencia.anios} años, ${diferencia.meses} meses y ${diferencia.diasRestantes} días`);
    }
}