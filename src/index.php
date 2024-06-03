<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['email'])) {
            // Check if the user exists before adding
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
            $stmt->execute([$data['email']]);
            if ($stmt->fetchColumn() > 0) {
                http_response_code(400);
                echo json_encode(['error' => 'User already exists']);
            } else {
                // Add new user to the database
                try {
                    $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
                    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
                    $stmt->execute([$data['email'], $hashedPassword]);
                    echo json_encode(['id' => $pdo->lastInsertId()]);
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Internal Server Error']);
                }
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Bad Request']);
        }
        break;

    case 'OPTIONS':
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        http_response_code(204);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
        break;
}
?>
