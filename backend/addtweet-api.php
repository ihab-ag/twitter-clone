<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    if(isset($_POST['tweet_text']) && isset($_POST['userid']) && isset($_POST['hasimage'])){
        extract($_POST);
        $query = $mysqli->prepare("INSERT INTO `tweets` (`users_id`, `tweet_text`, `has_picture`) 
        VALUES (?, ?, ?)");
        $query->bind_param("ssi", $userid, $tweet_text, $hasimage);
        $query->execute();
        $result = $query->get_result();
        $response['tweetadded'] = true;
    }
    $json = json_encode($response);
    echo $json;

?>