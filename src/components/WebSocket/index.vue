<template>
  <el-badge v-if="warnes" :value="warnes" class="item">
    <el-button @click="readyAlarm" size="small"><i class="el-icon-bell"></i></el-button>
  </el-badge>
</template>

<script>
import { readNoticeBack } from '../../api/user';
import { mapGetters } from 'vuex';
import { systemStatusDetection } from '../../api/robot'
import { MessageBox, Message, Notification } from 'element-ui';

export default {
  name: 'WebSocket',
  computed: {
    ...mapGetters(['account', 'webSocketUrl', 'realTimeTasks',
      'planTasks', 'setRealTimeAlarm', 'setlogoutState', 'setcameraOut']),
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
      disConnect: 0,
      disConnectTimer: null
    };
  },

  async mounted() {
    this.wsIsRun = true;
    this.wsInit();
    this.initTimer()
    // this.checkIdleTime()
  },
  beforeDestroy() {
    this.wsDestroy()
    clearInterval(this.disConnectTimer)
  },
  methods: {

    //浏览器挂起检测退出
    // checkIdleTime() {
    //   const IDLE_TIMEOUT = 10800000; // 空闲超时时间，单位为毫秒（这里设置为3小时）

    //   let idleTimer;
    //  let that = this
    //   function resetTimer() {
    //     clearTimeout(idleTimer);
    //     idleTimer = setTimeout(() => {
    //       // 在这里执行返回登录界面的操作
    //       that.$store.dispatch('user/resetToken').then(() => {
    //             location.reload();
    //           });
    //           that.$notify({
    //         message: '断开连接，请重新登录',
    //         type: 'error',
    //         title: '提示',
    //         duration: 10000,
    //       });
    //     }, IDLE_TIMEOUT);
    //   }

    //   function clearTimer() {
    //     clearTimeout(idleTimer);
    //   }

    //   // 监听用户交互事件
    //   document.addEventListener('mousemove', resetTimer);
    //   document.addEventListener('keypress', resetTimer);
    //   document.addEventListener('scroll', resetTimer);
    //   document.addEventListener('touchstart', resetTimer);

    //   // 初始启动计时器
    //   resetTimer();

    //   // 在路由导航守卫中清除计时器
    //   // router.beforeEach((to, from, next) => {
    //   //   clearTimer();
    //   //   next();
    //   // });
    // },
    // async readyAlarm() {
    //   const res = await readNoticeBack({
    //     count: this.warnes,
    //   });
    //   this.warnes = 0;
    //   //   if (res.code === 20000) {
    //   this.$router.push('/inspection/realAlarm');
    //   //   }
    // },
    initTimer() {
      this.disConnectTimer = setInterval(() => {
        systemStatusDetection().then((res) => {
          // console.log('查看', res)
          if(res.code == 20005){
            this.$store.dispatch('user/resetToken').then(() => {
                location.reload();
              });
          }
          if (!res.hasOwnProperty('data')) {
            ++this.disConnect
            //断开五秒后重连websocket
            if (this.disConnect >= 5) {
              this.wsInit()
            }
            //断开一小时秒返回登录页
            if(this.disConnect >=3660){
              // Notification({
              //   title: '提示',
              //   message: "服务器连接失败",
              //   type: 'error',
              //   duration: 5000,
              // });
              this.$store.dispatch('user/resetToken').then(() => {
                location.reload();
              });
            }
          }

        })
      }, 1000);

    },
    wsInit() {


      const username = this.$store.getters.account
      // 通信URL，godlike为用户名，后续可以修改
      if (!this.webSocketUrl || !username) return;
      this.ws = this.webSocketUrl + username;
      if (!this.wsIsRun) {
        return;
      }
      // 销毁ws
      this.wsDestroy();
      // 初始化ws
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
          console.log('ws建立连接失败')
          this.wsInit();
        }
      }, 5000);
    },
    wsOpenHanler(event) {
      console.log('ws建立连接成功');
    },
    wsMessageHanler(e) {
      const data = JSON.parse(e.data);
      let n = 1
      let i = 1
      if (data) {
        if (data.code === 1) {
          if (data.data) {
            // console.log('产生告警')
            this.$store.dispatch('global/setRealTimeAlarm', data.data)
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
        else if (data.code == 4) {
          // console.log('云台发来登出消息', data.data)
          this.$store.dispatch('global/setcameraOut', data.data)
        }
        // 登出状态
        else if (data.code === 5) {
          // console.log('用户退出登录', data)
          if (data.data) {
            // this.$store.dispatch('user/remoteLogout')
            this.$store.dispatch('global/setlogoutState', data.data)
          }
        }
        //6 renwu，7计划结束
        else if (data.code == 8) {
          // console.log('巡检点结束', data.data)
          this.$store.dispatch('global/setLocation', data.data)
        }
        //去往巡检点失败
        else if (data.code == 9) {
          // console.log('巡检结束', data)
          // this.$store.dispatch('global/setLocationFail')
          this.$notify({
            message: data.data,
            type: 'error',
            title: '提示',
            duration: 0,
          });
        }
        else if (data.code == 10) {
          // console.log('返回待命点', data.data)
          this.$store.dispatch('global/setLocation', data.data)
          this.$notify({
            message: data.data,
            type: 'success',
            title: '提示',
            duration: 5000,
          });
        }
        else if (data.code == 11) {
          this.$store.dispatch('global/setCloseAll', data.data)
          this.$notify({
            message: '回到初始状态',
            type: 'success',
            title: '提示',
            duration: 0,
          });
        }
        else if (data.code == 12) {
          this.$store.dispatch('global/setcloseBroadcast', data.data)
          // this.$notify({
          //   message: '关闭语音播放',
          //   type: 'success',
          //   title: '提示',
          //   duration: 0,
          // });
        }
        else if (data.code == 13) {
          this.$store.dispatch('global/setCloseSpeak', data.data)
          this.$notify({
            message: '关闭对讲',
            type: 'success',
            title: '提示',
            duration: 0,
          });
        }
        else if (data.code == 14) {
          this.$store.dispatch('global/setWarnLight', data.data)
          this.$notify({
            message: '关闭警示灯',
            type: 'success',
            title: '提示',
            duration: 0,
          });
        }
        else if (data.code == 15){
          this.$store.dispatch('global/setDeaiwithAlarm', data.data)
        }
        else if(data.code == 16){
          //重启服务器完毕
          this.$notify({
            message: '系统已重启',
            type: 'success',
            title: '提示',
            duration: 6000,
          });
          location.reload();
        }
        else if(data.code == 17){
          console.log('发来消息提示xxx在重启',data.data)
          this.$notify({
            message: data.data,
            type: 'success',
            title: '提示',
            duration: 0,
          });
        }
      }
      //   console.log('收到服务端发送的信息');
      //   console.log(e.data);
      //   // 在这里收到信息，并展示提醒框
      //   this.$message(e.data);
    },
    wsErrorHanler(event) {
      console.log(event, '通信发生错误');
      this.wsInit();
    },
    wsCloseHanler(event) {
      console.log(event, 'ws关闭');
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
