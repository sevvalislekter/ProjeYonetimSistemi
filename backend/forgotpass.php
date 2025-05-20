<?php
require_once 'config.php';

// CORS izinlerini düzgün bir şekilde ekleyelim.
header('Access-Control-Allow-Origin: *');  // Tüm domainlerden erişime izin verir.
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Veritabanı bağlantısı
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    error_log("Veritabanı bağlantısı başarısız: " . $conn->connect_error);
    die(json_encode(["error" => "Veritabanı bağlantısı başarısız!"]));
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->new_password)) {
    $email = $data->email;
    $new_password = $data->new_password;

    // E-posta adresine göre kullanıcıyı bul
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email); // E-posta adresi ile sorgulama
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Kullanıcı bulundu, şifreyi güncelle
        $sql_update = "UPDATE users SET password = ? WHERE email = ?";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bind_param("ss", $new_password, $email);

        if ($stmt_update->execute()) {
            echo json_encode(["success" => true, "message" => "Şifreniz başarıyla güncellendi!"]);
        } else {
            error_log("Şifre güncellenirken bir hata oluştu.");
            echo json_encode(["success" => false, "message" => "Şifre güncellenirken bir hata oluştu."]);
        }
    } else {
        error_log("E-posta adresi bulunamadı: " . $email);
        echo json_encode(["success" => false, "message" => "E-posta adresi bulunamadı!"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "E-posta ve yeni şifre gereklidir."]);
}

$conn->close();
?>
