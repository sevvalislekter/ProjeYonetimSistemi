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

// Çalışanları sorgulama
$sql = "SELECT * FROM workers";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $workers = [];  // workers dizisini tanımlıyoruz
    while ($row = $result->fetch_assoc()) {
        $workers[] = $row;  // Çalışanları worker dizisine ekliyoruz
    }
    echo json_encode(["success" => true, "workers" => $workers]);  // Verileri workers olarak döndürüyoruz
} else {
    echo json_encode(["success" => false, "message" => "Hiç çalışan bulunamadı."]);
}

$conn->close();
?>
