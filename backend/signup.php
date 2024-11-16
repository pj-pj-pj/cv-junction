<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? '';
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

// Check if email and password are provided
if (empty($email) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Email and password are required']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
    exit;
}

// Check if the email already exists
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->bindParam(':email', $email);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Email already exists']);
    exit;
}
// above code included^ : rowCount will return 0 if the email DOES NOT exist

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

$stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
$stmt->bindParam(':email', $email);
$stmt->bindParam(':username', $username);
$stmt->bindParam(':password', $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to register user']);
}
?>
