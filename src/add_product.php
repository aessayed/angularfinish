<?php
// add_product.php

include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$description = $data['description'];
$price = $data['price'];

try {
    $stmt = $pdo->prepare("INSERT INTO products (name, description, price) VALUES (?, ?, ?)");
    $stmt->execute([$name, $description, $price]);
    echo json_encode(['success' => 'Product added successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal Server Error']);
}
?>
