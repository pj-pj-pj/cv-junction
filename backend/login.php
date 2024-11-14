<?php
include 'config.php'; 
header("Access-Control-Allow-Origin: http://localhost:5173");  // React's default port
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json'); 

$data = json_decode(file_get_contents('php://input'), true);

// Retrieve the email and password from the request data
$email = $data['email'];
$password = $data['password'];

// Check if email and password are provided
if (empty($email) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Email and password are required']);
    exit;
}

// Query the database to find the user with the provided email
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->bindParam(':email', $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && $user['password'] === $password) {
    // Password matches, don't send the password in the response
    unset($user['password']);
    echo json_encode(['status' => 'success', 'user' => $user]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
}
?>
