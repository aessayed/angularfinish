<?php
// delete_product.php

include 'db.php';

$id = $_GET['id'];

try {
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(['success' => 'Product deleted successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal Server Error']);
}
?>
