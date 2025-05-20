<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Veritabanı bağlantısı
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    error_log("Veritabanı bağlantısı başarısız: " . $conn->connect_error);
    die(json_encode(["error" => "Veritabanı bağlantısı başarısız!"]));
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->username) && isset($data->password) && isset($data->email)) {
    $username = $data->username;
    $password = $data->password;
    $email = $data->email;

    // Kullanıcı adı veya e-posta zaten var mı kontrolü
    $sql = "SELECT * FROM users WHERE username = ? OR email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Kullanıcı adı veya e-posta zaten kullanılıyor."]);
    } else {
        // Şifreyi hash'lemeden düz metin olarak kaydet
        $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $username, $email, $password);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Kullanıcı başarıyla oluşturuldu!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Kullanıcı oluşturulurken bir hata oluştu."]);
        }
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Kullanıcı adı, e-posta ve şifre gereklidir."]);
}

$conn->close();
?>
