<?php
require_once 'soporte.php';

class Juego extends Soporte {
    private $consola;
    private $minNumJugadores;
    private $maxNumJugadores;

    public function __construct($titulo, $numero, $precio, $consola, $minNumJugadores, $maxNumJugadores) {
        parent::__construct($titulo, $numero, $precio);
        $this->consola = $consola;
        $this->minNumJugadores = $minNumJugadores;
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
        echo "Juego para: " . $this->consola;
        parent::muestraResumen();
        echo "<br>" . $this->muestraJugadoresPosibles();
    }
}
?>