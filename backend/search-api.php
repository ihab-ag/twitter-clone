<?php
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include 'connection.php';
    if(isset($_POST['username'])){
        $username = $_POST['username'];
    
        $query = $mysqli->prepare("SELECT * FROM `users` WHERE username = ?");

        $query->bind_param("s", $username);
        $query->execute();
        $result = $query->get_result();
        
        $response = [];
        while($a = $result->fetch_assoc()){
            $response[] = $a;
        }
        
        $json = json_encode($response);
        echo $json;
    }
?>