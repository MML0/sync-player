<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {background-color: black;}
    </style>
</head>
<body>
    <button id="fullscreenBtn" style="width: 100%; height: 20px;">Go Fullscreen</button>
    <video id="myVideo" width="640" height="360" autoplay loop muted>
        <source src="serve_file.php?filename=<?php
            // recive TV number as GET value 'n' and map it to coresponding file name
            if(isset($_GET['n'])) {
                $filename = $_GET['n'];
                $file_path = '' . $filename;
                echo $file_path;
            } else {
                echo "ww";
            }
        ?>.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <!-- mount file here for low latency -->
    <script src="serve_file.php?filename=main2.js&v=1.1.100"></script>
</body>
</html>