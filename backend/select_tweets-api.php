<?php

    include("connection.php");

    $query = $mysqli->prepare("SELECT * FROM `tweets` JOIN users on tweets.users_id = users.id 
    WHERE tweets.users_id IN (SELECT followers.followed_user_id FROM followers WHERE followers.user_id = ?) OR tweets.users_id = ?");
    $query->bind_param("ii", $_POST['userid'], $_POST['userid']);
    $query->execute();
    $array = $query->get_result();

    $response = [];

    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }

    $json = json_encode($response);
    echo $json;

?>