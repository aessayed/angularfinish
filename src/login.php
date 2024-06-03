<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');    // cache for 1 day

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include_once("db.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    $pwd = mysqli_real_escape_string($mysqli, trim($request->password));
    $email = mysqli_real_escape_string($mysqli, trim($request->username));
    $sql = "SELECT * FROM users WHERE email='$email' AND password='$pwd'";
    if($result = mysqli_query($mysqli, $sql)) {
        $rows = array();
        while($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
    } else {
        http_response_code(404);
    }
}
?>
