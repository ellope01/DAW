<?php
class numeros extends Exception
{
    public function mensajeError()
    {
        $men = 'Error al introducir el segundo número';
        return $men;
    }

}
function divisible($n1, $n2)
{
    try {
        if ((!is_numeric($n1) || !is_numeric($n2)) || $n2 === 0) {
            throw new numeros;
        }
        return $n1/$n2;
    } catch (numeros $e) {
        return "Se tienen que pasar numeros que no sean 0 como segundo numero";
    }
}

echo divisible(42,0);

?>