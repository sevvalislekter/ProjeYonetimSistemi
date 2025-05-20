<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Veritabanı bağlantısı
$host = "localhost";
$user = "root";       
$password = "";       
$database = "projeyonetimm";  

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Veritabanı bağlantı hatası: " . $conn->connect_error]);
    exit;
}

// JSON veriyi al
$data = json_decode(file_get_contents("php://input"), true);
$missionId = isset($data["missionId"]) ? intval($data["missionId"]) : 0;

if ($missionId <= 0) {
    echo json_encode(["success" => false, "message" => "Geçersiz görev ID."]);
    exit;
}

// Görev silme işlemi
$stmt = $conn->prepare("DELETE FROM missions WHERE id = ?");
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Sorgu hatası: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $missionId);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Silme başarısız: " . $stmt->error]);
}

$stmt->close();
$conn->close();
