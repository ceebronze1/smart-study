<?php
require_once '../includes/auth.php';
require_once '../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(false, 'Method not allowed', [], 405);
}

if (!isLoggedIn()) {
    jsonResponse(false, 'Not authenticated', [], 401);
}

$user = findUserById(getCurrentUserId());
if (!$user) {
    logoutUser();
    jsonResponse(false, 'User not found', [], 404);
}

jsonResponse(true, 'Authenticated', ['user' => $user]);
?>