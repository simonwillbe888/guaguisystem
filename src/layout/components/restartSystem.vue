<template>
         <el-dialog title="提示" :visible.sync="restartTips" width="30%" 
      >
        <span>{{tipsText}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button  size="mini"  @click="restartTips = false">取 消</el-button>
          <el-button size="mini"  type="primary" @click="restart(true)">确 定</el-button>
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
        restartTips:false,
        tipsText:''
      };
    },
  
    async mounted() {

    },
    beforeDestroy() {

    },
    methods: {
    restart(flag) {
      this.restartTips = false
      restartSystem(flag).then((res) => {
        console.log('重启接口调用', res)
         if (res.code == '20003') {
          this.restartTips = true
          this.tipsText = res.data
        }
      })
    },
    },
  };
  </script>
 
  <style lang="scss" scoped>
  ::v-deep .el-dialog__title , ::v-deep .el-dialog__body{
    color: black;
}
</style>
  