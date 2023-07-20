<template>
  <div id="alarmAnalysisEcharts">

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    alarmData:{
      type: Object,
      default: {
        xAxisData: [],
        legendData: [],
        seriesData: []
      }
    }
  },
  watch:{
    alarmData: {
      deep: true,
      handler(val) {
        this.updateOption();
      }
    },
  },
  data() {
    return {
      // echartsSumnum: 0,//数据总数
      option: {
        grid:{
          containLabel: true,
        },
        // 设置标题
        title: {
          text: '',//主标题 (主标题里面来动态显示当前数据总数)
          // subtext: '总数',//副标题
          // x: 'center',//标题x轴居中（也可以是: left || center || right || 百分比：xx% || xx(默认单位px)  ）
          // y: 'center',//标题y轴居中（也可以是: top || center || bottom || 百分比：xx% || xx(默认单位px)  ）
          // itemGap: -10,//主标题和副标题之间的距离(默认为 0)
          textStyle: {//设置主标题样式
            fontSize: 40,
            color: '#666',
            // backroung: 'blue'
          },
          subtextStyle: {//设置副标题样式
            fontSize: 20,
            color: "#666"
          }
        },
        xAxis: {
          data: [],
          nameTextStyle: {
            color: '#fff',
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },

        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },},
        // 鼠标滑过显示悬浮框
        tooltip: {
          show:true,//鼠标滑过是否显示悬浮框 （默认为true开启 false为关闭）
          //设置悬浮框内展示的内容
          // a:series.name  b:series.data.name  c:series.data.value  d:当前数据所占数据的百分比
          // formatter: '{a}</br>{b}: {c} </br>所占比例: {d}%',
        },
        // 设置图例
        legend: {
          data: [],
          orient: 'horizontal',//图例的排列方式 （默认 horizontal：水平方向排列 vertical：垂直方向排列）
          x: 'center',//图标在前文字在后，图例靠右居中显示 （也可以是: left || center || right || 百分比：xx% || xx(默认单位px)  ）
          y: '75%',//图例y轴居中（也可以是: top || center || bottom || 百分比：xx% || xx(默认单位px)  ）
          itemStyle: {},//设置图例前面的图标样式
          textStyle: {//设置图例文字样式
            fontSize: 12,
            color: '#ffffff'
          },
          itemWidth: 25,
          itemHeight: 20,
        },
        // 设置主体
        series: []
      }
    }
  },
  mounted() {
    // 初始化数据的总数
    // this.option.series[0].data.forEach(v => {
    //   this.echartsSumnum += v.value
    // })
    // this.option.title.text = this.echartsSumnum
    this.chart = echarts.init(document.getElementById('alarmAnalysisEcharts'))
    this.chart.setOption(this.option)
    this.chart.resize()
    window.addEventListener('resize', this.updateOption);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateOption);
  },
  methods: {
    updateOption(val){
      if(this.alarmData.seriesData.length > 0){
        this.option.series = this.alarmData.seriesData
        this.option.xAxis.data = this.alarmData.xAxisData
        this.option.legend.data = this.alarmData.legendData
        this.chart.clear()
        this.chart.setOption(this.option)
        this.chart.resize()
      }
    }
  }
}
</script>
<style scoped >
#alarmAnalysisEcharts {
  width: auto;
  height: 15rem;
  //height: 100%;
  top: -2.5rem;
}
</style>
