<?php
require_once 'soporte.php';

class Juego extends Soporte {
    public $consola;
    private $minNumJugadores;
    private $maxNumJugadores;

    public function __construct($titulo, $numero, $precio, $consola, $minNumJugadores, $maxNumJugadores) {
        parent::__construct($titulo, $numero, $precio);
        $this->consola = $consola;
        $this->minNumJugadores = $minNumJugadores;
        $this->maxNumJugadores = $maxNumJugadores;
    }

    // Getters y setters
    public function getMinNumJugadores() {
        return $this->minNumJugadores;
    }

    public function setMinNumJugadores($minNumJugadores) {
        $this->minNumJugadores = $minNumJugadores;
    }

    public function getMaxNumJugadores() {
        return $this->maxNumJugadores;
    }

    public function setMaxNumJugadores($maxNumJugadores) {
        $this->maxNumJugadores = $maxNumJugadores;
    }

    public function muestraJugadoresPosibles() {
        if ($this->minNumJugadores == $this->maxNumJugadores) {
            if ($this->minNumJugadores == 1) {
                return "Para un jugador";
            } else {
                return "Para " . $this->minNumJugadores . " jugadores";
            }
        } else {
            return "De " . $this->minNumJugadores . " a " . $this->maxNumJugadores . " jugadores";
        }
    }

    public function muestraResumen() {
        parent::muestraResumen();
        echo ", Consola: " . $this->consola . ", " . $this->muestraJugadoresPosibles();
    }
}
?>