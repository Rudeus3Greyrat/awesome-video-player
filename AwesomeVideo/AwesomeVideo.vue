<template>
  <div
    class="video-box"
    @mousemove="vp.bottomTup()"
    @mouseleave="vp.bottomTdow()"
  >
    <load
      :radius="40"
      :progress="0"
      :stroke="6"
      :color="'#1989fa'"
      v-show="show"
      class="mz"
    ></load>
    <div class="mz" v-show="!show">
      <i
        class="iconfont icon-bofang"
        style="font-size: 58px; z-index: 1000"
        @click="vp.isplay()"
      ></i>
      <i class="iconfont icon-zanting hide fain" style="font-size: 58px"></i>
    </div>
    <video
      class="video-player"
      @canplay="canplayVd"
      @ended="endedVd"
      @waiting="waitingVd"
      @canplaythrough="canplaythroughVd"
      @play="playVd"
      @pause="pauseVd"
      @error="errorVd"
      @volumechange="volumechangeVd"
      @emptied="emptiedVd"
      @ratechange="ratechangeVd"
      @empty="emptyVd"
      @seeking="seekingVd"
      @timeupdate="timeupdateVd"
      @stalled="stalledVd"
      @abort="abortVd"
    ></video>
    <div class="bottom-tool" @mousemove="vp.clearVb()">
      <div class="pv-bar">
        <div class="pv-played">
          <div class="pv-dot" @mousedown="vp.useTime()"></div>
        </div>
      </div>
      <div class="pv-controls">
        <div class="pc-con-l">
          <div class="play-btn" @click="vp.usePlay()" v-show="!show">
            <i class="iconfont icon-bofang" :title="controls.playTit"></i>
            <i
              class="iconfont icon-zanting hide"
              :title="controls.pauseTit"
            ></i>
          </div>
          <div class="pv-time">
            <p class="pv-currentTime">00:00:00</p>
            <p>/</p>
            <p class="pv-duration">00:00:00</p>
          </div>
        </div>
        <div class="pc-con-r">
          <div class="pv-listen ml" v-if="controls.listen">
            <div class="pv-yl">
              <p class="pv-ol" @mousedown="vp.useListen()"></p>
              <p class="pv-bg"></p>
            </div>
            <div class="pv-iconyl" @click="vp.useVolume()">
              <i
                class="iconfont icon-yinliang"
                :title="controls.volumeTit"
              ></i>
              <i
                class="iconfont icon-jingyin hide"
                :title="controls.muteTit"
              ></i>
            </div>
          </div>
          <div class="pv-speed ml" v-if="controls.speed">
            <p class="pv-spnum" :title="controls.speedTit">1x</p>
            <ul class="selectList" @click="vp.useSpnum()">
              <li>0.5x</li>
              <li>1x</li>
              <li>1.25x</li>
              <li>1.5x</li>
              <li>2x</li>
            </ul>
          </div>
          <div
            class="pv-screens ml"
            @click="vp.fullScreen()"
            v-if="controls.fullScreen"
          >
            <i
              class="iconfont icon-shipinquanping"
              v-show="shipinquanping"
              :title="controls.fullScreenTit"
            ></i>
            <i
              class="iconfont icon-tuichuquanping"
              v-show="tuichuquanping"
              :title="controls.EscfullScreenTit"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { h } from "vue";
