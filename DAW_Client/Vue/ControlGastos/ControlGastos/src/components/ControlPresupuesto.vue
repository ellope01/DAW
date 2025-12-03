<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">
            <img></img>
        </div>
        <div class="contenedor-presupuesto">
            <button class="reset-app">Resetear app</button>
            <p>
                <span>Presupuesto: </span>
                0$
            </p>
            <p>
                <span>Disponible: </span>
                0$
            </p>
            <p>
                <span>Gastado: </span>
                0$
            </p>
        </div>
    </div>
</template>

<script>
import imagen from '../assets/img/grafico.jpg'
</script>

<style scoped>
.dos-columnas{
display: flex;
flex-direction: column;
}
.dos-columnas > :first-child{
margin-bottom: 3rem;
}
@media (min-width: 768px) {
.dos-columnas {
flex-direction: row;
gap: 4rem;
align-items: center;
}
.dos-columnas > :first-child{
margin-bottom: 0;
}
}
.reset-app {
background-color: #DB2777;
border: none;
padding: 1rem;
width: 100%;
color: var(--blanco);
font-weight: 900;
text-transform: uppercase;
border-radius: 1rem;
transition-property: background-color;
transition-duration: 300ms;
}
.reset-app:hover {
cursor: pointer;
background-color: #c11d67;
}
.contenedor-presupuesto {
width: 100%;
}
.contenedor-presupuesto p {
font-size: 2.4rem;
text-align:center;
color: var(--gris-oscuro);
}
@media (min-width: 768px){
.contenedor-presupuesto p {
text-align:left;
}
}
.contenedor-presupuesto span {
font-weight: 900;
color: var(--azul);
}
</style>