<?php
declare(strict_types=1);
// Run once from CLI after importing schema: php backend/scripts/create-owner.php
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
$configPath = dirname(__DIR__) . '/config.php';
if (!is_file($configPath)) { fwrite(STDERR, "Create backend/config.php from config.example.php first.\n"); exit(1); }
$config = require $configPath;
$db = $config['db'];
$dsn = "mysql:host={$db['host']};dbname={$db['name']};charset={$db['charset']}";
$pdo = new PDO($dsn, $db['user'], $db['password'], [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);
function ask(string $label): string { fwrite(STDOUT,$label); return trim((string)fgets(STDIN)); }
$first = ask("Owner first name: ");
$last = ask("Owner last name: ");
$phone = preg_replace('/\D+/', '', ask("Owner mobile (Iran format 09...): "));
if (!preg_match('/^09\d{9}$/', $phone)) { fwrite(STDERR,"Invalid phone format.\n"); exit(1); }
fwrite(STDOUT,"Owner password (min 12 chars): ");
$pass = trim((string)fgets(STDIN));
if (strlen($pass)<12) { fwrite(STDERR,"Password must be at least 12 characters.\n"); exit(1); }
$hash = password_hash($pass, PASSWORD_DEFAULT);
$stmt=$pdo->prepare("INSERT INTO users(first_name,last_name,phone,password_hash,role) VALUES(?,?,?,?, 'owner') ON DUPLICATE KEY UPDATE first_name=VALUES(first_name),last_name=VALUES(last_name),password_hash=VALUES(password_hash),role='owner',is_active=1");
$stmt->execute([$first,$last,$phone,$hash]);
fwrite(STDOUT,"Owner account created/updated. Delete this script after use.\n");
