<template>
  <g style="stroke:orange;stroke-width:60;fill-opacity:0">
    <circle :cx="radarInfo.x"
            :cy="radarInfo.y"
            r="0">
      　　　　<animate class="radar-animate"
               attributeName="r"
               id="ani1"
               begin="0"
               from="0"
               to="1000"
               dur="1.2s"
               repeatCount="3"></animate>
      　　　　<animate class="radar-animate"
               attributeName="opacity"
               begin="0"
               from="1"
               to="0"
               dur="1.2s"
               repeatCount="3"></animate>
      　　</circle>
    <!-- 　　<circle :cx="radarInfo.x"
            :cy="radarInfo.y"
            r="0">
      　　　　<animate attributeName="r"
               class="radar-animate"
               begin="ani1.begin + 0.5s"
               from="0"
               to="1000"
               dur="0.8s"
               repeatCount="3"></animate>
      　　　　<animate attributeName="opacity"
               class="radar-animate"
               begin="ani1.begin + 0.5s"
               from="1"
               to="0"
               dur="0.8s"
               repeatCount="3"></animate>
      　　</circle> -->
    <!-- 　　<circle :cx="radarInfo.x"
            :cy="radarInfo.y"
            r="0">
      　　　　<animate attributeName="r"
               class="radar-animate"
               begin="ani1.begin + 1s"
               from="0"
               to="1000"
               dur="2s"
               repeatCount="3"></animate>
      　　　　<animate attributeName="opacity"
               class="radar-animate"
               begin="ani1.begin + 1s"
               from="1"
               to="0"
               dur="2s"
               repeatCount="3"></animate>
      　　</circle>  -->
  </g>
</template>

<script>
export default {
  props: ['radarInfo'],
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
</style>