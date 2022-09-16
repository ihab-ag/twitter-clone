<?php

    include("connection.php");
    if(isset($_POST['username'])){
        extract($_POST);
        //echo $username;
        $query = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
        $query->bind_param("s", $username);
        $query->execute();
        $array = $query->get_result();
    
        $response = [];
    
        while($a = $array->fetch_assoc()){
            $response[] = $a;
        }
    
        $json = json_encode($response);
        echo $json;
    }

    if(isset($_POST['email'])){
        extract($_POST);
        $query = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
        $query->bind_param("s", $email);
        $query->execute();
        $result = $query->get_result();
        $response = [];
        if($result->fetch_assoc()){
            $response["success"] = true;
        }
        else{
            $response["success"] = false;
        }
        $json = json_encode($response);
        echo $json;
    }

    
?>