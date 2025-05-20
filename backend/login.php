<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Veritabanı bağlantısı
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Veritabanı bağlantısı başarısız!"]));
}

// JSON'dan gelen veriyi al
$data = json_decode(file_get_contents("php://input"));
if (
    isset($data->username) && 
    isset($data->email) && 
    isset($data->password)
) {
    $username = $data->username;
    $email = $data->email;
    $password = $data->password;

    // Kullanıcıyı sorgula
    $sql = "SELECT * FROM users WHERE username = ? AND email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Kullanıcı bulunduysa
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Şifre kontrolü (gelişmiş sistemlerde password_verify kullanılır)
        if ($password === $user['password']) {
            echo json_encode([
                "success" => true,
                "message" => "Giriş başarılı!",
                "userId" => $user['id'], // Kullanıcı ID'sini döndür
                "username" => $user['username']
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Hatalı şifre!"
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Kullanıcı bulunamadı!"
        ]);
    }

    $stmt->close();
} else {
    echo json_encode([
        "success" => false,
        "message" => "Kullanıcı adı, email ve şifre gereklidir."
    ]);
}

$conn->close();
?>
