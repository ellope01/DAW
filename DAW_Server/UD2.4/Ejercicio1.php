<?php
function comprobarNumero($num1, $num2)
{
    try {
        if (!is_numeric($num1) || !is_numeric($num2)) {
            throw new Exception("Los valores deben de ser numeros");
        }
        return $num1 + $num2;
    } catch (Exception $e) {
        return "Se tienen que pasar numeros";
    }
}

echo comprobarNumero(num1: 'h',num2: 2)
?>