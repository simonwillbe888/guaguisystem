<!-- <template>
  <div style="padding: 2%;">
    视频监控
    <p class="mainContainer">
      <video name="videoElement"
             id="videoElement"
             class="centeredVideo"
             controls
             muted
             autoplay
             width="600"
             height="400">
      </video>
    </p>
  </div>
</template>
<script>
import flvjs from "@/assets/js/flv.js"


export default {
  data () {
    return {
      cleanBuff: '',
      jumpToEndBuffer: () => {
        this.video = document.getElementById('videoElement');
        if (this.video) {
          let buffered = this.video.buffered
          if (buffered.length > 0) {
            let end = buffered.end(0)
            if (end - this.video.currentTime > 0.15) {
              this.video.currentTime = end - 0.1
            }
          }
        }
      }
    }
  },

  mounted () {
    this.start();
    this.componentDidMount();
  },

  methods: {
    start () {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: 'http://192.168.1.11:8088/live?port=1985&app=live&stream=mystream'
          // url: 'http://localhost:8080/live?port=1985&app=live&stream=mystream'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    },

    componentDidMount () {
      this.cleanBuff = setInterval(this.jumpToEndBuffer, 1 * 60 * 1000)
    },
  }
}
</script>

<style scoped>
.mainContainer {
  display: block;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.centeredVideo {
  display: block;
  width: 100%;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
}

.controls {
  display: block;
  width: 100%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style> -->
