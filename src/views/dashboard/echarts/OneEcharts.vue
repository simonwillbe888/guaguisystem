<template>
  <div id="echarts1" ></div>
</template>

<script>
import * as echarts from 'echarts';
import { getCountByLevelAndStatus } from '@/api/homepageAlarm.js';
import { type } from 'os';
export default {
  props:{
    date:Number,
    required:true
  },
  data() {
    return {
      levelName: [],
      alarmLevel: [],
      // 总数
      count: [],
      dealCount: [],
      noDealCount: [],
      alarmLevelDesc: [],
      // dealCount: 0,
      // noDealCount: 0,
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
      console.log("自定义日期",this.date)
      let self = this;
      let param = {
        endTime: this.date[1],
        startTime: this.date[0],
      };
      getCountByLevelAndStatus(param)
        .then((response) => {
          console.log(param)
          if (response && response.data.length) {
            self.dealCount = [];
            self.noDealCount = [];
            self.alarmLevelDesc = [];
            response.data.forEach((item) => {
              self.alarmLevelDesc.unshift(item.alarmLevelDesc);
              self.dealCount.unshift(item.dealCount);
              self.noDealCount.unshift(item.noDealCount);
            });
            this.getEchartLeft3();
          }
        })
        .catch(() => {});
    },
    getEchartLeft3() {
      // debugger
      let self = this;
      let myChart = echarts.init(document.getElementById('echarts1'));
      let option = {
        color: ['#08F9EB', '#FCD14E',],
        textStyle: {
          fontSize: 11,
          color: '#bae1f3',
        },
        title: {
          text: '告警信息',
          left: 10,
          top: 10,
          textStyle: {
            fontSize: 18,
            color: '#ffffff',
            fontWeight: 'normal',
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
          trigger: 'axis',
          axisPointer: {
            type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          top: '8%',
          data: ['已处理', '未处理'],
          textStyle: {
            fontSize: 12, //字体大小
            color: '#ffffff', //字体颜色
          },
        },
        // 图 位置
        grid: {
          left: '4%',
          right: '4%',
          bottom: '3%',
          top: '28%',
          containLabel: true,
          backgroundColor: '#ddd',
        },
        // 横坐标


        // 纵坐标
        yAxis: {
          type: 'value',
          position:'left',
          splitLine: {
              show: false,
            },
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
        series: [
          {
            name: '已处理',
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
              barBorderRadius: 6,
              normal:{ color:'#08F9EB'}
            },
            emphasis: {
              focus: 'series',
            },
            data: this.dealCount,
            barGap: '-100%',
          },
          {
            name: '未处理',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            label: {
              show: false,
              color: '#fff',
              formatter(params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return '';
                }
              },
            },
            emphasis: {
              focus: 'series',
            },
            data: this.noDealCount,
            itemStyle: {
              barBorderRadius: 6,
              // borderRadius: [0, 7, 7, 0],
              normal:{color:'rgba(252,209,78,0.7)'}
            },
          },
        ],
      };
      myChart.setOption(option, true);
      //监听屏幕尺寸
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#echarts1 {
  width: 100%;
  height: 100%;
  background-color:  rgba($color: #031B31, $alpha: 0.7);
  box-shadow: 0 0 0 0.5px #fff, 0 0 0 1px #ccc;
  transform: translateZ(0);
  border-radius: 10px;
}
</style>
