<template>
  <div class="gamepad">
  </div>
</template>
<script>

export default {
  name: "gamepad",
  props: {
    props_data: {
    },
  },
  data() {
    return {
      //时间间隔
      interval: null,
    };
  },
  created() {
    var _this = this;
    // 监听游戏手柄
    window.addEventListener("gamepadconnected", function(e) {
      var gp = navigator.getGamepads()[e.gamepad.index];
      console.log(gp);
      // 检测到手柄接入，提示 手柄连接，进入手柄控制模式
      _this.startgamepad(); // 启动手柄
    });
    // 监听游戏手柄拔出
    window.addEventListener("gamepaddisconnected", function(e) {
      // 检测到手柄断连，提示 手柄断连，退出手柄控制模式
      clearInterval(_this.interval); // 停止获取手柄数据
    });
  },
  mounted() {
    this.$nextTick(() => {

    });
  },
  methods: {
    // 启动手柄
    startgamepad() {
      var _this = this;
      // 每100ms 获取一次手柄数据，查看是否按下手柄按键
      this.interval = setInterval(function() {
        let gamepad = navigator.getGamepads()[0];
        _this.remoteSensing(gamepad.axes);
        _this.pressKey(gamepad.buttons);
      }, 300);
    },
    // 手柄遥感数据监听方法
    remoteSensing(arr) {
      // console.log(arr);

      // arr[0] -1 ~ 1 摇杆左右摇摆
      // arr[1] -1 ~ 1 摇杆前后摇摆
      // arr[2] -1 ~ 1 滑动杆
      // arr[5] -1 ~ 1 摇杆左右旋转
      // arr[9] -1 ~ 1 4d按键 default(3.2857) up(-1) down(0.14285) left(0.714285) right(-0.4285)

      // 向右--飞
      if(arr[0] > 0.5){
        console.log("joystick -----> right")
        this.$emit("remoteRodControlRight")
      }
      // 向左--飞
      if(arr[0] < -0.5){
        console.log("joystick -----> left")
        this.$emit("remoteRodControlLeft")
      }
      // 向后--飞
      if(arr[1] > 0.5){
        console.log("joystick -----> back")
        this.$emit("remoteRodControlBack")
      }
      // 向前--飞
      if(arr[1] < -0.5){
        console.log("joystick -----> front")
        this.$emit("remoteRodControlFront")
      }
      // 上升--飞
      if(arr[2] > 0.8){
        console.log("slide -----> down")
        this.$emit("remoteRodControlDown")
      }
      // 下降--飞
      if(arr[2] < -0.8){
        console.log("slide -----> up")
        this.$emit("remoteRodControlUp")
      }

      if(arr[5] > 0.5){
        console.log("joystick -----> spin right")
        this.$emit("remoteRodControlSpinRight")
      }

      if(arr[5] < -0.5){
        console.log("joystick -----> spin left")
        this.$emit("remoteRodControlSpinLeft")
      }

      //  黑色小摇杆 
      // 云台向下
      if(arr[9] > 0 && arr[9] < 0.5){
        console.log("4d -----> down")
        this.$emit("down")
      }
      // 云台向左
      if(arr[9] > 0.5 && arr[9] < 1){
        console.log("4d -----> left")
        this.$emit("left")
      }
      // 云台向右
      if(arr[9] < 0 && arr[9] > -0.5){
        console.log("4d -----> right")
        this.$emit("right")
      }
      // 云台向上
      if(arr[9] < -0.5){
        console.log("4d -----> up")
        this.$emit("up")
      }

      // for (let i = 0; i < arr.length; i++){
      //   if(arr[i] > 0.5){
      //     console.log("gamepad joystick  > 0.5 ---->",i);
      //   }
      //   if(arr[i] < -0.5){
      //     console.log("gamepad joystick < -0.5 ---->",i);
      //   }
      // }
    },
    // 手柄按键监听方法
    pressKey(arr) {
      // console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value == 1) {
          console.log(i);
          // 不同按键分别对应。
          switch (i){
            // 拍照
            case 0:
              console.log("gamepad button--1--->",i);
              this.$emit("photo_btn")
              break;
            
            // 录像
            case 1:
              console.log("gamepad button--2--->",i);
              this.$emit("video_btn")
              break;

            // 持续变焦
            case 2:
              console.log("gamepad button--3--->",i);
              // this.$emit("startContinuousZoom",'enlarge');
              console.log(this.$emit("moveBlock"), '66666===>>>>');
              break;

            // 持续变焦
            case 3:
              console.log("gamepad button--4--->",i);
              this.$emit("startContinuousZoom",'narrow');
              break;

            // 回中
            case 4:
              console.log("gamepad button--5--->",i);
              this.$emit("clickCaretComeCenter");
              break;

            // 变焦模式
            case 5:
              console.log("gamepad button--6--->",i);
              // this.$emit("stopContinuousZoom");
              this.$emit("switchZoomMode");
              break;

            // 开启同步
            case 6:
              console.log("gamepad button--7--->",i);
              // this.$emit("checkPhotoMode",'ZOOM');
              this.$emit("mavice2StartSynchronization",'true');
              break;

            // 关闭同步
            case 7:
              console.log("gamepad button--8--->",i);
              // this.$emit("taskTask");
              this.$emit("mavice2StartSynchronization",'true');
              break;

            // 广角
            case 8:
              console.log("gamepad button--9--->",i);
              this.$emit("checkPhotoMode",'WIDE');
              break;

            // 红外
            case 9:
              console.log("gamepad button--10--->",i);
              this.$emit("checkPhotoMode",'INFRARED_THERMAL') 
              break;

            // 返航
            case 10:
              console.log("gamepad button--11--->",i);
              this.$emit("flightHome");
              break;

            // 精准降落
            case 11:
              console.log("gamepad button--12--->",i);
              this.$emit("taskPrecisionLand");
              break;
            
            // 其他情况
            default:
              console.log("gamepad button default----->",i)
          }
        }
      }
    },
  },

};
</script>
<style scoped lang="scss">
.gamepad {
  position: fixed;
  width: 1%;
  height: 1%;
}

</style>
