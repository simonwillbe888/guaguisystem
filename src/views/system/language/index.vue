<template>
  <div>
    <el-card class="box-card" style="margin-top:40px;">
      <div slot="header" class="clearfix">
        <svg-icon icon-class="language" />
        <span style="margin-left:10px;">{{ $t('system.switch_language') }}</span>
      </div>
      <div>
        <el-radio-group v-model="lang" size="small">
          <el-radio label="zh" border>
           中文
          </el-radio>
          <el-radio label="en" border>
           English
          </el-radio>
<!--          <el-radio label="es" border>
            Español
          </el-radio>
          <el-radio label="ja" border>
            日本語
          </el-radio>-->
        </el-radio-group>

      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  computed: {
    lang: {
      get() {
        return this.$store.state.app.language
      },
      set(lang) {
        this.$i18n.locale = lang
        this.$store.dispatch('app/setLanguage', lang)
      }
    }
  },
  watch: {
    lang() {
      this.setOptions()
    }
  },
  methods: {
    setOptions() {
      this.options = [
        {
          value: '1',
          label: this.$t('i18nView.one')
        },
        {
          value: '2',
          label: this.$t('i18nView.two')
        },
        {
          value: '3',
          label: this.$t('i18nView.three')
        }
      ]
    }
  }
}

</script>
<style scoped>
  .box-card {
    width: 600px;
    max-width: 100%;
    margin: 20px ;
  }
  .item-btn{
    margin-bottom: 15px;
    margin-left: 0px;
  }
  .block {
    padding: 25px;
  }
</style>
