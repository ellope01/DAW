<?php
require 'conexion.php';
$pdo = conectar();

$id = $_GET['id'] ?? null;
if (!$id) {
    die("❌ No se especificó un álbum.");
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("DELETE FROM cancion WHERE album = ?");
    $stmt->execute([$id]);

    $stmt = $pdo->prepare("DELETE FROM album WHERE codigo = ?");
    $stmt->execute([$id]);

    $pdo->commit();
    header("Location: index.php?msg=Álbum borrado correctamente");
    exit;
} catch (PDOException $e) {
    $pdo->rollBack();
    die("❌ Error al borrar el álbum: " . $e->getMessage());
}
?>
