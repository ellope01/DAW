<?php
require 'conexion.php';
$pdo = conectar();

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'] ?? '';
    $discografica = $_POST['discografica'] ?? '';
    $formato = $_POST['formato'] ?? '';
    $fechaLanzamiento = $_POST['fechaLanzamiento'] ?? null;
    $fechaCompra = $_POST['fechaCompra'] ?? null;
    $precio = $_POST['precio'] ?? null;

    try {
        $sql = "INSERT INTO album (titulo, discografica, formato, fechaLanzamiento, fechaCompra, precio)
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$titulo, $discografica, $formato, $fechaLanzamiento, $fechaCompra, $precio]);
        $mensaje = "✅ Álbum añadido correctamente.";
    } catch (PDOException $e) {
        $mensaje = "❌ Error al añadir el álbum: " . $e->getMessage();
    }
}
?>

<h2>Añadir nuevo álbum</h2>
<p><?= $mensaje ?></p>

<form method="POST">
    <label>Título:</label>
    <input type="text" name="titulo" required><br>

    <label>Discográfica:</label>
    <input type="text" name="discografica" required><br>

    <label>Formato:</label>
    <select name="formato" required>
        <option value="vinilo">Vinilo</option>
        <option value="cd">CD</option>
        <option value="dvd">DVD</option>
        <option value="mp3">MP3</option>
    </select><br>

    <label>Fecha de lanzamiento:</label>
    <input type="date" name="fechaLanzamiento"><br>

    <label>Fecha de compra:</label>
    <input type="date" name="fechaCompra"><br>

    <label>Precio:</label>
    <input type="number" step="0.01" name="precio"><br><br>

    <input type="submit" value="Guardar">
</form>

<a href="index.php">⬅ Volver</a>
