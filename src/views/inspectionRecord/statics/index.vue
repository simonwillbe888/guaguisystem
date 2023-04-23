<template>
  <div class="chart-container">
    <div style="margin:5px 0 20px;">
      <span class="demonstration">{{
        $t('agv_statics.start_time_label')
      }}</span>
      <el-date-picker
        v-model="startVal"
        type="datetime"
        style="margin-right:30px"
      >
      </el-date-picker>
      <span class="demonstration">{{ $t('agv_statics.end_time_label') }}</span>
      <el-date-picker
        v-model="endVal"
        type="datetime"
        style="margin-right:30px"
      >
      </el-date-picker>
      <el-button
        type="primary"
        style="background-color: rgb(9, 245, 181); color: rgb(5, 29, 55)"
        size="mini"
        @click.native="findInfo()"
        >{{ $t('agv_statics.query_label') }}</el-button
      >
    </div>

    <div
      id="task-statics"
      style="width: 500px;height: 300px;float: left;margin-top: 10px;"
    ></div>

    <div
      id="excute-statics"
      style="width: 500px;height: 300px;float: left;margin-top: 10px;"
    ></div>

    <div
      id="abnormal-statics"
      style="width: 500px;height: 300px;float: left;margin-top: 10px;"
    ></div>

    <!-- <div id="alarm-statics"
         style="width: 500px;height: 300px;float: left;margin-top: 10px;"></div> -->
  </div>
</template>

<script>
import echarts from 'echarts';
import {
  getPatrolPlanStatistics,
  getCarrierTaskStatistics,
  getTaskStatistics,
} from '@/api/statics';

export default {
  data() {
    return {
      taskChart: null,
      carChart: null,
      abnormalChart: null,
      alarmChart: null,
      startVal: '',
      endVal: '',
    };
  },
  mounted() {},
  methods: {
    findInfo() {
      if (this.startVal && this.endVal) {
        let startTime = this.$moment(this.startVal).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        let endTime = this.$moment(this.endVal).format('YYYY-MM-DD HH:mm:ss');
        this.initTaskChart(startTime, endTime);
        this.initCarChart(startTime, endTime);
        this.initAbnormalChart(startTime, endTime);
      }
    },
    initTaskChart(startTime, endTime) {
      let self = this;
      this.taskChart = echarts.init(document.getElementById('task-statics'));
      var planTaskOption = {
        title: {
          text: '计划任务统计',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ['任务执行数'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [],
          // data: ["任务一", "任务二", "任务三", "任务四", "任务五", "任务六"]
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '任务执行数',
            type: 'bar',
            data: [],
            // data: [5, 20, 36, 10, 55, 80]
          },
        ],
      };
      getPatrolPlanStatistics(startTime, endTime)
        .then((response) => {
          let item = response.data;
          for (let i = 0, len = item.length; i < len; i++) {
            planTaskOption.xAxis.data.push(item[i].XValue);
            planTaskOption.series[0].data.push(item[i].YValue);
          }
          self.taskChart.setOption(planTaskOption);
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    initCarChart(startTime, endTime) {
      let self = this;
      this.carChart = echarts.init(document.getElementById('excute-statics'));
      var carExcuteOption = {
        title: {
          text: '机器人执行数统计',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['机器人执行数'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [],
          // data: ['1号机器人', '2号机器人', '3号机器人', '4号机器人', '5号机器人', '6号机器人']
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '机器人执行数',
            type: 'line',
            data: [],
            // data: [25, 10, 56, 30, 25, 90]
          },
        ],
      };

      getCarrierTaskStatistics(startTime, endTime)
        .then((response) => {
          let item = response.data;
          for (let i = 0, len = item.length; i < len; i++) {
            carExcuteOption.xAxis.data.push(item[i].XValue);
            carExcuteOption.series[0].data.push(item[i].YValue);
          }
          self.carChart.setOption(carExcuteOption);
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    initAbnormalChart(startTime, endTime) {
      let self = this;
      this.abnormalChart = echarts.init(
        document.getElementById('abnormal-statics')
      );
      var tasksOptions = {
        title: {
          text: '任务执行数统计',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ['正常执行数', '异常执行数'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [],
          // data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '正常执行数',
            type: 'line',
            data: [],
            // data: [35, 10, 69, 32, 45, 95]
          },
          {
            name: '异常执行数',
            type: 'line',
            data: [],
            // data: [15, 5, 39, 22, 31, 21]
          },
        ],
      };

      getTaskStatistics(startTime, endTime)
        .then((response) => {
          let normalData = response.data.NormalData;
          let abNormalData = response.data.AbNormalData;
          for (let i = 0, len = normalData.length; i < len; i++) {
            tasksOptions.xAxis.data.push(normalData[i].XValue);
            tasksOptions.series[0].data.push(normalData[i].YValue);
          }
          for (let j = 0, len = abNormalData.length; j < len; j++) {
            // tasksOptions.xAxis.data.push(abNormalData[j].XValue);
            tasksOptions.series[1].data.push(abNormalData[j].YValue);
          }
          self.abnormalChart.setOption(tasksOptions);
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  padding: 30px;
  >>> .el-input__inner {
    height: 40px;
  }
}
</style>
