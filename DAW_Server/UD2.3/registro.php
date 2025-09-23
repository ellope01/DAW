<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
</head>

<body>
    <?php
    include("./cabecera.inc.php");

    $exito = false;
    $mensaje = "";

    if (isset($_POST['password'], $_POST['password2'])) {
        if ($_POST['password'] !== $_POST['password2']) {
            $mensaje = "<p>Las contraseñas no coinciden</p>";
        } else {
            $exito = true;
        }
    }
    echo $mensaje;
    ?>


    <?php if ($exito): ?>
        <p>Registrado correctamente</p>
    <?php else: ?>
        <form action="registro.php" method="post">
            <label for="name">Nombre: </label>
            <input type="text" name="name" id="name" required>
            <br>
            <label for="surname">Apellidos: </label>
            <input type="text" name="surname" id="surname" required>
            <br>
            <label for="username">Nombre de usuario: </label>
            <input type="text" name="username" id="username" required>
            <br>
            <label for="password">Contraseña: </label>
            <input type="password" name="password" id="password" required>
            <br>
            <label for="password2">Repita la contraseña: </label>
            <input type="password" name="password2" id="password2" required>
            <br>
            <label for="email">Correo: </label>
            <input type="email" name="email" id="email" required placeholder="username@gmail.com" pattern=".+@gmail\.com">
            <br>
            <label for="birthDate">Fecha de nacimiento: </label>
            <input type="date" name="birthDate" required id="birthDate">
            <br>
            <label for="gender">Género: </label>
            <select id="gender" name="gender" required>
                <option value="">Seleciona...</option>
                <option value="f">Femenino</option>
                <option value="m">Masculino</option>
            </select>
            <br>
            <label for="checkboxCondiciones">¿Aceptas las condiciones?</label>
            <input type="checkbox" name="checkboxCondiciones" id="checkboxCondiciones" required>
            <br>
            <label for="checkboxPropaganda">¿Quieres que le mandemos información?</label>
            <input type="checkbox" name="checkboxPropaganda" id="checkboxPropaganda">
            <br>
            <input type="submit" value=Registrarse>
        </form>
    <?php endif; ?>



    <?php
    include("./footer.inc.php");
    ?>
</body>

</html>