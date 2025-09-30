let palabras = [];
let palabra;
do {
    palabra = prompt("Introduce una palabra: ");
    if (palabra !== null && palabra !== "") {
        palabras.push(palabra);
        palabras = palabras.filter(palabra => {
            let palabraTrim = palabra.trim();
            return palabraTrim.match(/[0-9]/) === null && !palabraTrim.includes(" ");
        }
        );
        palabras.sort((a,b) =>{
            if (a > b) return -1; 
            if (a < b) return 1;  
            return 0; 
        }
    );
    }

} while (palabra !== null && palabra !== "");

palabras.forEach((palabra, index) => {
    console.log(`El elemento ${index + 1} es: ${palabra}`);
});