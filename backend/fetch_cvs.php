<?php
include 'config.php';

// Check if user_id is provided in the request
if (!isset($_GET['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not authenticated']);
    exit();
}

$user_id = $_GET['user_id'];

try {
    // cv table: Fetch all CVs for the user
    $stmt = $pdo->prepare("SELECT * FROM cv WHERE user_id = :user_id");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    
    $cvs = $stmt->fetchAll(PDO::FETCH_ASSOC);  // Fetch all CVs
    
    if (empty($cvs)) {
        echo json_encode(['status' => 'error', 'message' => 'No CVs found for this user']);
        exit();
    }

    // Fetch related data for each CV
    $full_cvs = [];
    foreach ($cvs as $cv) {
        // Fetch personal_info for each CV
        $stmt = $pdo->prepare("SELECT * FROM personal_info WHERE cv_id = :cv_id");
        $stmt->bindParam(':cv_id', $cv['cv_id']);
        $stmt->execute();
        $personal_info = $stmt->fetch(PDO::FETCH_ASSOC);

        // Fetch other related tables (education, work_experience, etc.)
        $stmt = $pdo->prepare("SELECT * FROM education WHERE cv_id = :cv_id");
        $stmt->bindParam(':cv_id', $cv['cv_id']);
        $stmt->execute();
        $education = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $pdo->prepare("SELECT * FROM work_experience WHERE cv_id = :cv_id");
        $stmt->bindParam(':cv_id', $cv['cv_id']);
        $stmt->execute();
        $work_experience = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $pdo->prepare("SELECT * FROM skills WHERE cv_id = :cv_id");
        $stmt->bindParam(':cv_id', $cv['cv_id']);
        $stmt->execute();
        $skills = $stmt->fetch(PDO::FETCH_ASSOC);

        // Normalize 'bullet_details' to always be an array (even if empty or null)
        foreach ($work_experience as &$exp) {
            // Ensure 'bullet_details' is an array, even if null or invalid JSON
            if (is_string($exp['bullet_details'])) {
                // Only decode if it's a string (which would be a JSON string)
                $exp['bullet_details'] = json_decode($exp['bullet_details'], true) ?? [];
            } elseif (!is_array($exp['bullet_details'])) {
                // If it's not an array and not a string, set it as an empty array
                $exp['bullet_details'] = [];
            }
        }

        // Combine all data for each CV
        $full_cvs[] = [
            'cv_id' => $cv['cv_id'],
            'user_id' => $cv['user_id'],
            'title' => $cv['title'],
            'summary' => $cv['summary'] ?? '',
            'personal_info' => $personal_info ? [
                'full_name' => $personal_info['full_name'],
                'email' => $personal_info['email'],
                'phone_number' => $personal_info['phone_number'],
                'address' => $personal_info['address']
            ] : null,
            'education' => $education,
            'professional_experience' => $work_experience,
            'skills' => $skills ? [
                'skills_details' => json_decode($skills['skills_details'], true)
            ] : null,
        ];
    }

    // Return all CVs
    echo json_encode(['status' => 'success', 'cvs' => $full_cvs]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error fetching CVs: ' . $e->getMessage()]);
}
?>