const isVue3 = typeof h === "function";
import { v2index } from "./mixinv2.js";
import { v3index } from "./mixinv3.js";
import AwesomeVideo from "./vp.js";
import load from "./load.vue";
export default {
  name: "AwesomeVideo",
  components: { load },
  mixins: [isVue3 ? v3index : v2index],
  data: () => ({
    vp: null,
    show: true,
    shipinquanping: true,
    tuichuquanping: false,
    defaultStyle: { width: "1200px", height: "600px" },
  }),
  computed: {
    controls: function () {
      return this.controlsConfig ? this.controlsConfig : false;
    },
  },
  props: {
    properties: { type: Object },
    videoStyle: { type: Object },
    controlsConfig: { type: Object },
  },
  watch: {
    properties: {
      handler(val) {
        if (val.src) {
          this.vp.showEl(".play-btn .icon-bofang");
          this.vp.showEl(".mz .icon-bofang");
          this.vp.hideEl(".play-btn .icon-zanting");
          this.vp.hideEl(".mz .icon-zanting");
          this.show = false;
        } else {
          this.show = true;
        }
        this.vp = new AwesomeVideo(
          document.querySelector(".video-box"),
          this.properties
        );
        this.checkMv();
      },
      deep: true,
    },
    videoStyle: {
      handler() {
        this.vp = new AwesomeVideo(
          document.querySelector(".video-box"),
          null,
          Object.keys(this.videoStyle).length === 0
            ? this.defaultStyle
            : this.videoStyle
        );
      },
      deep: true,
    },
  },
  emits: {
    timeupdate: null,
    play: null,
    pause: null,
    canplay: null,
    ended: null,
    waiting: null,
    canplaythrough: null,
    error: null,
    volumechange: null,
    emptied: null,
    ratechange: null,
    empty: null,
    seeking: null,
    stalled: null,
    abort: null,
  },
  methods: {
    playVd() {
      this.$emit("play");
    },
    pauseVd() {
      this.$emit("pause");
    },
    canplayVd() {
      this.$emit("canplay");
      this.vp.useOnplay();
    },
    endedVd() {
      this.$emit("ended");
      this.vp.useEnd();
    },
    waitingVd() {
      this.$emit("waiting");
      this.show = true;
    },
    canplaythroughVd() {
      this.$emit("canplaythrough");
      this.show = false;
    },
    errorVd() {
      this.$emit("error");
    },
    volumechangeVd() {
      this.$emit("volumechange");
    },
    emptiedVd() {
      this.$emit("emptied");
    },
    ratechangeVd() {
      this.$emit("ratechange");
    },
    emptyVd() {
      this.$emit("empty");
    },
    seekingVd() {
      this.$emit("seeking");
    },
    timeupdateVd() {
      this.$emit("timeupdate");
    },
    stalledVd() {
      this.$emit("stalled");
    },
    abortVd() {
      this.$emit("abort");
    },
    full() {
      if (document.fullscreenElement) {
        this.tuichuquanping = true;
        this.shipinquanping = false;
      } else {
        this.tuichuquanping = false;
        this.shipinquanping = true;
      }
    },
    keydown(ev) {
      if (ev.keyCode === 32) {
        this.vp.usePlay();
      }
    },
    checkMv() {
      if (
        this.properties &&
        this.properties.src &&
        this.properties.src.substr(
          this.properties.src.length - 4,
          this.properties.src.length
        ) === "m3u8"
      ) {
        this.onhls();
      }
    },
    onhls() {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://cdn.jsdelivr.net/hls.js/latest/hls.min.js";
      document.getElementsByTagName("head")[0].appendChild(script);
      script.onload = () => {
        console.log("hls.js资源加载成功");
        var hls = new Hls();
        hls.loadSource(this.properties.src);
        hls.attachMedia(document.querySelector(".video-player"));
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("加载成功");
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.log(event, data);
          console.log("加载失败");
        });
      };
      script.onerror = function () {
        console.log("hls.js资源加载失败");
      };
    },
  },
  mounted() {
    document.addEventListener("fullscreenchange", this.full, true);
    document.addEventListener("keydown", this.keydown, true);
    if (this.properties && this.videoStyle) {
      this.vp = new AwesomeVideo(
        document.querySelector(".video-box"),
        this.properties,
        Object.keys(this.videoStyle).length === 0
          ? this.defaultStyle
          : this.videoStyle
      );
    } else if (this.properties) {
      this.vp = new AwesomeVideo(
        document.querySelector(".video-box"),
        this.properties
      );
    } else if (this.videoStyle) {
      this.vp = new AwesomeVideo(
        document.querySelector(".video-box"),
        null,
        Object.keys(this.videoStyle).length === 0
          ? this.defaultStyle
          : this.videoStyle
      );
    } else {
      this.vp = new AwesomeVideo(document.querySelector(".video-box"));
    }
    this.checkMv();
  },
};
</script> <style scoped>
@import "./css/iconfont/iconfont.css";
@import "./css/index.css";
</style>