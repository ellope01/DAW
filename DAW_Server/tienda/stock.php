<?php
// Conexión a la base de datos
$dwes = mysqli_connect('localhost', 'root', '', 'tienda');
if (!$dwes) {
    die("Error conectando a la base de datos: " . mysqli_connect_error());
}

// Comprobamos que se ha pasado el código del producto
if (!isset($_GET['cod'])) {
    die("Error: No se ha especificado el producto");
}

$cod = mysqli_real_escape_string($dwes, $_GET['cod']);

// Si se ha enviado el formulario, actualizamos los valores
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    foreach ($_POST['unidades'] as $tienda => $valor) {
        $tienda = mysqli_real_escape_string($dwes, $tienda);
        $valor = intval($valor); // aseguramos que es número
        $update = "UPDATE stock SET unidades = $valor WHERE producto = '$cod' AND tienda = '$tienda'";
        $dwes->query($update);
    }
    echo "<p style='color: green;'>✔ Stock actualizado correctamente.</p>";
}

// Consulta para mostrar los datos actualizados
$consultaProducto = "SELECT nombre_corto FROM producto WHERE cod = '$cod'";
$resultadoProducto = $dwes->query($consultaProducto);

if ($resultadoProducto->num_rows === 0) {
    die("Error: Producto no encontrado");
}

$producto = $resultadoProducto->fetch_assoc();
$nombreProducto = $producto['nombre_corto'];

// Consulta de stock
$consultaStock = "SELECT tienda, unidades FROM stock WHERE producto = '$cod'";
$resultadoStock = $dwes->query($consultaStock);

echo "<h1>Stock del producto: " . htmlspecialchars($nombreProducto) . "</h1>";
echo "<p>Código: " . htmlspecialchars($cod) . "</p>";

if ($resultadoStock->num_rows > 0) {
    echo "<form method='POST'>";
    echo "<table border='1'>";
    echo "<tr><th>Tienda</th><th>Unidades</th></tr>";

    while ($stock = $resultadoStock->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($stock['tienda']) . "</td>";
        echo "<td><input type='number' name='unidades[" . htmlspecialchars($stock['tienda']) . "]' value='" . htmlspecialchars($stock['unidades']) . "' min='0'></td>";
        echo "</tr>";
    }

    echo "</table><br>";
    echo "<button type='submit'>Guardar cambios</button>";
    echo "</form>";
} else {
    echo "<p>No hay stock disponible para este producto.</p>";
}

echo "<br><a href='main.php'>Volver al listado de productos</a>";

$dwes->close();
?>
