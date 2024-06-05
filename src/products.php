<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
    
switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
            $stmt->execute([$id]);
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($product) {
                echo json_encode($product);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Product not found']);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM products");
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($products);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['name'], $data['description'], $data['price'])) {
            try {
                $stmt = $pdo->prepare("INSERT INTO products (name, description, price) VALUES (?, ?, ?)");
                $stmt->execute([$data['name'], $data['description'], $data['price']]);
                echo json_encode(['id' => $pdo->lastInsertId()]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Internal Server Error']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Bad Request']);
        }
        break;

        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            if (isset($data['id'], $data['name'], $data['description'], $data['price'])) {
                try {
                    $stmt = $pdo->prepare("UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?");
                    $stmt->execute([$data['name'], $data['description'], $data['price'], $data['id']]);
                    echo json_encode(['success' => 'Product updated successfully']);
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Internal Server Error']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Bad Request']);
            }
            break;
        

    case 'DELETE':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            try {
                $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['success' => 'Product deleted successfully']);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Internal Server Error']);
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
