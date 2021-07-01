# Awesome-Video-Player
<p align="center">
  <a href="https://www.npmjs.com/package/awesome-video-player"><img src="https://img.shields.io/npm/v/awesome-video-player.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/awesome-video-player"><img src="https://img.shields.io/npm/l/awesome-video-player.svg?sanitize=true" alt="License"></a>
  <br>
</p>
> A Vue.js based video player with good look and custom user config

> ✅ ***good-looking & support custom config***
> 
> ✅ ***Vue 2 & Vue 3 Support***
> 
> ✅ ***m3u8 video format Support***

## How to Use
### 1. Install
```
npm install awesome-video-player
```
### 2. configure player

- `properties`: Video properties.

- `videoStyle`: Video style.

- `controlsConfig`: Video control settings.

That's it, enjoy!

## Support events
|  Event name   | When to trigger |
|  ----  | ----  |
| play | The media has received a request to start playing |
| pause  | Playback has been suspended |
| canplay  | Playback can start |
| ended  | The media has played once and stopped |
| waiting  | Pause playback to download more data |
| canplaythrough  | Playback can continue and should not be interrupted. Readstate is 3 |
| error  | A network error occurred during the download |
| volumechange  | The value of the volume or muted property has changed |
| emptied  | The network connection is down |
| ratechange  | Media playback rate changes |
| empty  | An error occurred, blocking media download |
| seeking  | Playback has moved to a new location |
| timeupdate  | The current time was changed unconventionally or unexpectedly |
| stalled  | The browser tried to download but has not received data yet |
| abort  | Download interrupted |

## Example
```html
<template>
  <div id="app">
    <vam-video
      :properties="videoOption.properties"
      :videoStyle="videoOption.videoStyle"
      :controlsConfig="videoOption.controlsConfig"
      @play="playVideo"
      @canplay="canplayVideo"
      @pause="pauseVideo"
    ></vam-video>
  </div>
</template>

<script>
import AwesomeVideo from "awesome-video-player";
export default {
  name: "App",
  components: {
    AwesomeVideo
  },
  data: () => ({
    videoOption: {
      properties: {
        poster: require("./assets/logo.png"),
        src:
          // "https://mos-vod-drcn.dbankcdn.cn/P_VT/video_injection/2A1343EFA/v3/6CC21C811065945606293295744/MP4Mix_H.264_1920x1080_6000_HEAAC1_PVC_NoCut.mp4",
          "https://tv.youkutv.cc/2019/11/12/mjkHyHycfh0LyS4r/playlist.m3u8",
        preload: "auto",
        // loop: "loop",
        // autoplay:"autoplay",
        // muted:true
      },
      videoStyle: {
        // width: "1200px",
        // height: "600px",
      },
      controlsConfig: {
        fullScreenTit:"全屏",
        EscfullScreenTit:"退出全屏",
        speedTit:"倍速",
        volumeTit:"音量",
        muteTit:"静音",
        playTit:"播放",
        pauseTit:"暂停",
        fullScreen:true,
        speed:true,
        listen:true
      }
    },
  }),
  methods:{
    playVideo(){
      console.log("play");
    },
    pauseVideo(){
      console.log("pause");
    },
    canplayVideo(){
      console.log("canplay");
    }
  }
};
</script>
```

