<template>
  <g>
    <g :transform="'rotate(' + carInfoOne.attitude + ' ' + carInfoOne.x + ' ' + carInfoOne.y + ')'">
      <rect :x="rectX"
            :y="rectY"
            width="200"
            height="160"
            rx="20"
            ry="20"
            style="stroke: rgb(6, 244, 182);stroke-width:3;fill: rgba(6, 244, 182, 0.5)">
      </rect>
      <circle :cx="carInfoOne.x"
              :cy="carInfoOne.y"
              r="80"
              style="stroke: pink;fill: #fff">
      </circle>
      <circle :cx="carInfoOne.x"
              :cy="carInfoOne.y"
              r="30"
              style="stroke: none;fill: rgb(10, 28, 52)">
      </circle>
      <circle :cx="carInfoOne.x"
              :cy="carInfoOne.y"
              :transform="'translate(' + (-40) + ',' + (-40) + ')'"
              r="15"
              style="stroke: none;fill: rgb(6, 244, 182)">
      </circle>
      <circle :cx="carInfoOne.x"
              :cy="carInfoOne.y"
              :transform="'translate(' + 40 + ',' + (-40) + ')'"
              r="15"
              style="stroke: none;fill: rgb(6, 244, 182)">
      </circle>
      <circle :cx="carInfoOne.x"
              :cy="carInfoOne.y"
              :transform="'translate(' + (-40) + ',' + 40 + ')'"
              r="15"
              style="stroke: none;fill: rgb(6, 244, 182)">
      </circle>
      <circle :cx="carInfoOne.x"
              :cy="carInfoOne.y"
              :transform="'translate(' + 40 + ',' + 40 + ')'"
              r="15"
              style="stroke: none;fill: rgb(6, 244, 182)">
      </circle>
    </g>
    <g>
      <text :x="textX"
            :y="textY"
            :transform="'scale(' + 1 + ',' + (-1) + ')'"
            style="fill:red;font-size:56px">{{ carInfoOne.index }}#</text>
    </g>
  </g>
</template>

<script>
export default {
  props: ['carInfoOne'],
  data () {
    return {}
  },
  computed: {
    rectX: function () {
      let xx = this.carInfoOne.x - 100;
      return xx
    },
    rectY: function () {
      let yy = this.carInfoOne.y - 80;
      return yy
    },
    textX: function () {
      return (this.carInfoOne.x - 180)
    },
    textY: function () {
      return (this.carInfoOne.y * (-1) - 150)
    }
  },
  methods: {

  }
}
</script>

<style scoped>
</style>