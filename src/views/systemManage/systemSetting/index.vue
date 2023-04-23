<template>
  <div>
    <div class="sysSetting">
      <div style="text-align: center;color: white;margin-top: 40px;">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="" prop="webRtcIP">
            <span>推流IP</span> <el-input placeholder="请输入推流Ip" style="width:400px" v-model="form.webRtcIP"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="fileAddress">
            <span>图片保存位置</span> <el-input :disabled="true" placeholder="请输入文件保存位置" style="width:400px;margin-right: 41px;"
              v-model="form.fileAddress"></el-input>
          </el-form-item>

          <span>视频保存位置</span> <el-input :disabled="true" placeholder="请输入文件保存位置"
            style="width:400px;margin-right: 55px;margin-top: 30px;" v-model="video"></el-input> -->

        </el-form>
      </div>
      <div class="btn">
        <el-button style="background-color:  #15B3B4; color: #fff;border: none;" :loading="saveBtnLoding" size="mini" @click="saveSetting" type="primary">确定</el-button>
        <!-- <el-button :loading="saveBtnLoding" size="mini" @click="download = true" type="primary">下载</el-button> -->
      </div>
      <el-dialog title="下载视频图片" :visible.sync="download">
        <div>
          <el-date-picker v-model="startVal" type="date" value-format="yyyy-MM-dd"
            :placeholder="$t('comment_vary.start_time_label')">
          </el-date-picker>
          <span>--</span>
          <el-date-picker v-model="endVal" type="date" :placeholder="$t('comment_vary.end_time_label')"
            style="margin-right: 20px" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div style="margin-top:1vh">
          <div style="margin: 2vh 2vw;"></div>
          <el-checkbox-group v-model="Checked" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="file in fileType" :label="file" :key="file">{{ file }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button size="mini" type="primary" @click="confirm">确定</el-button>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getSystemXmlConfig, setSystemXmlConfig ,downLoadBatchPTZFile} from '../../../api/sysCtrl';
export default {
  data() {
    return {
      form: {
        webRtcIP: '',
        fileAddress: '',
      },
      video: '\\D:\casun\irms\RecordVideo',
      rules: {
        webRtcIP: [{ required: true, message: '请输入IP', trigger: 'change' }],
        fileAddress: [
          { required: true, message: '请输入文件保存位置', trigger: 'change' },
        ],
      },
      saveBtnLoding: false,
      download: false,
      actions:null,
      checkAll: false,
      Checked:[],
      fileType:['图片','视频'],
      startVal:null,
      endVal:null
    };
  },
  mounted() {
    this.getSysConfig();
  },
  methods: {
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.fileType.length;
      //  console.log("查看选择",this.Checked)
      },
      confirm(){
        let that = this
        that.actions = null 
        if(this.Checked.length == 2){
          that.actions = 0
        }
        else{  this.Checked == '视频'?that.actions = 2: this.Checked == '图片'?that.actions = 1:that.actions==null}
        let params ={
          startTime: that.startVal,
          endTime:that.endVal,
          limit:null,
          currend:null,
          fileType:that.actions
        }
        // console.log(params.fileType)
        downLoadBatchPTZFile(params).then((res)=>{
          if(that.actions == null){
            this.$notify({
          type: 'error',
          message: '请选择导出类型',
          title: '提示',
          duration: 3000,
        });
          }
          else {
            that.download = false
            // console.log("查看",that.download)
          this.$notify({
          type: 'success',
          message: '导出成功',
          title: '提示',
          duration: 1000,
        });
        

        let blob = new Blob([res], { type: "application/zip" });
        // let blob = new Blob([res]);//response.data为后端传的流文件
        let downloadFilename = '下载图片' + this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ".zip";//设置导出的文件名  用moment时间插件对文件命名防止每次都是一样的文件名
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          //兼容ie浏览器
          window.navigator.msSaveOrOpenBlob(blob, downloadFilename)
        } else {
          //谷歌,火狐等浏览器
          let url = window.URL.createObjectURL(blob);
          let downloadElement = document.createElement("a");
          downloadElement.style.display = "none";
          downloadElement.href = url;
          downloadElement.download = downloadFilename;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(url);
        }
      }}).catch(function (err) {
        // console.log(err)
      }).finally(function () {

      })
      
      },
    saveSetting() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { webRtcIP, fileAddress } = this.form;
          this.saveBtnLoding = true;
          try {
            const res = await setSystemXmlConfig({
              webRtcIP,
              fileAddress,
            });
            this.saveBtnLoding = false;
            if (res.code === 20000) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                title: '提示',
                duration: 1000,
              });
              this.getSysConfig();
            }
          } catch (error) {
            // console.log('error submit!!', error);
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    async getSysConfig() {
      const res = await getSystemXmlConfig();
      if (res.code === 20000 && res.data) {
        this.form = res.data;
        this.form.fileAddress = '\\D:\casun\irms\RecordImg'
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sysSetting {
  position: relative;
  min-height: calc(87vh - 120px);

  .btn {
    text-align: center;
    font-size: 1vh;
  


  }
}

::v-deep .el-form-item__content {
  margin-top: 20px;

  .el-form-item__error {
    top: 85%;
  }

}
::v-deep .el-input__icon{
  line-height: 3vh;
}

</style>
