<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Function to handle errors and log them
function handle_error($message, $code = 500) {
    error_log($message);  // Log the error for debugging purposes
    http_response_code($code);
    echo json_encode(['error' => $message]);
}

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM users");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
        } catch (PDOException $e) {
            handle_error('Failed to fetch users: ' . $e->getMessage());
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['name'], $data['email'])) {
            try {
                $stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (:name, :email)");
                $stmt->bindParam(':name', $data['name']);
                $stmt->bindParam(':email', $data['email']);
                $stmt->execute();
                echo json_encode(['id' => $pdo->lastInsertId()]);
            } catch (PDOException $e) {
                handle_error('Failed to create users: ' . $e->getMessage());
            }
        } else {
            handle_error('Invalid input data', 400);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['name'], $data['email'], $data['id'])) {
            try {
                $stmt = $pdo->prepare("UPDATE users SET name = :name, email = :email WHERE id = :id");
                $stmt->bindParam(':name', $data['name']);
                $stmt->bindParam(':email', $data['email']);
                $stmt->bindParam(':id', $data['id']);
                $stmt->execute();
                echo json_encode(['status' => 'success']);
            } catch (PDOException $e) {
                handle_error('Failed to update users: ' . $e->getMessage());
            }
        } else {
            handle_error('Invalid input data', 400);
        }
        break;

    case 'DELETE':
        $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
        if ($id) {
            try {
                $stmt = $pdo->prepare("DELETE FROM user WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                echo json_encode(['status' => 'success']);
            } catch (PDOException $e) {
                handle_error('Failed to delete user: ' . $e->getMessage());
            }
        } else {
            handle_error('Invalid ID', 400);
        }
        break;

    case 'OPTIONS':
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        http_response_code(204);
        break;

    default:
        handle_error('Method Not Allowed', 405);
        break;
}
?>
