<template>
  <div style="padding: 1%">
    <div class="equip-header content-header">
      <!-- <h3 class="equip-setting-title">{{ $t('inspect_record.real_alarm_list') }}</h3> -->
      <template>
        <el-radio v-model="alarmType" label="2">巡检告警</el-radio>
       <el-radio v-model="alarmType" label="1">设备告警</el-radio>
      </template>
      <div style="display: inline;">
        <el-button
          icon="el-icon-download"
          style="background-color: #15B3B4 !important;float: right;"
          type="primary"
          size="mini"
          @click="exportAll()"
          >导出列表</el-button
        >
      </div>
      <div style="display:inline;float:right">
      <el-select
        clearable
        size="mini"
        placeholder="请选择告警状态"
        v-model="alarmState"
      >
        <el-option
          v-for="item in alarmStateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input 
      style="width:10vw;margin-left: 0.1vw;"
      placeholder="请输入告警名称"
      v-model="alarmName"
      v-if="alarmType == 2"
      >
      </el-input>
      <el-input 
      style="width:10vw;margin-left: 0.1vw;"
      placeholder="请输入告警码"
      v-model="alarmCode"
      >
      </el-input>
      <el-button style="background-color: #15B3B4 " size="mini" @click.native="init()">{{
        $t('public_vary.query_label')
      }}</el-button>
      </div>

      <div style="display: inline-block;">
        <!-- <el-button
          icon="el-icon-download"
          style="background-color: #15B3B4 !important;"
          type="primary"
          size="mini"
          @click="(dialogFormVisible = true)"
          >导出本页</el-button
        > -->
      </div>
      <el-dialog 
      class="export-sty"
      :title="$t('inspect_record.export_alarm_data')"
      :visible.sync="dialogFormVisible"
    >
      <el-form label-position="left" label-width="100px">
        <el-form-item :label="$t('inspect_record.file_name')" style="margin-left:80px" >
          <el-input
            v-model="fileName"
            placeholder="请输入文件名"
            prefix-icon="el-icon-document"
          />
        </el-form-item> 
        <el-form-item :label="$t('inspect_record.text_type')" style="margin-left:80px"> 
          <el-select clearable v-model="textType" style="">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="common-form-footer">
          <el-button 
            type="primary"
            :loading="downloadLoading"
            @click="handleDownload()"
            >确认</el-button
          >
          <el-button type="primary" plain @click="(dialogFormVisible= false)">{{
            $t('inspect_record.cancel_label')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
      <!-- <el-collapse v-model="activeName" accordion>
        <el-collapse-item class="head-shrinkage" name="1">
          <template slot="title">
            <span>{{ $t('alarm_dealWith.alarm_status_label') }}：</span>
          </template>
        </el-collapse-item>
      </el-collapse> -->
    </div>
    <div class="equip-body content-body">
      <el-table
      @row-click="getDetailMessage"
        class="equip-data"
        :data="alarmInfoArr"
        header-row-class-name="header-row-class"
        row-class-name="row-class"
        fit
        height="36.5rem"
        highlight-current-row
        size="small"
        :empty-text="'暂无数据'"
      >
        <el-table-column type="index" label="序号" align="center" width="80" >
        </el-table-column>
        <el-table-column
          prop="alarmCode"
          :label="$t('alarm_dealWith.alarm_code_label')"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.alarmCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="alarmName"
          :label="$t('alarm_dealWith.alarm_name_label')"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.alarmName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="alarmStatus"
          :label="'告警状态'"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.alarmStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="maxAlarmLevel"
          :label="$t('alarm_dealWith.maxAlarm_level_label')"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.maxAlarmLevel  == 0? "默认": row.maxAlarmLevel  == 1? "提示":row.maxAlarmLevel  == 2? "一般":row.maxAlarmLevel  == 3? "严重":"致命"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="maxAlarmValue"
          :label="$t('alarm_dealWith.maxAlarm_value_label')"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.maxAlarmValue }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="machineName"
                         :label="$t('alarm_dealWith.machine_name_label')"
                         align="center">
          <template slot-scope="{row}">
            <span>{{ row.machineName }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="maxAlarmValue"
          :label="'机器名称'"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.equipmentName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="happenTime"
          :label="$t('alarm_dealWith.happen_time')"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.happenTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="RecoveryTime"
          :label="$t('alarm_dealWith.dealWith_time')"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.RecoveryTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="details" label="操作" v-if="alarmType ==2" align="center" width="120">
          <template slot-scope="{ row }"  >
            <el-button  v-if="row.statusNum== 0 || row.statusNum == 1"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              plain
              @click="showDetail(row)"
              >处理</el-button
            >
            <el-button v-else
              type="primary"
              icon="el-icon-document"
              size="mini"
              plain
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
          title="告警详情"
           :visible.sync="dialogVisible"
           width="60%"
         >
         <div style="display:flex">
          <img :src="imageUrl" alt="" style="width:70%">
          <div style="margin-left:2vw">
            <div style="margin: 1vh  0;">告警级别: 
              <span v-if="alarm.maxAlarmLevel ==4" style="border: red 1px solid; color: red;font-size: 1.2vw;">致命</span>
              <span v-if="alarm.maxAlarmLevel ==3" style="border: red 1px solid; color: orange;font-size: 1.2vw;">严重</span>
              <span v-if="alarm.maxAlarmLevel ==2" style="border: red 1px solid; color: yellow;font-size: 1vw;">一般</span>
              <span v-if="alarm.maxAlarmLevel ==1" style="border: red 1px solid; color: #08F9EB ;font-size: 1vw;">提示</span>      
            </div>
            <div style="margin: 2vh  0;">
              告警名称：{{ alarm.alarmName }}
            </div>
            <div style="margin: 3vh  0;">
              告警编号：{{ alarm.id }}
            </div>
            <div style="margin: 3vh  0;">
              告警类型：{{ alarm.alarmCode ==1001?"行人告警": alarm.alarmCode ==1002?"非机动车告警": alarm.alarmCode ==1003?"异物告警": alarm.alarmCode ==1004?"温度告警": 
            alarm.alarmCode ==1005?"湿度告警": alarm.alarmCode ==1006?"气体告警":alarm.alarmCode ==1007?"灯光告警": alarm.alarmCode ==1008?"违停逆行告警": alarm.alarmCode ==1009?"超速告警":alarm.alarmCode ==1010?"动物告警":alarm.alarmCode ==1012?"消防设备告警": alarm.alarmCode ==1011?"井盖异常告警":alarm.alarmCode ==1013?"火灾烟雾告警":"机体告警"}}
            </div>
            <div style="margin: 3vh 0;">
              事件描述：{{ alarm.Description }}
            </div>
            <div style="margin: 3vh 0;">
              告警位置：{{ alarm.X }},{{ alarm.Y }}
            </div>
            <div style="margin: 3vh  0;">
              发生时间：{{ alarm.happenTime }}
            </div>
            <div style="margin: 3vh  0;">
              修复时间：{{alarm.RecoveryTime==null?"未修复":alarm.RecoveryTime}}
            </div>
          </div>
         </div>           
            <span slot="footer" class="dialog-footer">           
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
      </el-dialog>
      <div>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="page"
          :limit.sync="limit"
          @pagination="init"
        />
      </div>
    </div>
    <!-- :visible.sync="dialogDetailFlag" -->
    <el-dialog
      :title="$t('alarm_dealWith.alarm_dealWith_label')"
      :visible.sync="dialogDetailFlag"
      class="dialog-class"
      @close="cancel()"
    >
      <el-form
        class="common-form"
        label-position="left"
        label-width="120px"
        :model="alarmForm"
        :rules="rules"
        ref="alarmForm"
      >
        <el-divider content-position="left">告警信息</el-divider>
        <el-form-item
          :label="$t('alarm_dealWith.alarm_code_label')"
          :label-width="formLabelWidth"
          prop="alarmCode"
        >
          <el-input disabled v-model="alarmForm.alarmCode"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('alarm_dealWith.alarm_name_label')"
          :label-width="formLabelWidth"
          prop="alarmName"
        >
          <el-input disabled v-model="alarmForm.alarmName"></el-input>
        </el-form-item>
        <!-- <el-divider content-position="left">巡检信息</el-divider>
        <el-form-item :label="$t('alarm_dealWith.inspection_info_label')"
                      :label-width="formLabelWidth"
                      prop="inspectionInfo">
          <el-input v-model="alarmForm.inspectionInfo"></el-input>
        </el-form-item> -->
        <el-divider content-position="left">告警处理</el-divider>
        <!-- <el-form-item
          :label="$t('alarm_dealWith.dealWith_way_label')"
          :label-width="formLabelWidth"
          prop="dealWithWay"
        >
          <el-input v-model="alarmForm.dealWithWay"></el-input>
        </el-form-item> -->
        <el-form-item
          :label="$t('alarm_dealWith.dealWith_describe_label')"
          :label-width="formLabelWidth"
          prop="dealWithDescribe"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="alarmForm.dealWithDescribe"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="common-form-footer">
          <el-button
            type="primary"
            @click="addSuccess('alarmForm', alarmForm)"
            >{{ $t('inspection_setting.sure_add_label') }}</el-button
          >
          <el-button type="primary" plain @click="cancel('alarmForm')">{{
            $t('inspection_setting.cancel_add_label')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAlarmRecordList,
  getAlarmStateList,
  getAlarmDealLog,
  getPatrolFiles,
  dealAlarm,
  exportHistoryExcel
} from '@/api/inspectRecord';

import Pagination from '@/components/Pagination';
import { mapGetters, mapState } from 'vuex';
export default {
  components: { Pagination },
  data() {
    return {
      formLabelWidth:'110px',
      activeName: '1',
      alarmState: '',
      alarmCode:null,
      alarmName:null,
      alarmStateOptions: [],
      refreshTimer: null,
      alarmInfoArr: [],
      dialogDetailFlag: false,
      detailsLog: [],
      carAlarmFlag: false,
      inspectAlarmFlag: false,
      total: 0,
      page: 1,
      limit: 10,
      detailsList: '',
      detailes: [],
      imageUrl:null,
      alarm:[],
      dialogVisible:false,
      dialogFormVisible:false,
      exportVisible:false,
      fileName: '',
      textType: 'xlsx',
      alarmType:'2',
      downloadLoading: false,
      options: ['xlsx', 'csv', 'txt'],
      swiperOptions: {
        slidesPerView: 'auto',
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
      },
      alarmForm: {
        id: '',
        patrolRecordID: '',
        alarmCode: '',
        alarmName: '',
        dealWithWay: '',
        dealWithDescribe: '',
      },
      rules: {
        dealWithWay: [
          { required: true, message: '请输入处理方式', trigger: 'change' },
        ],
        dealWithDescribe: [
          { required: true, message: '请输入处理描述', trigger: 'change' },
        ],
      },
    };
  },
    mounted() {
    this.initAlarmState();
  },
  beforeDestroy() {
    clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
  },
  watch:{
    alarmType(){
      this.init()
    }
  },

  methods: {
    init() {
      let self = this;
      let param = {
        current: self.page,
        limit: self.limit,
        status: self.alarmState,
        alarmName:self.alarmName,
        alarmCode:self.alarmCode,
        alarmType:parseInt(self.alarmType) 
      };
      getAlarmRecordList(param)
        .then((response) => {
          console.log("查看历史告警",response.data)
          self.total = response.data.total;
          if(self.total > 0){
            self.exportVisible= true
          }
          let alarmArr = response.data.records;
          let newArr = [];
          for (let i = 0, len = alarmArr.length; i < len; i++) {
            // let statusArr = ['待处理','处理中','已处理','已忽略']
            let statusArr = self.alarmStateOptions.find(
              (itme) => itme.value === alarmArr[i].Status
            ).label;
            let obj = {
              id: alarmArr[i].ID,
              alarmCode: alarmArr[i].AlarmCode,
              alarmName: alarmArr[i].AlarmName,
              maxAlarmLevel: alarmArr[i].MaxLevel,
              maxAlarmValue: alarmArr[i].HighValue,
              alarmCode:alarmArr[i].AlarmCode,
              machineName: alarmArr[i].CarrierName,
              equipmentName: alarmArr[i].CarrierName,
              alarmStatus: statusArr,
              statusNum: alarmArr[i].Status,
              X:alarmArr[i].X,
              Y:alarmArr[i].Y,
              happenTime: alarmArr[i].ReportTime,
              RecoveryTime:alarmArr[i].RecoveryTime,
              Description:alarmArr[i].Description,
              Image:alarmArr[i].Image,
              patrolRecordID: alarmArr[i].PatrolRecordID,
              vertexNumber: alarmArr[i].VertexNumber,
              locationID: alarmArr[i].LocationID,
              edgeNumber: alarmArr[i].EdgeNumber,
              alarmType: alarmArr[i].AlarmType,
             
            };

            newArr.push(obj);
          }
          self.alarmInfoArr = newArr;
          // console.log("查看处理时间",self.alarmInfoArr)
          // self.refreshTimer = setTimeout(async () => {
          //   await self.init()
          // }, 5000)
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
    async getDetailMessage(e){
      if(this.alarmType == 2){
      console.log("实时",e)
      this.alarm = e
      this.imageUrl =  'http://192.168.20.44:8888/images/' + e.Image
      console.log(this.imageUrl)
      this.dialogVisible = true
     
      }

    },
    // 告警状态
    initAlarmState() {
      let self = this;
      getAlarmStateList()
        .then((response) => {
          if (response && response.data.length) {
            self.alarmStateOptions = [];
            response.data.forEach((item) => {
              const optionObj = {
                value: item.Code,
                label: item.Desc,
              };
              self.alarmStateOptions.push(optionObj);
            });
            this.init();
          }
        })
        .catch(() => {});
    },
    // 详情
    showDetail(item) {
      // console.log("查看详情数据",item)
      let self = this;
      this.dialogDetailFlag = true;
      this.detailsList = item;
      this.alarmForm.id = item.id;
      this.alarmForm.patrolRecordID = item.patrolRecordID;
      this.alarmForm.alarmCode = item.alarmCode;
      this.alarmForm.alarmName = item.alarmName;
      getAlarmDealLog({
        alarmRecordID: item.id,
      })
        .then((response) => {
          let alarmArr = response.data;
          let newArr = [];
          for (let i = 0, len = alarmArr.length; i < len; i++) {
            let obj = {
              id: alarmArr[i].id,
              alarmCode: alarmArr[i].alarmCode,
              dealWithPe: alarmArr[i].dealPerson,
              dealWithWay: alarmArr[i].dealType,
              dealWithResults: alarmArr[i].dealResult,
              dealWithDescribe: alarmArr[i].description,
              dealWithTime: alarmArr[i].dealTime,
            };
            newArr.push(obj);
          }
          self.detailsLog = newArr;
          // self.refreshTimer = setTimeout(async () => {
          //   await self.init()
          // }, 5000)
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });

      getPatrolFiles({
        alarmRecordID: item.id,
      })
        .then(async (response) => {
          let data = response.data;
          this.videoUrl = '';
          for (let i = 0, len = data.length; i < len; i++) {
            if (data[i].FileType == 1) {
              let url = '/api/PatrolFile/GetPhotoData?fileID=' + data[i].ID;
              this.detailes.push({
                url: url,
                type: 1,
              });
            } else if (data[i].FileType == 4) {
              await this.$nextTick(() => {
                // let video = document.getElementById('detailVideo');
                // video.load();
                this.videoUrl =
                  '/api/PatrolFile/GetVideoData?fileID=' + data[i].ID;
                this.detailes.push({
                  url: this.videoUrl,
                  type: 2,
                });
                // video.play();
              });
            }
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
    // 处理
    addSuccess(alarmForm, alarmData) {
      let self = this;
      this.$refs[alarmForm].validate((valid) => {
        if (valid) {
          let param = {
            alarmCode: alarmData.alarmCode,
            alarmRecordID: alarmData.id,
            dealPerson: 'user',
            dealResult: alarmData.dealWithWay,
            description: alarmData.dealWithDescribe,
            patrolRecordID: alarmData.patrolRecordID,
          };
          dealAlarm(param)
            .then((response) => {
              // console.log("查看处理",response,param)
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '处理成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.cancel();
                self.init();
              }
            })
            .catch((error) => {
              self.cancel();
              self.$notify({
                title: self.$t('user.Failure'),
                message: self.$t('user.interface_call_failed_tip'),
                type: 'error',
                duration: 1000,
              });
            });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.alarmForm = {
        id: '',
        patrolRecordID: '',
        alarmCode: '',
        alarmName: '',
        dealWithWay: '',
        dealWithDescribe: '',
      };
    },
    cancel(alarmForm) {
      this.$refs.alarmForm.resetFields();
      this.dialogDetailFlag = false;
      this.resetForm();
    },
    // 导出列表
    exportAll(){
      let _this = this
      exportHistoryExcel({
        alarmName:this.alarmName,
        alarmCode:this.alarmCode,
        status:-1,
        alarmType:this.alarmType

      }).then( (res)=>{ //导出流
        this.$notify({
            type: 'success',
            message: '导出成功',
            title: '提示',
            duration: 1000,
          });
          console.log(res)
      let blob = new Blob([res]);
      let name = ''
      console.log(name,_this.alarmType)
      if(this.alarmType ==1){
        name = '设备告警'
      }else{
        name = '巡检告警'   
      }
      console.log('abc',name)
      // let blob = new Blob([res]);//response.data为后端传的流文件
      let downloadFilename = '历史'+ name +'数据' + _this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')+ ".xlsx";//设置导出的文件名  用moment时间插件对文件命名防止每次都是一样的文件名
   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
   //兼容ie浏览器
       window.navigator.msSaveOrOpenBlob(blob, downloadFilename)
   }else {
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

    } ,   
    // 导出本页
    handleDownload() {
      if (!this.fileName) {
        this.$notify({
          message: '请输入文件名称',
          type: 'error',
          title: '提示',
          duration: 1000,
        });
        return;
      }
      this.downloadLoading = true;
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = [
          '告警码',
          '告警名称',
          //   '区域名称',
          '告警状态',
          '最大告警级别',
          '最大告警数值',
          '设备名称',
          '发生时间',
          '处理时间'
          
        ];
        // const tHeader = ['location', 'alarmLevel', 'detectTime', 'detectType', 'details']
        const filterVal = [
          'alarmCode',
          'alarmName',
          'alarmStatus',
          'maxAlarmLevel',
          'maxAlarmValue',
          'maxAlarmValue',
          'happenTime',
          'RecoveryTime',
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.fileName,
          bookType: this.textType,
        });
        this.downloadLoading = false;
        this.fileName = '';
        this.textType = 'xlsx';
        this.dialogFormVisible = false;
      });
    },
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
  },
};
</script>

<style lang="scss" scoped>
.equip-header {
  // padding: 20px 10px;
  // background-color: lightblue;
  border: 1px solid #fff;
  >>> .el-collapse-item__content {
    padding-bottom: 10px !important;
  }

  .equip-setting-title {
    display: inline;
  }

  .robot-setting-inquire {
    margin-left: 15px;
    display: inline;

    >>> .el-input {
      width: 200px !important;
    }
    >>> .el-input__inner {
      width: 200px !important;
    }
    >>> .el-input__icon {
      line-height: 25px;
    }
  }
}


::v-deep .el-select{
  line-height: 2vh;
  font-size: 1vw;
}
::v-deep .el-form-item__error{
  line-height: 3vh !important;
}
.head-condition {
  display: inline-block;
  >>> .el-select .el-input .el-select__caret {
    line-height: 24px;
  }
  // input框中的叉叉
  >>> .el-input__icon {
    line-height: 24px;
  }
  >>> .el-input {
    width: 120px;
  }
  >>> .el-input__inner {
    width: 120px;
  }
}

.equip-body {
  padding: 0 10px;
  background-color: lightblue;
  border: 1px solid #fff;

  .equip-data {
    font-size: 13px;
    width: 100%;
    // background: rgba(1, 10, 53, 0);
    color: #301d0f;
  }
}
.detail-data {
  >>> tr {
    background-color: rgba(1, 10, 53, 0) !important;
  }
  >>> .el-table__row:hover > td {
    background-color: transparent !important;
  }
}

>>> .el-table th,
.el-table tr {
  background-color: transparent;
}

>>> .header-row-class {
  background-color: transparent;
}

>>> .row-class {
  background-color: transparent;
}

>>> .el-table thead {
  color: black;
}

>>> .el-table th > .cell {
  padding-left: 0;
  padding-right: 0;
}

>>> .el-table .cell {
  padding-left: 0;
  padding-right: 0;
}

.dialog-class {
  >>> .el-dialog {
    width: 70%;
    min-width: 700px;
  }

  ::v-deep .el-dialog__header {
    padding: 20px;
    background-color: lightgray;
  }

  ::v-deep .el-dialog__body {
    padding: 20px;
    color: #fff;
    // margin-left: 100px;
    .el-descriptions {
      color: #fff !important;
      font-size: 12px;
    }
    .el-descriptions__header {
      font-size: 13px;
      margin-bottom: 10px;
    }
    .el-descriptions__body {
      color: #fff !important;
      background-color: transparent !important;
      margin-bottom: 10px;
    }
    .el-divider__text {
      font-size: 16px;
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
.detail-form {
  // padding-left: 170px;
  font-size: 13px;
  font-weight: bold;
  color: black;

  ::v-deep .el-input {
    width: 200px;
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

// ::v-deep .pagination-container {
//   background-color: lightblue;
//   padding: 10px;
// }

.export-sty {
  ::v-deep .el-input {
    width: 200px;
  }
  ::v-deep .el-input__icon {
    line-height: 3vh !important;
    }
}

::v-deep .el-dialog {
  width: 540px;
}
</style>
