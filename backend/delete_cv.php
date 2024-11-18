<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['cv_id']) || empty($data['cv_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'CV ID is required']);
        exit;
    }

    $cv_id = $data['cv_id'];

    try {
        // Begin transaction
        $pdo->beginTransaction();

        // Delete education entries linked to the CV
        $stmt = $pdo->prepare("DELETE FROM education WHERE cv_id = :cv_id");
        $stmt->bindParam(':cv_id', $cv_id);
        $stmt->execute();

        // Delete work experience entries linked to the CV
        $stmt = $pdo->prepare("DELETE FROM work_experience WHERE cv_id = :cv_id");
        $stmt->bindParam(':cv_id', $cv_id);
        $stmt->execute();

        // Delete the CV itself
        $stmt = $pdo->prepare("DELETE FROM cv WHERE cv_id = :cv_id");
        $stmt->bindParam(':cv_id', $cv_id);
        $stmt->execute();

        // Commit the transaction
        $pdo->commit();

        echo json_encode(['status' => 'success', 'message' => 'CV deleted successfully']);
    } catch (Exception $e) {
        // Rollback the transaction if something goes wrong
        $pdo->rollBack();
        echo json_encode(['status' => 'error', 'message' => 'Error deleting CV: ' . $e->getMessage()]);
    }
}
?>
