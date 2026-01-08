<?php
    echo 'Nombre y apellidos: ';
    echo $_POST['user'].''.$_POST['surname'];
    echo '<br></br>';
    echo 'Correo electronico: ';
    echo $_POST['email'];
    echo '<br></br>';
    echo 'La consulta es: ';
    echo $_POST['consulta'];

?>