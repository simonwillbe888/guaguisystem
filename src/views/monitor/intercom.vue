<template>
  <div style="">
    <!-- <el-button class="el-icon-phone-outline" v-if="!speak" @click="begin" size="mini" type="primary">开始对讲</el-button>
    <el-button class="el-icon-phone-outline" v-if="speak" @click="end"  size="mini" type="primary">关闭对讲</el-button> 
  -->
    <i class="el-icon-microphone" v-if="!speak" @click="begin"></i>
    <div @click="end">
      <svg-icon icon-class="closeMic" v-if="speak"></svg-icon>
    </div>
    <iframe id="startTalk" src="/demo/cn/demo.html" frameborder="0" style="display: none;"></iframe>

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
    required: true
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
    // window.functionForJs = this.functionForJs
  },
  beforeDestroy() {
    this.end()
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
    }
  },
  methods: {
    init() {
      var iframe = document.getElementById('startTalk')
      iframe.onload = () => {
        setTimeout(() => {
          iframe.contentWindow.clickLogin()

          iframe.contentWindow.getChannelInfo()
          iframe.contentWindow.getDevicePort()
        }, 1000)
      }
    },

    /*
     * 开始对讲
     */
    begin() {
      
      // console.log('查看id', typeof this.carID, this.carID)

       this.openSpeak().then((res)=>{
 
       })

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
      
        this.speak = false

    },
    /*
     * 关闭对讲
     */
    end() {
      if(this.speak){
        this.stopSpeak().then((res)=>{
         stopTalk(this.carID).then((res)=>{
           console.log('关闭了',res.code)
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
      resolve()
      })
    },
    beforeunloadHandler(e) {
      window.addEventListener("beforeunload", () => {
         if(this.speak){
          this.end()
         }
      });
      // console.log('埋点监听')
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
