<template>
  <el-card class="state-card"
           shadow="always">
    <div class="clearfix">
      <el-form size="medium">
        <el-form-item :label="$t('map_config.agv_number')"
                      label-width="50%">
          <span style="float:right;"> {{ data.agv_number }}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.agv_types')"
                      label-width="50%">
          <span style="float:right"> {{ data.agv_types}}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.x_coordinate')"
                      label-width="50%">
          <span style="float:right"> {{ data.x_coordinate}}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.y_coordinate')"
                      label-width="50%">
          <span style="float:right"> {{ data.y_coordinate}}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.plan_start_point')"
                      label-width="50%">
          <span style="float:right"> {{ data.plan_start_point}}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.plan_end_point')"
                      label-width="50%">
          <span style="float:right"> {{ data.plan_end_point}}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.agv_behavior_code')"
                      label-width="50%">
          <span style="float:right"> {{ data.agv_behavior_code}}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.regulate_type')"
                      label-width="50%">
          <span style="float:right"> {{ data.regulate_type}}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.regulate_param')"
                      label-width="50%">
          <span style="float:right"> {{ data.regulate_param}}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.agv_control_mode')"
                      label-width="50%">
          <span style="float:right"> {{ data.agv_control_mode}}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.agv_obstacle')"
                      label-width="50%">
          <span style="float:right"> {{ data.agv_obstacle}}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.agv_emergency_stop')"
                      label-width="50%">
          <span style="float:right"> {{ data.agv_emergency_stop}}</span>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      checked: false,
      taskType: ''
    }
  },
  computed: {
    status: function () {
      let taskStatus = null
      switch (this.data.status) {
        case 0:
          taskStatus = this.$t('monitordata.task_free')
          this.taskType = 'info'
          break;
        case 1:
          taskStatus = this.$t('monitordata.task_dispatching')
          this.taskType = 'success'
          break;
        case 2:
          taskStatus = this.$t('monitordata.task_operation')
          this.taskType = ''
          break;
        case 3:
          taskStatus = this.$t('monitordata.task_completed')
          this.taskType = 'info'
          break;
        case 4:
          taskStatus = this.$t('monitordata.task_idle')
          this.taskType = 'warning'
          break;
        default:
          taskStatus = this.$t('monitordata.task_error')
          this.taskType = 'danger'
          break;
      }
      return taskStatus
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.state-card {
  margin: 12px 2px;
  height: 380px;
  border-radius: 15px;
  padding: 20px 10px;
  /* background: url(~@/assets/img/card1.png) no-repeat rgba(60, 95, 211, 0.5);
  background-size: 100% 100%; */
  background-color: rgba(9, 78, 107, 0.5);
  color: #fff;
  border: none;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 2px;
}

>>>.el-card__header {
  padding: 8px 8px;
}
>>>.el-card__body {
  padding: 8px;
}

>>>.el-checkbox__label {
  font-size: 12px;
  line-height: 12px;
  padding-left: 5px;
  font-weight: bold;
}

>>>.el-form-item__label {
  line-height: 12px;
  font-size: 12px;
  float: left;
  font-weight: bold;
  font-family: PingFang SC;
  padding-right: 2px;
  text-align: left;
  color: #fff;
  /* color: rgb(48, 29, 15); */
}

>>>.el-form-item {
  margin-bottom: 16px;
}

>>>.el-form-item__content {
  font-size: 12px;
  margin-left: 5px;
  line-height: 12px;
}

>>>.agv_status {
  line-height: 12px;
  height: 12px;
  font-size: 12px;
  padding: 0;
}
</style>