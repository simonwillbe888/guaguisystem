<template>
  <div>{{ clockTime }} {{ week }}</div>
</template>
<script>
import moment from 'moment';

export default {
  data() {
    return {
      time: Date.now()
    }
  },
  computed: {
    clockTime() {
      return moment(this.time).format("yyyy-MM-DD HH:mm:ss");
    },
    week(){
      let week = null
      switch (moment(this.time).format("dddd")){
        case 'Monday':    week = "星期一"; break;
        case 'Tuesday':   week = "星期二"; break;
        case 'Wednesday': week = "星期三"; break;
        case 'Thursday':  week = "星期四"; break;
        case 'Friday':    week = "星期五"; break;
        case 'Saturday':  week = "星期六"; break;
        case 'Sunday':    week = "星期日"; break;
      }
      return week
    }

  },
  created() {
    setInterval(() => {
      this.time = Date.now();
    }, 500);
  }
}
</script>
