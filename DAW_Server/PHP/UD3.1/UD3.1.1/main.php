<?php
include "Soporte.php";

$soportel = new Soporte("Tenet", 22, 3);
echo "<strong>" . $soportel->titulo . "</strong>";
echo "<br>Precio: " . $soportel->getPrecio() . " euros";
echo "<br>Precio IVA incluido: " . $soportel->getPrecioConIVA() . " euros";
$soportel->muestraResumen();
?>