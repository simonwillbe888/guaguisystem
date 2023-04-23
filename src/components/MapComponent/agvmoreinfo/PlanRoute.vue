<template>
  <line :x1="routeInfo.startPtX"
        :y1="routeInfo.startPtY"
        :x2="routeInfo.endPtX"
        :y2="routeInfo.endPtY"
        :style="lineStyle">

  </line>
</template>

<script>
export default {
  props: ['routeInfo'],
  data () {
    return {}
  },
  computed: {
    lineStyle () {
      if (this.routeInfo.flag) {
        let stle = 'stroke:rgb(221, 0, 0);stroke-width:30;stroke-dasharray: 60 60;'
        return stle
      } else {
        let stle = 'stroke:rgb(64, 129, 245);stroke-width:10;'
        return stle
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>
</style>