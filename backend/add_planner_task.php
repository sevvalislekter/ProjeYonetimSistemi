<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

// Gelen veriyi al
$data = json_decode(file_get_contents("php://input"), true);

// Alan kontrolü
if (!isset($data['task'], $data['date'], $data['status'])) {
    echo "Eksik alanlar var";
    exit;
}

// Veritabanı bağlantısı
$conn = new mysqli("localhost", "root", "", "projeyonetim");

if ($conn->connect_error) {
    echo "Veritabanı bağlantı hatası: " . $conn->connect_error;
    exit;
}

// Verileri al
$task = $conn->real_escape_string($data['task']);
$date = $conn->real_escape_string($data['date']);
$status = $conn->real_escape_string($data['status']);

// Sorguyu hazırla ve çalıştır
$sql = "INSERT INTO planner (task, date, status) VALUES ('$task', '$date', '$status')";

if ($conn->query($sql) === TRUE) {
    echo "Görev başarıyla eklendi";
} else {
    echo "Hata: " . $conn->error;
}

$conn->close();
