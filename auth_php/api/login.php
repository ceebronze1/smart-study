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
if (empty($data['email']) || empty($data['password'])) {
    jsonResponse(false, 'Email and password are required');
}

$email = trim($data['email']);
$password = $data['password'];

if (!validateEmail($email)) {
    jsonResponse(false, 'Please enter a valid email address');
}

// Find user
$user = findUserByEmail($email);

if (!$user) {
    jsonResponse(false, 'Invalid email or password');
}

// Verify password
if (password_verify($password, $user['password'])) {
    // Password is correct - log in user
    loginUser($user['id']);
    
    // Get user data without password
    $userData = findUserById($user['id']);
    
    jsonResponse(true, 'Login successful', [
        'user' => $userData
    ]);
} else {
    jsonResponse(false, 'Invalid email or password');
}
?>