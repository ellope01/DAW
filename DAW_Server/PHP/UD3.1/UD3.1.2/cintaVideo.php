<?php
require_once 'soporte.php';

class CintaVideo extends Soporte {
    private $duracion;

    public function __construct($titulo, $numero, $precio, $duracion) {
        parent::__construct($titulo, $numero, $precio);
        $this->duracion = $duracion;
    }

    public function muestraResumen() {
        echo "Película en VHS:";
        parent::muestraResumen();
        echo "<br>Duración: " . $this->duracion . " minutos";
    }
}
?>