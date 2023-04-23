<template>
  <g>
    <g :transform="'rotate(' + carInfoTwo.attitude + ' ' + carInfoTwo.x + ' ' + carInfoTwo.y + ')'">
      <rect :x="rectX"
            :y="rectY"
            width="100"
            height="200"
            rx="20"
            ry="20"
            style="stroke: red;fill: darkred">
      </rect>
      <path :d="pathD"
            :transform="'translate(' + carInfoTwo.x + ',' + carInfoTwo.y + ')'"
            style="stroke: black;stroke-width: 2;fill: black;" />
      <rect :x="carInfoTwo.x"
            :y="carInfoTwo.y"
            :transform="'translate(' + 70 + ',' + (-60) + ')'"
            width="10"
            height="20"
            rx="2"
            ry="2"
            style="stroke: black;fill: white" />
      <rect :x="carInfoTwo.x"
            :y="carInfoTwo.y"
            :transform="'translate(' + 90 + ',' + (-55) + ')'"
            width="10"
            height="10"
            rx="2"
            ry="2"
            style="stroke: black;fill: white" />
      <rect :x="carInfoTwo.x"
            :y="carInfoTwo.y"
            :transform="'translate(' + 70 + ',' + 40 + ')'"
            width="10"
            height="20"
            rx="2"
            ry="2"
            style="stroke: black;fill: white" />
      <rect :x="carInfoTwo.x"
            :y="carInfoTwo.y"
            :transform="'translate(' + 90 + ',' + 45 + ')'"
            width="10"
            height="10"
            rx="2"
            ry="2"
            style="stroke: black;fill: white" />
    </g>
    <g>
      <text :x="textX"
            :y="textY"
            :transform="'scale(' + 1 + ',' + (-1) + ')'"
            style="fill:red;font-size:56px">{{ carInfoTwo.index }}#</text>
    </g>
  </g>
</template>

<script>
export default {
  props: ['carInfoTwo'],
  data () {
    return {}
  },
  computed: {
    rectX: function () {
      let xx = this.carInfoTwo.x - 150;
      return xx
    },
    rectY: function () {
      let yy = this.carInfoTwo.y - 100;
      return yy
    },
    pathD: function () {
      let pathArr = ['M-20', -20, 130, -20, 150, -40, 150, -60, 130, -80, -50, -80, -50, 80, 130, 80, 150, 60, 150, 40, 130, 20, -20, 20, 'Z']
      let d = pathArr.join(' ')
      return d
    },
    textX: function () {
      return (this.carInfoTwo.x - 180)
    },
    textY: function () {
      return (this.carInfoTwo.y * (-1) - 150)
    }
  },
  methods: {

  }
}
</script>

<style scoped>
</style>