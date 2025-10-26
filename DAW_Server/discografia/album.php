<?php
require 'conexion.php';
$pdo = conectar();

$id = $_GET['id'] ?? null;
if (!$id) {
    die("❌ No se especificó un álbum.");
}

try {
    $stmt = $pdo->prepare("SELECT * FROM album WHERE codigo = ?");
    $stmt->execute([$id]);
    $album = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$album) {
        die("❌ Álbum no encontrado.");
    }

    $stmtCanciones = $pdo->prepare("SELECT * FROM cancion WHERE album = ?");
    $stmtCanciones->execute([$id]);
    $canciones = $stmtCanciones->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("❌ Error: " . $e->getMessage());
}
?>

<h2><?= htmlspecialchars($album['titulo']) ?> (<?= htmlspecialchars($album['discografica']) ?>)</h2>
<p><b>Formato:</b> <?= htmlspecialchars($album['formato']) ?></p>
<p><b>Fecha de lanzamiento:</b> <?= $album['fechaLanzamiento'] ?></p>
<p><b>Precio:</b> <?= $album['precio'] ?> €</p>

<h3>Canciones:</h3>
<ul>
<?php if (count($canciones) > 0): ?>
    <?php foreach ($canciones as $c): ?>
        <li><?= htmlspecialchars($c['titulo']) ?> (<?= $c['genero'] ?>)</li>
    <?php endforeach; ?>
<?php else: ?>
    <li>No hay canciones en este álbum.</li>
<?php endif; ?>
</ul>

<a href="cancionnueva.php?id=<?= $album['codigo'] ?>">➕ Añadir canción</a><br>
<a href="borraralbum.php?id=<?= $album['codigo'] ?>">🗑 Borrar álbum</a><br>
<a href="index.php">⬅ Volver</a>
