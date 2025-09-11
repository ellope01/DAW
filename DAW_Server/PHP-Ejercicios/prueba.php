<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Primera prueba php</title>
</head>

<body>
    Este es un archivo php que se encuentra en el servidor.
    <?php
        include("archivo.php");
        include_once("otro.php");
        require("prueba.inc.php");
        require_once("inventado.php");
    ?>
</body>

</html>