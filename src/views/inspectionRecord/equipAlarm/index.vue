<template>
  <div style="padding: 1%;">
    <div class="equip-header content-header">
      <!-- <h3 class="equip-setting-title">
        {{ $t("inspect_record.equip_alarm_statics") }}
      </h3> -->
      <div class="robot-setting-inquire" style="float: right">

        <span style="color: var(--font-color)">{{ $t('comment_vary.default_time_label') }}</span>
        <el-date-picker v-model="startVal" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
          :placeholder="$t('comment_vary.start_time_label')">
        </el-date-picker>
        <span style="color: var(--font-color)">--</span>
        <el-date-picker v-model="endVal" type="datetime" :placeholder="$t('comment_vary.end_time_label')"
          style="margin-right: 20px" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
        <div class="filter-sty">
          <span>{{ $t('inspect_record.filter_condition_label') }}</span>
          <el-select clearable v-model="condition" style="width: 120px">
            <el-option v-for="item in filterOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-button  @click.native="init">查询</el-button>
        <el-button icon="el-icon-download"
          size="mini" @click="exportAll()">导出列表</el-button>
      </div>

      <!-- <el-button
          icon="el-icon-download"
          style="background-color: #64C8C8 !important;"
          type="primary"
          size="mini"
          @click="(dialogFormVisible = true)"
          >导出本页</el-button
        > -->
    </div>


    <div class="equip-body content-body">
      <el-table class="equip-data"
                :data="alarmInfoArr"
                header-row-class-name="header-row-class"
                row-class-name="row-class"
                fit
                height="39.5rem"
                highlight-current-row size="small"
                :empty-text="'暂无数据'">
        <el-table-column type="index" label="序号" align="center" width="100">
        </el-table-column>
        <el-table-column prop="PlanName" label="计划名称" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.PlanName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="PlanTypeDesc" label="计划类型" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.PlanTypeDesc }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="area" label="区域名称" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.area }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="CarrierName" label="机器人名称" align="center" width="130">
          <template slot-scope="{ row }">
            <span>{{ row.CarrierName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="AlarmCount" label="是否有告警" align="center" width="130">
          <template slot-scope="{ row }">
            <span>{{ row.AlarmCount > 0 ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="StartTime" label="开始时间" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.StartTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="EndTime" label="结束时间" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.EndTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="details" label="详细信息" align="center" width="160">
          <template slot-scope="{ row }">
            <el-button  style="background-color: var(--title-bg) ;color:rgb(100,200,200)"  icon="el-icon-document" size="mini"
              :disabled="row.operateType === 7 ? true : row.operateType === 14 ? true : false" @click="showDetail(row)">{{
                $t('plan_config.inqireDetail_label') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <pagination v-show="total > 0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="setPage" />
      </div>
    </div>

    <el-dialog :title="'巡检记录详情'" :visible.sync="dialogDetailFlag" class="detail-dialog">
      <div style="  width: 100%;
        padding: 20px;
        display: flex;
        margin-bottom: 1vh;">
        <div class="name">
          计划名称：{{ planDetail.PlanName }}
        </div>
        <div class="name">
          开始时间：{{ planDetail.StartTime }}
        </div>
        <div class="name">
          结束时间：{{ planDetail.EndTime }}
        </div>
        <div style="margin-left: auto;color: var(--font-color)">
          <el-button
              style="background-color: var(--title-bg);margin-right: 3rem;color:rgb(100,200,200)"
              icon="el-icon-download"
              size="mini"
              @click="exportDetailReport()">
            导出报告
          </el-button>
          <span style="font-size: 1rem">告警数量：{{ planDetail.AlarmCount }}</span>
        </div>
      </div>
      <div class="countData">
        <el-table :data="planDetailArr" header-row-class-name="header-row-class" @row-click="getDetailMessage"
          row-class-name="row-class" fit highlight-current-row size="small" height="51vh"
          :empty-text="'暂无数据'">
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="AlarmCode" label="告警码" align="center">
          </el-table-column>
          <el-table-column prop="AlarmName" label="告警名称" align="center">
          </el-table-column>
          <el-table-column prop="Status" label="告警状态" align="center" width="130">
            <template slot-scope="scope">
              {{ scope.row.Status == 1 ? '发生' : scope.row.Status == 2 ? '正常恢复' : scope.row.Status == 3 ? '重启恢复' : scope.row.Status ==
                4 ? '手动接触' :scope.row.Status ==
                5 ? '重新检测恢复':scope.row.Status ==
                6 ? '归档': '异常值' }}
            </template>
          </el-table-column>
          <el-table-column prop="MaxLevel" label="告警级别" align="center" width="60">
            <template slot-scope="scope">
              {{ alarmLevelIdentify(scope.row.MaxLevel) }}
            </template>
          </el-table-column>
          <el-table-column prop="HighValue" label="最大告警值" align="center" width="120">
          </el-table-column>
          <el-table-column prop="details" label="机器名称" align="center" width="160">
            <template slot-scope="{ row }">
              <span>{{ planDetail.CarrierName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="EquipmentName" label="设备名称" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.EquipmentName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ReportTime" label="发生时间" align="center"  width="160">
            <template slot-scope="{ row }">
              <span>{{ row.ReportTime }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="RecoveryTime" label="处理时间" align="center"  width="160">
            <template slot-scope="{ row }">
              <span>{{ row.RecoveryTime }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { parseTime } from '@/utils';
import {
  getPageList,
  getPatrolFiles,
  getTaskTypeList,
  patrolRecordExportExcel,
  getAlarmListByPatrolRecordID, exportPatrolRecordDetailById
} from '@/api/inspectRecord'
import Pagination from '@/components/Pagination';
import { mapGetters } from 'vuex';
import exportReport from '@/views/exportReport/index.vue'

export default {
  components: { Pagination },
  computed: {
    exportReport() {
      return exportReport
    },
    ...mapGetters(['webSocketUrl']),
  },

  data() {
    return {
      startVal: '',
      endVal: '',
      filterOption: [
        {
          value: 0,
          label: '全部',
        },
        {
          value: 1,
          label: '告警',
        },
        {
          value: 2,
          label: '正常',
        },
      ],
      condition: 0,
      alarmInfoArr: [],
      dialogFormVisible: false,
      dialogDetailFlag: false,
      formLabelWidth: '110px',
      fileName: '',
      exportVisible: false,
      textType: 'xlsx',
      downloadLoading: false,
      options: ['xlsx', 'csv', 'txt'],
      detailForm: {
        taskName: '',
        area: '',
        location: '',
        alarmLevel: '',
        accesso: '',
        equipNumber: '',
        detectTime: '',
        inspectType: '',
        car: '',
        desc: '',
      },
      videoUrl: '',
      imageUrl: [],
      videoFlag: false,
      imageFlag: false,
      total: 0,
      page: 1,
      limit: 10,
      pageFlag: false,
      detailes: [],
      taskTypes: [],
      planDetail: {},
      planDetailArr: [],
      exportRole: false,
    };
  },
  mounted() {
    this.getTaskType();
    this.init();
  },
  methods: {
    init() {
      let self = this;
      self.alarmInfoArr = [];
      const powelist = self.$store.getters.roles
      powelist.forEach((res) => {
        if (res == 'exportPatrolData') {
          self.exportRole = true
        }
      })
      var params = {
        current: self.page,
        limit: self.limit,
        startTime: self.startVal,
        endTime: self.endVal,
        isExitAlarm: self.condition,
      };
      console.log('params',params)
      getPageList(params)
        .then((response) => {
          console.log("查看response", response)
          let recordArr = response.data.records;
          self.total = response.data.total;
          if (response.data.total > 0) {
            self.exportVisible = true;
          } else {
            self.exportVisible = false;
          }
          this.alarmInfoArr = recordArr
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
    downDialog() {
      this.dialogFormVisible = true;
      this.filename = '';
    },
    findInfo() {
      let self = this;
      this.pageFlag = true;
      self.alarmInfoArr = [];
      var params = {
        current: self.page,
        limit: self.limit,
        startTime: self.startVal,
        endTime: self.endVal,
        isExitAlarm: self.condition,
      };
      getPageList(params)
        .then((response) => {
          console.log("查看记录",response.data.records)
          let recordArr = response.data.records;
          if (response.data.total) {
            self.total = response.data.total;
            self.exportVisible = true;
          } else {
            self.exportVisible = false;
          }
          for (let i = 0, len = recordArr.length; i < len; i++) {
            let obj = {
              id: recordArr[i].id,
              planID: recordArr[i].PlanID,
              planName: recordArr[i].planName,
              taskID: recordArr[i].taskID,
              carrierID: recordArr[i].carrierID,
              carrierName: recordArr[i].carrierName,
              areaId: recordArr[i].areaID,
              area: recordArr[i].areaName,
              operateType: recordArr[i].operateType,
              detectionType: recordArr[i].detectionType,
              isAlarm: recordArr[i].alarm,
              startTime: recordArr[i].startTime,
              endTime: recordArr[i].endTime,
            };
            self.alarmInfoArr.push(obj);
          }
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
    setPage() {
      if (!this.pageFlag) {
        this.init();
      } else {
        this.findInfo();
      }
    },
    //导出巡检记录详情
    exportDetailReport(){
      console.log('this.planDetail--->',this.planDetail)
      let _this = this
      // console.log("查看导出参数",params)
      if (_this.exportRole) {
        exportPatrolRecordDetailById(this.planDetail.TaskID).then(function (res) { //导出流
          // console.log('导出的参数', params)
          _this.$notify({
            type: 'success',
            message: '导出成功',
            title: '提示',
            duration: 1000,
          });
          let blob = new Blob([res], { type: "application/vnd.ms-excel" });
          // let blob = new Blob([res]);//response.data为后端传的流文件
          let downloadFilename = '巡检报告' + _this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ".xlsx";//设置导出的文件名  用moment时间插件对文件命名防止每次都是一样的文件名
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

      } else {
        _this.$notify({
          type: 'error',
          message: '您当前未拥有系统权限',
          title: '提示',
          duration: 2000,
        });
      }
    },

    // 导出列表
    exportAll() {
      if (this.startVal == '' && this.endVal == '') {
        var params = {
          endTime: '2999-12-31 23:59:59',
          startTime: '2022-12-31 00:00:00'
        }
      }
      else {
        const stDay = this.startVal
        const endDay = this.endVal
        var params = {
          endTime: endDay,
          startTime: stDay
        }
      }
      let _this = this
      // console.log("查看导出参数",params)
      if (_this.exportRole) {
        patrolRecordExportExcel(params).then(function (res) { //导出流
          console.log('导出的参数', params)
          _this.$notify({
            type: 'success',
            message: '导出成功',
            title: '提示',
            duration: 1000,
          });
          let blob = new Blob([res], { type: "application/vnd.ms-excel" });
          // let blob = new Blob([res]);//response.data为后端传的流文件
          let downloadFilename = '巡检记录全部数据' + _this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ".xlsx";//设置导出的文件名  用moment时间插件对文件命名防止每次都是一样的文件名
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

      } else {
        _this.$notify({
          type: 'error',
          message: '您当前未拥有系统权限',
          title: '提示',
          duration: 2000,
        });
      }

    },
    // 导出本页
    formatJson(filterVal) {
      return this.alarmInfoArr.map((v) =>
        filterVal.map((j) => {
          if (j === 'detectTime') {
            return parseTime(v[j]);
          } else if (j === 'isAlarm') {
            return v[j] > 0 ? '是' : '否';
          } else {
            return v[j];
          }
        })
      );
    },

    cancel() {
      this.dialogFormVisible = false;
      this.fileName = '';
      this.textType = 'xlsx';
    },

    showDetail(item) {
      console.log("查看详情", item)
      let self = this;
      this.dialogDetailFlag = true;
      this.planDetail = item
      getAlarmListByPatrolRecordID(item.TaskID).then((res) => {
        console.log('详情id', res)
        this.planDetailArr = res.data
      })
      // this.detailForm.taskName = item.taskName
      // this.detailForm.area = item.area
      // this.detailForm.alarmLevel = item.alarmLevel
      // this.detailForm.accesso = item.accesso
      // this.detailForm.detectTime = item.detectTime
      // this.detailForm.location = item.location

    },

    alarmLevelIdentify(data){
      switch (data) {
        case 1: return "提示";
        case 2: return "一般";
        case 3: return "严重";
        case 4: return "致命";
      }
    },

    getDetailMessage(e) {
      console.log('告警信息', e)
    },

    async getTaskType() {
      await getTaskTypeList().then(res=>{
        if (res.code === 20000) {
          this.taskTypes = res.data;
        }
      })

    },
  },
};
</script>

<style lang="scss" scoped>
.equip-header {
  padding: 20px 10px;
  background-color: lightblue;
  border: 1px solid #fff;

  .equip-setting-title {
    display: inline;
  }

  .robot-setting-inquire {
    margin-left: 15px;
    display: inline-block;

    >>>.el-input {
      width: 200px !important;
    }

    >>>.el-input__inner {
      width: 200px !important;
    }

    ::v-deep .el-input__icon {
      line-height: 25px;
    }

    .filter-sty {
      display: inline-block;

      >>>.el-input {
        width: 100px !important;
      }

      >>>.el-input__inner {
        width: 100px !important;
      }
    }
  }
}
::v-deep .el-input__inner,
.el-range-editor.el-input__inner {
  color: var(--font-color);
  border: 1px solid var(--tableborder);
}

.equip-body {
  padding: 0 10px;
  // background-color: lightblue;
  border: 1px solid var(--tableborder);

  .equip-data {
    font-size: 13px;
    width: 100%;
    color: var(--font-color);
  }
}

.detail-dialog {

  ::v-deep .el-dialog {
    background-color: var(--tablebody) !important;

  }

  ::v-deep .el-dialog__body {
    margin-left: 0px;
    background-color: var(--tablebody) !important;

  }
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
  background-color: rgb(100,200,200);
}

::v-deep .el-table__body tr.current-row>td.el-table__cell {
  background-color: rgb(100,200,200);
}

::v-deep .header-row-class {
  background-color: transparent;
  height: 50px;
}

::v-deep .row-class {
  color: var(--font-color);
  background-color: transparent;
  height: 50px;
}

::v-deep .el-table thead {
  color: var(--font-color);
  .el-table__cell{
    background-color: var(--tableHead);
  }
}


::v-deep .el-table th>.cell {
  padding-left: 0;
  padding-right: 0;
}

::v-deep .el-table .cell {
  padding-left: 0;
  padding-right: 0;
}

::v-deep .el-dialog__header {
  width: 100%;
  padding: 20px;
  display: flex;
  margin-bottom: 1vh;
  background-color: var(--dialoghead) !important;
  .countData {
    margin-top: 10vh;
  }


}
  .name {
    font-size: 1rem;
    margin-left: 2%;
    color: var(--font-color);
  }


::v-deep.el-dialog__body {
  padding: 20px;
  margin-left: 90px;
}

.detail-form {
  // padding-left: 170px;
  font-size: 13px;
  font-weight: bold;
  color: black;

  ::v-deep .el-input {
    width: 200px;
  }

  .centeredVideo {
    margin-top: -10px;
  }
}

.dialog-footer {
  margin: 20px;
  text-align: center;
}

.detail-dialog-footer {
  margin: 20px;
  text-align: right;
}

::v-deep .pagination-container {
  background-color: lightblue;
  padding: 10px;
}


::v-deep .el-dialog {
  width: 1200px;
  background-color: #132B41;
  height: calc(100vh - 200px);

  .el-table .cell{
    font-size: 0.8rem;
  }
}

</style>
