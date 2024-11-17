<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

// Check if the user_id exists
if (!isset($data['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not authenticated']);
    exit();
}

$user_id = $data['user_id'];

try {
    // Insert basic CV data (user_id, title, summary) into the cv table
    $stmt = $pdo->prepare("INSERT INTO cv (user_id, title, summary) VALUES (:user_id, :title, :summary)");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':title', $data['title']);
    $stmt->bindParam(':summary', $data['summary']);
    $stmt->execute();

    // Get the cv_id of the newly inserted CV
    $cv_id = $pdo->lastInsertId();

    // Insert into personal_info table
    $stmt = $pdo->prepare("INSERT INTO personal_info (cv_id, full_name, email, phone_number, address) 
                          VALUES (:cv_id, :full_name, :email, :phone_number, :address)");
    $stmt->bindParam(':cv_id', $cv_id); // Bind cv_id to personal_info
    $stmt->bindParam(':full_name', $data['personal_info']['full_name']);
    $stmt->bindParam(':email', $data['personal_info']['email']);
    $stmt->bindParam(':phone_number', $data['personal_info']['phone_number']);
    $stmt->bindParam(':address', $data['personal_info']['address']);
    $stmt->execute();
    $personal_info_id = $pdo->lastInsertId();

    // Insert into skills table
    $skills_id = null;
    if (!empty($data['skills'])) {
        $stmt = $pdo->prepare("INSERT INTO skills (cv_id, skills_details) VALUES (:cv_id, :skills_details)");
        $stmt->bindParam(':cv_id', $cv_id); // Bind cv_id to skills
        $stmt->bindParam(':skills_details', json_encode($data['skills']['skills_details']));
        $stmt->execute();
        $skills_id = $pdo->lastInsertId(); // Optional: store skills_id for future use
    }

    // Return success response
    echo json_encode(['status' => 'success', 'message' => 'CV created successfully']);
} catch (Exception $e) {
    // Return error message if something goes wrong
    echo json_encode(['status' => 'error', 'message' => 'Error creating CV: ' . $e->getMessage()]);
}
?>
