<template>
  <g>
    <rect
      :x="rectX"
      :y="rectY"
      width="90"
      height="90"
      style="stroke: #05d3ee;fill: none;stroke-width: 3;"
    >
    </rect>
    <text
      :x="textX"
      :y="textY"
      :transform="'scale(' + 1 + ',' + -1 + ')'"
      style="fill:#05d3ee;font-size:36px"
      >{{ standPointInfo.number }}</text
    >
  </g>
</template>

<script>
export default {
  props: ['standPointInfo'],
  data() {
    return {};
  },
  computed: {
    rectX() {
      let xx = this.standPointInfo.x - 45;
      return xx;
    },
    rectY() {
      let yy = this.standPointInfo.y - 45;
      return yy;
    },
    textX() {
      return this.standPointInfo.x - 80;
    },
    textY() {
      return this.standPointInfo.y * -1 - 80;
    },
  },
};
</script>
<style></style>
