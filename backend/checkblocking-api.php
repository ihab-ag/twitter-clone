<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    $response = [];
    if(isset($_POST['userid']) && isset($_POST['toblockuserid'])){
        $userid = $_POST['userid'];
        $toblockuserid = $_POST['toblockuserid'];
    
        $query = $mysqli->prepare("SELECT * FROM `blocked_users` WHERE userid  = ? AND blockinguserid  = ?");
        $query->bind_param("ss", $userid, $toblockuserid);
        $query->execute();
        $result = $query->get_result();
        
        $response = [];
        if($result->fetch_assoc()){
            $response["blocking"] = true;
        }
        else{
            $response["blocking"] = false;
        }
        //$response[]
        $json = json_encode($response);
        echo $json;
    }
?>