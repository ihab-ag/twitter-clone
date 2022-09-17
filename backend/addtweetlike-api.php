<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    if(isset($_POST['tweet_id']) && isset($_POST['userid'])){

        extract($_POST);
        $query = $mysqli->prepare("INSERT INTO `liked_tweets` (`tweet_id`, `user_id`) VALUES (?, ?);");
        $query->bind_param("ii", $tweet_id, $userid);
        $query->execute();
        $result = $query->get_result();
        $response['likeadded'] = true;
        $json = json_encode($response);
        echo $json;
    }


?>