<?php
    //Mirar si la imagen es del tipo permitido
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    if (false === $ext = array_search(
        $finfo -> file($_FILES['upfile']['tmp_name']),
        array(
            'jpg' => 'image/jpeg',
            'png' => 'image/png'
        ),
        true
    )){
        throw new RuntimeException('Invalid file format. ');
    }


    //Escalar la imagen 360x480
    imagescale(
        $image,
        360,
        480
    ); 

    //Miramos si la imagen es valida en cuanto al tamaño
    if ($ancho > 360 || $alto > 480 ){
        throw new RuntimeException(
            "La imagen es demasiado grande, el máximo permitivo es 360x480px"
        );
    }else{
        
    }
?>