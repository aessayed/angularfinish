<?php
include 'config.php';

header('Content-Type: application/json'); // Ensure the response is JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$response = array('status' => 'error', 'message' => 'Unknown error occurred');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];

        if ($action == 'add') {
            $img = $_POST['image'];
            $name = $_POST['name'];
            $price = $_POST['price'];
            $qty = $_POST['quantity'];
            $id = $_POST['product_id'];
            $qry = mysqli_query($con, "INSERT INTO cart (prod_id, name, price, image, quantity) VALUES ('$id', '$name', '$price', '$img', '$qty')");
            if ($qry) {
                $response = array('status' => 'success', 'message' => 'Item added to cart');
            }
        } elseif ($action == 'update') {
            $update_value = $_POST['update_quantity'];
            $update_id = $_POST['update_quantity_id'];
            $update_quantity_query = mysqli_query($con, "UPDATE cart SET quantity = '$update_value' WHERE id = '$update_id'");
            if ($update_quantity_query) {
                $response = array('status' => 'success', 'message' => 'Item updated in cart');
            }
        } elseif ($action == 'checkout') {
            $delete_query = mysqli_query($con, "DELETE FROM cart");
            if ($delete_query) {
                $response = array('status' => 'success', 'message' => 'All items have been removed from the cart');
            } else {
                $response = array('status' => 'error', 'message' => 'Failed to remove items from the cart');
            }
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        $action = $_GET['action'];

        if ($action == 'fetch') {
            $select_cart = mysqli_query($con, "SELECT * FROM cart");
            $cart_items = array();
            while ($row = mysqli_fetch_assoc($select_cart)) {
                $cart_items[] = $row;
            }
            $response = array('status' => 'success', 'data' => $cart_items);
        } elseif ($action == 'remove') {
            $remove_id = $_GET['id'];
            mysqli_query($con, "DELETE FROM cart WHERE id = '$remove_id'");
            $response = array('status' => 'success', 'message' => 'Item removed from cart');
        } elseif ($action == 'delete_all') {
            mysqli_query($con, "DELETE FROM cart");
            $response = array('status' => 'success', 'message' => 'All items removed from cart');
        }
    }
}

echo json_encode($response);
?>
