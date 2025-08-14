<?php
require_once '../includes/auth.php';
require_once '../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed', [], 405);
}

if (!isLoggedIn()) {
    jsonResponse(false, 'Not logged in', [], 401);
}

logoutUser();
jsonResponse(true, 'Logged out successfully');
?>