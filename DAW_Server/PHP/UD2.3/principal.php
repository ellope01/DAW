<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>principal</title>
</head>

<body>
    <?php 
        include("./cabecera.inc.php");
    ?>


    <section>
        <p>Me llamo Elizabeth López Perucho, en 2022 comence el grado superior de DAM en la Florida Universitaria ,
            hace un año acabe e hize la especialización de inteligencia artificial
            y big data</p>
        <a href="mailto:elolopper3@alu.edu.gva.es">Mandame un correo</a>

        <p>Añadiendo imagen</p>
        <img src="./imagenes/Imagen.jpeg" alt="Imagen">
    </section>
    <section>
        <br></br>
        <form action="./consulta.php" method="post">
            Nombre: <input type="text" name="user" id="nombre">
            <br></br>
            Apellido: <input type="text" name="surname" id="surname">
            <br></br>
            Email: <input type="email" name="email" id="email">
            <br></br>
            <input type="checkbox">
            <br></br>
            Agrega la consulta:
            <textarea name="consulta"></textarea>
            <br></br>
            <input type="date">
            <br></br>
            <input type="submit" value="Enviar">
            <br></br>
        </form>
    </section>

    <nav>
        <a href="./tecnologias.php">Ir a la página de tecnologias</a>
        <a href="./rrss.php">Ir a la página de RRSS </a>
    </nav>

    <?php 
        include("./footer.inc.php");
    ?>
</body>

</html>