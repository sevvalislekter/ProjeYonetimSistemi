<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Veritabanı bağlantısı başarısız!"]);
    exit;
}

// Her çalışanın görevini gösteren sorgu
$sql = "
    SELECT 
        workers.first_name, workers.last_name,
        missions.task_description, missions.startdate, missions.enddate
    FROM missions
    JOIN workers ON missions.worker_id = workers.id
";

$result = $conn->query($sql);

$missions = [];

while ($row = $result->fetch_assoc()) {
    $missions[] = $row;
}

echo json_encode([
    "success" => true,
    "missions" => $missions
]);
?>
