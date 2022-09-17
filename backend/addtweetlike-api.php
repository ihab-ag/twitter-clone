<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    if(isset($_POST['tweet_id']) && isset($_POST['userid']) && isset($_POST['todo'])){

        extract($_POST);
        if($todo == "like"){
            $query = $mysqli->prepare("INSERT INTO `liked_tweets` (`tweet_id`, `user_id`) VALUES (?, ?);");
            $query->bind_param("ii", $tweet_id, $userid);
            $query->execute();
            $result = $query->get_result();
            $response['likeadded'] = true;
            $json = json_encode($response);
            echo $json;
        }
        else if($todo == "removelike"){
            $query = $mysqli->prepare("DELETE FROM `liked_tweets` WHERE tweet_id = ? AND user_id = ?");
            $query->bind_param("ii", $tweet_id, $userid);
            $query->execute();
            $result = $query->get_result();
            $response['likeremoved'] = true;
            $json = json_encode($response);
            echo $json;
        }

    }


?>