<?php

    include("connection.php");
    $response = [];
    if(isset($_POST['username'])){
        extract($_POST);
        //echo $username;
        $query = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
        $query->bind_param("s", $username);
        $query->execute();
        $result = $query->get_result();
        
        
        if($result->fetch_assoc()){
            $response["usernamefound"] = true;
        }
        else{
            $response["usernamefound"] = false;
        }
    }

    if(isset($_POST['email'])){
        extract($_POST);
        $query = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
        $query->bind_param("s", $email);
        $query->execute();
        $result = $query->get_result();


        if($result->fetch_assoc()){
            $response["emailfound"] = true;
        }
        else{
            $response["emailfound"] = false;
        }
    }
    if(isset($response['emailfound']) && isset($response['usernamefound'])){
        if($response['emailfound'] == false && $response["usernamefound"] == false && isset($_POST['password']) && isset($_POST['fname']) && isset($_POST['lname'])){
            $query = $mysqli->prepare("INSERT INTO `users` (`id`, `username`, `fname`, `lname`, `email`, `bio`, `password`, `tweet_count`) 
            VALUES (NULL, ?, ?, ?, ?, 'Biography, edit in profile.', ?, '0');");
            $hasedpass = md5($password);
            $query->bind_param("sssss", $username, $fname, $lname, $email, $hasedpass);
            $query->execute();
            $result = $query->get_result();
            $response['useradded'] = true;
        }
        $json = json_encode($response);
        echo $json;
    }
?>