<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['work_id']) || empty($data['work_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Work ID is required']);
        exit;
    }

    $work_id = $data['work_id'];

    try {
        // Prepare and execute delete statement
        $stmt = $pdo->prepare("DELETE FROM work_experience WHERE work_id = :work_id");
        $stmt->bindParam(':work_id', $work_id);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Work experience entry deleted successfully']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error deleting work experience: ' . $e->getMessage()]);
    }
}
?>
