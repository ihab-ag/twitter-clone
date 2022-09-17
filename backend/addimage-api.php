<?php

    $output_file = "./";
    if(isset($_POST['image64base']) && isset($_POST['profilepic'])){

        $base64_string = "data:image/png;base64,";
        $base64_string .= $_POST['image64base'];
        $decoder = base64_decode($base64_string);
        $img = imagecreatefromstring($decoder);

        if($img){
            echo 'worked';
            imagejpeg($img, "./file.jpg");
        }
    }
    
    
?>