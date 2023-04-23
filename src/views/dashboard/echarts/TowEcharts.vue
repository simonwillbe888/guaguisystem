<template>
  <div id="echarts2"></div>
</template>

<script>
import * as echarts from "echarts";
import { getCountByOccur } from '@/api/homepageAlarm.js'

export default {
  props:{
    date:Number,
    required:true
  },
  data() {
    return {
      count: 0,
      occurCount: 0,
      echartsData: [
        {
          value: 0,
          name: "巡检次数",
        },
        { value: 0, name: "告警次数" },
      ],
      percent:0
    };
  },
  mounted() {
    // this.getEchartLeft3(this.echartsData);
    this.init()
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
      getCountByOccur(param).then((response) => {
        // console.log("查看告警发生率",response)
        if (response ) {
          let data = response.data
          self.count = data.count
          self.occurCount = data.occurCount
          self.echartsData[0].value = data.count
          self.echartsData[1].value = data.occurCount
          if(data.count == 0){
            this.percent =0
          }
          else {
            this.percent =((this.occurCount/this.count)*100).toFixed(1)
          }
          
        
        }
        // console.log("查看发生率",this.occurCount/this.count)
        self.getEchartLeft3(self.echartsData);
      }).catch(() => {
      })
      
    },
    getEchartLeft3(data) {
      let myChart = echarts.init(document.getElementById("echarts2"));
      let option = {
        color: ["#08F9EB", "#FCD14E", "#eeeeee"],
        textStyle: {
          fontSize: 11,
          color: "#bae1f3",
        },

        title: {
          text:  "告警发生率",
          left: 10,
          top: 8,
          textStyle: {
            fontSize: 18,
            color: "#ffffff",
            fontWeight: "normal",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          // orient: "vertical",
          left: "55%",
          bottom: "10%",
          textStyle: {
            color: "#bae1f3",
          },
          // data: data,
          formatter: (name) => {
            let label = "";
            data.forEach((item) => {
              if (item.name === name) {
                label = name + "：" + item.value;
              }
            });
            return label;
          },
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "3%",
          containLabel: true,
        },

        series: [
          {
            name: "访问来源",
            top: 20,
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            hoverAnimation: false, //关闭放大动画
            selectedOffset: 0, //选中块的偏移量
            label: {
              show: false,
              position: "center",
              formatter: this.percent +'%' ,
              fontSize: 13,
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.count - this.occurCount,
                name: "巡检次数",
                selected: true, //默认选中第一块
                label: {
                  show: true, //默认显示第一块
                  fontSize: "20",
                  color: "#fff",
                  fontWeight: "bold",
                },
              },
              { value: this.occurCount, name: "告警次数" },
            ],
            right: "50%",
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
#echarts2 {
  width: 100%;
  height: 100%;
  background-color:  rgba($color: #031B31, $alpha: 0.7);
  box-shadow: 0 0 0 0.5px #fff, 0 0 0 1px #ccc;
  transform: translateZ(0);
  border-radius: 10px;
}
</style>
