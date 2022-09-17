<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    
    if(isset($_POST['tweet_id']) && isset($_POST['userid'])){
        extract($_POST);
        
        $query = $mysqli->prepare("SELECT * FROM `liked_tweets` WHERE liked_tweets.user_id = ? AND liked_tweets.tweet_id = ?");
        $query->bind_param("ii", $userid, $tweet_id);
        $query->execute();
        $result = $query->get_result();

        $response = [];
        if($result->fetch_assoc()){
            $response["liked"] = true;
        }
        else{
            $response["liked"] = false;
        }
        
        $json = json_encode($response);
        echo $json;
    }
?>