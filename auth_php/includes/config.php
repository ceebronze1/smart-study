<?php
header("Content-Type: application/json; charset=UTF-8");

// Start session
session_start();

// Database configuration
define('DB_PATH', __DIR__ . '/../db/database.sqlite');
define('DB_TABLE_USERS', 'users');

// Security settings
define('PASSWORD_HASH_ALGO', PASSWORD_BCRYPT);
define('PASSWORD_HASH_OPTIONS', ['cost' => 12]);
define('SESSION_TIMEOUT', 1800); // 30 minutes in seconds

// Create database and tables if they don't exist
if (!file_exists(DB_PATH)) {
    $db = new SQLite3(DB_PATH);
    $db->exec('CREATE TABLE IF NOT EXISTS ' . DB_TABLE_USERS . ' (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )');
    $db->close();
}
?>