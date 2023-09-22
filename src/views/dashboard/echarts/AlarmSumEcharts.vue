<template>
  <div id="alarmSumEcharts">

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    alarmData:{
      type: Array,
      default: []
    },
    chartColor:{
      type: String,
      default: '#FFFFFF'
    },
  },
  watch:{
    alarmData: {
      deep: true,
      handler(val) {
        this.updateOption();
      }
    },
    chartColor: {
      deep: true,
      handler(val) {
        this.updateOption();
      }
    },
  },
  data() {
    return {
      // echartsSumnum: 0,//数据总数
      chart: null,
      option: {
        grid:{
          containLabel: true,
        },
        // 设置标题
        title: {
          text: '',//主标题 (主标题里面来动态显示当前数据总数)
          // subtext: '总数',//副标题
          x: 'center',//标题x轴居中（也可以是: left || center || right || 百分比：xx% || xx(默认单位px)  ）
          y: 'center',//标题y轴居中（也可以是: top || center || bottom || 百分比：xx% || xx(默认单位px)  ）
          itemGap: -10,//主标题和副标题之间的距离(默认为 0)
          textStyle: {//设置主标题样式
            fontSize: 40,
            color: '#666',
            background: 'blue'
          },
          subtextStyle: {//设置副标题样式
            fontSize: 20,
            color: "#666"
          }
        },
        label: {
          //文本样式
          textStyle: {
            fontSize: 12, // 改变标示文字的大小
            color: this.chartColor,
          },
          formatter: "{c}", //提示文本内容 d代表百分比，b代表name文本
          position: "outside",//控制文字显示的位置，center居中显示
          show: true,//由于要单独显示（已使用）的数值，所以得先隐藏label
        },
        // 鼠标滑过显示悬浮框
        tooltip: {
          show:true,//鼠标滑过是否显示悬浮框 （默认为true开启 false为关闭）
          //设置悬浮框内展示的内容
          // a:series.name  b:series.data.name  c:series.data.value  d:当前数据所占数据的百分比
          // formatter: '{a}</br>{b}: {c} </br>所占比例: {d}%',
          formatter: '{b}: {c} </br>所占比例: {d}%',
        },
        // 设置图例
        legend: {
          orient: 'vertical',//图例的排列方式 （默认 horizontal：水平方向排列 vertical：垂直方向排列）
          left: '20',//图标在前文字在后，图例靠右居中显示 （也可以是: left || center || right || 百分比：xx% || xx(默认单位px)  ）
          y: 'center',//图例y轴居中（也可以是: top || center || bottom || 百分比：xx% || xx(默认单位px)  ）
          itemStyle: {},//设置图例前面的图标样式
          itemWrap: false,
          textStyle: {//设置图例文字样式
            fontSize: 14,
            color: this.chartColor
          },
        },
        // 设置主体
        series: [
          {
            avoidLabelOverlap:false,
            name: '', //echarts图名字
            type: 'pie',//echarts 类型
            minAngle: 5,//echarts数据value为0时默认为value为5
            radius: ['30%', '45%'],//设置环形图 （ radius: ['设置内圆大小', '设置外圆大小']  不折设置默认为实心圆饼图）
            center: ['75%', '50%'],//设置饼图位置 （center:['x轴位置','y轴位置']不设置默认在中间）
            label:{
              show: true,
              color: this.chartColor,
              // position: 'center'

            },
            data: this.alarmData,
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold',
              }
            }
          },
        ]
      }
    }
  },
  mounted() {
    // 初始化数据的总数
    // this.option.series[0].data.forEach(v => {
    //   this.echartsSumnum += v.value
    // })
    // this.option.title.text = this.echartsSumnum
    this.chart = echarts.init(document.getElementById('alarmSumEcharts'))
    this.chart.setOption(this.option)
    this.chart.resize()
    window.addEventListener('resize', this.updateOption);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateOption);
  },
  methods: {
    updateOption(val){
      if(this.alarmData.length >0){
        this.option.series[0].data = this.alarmData
        this.option.label.textStyle.color = this.chartColor
        this.option.legend.textStyle.color = this.chartColor
        this.option.series[0].label.color = this.chartColor
        this.chart.setOption(this.option)
        this.chart.resize()
      }
      // console.log("this.option.series[0].data",this.option.series[0].data)
    }
  }
}
</script>
<style scoped >
#alarmSumEcharts {
  width: auto;
  height: 100%;
  //top: 0;
}
</style>
