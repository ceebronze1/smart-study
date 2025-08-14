<?php
require_once 'functions.php';

function isLoggedIn() {
    // Check if session is active and not expired
    if (isset($_SESSION['user_id'], $_SESSION['last_activity'])) {
        if (time() - $_SESSION['last_activity'] > SESSION_TIMEOUT) {
            // Session expired
            session_unset();
            session_destroy();
            return false;
        }
        // Update last activity time
        $_SESSION['last_activity'] = time();
        return true;
    }
    return false;
}

function requireAuth() {
    if (!isLoggedIn()) {
        jsonResponse(false, 'Authentication required', [], 401);
    }
}

function loginUser($userId) {
    $_SESSION['user_id'] = $userId;
    $_SESSION['last_activity'] = time();
}

function logoutUser() {
    session_unset();
    session_destroy();
}

function getCurrentUserId() {
    return $_SESSION['user_id'] ?? null;
}
?>