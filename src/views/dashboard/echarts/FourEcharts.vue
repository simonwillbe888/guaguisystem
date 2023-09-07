<template>
  <div id="echarts4"></div>
</template>

<script>
import * as echarts from 'echarts';
import { getCountByCode } from '@/api/homepageAlarm.js';
export default {
  props:{
    date:Number,
    required:true
  },
  data() {
    return {
      // 总数
      count: [],
      alarmName: [],
    };
  },
  mounted() {
    this.init();
  },
  watch:{
   date(newValue,old){
    if(newValue !== ''){
    this.init()
    }
   }
  },
  methods: {
    init() {
      const day = this.date
      let self = this;
      let param = {
        endTime: this.date[1],
        startTime: this.date[0],
      };
      getCountByCode(param)
        .then((response) => {
          console.log('查看',response.data)
          if (response && response.data.length) {
            self.count = [];
            self.alarmName = [];
            if (response.data.length > 0){
              response.data.forEach((item) => {
                console.log('循环次数')
            //   self.alarmName.push(item.alarmName);
              switch (item.alarmType)  {
              case 1001: self.alarmName.push("行人")
              break;
              case 1002: self.alarmName.push("非机动车")
              break;
              case 1003: self.alarmName.push("异物")
              break;
              case 1004: self.alarmName.push("温度")
              break;
              case 1005: self.alarmName.push("湿度")
              break;
              case 1006: self.alarmName.push("气体")
              break;
              case 1007: self.alarmName.push("照明")
              break;
              case 1008: self.alarmName.push("违停逆行")
              break;
              case 1009: self.alarmName.push("超速")
              break;
              case 1010: self.alarmName.push("动物")
              break;
              case 1011: self.alarmName.push("井盖异常")
              break;
              case 1012: self.alarmName.push("消防设备")
              break;
              case 1013: self.alarmName.push("火灾烟雾")
              break;
              case 1014: self.alarmName.push("红外测温")
              break;
              case 1015: self.alarmName.push("算法启动")
              break;
              case 1016: self.alarmName.push("逆行")
              break;
              case 1017: self.alarmName.push("风机")
              break;
              case 1018: self.alarmName.push("指示灯")
              break;
              // case 1:
              // default: self.alarmName.push('机体')
              }
              if(item.alarmType != 1 ){
                self.count.push(item.count);

              }
            });
            }
          }
          else{
            self.count = [];
            self.alarmName = [];
          }
          this.getEchartLeft3();
        })
        .catch(() => {});
    },
    getEchartLeft3() {
      let myChart = echarts.init(document.getElementById('echarts4'));
      let option = {
        color: ["#08CEF9"],
        textStyle: {
          fontSize: 11,
          color: '#bae1f3',
        },
        title: {
          text: '告警类别',
          left: 10,
          top: 10,
          textStyle: {
            fontSize: 18,
            color: '#ffffff',
            fontWeight: 'normal',
          },
        },

        xAxis: {
          data: this.alarmName,
          axisTick: {
            show: false,
          },
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            formatter: function(value) {
              return value.length > 6 ? value.substring(0, 6) + '...' : value;
            },
          },
          name: '',
          nameLocation: 'start',
          axisLine: {
            lineStyle: {
              color: '#fff',
            },
            show: true,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          top: '8%',
          textStyle: {
            fontSize: 13, //字体大小
          },
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "3%",
          top: "28%",
          containLabel: true,
        },

        yAxis: [
          {
            type: 'value',
            position: 'left',
            // interval: 1, //间隔
            minInterval: 1,
            // min: 10,
            splitLine: {
              show: false,
            },
            name: '',
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
              show: true,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: 'bar',
            barWidth: 10,
            label: {
              show: false,
              color: '#fff',
              position: 'top',
              formatter(params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return '';
                }
              },
            },
            itemStyle: {
              normal: {
                borderWidth: 1,
                // borderColor: "#18CEE2",
                barBorderRadius: 6,
                // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                //   { offset: 0, color: "#2dc3db" },
                //   { offset: 1, color: "#0f88c0" },
                // ]),
              },
              // emphasis: {
              //   barBorderRadius: 14,
              //   shadowBlur: 18,
              //   shadowColor: "rgba(218,170, 58, 0.7)",
              // },
            },
            data: this.count,
          },
        ],
      };
      myChart.setOption(option, true);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#echarts4 {
  width: 100%;
  height: 100%;
  background-color:  rgba($color: #031B31, $alpha: 0.7);
  box-shadow: 0 0 0 0.5px #fff, 0 0 0 1px #ccc;
  transform: translateZ(0);
  border-radius: 10px;
}
</style>
