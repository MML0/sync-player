<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {background-color: black;}
        video::-webkit-media-controls {
    display: none !important; /* Hide controls in WebKit-based browsers */
}

video::-webkit-media-controls-enclosure {
    display: none !important;
}

video::-webkit-media-controls-panel {
    display: none !important;
}


    </style>
</head>
<body>
    <button id="fullscreenBtn" style="width: 100%; height: 40px;">Go Fullscreen</button>
    
    <center><h1 style="color: aliceblue;" id="user_code"><?php echo $_GET['n'];?></h1></center>

    <video playsinline webkit-playsinline crossorigin="anonymous" class="romeo-player-custom-control" preload="meta" controls="false"  id="myVideo" width="100%;" height="100%;" autoplay loop muted >
        <source src="/static/<?php
            // recive TV number as GET value 'n' and map it to coresponding file name
            if(isset($_GET['n'])) {
                $filename = $_GET['n'];
                $file_path = 'TV_'. $filename;
                echo $file_path;
            } else {
                echo "timer";
            }
        ?>.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <!-- mount file here for low latency -->
    <script src="serve_file.php?filename=main2.js&v=1.1.100"></script>
</body>
</html>