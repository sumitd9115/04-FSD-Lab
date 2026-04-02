<?php
$host = "localhost";
$user = "root";
$password = "";         // default XAMPP password is empty
$database = "fsd_lab4";

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>