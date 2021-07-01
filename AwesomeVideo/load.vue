<template>
  <div class="loading">
    <svg :height="radius * 2" :width="radius * 2">
      <circle
        :stroke="color"
        :stroke-dasharray="circumference + ' ' + circumference"
        :style="{ strokeDashoffset: strokeDashoffset }"
        :stroke-width="stroke"
        fill="transparent"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
    </svg>
  </div>
</template>
<script>
import { h } from "vue";
import { v2load } from "./mixinv2.js";
import { v3load } from "./mixinv3.js";
const isVue3 = typeof h === "function";
export default {
  name: "load",
  props: { radius: Number, progress: Number, stroke: Number, color: String },
  mixins: [isVue3 ? v3load : v2load],
  data() {
    const progressed = this.progress;
    const colored = this.color;
    const normalizedRadius = this.radius - this.stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    return {
      interval: null,
      normalizedRadius,
      circumference,
      progressed,
      colored,
    };
  },
  methods: {
    timer() {
      this.interval = setInterval(() => {
        this.progressed += 25;
        if (this.progressed > 101) {
          this.colored = "white";
        }
        this.colored = "#1989fa";
      }, 150);
    },
  },
  mounted() {
    this.timer();
    console.log(this);
  },
  computed: {
    strokeDashoffset() {
      return this.circumference - (this.progressed / 100) * this.circumference;
    },
  },
};
</script>
<style scoped>
circle {
  transition: stroke-dashoffset 0.15s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
.txt {
  font-size: 14px;
  text-align: center;
  color: #333;
}
.loading {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
