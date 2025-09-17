<footer>
    <p>Elizabeth López</p>

    <?php
    $today = getdate();
    $arrayFecha=[["Enero","Febrero","Marzo", "Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]];

    $mesNumero=$arrayFecha[0][$today["mon"]-1];
    $semanaNumero=$arrayFecha[1][$today["wday"]];
    $anyoNumero=$today["year"];
    $diaNumero=$today["mday"];
    $hoy=$semanaNumero. ", ". $diaNumero. " de ".$mesNumero. " de ". $anyoNumero;
    
    echo '<p>'. $hoy . '<p>';
    
    ?>

</footer>