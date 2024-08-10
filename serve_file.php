<?php
// serve_file.php
$filename = $_GET['filename'];
$file_path = 'static/' . $filename;

if (file_exists($file_path)) {
    $mime_type = mime_content_type($file_path);
    header('Content-Type: ' . $mime_type);
    readfile($file_path);
} else {
    header('HTTP/1.0 404 Not Found');
    echo 'File not found';
}
