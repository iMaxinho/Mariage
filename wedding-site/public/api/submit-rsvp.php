<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$supabaseUrl = 'https://oewyfxlphemxgslyxmbe.supabase.co';
$supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ld3lmeGxwaGVteGdzbHl4bWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNDI4NDcsImV4cCI6MjA4MTkxODg0N30.Qzx4Pvc7qcg3NHMNZv93Rcb2GSpbrEPRd_ueiT3ZSbE';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$guestName = pg_escape_string($data['guest_name'] ?? '');
$email = pg_escape_string($data['email'] ?? '');
$dietaryRestrictions = isset($data['dietary_restrictions']) && $data['dietary_restrictions'] ? "'" . pg_escape_string($data['dietary_restrictions']) . "'" : 'NULL';
$message = isset($data['message']) && $data['message'] ? "'" . pg_escape_string($data['message']) . "'" : 'NULL';
$attendingMairie = isset($data['attending_mairie']) && $data['attending_mairie'] ? 'true' : 'false';
$guestsMairie = intval($data['guests_mairie'] ?? 0);
$attendingCorse = isset($data['attending_corse']) && $data['attending_corse'] ? 'true' : 'false';
$guestsCorse = intval($data['guests_corse'] ?? 0);
$attendingBrunch = isset($data['attending_brunch']) && $data['attending_brunch'] ? 'true' : 'false';
$guestsBrunch = intval($data['guests_brunch'] ?? 0);
$plusOneName = isset($data['plus_one_name']) && $data['plus_one_name'] ? "'" . pg_escape_string($data['plus_one_name']) . "'" : 'NULL';

$sql = "INSERT INTO rsvps (
    guest_name, email, dietary_restrictions, message,
    attending_mairie, guests_mairie,
    attending_corse, guests_corse,
    attending_brunch, guests_brunch,
    plus_one_name
) VALUES (
    '$guestName', '$email', $dietaryRestrictions, $message,
    $attendingMairie, $guestsMairie,
    $attendingCorse, $guestsCorse,
    $attendingBrunch, $guestsBrunch,
    $plusOneName
) RETURNING *";

$dbHost = 'db.oewyfxlphemxgslyxmbe.supabase.co';
$dbPort = '5432';
$dbName = 'postgres';
$dbUser = 'postgres';
$dbPassword = getenv('SUPABASE_DB_PASSWORD') ?: 'your_db_password_here';

$connectionString = "host=$dbHost port=$dbPort dbname=$dbName user=$dbUser password=$dbPassword sslmode=require";

$conn = pg_connect($connectionString);

if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$result = pg_query($conn, $sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . pg_last_error($conn)]);
    pg_close($conn);
    exit;
}

$row = pg_fetch_assoc($result);

pg_close($conn);

echo json_encode([
    'success' => true,
    'data' => $row,
    'message' => 'RSVP submitted successfully'
]);
?>
