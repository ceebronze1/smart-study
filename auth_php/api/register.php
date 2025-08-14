<?php
require_once '../includes/auth.php';
require_once '../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed', [], 405);
}

$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    jsonResponse(false, 'Invalid JSON input');
}

// Validate input
if (empty($data['full_name']) || empty($data['email']) || empty($data['password'])) {
    jsonResponse(false, 'All fields are required');
}

$fullName = trim($data['full_name']);
$email = trim($data['email']);
$password = $data['password'];

if (!validateName($fullName)) {
    jsonResponse(false, 'Please enter a valid name');
}

if (!validateEmail($email)) {
    jsonResponse(false, 'Please enter a valid email address');
}

if (!validatePassword($password)) {
    jsonResponse(false, 'Password must be at least 8 characters long');
}

// Check if user already exists
if (findUserByEmail($email)) {
    jsonResponse(false, 'Email already registered');
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_HASH_ALGO, PASSWORD_HASH_OPTIONS);

// Insert new user
$db = getDB();
$stmt = $db->prepare('INSERT INTO ' . DB_TABLE_USERS . ' (full_name, email, password) VALUES (:name, :email, :password)');
$stmt->bindValue(':name', $fullName, SQLITE3_TEXT);
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$stmt->bindValue(':password', $hashedPassword, SQLITE3_TEXT);

if ($stmt->execute()) {
    $userId = $db->lastInsertRowID();
    $db->close();
    jsonResponse(true, 'Registration successful', ['user_id' => $userId]);
} else {
    $db->close();
    jsonResponse(false, 'Registration failed');
}
?>