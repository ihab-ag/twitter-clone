<?php

    include("connection.php");
    if(isset($_POST['userid'])){
        $userid = $_POST['userid'];
        
        //echo $userid;
        $query = $mysqli->prepare("SELECT * FROM tweets WHERE users_id = ?");
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