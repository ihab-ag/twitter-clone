<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    
    if(isset($_POST['userid']) && isset($_POST['tofollowuserid'])){
        $userid = $_POST['userid'];
        $tofollowuserid = $_POST['tofollowuserid'];
    
        $query = $mysqli->prepare("SELECT * FROM `followers` WHERE followers.user_id = ?
                                    AND followers.followed_user_id = ?");
        $query->bind_param("ss", $userid, $tofollowuserid);
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