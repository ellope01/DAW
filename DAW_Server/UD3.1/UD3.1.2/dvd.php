<?php
require_once 'soporte.php';

class Dvd extends Soporte {
    private $idiomas;
    private $formatPantalla;

    public function __construct($titulo, $numero, $precio, $idiomas, $formatPantalla) {
        parent::__construct($titulo, $numero, $precio);
        $this->idiomas = $idiomas;
        $this->formatPantalla = $formatPantalla;
    }

    public function muestraResumen() {
        echo "Película en DVD:";
        parent::muestraResumen();
        echo "<br>Idiomas:" . $this->idiomas;
        echo "<br>Formato Pantalla:" . $this->formatPantalla;
    }
}
?>