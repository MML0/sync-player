<?php

$json = file_get_contents('video_duration.txt'); 

if ($json === false) {
    die('Error reading the JSON file');
}

$json_data = json_decode($json, true); 

if ($json_data === null) {
    $video_duration = 360;
}
$video_duration = $json_data['video_duration'];

$microtime = microtime(true);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  // Allow CORS
//usleep(rand(1, 30)*1000);
//usleep(rand(1, 300)*1000);
$interval = $video_duration * 1000 + 100;

echo '{"unixtime": '.(floor((int)($microtime * 1000)/$interval+1)*$interval).',"video_duration": '.($video_duration).'}';
?>