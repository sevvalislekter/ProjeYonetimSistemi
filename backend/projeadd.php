<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Veritabanı bağlantısı başarısız."]));
}

if (isset($_POST['pname']) && isset($_POST['descc']) && isset($_POST['startdate']) && isset($_POST['enddate'])) {
    $pname = $_POST['pname'];
    $descc = $_POST['descc'];
    $startdate = $_POST['startdate'];
    $enddate = $_POST['enddate'];

    $stmt = $conn->prepare("SELECT * FROM projects WHERE pname = ?");
    $stmt->bind_param("s", $pname);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Proje adı zaten mevcut."]);
    } else {
        $stmt = $conn->prepare("INSERT INTO projects (pname, descc, startdate, enddate) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $pname, $descc, $startdate, $enddate);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Proje başarıyla eklendi."]);
        } else {
            echo json_encode(["success" => false, "message" => "Veri eklenemedi."]);
        }
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Tüm alanlar doldurulmalıdır."]);
}

$conn->close();
?>
