<?php
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include 'connection.php';
    $response = [];
    if(isset($_POST['username']) && isset($_POST['userid'])){
        $username = $_POST['username'];
        $userid = $_POST['userid'];
    
        $query = $mysqli->prepare("SELECT * FROM `users` WHERE username = ?");

        $query->bind_param("s", $username);
        $query->execute();
        $result = $query->get_result();

        
        while($a = $result->fetch_assoc()){
            $response[] = $a;
            $foundID = $response[0]['id'];
            $blockedQuery = $mysqli->prepare("SELECT * FROM `blocked_users` WHERE userid = ? AND blockinguserid = ?");
            //echo $foundID;
            //echo $userid;
            $blockedQuery->bind_param("ii", $foundID, $userid);
            $blockedQuery->execute();
            $result = $blockedQuery->get_result();

            if($result->fetch_assoc()){
                $response = [];
                $json = json_encode($response);
                echo $json;
            }
            else{
                
                $json = json_encode($response);
                echo $json;
            }
        }
        
        if($result->fetch_assoc()){

        }
    }

?>