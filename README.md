# OrekiCam, Linux video/microhpone hijacking

OrekiCam allows you to put your camera/microphone on pause without any indication to programs utilizing it. As a college student during COVID-19 but a cybersecurity researcher/software engineer first and foremost, I'm apprehensive to install and use any spyware on my computer given the situation. OrekiCam utilizes a forked version of akvcam which I've modified in order to create a separate virtual video capture device that can be paused from OrekiCam.

## Setup ##

Install modified akvcam
```
apt-get update
apt-get upgrade
git clone https://github.com/Ruegg/akvcam
cd akvcam/src
make
make install
depmod -a
```

Configure the akvcam cameras, `/etc/akvcam/config.ini`
```
[Cameras]
cameras/size = 2

cameras/1/type = output
cameras/1/mode = mmap, userptr, rw
cameras/1/description = Virtual Camera (output device)
cameras/1/formats = 2

cameras/2/type = capture
cameras/2/mode = mmap, rw
cameras/2/description = Virtual Camera
cameras/2/formats = 1, 2

[Formats]
formats/size = 2

formats/1/format = YUY2
formats/1/width = 640
formats/1/height = 480
formats/1/fps = 30

formats/2/format = RGB24, YUY2
formats/2/width = 640
formats/2/height = 480
formats/2/fps = 20/1, 15/2

[Connections]
connections/size = 1
connections/1/connection = 1:2
```

Installing ffmpeg
```
sudo apt install ffmpeg
```

Installing OrekiCam modules(return to OrekiCam directory)
```
npm install
```

Running OrekiCam
```
npm start
```

## Usage
OrekiCam is simple to use, pressing `A` key in the console will toggle the virtual camera and system microphone and output the current status.
