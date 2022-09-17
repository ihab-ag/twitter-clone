<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");

    if(isset($_POST['userid']) && isset($_POST['tofollowuserid']) && isset($_POST['todo'])){
        extract($_POST);
        if($todo == "follow"){
            $query = $mysqli->prepare("INSERT INTO `followers` (`user_id`, `followed_user_id`) VALUES (?,?)");
            $query->bind_param("ii", $userid, $tofollowuserid);
            $query->execute();
            $result = $query->get_result();
            $response['nowfollowing'] = true;
        }
        else if($todo == "unfollow"){
            $query = $mysqli->prepare("DELETE FROM followers WHERE `followers`.`user_id` = ? AND `followers`.`followed_user_id` = ?");
            $query->bind_param("ii", $userid, $tofollowuserid);
            $query->execute();
            $result = $query->get_result();
            $response['nowunfollowed'] = true;
        }
    }
    $json = json_encode($response);
    echo $json;
?>