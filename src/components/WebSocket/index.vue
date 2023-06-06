<template>
  <el-badge v-if="warnes" :value="warnes" class="item">
    <el-button @click="readyAlarm" size="small"
      ><i class="el-icon-bell"></i
    ></el-button>
  </el-badge>
</template>

<script>
import { readNoticeBack } from '../../api/user';
import { mapGetters } from 'vuex';
export default {
  name: 'WebSocket',
  computed: {
    ...mapGetters(['account', 'webSocketUrl', 'realTimeTasks', 
    'planTasks','setRealTimeAlarm','setlogoutState','setcameraOut']),
  },
  data() {
    return {
      // ws是否启动
      wsIsRun: false,
      // 定义ws对象
      webSocket: null,
      // ws请求链接（类似于ws后台地址）
      ws: '',
      // ws定时器
      wsTimer: null,
      warnes: 0,
    };
  },

  async mounted() {
    this.wsIsRun = true;
    this.wsInit();
  },
  beforeDestroy(){
   this.wsDestroy()
  },
  methods: {
    async readyAlarm() {
      const res = await readNoticeBack({
        count: this.warnes,
      });
      this.warnes = 0;
      //   if (res.code === 20000) {
      this.$router.push('/inspection/realAlarm');
      //   }
    },
    wsInit() {
      const username = this.$store.getters.account
      // 通信URL，godlike为用户名，后续可以修改
      if (!this.webSocketUrl || !username) return;
      this.ws = this.webSocketUrl + username;
      console.log('websocket连接',this.ws)

      if (!this.wsIsRun) {
        return;
      }
      // 销毁ws
      this.wsDestroy();
      // 初始化ws
      // console.log("查看webscoket",this.ws);
      this.webSocket = new WebSocket(this.ws);
      // ws连接建立时触发
      this.webSocket.addEventListener('open', this.wsOpenHanler);
      // ws服务端给客户端推送消息
      this.webSocket.addEventListener('message', this.wsMessageHanler);
      // ws通信发生错误时触发
      this.webSocket.addEventListener('error', this.wsErrorHanler);
      // ws关闭时触发
      this.webSocket.addEventListener('close', this.wsCloseHanler);
      // 检查ws连接状态,readyState值为0表示尚未连接，1表示建立连接，2正在关闭连接，3已经关闭或无法打开
      clearInterval(this.wsTimer);
      this.wsTimer = setInterval(() => {
        if (this.webSocket.readyState === 1) {
          clearInterval(this.wsTimer);
        } else {
          // console.log('ws建立连接失败');
          this.wsInit();
        }
      }, 50000);
    },
    wsOpenHanler(event) {
        // console.log('ws建立连接成功');
    },
    wsMessageHanler(e) {
      // console.log('这是wobsocket消息', JSON.parse(e.data));
      const data = JSON.parse(e.data);
      let n = 1
      let i = 1
      if (data) {
        if (data.code === 1) {
          if (data.data) {        
            this.$store.dispatch('global/setRealTimeAlarm',data.data)
          }
        } else if (data.code === 2) {
          if (data.data) {
            const obj = data.data;
            let arr = this.realTimeTasks || [];
            if (obj.taskStatus === 1) {
              arr.push(obj);
            } else if (obj.taskStatus === 2) {
              arr = arr.map((item) => {
                if (item.taskID === obj.taskID) {
                  item = obj;
                }
                return item;
              });
            } else if (obj.taskStatus === 3) {
              arr = arr.filter((item) => {
                // console.log('cgwwwwwwwwwwwwwwww', item.taskID, obj.taskID);
                return item.taskID !== obj.taskID;
              });
            }
            // console.log('cgw4444444444', arr);
            this.$store.dispatch('global/setRealTimeTasks', arr || []);
          }
        } else if (data.code === 3) {
           
          if (data.data) {
            let planArr = this.planTasks || [];
            planArr.forEach((item) => {
              if (item.PlanID == data.data.planID) {
                item.ExecuteState = data.data.executeStatus;
                item.ResidueCount = data.data.ResidueCount;
              }
            });
            this.$store.dispatch('global/setPlanTasks', planArr);
          }
        }
        //云台登出
        else if(data.code == 4){        
          this.$store.dispatch('global/setcameraOut',data.data)
        }
        // 登出状态
        else if (data.code === 5){
          console.log('用户退出登录',data)  
          if(data.data){
            // this.$store.dispatch('user/remoteLogout')
            this.$store.dispatch('global/setlogoutState',data.data)
          }
        }
        //6 renwu，7计划结束
        else if(data.code == 8){
          console.log('巡检点结束',data.data)
          this.$store.dispatch('global/setLocation',data.data)
        }
        //去往巡检点失败
        else if (data.code == 9){
          console.log('巡检结束',data)
          // this.$store.dispatch('global/setLocationFail')
          this.$notify({
          message: data.data,
          type: 'error',
          title: '提示',
          duration: 0,
         });
        }
        else if(data.code == 10){
          console.log('返回待命点',data.data)
          this.$store.dispatch('global/setLocation',data.data)
          this.$notify({
          message: data.data,
          type: 'success',
          title: '提示',
          duration: 5000,
         });
        }
      }
      //   console.log('收到服务端发送的信息');
      //   console.log(e.data);
      //   // 在这里收到信息，并展示提醒框
      //   this.$message(e.data);
    },
    wsErrorHanler(event) {
      //   console.log(event, '通信发生错误');
      this.wsInit();
    },
    wsCloseHanler(event) {
      //   console.log(event, 'ws关闭');
      this.wsInit();
    },
    wsDestroy() {
      if (this.webSocket !== null) {
        console.log('退出websocket')
        this.webSocket.removeEventListener('open', this.wsOpenHanler);
        this.webSocket.removeEventListener('message', this.wsMessageHanler);
        this.webSocket.removeEventListener('error', this.wsErrorHanler);
        this.webSocket.removeEventListener('close', this.wsCloseHanler);
        this.webSocket.close();
        this.webSocket = null;
        clearInterval(this.wsTimer);
      }
    },
  },
};
</script>

<style scoped></style>
