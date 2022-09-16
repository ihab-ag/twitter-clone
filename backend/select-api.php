<?php

    include("connection.php");
    $table = $_GET['table'];
    $query = $mysqli->prepare("SELECT * FROM ?");
    $query->bind_param("s", $table);
    $query->execute();
    $array = $query->get_result();

    $response = [];

    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }

    $json = json_encode($response);
    echo $json;
    
?>