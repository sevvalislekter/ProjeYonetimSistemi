<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Veritabanı bağlantısı
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Bağlantı kontrolü
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Veritabanı bağlantısı başarısız!"]));
}

// Silinecek çalışan id'sini al
$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $workerId = $data->id;

    // Çalışanı silme sorgusu
    $sql = "DELETE FROM workers WHERE id = ?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $workerId);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Çalışan başarıyla silindi."]);
        } else {
            echo json_encode(["success" => false, "message" => "Çalışan silinirken bir hata oluştu."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "SQL sorgusu hazırlanırken bir hata oluştu."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Silinecek çalışan id'si sağlanmadı."]);
}

// Veritabanı bağlantısını kapat
$conn->close();
?>
