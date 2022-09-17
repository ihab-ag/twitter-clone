<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    if(isset($_POST['tweet_text']) && isset($_POST['userid']) && isset($_POST['hasimage'])){
        extract($_POST);
        
    }
    $json = json_encode($response);
    echo $json;

?>