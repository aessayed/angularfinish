<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_FILES['file'])) {
            $file = $_FILES['file'];

            // Check for upload errors
            if ($file['error'] !== UPLOAD_ERR_OK) {
                throw new Exception('File upload error: ' . $file['error']);
            }

            // Define the upload directory
            $uploadDir = 'uploads/';
            if (!is_dir($uploadDir) && !mkdir($uploadDir, 0777, true)) {
                throw new Exception('Failed to create upload directory');
            }

            // Define the upload file path
            $uploadFile = $uploadDir . basename($file['name']);

            // Move the uploaded file
            if (!move_uploaded_file($file['tmp_name'], $uploadFile)) {
                throw new Exception('Failed to move uploaded file');
            }

            // Return the image URL
            $imageUrl = 'http://localhost/firstproject/' . $uploadFile;
            echo json_encode(['imageUrl' => $imageUrl]);
        } else {
            throw new Exception('No file uploaded');
        }
    } else {
        throw new Exception('Method not allowed');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
