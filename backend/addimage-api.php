<?php
    $output_file = "./";
    $base64_string = '';
    $decoder = base64_decode($base64_string);

    $img = imagecreatefromstring($decoder);

    if($img){
        imagejpeg($img, "./file.jpg");
    }
?>