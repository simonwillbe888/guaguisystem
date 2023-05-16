<template>
  <div id="echarts3"></div>
</template>

<script>
import * as echarts from "echarts";
import { getCountByLevel } from '@/api/homepageAlarm.js'

export default {
  props:{
    date:Number,
    required:true
  },
  data() {
    return {
      // 总数
      count: [],
      dealCount: [],
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
    init(){
      let self = this
      let param = {
        endTime: this.date[1],
        startTime: this.date[0],
      }
      getCountByLevel(param).then((response) => {
        if (response && response.data.length) {
          self.count = []
          self.alarmLevelDesc = []
          response.data.forEach(item => {
            self.alarmLevelDesc.unshift(item.alarmLevelDesc)
            self.count.unshift(item.count)
            
          });
          this.getEchartLeft3();
        }
      }).catch(() => {
      })
      
    },
    getEchartLeft3() {
      let myChart = echarts.init(document.getElementById("echarts3"));
      let option = {
        textStyle: {
          fontSize: 11,
          color: "#bae1f3",
        },
    
        title: {
          text: "告警级别",
          left: 10,
          top: 10,
          textStyle: {
            fontSize: 18,
            color: "#ffffff",
            fontWeight: "normal",
          },
        },

        xAxis: {
          data: this.alarmLevelDesc,
          axisTick: {
            show: false,
          },
          name: "",
          nameLocation: "start",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
            show: true,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          top: "8%",
          textStyle: {
            fontSize: 12, //字体大小
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
            type: "value",
            position: "left",
            // interval:5,   //间隔
            splitLine: {
              show: false,
            },
            name: "",
            axisLine: {
              lineStyle: {
                color: "#fff",
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
            type: "bar",
            barWidth: 10,
            label: {
              show: false,
              color: "#fff",
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
                color: function(params){
                  var colorlist = [  "#DD41BE", "#EB772F","#6E3DC4","#13C8AC","#fff" ]
                   return colorlist[params.dataIndex]
                }
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
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#echarts3 {
  width: 100%;
  height: 100%;
  background: #46555B;
  background-color:  rgba($color: #031B31, $alpha: 0.7);
  box-shadow: 0 0 0 0.5px #fff, 0 0 0 1px #ccc;
  transform: translateZ(0);
  border-radius: 10px;
}
</style>
