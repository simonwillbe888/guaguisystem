<template>
  <el-card class="card-item"
           :style="cardStyle"
           shadow="always">
    <div class="clearfix"
         slot="header">
      <span style="font-size: 18px;font-weight:bold; float: left;color:#fff">{{ data.index }}#</span>
      <el-checkbox v-model="checked"
                   style="float: right;color:rgb(48, 29, 15);color:#fff"
                   @click.native="sendMsg()">{{ $t('map_config.agv_planned_route') }}</el-checkbox>
    </div>
    <div class="clearfix">
      <el-form size="medium">
        <el-form-item :label="$t('map_config.task_status')"
                      label-width="50%">
          <el-tag class="agv_status"
                  :type="taskType"
                  style="float:right;"> {{ status }}</el-tag>
        </el-form-item>
        <el-form-item :label="$t('map_config.battery_level')"
                      label-width="50%">
          <span style="float:right"> {{ data.battery_level}}</span>
        </el-form-item>
        <el-form-item :label="$t('map_config.agv_blocked_state')"
                      label-width="50%">
        </el-form-item>
        <el-form-item :label="$t('map_config.agv_connection_status')"
                      label-width="50%">
          <span style="float:right"> {{ data.connect_state}}</span>
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
    cardStyle () {
      if (this.data.outSystem) {
        let stle = 'background:gray;'
        return stle
      }
    },
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
  mounted () {
    this.init()
  },
  methods: {
    sendMsg () {
      event.stopPropagation()
      let childObj = {
        index: this.data.index,
        selectState: !this.checked
      }
      this.$emit('routeEvent', { planRoute: childObj })
    },
    init () {
      if (this.data.check_state) {
        this.checked = true
      }
    }
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
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 2px;
}

.card-item {
  margin: 12px;
  height: 140px;
  /* background: url(~@/assets/img/card1.png) no-repeat rgba(166, 94, 240, 0);
  background-size: 100% 100%; */
  border: none;
  background-color: rgba(9, 78, 107, 0.5);
  color: #fff;
}

>>>.el-card {
  transition: 1s;
}
>>>.el-card__header {
  padding: 8px 6px;
}
>>>.el-card__body {
  padding: 8px 6px;
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
  margin-bottom: 12px;
}

>>>.el-form-item__content {
  font-size: 12px;
  margin-left: 5px;
  line-height: 12px;
}

>>>.agv_status {
  line-height: 10px;
  height: 12px;
  font-size: 10px;
  padding: 1px 10px;
  background-color: rgba(255, 253, 255, 0.8);
}
</style>