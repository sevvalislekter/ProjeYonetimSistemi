<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Veritabanı bağlantısı başarısız!"]));
}

$data = json_decode(file_get_contents("php://input"), true);

$name = isset($data['name']) ? $data['name'] : '';
$email = isset($data['email']) ? $data['email'] : '';
$feedbackType = isset($data['feedbackType']) ? $data['feedbackType'] : 'Genel';
$message = isset($data['message']) ? $data['message'] : '';
$rating = isset($data['rating']) ? (int)$data['rating'] : 5;

// Geri bildirim verisini veritabanına kaydetme
$sql = "INSERT INTO feedbacks (name, email, feedback_type, message, rating) 
        VALUES ('$name', '$email', '$feedbackType', '$message', $rating)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Geri bildirim başarıyla kaydedildi."]);
} else {
    echo json_encode(["success" => false, "message" => "Geri bildirim kaydedilemedi."]);
}

$conn->close();
?>
