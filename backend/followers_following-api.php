

<?php
    //following: SELECT count(followers.followed_user_id) FROM `followers` WHERE followers.user_id = 20;

    //followers: SELECT count(followers.user_id) FROM `followers` WHERE followers.followed_user_id = 20;
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("connection.php");
    
    if(isset($_POST['userid'])){
        $userid = $_POST['userid'];
    
        $query = $mysqli->prepare("SELECT count(followers.followed_user_id) as count FROM `followers` WHERE followers.user_id = ?");
        $query->bind_param("i", $userid);
        $query->execute();
        $result = $query->get_result();
        
        $response = [];
        if($a = $result->fetch_assoc()){
            $response['followingCount'] = $a;
        }
        $query = $mysqli->prepare("SELECT count(followers.user_id) as count FROM `followers` WHERE followers.followed_user_id = ?");
        $query->bind_param("i", $userid);
        $query->execute();
        $result = $query->get_result();
        
        if($a = $result->fetch_assoc()){
            $response['followersCount'] = $a;
        }
        $json = json_encode($response);
        echo $json;
    }
?>
