<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");

    if(isset($_POST['userid']) && isset($_POST['toblockuserid']) && isset($_POST['todo'])){
        extract($_POST);
        if($todo == "block"){

        }
        else if($todo == "unblock"){

        }
    }
    $json = json_encode($response);
    echo $json;
?>