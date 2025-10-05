<?php
class Soporte {
    public $titulo;
    protected $numero;
    private $precio;
    private const IVA = 0.21;

    // Constructor
    public function __construct($titulo, $numero, $precio) {
        $this->titulo = $titulo;
        $this->numero = $numero;
        $this->precio = $precio;
    }

    // Getters y setters
    public function getNumero() {
        return $this->numero;
    }

    public function setNumero($numero) {
        $this->numero = $numero;
    }

    public function getPrecio() {
        return $this->precio;
    }

    public function setPrecio($precio) {
        $this->precio = $precio;
    }

    public function getPrecioConIVA() {
        return $this->precio * (1 + self::IVA);
    }

    // MÉTODO CORREGIDO:
    public function muestraResumen() {
        echo "<br>" . $this->titulo;
        echo "<br>" . $this->precio . " € (IVA no incluido)";
    }
}
?>