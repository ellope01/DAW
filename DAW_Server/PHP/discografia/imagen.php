<?php
    //Mirar si la imagen es del tipo permitido
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    if (false === $ext = array_search(
        $finfo -> file($_FILES['upfile']['tmp_name']),
        array(
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
        ),
        true
    )){
        throw new RuntimeException('Invalid file format. ');
    }

    //Cargamos la imagen
    if($ext === 'png'){
        $image = imagecreatefrompng($_FILES['upfile']['tmp_name']);
        $tipo = 'png';
    }else{
        $image = imagecreatefromjpeg($_FILES['upfile']['tmp_name']);
    }

    //Conseguimos los datos de la imagen
    $tamano = getimagesize($_FILES['upfile']['tmp_name']);
    $ancho = $tamano[0];
    $alto = $tamano[1];

    //Miramos si la imagen es valida en cuanto al tamaño
    if ($ancho > 360 || $alto > 480 ){
        throw new RuntimeException(
            "La imagen es demasiado grande, el máximo permitivo es 360x480px"
        );
    }else{
        $imagenGrande = imagescale(
            $image, 360, 480
        );
        $imagenEnana = imagescale(
            $image, 72, 96
        );
        if($tipo === 'png'){
            imagepng(); //guardar imagen de formato png
        }else{
            imagejpeg(); //guardar imagen de formato jpg
        }
    }
?>