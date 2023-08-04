<template>
  <div style="padding: 1%;min-width: 75rem; background: rgb(6,30,51);">
    <div class="equip-header content-header">
      <!-- <h3 class="equip-setting-title">{{ $t('inspect_record.real_alarm_list') }}</h3> -->
      <div style="display:inline;float:right">
        <span>{{ $t('comment_vary.default_time_label') }}</span>
        <el-date-picker v-model="startVal" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
          :placeholder="$t('comment_vary.start_time_label')">
        </el-date-picker>
        <span>--</span>
        <el-date-picker v-model="endVal" type="datetime" :placeholder="$t('comment_vary.end_time_label')"
          style="margin-right: 1.25rem" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
        <el-button  @click.native="init()">{{
          $t('public_vary.query_label')
        }}</el-button>
        <el-button icon="el-icon-download" size="mini" @click.native="downLoadRole">批量下载</el-button>
      </div>
    </div>
    <div class="equip-body content-body">
      <div class="container" style="background-color: rgba(7, 24, 40, 0.5)">
        <el-row style="height: 37rem">
          <el-col :xs="24" :sm="12" :md="6" v-for="(item, index) in list" :key="index">
            <el-card class="box" :style="{ width: '21.5rem', height: '18rem', background: '#fff'}">
              <div class="box-content">
                <div>
                  <div class="download" @click="download(item)">
                    <svg-icon icon-class="download"></svg-icon>
                  </div>
                  <!-- @click="largerPic(item.FilePath)" -->
                  <el-image :src="item.FilePath" style="width: 21.5rem;height: 12rem;" v-if="item.fileType == 1"
                    :preview-src-list="imgaeList"></el-image>
                  <!-- <img @click="largerPic(item.FilePath)" :src="item.FilePath" style="width: 20.625rem;height: 14.0625rem;" v-if="item.fileType == 1"> -->
                  <!-- <video ></video>     -->
                  <iframe :src="item.FilePath" style="width: 21.5rem;height: 12rem;" v-if="item.fileType == 4"
                    allowfullscreen="true" frameborder="0"></iframe>
                </div>
                <div class="box-content-detail">
                  <div class="line" style="margin-top: 0.2rem;">媒体内容：{{ item.fileType == 1 ? '图片' : item.fileType == 4 ?
                    '视频' : '其他'
                  }}</div>
                  <div class="line">记录时间：{{ item.createTime }}</div>
                  <div class="line">获取来源：{{ item.account }}</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-dialog title="下载视频图片" :visible.sync="downloadAll">
        <div>
          <div style="margin: auto; "></div>
          <el-checkbox-group v-model="Checked" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="file in fileType" :label="file" :key="file">{{ file }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" style="background-color: #64C8C8;color: #fff;" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
      <div>
        <pagination v-show="total > 0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="init"
          :pageSizes="[8, 16, 24, 32]" />
      </div>
    </div>

  </div>
</template>

<script>
import {
  getPatrolFileList, GetPhotoData, GetVideoData, GetPTZFile, downLoadPTZFile
} from '@/api/inspectRecord';
import { downLoadBatchPTZFile } from '../../../api/sysCtrl';
import Pagination from '@/components/Pagination';

import { mapGetters, mapState } from 'vuex';
import { type } from 'os';
export default {
  components: { Pagination },
  data() {
    return {
      startVal: null,
      endVal: null,
      list: [1, 2, 3, 4, 5, 6, 7, 8], // 8 items in the list
      imgaeList: [],
      page: 1,
      total: 0,
      limit: 8,
      pic: '',
      fileName: '',
      actions: null,
      checkAll: false,
      Checked: [],
      fileType: ['图片', '视频'],
      downloadAll: false,
      enlargePic: false,
      picLarger: null,
      exportRole:false,
    };
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {

  },

  methods: {
    init() {
      const powelist = this.$store.getters.roles
      powelist.forEach((res) => {
        if (res == 'downloadMediaFiles') {
          this.exportRole = true
        }
      })
      let params = {
        startTime: this.startVal,
        endTime: this.endVal,
        current: this.page,
        limit: this.limit,
        fileType: 0,
      }
      GetPTZFile(params).then((res) => {
        console.log('查看', res)
        this.list = res.data.records
        this.total = res.data.total
        this.list.forEach(element => {

          if (element.fileType == 4) {
            element.FilePath = 'http://192.168.20.6:8888/' + element.fileUrl
          }
          else if (element.fileType == 1) {
            element.FilePath = 'http://192.168.20.6:8888/images/' + element.fileUrl
          }

        });
        console.log('查看list', this.list)
        this.list.forEach(element => {
          if (element.fileUrl.includes('jpg')) {
            console.log('包含图片了', element.fileUrl)
            this.imgaeList.push(element.FilePath)
          }
        })
      })
    },
    downLoadRole(){
     if(this.exportRole){
      this.downloadAll = true
     }
     else{
      this.$notify({
          type: 'error',
          message: '您当前未拥有系统权限',
          title: '提示',
          duration: 2000,
        });
     }
    },
    download(e) {

      if (e.fileType == 4) {
        console.log(e)
        downLoadPTZFile(e.id).then((res) => {
          console.log('响应信息58', res, e)
          let blob = new Blob([res], { type: "video/mpeg4" });
          // let blob = new Blob([res]);//response.data为后端传的流文件
          let downloadFilename = e.createTime + '.mp4'
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
        }).catch(function (err) {
          // console.log(err)
        }).finally(function () {

        })

      }
      else if (e.fileType == 1) {
        downLoadPTZFile(e.id).then((res) => {
          let blob = new Blob([res], { type: "image/jpeg" });
          // let blob = new Blob([res]);//response.data为后端传的流文件
          let downloadFilename = e.createTime + '照片'
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
        }).catch(function (err) {
          // console.log(err)
        }).finally(function () {

        })
      }
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.fileType.length;
      console.log("查看选择", this.Checked)
    },
    confirm() {
      let that = this
      that.actions = null
      if (this.Checked.length == 2) {
        that.actions = 0
      }
      else { this.Checked == '视频' ? that.actions = 4 : this.Checked == '图片' ? that.actions = 1 : that.actions = null }
      let params = {
        startTime: that.startVal,
        endTime: that.endVal,
        limit: null,
        currend: null,
        fileType: that.actions
      }
      console.log('下载的类型参数', typeof params.fileType, params)
      // console.log(params.fileType)
      if (that.actions == null) {
          this.$notify({
            type: 'error',
            message: '请选择下载类型',
            title: '提示',
            duration: 3000,
          });
        }
        else {
          that.downloadAll = false
          // console.log("查看",that.download)
          this.$notify({
            type: 'success',
            message: '下载成功，请稍候',
            title: '提示',
            duration: 1000,
          });
        }
      downLoadBatchPTZFile(params).then((res) => {
        console.log('下载成功')



        let blob = new Blob([res], { type: "application/zip" });
        // let blob = new Blob([res]);//response.data为后端传的流文件
        let downloadFilename = '下载文件' + this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ".zip";//设置导出的文件名  用moment时间插件对文件命名防止每次都是一样的文件名
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
      }).catch(function (err) {
        // console.log(err)
      }).finally(function () {

      })
    },
    largerPic(src) {
      console.log('放大版', src)
      this.picLarger = src
      this.enlargePic = true
    }
  }
}

</script>

<style lang="scss" scoped>
.equip-header {
  // padding: 1.25rem .625rem;
  // background-color: lightblue;
  border: .0625rem solid #fff;

  >>>.el-collapse-item__content {
    padding-bottom: .625rem !important;
  }

  .equip-setting-title {
    display: inline;
  }

  .robot-setting-inquire {
    margin-left: .9375rem;
    display: inline-block;

    >>>.el-input {
      width: 12.5rem !important;
    }

    >>>.el-input__inner {
      width: 12.5rem !important;
    }

    ::v-deep .el-input__icon {
      line-height: 1.5625rem;
    }
  }
}


::v-deep .el-select {
  line-height: 2vh;
  font-size: 1vw;
}

::v-deep .el-form-item__error {
  line-height: 3vh !important;
}

.head-condition {
  display: inline-block;

  >>>.el-select .el-input .el-select__caret {
    line-height: 1.5rem;
  }

  // input框中的叉叉
  >>>.el-input__icon {
    line-height: 1.5rem;
  }

  >>>.el-input {
    width: 7.5rem;
  }

  >>>.el-input__inner {
    width: 7.5rem;
  }
}
::v-deep .el-input__inner,
.el-range-editor.el-input__inner {
  color: #fff;
}
::v-deep .el-card__body,
.el-main {
  padding: 0;
}

.equip-body {
  width: 100%;
  padding: 0rem .625rem;

  .container {
    margin: auto;
    padding: 0;
  }

  .box {
    margin: .625rem auto;
    background-color: transparent;

  }

  .box-content {
    width: 21.625rem;
    height: 100%;

    .download {
      position: absolute;
      margin: 0.5rem 0 0 19rem;
      // top: .625rem;
      width: 2rem;
      height: 1.5rem;
      z-index: 999;

    }

    .download:active {
      opacity: 0.5;
    }

    .svg-icon {
      width: 2em;
      height: 1.5em;
    }

    .box-content-detail {
      border: .0313rem solid #fff;
      height: 7.1875rem;

      .line {
        color: #000;
        margin-left: 1.625rem;
        margin-top: .625rem;
        font-size: 1rem;
      }
    }
  }

}

>>>.el-table th,
.el-table tr {
  background-color: transparent;
}

>>>.header-row-class {
  background-color: transparent;
}

>>>.row-class {
  background-color: transparent;
}

>>>.el-table thead {
  color: black;
}

>>>.el-table th>.cell {
  padding-left: 0;
  padding-right: 0;
}

>>>.el-table .cell {
  padding-left: 0;
  padding-right: 0;
}

.dialog-class {
  >>>.el-dialog {
    width: 70%;
    min-width: 43.75rem;
  }

  ::v-deep .el-dialog__header {
    padding: 1.25rem;
    background-color: lightgray;
  }

  ::v-deep .el-dialog__body {
    padding: 1.25rem;
    color: #fff;

    // margin-left: 6.25rem;
    .el-descriptions {
      color: #fff !important;
      font-size: .75rem;
    }

    .el-descriptions__header {
      font-size: .8125rem;
      margin-bottom: .625rem;
    }

    .el-descriptions__body {
      color: #fff !important;
      background-color: transparent !important;
      margin-bottom: .625rem;
    }

    .el-divider__text {
      font-size: 1rem;
      color: #fff !important;
      background-color: rgb(9, 78, 107) !important;
    }

    .el-table {
      color: #fff !important;

      // background-color: rgb(9, 78, 107) !important;
      .header-row-class {
        color: #fff !important;
      }
    }
  }
}


.dialog-footer {
  margin: 1.25rem;
  text-align: center;
}

.detail-dialog-footer {
  margin: 1.25rem;
  text-align: right;
}

::v-deep .pagination-container {
  background-color: lightblue;
  padding: .625rem;
}

::v-deep .el-dialog {
  width: 33.75rem;
}

::v-deep .el-input__icon {
  line-height: 1.5625rem;
}

</style>
