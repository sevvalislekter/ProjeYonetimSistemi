<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "projeyonetimm");

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Veritabanı bağlantı hatası']);
    exit;
}

$result = $conn->query("SELECT id, first_name FROM workers");

$workers = [];

while ($row = $result->fetch_assoc()) {
    $workers[] = $row;
}

echo json_encode(['success' => true, 'workers' => $workers]);
?>
