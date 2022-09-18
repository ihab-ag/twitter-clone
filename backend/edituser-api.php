<?php

    include("connection.php");
    if(isset($_POST['userid']) && isset($_POST['fname']) && isset($_POST['bio'])){
        extract($_POST);

        
        if(!isset($_POST['profile_pic'])){
            $query = $mysqli->prepare("UPDATE `users` SET `fname` = ?, `bio` = ?, `profile_pic` = ? WHERE `users`.`id` = ?");
            $null = 'none';
            $query->bind_param("sssi", $fname, $bio, $null, $userid);
        }
        else{
            $name = md5($profile_pic);
            $base64_string = $profile_pic;
            //echo $base64_string;
            $decoder = base64_decode($base64_string);
            $img = imagecreatefromstring($decoder);
            //echo $decoder;
            if($img){
                //echo 'worked';
                $url = '../frontend/content/uploadedimages/' . $name . ".jpg";
                imagejpeg($img, $url);
                //query to insert
                $response['addedimage'] = true;
                $query = $mysqli->prepare("UPDATE `users` SET `fname` = ?, `bio` = ?, `profile_pic` = ? WHERE `users`.`id` = ?");
                $query->bind_param("sssi", $fname, $bio, $url, $userid);
            }
        }
        $query->execute();
        $response['editeduser'] = true;
        $json = json_encode($response);
        echo $json;
    }
    //UPDATE `users` SET `fname` = 'second2', `bio` = 'Biography, edit in profile' WHERE `users`.`id` = 20;
?>

