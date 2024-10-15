function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function get_time(){
    var startTime = Date.now();
        try {
            const response = await fetch('current_time.php').catch(async (error) => {console.log('An error occurred:', error);await wait(1000 + Math.random() * 1000);main();})
            const data = await response.json();

            let now_local = new Date(data.unixtime);
            // turn to Iran local time
            //const now = new Date(data.unixtime+now_local.getTimezoneOffset()*1000*60+4.5*60000*60); // turn to Iran local time
            const now = new Date(data.unixtime);
            var endTime = Date.now(); var latency = endTime - startTime;
            console.log('ping: ',latency);
            
            unixtime = data.unixtime;
            return {now , latency,unixtime}
        }catch (error) {
        console.error('Fetch error:', error);

        return { now: null, latency: 9999, unixtime: null };
    }
    }
async function get_target_time(){
    const response = await fetch('target_time.php').catch(async (error) => {console.log('An error occurred:', error);await wait(1000 + Math.random() * 1000);main();});
    const data = await response.json();
    //const data = await response.text() ;
    return data;
}
async function log(text) {
    const response = await fetch('log.php?text=n: '+identity+' , '+text).catch((error) => {console.log('An error occurred:', error)});
}
async function main(first_time=false){
    latency = 9999;
    const target_time = await get_target_time();

    //reload if needed
    //if (target_time.includes('reload')){setTimeout(() => {location.reload();},5000);return;}

    const video = document.getElementById('myVideo');
    video.play();
    video.play();
    setTimeout(() => {video.play();}, 200);
    setTimeout(() => {video.play();}, 400);
    //video.currentTime = 0;
    //pause video for first time for just testing
    if(first_time) setTimeout(() => {video.pause();video.currentTime = 0;},900);
    
    lowering_expectency = 0 ;
    while(latency>(latency_limit_ms+lowering_expectency)){
        lowering_expectency+=5;
        const result = await get_time();


        let targetDate = new Date(target_time.unixtime);
        //let [hours, minutes, seconds, milliseconds] = target_time.split(':');
        //targetDate.setHours(hours, minutes, seconds, milliseconds);
        var timeDiff = targetDate.getTime() - result.now.getTime();
        
        latency = result.latency;
        if (latency > (latency_limit_ms+lowering_expectency)){ await wait(100 + Math.random() * 1000);log('latency: '+latency+' r: '+lowering_expectency/10)}
    }
    console.log(timeDiff/1000);

    //if its a tv not a local chrome tab or my phone
    if(navigator.userAgent.toLowerCase().includes('android') && window.innerWidth > 400) {
        latency += 0;
        latency += adjust_tv_times[identity];
    }
    //setTimeout(() => {video.currentTime = 0;video.pause();video.currentTime = 0;}, timeDiff -latency-900);
    setTimeout(() => {
        video.currentTime = 0;
        video.play();
        setTimeout(() => {
            main()
            //location.reload()
        }, video_duration_s*1000 - 2000 - Math.random() *10000)
        
      }, timeDiff -latency);
  
} 

const adjust_tv_times = {null:0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0};
const latency_limit_ms = 60;
const video_duration_s = 20; //44

const searchParams = new URLSearchParams(window.location.search);
const identity = searchParams.get('n');
console.log('id',identity);

window.onload = () => setTimeout(()=>{main(true)}, 1000 + Math.random() * 1000);


document.getElementById('fullscreenBtn').addEventListener('click', function() {
  document.getElementById('fullscreenBtn').style.display = 'none';
  document.getElementById('user_code').style.display = 'none';
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