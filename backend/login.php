<?php
// Veritabanı ayarlarını içeri aktaralım
require_once 'config.php';

// CORS başlıklarını ayarlayalım
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Veritabanı bağlantısı
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Bağlantı hatası varsa döndür
if ($conn->connect_error) {
    die(json_encode(["error" => "Veritabanı bağlantısı başarısız: " . $conn->connect_error]));
}

// POST verisini alalım
$data = json_decode(file_get_contents("php://input"));

// Gerekli alanların olup olmadığını kontrol edelim
if (isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;

    // E-posta ile kullanıcıyı sorgulama
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email); // E-posta parametresini bağla
    $stmt->execute();
    $result = $stmt->get_result();

    // Kullanıcı varsa
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Şifreyi doğrulayalım
        if (password_verify($password, $user['password'])) {
            // Başarılı giriş, kullanıcıyı döndürelim
            echo json_encode([
                "success" => true,
                "message" => "Giriş başarılı!",
                "username" => $user['username'],
                "email" => $user['email']
            ]);
        } else {
            // Hatalı şifre
            echo json_encode([
                "success" => false,
                "message" => "Hatalı şifre!"
            ]);
        }
    } else {
        // E-posta bulunamadı
        echo json_encode([
            "success" => false,
            "message" => "Bu e-posta ile kayıtlı bir kullanıcı bulunamadı!"
        ]);
    }

    // İfadeyi kapatalım
    $stmt->close();
} else {
    // Eksik veri durumunda hata mesajı döndürelim
    echo json_encode([
        "success" => false,
        "message" => "E-posta ve şifre alanları zorunludur."
    ]);
}

// Bağlantıyı kapatalım
$conn->close();
?>
