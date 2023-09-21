<template>
  <div>
    <div class="licenseSetting">
      <div
        style="text-align: center;color: white;margin: 10px auto;height:450px;width:500px;background-color: var(--tablebody);border:1px solid var(--tableborder);">
        <el-result :icon="result.icon" :title="result.title" :subTitle="result.subTitle">
        </el-result>
        <div style="">
          <h3 v-if="extra.active && extra.period != -1" style="margin:0 auto 40px">
            授权将在 <a style='color: red'>{{ extra.expire }}天</a> 后到期
          </h3>
          <div style="margin:0 auto 20px;width: 380px;word-wrap: break-word;">
            <a @click="copySerialNo()">
              <h3 style="margin-top: 0">{{ extra.serialNo }}</h3>
            </a>
          </div>
        </div>
        <div style="position:relative;padding-bottom: 20px">
          <el-upload ref="uploadLicense" :limit="2" name="file"
                     :auto-upload="false"
                     action="/api/SystemConfig/uploadLicense"
                     :file-list="fileList"
                     :on-success="uploadLicense"
                     :on-change="uploadChange"
          >
            <el-button style="margin-right: 30px" slot="trigger" type="success" icon="el-icon-upload2">上传许可证</el-button>
            <el-button type="primary" icon="el-icon-key" @click="uploadHandle">授权验证</el-button>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getLicenseStatus, licenseChecker } from '../../../api/sysCtrl'
import {setRouterRoles } from '@/utils/auth'
export default {
  components: {},
  data() {
    return {
      fileList: [],
      result: {
        icon: "warning",
        title: "未授权",
        subTitle: ""
      },
      extra: {
        active: false,
        msg: "",
        expire: "",
        serialNo: "",
        period: ""
      },
    };
  },
  mounted() {
    this.getLicenseStatus(false)
  },
  methods: {
    async getLicenseStatus(notify) {
      await getLicenseStatus().then((res) => {
        this.licenseProcess(res, notify,false)
      }).catch(() => { })
    },

    licenseProcess(res, notify, refresh) {
      const powerList = this.$store.getters.roles
      if (res.code === 20000) {
        this.extra.active = res.data.active
        this.extra.period = res.data.period
        if (res.data.active) {
          if (!powerList.includes('vertify')) {
            this.$store.dispatch('user/setVertify', 'vertify')
          }
          this.result.icon = "success"
          this.result.title = "已授权"
          const userRoles = this.$store.getters.roles
          this.updateRouteRoles(userRoles);
          if (res.data.period == -1) {
            this.result.subTitle = ""
            this.extra.serialNo = ""
          } else {
            this.result.subTitle = "许可证有效期为" + res.data.period + "天"
            this.extra.expire = res.data.expire
            this.extra.serialNo = res.data.serialNo
          }
          if (notify) {
            this.$notify({
              title: '已授权',
              message: '许可证验证通过',
              type: 'success'
            });
          }
          if(refresh){
            //授权成功后刷新路由
            this.$router.go(0);
          }
        } else {
          this.result.icon = "warning"
          this.result.title = "未授权"
          this.result.subTitle = "点击序列号复制 向开发商获取许可证"
          this.extra.serialNo = res.data.serialNo

          this.$notify({
            title: '授权失败',
            message: res.data.msg,
            type: 'warning'
          });
        }
      } else {
        this.result.icon = "warning"
        this.result.title = "未授权"
        this.result.subTitle = "点击序列号复制 向开发商获取许可证"
        this.extra.expire = null
        this.$notify({
          title: '请求失败',
          message: '无法获取激活状态',
          type: 'warning'
        });
      }
    },

    uploadHandle(){
      if(this.fileList.length < 1){
        this.licenseChecker()
      }else {
        this.$refs.uploadLicense.submit()
      }
    },

    uploadChange(file,fileList){
      this.fileList = fileList.slice(-1)
    },

    uploadLicense(res) {
      console.log(res)
      if (res.code === 20000) {
        this.licenseChecker()
      } else {
        this.$notify({
          title: "上传失败",
          message: res.data,
          type: 'warning'
        });
      }
      this.$refs.uploadLicense.clearFiles()
    },

    async licenseChecker() {
      await licenseChecker().then((res) => {
        this.licenseProcess(res, true,true)
      }).catch(() => { })
    },

    copySerialNo() {
      this.$copyText(this.extra.serialNo).then(() => {
        this.$notify({
          title: '复制成功',
          message: '已复制序列号到粘贴板',
          type: 'success'
        });
      })
    },
    updateRouteRoles(userRoles) {
    // 获取路由实例
    const router = this.$router;
    // 遍历路由配置对象
    this.$store.dispatch('permission/generateRoutes',userRoles)
    sessionStorage.setItem('sessionRoles','/system/licenseSetting')
    router.addRoutes(router.options.routes);
  }
  },

};
</script>
<style lang="scss" scoped>
.licenseSetting {
  position: relative;
  min-height: calc(87vh - 120px);

  .btn {
    text-align: center;
    font-size: 1vh;

  }
}

::v-deep .el-result__title p {
  color: var(--font-color);
}

::v-deep .el-result__subtitle p {
  color: var(--font-color);
}

::v-deep .el-form-item__content {
  margin-top: 20px;

  .el-form-item__error {
    top: 85%;
  }

}

::v-deep .el-upload-list__item-name{
  color: #409eff;
}

::v-deep .el-input__icon {
  line-height: 3vh;
}
</style>
