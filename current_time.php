<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  // Allow CORS
$microtime = microtime(true);
echo '{"unixtime": '.(int)($microtime * 1000).'}';
?>
