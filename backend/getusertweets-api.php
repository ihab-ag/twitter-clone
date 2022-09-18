<?php

    include("connection.php");
    if(isset($_POST['userid'])){
        $userid = $_POST['userid'];
        
        //echo $userid;
        $query = $mysqli->prepare("SELECT tweets.id as tweet_id, users_id, tweet_text, picture_url, profile_pic, users.id, username, fname, lname 
                                    FROM `tweets` JOIN users on tweets.users_id = users.id 
                                    WHERE tweets.users_id = ?");
        $query->bind_param("i", $userid);
        $query->execute();
        $array = $query->get_result();
    
        $response = [];
    
        while($a = $array->fetch_assoc()){
            $response[] = $a;
        }
    
        $json = json_encode($response);
        echo $json;
    }
?>