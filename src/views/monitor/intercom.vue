<template>
  <div>
    <!-- <iframe id="startTalk" hidden="hidden" src="/demo/cn/demo.html" frameborder="0" style="width: 0;height: 0;" ></iframe> -->
    <i class="el-icon-microphone" style="border-radius: 20px;color:rgb(100,200,200);font-size: 2rem" v-if="!speak" @click="begin()"></i>
    <i class="el-icon-turn-off-microphone" style="border-radius: 20px;color:rgb(100,200,200);font-size: 2rem" v-if="speak" @click="end()"></i>

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
var record = null
      //录音对象
      var Recorder = function(stream) {
            var sampleBits = 16; //输出采样数位 8, 16
            var sampleRate = 16000; //输出采样率
            var context = new AudioContext();
            var audioInput = context.createMediaStreamSource(stream);
            var recorder = context.createScriptProcessor(4096, 1, 1);
            var audioData = {
                size: 0, //录音文件长度
                buffer: [], //录音缓存
                inputSampleRate: 48000, //输入采样率,网页默认的采样率即为48000
                inputSampleBits: 16, //输入采样数位 8, 16
                outputSampleRate: sampleRate, //输出采样数位
                oututSampleBits: sampleBits, //输出采样率
                clear: function() {
                    this.buffer = [];
                    this.size = 0;
                },
                input: function(data) {
                    this.buffer.push(new Float32Array(data));
                    this.size += data.length;		
                },
                compress: function() { //合并压缩
                    //合并
                    var data = new Float32Array(this.size);
                    var offset = 0;
                    for (var i = 0; i < this.buffer.length; i++) {
                        data.set(this.buffer[i], offset);
                        offset += this.buffer[i].length;
                    }
                    //压缩
                    var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
                    var length = data.length / compression;
                    var result = new Float32Array(length);
                    var index = 0,
                    j = 0;
                    while (index < length) {
                        result[index] = data[j];
                        j += compression;
                        index++;
                    }
                    return result;
                },
                encodePCM: function() { //这里不对采集到的数据进行其他格式处理，如有需要均交给服务器端处理。
                    var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
                    var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
                    var bytes = this.compress();
                    var dataLength = bytes.length * (sampleBits / 8);	
                    var buffer = new ArrayBuffer(dataLength);
                    var data = new DataView(buffer);
                    var offset = 0;
                    for (var i = 0; i < bytes.length; i++, offset += 2) {
                    var s = Math.max(-1, Math.min(1, bytes[i]));
                        data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                    }
					
                    return new Blob([data]);
                }
				
            };
 
            var sendData = function() { //对以获取的数据进行处理(分包)
                var reader = new FileReader();
                reader.onload = e => {
                    var outbuffer = e.target.result;
					//ws.send(outbuffer);
					//console.log(outbuffer);
                    var arr = new Int8Array(outbuffer);
                    if (arr.length > 0) {
						//var tmparr = new Int8Array(arr.length);
						//ws.send(tmparr);
                        var tmparr = new Int8Array(1024);
						// console.log(tmparr);
                        var j = 0;
                        for (var i = 0; i < arr.byteLength; i++) {
                            tmparr[j++] = arr[i];
                            if (((i + 1) % 1024) == 0) {
                                ws.send(tmparr);
                                if (arr.byteLength - i - 1 >= 1024) {
                                    tmparr = new Int8Array(1024);
                                } else {
                                    tmparr = new Int8Array(arr.byteLength - i - 1);
                                }
                                j = 0;
                           }
                           if ((i + 1 == arr.byteLength) && ((i + 1) % 1024) != 0) {
                                ws.send(tmparr);
                            }
                        }
                    }
                };
                reader.readAsArrayBuffer(audioData.encodePCM());
                audioData.clear();//每次发送完成则清理掉旧数据
            };
			
            this.start = function() {
                audioInput.connect(recorder);
                recorder.connect(context.destination);
            }
 
            this.stop = function() {
                recorder.disconnect();
            }
 
            this.getBlob = function() {
                return audioData.encodePCM();
            }
 
            this.clear = function() {
                audioData.clear();
            }
			
            recorder.onaudioprocess = function(e) {
                var inputBuffer = e.inputBuffer.getChannelData(0);
                audioData.input(inputBuffer);
                sendData();
            }
        }
        
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
      timeInte: null,
      speak: false,
    };
  },
  mounted() {
    this.beforeunloadHandler()
    window.addEventListener('notification', this.functionForJs);
    // window.functionForJs = this.functionForJs
  },

  computed:{
    ...mapGetters(['clostSpeak','carrierSelectedIp','name']),
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
    init(rec) {
      // let iframe = document.getElementById('startTalk')
      // iframe.onload = () => {
      //   setTimeout(() => {
      //     iframe.contentWindow.clickLogin(this.hkPlugin)
      //     iframe.contentWindow.getChannelInfo()
      //     iframe.contentWindow.getDevicePort()
      //   }, 1000)
      // }
      record = rec
    },
    useWebSocket() {
      let that = this
      let url = "ws://" + that.carrierSelectedIp + ':9001/webSocket/public' 
            ws = new WebSocket(url);
            ws.binaryType = 'arraybuffer'; //传输的是 ArrayBuffer 类型的数据
            ws.onopen = function(event) {
				 that.timeInte=setInterval(()=>{
					//if (ws.readyState == 1) { //ws进入连接状态，则每隔180毫秒发送一包数据
                    record.start();
					
					//}
				},1000);  
				
				//clearInterval(timeInte);
            };
			
          	ws.onmessage = function(e) {
                console.log("收到声音")
        receive(e.data);
    };
			
            ws.onerror = function(err) {
                that.$notify({
        message: '对讲网络连接失败',
        type: 'error',
        title: '提示',
        duration: 5000,
      });
                stopTalk(that.carID).then((res)=>{
           if(res.code == 20000){
            that.speak = false
           }
         })
            }
        },
    RecorderA(stream) {
            var sampleBits = 16; //输出采样数位 8, 16
            var sampleRate = 16000; //输出采样率
            var context = new AudioContext();
            var audioInput = context.createMediaStreamSource(stream);
            var recorder = context.createScriptProcessor(4096, 1, 1);
            var audioData = {
                size: 0, //录音文件长度
                buffer: [], //录音缓存
                inputSampleRate: 48000, //输入采样率,网页默认的采样率即为48000
                inputSampleBits: 16, //输入采样数位 8, 16
                outputSampleRate: sampleRate, //输出采样数位
                oututSampleBits: sampleBits, //输出采样率
                clear: function() {
                    this.buffer = [];
                    this.size = 0;
                },
                input: function(data) {
                    this.buffer.push(new Float32Array(data));
                    this.size += data.length;		
                },
                compress: function() { //合并压缩
                    //合并
                    var data = new Float32Array(this.size);
                    var offset = 0;
                    for (var i = 0; i < this.buffer.length; i++) {
                        data.set(this.buffer[i], offset);
                        offset += this.buffer[i].length;
                    }
                    //压缩
                    var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
                    var length = data.length / compression;
                    var result = new Float32Array(length);
                    var index = 0,
                    j = 0;
                    while (index < length) {
                        result[index] = data[j];
                        j += compression;
                        index++;
                    }
                    return result;
                },
                encodePCM: function() { //这里不对采集到的数据进行其他格式处理，如有需要均交给服务器端处理。
                    var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
                    var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
                    var bytes = this.compress();
                    var dataLength = bytes.length * (sampleBits / 8);	
                    var buffer = new ArrayBuffer(dataLength);
                    var data = new DataView(buffer);
                    var offset = 0;
                    for (var i = 0; i < bytes.length; i++, offset += 2) {
                    var s = Math.max(-1, Math.min(1, bytes[i]));
                        data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                    }
					
                    return new Blob([data]);
                }
				
            };
 
            var sendData = function() { //对以获取的数据进行处理(分包)
                var reader = new FileReader();
                reader.onload = e => {
                    var outbuffer = e.target.result;
					//ws.send(outbuffer);
					//console.log(outbuffer);
                    var arr = new Int8Array(outbuffer);
                    if (arr.length > 0) {
						//var tmparr = new Int8Array(arr.length);
						//ws.send(tmparr);
                        var tmparr = new Int8Array(1024);
						// console.log(tmparr);
                        var j = 0;
                        for (var i = 0; i < arr.byteLength; i++) {
                            tmparr[j++] = arr[i];
                            if (((i + 1) % 1024) == 0) {
                                ws.send(tmparr);
                                if (arr.byteLength - i - 1 >= 1024) {
                                    tmparr = new Int8Array(1024);
                                } else {
                                    tmparr = new Int8Array(arr.byteLength - i - 1);
                                }
                                j = 0;
                           }
                           if ((i + 1 == arr.byteLength) && ((i + 1) % 1024) != 0) {
                                ws.send(tmparr);
                            }
                        }
                    }
                };
                reader.readAsArrayBuffer(audioData.encodePCM());
                audioData.clear();//每次发送完成则清理掉旧数据
            };
			
            this.start = function() {
                audioInput.connect(recorder);
                recorder.connect(context.destination);
            }
 
            this.stop = function() {
                recorder.disconnect();
            }
 
            this.getBlob = function() {
                return audioData.encodePCM();
            }
 
            this.clear = function() {
                audioData.clear();
            }
			
            recorder.onaudioprocess = function(e) {
                var inputBuffer = e.inputBuffer.getChannelData(0);
                audioData.input(inputBuffer);
                sendData();
            }
       },
       receive(data) {	
        if( typeof e == 'string' && JSON.parse(e).message=='OK'){
          console.log('OK');	
        }else{
            console.log("开始收音播放")		
            var buffer = (new Response(data)).arrayBuffer();	
            buffer.then(function(buf){
            var audioContext = new ( window.AudioContext || window.webkitAudioContext )();
            var fileResult =addWavHeader(buf, '8000', '16', '1');//解析数据转码wav
           audioContext.decodeAudioData(fileResult, function(buffer) {
            _visualize(audioContext,buffer);//播放
          });
           });
        }
     },
   
           
    /*
     * 开始对讲
     */
    begin() {

      console.log('查看id', typeof this.carID, this.carID)
       this.startIntercom()

     },
         /*
     * 关闭对讲
     */
    end() {
      // console.log('关闭按下了')
      this.closeIntercom()
      if(this.speak){
        stopTalk(this.carID).then((res)=>{
           if(res.code == 20000){
            this.speak = false
           }
         })
        this.stopSpeak()

      }

    },
    stopSpeak(){
      this.closeIntercom()
      //   return new Promise((resolve,reject)=>{
      //   var iframe = document.getElementById('startTalk')
      // iframe.contentWindow.clickStopVoiceTalk()
      // console.log('关闭对讲')
      // resolve()

      // })
    },
    startIntercom() {
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;  
         let that = this
            if (!navigator.getUserMedia) {
                alert('浏览器不支持音频输入');
            } else {
                navigator.getUserMedia({
                audio: true
            },
            function(mediaStream) {
                that.init(new Recorder(mediaStream))
                console.log('开始对讲',record,that.init(new Recorder(mediaStream)));
                that.useWebSocket();
                //通知后台
                startTalk(that.carID).then((res) => {
          if (res.code == 20000) {
            that.speak = true
          }
          else{
            that.stopSpeak()
          }
        })
            },
            function(error) {
                console.log(error);
                switch (error.message || error.name) {
                    case 'PERMISSION_DENIED':  
                    case 'PermissionDeniedError':  
                        console.info('用户拒绝提供信息。');  
                        break;  
                    case 'NOT_SUPPORTED_ERROR':  
                    case 'NotSupportedError':  
                        console.info('浏览器不支持硬件设备。');  
                        break;  
                    case 'MANDATORY_UNSATISFIED_ERROR':  
                    case 'MandatoryUnsatisfiedError':  
                        console.info('无法发现指定的硬件设备。');  
                        break;  
                        default:  
                        console.info('无法打开麦克风。异常信息:' + (error.code || error.name));  
                        break;  
                        }  
                    }
                )
            }
     },

    closeIntercom() {
      let that = this
            if (ws) {
                ws.close();
                record.stop();
                clearInterval(that.timeInte)
                console.log('关闭对讲以及WebSocket');
            }
     },

    functionForJs(){
       console.log('收到通知+','aaa')
        this.speak = false

    },

    beforeunloadHandler(e) {
      // console.log('监听intercom关闭')
      window.addEventListener("beforeunload", () => {
         if(this.speak){
          this.end()
         }
      });
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
i:active{
 opacity:0.5;
}
.el-icon-phone-outline {}
</style>
