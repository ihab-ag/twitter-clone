<?php
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include 'connection.php';
    if(isset($_POST['username'])){
        $username = $_POST['username'];
        echo $username;

    }
?>