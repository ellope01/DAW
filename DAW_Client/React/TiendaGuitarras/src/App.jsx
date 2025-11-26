import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitarra from "./components/Guitarra";
import { db } from "./data/db";



function App() {

    const carritoInicial = () => {
        const localStorageCarrito = localStorage.getItem('carrito')
        return (localStorageCarrito !== null) ? JSON.parse(localStorageCarrito):[]
    }
    
    //const [data, setData] = useState(db);
    const [carrito, setCarrito] = useState(carritoInicial)

    function anyadirAlCarrito(articulo) {
        const articuloExistente = carrito.findIndex(element => articulo.id === element.id);
        if (articuloExistente >= 0) {
            const copiaCarrito = [...carrito];
            copiaCarrito[articuloExistente].cantidad++;
            setCarrito(copiaCarrito);
        } else {
            articulo.cantidad = 1;
            setCarrito(carrito => [...carrito, articulo])
        }
    }


    function eliminarDelCarrito(id){
        const nuevoCarrito = () => carrito.filter(element => element.id !== id);
        setCarrito(nuevoCarrito);
    }

    function agregarCarrito(id){
        const nuevoCarrito = () => carrito.filter(element => element.cantidad++);
        setCarrito(nuevoCarrito);
    }

        function eliminarCarrito() {
        const nuevoCarrito = carrito.filter(element => element.cantidad > 1)
            .map(element => ({
                ...element, 
                cantidad: element.cantidad - 1
            }));
        setCarrito(nuevoCarrito);
    }


    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito]);

    return (
        <>
            <Header
                carrito={carrito}
                eliminarDelCarrito = {eliminarDelCarrito}
                agregarCarrito = {agregarCarrito}
                eliminarCarrito = {eliminarCarrito}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map(element => (
                        <Guitarra
                            key={element.id}
                            guitarraObj={element}
                            //carrito={carrito}
                            anyadirAlCarrito={anyadirAlCarrito}
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    );
}

export default App;
