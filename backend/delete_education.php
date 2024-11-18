<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['education_id']) || empty($data['education_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Education ID is required']);
        exit;
    }

    $education_id = $data['education_id'];

    try {
        // Prepare and execute delete statement
        $stmt = $pdo->prepare("DELETE FROM education WHERE education_id = :education_id");
        $stmt->bindParam(':education_id', $education_id);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Education entry deleted successfully']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error deleting education entry: ' . $e->getMessage()]);
    }
}
?>
