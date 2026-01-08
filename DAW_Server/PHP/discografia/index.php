<?php
require 'conexion.php';

try {
    $pdo = conectar();
    $stmt = $pdo->query("SELECT * FROM album ORDER BY codigo DESC");
    $albumes = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("❌ Error al obtener los álbumes: " . $e->getMessage());
}
?>

<h1>Discografía</h1>

<a href="albumnuevo.php">➕ Añadir nuevo álbum</a> |
<a href="canciones.php">🎵 Buscar canciones</a>

<ul>
<?php if (count($albumes) > 0): ?>
    <?php foreach ($albumes as $album): ?>
        <li>
            <a href="album.php?id=<?= $album['codigo'] ?>">
                <?= htmlspecialchars($album['titulo']) ?> 
                (<?= htmlspecialchars($album['discografica']) ?>)
            </a>
        </li>
    <?php endforeach; ?>
<?php else: ?>
    <li>No hay álbumes disponibles.</li>
<?php endif; ?>
</ul>

<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
