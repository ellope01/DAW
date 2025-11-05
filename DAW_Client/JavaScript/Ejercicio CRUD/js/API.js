//Acciones con la API de Json Server
async function agregarCliente() {
    try {

        const respuesta = await fetch(url,{
            method : 'POST',
            body: JSON.stringify(cliente),
            headers:{
                'Content-type' : 'application/json'
            }
        });

        return respuesta;
    } catch (error) {
        console.log('Error al agragar cliente');
    }
}