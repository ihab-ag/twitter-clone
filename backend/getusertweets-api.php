<?php

    include("connection.php");
    if(isset($_GET['userid'])){
        $userid = $_GET['userid'];
        
        //echo $userid;
        $query = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
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