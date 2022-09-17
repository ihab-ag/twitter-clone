<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    
    if(isset($_POST['tweetID']) && isset($_POST['userID'])){
        extract($_POST);
        $json = json_encode($response);
        echo $json;
    }
?>