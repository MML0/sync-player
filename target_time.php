<?php
date_default_timezone_set('Asia/Tehran');

$time = strtotime('+1 hour');

$hours = date("H", $time);
$minutes = date("i", $time) ; // Increment minutes by 1
$seconds = date("s", $time);
$targetSeconds = floor($seconds / 20) * 20 + 22;

echo "${hours}:${minutes}:${targetSeconds}:00";
?>
