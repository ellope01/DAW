<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Count</title>
</head>

<body>
    <?php
    include("./cabecera.inc.php");

    for ($i = 1; $i <= 30; $i++) {
        echo "<p>$i</p>";
    }

    $number = 5;
    $factorial = 1;
    $steps = "";

    for ($i = $number; $i >= 1; $i--) {
        $factorial *= $i;
        $steps .= $i;
        if ($i > 1) {
            $steps .= " x ";
        }
    }

    echo "$number! = $steps = $factorial";
        
    include("./footer.inc.php");

    ?>

</body>

</html>