<?php
require_once 'config.php';

function getDB() {
    return new SQLite3(DB_PATH);
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validatePassword($password) {
    return strlen($password) >= 8;
}

function validateName($name) {
    return !empty(trim($name));
}

function jsonResponse($success, $message, $data = [], $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

function findUserByEmail($email) {
    $db = getDB();
    $stmt = $db->prepare('SELECT * FROM ' . DB_TABLE_USERS . ' WHERE email = :email');
    $stmt->bindValue(':email', $email, SQLITE3_TEXT);
    $result = $stmt->execute();
    $user = $result->fetchArray(SQLITE3_ASSOC);
    $db->close();
    return $user ? $user : false;
}

function findUserById($id) {
    $db = getDB();
    $stmt = $db->prepare('SELECT id, full_name, email, created_at FROM ' . DB_TABLE_USERS . ' WHERE id = :id');
    $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
    $result = $stmt->execute();
    $user = $result->fetchArray(SQLITE3_ASSOC);
    $db->close();
    return $user ? $user : false;
}
?>