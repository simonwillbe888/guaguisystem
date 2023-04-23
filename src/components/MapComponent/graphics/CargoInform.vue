<template>
  <g>
    <defs>
      <filter id="f1"
              x="0"
              y="0"
              width="200%"
              height="200%">
        <feOffset result="offOut"
                  in="SourceGraphic"
                  dx="20"
                  dy="20" />
        <feColorMatrix result="matrixOut"
                       in="offOut"
                       type="matrix"
                       values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
        <feGaussianBlur result="blurOut"
                        in="matrixOut"
                        stdDeviation="10" />
        <feBlend in="SourceGraphic"
                 in2="blurOut"
                 mode="normal" />
      </filter>
    </defs>
    <g :transform="'rotate(' + cargoInfo.attitude + ' ' + cargoInfo.x + ' ' + cargoInfo.y + ')'">
      <rect :x="rectX"
            :y="rectY"
            width="150"
            height="100"
            style="stroke: none;stroke-width:3;fill: rgb(155,26,217)"
            filter="url(#f1)">
      </rect>
      <rect :x="rectXX"
            :y="rectYY"
            rx="10"
            ry="10"
            width="120"
            height="80"
            style="fill:url(#tt);stroke: none;stroke-width:3;fill: rgb(237,102,99)"
            filter="url(#f1)">
      </rect>
    </g>
    <g>
      <text id="tt"
            :x="textX"
            :y="textY"
            :transform="'scale(' + 1 + ',' + (-1) + ')'"
            style="fill:rgb(45,190,159);font-size:54px">货物名称：<tspan style="font-size:54px;fill:rgb(65, 211, 188);font-weight:normal">{{ cargoInfo.goodsName }}</tspan></text>
    </g>
  </g>
</template>

<script>
export default {
  props: ['cargoInfo'],
  data () {
    return {}
  },
  computed: {
    rectX: function () {
      let xx = this.cargoInfo.x - 75;
      return xx
    },
    rectY: function () {
      let yy = this.cargoInfo.y - 50;
      return yy
    },
    rectXX: function () {
      let xx = this.cargoInfo.x - 60;
      return xx
    },
    rectYY: function () {
      let yy = this.cargoInfo.y - 40;
      return yy
    },
    textX: function () {
      return (this.cargoInfo.x - 180)
    },
    textY: function () {
      return (this.cargoInfo.y * (-1) + 170)
    }
  }
}
</script>