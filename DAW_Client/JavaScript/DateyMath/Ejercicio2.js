class Punto {
    constructor(nombre, x, y) {
        this.nombre = nombre;
        this.x = x;
        this.y = y;
    }
    
    static mostrar(punto) {
        alert(`Las coordenadas de "${punto.nombre}" son (${punto.x}, ${punto.y})`);
    }
    
    copiar() {
        return new Punto(this.nombre + "copia", this.x, this.y);
    }
    
    cambiar(nuevaX, nuevaY) {
        this.x = Math.round(nuevaX);
        this.y = Math.round(nuevaY);
    }
    
    static iguales(punto1, punto2) {
        return punto1.x === punto2.x && punto1.y === punto2.y;
    }
    
    sumar(valorX, valorY) {
        return new Punto(this.nombre + "Suma", this.x + valorX, this.y + valorY);
    }
    
    static obtenerDistancia(punto1, punto2) {
        const diffX = punto2.x - punto1.x;
        const diffY = punto2.y - punto1.y;
        return Math.sqrt(diffX * diffX + diffY * diffY);
    }
}

function pedirCoordenada(tipo, rangoMin, rangoMax) {
    let valor;
    do {
        const input = prompt(`Indica la coordenada ${tipo} (Entre ${rangoMin} y ${rangoMax})`);
        if (input === null) return null;
        
        valor = parseFloat(input);
        if (isNaN(valor)) {
            valor = 0;
        } else {
            valor = Math.trunc(valor);
        }
        
        if (valor < rangoMin || valor > rangoMax) {
            alert(`El valor debe estar entre ${rangoMin} y ${rangoMax}`);
        }
    } while (valor < rangoMin || valor > rangoMax);
    
    return valor;
}

const RANGO_MIN = -6;
const RANGO_MAX = 6;

const x1 = pedirCoordenada("X", RANGO_MIN, RANGO_MAX);
if (x1 === null) {
    alert("Ha cancelado, el programa NO seguirá");
} else {
    const y1 = pedirCoordenada("Y", RANGO_MIN, RANGO_MAX);
    if (y1 === null) {
        alert("Ha cancelado, el programa NO seguirá");
    } else {
        const punto1 = new Punto("punto1", x1, y1);
        Punto.mostrar(punto1);
        
        const punto2 = punto1.copiar();
        punto2.nombre = "punto2";
        Punto.mostrar(punto2);
        
        const cambiarCoordenadas = confirm("¿Quieres modificar las coordenadas del punto2?");
        
        if (cambiarCoordenadas) {
            const nuevaX = pedirCoordenada("X nueva", RANGO_MIN, RANGO_MAX);
            if (nuevaX === null) {
                alert("Ha cancelado, el programa NO seguirá");
            } else {
                const nuevaY = pedirCoordenada("Y nueva", RANGO_MIN, RANGO_MAX);
                if (nuevaY === null) {
                    alert("Ha cancelado, el programa NO seguirá");
                } else {
                    punto2.cambiar(nuevaX, nuevaY);
                    Punto.mostrar(punto2);
                    
                    if (Punto.iguales(punto1, punto2)) {
                        const randomX = Math.floor(Math.random() * (RANGO_MAX - RANGO_MIN + 1)) + RANGO_MIN;
                        const randomY = Math.ceil(Math.random() * (RANGO_MAX - RANGO_MIN + 1)) + RANGO_MIN;
                        
                        const punto3 = punto1.sumar(randomX, randomY);
                        punto3.nombre = "punto3";
                        Punto.mostrar(punto3);
                        
                        const distancia = Punto.obtenerDistancia(punto1, punto3);
                        alert(`La distancia entre los puntos "${punto1.nombre}" --> (${punto1.x}, ${punto1.y}) y "${punto3.nombre}" --> (${punto3.x}, ${punto3.y}) es ${distancia.toFixed(2)}`);
                    } else {
                        const distancia = Punto.obtenerDistancia(punto1, punto2);
                        alert(`La distancia entre los puntos "${punto1.nombre}" --> (${punto1.x}, ${punto1.y}) y "${punto2.nombre}" --> (${punto2.x}, ${punto2.y}) es ${distancia.toFixed(2)}`);
                    }
                }
            }
        } else {
            const randomX = Math.floor(Math.random() * (RANGO_MAX - RANGO_MIN + 1)) + RANGO_MIN;
            const randomY = Math.ceil(Math.random() * (RANGO_MAX - RANGO_MIN + 1)) + RANGO_MIN;
            
            const punto3 = punto1.sumar(randomX, randomY);
            punto3.nombre = "punto3";
            Punto.mostrar(punto3);
            
            const distancia = Punto.obtenerDistancia(punto1, punto3);
            alert(`La distancia entre los puntos "${punto1.nombre}" --> (${punto1.x}, ${punto1.y}) y "${punto3.nombre}" --> (${punto3.x}, ${punto3.y}) es ${distancia.toFixed(2)}`);
        }
    }
}