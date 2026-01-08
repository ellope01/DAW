<?php
require 'conexion.php';
$pdo = conectar();

$id = $_GET['id'] ?? null;
if (!$id) {
    die("❌ No se especificó un álbum.");
}

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'] ?? '';
    $posicion = $_POST['posicion'] ?? null;
    $duracion = $_POST['duracion'] ?? null;
    $genero = $_POST['genero'] ?? '';

    try {
        $stmt = $pdo->prepare("INSERT INTO cancion (titulo, album, posicion, duracion, genero) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$titulo, $id, $posicion, $duracion, $genero]);
        $mensaje = "✅ Canción añadida correctamente.";
    } catch (PDOException $e) {
        $mensaje = "❌ Error al añadir la canción: " . $e->getMessage();
    }
}
?>

<h2>Nueva canción para el álbum <?= $id ?></h2>
<p><?= $mensaje ?></p>

<form method="POST">
    <label>Título:</label>
    <input type="text" name="titulo" required><br>

    <label>Posición:</label>
    <input type="number" name="posicion"><br>

    <label>Duración (hh:mm:ss):</label>
    <input type="time" name="duracion" step="1"><br>

    <label>Género:</label>
    <select name="genero" required>
        <option value="Clásica">Clásica</option>
        <option value="BSO">BSO</option>
        <option value="Blues">Blues</option>
        <option value="Electrónica">Electrónica</option>
        <option value="Jazz">Jazz</option>
        <option value="Metal">Metal</option>
        <option value="Pop">Pop</option>
        <option value="Rock">Rock</option>
    </select><br><br>

    <input type="submit" value="Guardar">
</form>

<a href="album.php?id=<?= $id ?>">⬅ Volver</a>
