<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    
    if(isset($_POST['username']) && isset($_POST['tofollowusername'])){
        $username = $_POST['username'];
        $tofollowusername = $_POST['tofollowusername'];
    
        $query = $mysqli->prepare("SELECT * FROM `followers` WHERE followers.user_id = (SELECT users.id FROM users WHERE username = ?)
                                    AND followers.followed_user_id = (SELECT users.id FROM users WHERE username = ?)");
        $query->bind_param("ss", $username, $tofollowusername);
        $query->execute();
        $result = $query->get_result();
        
        $response = [];

    }
?>