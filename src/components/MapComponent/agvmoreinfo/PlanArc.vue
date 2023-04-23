<template>
  <path :d="pathD"
        style="stroke:rgb(221, 0, 0);fill: none;stroke-width:30;stroke-dasharray: 60 60;" />
</template>

<script>
export default {
  props: ['routeInfo2'],
  data () {
    return {
    }
  },
  computed: {
    pathD: function () {
      // 已知(x1,y1)为弧线的起点，(x0,y0)为弧线所在的圆心坐标，(x2,y2)为弧线的终点
      let x1 = Number(this.routeInfo2.x1)
      let y1 = Number(this.routeInfo2.y1)
      let x0 = Number(this.routeInfo2.x0)
      let y0 = Number(this.routeInfo2.y0)
      let x2 = Number(this.routeInfo2.x2)
      let y2 = Number(this.routeInfo2.y2)
      // 弧线的半径为r
      let r = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1))
      // 对r四舍五入保留两位小数
      r = r.toFixed(2)
      // 暂时按正圆弧计算
      let rx = r
      let ry = r
      // 圆弧按顺时针或者逆时针方向绘制，为1表示顺时针，为0表示逆时针
      let sweepFlag
      // dx表示起点坐标和终点坐标的横坐标的中间值
      let dx = (x1 + x2) / 2
      // dy表示起点坐标和终点坐标的纵坐标的中间值
      let dy = (y1 + y2) / 2
      if (x0 < dx) {
        if (y0 < dy) {
          if (x1 < x2 && y1 > y2) {
            sweepFlag = 0
          }
          if (x1 > x2 && y1 < y2) {
            sweepFlag = 1
          }
        } else {
          if (x1 < x2 && y1 < y2) {
            sweepFlag = 1
          }
          if (x1 > x2 && y1 > y2) {
            sweepFlag = 0
          }
        }
      } else {
        if (y0 < dy) {
          if (x1 < x2 && y1 < y2) {
            sweepFlag = 0
          }
          if (x1 > x2 && y1 > y2) {
            sweepFlag = 1
          }
        } else {
          if (x1 < x2 && y1 > y2) {
            sweepFlag = 1
          }
          if (x1 > x2 && y1 < y2) {
            sweepFlag = 0
          }
        }
      }
      // 开始画圆弧
      let stX = 'M' + x1
      stX = stX.replace("\'", '')
      let arcX = 'A' + rx;
      arcX = arcX.replace("\'", '')
      let arr = [stX, y1, arcX, ry, 0, 0, sweepFlag, x2, y2]
      let d = arr.join(' ')

      return d
    }
  },
  methods: {

  }
}
</script>

<style scoped>
</style>