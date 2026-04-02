<?php
include 'db.php';
$errors = [];
$success = "";
if (isset($_GET['success'])) {
    $success = "Student inserted successfully!";
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $first_name = trim($_POST['first_name']);
    $last_name  = trim($_POST['last_name']);
    $roll_no    = trim($_POST['roll_no']);
    $password   = trim($_POST['password']);
    $confirm    = trim($_POST['confirm_password']);
    $contact    = trim($_POST['contact']);

    // --- PHP Validation ---
    if (empty($first_name) || !preg_match("/^[a-zA-Z ]+$/", $first_name))
        $errors[] = "First name must contain only letters.";

    if (empty($last_name) || !preg_match("/^[a-zA-Z ]+$/", $last_name))
        $errors[] = "Last name must contain only letters.";

    if (empty($roll_no))
        $errors[] = "Roll No is required.";

    if (strlen($password) < 6)
        $errors[] = "Password must be at least 6 characters.";

    if ($password !== $confirm)
        $errors[] = "Passwords do not match.";

    if (!preg_match("/^[0-9]{10}$/", $contact))
        $errors[] = "Contact must be a 10-digit number.";

    // Check duplicate roll_no
    $check = mysqli_query($conn, "SELECT * FROM students WHERE roll_no='$roll_no'");
    if (mysqli_num_rows($check) > 0)
        $errors[] = "Roll No already exists.";

    if (empty($errors)) {
        $hashed = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO students (first_name, last_name, roll_no, password, contact)
                VALUES ('$first_name', '$last_name', '$roll_no', '$hashed', '$contact')";
        if (mysqli_query($conn, $sql)) {
            header("Location: insert.php?success=1");
            exit();
        } else {
            $errors[] = "Database error: " . mysqli_error($conn);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Student</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h1>Add New Student</h1>
    <a href="index.php" class="btn btn-blue">← Back</a>

    <?php foreach ($errors as $e) echo "<p class='error'>$e</p>"; ?>
    <?php if ($success) echo "<p class='success'>$success</p>"; ?>

    <form method="POST" onsubmit="return validateForm()">
        <label>First Name:</label>
        <input type="text" name="first_name" id="first_name"
               value="<?= htmlspecialchars($_POST['first_name'] ?? '') ?>">

        <label>Last Name:</label>
        <input type="text" name="last_name" id="last_name"
               value="<?= htmlspecialchars($_POST['last_name'] ?? '') ?>">

        <label>Roll No / ID:</label>
        <input type="text" name="roll_no" id="roll_no"
               value="<?= htmlspecialchars($_POST['roll_no'] ?? '') ?>">

        <label>Password:</label>
        <input type="password" name="password" id="password">

        <label>Confirm Password:</label>
        <input type="password" name="confirm_password" id="confirm_password">

        <label>Contact Number:</label>
        <input type="text" name="contact" id="contact"
               value="<?= htmlspecialchars($_POST['contact'] ?? '') ?>">

        <button type="submit" class="btn btn-green">Insert Student</button>
    </form>
</div>

<script>
// --- JavaScript (Client-side) Validation ---
function validateForm() {
    const name = /^[a-zA-Z ]+$/;
    const fn = document.getElementById('first_name').value.trim();
    const ln = document.getElementById('last_name').value.trim();
    const roll = document.getElementById('roll_no').value.trim();
    const pwd = document.getElementById('password').value;
    const cpwd = document.getElementById('confirm_password').value;
    const contact = document.getElementById('contact').value.trim();

    if (!name.test(fn)) { alert("First name must contain only letters."); return false; }
    if (!name.test(ln)) { alert("Last name must contain only letters."); return false; }
    if (roll === "") { alert("Roll No is required."); return false; }
    if (pwd.length < 6) { alert("Password must be at least 6 characters."); return false; }
    if (pwd !== cpwd) { alert("Passwords do not match."); return false; }
    if (!/^\d{10}$/.test(contact)) { alert("Contact must be 10 digits."); return false; }
    return true;
}
</script>
</body>
</html>