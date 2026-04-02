<?php
include 'db.php';

if (isset($_GET['roll_no'])) {
    $roll_no = $_GET['roll_no'];
    $sql = "DELETE FROM students WHERE roll_no='$roll_no'";
    if (mysqli_query($conn, $sql)) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . mysqli_error($conn);
    }
} else {
    header("Location: index.php");
    exit();
}
?>