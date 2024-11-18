<?php
include 'config.php';

// Get data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($data['cv_id']) || empty($data['user_id'])) {
  echo json_encode(['status' => 'error', 'message' => 'CV ID or User ID missing']);
  exit;
}

// Extract CV data
$cv_id = $data['cv_id'];
$user_id = $data['user_id'];
$title = $data['title'];
$summary = $data['summary'];
$personal_info = $data['personal_info'];
$education = isset($data['education']) ? $data['education'] : [];  // Default to empty array if not set
$work_experience = isset($data['professional_experience']) ? $data['professional_experience'] : [];  // Default to empty array if not set
$skills = $data['skills'];

// Begin transaction
$pdo->beginTransaction();

try {
  // Check if the CV exists
  $stmt = $pdo->prepare("SELECT * FROM cv WHERE cv_id = ?");
  $stmt->execute([$cv_id]);
  $cvExists = $stmt->rowCount() > 0;

  if ($cvExists) {
    // Update existing CV
    $stmt = $pdo->prepare("
      UPDATE cv 
      SET title = ?, summary = ? 
      WHERE cv_id = ?
    ");
    $stmt->execute([$title, $summary, $cv_id]);
  } else {
    // Insert new CV
    $stmt = $pdo->prepare("
      INSERT INTO cv (cv_id, user_id, title, summary) 
      VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([$cv_id, $user_id, $title, $summary]);
  }

  // Check and update/insert personal info
  $stmt = $pdo->prepare("SELECT * FROM personal_info WHERE cv_id = ?");
  $stmt->execute([$cv_id]);
  $personalInfoExists = $stmt->rowCount() > 0;

  if ($personalInfoExists) {
    $stmt = $pdo->prepare("
      UPDATE personal_info 
      SET full_name = ?, email = ?, phone_number = ?, address = ? 
      WHERE cv_id = ?
    ");
    $stmt->execute([
      $personal_info['full_name'],
      $personal_info['email'],
      $personal_info['phone_number'],
      $personal_info['address'],
      $cv_id
    ]);
  } else {
    $stmt = $pdo->prepare("
        INSERT INTO personal_info (cv_id, full_name, email, phone_number, address) 
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([
      $cv_id,
      $personal_info['full_name'],
      $personal_info['email'],
      $personal_info['phone_number'],
      $personal_info['address']
    ]);
  }

  // Handle education records (only if data exists)
if (!empty($education)) {
  foreach ($education as $edu) {
    if (isset($edu['education_id']) && $edu['education_id']) {
      // Update existing education record
      $stmt = $pdo->prepare("
        UPDATE education 
        SET degree = ?, institution = ?, address = ?, start_date = ?, end_date = ?, additional_details = ? 
        WHERE education_id = ? AND cv_id = ?
      ");
      $stmt->execute([
        $edu['degree'],
        $edu['institution'],
        $edu['address'],
        $edu['start_date'],
        $edu['end_date'],
        json_encode($edu['additional_details']),  // Save the additional details as JSON
        $edu['education_id'],
        $cv_id
      ]);
    } else {
      // Insert new education record
      $stmt = $pdo->prepare("
        INSERT INTO education (cv_id, degree, institution, address, start_date, end_date, additional_details) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      ");
      $stmt->execute([
        $cv_id,
        $edu['degree'],
        $edu['institution'],
        $edu['address'],
        $edu['start_date'],
        $edu['end_date'],
        json_encode($edu['additional_details'])  // Save the additional details as JSON
      ]);
    }
  }
}

// Handle work experience bullet details
if (!empty($work_experience)) {
  foreach ($work_experience as $work) {
    if (isset($work['work_id']) && $work['work_id']) {
      $stmt = $pdo->prepare("
        UPDATE work_experience 
        SET job_title = ?, company_name = ?, address = ?, start_date = ?, end_date = ?, bullet_details = ? 
        WHERE work_id = ? AND cv_id = ?
      ");
      $stmt->execute([
        $work['job_title'],
        $work['company_name'],
        $work['address'],
        $work['start_date'],
        $work['end_date'],
        json_encode($work['bullet_details']),  // Save the bullet details as JSON
        $work['work_id'],
        $cv_id
      ]);
    } else {
      // Insert new work experience record
      $stmt = $pdo->prepare("
        INSERT INTO work_experience (cv_id, job_title, company_name, address, start_date, end_date, bullet_details) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      ");
      $stmt->execute([
        $cv_id,
        $work['job_title'],
        $work['company_name'],
        $work['address'],
        $work['start_date'],
        $work['end_date'],
        json_encode($work['bullet_details'])  // Save the bullet details as JSON
      ]);
    }
  }
}

  // Handle skills (always update or insert)
  $stmt = $pdo->prepare("SELECT * FROM skills WHERE cv_id = ?");
  $stmt->execute([$cv_id]);
  $skillsExist = $stmt->rowCount() > 0;

  if ($skillsExist) {
    $stmt = $pdo->prepare("
      UPDATE skills 
      SET skills_details = ? 
      WHERE cv_id = ?
    ");
    $stmt->execute([json_encode($skills['skills_details']), $cv_id]);
  } else {
    $stmt = $pdo->prepare("
      INSERT INTO skills (cv_id, skills_details) 
      VALUES (?, ?)
    ");
    $stmt->execute([$cv_id, json_encode($skills['skills_details'])]);
  }

  // Commit the transaction
  $pdo->commit();

  echo json_encode(['status' => 'success', 'cv_id' => $cv_id]);

} catch (Exception $e) {
  // Roll back on error
  $pdo->rollBack();
  echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
