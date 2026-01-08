<?php
require_once 'soporte.php';

class CintaVideo extends Soporte
{
    private $duracion;

    public function __construct($titulo, $numero, $precio, $duracion)
    {
        parent::__construct($titulo, $numero, $precio);
        $this->duracion = $duracion;
    }

    // Getters y setters
    public function getDuracion()
    {
        return $this->duracion;
    }

    public function setDuracion($duracion)
    {
        $this->duracion = $duracion;
    }

    public function muestraResumen()
    {
        parent::muestraResumen();
        echo ", Duración: " . $this->duracion . " minutos";
    }
}
?>