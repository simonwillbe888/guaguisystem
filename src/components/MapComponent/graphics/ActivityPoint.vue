<template>
  <g>
    <circle
      :cx="activityPointInfo.x"
      :cy="activityPointInfo.y"
      r="50"
      style="stroke:#d7ee08;fill: none;stroke-width:3"
    >
    </circle>
    <text
      :x="textX"
      :y="textY"
      :transform="'scale(' + 1 + ',' + -1 + ')'"
      style="fill:#d7ee08;font-size:36px"
      >{{ activityPointInfo.number }}</text
    >
  </g>
</template>

<script>
export default {
  props: ['activityPointInfo'],
  data() {
    return {};
  },
  computed: {
    textX() {
      return this.activityPointInfo.x - 70;
    },
    textY() {
      return this.activityPointInfo.y * -1 - 70;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
