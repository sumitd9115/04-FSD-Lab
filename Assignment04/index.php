<?php
include 'db.php';
$result = mysqli_query($conn, "SELECT * FROM students");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Registration System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h1>Student Registration System</h1>

    <div class="nav">
        <a href="insert.php" class="btn btn-green">+ Add Student</a>
        <a href="search.php" class="btn btn-blue">Search Student</a>
    </div>

    <h2>All Students</h2>
    <table>
        <thead>
            <tr>
                <th>Roll No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Contact</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        <?php
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo "<tr>
                    <td>{$row['roll_no']}</td>
                    <td>{$row['first_name']}</td>
                    <td>{$row['last_name']}</td>
                    <td>{$row['contact']}</td>
                    <td>
                        <a href='update.php?roll_no={$row['roll_no']}' class='btn btn-blue'>Edit</a>
                        <a href='delete.php?roll_no={$row['roll_no']}' class='btn btn-red'
                           onclick=\"return confirm('Delete this student?')\">Delete</a>
                    </td>
                </tr>";
            }
        } else {
            echo "<tr><td colspan='5' style='text-align:center'>No records found.</td></tr>";
        }
        ?>
        </tbody>
    </table>
</div>
</body>
</html>