<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    
    if(isset($_POST['userid']) && isset($_POST['toblockuser'])){
        $userid = $_POST['userid'];
        $toblockuser = $_POST['toblockuser'];
    

    }
?>