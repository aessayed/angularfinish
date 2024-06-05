<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['email']) && isset($data['password'])) {
            $email = $data['email'];
            $password = $data['password'];
    
            // Validate email (you should perform proper validation and sanitization)
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid email']);
                exit();
            }
    
            try {
                // Check if the user exists in the database
                $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
                $stmt->execute([$email]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
                // If user exists and password matches, return success message
                if ($user && password_verify($password, $user['password'])) {
                    http_response_code(200);
                    echo json_encode(['status' => 'success', 'message' => 'Login successful']);
                } else {
                    // If user doesn't exist or password doesn't match, return error message
                    http_response_code(401);
                    echo json_encode(['error' => 'Unable to login']);
                }
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Internal Server Error']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Bad Request']);
        }
        break;
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
                    echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
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
