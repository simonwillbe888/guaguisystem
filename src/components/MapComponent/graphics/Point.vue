<template>
  <g>
    <circle
      :cx="pointInfo.x"
      :cy="pointInfo.y"
      r="20"
      style="stroke:#fff;fill: #2edfb2;stroke-width:4"
    >
    </circle>
    <text
      :x="textX"
      :y="textY"
      :transform="'scale(' + 1 + ',' + -1 + ')'"
      style="fill:#2edfb2;font-size:36px"
      >{{ pointInfo.number }}</text
    >
  </g>
</template>

<script>
export default {
  props: ['pointInfo'],
  data() {
    return {};
  },
  computed: {
    textX() {
      return this.pointInfo.x - 80;
    },
    textY() {
      return this.pointInfo.y * -1 + 80;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
