<?php
$logFile = 'log.txt';

if (!empty($_GET)) {
    // Build the log string
    $logData = date("Y-m-d H:i:s") . " - ";
    $logData .= $_GET['text'];

    $logData .= PHP_EOL;

    file_put_contents($logFile, $logData, FILE_APPEND);
}

echo "Data logged successfully.";
?>
