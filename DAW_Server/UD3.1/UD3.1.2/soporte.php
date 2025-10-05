<?php
class Soporte {
    public $titulo;
    protected $numero;
    private $precio;
    private const IVA = 0.21;

    public function __construct($titulo, $numero, $precio) {
        $this->titulo = $titulo;
        $this->numero = $numero;
        $this->precio = $precio;
    }

    public function getNumero() {
        return $this->numero;
    }

    public function getPrecio() {
        return $this->precio;
    }

    public function getPrecioConIva() {
        return $this->precio * (1 + self::IVA);
    }

    public function muestraResumen() {
        echo "<br>" . $this->titulo;
        echo "<br>" . $this->precio . " € (IVA no incluido)";
    }
}
?>