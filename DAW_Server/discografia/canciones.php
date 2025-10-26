<?php
require 'conexion.php';
$pdo = conectar();

$resultados = [];
$texto = $_GET['texto'] ?? '';
$buscarEn = $_GET['buscarEn'] ?? 'ambos';
$genero = $_GET['genero'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $texto !== '') {
    try {
        $sql = "SELECT c.*, a.titulo AS album_titulo
                FROM cancion c
                JOIN album a ON c.album = a.codigo
                WHERE 1";

        $params = [];

        if ($buscarEn == 'cancion') {
            $sql .= " AND c.titulo LIKE ?";
            $params[] = "%$texto%";
        } elseif ($buscarEn == 'album') {
            $sql .= " AND a.titulo LIKE ?";
            $params[] = "%$texto%";
        } else {
            $sql .= " AND (c.titulo LIKE ? OR a.titulo LIKE ?)";
            $params[] = "%$texto%";
            $params[] = "%$texto%";
        }

        if ($genero != '') {
            $sql .= " AND c.genero = ?";
            $params[] = $genero;
        }

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        die("❌ Error: " . $e->getMessage());
    }
}
?>

<h2>Búsqueda de canciones</h2>

<form method="GET">
    <label>Texto a buscar:</label>
    <input type="text" name="texto" value="<?= htmlspecialchars($texto) ?>"><br>

    <label>Buscar en:</label>
    <input type="radio" name="buscarEn" value="cancion" <?= $buscarEn == 'cancion' ? 'checked' : '' ?>> Títulos de canción
    <input type="radio" name="buscarEn" value="album" <?= $buscarEn == 'album' ? 'checked' : '' ?>> Nombres de álbum
    <input type="radio" name="buscarEn" value="ambos" <?= $buscarEn == 'ambos' ? 'checked' : '' ?>> Ambos campos<br>

    <label>Género musical:</label>
    <select name="genero">
        <option value="">Todos</option>
        <option value="Clásica">Clásica</option>
        <option value="BSO">BSO</option>
        <option value="Blues">Blues</option>
        <option value="Electrónica">Electrónica</option>
        <option value="Jazz">Jazz</option>
        <option value="Metal">Metal</option>
        <option value="Pop">Pop</option>
        <option value="Rock">Rock</option>
    </select>

    <input type="submit" value="Buscar">
</form>

<h3>Resultados:</h3>
<ul>
<?php if (count($resultados) > 0): ?>
    <?php foreach ($resultados as $r): ?>
        <li><?= htmlspecialchars($r['titulo']) ?> (<?= htmlspecialchars($r['album_titulo']) ?>) - <?= htmlspecialchars($r['genero']) ?></li>
    <?php endforeach; ?>
<?php else: ?>
    <li>No se encontraron canciones.</li>
<?php endif; ?>
</ul>
