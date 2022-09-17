<?php

    $output_file = "./";
    $response = [];
    if(isset($_POST['image64base']) && isset($_POST['profilepic']) && isset($_POST['name'])){
        extract($_POST);
        $base64_string = $image64base;
        //echo $base64_string;
        $decoder = base64_decode($base64_string);
        $img = imagecreatefromstring($decoder);
        
        if($img){
            //echo 'worked';
            imagejpeg($img, "./" . $name . ".jpg");
            //query to insert
            $response['addedimage'] = true;
        }
    }

    $json = json_encode($response);
    echo $json;
?>