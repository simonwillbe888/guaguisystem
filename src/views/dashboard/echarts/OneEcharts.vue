<template>
  <div id="echarts1"></div>
</template>

<script>
import * as echarts from 'echarts';
import { getCountByLevelAndStatus } from '@/api/homepageAlarm.js';
import { type } from 'os';
export default {
  props: {
    date: Number,
    required: true
  },
  data() {
    return {
      levelName: [],
      alarmLevel: [],
      // 总数
      count: [],
      dealCount: [],
      count: [],
      alarmLevelDesc: [],
      // dealCount: 0,
      // count: 0,
      option: {}
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    changTheme() {
      return this.$store.state.global.theme
    }
  },
  watch: {
    date(newValue, old) {
      if (newValue !== '') {
        this.init()
      }
    },
    changTheme(newV, oldV) {
      var tablebody = document.querySelector('#echarts1')
      if (newV == 'theme-1') {
        this.getEchartLeft3('#000')
        tablebody.style.setProperty('--box-shadow', '2px 2px 2px 0px rgba(204,204,204,0.89)')
      }
      else {
        console.log('bbb')
        this.getEchartLeft3('#fff')
        tablebody.style.setProperty('--box-shadow', 'none');
      }
    }
  },
  methods: {
    init() {
      let self = this;
      let param = {
        endTime: this.date[1],
        startTime: this.date[0],
      };
      getCountByLevelAndStatus(param)
        .then((response) => {
          if (response && response.data.length) {
            self.dealCount = [];
            self.count = [];
            self.alarmLevelDesc = [];
            response.data.forEach((item) => {
              self.alarmLevelDesc.unshift(item.alarmLevelDesc);
              self.dealCount.unshift(item.dealCount);
              self.count.unshift(item.count);
            });
            if (this.$store.state.global.theme == 'theme-1') {
              this.getEchartLeft3('#000');
            }
            else {
              this.getEchartLeft3('#fff');
            }
          }
        })
        .catch(() => { });
    },
    getEchartLeft3(titleColor) {
      // debugger
      let self = this;
      let myChart = echarts.init(document.getElementById('echarts1'));
      this.option = {
        color: ['#08F9EB', '#f59b22',],
        textStyle: {
          fontSize: 11,
          color: '#bae1f3',
        },
        title: {
          text: '| 告警信息',
          left: 10,
          top: 10,
          textStyle: {
            fontSize: 18,
            color: titleColor,
            fontWeight: 'normal',
          },
        },

        xAxis: {
          data: this.alarmLevelDesc,

          name: "",
          nameLocation: "start",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
            show: false,
          },
          axisLabel:{
              color:'#64C8C8'
            }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          top: '8%',
          data: ['已处理', '告警数据'],
          textStyle: {
            fontSize: 12, //字体大小
            color: '#64C8C8', //字体颜色
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
          position: 'left',
          splitLine: {
              show: true,
              lineStyle:{
                type:'dashed'
              }
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
          axisLabel:{
              color:'#64C8C8'
            }
        },
        series: [
          {
            name: '已处理',
            type: 'bar',
            barWidth: 30,
            seriesLayoutBy: 'row',

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
              normal: { color: '#64C8C8' }
            },
            emphasis: {
              focus: 'series',
            },
            data: this.dealCount,
            barGap: '-5%',
          },
          {
            name: '告警数据',
            type: 'bar',
            stack: 'total',
            barWidth: 30,
            seriesLayoutBy: 'row',
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
            data: this.count,
            itemStyle: {
              // borderRadius: [0, 7, 7, 0],
              normal: { color: '#f59b22' }

            },
          },
        ],
      };
      myChart.setOption(this.option, true);
      //监听屏幕尺寸
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
:root {
  --box-shadow: none;
  // box-shadow: 2px 2px 2px 0px rgba(204,204,204,0.89);
}

#echarts1 {
  width: 100%;
  height: 100%;
  background-color: var(--tablebody);
  box-shadow: var(--box-shadow);
  transform: translateZ(0);
}
</style>
