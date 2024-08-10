<?php
date_default_timezone_set('Asia/Tehran'); // Set timezone to Iran

$hours = date("H");
$minutes = date("i") + 1; // Increment minutes by 1
$seconds = date("s");
$targetSeconds = floor($seconds / 20) * 20 + 22;

echo "${hours}:${minutes}:59:00";
?>
