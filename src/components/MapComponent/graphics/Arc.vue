<template>
  <g>
    <path :d="pathD1" style="stroke: #04e72a;stroke-width: 2;fill: none;" />
    <path :d="pathD2" style="stroke: #04e72a;stroke-width: 2;fill: none;" />
    <text
      :x="textX"
      :y="textY"
      :transform="'scale(' + 1 + ',' + -1 + ')'"
      style="fill:#04e72a;font-size:36px"
      >{{ arcInfo.number }}</text
    >
  </g>
</template>

<script>
export default {
  props: ['arcInfo'],
  data() {
    return {
      path2: '',
      xx: '',
      yy: '',
    };
  },
  computed: {
    pathD1() {
      // 已知(x1,y1)为弧线的起点，(x0,y0)为弧线所在的圆心坐标，(x2,y2)为弧线的终点
      let x1 = Number(this.arcInfo.x1);
      let y1 = Number(this.arcInfo.y1);
      let x0 = Number(this.arcInfo.x0);
      let y0 = Number(this.arcInfo.y0);
      let x2 = Number(this.arcInfo.x2);
      let y2 = Number(this.arcInfo.y2);
      // 弧线的半径为r
      let r = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
      // 对r四舍五入保留两位小数
      r = Number(r.toFixed(2));
      // 暂时按正圆弧计算
      let rx = r;
      let ry = r;
      // 圆弧按顺时针或者逆时针方向绘制，为1表示顺时针，为0表示逆时针
      let sweepFlag;
      // dx表示起点坐标和终点坐标的横坐标的中间值
      let dx = (x1 + x2) / 2;
      // dy表示起点坐标和终点坐标的纵坐标的中间值
      let dy = (y1 + y2) / 2;
      // (x3,y3)表示圆弧上的任意一点坐标，即箭头的顶点坐标
      let x3, y3;
      // 点(x4,y4)表示点(x3,y3)在圆弧的切线与x轴的交点坐标
      let x4, y4;
      // slopy表示圆弧箭头顶点所在的切线的反正切值
      let slopy, cosy, siny;
      // Par表示箭头一边的长度
      let Par = 20.0;
      // 开始计算点(x3,y3)、点(x4,y4)、sweepFlag和slopy的值
      // 根据圆心坐标的位置和起点终点的位置分情况计算
      // ang为点(x3,y3)与经过圆心的水平方向的夹角，ang1、ang2、ang3是为了求ang而求得的角度值，len为圆心到切点(x4,y4)的长度值
      let ang, ang1, ang2, ang3, len;
      // 起点与水平轴的夹角
      let angStart = Math.atan(Math.abs((y0 - y1) / (x0 - x1)));
      // 终点与水平轴的夹角
      let angStop = Math.atan(Math.abs((y0 - y2) / (x0 - x2)));
      y4 = y0;
      if (x0 < dx) {
        if (y0 < dy) {
          if (x1 < x2 && y1 > y2) {
            sweepFlag = 0;
            ang1 = angStop;
            ang2 = angStart;
            ang3 = (ang2 - ang1) * 0.3;
            ang = ang1 + ang3;
            x3 = x0 + r * Math.cos(ang);
            y3 = y0 + r * Math.sin(ang);
            len = r / Math.cos(ang);
            x4 = x0 + len;
            slopy = Math.atan2(y3 - y4, x3 - x4);
          }
          if (x1 > x2 && y1 < y2) {
            sweepFlag = 1;
            ang1 = angStart;
            ang2 = angStop;
            ang3 = (ang2 - ang1) * 0.7;
            ang = ang1 + ang3;
            x3 = x0 + r * Math.cos(ang);
            y3 = y0 + r * Math.sin(ang);
            len = r / Math.cos(ang);
            x4 = x0 + len;
            slopy = Math.atan2(y4 - y3, x4 - x3);
          }
        } else {
          if (x1 < x2 && y1 < y2) {
            sweepFlag = 1;
            ang1 = angStop;
            ang2 = angStart;
            ang3 = (ang2 - ang1) * 0.3;
            ang = ang1 + ang3;
            x3 = x0 + r * Math.cos(ang);
            y3 = y0 - r * Math.sin(ang);
            len = r / Math.cos(ang);
            x4 = x0 + len;
            slopy = Math.atan2(y3 - y4, x3 - x4);
          }
          if (x1 > x2 && y1 > y2) {
            sweepFlag = 0;
            ang1 = angStart;
            ang2 = angStop;
            ang3 = (ang2 - ang1) * 0.7;
            ang = ang1 + ang3;
            x3 = x0 + r * Math.cos(ang);
            y3 = y0 - r * Math.sin(ang);
            len = r / Math.cos(ang);
            x4 = x0 + len;
            slopy = Math.atan2(y4 - y3, x4 - x3);
          }
        }
      } else {
        if (y0 < dy) {
          if (x1 < x2 && y1 < y2) {
            sweepFlag = 0;
            ang1 = angStart;
            ang2 = angStop;
            ang3 = (ang2 - ang1) * 0.7;
            ang = ang1 + ang3;
            x3 = x0 - r * Math.cos(ang);
            y3 = y0 + r * Math.sin(ang);
            len = r / Math.cos(ang);
            x4 = x0 - len;
            slopy = Math.atan2(y4 - y3, x4 - x3);
          }
          if (x1 > x2 && y1 > y2) {
            sweepFlag = 1;
            ang1 = angStop;
            ang2 = angStart;
            ang3 = (ang2 - ang1) * 0.3;
            ang = ang1 + ang3;
            x3 = x0 - r * Math.cos(ang);
            y3 = y0 + r * Math.sin(ang);
            len = r / Math.cos(ang);
            x4 = x0 - len;
            slopy = Math.atan2(y3 - y4, x3 - x4);
          }
        } else {
          if (x1 < x2 && y1 > y2) {
            sweepFlag = 1;
            ang1 = angStart;
            ang2 = angStop;
            ang3 = (ang2 - ang1) * 0.7;
            ang = ang1 + ang3;
            x3 = x0 - r * Math.cos(ang);
            y3 = y0 - r * Math.sin(ang);
            len = r / Math.cos(ang);
            x4 = x0 - len;
            slopy = Math.atan2(y4 - y3, x4 - x3);
          }
          if (x1 > x2 && y1 < y2) {
            sweepFlag = 0;
            ang1 = angStop;
            ang2 = angStart;
            ang3 = (ang2 - ang1) * 0.3;
            ang = ang1 + ang3;
            x3 = x0 - r * Math.cos(ang);
            y3 = y0 - r * Math.sin(ang);
            len = r / Math.cos(ang);
            x4 = x0 - len;
            slopy = Math.atan2(y3 - y4, x3 - x4);
          }
        }
      }
      // 开始画圆弧
      let stX = 'M' + x1;
      stX = stX.replace("'", '');
      let arcX = 'A' + rx;
      arcX = arcX.replace("'", '');
      let arr = [stX, y1, arcX, ry, 0, 0, sweepFlag, x2, y2];
      let d = arr.join(' ');

      cosy = Math.cos(slopy);
      siny = Math.sin(slopy);

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
      // var route = 'M' + (Number(x3) + Number(Par * cosy - (Par / 2.0 * siny))) + "," + (Number(y3) + Number(Par * siny + (Par / 2.0 * cosy)))
      // route += " L" + x3 + "," + y3
      // route += " L" + (Number(x3) + Number(Par * cosy + Par / 2.0 * siny) + "," + (Number(y3) - Number(Par / 2.0 * cosy - Par * siny)))

      this.xx = x3;
      this.yy = y3;
      this.path2 = route;

      return d;
    },
    pathD2() {
      return this.path2;
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
