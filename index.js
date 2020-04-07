const process = require('process');
const { exec } = require("child_process");

var ffmpeg = require('fluent-ffmpeg');

var stdin = process.stdin;

stdin.setRawMode( true );

stdin.resume();

stdin.setEncoding( 'utf8' );

var command = ffmpeg('/dev/video2').native().outputOptions(['-s 640x480', '-pix_fmt rgb24', '-reset_timestamps 0', '-flush_packets 1']).fps(10).format('v4l2').addOutput('/dev/video0');

command.run();

var isRunning = true;

stdin.on('data', (key) => {
  if (key === '\u0003'){
    command.kill();
    if(!isRunning){
      toggleMic(true);
    }
    process.exit();
  }else if(key == 'a'){
    isRunning = !isRunning;
    toggleMic(isRunning);

    console.log("Video/Mic is now " + (isRunning ? "resumed" : "paused"));

    if(isRunning){
      command.run();
    }else{
      command.kill();
    }
    return;
  }
  process.stdout.write(key);
});

console.log("OrekiCam is now forwarding video and ready for use.");

function toggleMic(micOn){
  exec("amixer set Capture " + (micOn ? "cap" : "nocap"), (error, stdout, stderr) => {
      if (error) {
          console.log(`Mic set error: ${error.message}`);
          return;
      }
  });
}
