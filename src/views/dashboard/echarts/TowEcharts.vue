<template>
  <div id="echarts2"></div>
</template>

<script>
import * as echarts from "echarts";
import { getCountByOccur } from '@/api/homepageAlarm.js'

export default {
  props:{
    date:Array,
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
      percent:0,
      option:{}
    };
  },
  mounted() {
    // this.getEchartLeft3(this.echartsData);
    this.init()
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
     var tablebody = document.querySelector('#echarts2')
     if(newV == 'theme-1'){
      this.getEchartLeft3(self.echartsData,'#000');
      tablebody.style.setProperty('--box-shadow','2px 2px 2px 0px rgba(204,204,204,0.89)')
     }
     else{
      this.getEchartLeft3(self.echartsData,'#fff');
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
        // console.log("查看发生率",this.occurCount/this.count,this.occurCount,this.count)
        if(this.$store.state.global.theme == 'theme-1'){
          self.getEchartLeft3(self.echartsData,'#000');
        }else{
          self.getEchartLeft3(self.echartsData,'#fff');
        }
      }).catch(() => {
      })
      
    },
    getEchartLeft3(data,titleColor) {
      let myChart = echarts.init(document.getElementById("echarts2"));
      this.option = {
        color: ["#08F9EB", "#FCD14E", "#eeeeee"],
        textStyle: {
          fontSize: 11,
          color: titleColor,
        },

        title: {
          text:  "| 告警发生率",
          left: 10,
          top: 8,
          textStyle: {
            fontSize: 18,
            color: titleColor,
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
            color: titleColor,
          },
          // data: data,
          // formatter: (name) => {
          //   let label = "";
          //   data.forEach((item) => {
          //     if (item.name === name) {
          //       label = name + "：" + item.value;
          //     }
          //   });
          //   return label;
          // },
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
              show: true,
              position: "center",
              formatter: this.percent +'%' ,
              fontSize: 13,
              color:titleColor
            },
            labelLine: {
              show: true,
            },
            data: [
              {
                value: this.count - this.occurCount,
                name: "巡检次数",
                selected: true, //默认选中第一块
                label: {
                  show: true, //默认显示第一块
                  fontSize: "20",
                  color: titleColor,
                  fontWeight: "bold",
                },
              },
              { value: this.occurCount, name: "告警次数" },
            ],
            right: "30%",
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
#echarts2 {
  width: 100%;
  height: 100%;
  background-color:  var(--tablebody);
  box-shadow: var(--box-shadow); 
  transform: translateZ(0);
}
</style>
