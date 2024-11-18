<?php
session_start();

// Set CORS headers (make sure they are at the top before any other output)
header("Access-Control-Allow-Origin: http://localhost:5173"); // Your frontend URL
header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies, etc.)
header("Content-Type: application/json");

include 'config.php';

// Handle OPTIONS preflight request for CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Allow the necessary HTTP methods and headers for CORS requests
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200); // Respond with HTTP 200 OK to preflight request
    exit; // No need to process further
}

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'success',
        'user' => [
            'user_id' => $_SESSION['user_id'],
            'email' => $_SESSION['email'],
            'username' => $_SESSION['username'] // Ensure username is included
        ]
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Session not active']);
}
?>
