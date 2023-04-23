<template>
  <div style="padding: 2%;">
    <el-button type="primary" @click="ok()">API</el-button>
  </div>
</template>
<script>
import { getAllCarriers } from '@/api/robot';

export default {
  data() {
    return {};
  },
  mounted: {},
  methods: {
    ok() {
      let self = this;
      getAllCarriers()
        .then((response) => {
          
          let item = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
  },
};
</script>

<style scoped></style>
