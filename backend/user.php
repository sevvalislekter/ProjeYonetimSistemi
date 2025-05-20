<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Veritabanı bağlantısı
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Veritabanı bağlantısı başarısız!"]));
}

// Kullanıcıları sorgulama
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $users = []; // 'projects' yerine 'users' olarak değiştirdik
    while ($row = $result->fetch_assoc()) {
        $users[] = $row; // 'projects' yerine 'users' olarak değiştirdik
    }
    echo json_encode(["success" => true, "users" => $users]); // 'projects' yerine 'users' olarak değiştirdik
} else {
    echo json_encode(["success" => false, "message" => "Hiç kullanıcı bulunamadı."]);
}

$conn->close();
?>
