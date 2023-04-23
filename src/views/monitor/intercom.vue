<template>
  <div style="">
    <!-- <el-button class="el-icon-phone-outline" v-if="!speak" @click="begin" size="mini" type="primary">开始对讲</el-button>
    <el-button class="el-icon-phone-outline" v-if="speak" @click="end"  size="mini" type="primary">关闭对讲</el-button> 
  -->
  <i class="el-icon-microphone" v-if="!speak" @click="begin"></i>
  <div @click="end">
    <svg-icon icon-class="closeMic"  v-if="speak"  ></svg-icon>
  </div>
 
  </div>
</template>
<script>
import { StartVoiceTalk, StopVoiceTalk, talkTest } from '../../api/dashboard';
var ws = null; //实现WebSocket


export default {
  name: 'intercom',
  data() {
    return {
      record: null,
      timeInte: null,
      speak:false,
    };
  },
  mounted() { },
  beforeDestroy() {
    this.end()
  },
  methods: {
    init(rec) {
      this.record = rec

    },

    //录音对象
    Recorder(stream) {
      var sampleBits = 16; //输出采样数位 8, 16
      var sampleRate = 16000; //输出采样率
      var context = new AudioContext();
      var audioInput = context.createMediaStreamSource(stream);
      var recorder = context.createScriptProcessor(4096, 1, 1);
      let that = this
      var audioData = {
        size: 0, //录音文件长度
        buffer: [], //录音缓存
        inputSampleRate: 48000, //输入采样率
        inputSampleBits: 16, //输入采样数位 8, 16
        outputSampleRate: sampleRate, // 输出采样率
        oututSampleBits: sampleBits, //采样位

        clear: function () {
          this.buffer = [];
          this.size = 0;
        },
        input: function (data) {
          this.buffer.push(new Float32Array(data));
          this.size += data.length;
        },

        compress: function () { //合并压缩
          //合并
          var data = new Float32Array(this.size);
          var offset = 0;
          for (var i = 0; i < this.buffer.length; i++) {
            data.set(this.buffer[i], offset);
            offset += this.buffer[i].length;
          }//压缩
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

        encodePCM: function () {
          //这里不对采集到的数据进行其他格式处理，如有需要均交给服务器端处理。
          var sampleRate = Math.min(
            this.inputSampleRate,
            this.outputSampleRate
          );
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
        },
      }
      var sendData = function () { //对以获取的数据进行处理(分包)

        var reader = new FileReader();

        reader.onload = e => {

          var outbuffer = e.target.result;

          var arr = new Int8Array(outbuffer);

          if (arr.length > 0) {

            var tmparr = new Int8Array(1024);
            // console.log(outbuffer);
            ws.send(outbuffer);

          }

        };

        reader.readAsArrayBuffer(audioData.encodePCM());

        audioData.clear();//每次发送完成则清理掉旧数据

      };
      // var sendData = function() {
      //   //对以获取的数据进行处理(分包)

      //   var reader = new FileReader();
      //   reader.onload = e => {

      //     var outbuffer = e.target.result;
      //     var arr = new Int8Array(outbuffer);
      //     if (arr.length > 0) {
      //       var tmparr = new Int8Array(1024);
      //       console.log("输出的音频",outbuffer)
      //       ws.send(outbuffer)
      //       var j = 0;
      //       for (var i = 0; i < arr.byteLength; i++) {
      //         tmparr[j++] = arr[i];
      //         if (((i + 1) % 1024) == 0) {
      //           ws.send(tmparr.buffer);
      //           if (arr.byteLength - i - 1 >= 1024) {
      //             tmparr = new Int8Array(1024);
      //           } else {
      //             tmparr = new Int8Array(arr.byteLength - i - 1);
      //           }
      //           j = 0;
      //         }
      //         if ((i + 1 == arr.byteLength) && ((i + 1) % 1024) != 0) {
      //           ws.send(tmparr.buffer);
      //         }
      //       }
      //     }
      //   };
      //   reader.readAsArrayBuffer(audioData.encodePCM());
      //   audioData.clear(); //每次发送完成则清理掉旧数据
      // };

      this.start = function () {
        audioInput.connect(recorder);
        recorder.connect(context.destination);
      };

      this.stop = function () {
        recorder.disconnect();
      };

      this.getBlob = function () {
        return audioData.encodePCM();
      };

      this.clear = function () {
        this.audioData.clear();
      };

      recorder.onaudioprocess = function (e) {
        var inputBuffer = e.inputBuffer.getChannelData(0);
        audioData.input(inputBuffer);
        sendData();
      };
    },

    /*
     * WebSocket
     */

    receive(data) {
      let that = this

      var buffer = (new Response(data)).arrayBuffer();

      buffer.then(function (buf) {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        var fileResult = that.addWavHeader(buf, '16000', '16', '2');//解析数据转码wav
        audioContext.decodeAudioData(fileResult, function (buffer) {
          that._visualize(audioContext, buffer);//播放
        });
      });

    },
    
    //处理音频流，转码wav
    addWavHeader(samples, sampleRateTmp, sampleBits, channelCount) {
      var dataLength = samples.byteLength;
      var buffer = new ArrayBuffer(44 + dataLength);
      var view = new DataView(buffer);
      function writeString(view, offset, string) {
        for (var i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      }
      var offset = 0;
      /* 资源交换文件标识符 */
      writeString(view, offset, 'RIFF'); offset += 4;
      /* 下个地址开始到文件尾总字节数,即文件大小-8 */
      view.setUint32(offset, /*32*/ 36 + dataLength, true); offset += 4;
      /* WAV文件标志 */
      writeString(view, offset, 'WAVE'); offset += 4;
      /* 波形格式标志 */
      writeString(view, offset, 'fmt '); offset += 4;
      /* 过滤字节,一般为 0x10 = 16 */
      view.setUint32(offset, 16, true); offset += 4;
      /* 格式类别 (PCM形式采样数据) */
      view.setUint16(offset, 1, true); offset += 2;
      /* 通道数 */
      view.setUint16(offset, channelCount, true); offset += 2;
      /* 采样率,每秒样本数,表示每个通道的播放速度 */
      view.setUint32(offset, sampleRateTmp, true); offset += 4;
      /* 波形数据传输率 (每秒平均字节数) 通道数×每秒数据位数×每样本数据位/8 */
      view.setUint32(offset, sampleRateTmp * channelCount * (sampleBits / 8), true); offset += 4;
      /* 快数据调整数 采样一次占用字节数 通道数×每样本的数据位数/8 */
      view.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
      /* 每样本数据位数 */
      view.setUint16(offset, sampleBits, true); offset += 2;
      /* 数据标识符 */
      writeString(view, offset, 'data'); offset += 4;
      /* 采样数据总数,即数据总大小-44 */
      view.setUint32(offset, dataLength, true); offset += 4;
      function floatTo32BitPCM(output, offset, input) {
        input = new Int32Array(input);
        for (var i = 0; i < input.length; i++, offset += 4) {
          output.setInt32(offset, input[i], true);
        }
      }
      function floatTo16BitPCM(output, offset, input) {
        input = new Int16Array(input);
        for (var i = 0; i < input.length; i++, offset += 2) {
          output.setInt16(offset, input[i], true);
        }
      }
      function floatTo8BitPCM(output, offset, input) {
        input = new Int8Array(input);
        for (var i = 0; i < input.length; i++, offset++) {
          output.setInt8(offset, input[i], true);
        }
      }
      if (sampleBits == 16) {
        floatTo16BitPCM(view, 44, samples);
      } else if (sampleBits == 8) {
        floatTo8BitPCM(view, 44, samples);
      } else {
        floatTo32BitPCM(view, 44, samples);
      }
      return view.buffer;
    },
    //播放音频
    _visualize(audioContext, buffer) {
      var audioBufferSouceNode = audioContext.createBufferSource(),
        analyser = audioContext.createAnalyser(),
        that = this;
      //将信号源连接到分析仪
      audioBufferSouceNode.connect(analyser);
      //将分析仪连接到目的地（扬声器），否则我们将听不到声音
      analyser.connect(audioContext.destination);
      //然后将缓冲区分配给缓冲区源节点
      audioBufferSouceNode.buffer = buffer;
      //发挥作用
      if (!audioBufferSouceNode.start) {
        audioBufferSouceNode.start = audioBufferSouceNode.noteOn //在旧浏览器中使用noteOn方法
        audioBufferSouceNode.stop = audioBufferSouceNode.noteOff //在旧浏览器中使用noteOff方法
      };
      //如果有的话，停止前一个声音
      if (this.animationId !== null) {
        cancelAnimationFrame(this.animationId);
      }
      audioBufferSouceNode.start(0);
      // audio.source = audioBufferSouceNode;
      // audio.audioContext = audioContext;
    },
    useWebSocket() {
      ws = new WebSocket('ws://192.168.100.88:9001/webSocket/talker');
      ws.binaryType = 'arraybuffer'; //传输的是 ArrayBuffer 类型的数据
      var that = this
      ws.onopen = () => {
        // console.log('握手成功');
        // console.log(ws.readyState)
        if (ws.readyState == 1) { //ws进入连接状态，则每隔500毫秒发送一包数据
          // record.start();
          this.timeInte = setInterval(function () {
            that.record.start();
            //console.log("#######################send Blob start ##############################");
            //console.log(record.getBlob());
            //ws.send(record.getBlob());    //发送音频数据
            //console.log("#######################send Blob end ##############################");
            //record.clear();	//每次发送完成则清理掉旧数据
          }, 500);  //每隔500ms发送一次，定时器

        }
      };
      var that = this
      ws.onmessage = function (msg) {
        // console.info("收到的语音", msg.data);
        that.receive(msg.data)
      };

      ws.onerror = function (err) {
        console.info(err);
      };
    },


    /*
     * 开始对讲
     */
    begin() {
      
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      if (!navigator.getUserMedia) {
        // console.log("查看情况", navigator.getUserMedia)
        alert('浏览器不支持音频输入');
      } else {
        navigator.getUserMedia(
          {
            audio: true,
          },
          (mediaStream) => {
            this.init(new this.Recorder(mediaStream));
            this.useWebSocket();
            this.speak = true
            // talkTest("JIAQI").then((res)=>{
            //   console.log("对讲接口",res)
            // })
            // StartVoiceTalk().then((res)=>{
            //   console.log("对讲接口",res)
            // })

          },
          (error) => {
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
                console.info(
                  '无法打开麦克风。异常信息:' + (error.code || error.name)
                );
                break;
            }
          }
        );
      }
    },

    /*
     * 关闭对讲
     */
    end() {
      if (ws) {
        this.speak = false
        ws.close();
        this.record.stop();
        // console.log("查看定时器", this.timeInte)
        clearInterval(this.timeInte)
        // console.log('关闭对讲以及WebSocket');
      }
    },
  },
};
</script>
<style scoped>
   ::v-deep .el-button--mini{
    width: 6.2vw;
    height: 3.5vh;
    text-align: center;
    font-size: 0.5vh;  
    /* margin: auto; */
   }
   .el-icon-phone-outline{
   
   }
</style>
