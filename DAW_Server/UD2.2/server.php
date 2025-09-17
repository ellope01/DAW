<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <?php

    include("./cabecera.inc.php");
    $_SERVER;
    echo '<table>';
    foreach ($_SERVER as $clave => $valor) {
        echo "<tr>";
        echo "<td>" . $clave . "</td>";
        echo "<td>" . $valor . "</td>";
        echo "</tr>";

    }
    echo '</table>';
    include("./footer.inc.php");

    ?>
</body>

</html>