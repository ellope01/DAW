<?php
//Nos conectamos a la BBDD tienda con el usuario y la contraseña
$dwes = mysqli_connect('localhost', 'root', '', 'tienda');

//utilizamos esto para saber si da error a la conexión, utilizamos el die para 
//una vez mostrado el mensaje salimos del script (main.php)

if (!$dwes) {
    die("Error conectando a la base de datos: " . mysqli_connect_error());
}

//en consulta guadamos la consultq que queremos hacerle a la BBDD, donde en este caso 
//seleccionamos el "cod" y "nombre_corto" de producto y la ejecutamos en resultado
$consulta = 'SELECT cod, nombre_corto FROM producto';
$resultado = $dwes->query($consulta);

//realizamos un while para ir mostrando los resultado. En este caso hacemos un array associativo
//usamos un href para hacer un enlace "la pagina a la que hay que pasar" el ? (que indica el 
//indicio de la lista de parámetros que se van a pasar a la página) más luego el cod para pasar los datos
while ($producto = $resultado->fetch_assoc()) {
    echo '<a href="stock.php?cod=' . $producto['cod'] . '">'
        . htmlspecialchars($producto['nombre_corto'])
        . '</a><br>';
}

?>
