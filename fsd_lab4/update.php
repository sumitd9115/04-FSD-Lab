<?php
include 'db.php';
$student = null;
$errors = [];
$success = "";

// Load student by roll_no
if (isset($_GET['roll_no'])) {
    $roll_no = $_GET['roll_no'];
    $res = mysqli_query($conn, "SELECT * FROM students WHERE roll_no='$roll_no'");
    $student = mysqli_fetch_assoc($res);
}

// Handle update form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $roll_no  = $_POST['roll_no'];
    $first_name = trim($_POST['first_name']);
    $last_name  = trim($_POST['last_name']);
    $contact    = trim($_POST['contact']);

    if (empty($first_name) || !preg_match("/^[a-zA-Z ]+$/", $first_name))
        $errors[] = "First name must contain only letters.";
    if (empty($last_name) || !preg_match("/^[a-zA-Z ]+$/", $last_name))
        $errors[] = "Last name must contain only letters.";
    if (!preg_match("/^[0-9]{10}$/", $contact))
        $errors[] = "Contact must be a 10-digit number.";

    if (empty($errors)) {
        $sql = "UPDATE students SET first_name='$first_name', last_name='$last_name',
                contact='$contact' WHERE roll_no='$roll_no'";
        if (mysqli_query($conn, $sql)) {
            $success = "Student updated successfully!";
            // Reload updated student
            $res = mysqli_query($conn, "SELECT * FROM students WHERE roll_no='$roll_no'");
            $student = mysqli_fetch_assoc($res);
        } else {
            $errors[] = "Error: " . mysqli_error($conn);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update Student</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h1>Update Student</h1>
    <a href="index.php" class="btn btn-blue">← Back</a>

    <?php foreach ($errors as $e) echo "<p class='error'>$e</p>"; ?>
    <?php if ($success) echo "<p class='success'>$success</p>"; ?>

    <?php if ($student): ?>
    <form method="POST" onsubmit="return validateUpdateForm()">
        <input type="hidden" name="roll_no" value="<?= $student['roll_no'] ?>">

        <label>Roll No (cannot change):</label>
        <input type="text" value="<?= $student['roll_no'] ?>" disabled>

        <label>First Name:</label>
        <input type="text" name="first_name" id="first_name"
               value="<?= htmlspecialchars($student['first_name']) ?>">

        <label>Last Name:</label>
        <input type="text" name="last_name" id="last_name"
               value="<?= htmlspecialchars($student['last_name']) ?>">

        <label>Contact Number:</label>
        <input type="text" name="contact" id="contact"
               value="<?= htmlspecialchars($student['contact']) ?>">

        <button type="submit" class="btn btn-green">Update Student</button>
    </form>
    <?php else: ?>
        <p class="error">Student not found.</p>
    <?php endif; ?>
</div>

<script>
function validateUpdateForm() {
    const fn = document.getElementById('first_name').value.trim();
    const ln = document.getElementById('last_name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const name = /^[a-zA-Z ]+$/;

    if (!name.test(fn)) { alert("First name must contain only letters."); return false; }
    if (!name.test(ln)) { alert("Last name must contain only letters."); return false; }
    if (!/^\d{10}$/.test(contact)) { alert("Contact must be 10 digits."); return false; }
    return true;
}
</script>
</body>
</html>