function set_time(){

  var startTime = Date.now();
  fetch('current_time.php')
  .then(response => response.json())
  .then(data => {
    now_local = new Date(data.unixtime);
    //alert(now_local.getTimezoneOffset()*1000)
    //console.log(data.unixtime,now_local.getTimezoneOffset()*1000*60,4.5*60000*60);
    
    const now = new Date(data.unixtime+now_local.getTimezoneOffset()*1000*60+4.5*60000*60);
    
    var endTime = Date.now();var latency = endTime - startTime;//console.log('ping',latency);
    var startTime2 = Date.now();// if its lagging
    

    if(latency>200  ) {setTimeout(() => {
      set_time()
      //location.reload() 
      }, 100 + Math.random() *100)
      return
    }


    targetTime = `${now.getHours()}:${now.getMinutes()+1}:59:00`; //${Math.floor(now.getSeconds()/20)*20+22}

    targetTime = `10:30:59:00`; //${Math.floor(now.getSeconds()/20)*20+22}
    //console.log(now,"fetch",now.getMilliseconds());
    let targetDate = new Date(data.unixtime);
    let [hours, minutes, seconds, milliseconds] = targetTime.split(':');
    targetDate.setHours(hours, minutes, seconds, milliseconds);
    
    let timeDiff = targetDate.getTime() - now.getTime();
    
    const video = document.getElementById('myVideo');
    video.play();
    setTimeout(() => {video.play();}, 200);
    setTimeout(() => {video.play();}, 400);
    setTimeout(() => {video.play();}, 600);
    setTimeout(() => {video.play();}, 800);
    setTimeout(() => {video.currentTime = 0;}, 1000);
    setTimeout(() => {video.currentTime = 0;video.pause();},1200);
    //video.pause();
    video.currentTime = 0;
    //setTimeout(() => {video.play();}, 5000)
    if(navigator.userAgent.toLowerCase().includes('android') && window.innerWidth >600) {latency += 20} ;


    var endTime2 = Date.now();
    var latency2 = endTime2 - startTime2;
    //console.log('late',latency2);
    //alert(latency)
    //alert(timeDiff/100);
    console.log(timeDiff/1000,latency,latency2);
    //console.log(video.duration);
    
    setTimeout(() => {
      //video.currentTime = 0;
      video.play();
      setTimeout(() => {
        set_time()
        //location.reload()
        }, 40000+ Math.random() *5000)
      
    }, timeDiff -latency -latency2*3);

  }).catch((error) => {
    console.error('An error occurred:', error);
    //setTimeout(set_time(),2000+Math.random()*2000);
    
    });
}
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function get_time(){
    var startTime = Date.now();
    const response = await fetch('current_time.php');
    const data = await response.json();

    let now_local = new Date(data.unixtime);
    // turn to Iran local time
    const now = new Date(data.unixtime+now_local.getTimezoneOffset()*1000*60+4.5*60000*60); // turn to Iran local time
    var endTime = Date.now(); var latency = endTime - startTime;//console.log('ping',latency);
    unixtime = data.unixtime;
    return {now , latency,unixtime}
}
async function get_target_time(){
    const response = await fetch('target_time.php');
    const data = await response.text() ;
    return data;
}

async function main(){
    latency = 9999;
    limit_ms = 30 ;
    const target_time = await get_target_time();

    while(latency>limit_ms){
        const result = await get_time();

        let targetDate = new Date(result.unixtime);
        let [hours, minutes, seconds, milliseconds] = target_time.split(':');
        targetDate.setHours(hours, minutes, seconds, milliseconds);
        var timeDiff = targetDate.getTime() - result.now.getTime();
        
        console.log('Time :', result.now);
        console.log('Latency:', result.latency);
        latency = result.latency;
        if (latency > limit_ms) await wait(1000 + Math.random() * 1000);
    }

    alert(timeDiff/1000)
    video.play();
    setTimeout(() => {video.play();}, 200);

    if(navigator.userAgent.toLowerCase().includes('android') && window.innerWidth >600) {
        latency += 20
        latency += adjust_tv_times[identity]
    } ;

} 

const adjust_tv_times = {"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0};

const searchParams = new URLSearchParams(window.location.search);
const identity = searchParams.get('n');
console.log(identity);

window.onload = () => setTimeout(main, 100 + Math.random() * 100);


document.getElementById('fullscreenBtn').addEventListener('click', function() {
  document.getElementById('fullscreenBtn').style.display = 'none';
  var videoElement = document.getElementById('myVideo');
  if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
  } else if (videoElement.mozRequestFullScreen) { // Firefox
      videoElement.mozRequestFullScreen();
  } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      videoElement.webkitRequestFullscreen();
  } else if (videoElement.msRequestFullscreen) { // IE/Edge
      videoElement.msRequestFullscreen();
  }
});