<?php
require_once 'config.php'; // Veritabanı bağlantısı için config dosyasını dahil et

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Veritabanı bağlantısı
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Veritabanı bağlantısını kontrol et
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Veritabanı bağlantısı başarısız!"]));
}

// POST ile gelen verileri al
$data = json_decode(file_get_contents("php://input"));

$project_id = $data->project_id;
$worker_id = $data->worker_id;
$task_description = $data->task_description;
$startdate = $data->startdate;
$enddate = $data->enddate;

// Verilerin eksik olup olmadığını kontrol et
if (empty($project_id) || empty($worker_id) || empty($task_description) || empty($startdate) || empty($enddate)) {
    echo json_encode(["success" => false, "message" => "Lütfen tüm alanları doldurun."]);
    exit;
}

// Görev ekleme SQL sorgusu
$sql = "INSERT INTO missions (project_id, worker_id, task_description, startdate, enddate) 
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iisss", $project_id, $worker_id, $task_description, $startdate, $enddate);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Görev başarıyla eklendi!"]);
} else {
    echo json_encode(["success" => false, "message" => "Görev eklenirken bir hata oluştu."]);
}

$stmt->close();
$conn->close();
?>
