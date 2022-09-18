<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    if(isset($_POST['tweet_text']) && isset($_POST['userid']) && isset($_POST['hasimage'])){
        extract($_POST);
        if(!$hasimage){
            $query = $mysqli->prepare("INSERT INTO `tweets` (`users_id`, `tweet_text`, `picture_url`) 
                                        VALUES (?, ?, ?)");
            $null = 'none';
            $query->bind_param("sss", $userid, $tweet_text, $null);
        }
        else if(isset($_POST['picture_64base'])){
            $name = md5($picture_64base);
            $base64_string = $picture_64base;
            //echo $base64_string;
            $decoder = base64_decode($base64_string);
            $img = imagecreatefromstring($decoder);
    
            if($img){
                //echo 'worked';
                $url = '../frontend/content/uploadedimages/' . $name . ".jpg";
                imagejpeg($img, $url);
                //query to insert
                $response['addedimage'] = true;
                $query = $mysqli->prepare("INSERT INTO `tweets` (`users_id`, `tweet_text`, `picture_url`) 
                VALUES (?, ?, ?)");
                $query->bind_param("sss", $userid, $tweet_text, $url);
            }
        }
            
        
        $query->execute();
        $response['tweetadded'] = true;
        $json = json_encode($response);
        echo $json;
    }


?>