<?php
declare(strict_types=1);
/**
 * Copy to config.php and fill in hosting credentials.
 * Never commit config.php; .gitignore protects it.
 */
return [
    'db' => [
        'host' => 'localhost',
        'name' => 'YOUR_DATABASE_NAME',
        'user' => 'YOUR_DATABASE_USER',
        'password' => 'CHANGE_ME',
        'charset' => 'utf8mb4',
    ],
    'app' => [
        'base_url' => 'https://your-domain.example',
        'session_name' => 'nara_session',
        'secure_cookies' => true, // Set false only for local HTTP development.
        'allow_registration' => true,
        'timezone' => 'Asia/Tehran',
    ],
];
