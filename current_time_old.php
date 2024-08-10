<?php
// current_time.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  // Allow CORS

// Get current time with microseconds
$microtime = microtime(true);
$current_time = DateTime::createFromFormat('U.u', number_format($microtime, 6, '.', ''));
$current_time->setTimezone(new DateTimeZone('UTC'));

// Format datetime with milliseconds accuracy
$datetime_with_ms = $current_time->format('Y-m-d\TH:i:s.uP');

$response = [
    "utc_offset" => "+00:00",
    "timezone" => "Etc/UTC",
    "day_of_week" => $current_time->format('N'),
    "day_of_year" => $current_time->format('z') + 1,
    "datetime" => $datetime_with_ms,
    "utc_datetime" => $datetime_with_ms,
    "unixtime" => (int)($microtime * 1000),  // Unix timestamp with millisecond precision
    "raw_offset" => 0,
    "week_number" => $current_time->format('W'),
    "dst" => false,
    "abbreviation" => "UTC",
    "dst_offset" => 0,
    "dst_from" => null,
    "dst_until" => null,
    "client_ip" => $_SERVER['REMOTE_ADDR']
];

echo json_encode($response);
