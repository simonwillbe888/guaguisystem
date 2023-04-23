<template>
  <g>
    <rect
      :x="rectX"
      :y="rectY"
      rx="20"
      ry="10"
      width="380"
      height="190"
      style="fill:rgba(44, 105, 149, 0.5);stroke-width: 1;"
    >
    </rect>
    <text
      :x="stateX"
      :y="stateY"
      :transform="'scale(' + 1 + ',' + -1 + ')'"
      style="fill:rgba(48, 179, 247, 0.5);font-size:28px;font-weight:bold"
      >库位状态：<tspan
        style="font-size:24px;fill:rgba(65, 211, 188, 0.5);font-weight:normal"
        >{{ locationInfo.stateText }}</tspan
      ></text
    >
    <text
      :x="goodsX"
      :y="goodsY"
      :transform="'scale(' + 1 + ',' + -1 + ')'"
      style="fill:rgba(48, 179, 247, 0.5);font-size:28px;font-weight:bold"
      >物料名称：<tspan
        style="font-size:24px;fill:rgba(65, 211, 188, 0.5);font-weight:normal"
        >{{ locationInfo.goodsText }}</tspan
      ></text
    >
    <text
      :x="inX"
      :y="inY"
      :transform="'scale(' + 1 + ',' + -1 + ')'"
      style="fill:rgba(48, 179, 247, 0.5);font-size:28px;font-weight:bold"
      >入库时间：<tspan
        style="font-size:24px;fill:rgba(65, 211, 188, 0.5);font-weight:normal"
        >{{ locationInfo.inText }}</tspan
      ></text
    >
    <text
      :x="numX"
      :y="numY"
      :transform="'scale(' + 1 + ',' + -1 + ')'"
      style="fill:rgba(48, 179, 247, 0.5);font-size:28px;font-weight:bold"
      >库位号：<tspan
        style="font-size:24px;fill:rgba(65, 211, 188, 0.5);font-weight:normal"
        >{{ locationInfo.locationNum }}</tspan
      ></text
    >
    <!-- <text :x="outX"
          :y="outY"
          :transform="'scale(' + 1 + ',' + (-1) + ')'"
          style="fill:rgba(48, 179, 247, 0.5);font-size:28px;font-weight:bold">出库时间：<tspan style="font-size:24px;fill:rgba(65, 211, 188, 0.5);font-weight:normal">{{ locationInfo.outText }}</tspan></text> -->
  </g>
</template>

<script>
export default {
  props: ['locationInfo'],
  data() {
    return {};
  },
  computed: {
    rectX() {
      return this.locationInfo.x + 50;
    },
    rectY() {
      return this.locationInfo.y + 50;
    },
    stateX() {
      return this.locationInfo.x + 60;
    },
    stateY() {
      return this.locationInfo.y * -1 - 195;
    },
    goodsX() {
      return this.locationInfo.x + 60;
    },
    goodsY() {
      return this.locationInfo.y * -1 - 155;
    },
    inX() {
      return this.locationInfo.x + 60;
    },
    inY() {
      return this.locationInfo.y * -1 - 115;
    },
    numX() {
      return this.locationInfo.x + 60;
    },
    numY() {
      return this.locationInfo.y * -1 - 75;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
