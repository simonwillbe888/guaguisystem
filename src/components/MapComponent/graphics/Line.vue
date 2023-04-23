<template>
  <g>
    <line
      :x1="lineInfo.x1"
      :y1="lineInfo.y1"
      :x2="lineInfo.x2"
      :y2="lineInfo.y2"
      style="stroke: #fff;stroke-width:4;"
    >
    </line>
    <path :d="pathD" style="stroke: #fff;stroke-width: 4;fill: none;" />

    <text
      :x="textX"
      :y="textY"
      :transform="'scale(' + 1 + ',' + -1 + ')'"
      style="fill:#fff;font-size:36px"
      >{{ lineInfo.number }}</text
    >
  </g>
</template>

<script>
export default {
  props: ['lineInfo'],
  data() {
    return {
      xx: '',
      yy: '',
    };
  },
  computed: {
    pathD() {
      let x1 = Number(this.lineInfo.x1);
      let y1 = Number(this.lineInfo.y1);
      let x2 = Number(this.lineInfo.x2);
      let y2 = Number(this.lineInfo.y2);
      // 线的长度和箭头的位置
      var arrowPt =
        Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) * 0.7;

      var slopy, cosy, siny;
      var Par = 20.0;
      var x3, y3;
      slopy = Math.atan2(y1 - y2, x1 - x2);
      cosy = Math.cos(slopy);
      siny = Math.sin(slopy);

      if (x1 == x2) {
        if (y1 < y2) {
          x3 = x1;
          y3 = arrowPt + y1;
        } else {
          x3 = x1;
          y3 = y1 - arrowPt;
        }
      }
      if (x1 != x2 && y1 != y2) {
        let angle = Math.atan(Math.abs(y2 - y1) / Math.abs(x2 - x1));
        let dY = arrowPt * Math.sin(angle);
        let dX = arrowPt * Math.cos(angle);
        if (x1 < x2) {
          if (y1 < y2) {
            x3 = x1 + dX;
            y3 = y1 + dY;
          } else {
            x3 = x1 + dX;
            y3 = y1 - dY;
          }
        } else {
          if (y1 < y2) {
            x3 = x1 - dX;
            y3 = y1 + dY;
          } else {
            x3 = x1 - dX;
            y3 = y1 - dY;
          }
        }
      }

      if (y1 == y2) {
        if (x1 < x2) {
          x3 = arrowPt + x1;
          y3 = y1;
        } else {
          x3 = x1 - arrowPt;
          y3 = y1;
        }
      }

      let route = 'M' + x3 + ',' + y3;
      route +=
        ' L' +
        (Number(x3) + Number(Par * cosy - (Par / 2.0) * siny)) +
        ',' +
        (Number(y3) + Number(Par * siny + (Par / 2.0) * cosy));
      route +=
        ' L' +
        (Number(x3) +
          Number(Par * cosy + (Par / 2.0) * siny) +
          ',' +
          (Number(y3) - Number((Par / 2.0) * cosy - Par * siny)));
      route += ' Z';

      this.xx = x3;
      this.yy = y3;

      return route;
    },
    textX() {
      return this.xx - 70;
    },
    textY() {
      return this.yy * -1 + 60;
    },
  },
};
</script>

<style scoped></style>
