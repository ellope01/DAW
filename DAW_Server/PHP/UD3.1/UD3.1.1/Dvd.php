<?php
require_once 'soporte.php';

class Dvd extends Soporte {
    private $duracion;
    public $idiomas;
    protected $formatPantalla;

    public function __construct($titulo, $numero, $precio, $duracion, $idiomas, $formatPantalla) {
        parent::__construct($titulo, $numero, $precio);
        $this->duracion = $duracion;
        $this->idiomas = $idiomas;
        $this->formatPantalla = $formatPantalla;
    }

    // Getters y setters
    public function getDuracion() {
        return $this->duracion;
    }

    public function setDuracion($duracion) {
        $this->duracion = $duracion;
    }

    public function getFormatPantalla() {
        return $this->formatPantalla;
    }

    public function setFormatPantalla($formatPantalla) {
        $this->formatPantalla = $formatPantalla;
    }

    public function muestraResumen() {
        parent::muestraResumen();
        echo ", Duración: " . $this->duracion . " minutos";
        echo ", Idiomas: " . (is_array($this->idiomas) ? implode(", ", $this->idiomas) : $this->idiomas);
        echo ", Formato pantalla: " . $this->formatPantalla;
    }
}
?>