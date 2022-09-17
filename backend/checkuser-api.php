<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    
    if(isset($_POST['username']) && isset($_POST['password'])){
        $username = $_POST['username'];
        $password = $_POST['password'];
    
        $query = $mysqli->prepare("SELECT * FROM `users` WHERE username = ? AND password = ?");
        $query->bind_param("ss", $username, $password);
        $query->execute();
        $result = $query->get_result();
        
        $response = [];

        while($a = $result->fetch_assoc()){
            $response['user'] = $a;
        }

        if(isset($response['user'])){
            $response["success"] = true;
        }
        else{
            $response["success"] = false;
        }
        
        $json = json_encode($response);
        echo $json;
    }
?>