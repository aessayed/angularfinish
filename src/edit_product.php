<?php
// edit_product.php

include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$name = $data['name'];
$description = $data['description'];
$price = $data['price'];

try {
    $stmt = $pdo->prepare("UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?");
    $stmt->execute([$name, $description, $price, $id]);
    echo json_encode(['success' => 'Product updated successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal Server Error']);
}
?>
