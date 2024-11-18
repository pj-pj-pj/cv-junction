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

  if (!empty($data['skills'])) {
    $skills_details = json_encode($data['skills']['skills_details']);

    $stmt = $pdo->prepare("INSERT INTO skills (cv_id, skills_details) VALUES (:cv_id, :skills_details)");
    $stmt->bindParam(':cv_id', $cv_id);
    $stmt->bindParam(':skills_details', $skills_details);
    $stmt->execute();
  }

  // Respond with success status and the cv_id
  echo json_encode([
    'status' => 'success', 
    'message' => 'CV created successfully',
    'cv_id' => $cv_id  // Include the cv_id in the response
    ]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error creating CV: ' . $e->getMessage()]);
}
?>
