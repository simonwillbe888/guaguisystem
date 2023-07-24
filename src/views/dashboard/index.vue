<template>
  <div style="height: 100%;background-color: transparent;">
    <div class="selectDate">
      <div style="margin:.625rem ;flex: 1;display: flex;position: relative;i">
        <div class="block">
          <span>{{ $t('comment_vary.default_time_label') }}</span>
          <el-date-picker v-model="date"   value-format="yyyy-MM-dd"   type="daterange" align="right" unlink-panels range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <!-- <el-input placeholder="请输入日期" @blur="date = day" v-model.number="day" class="day">
          <template slot="suffix">
            天
          </template>
        </el-input> -->
        <!-- <span class="day">告警数据</span> -->
        <div class="search" @click="search()">查询</div>
        <div class="back" @click="$router.back();">
          <img src="../../assets/img/fanhui.png">返回
        </div>
      </div>
    </div>
    <div class="echarts-container">
      <div class="echarts-item">
        <OneEcharts :date="time"></OneEcharts>
      </div>
      <div class="echarts-item">
        <TowEcharts :date="time"></TowEcharts>
      </div>
    </div>
    <div class="echarts-container">
      <div class="echarts-item">
        <ThreeEcharts :date="time"></ThreeEcharts>
      </div>
      <div class="echarts-item">
        <FourEcharts :date="time"></FourEcharts>
      </div>
    </div>
  </div>
</template>
<script>
import OneEcharts from './echarts/OneEcharts.vue';
import TowEcharts from './echarts/TowEcharts.vue';
import ThreeEcharts from './echarts/ThreeEcharts.vue';
import FourEcharts from './echarts/FourEcharts.vue';
import { getCurrentAlarmRecordList } from '../../api/inspectRecord';
import { getAllCarrierDetailInfo } from '../../api/robot';
import { GetMonitorData } from '../../api/robot';
export default {
  components: {
    OneEcharts,
    TowEcharts,
    ThreeEcharts,
    FourEcharts,
  },
  data() {
    return {
      date: ['',''],
      value2:'',
      time:['',''],
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    };
  },
  computed: {

  },
  showTable() {


  },
  watch: {
    value2(newV,oldV){
      console.log(newV,oldV)
    }
  },
  created() { },

  mounted() {

  },
  beforeDestroy() {

  },

  methods: {
   search(){
    console.log('查询日期')
    this.time = this.date;
   }


  },
}
</script>
<style scoped lang="scss">
.selectDate {
  width: 100%;
  display: flex;
  color: #fff;
  text-align: center;

  .search {
    width: 3.125rem;
    height: 1.875rem;
    background-color: #64C8C8;
    border-radius: .625rem;
    margin-left: 1.25rem;
    line-height: 1.875rem;
  }

  .search:active {
    opacity: 0.5;
  }

  .day {
    height: 1.875rem;
    line-height: 1.875rem;
  }
::v-deep .el-date-editor .el-range__icon{
  line-height: 1.3;
}
::v-deep .el-date-editor .el-range__close-icon{
  line-height: 1.3;
}
  .back {
    background-color: #64C8C8;
    border-radius: .625rem;
    position: absolute;
    right: 0;
    width: 3.75rem;
    height: 1.875rem;
    line-height: 1.875rem;
    float: right;
  }

  .back:active {
    opacity: 0.5;
  }

  .el-input {
    width: 3.75rem;
  }
}

.echarts-container {
  display: flex;

  .echarts-item {
    height: 22rem;
    width: 48%;
    margin: auto;
    margin-top: 1rem;
    // background: #000;
  }
}
</style>
