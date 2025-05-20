<?php
require_once 'config.php'; // Veritabanı bağlantısı için config dosyasını dahil et

// CORS başlıklarını ekleyin
header('Access-Control-Allow-Origin: *');  // Tüm kökenlere izin ver
header('Access-Control-Allow-Methods: POST, OPTIONS');  // İzin verilen metodlar
header('Access-Control-Allow-Headers: Content-Type, Authorization');  // İzin verilen başlıklar

// Eğer preflight OPTIONS isteği yapılmışsa, sadece 200 OK döndür
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

// Veritabanı bağlantısı
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Veritabanı bağlantısını kontrol et
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Veritabanı bağlantısı başarısız!"]));
}

// POST ile gelen verileri al
$data = json_decode(file_get_contents("php://input"));

$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;
$phone = $data->phone;
$hire_date = $data->hire_date;
$position = $data->position;
$salary = $data->salary;

// Verilerin eksik olup olmadığını kontrol et
if (empty($email) || empty($phone) || empty($hire_date) || empty($first_name) || empty($last_name)) {
    echo json_encode(["success" => false, "message" => "Lütfen tüm alanları doldurun."]);
    exit;
}

// Çalışan ekleme SQL sorgusu
$sql = "INSERT INTO workers (first_name, last_name, email, phone, hire_date, position, salary) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $first_name, $last_name, $email, $phone, $hire_date, $position, $salary);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Çalışan başarıyla eklendi!"]);
} else {
    echo json_encode(["success" => false, "message" => "Çalışan eklenirken bir hata oluştu."]);
}

$stmt->close();
$conn->close();
?>
