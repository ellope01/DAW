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

// Si se ha enviado el formulario, actualizamos los valores CON TRANSACCIÓN
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Iniciamos transacción
    $dwes->begin_transaction();
    
    $error = false;
    
    try {
        // Preparamos la consulta una sola vez
        $stmt = $dwes->prepare("UPDATE stock SET unidades = ? WHERE producto = ? AND tienda = ?");
        
        if (!$stmt) {
            throw new Exception("Error preparando la consulta: " . $dwes->error);
        }
        
        // Vinculamos parámetros
        $stmt->bind_param("iss", $unidades, $cod_producto, $tienda_nombre);
        $cod_producto = $cod;
        
        // Ejecutamos para cada tienda
        foreach ($_POST['unidades'] as $tienda => $valor) {
            $tienda_nombre = mysqli_real_escape_string($dwes, $tienda);
            $unidades = intval($valor);
            
            if (!$stmt->execute()) {
                throw new Exception("Error actualizando stock para tienda $tienda: " . $stmt->error);
            }
        }
        
        $stmt->close();
        
        // Confirmamos la transacción
        $dwes->commit();
        echo "<p style='color: green;'>El Stock se ha actualizado.</p>";
        
    } catch (Exception $e) {
        // Si hay error, hacemos rollback
        $dwes->rollback();
        echo "<p style='color: red;'>Error: " . $e->getMessage() . "</p>";
    }
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

echo "<h2>Stock del producto en las tiendas:</h2>";

if ($resultadoStock->num_rows > 0) {
    echo "<form method='POST'>";
    
    while ($stock = $resultadoStock->fetch_assoc()) {
        echo "Tienda " . htmlspecialchars($stock['tienda']) . ": ";
        echo "<input type='number' name='unidades[" . htmlspecialchars($stock['tienda']) . "]' ";
        echo "value='" . htmlspecialchars($stock['unidades']) . "' min='0' style='width: 60px;'>";
        echo " unidades.<br><br>";
    }

    echo "<br><button type='submit'>Actualizar</button>";
    echo "</form>";
} else {
    echo "<p>No hay stock disponible para este producto.</p>";
}

echo "<br><a href='main.php'>← Volver al listado de productos</a>";

$dwes->close();
?>