<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click.native="screenEvent"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    screenEvent() {
      if (!screenfull.enabled) {
        this.$notify({
          message: 'you browser can not work',
          type: 'warning',
          title: '提示',
          duration: 1000,
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change);
      }
    },
  },
};
</script>

<style scoped>
/* .screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
} */
</style>
