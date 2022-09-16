<?php

    include("connection.php");
    if(isset($_POST['username'])){
        extract($_POST);
        //echo $username;
        $query = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
        $query->bind_param("s", $username);
        $query->execute();
        $result = $query->get_result();
        $response = [];

        if($result->fetch_assoc()){
            $response["usernamefound"] = true;
        }
        else{
            $response["usernamefound"] = false;
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
            $response["emailfound"] = true;
        }
        else{
            $response["emailfound"] = false;
        }

        $json = json_encode($response);
        echo $json;
    }

    
?>