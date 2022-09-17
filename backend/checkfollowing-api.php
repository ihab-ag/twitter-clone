<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    
    if(isset($_POST['userid']) && isset($_POST['tofollowuserid'])){
        $username = $_POST['userid'];
        $tofollowusername = $_POST['tofollowuserid'];
    
        $query = $mysqli->prepare("SELECT * FROM `followers` WHERE followers.user_id = (SELECT users.id FROM users WHERE username = ?)
                                    AND followers.followed_user_id = (SELECT users.id FROM users WHERE username = ?)");
        $query->bind_param("ss", $username, $tofollowusername);
        $query->execute();
        $result = $query->get_result();
        
        $response = [];
        if($result->fetch_assoc()){
            $response["following"] = true;
        }
        else{
            $response["following"] = false;
        }
        //$response[]
        $json = json_encode($response);
        echo $json;
    }
?>