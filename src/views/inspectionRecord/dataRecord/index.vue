<template>
  <div style="padding:1%; background: rgb(6,30,51);">
    <div class="content-header">
      <div style="display:inline;float: right;">
        <span>{{ $t('comment_vary.default_time_label') }}</span>
        <el-date-picker v-model="startVal" type="date" value-format="yyyy-MM-dd"
          :placeholder="$t('comment_vary.start_time_label')">
        </el-date-picker>
        <span>--</span>
        <el-date-picker v-model="endVal" type="date" :placeholder="$t('comment_vary.end_time_label')"
          style="margin-right: 20px" value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-button style="background-color: #64C8C8"   @click.native="init()">查询</el-button>
        <el-button icon="el-icon-download" style="background-color: #64C8C8" size="mini" @click.native="exportAll()">导出列表</el-button>

      </div>

    </div>
    <div class="equip-body content-body">
      <el-table class="equip-data" :data="alarmInfoArr" header-row-class-name="header-row-class" height="35.5rem"
        row-class-name="row-class" fit highlight-current-row size="small" :empty-text="'暂无数据'"><el-table-column
          type="index" label="序号" align="center" width="100">
        </el-table-column>
        <el-table-column prop="account" label="账号" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operationType" label="操作类型" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.operationType }}</span>
          </template>
        </el-table-column>


        <el-table-column prop="time" label="操作时间" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="ip地址" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="details" label="详细信息" align="center" width="120">
          <template slot-scope="{ row }">
            <!-- <el-button :disabled="row.operationType=='拍照'?false:row.operationType=='结束录像'?false:true" type="primary" icon="el-icon-picture" size="mini" plain @click="showDetail(row)">详情</el-button> -->
            <span>{{ row.information }}</span>
          </template>

        </el-table-column>
      </el-table>
      <div>
        <pagination v-show="total > 0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="setPage" />
      </div>
    </div>
    <!-- 展示云台拍照录像情况的 -->
    <!-- <el-dialog :visible.sync="dialogVisible" width="50%" title="详情">
      <div v-if="details == '拍照'">
             <el-image
                :src="pictureUrl"
                style="height:100%;width:100%;object-fit: contain;"
                lazy
              ></el-image>
      </div>
      <div v-if="details == '结束录像'">
        <video
                id="detailVideo"
                class="centeredVideo"
                controls
                autoplay
                style="height:100%;width:100%"
              >
                <source :src="videoUrl" type="video/mp4" />
              </video>
      </div>
    </el-dialog> -->

  </div>
</template>

<script>
import { getDataRecord, exportRecord } from '@/api/inspectRecord';
import Pagination from '@/components/Pagination';
export default {
  components: { Pagination },
  data() {
    return {
      startVal: null,
      endVal: null,
      alarmInfoArr: [],
      total: 0,
      page: 1,
      limit: 10,
      dialogVisible: false,
      pictureUrl: '',
      details: '',
      videoUrl: '',
      exportRole:false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const powelist = this.$store.getters.roles
      powelist.forEach((res) => {
        if (res == 'exportOperationLog') {
          this.exportRole = true
        }
      })
      if (this.startVal == null && this.endVal == null) {
        var params = {
          current: this.page,
          endTime: '2999-12-31 23:59:59',
          limit: this.limit,
          startTime: '2022-12-31 00:00:00'
        }
        getDataRecord(params).then((res) => {
          console.log('操作日志', res.data, params)
          this.alarmInfoArr = res.data.records
          this.total = res.data.total
        })
      }
      else {


        if (this.startVal == null || this.endVal == null) {
          this.$notify({
            title: '提示',
            message: '请输入完整的起止时间',
            duration: 5000
          });
        }
        else {
          const stDay = this.startVal
          const endDay = this.endVal
          var params = {
            current: this.page,
            endTime: endDay + " 23:59:59",
            limit: this.limit,
            startTime: stDay + " 00:00:00"
          }
          getDataRecord(params).then((res) => {
            console.log('操作日志', res.data, params)
            this.alarmInfoArr = res.data.records
            this.total = res.data.total
          })
        }
      }

    },


    exportAll() {
      if (this.startVal == null && this.endVal == null) {
        var params = {
          current: null,
          endTime: '2999-12-31 23:59:59',
          limit: null,
          startTime: '2022-12-31 00:00:00'
        }
        if (this.startVal == null || this.endVal == null) {
          params.endTime = null
          params.startTime = null
        }
      }
      else {
        const stDay = this.startVal
        const endDay = this.endVal

        var params = {
          current: null,
          endTime: endDay + " 23:59:59",
          limit: null,
          startTime: stDay + " 00:00:00"
        }

      }
      if(this.exportRole){
        exportRecord(params).then((res) => { //导出流
        console.log("看看导出类型", res)
        this.$notify({
          type: 'success',
          message: '导出成功',
          title: '提示',
          duration: 1000,
        });
        let blob = new Blob([res], { type: "application/vnd.ms-excel" });
        // let blob = new Blob([res]);//response.data为后端传的流文件
        let downloadFilename = '操作日志' + this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ".xlsx";//设置导出的文件名  用moment时间插件对文件命名防止每次都是一样的文件名
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
      }else{
        this.$notify({
          type: 'error',
          message: '您当前未拥有系统权限',
          title: '提示',
          duration: 2000,
        });
      }


    },
    setPage() {
      if (!this.pageFlag) {
        this.init();
      } else {
        this.findInfo();
      }
    },
  }
};
</script>

<style scoped lang="scss">
::v-deep .el-icon-date {
  line-height: 20px;
}

::v-deep .el-input__icon {
  line-height: 20px;
}

.equip-body {
  padding: 0px 10px;
  background-color: lightblue;
  border: 1px solid #fff;

  .equip-data {
    font-size: 13px;
    width: 100%;
    color: #301d0f;

  }
}

</style>
