<template>
  <video id="video" controls style="width: 100%;height: 100%;" />
</template>
<script>
import WebRtcStreamer from './webrtcstreamer';
export default {
  props: ['serve', 'videoData'],
  data() {
    return {
      webRtcServer: null,
    };
  },
  mounted() {
    if (!this.videoData.rtsp) return;
    this.webRtcServer = new WebRtcStreamer(
      'video',
      `http://${this.serve}:8000`
    );
    this.webRtcServer.connect(this.videoData.rtsp);
  },
  beforeDestroy() {
    this.webRtcServer.disconnect();
  },
};
</script>
<style scoped></style>
