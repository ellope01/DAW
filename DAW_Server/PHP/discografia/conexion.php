<?php
function conectar() {
    try {
        $pdo = new PDO("mysql:host=localhost;dbname=discografia;charset=utf8mb4", "discografia", "discografia");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Error de conexión: " . $e->getMessage());
    }
}
?>
