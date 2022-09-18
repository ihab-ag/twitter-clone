<?php

    include("connection.php");
    if(isset($_POST['userid'])){
        $query = $mysqli->prepare("SELECT tweets.id as tweet_id, users_id, tweet_text, picture_url, users.id, username, fname, lname 
        FROM `tweets` JOIN users on tweets.users_id = users.id 
        WHERE tweets.users_id 
        IN (SELECT followers.followed_user_id FROM followers WHERE followers.user_id = ?) 
        OR tweets.users_id = ?");
        $query->bind_param("ii", $_POST['userid'], $_POST['userid']);
        $query->execute();
        $array = $query->get_result();
    
        $response = [];
    
        while($a = $array->fetch_assoc()){
            $response[] = $a;
        }
        //print_r($response);
        $json = json_encode($response);
        echo $json;
    }
?>