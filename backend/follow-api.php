<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");

    if(isset($_POST['userid']) && isset($_POST['tofollowuserid']) && isset($_POST['todo'])){
        extract($_POST);

        $query = $mysqli->prepare("INSERT INTO `followers` (`user_id`, `followed_user_id`) VALUES (?,?)");
        $query->bind_param("ii", $userid, $tofollowuserid);
        $query->execute();
        $result = $query->get_result();
        $response['nowfollowing'] = true;
    }
    $json = json_encode($response);
    echo $json;
?>