<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    $response = [];
    if(isset($_POST['userid']) && isset($_POST['toblockuserid']) && isset($_POST['todo'])){
        extract($_POST);
        if($todo == "block"){
            $query = $mysqli->prepare("INSERT INTO `blocked_users` (`userid`, `blockinguserid`) VALUES (?,?)");
            $query->bind_param("ii", $userid, $toblockuserid);
            $query->execute();
            $result = $query->get_result();
            $response['nowblocking'] = true;
            $query = $mysqli->prepare("DELETE FROM `followers` WHERE user_id = ? AND followed_user_id = ?");
            $query->bind_param("ii", $userid, $toblockuserid);
            $query->execute();
            $result = $query->get_result();
            $query = $mysqli->prepare("DELETE FROM `followers` WHERE user_id = ? AND followed_user_id = ?");
            $query->bind_param("ii", $toblockuserid, $userid);
            $query->execute();
            $result = $query->get_result();
        }
        else if($todo == "unblock"){
            $query = $mysqli->prepare("DELETE FROM `blocked_users` WHERE userid = ? AND blockinguserid = ?");
            $query->bind_param("ii", $userid, $toblockuserid);
            $query->execute();
            $result = $query->get_result();

            $response['nowunblocked'] = true;
        }
    }
    $json = json_encode($response);
    echo $json;
?>