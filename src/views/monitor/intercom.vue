<template>
  <div>

    <iframe id="startTalk" hidden="hidden" src="/demo/cn/demo.html" frameborder="0" style="width: 0;height: 0;" ></iframe>
    <i class="el-icon-microphone" style="border: solid white;border-radius: 20px;color:white;font-size: 2rem" v-if="!speak" @click="begin()"></i>
    <i class="el-icon-turn-off-microphone" style="border: solid #15B3B4;border-radius: 20px;color:#15B3B4;font-size: 2rem" v-if="speak" @click="end()"></i>

  </div>
</template>
<script>
import { startTalk, stopTalk } from '../../api/dashboard';
import $ from "jquery";
import { resolve } from 'path';
import { reject } from 'q';
import { callbackify } from 'util';
import { mapGetters, mapState } from 'vuex';
var ws = null; //实现WebSocket

export default {
  name: 'intercom',
  props: {
    carID: Number,
    required: true,
    intercomControl: false,
    hkPlugin:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      record: null,
      timeInte: null,
      speak: false,
    };
  },
  mounted() {
    this.init()
    this.beforeunloadHandler()
    window.addEventListener('notification', this.functionForJs);
    // window.functionForJs = this.functionForJs
  },

  computed:{
    ...mapGetters(['clostSpeak']),
    standby(){
      return this.clostSpeak
    }
  },
  watch: {
    carID(newV, oldV) {
      // console.log('id改变了',newV)
      return newV
    },
    standby(){
      this.end()
    },
    intercomControl(newValue, oldValue){
      if(newValue){
        this.begin()
      }else {
        this.end()
      }
    }
  },
  methods: {
    init() {
      let iframe = document.getElementById('startTalk')
      iframe.onload = () => {
        setTimeout(() => {
          iframe.contentWindow.clickLogin(this.hkPlugin)
          console.log('看看hkplugin',this.hkPlugin)
          iframe.contentWindow.getChannelInfo()
          iframe.contentWindow.getDevicePort()
        }, 1000)
      }
    },

    /*
     * 开始对讲
     */
    begin() {

      console.log('查看id', typeof this.carID, this.carID)
       this.openSpeak()

     },
    openSpeak(){
      return new Promise((resolve,reject)=>{
        var iframe = document.getElementById('startTalk')
          iframe.contentWindow.clickGetAudioInfo()
          setTimeout(() => {
            iframe.contentWindow.clickStartVoiceTalk()
          }, 1000)
          startTalk(this.carID).then((res) => {
          console.log('对讲接口调用',res)
        if (res.code == 20000) {
          this.speak = true
        }
        else{
          this.stopSpeak()
        }
      })
          resolve(20000)
      })

    },
    functionForJs(){
       console.log('收到通知+','aaa')
        this.speak = false

    },
    /*
     * 关闭对讲
     */
    end() {
      console.log('关闭按下了')
      if(this.speak){
        this.stopSpeak().then((res)=>{
         stopTalk(this.carID).then((res)=>{
           if(res.code == 20000){
            this.speak = false
           }
         })
       })
      }

    },
    stopSpeak(){
        return new Promise((resolve,reject)=>{
        var iframe = document.getElementById('startTalk')
      iframe.contentWindow.clickStopVoiceTalk()
      console.log('关闭对讲')
      resolve()

      })
    },
    beforeunloadHandler(e) {
      console.log('监听intercom关闭')
      window.addEventListener("beforeunload", () => {
         if(this.speak){
          this.end()
         }
      });
      console.log('埋点监听')
    },
  },
};
</script>
<style scoped>
::v-deep .el-button--mini {
  width: 6.2vw;
  height: 3.5vh;
  text-align: center;
  font-size: 0.5vh;
  /* margin: auto; */
}

.el-icon-phone-outline {}
</style>
