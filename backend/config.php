<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'projeyonetim');

$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    error_log("Veritabanı bağlantısı başarısız: " . $conn->connect_error);
    die(json_encode(["error" => "Veritabanı bağlantısı başarısız!"]));
}
?>