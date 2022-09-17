<?php

    $query = "INSERT INTO `followers` (`user_id`, `followed_user_id`) VALUES ('1', '3')";

    if(isset($_POST['userid']) && isset($_POST['tofollowuserid']) && isset($_POST['todo'])){
        extract($_POST);

        if($todo == "follow"){
            echo "do this";
        }
    }
?>