<template>
  <div id="echarts3"></div>
</template>

<script>
import * as echarts from "echarts";
import { getCountByLevel } from '@/api/homepageAlarm.js'

export default {
  props:{
    date:Array,
    required:true
  },
  data() {
    return {
      // 总数
      count: [],
      dealCount: [],
      option:{},
    };
  },
  mounted() {
    this.init();
  },
  computed:{
   changTheme(){
    return this.$store.state.global.theme
   }
  },
  watch:{
   date(newValue,old){
    if(newValue !== ''){
    this.init()
    }
   },
   changTheme(newV,oldV){
     var tablebody = document.querySelector('#echarts3')
     if(newV == 'theme-1'){
      tablebody.style.setProperty('--box-shadow','2px 2px 2px 0px rgba(204,204,204,0.89)')
      this.getEchartLeft3('#000')

    }
     else{
      this.getEchartLeft3('#fff')

      tablebody.style.setProperty('--box-shadow', 'none');
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
          if (this.$store.state.global.theme == 'theme-1') {
              this.getEchartLeft3('#000');
            }
            else {
              this.getEchartLeft3('#fff');
            }
        }
      }).catch(() => {
      })
      
    },
    getEchartLeft3(color) {
      let myChart = echarts.init(document.getElementById("echarts3"));
      this.option = {
        textStyle: {
          fontSize: 11,
          color: "#bae1f3",
        },
    
        title: {
          text: "| 告警级别",
          left: 10,
          top: 10,
          textStyle: {
            fontSize: 18,
            color: color,
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
              color: "#9ed0ce",
            },
            show: false,
          },
          axisLabel:{
              color:'#64C8C8'
            }
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
              show: true,
              lineStyle:{
                type:'dashed'
              }
            },
            name: "",
            axisLine: {
              lineStyle: {
                color: "#9ed0ce",
              },
              show: true,
            },
            axisTick: {
              show: false,
            },
            axisLabel:{
              color:'#64C8C8'
            }
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: 30,
            label: {
              show: false,
              color: "#64C8C8",
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
                color: '#64C8C8'
                // function(params){
                //   var colorlist = [  "#DD41BE", "#EB772F","#6E3DC4","#13C8AC","#fff" ]
                //    return colorlist[params.dataIndex]
                // }
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
      myChart.setOption(this.option, true);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
:root {
  --box-shadow:none;
}
#echarts3 {
  width: 100%;
  height: 100%;
  background-color:  var(--tablebody);
  box-shadow: var(--box-shadow); 
  transform: translateZ(0);
}
</style>
