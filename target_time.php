<?php
$microtime = microtime(true);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  // Allow CORS
//usleep(rand(1, 30)*1000);
//usleep(rand(1, 300)*1000);
$interval = 20 * 1000 + 60;

echo '{"unixtime": '.(floor((int)($microtime * 1000)/$interval+1)*$interval).'}';
?>