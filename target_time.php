<?php
date_default_timezone_set('Asia/Tehran'); // Set timezone to Iran

// Add one hour to the current time
$time = strtotime('+1 hour');
$hours = date("H");
$minutes = date("i") + 1; // Increment minutes by 1
$seconds = date("s");
$targetSeconds = floor($seconds / 20) * 20 + 22;

echo "${hours}:${minutes}:59:00";
?>
