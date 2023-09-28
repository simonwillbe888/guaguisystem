<template>
  <el-dialog title="重启" :visible.sync="restartTips" width="40%">
    <div style="display: flex; flex: 1; text-align: center; align-items: center; justify-content: center;">
      <svg-icon icon-class="warning" style="width: 4rem; height: 4rem;"></svg-icon>
      <span>正在关闭当前操作任务并进行重启系统，<br> 如需返回并继续当前任务，请单击“取消”</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" style="border: 1px solid #64C8C8;background-color:#64C8C8 ;color:#fff;"
        @click="restart(true)">确 定</el-button>
      <el-button size="mini" style="border: 1px solid #64c8c8; " @click="cancel()">取 消</el-button>
    </span>
  </el-dialog>
</template>
  
<script>
import { mapGetters } from 'vuex';
import { restartSystem } from '../../api/sysCtrl';


export default {
  name: 'restartSystem',
  computed: {
    ...mapGetters(['account', 'webSocketUrl', 'realTimeTasks',
      'planTasks', 'setRealTimeAlarm', 'setlogoutState', 'setcameraOut']),
  },
  data() {
    return {
      restartTips: false,
      delayRestart: null,
    };
  },

  async mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    restart(flag) {
      let that = this
      that.restartTips = false
      restartSystem(flag).then((res) => {
        console.log('重启接口调用', res)
        if (res.code == '20003') {
          that.restartTips = true
          that.delayRestart = setTimeout(() => {
            that.restart(true)
          }, 10000);
        }
      })
    },
    cancel() {
      this.restartTips = false
      clearTimeout(this.delayRestart)
    }
  },
};
</script>
 
<style lang="scss" scoped>
::v-deep .el-dialog__title {
  color: #fff;
  font-size: 1.625rem;
}

::v-deep .el-dialog__header {
  background: var(--dialoghead);
  color: var(--font-color);

}

::v-deep .el-dialog__footer {
  background: var(--tablebody);
  display: flex;
  flex: 1;
  justify-content: center;
}

::v-deep .el-dialog__body {
  font-size: 1.25rem;
  color: var(--font-color);
  background: var(--tablebody);

}
</style>
  