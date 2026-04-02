<?php
include 'db.php';
$student = null;
$searched = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $searched = true;
    $roll_no = trim($_POST['roll_no']);
    $res = mysqli_query($conn, "SELECT * FROM students WHERE roll_no='$roll_no'");
    $student = mysqli_fetch_assoc($res);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Search Student</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h1>Search Student by Roll No</h1>
    <a href="index.php" class="btn btn-blue">← Back</a>

    <form method="POST">
        <label>Roll No / ID:</label>
        <input type="text" name="roll_no" required placeholder="Enter Roll No">
        <button type="submit" class="btn btn-green">Search</button>
    </form>

    <?php if ($searched): ?>
        <?php if ($student): ?>
        <h2>Search Result</h2>
        <table>
            <tr><th>Roll No</th><td><?= $student['roll_no'] ?></td></tr>
            <tr><th>First Name</th><td><?= $student['first_name'] ?></td></tr>
            <tr><th>Last Name</th><td><?= $student['last_name'] ?></td></tr>
            <tr><th>Contact</th><td><?= $student['contact'] ?></td></tr>
        </table>
        <a href="update.php?roll_no=<?= $student['roll_no'] ?>" class="btn btn-blue">Edit This Student</a>
        <?php else: ?>
        <p class="error">No student found with that Roll No.</p>
        <?php endif; ?>
    <?php endif; ?>
</div>
</body>
</html>