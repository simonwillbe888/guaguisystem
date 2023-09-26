<template>
  <div style="padding: 1%;">
    <div class="equip-header content-header">
      <!-- <h3 class="equip-setting-title">{{ $t('inspect_record.real_alarm_list') }}</h3> -->
      <!-- <el-select
        placeholder="请选择告警状态"
        v-model="alarmState"
        size="mini"
        clearable
      >
        <el-option
          v-for="item in alarmStateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
<!--      <template>-->
<!--        <el-radio v-model="alarmType" label="2">巡检告警</el-radio>-->
<!--        <el-radio v-model="alarmType" label="1">设备告警</el-radio>-->
<!--      </template>-->

      <toggleSwitch style="margin-left: 1rem" :labelChecked="'设备异常'" :labelUnchecked="'巡检告警'" @switchAlarm="switchAlarm" ></toggleSwitch>

      <div style="display:inline;float:right">
        <el-input style="width:10vw;margin-left: 0.1vw;" v-if="alarmType == 2" placeholder="请输入告警名称" v-model="alarmName">
        </el-input>
        <el-input style="width:10vw;margin-left: 0.1vw;" placeholder="请输入告警码" v-model="alarmCode">
        </el-input>
        <el-button
          @click.native="init()">查询</el-button>
          <el-button icon="el-icon-download"
        size="mini" @click="exportAll()">导出列表</el-button>
      </div>

      <el-dialog class="export-sty" :title="$t('inspect_record.export_alarm_data')" :visible.sync="dialogFormVisible">
        <el-form label-position="left" label-width="100px">
          <el-form-item :label="$t('inspect_record.file_name')" style="margin-left:80px">
            <el-input v-model="fileName" placeholder="请输入文件名" prefix-icon="el-icon-document" />
          </el-form-item>
          <el-form-item :label="$t('inspect_record.text_type')" style="margin-left:80px">
            <el-select clearable v-model="textType" style="width: 120px">
              <el-option v-for="item in options" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item class="common-form-footer">
            <el-button type="primary" :loading="downloadLoading" @click="handleDownload()">{{
              $t('inspect_record.will_export')
            }}</el-button>
            <el-button type="primary" plain @click="(dialogFormVisible = false)">{{
              $t('inspect_record.cancel_label')
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- <el-collapse v-model="activeName" accordion>
        <el-collapse-item class="head-shrinkage" name="1">
          <template slot="title">
            <span>{{ $t('alarm_dealWith.alarm_status_label') }}：</span>
            <el-select v-model="alarmState" clearable>
              <el-option
                v-for="item in alarmStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            &nbsp;&nbsp;
            <el-button
              type="primary"
              plain
              size="mini"
              @click.native="init()"
              >{{ $t('public_vary.query_label') }}</el-button
            >
          </template>
          <div class="head-condition">

          </div>
        </el-collapse-item>
      </el-collapse> -->
    </div>
    <div class="equip-body content-body">
      <el-table @row-click="getDetailMessage"
                class="equip-data"
                :data="alarmInfoArr"
                :empty-text="'暂无数据'"
                height="39.5rem"
                header-row-class-name="header-row-class"
                row-class-name="row-class"
                fit
                highlight-current-row
        size="small">
        <el-table-column type="index" label="序号" align="center" width="100">
        </el-table-column>
        <el-table-column prop="alarmCode" :label="$t('alarm_dealWith.alarm_code_label')" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.alarmCode }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="alarmName" :label="$t('alarm_dealWith.alarm_name_label')" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.alarmName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="alarmStatus" :label="$t('alarm_dealWith.alarm_status_label')" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.alarmStatus == 1 ? "发生" : "未知" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="maxAlarmLevel" :label="$t('alarm_dealWith.maxAlarm_level_label')" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.maxAlarmLevel == 0 ? "默认" : row.maxAlarmLevel == 1 ? "提示" : row.maxAlarmLevel == 2 ?
              "一般" : row.maxAlarmLevel == 3 ? "严重" : "致命" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="maxAlarmValue" :label="$t('alarm_dealWith.maxAlarm_value_label')" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.maxAlarmValue }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="machineName" :label="$t('alarm_dealWith.machine_name_label')" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.machineName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentName" :label="$t('alarm_dealWith.equipment_name_label')" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.equipmentName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="happenTime" :label="$t('alarm_dealWith.happen_time')" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.happenTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="details" label="操作" v-if="alarmType == 2" align="center" width="120">
          <template slot-scope="{ row }">
            <el-button class="greenButton" icon="el-icon-edit" size="mini" plain @click.stop="showDetail(row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="告警详情" :visible.sync="dialogVisible" width="60%" @close="closeDetailDialog">
        <div style="display:flex;color: var(--font-color);">
          <div style="width:70%;height: 24rem;position: relative">
            <img v-if="showImg"  :src="imageUrl" alt="" style="width:100%">
            <div v-if="!recordReload"
                 class="nvrRecord"
                 style="font-size: 1.5rem;align-items: center;justify-content: center;display: flex;">
              正在获取录像文件
            </div>
            <video
              v-show="!showImg && nvrVideoSrc != ''"
              class="nvrRecord"
              ref="nvrVideo"
              v-if="recordReload"
              :src="nvrVideoSrc"
              autoplay controls
            >
            </video>
          </div>

          <div style="margin-left:2vw">
            <div style="margin: 1vh  0;">告警级别:
              <span v-if="alarm.maxAlarmLevel == 4" style="border: red 1px solid; color: red;font-size: 1.2vw;">致命</span>
              <span v-if="alarm.maxAlarmLevel == 3"
                style="border: red 1px solid; color: orange;font-size: 1.2vw;">严重</span>
              <span v-if="alarm.maxAlarmLevel == 2" style="border: red 1px solid; color: yellow;font-size: 1vw;">一般</span>
              <span v-if="alarm.maxAlarmLevel == 1"
                style="border: red 1px solid; color: #08F9EB ;font-size: 1vw;">提示</span>
            </div>
            <div style="margin: 2vh  0;">
              告警名称：{{ alarm.alarmName }}
            </div>
            <div style="margin: 3vh  0;">
              告警编号：{{ alarm.id }}
            </div>
            <div style="margin: 3vh  0;">
              告警类型：{{
                alarm.alarmCode == 1001 ? "行人告警" : alarm.alarmCode == 1002 ? "非机动车告警" : alarm.alarmCode == 1003 ? "异物告警" :
                  alarm.alarmCode == 1004 ? "温度告警" :
                    alarm.alarmCode == 1005 ? "湿度告警" : alarm.alarmCode == 1006 ? "气体告警" : alarm.alarmCode == 1007 ? "灯光告警" :
                      alarm.alarmCode
                        == 1008 ? "违停逆行告警" : alarm.alarmCode == 1009 ? "超速告警" : alarm.alarmCode == 1010 ? "动物告警" : alarm.alarmCode
                          == 1012 ? "消防设备告警" : alarm.alarmCode == 1011 ? "井盖异常告警" : alarm.alarmCode == 1013 ? "火灾烟雾告警" : alarm.alarmCode
                            == 1014 ? "红外测温告警" : "机体告警"
              }}
            </div>
            <div style="margin: 3vh 0;">
              事件描述：{{ alarm.Description }}
            </div>
            <div style="margin: 3vh 0;">
              告警位置：{{ alarm.location }}
            </div>
            <div style="margin: 3vh  0;">
              发生时间：{{ alarm.happenTime }}
            </div>
            <div style="margin: 3vh  0;">
              修复时间：{{ alarm.RecoveryTime == null ? "未修复" : alarm.RecoveryTime }}
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <template>
            <el-button type="success" style="margin-right: 3rem" @click="playRecord(alarm)">回 看</el-button>
            <el-button v-if="alarm.statusNum == 0 || alarm.statusNum == 1"  type="primary" @click="showDetail(alarm)">处 理</el-button>
            <el-button v-else type="primary" @click="dialogVisible = false">确 定</el-button>
          </template>
        </span>
      </el-dialog>
      <div>

        <pagination v-show="total > 0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="init" />
      </div>
    </div>
    <el-dialog :title="$t('alarm_dealWith.alarm_dealWith_label')" :visible.sync="dialogDetailFlag" class="dialog-class"
      @close="cancel()">
      <el-form class="common-form" label-position="left" label-width="120px" :model="alarmForm" :rules="rules"
        ref="alarmForm">
        <el-divider content-position="left">告警信息</el-divider>
        <el-form-item :label="$t('alarm_dealWith.alarm_code_label')" :label-width="formLabelWidth" prop="alarmCode">
          <el-input disabled v-model="alarmForm.alarmCode"></el-input>
        </el-form-item>
        <el-form-item :label="$t('alarm_dealWith.alarm_name_label')" :label-width="formLabelWidth" prop="alarmName">
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
        <el-form-item :label="$t('alarm_dealWith.dealWith_describe_label')" :label-width="formLabelWidth"
          prop="dealWithDescribe">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="alarmForm.dealWithDescribe">
          </el-input>
        </el-form-item>
        <el-form-item class="common-form-footer">
          <el-button type="primary" @click="addSuccess('alarmForm', alarmForm)">{{
            $t('inspection_setting.sure_add_label')
          }}</el-button>
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
  getCurrentAlarmRecordList,
  getAlarmStateList,
  dealAlarm,
  exportExcel
} from '@/api/inspectRecord';
import Pagination from '@/components/Pagination';
import { mapGetters, mapState } from 'vuex';
import ToggleSwitch from '@/views/inspectionRecord/realTimeAlarm/toggleSwitch.vue'
export default {
  components: { ToggleSwitch, Pagination },
  data() {
    return {
      activeName: '1',
      alarmState: '',
      alarmCode: null,
      alarmName: null,
      alarmStateOptions: [],
      refreshTimer: null,
      alarmInfoArr: [],
      dialogDetailFlag: false,
      formLabelWidth: '110px',
      alarm: [],
      fileName: '',
      dialogFormVisible: false,
      exportVisible: false,
      textType: 'xlsx',
      downloadLoading: false,
      options: ['xlsx', 'csv', 'txt'],
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
      carAlarmFlag: false,
      inspectAlarmFlag: false,
      total: 0,
      page: 1,
      limit: 10,
      dialogVisible: false,
      imageUrl: null,
      showImg: true,
      nvrRecordData: {src:''},
      nvrVideoSrc: '',
      recordReload: true,
      recordTimer: null,
      recordStart: null,
      recordStop: null,
      recordTimerCount: 0,
      alarmType: '2',
      exportRole: false,
    };
  },
  computed: {
    ...mapGetters(['realTimeAlarm']),
    realTimeAlarminfo() {
      return this.realTimeAlarm[0]
    },
  },
  watch: {
    realTimeAlarminfo() {
      this.initAlarmState();
    },
    alarmType(newV, oldV) {
      this.init()
    }
  },
  beforeDestroy() {
    clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
  },
  mounted() {
    this.initAlarmState();
  },
  methods: {
    init() {
      let self = this;
      const powelist = self.$store.getters.roles
      powelist.forEach((res) => {
        if (res == 'exportRealAlarm') {
          self.exportRole = true
        }
      })
      let param = {
        current: self.page,
        limit: self.limit,
        status: self.alarmState,
        alarmCode: self.alarmCode,
        alarmName: self.alarmName,
        alarmType: parseInt(self.alarmType)

      };
      getCurrentAlarmRecordList(param)
        .then((response) => {
          console.log("查看实时告警参数", response)
          self.total = response.data.total;
          if (self.total > 0) {
            self.exportVisible = true
          }
          let alarmArr = response.data.records;
          let newArr = [];
          for (let i = 0, len = alarmArr.length; i < len; i++) {
            if (alarmArr[i].Status == 0 || alarmArr[i].Status == 1) {

              let obj = {
                id: alarmArr[i].ID,
                alarmCode: alarmArr[i].AlarmCode,
                alarmName: alarmArr[i].AlarmName,
                maxAlarmLevel: alarmArr[i].MaxLevel,
                maxAlarmValue: alarmArr[i].HighValue,
                machineName: alarmArr[i].CarrierName,
                equipmentName: alarmArr[i].EquipmentName,
                alarmStatus: alarmArr[i].Status,
                statusNum: alarmArr[i].Status,
                X: alarmArr[i].X,
                Y: alarmArr[i].Y,
                happenTime: alarmArr[i].ReportTime,
                RecoveryTime: alarmArr[i].RecoveryTime,
                Description: alarmArr[i].Description,
                Image: alarmArr[i].Image,
                patrolRecordID: alarmArr[i].PatrolRecordID,
                vertexNumber: alarmArr[i].VertexNumber,
                locationID: alarmArr[i].LocationID,
                location: alarmArr[i].Location,
                edgeNumber: alarmArr[i].EdgeNumber,
                alarmType: alarmArr[i].AlarmType,

              };
              newArr.push(obj);

            }

            // if (alarmArr[i].AlarmType === 1) {
            //   obj.produceLimit = alarmArr[i].occurThreshold
            //   obj.restoreLimit = alarmArr[i].recoveryThreshold
            //   obj.fault = alarmArr[i].isFaultEnum
            // } else if (alarmArr[i].alarmType === 3) {
            //   obj.setID = alarmArr[i].alarmSetID
            //   obj.area = alarmArr[i].areaId
            //   obj.dataID = alarmArr[i].recordID
            //   obj.detailID = alarmArr[i].recordDetailId
            //   obj.alarmValue = alarmArr[i].patrolValue
            //   obj.code = alarmArr[i].detectPointCode
            // }

          }
          self.alarmInfoArr = newArr;
          self.refreshTimer = setTimeout(async () => {
            await self.init();
          }, 60000);
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
    getDetailMessage(e) {
      if (this.alarmType == 2) {
        console.log("实时", e)
        this.alarm = e
        if(e.alarmCode == 1014){
          this.imageUrl = process.env.VUE_APP_BASE_API + '/images/' + e.Image
        }
        else{
          this.imageUrl ='http://'+ this.$store.state.global.fileAddress + ':8888/images/' + e.Image
        }
        this.dialogVisible = true
      }
    },
    switchAlarm(e){
      if(e){
        this.alarmType = 2
      }else {
        this.alarmType = 1
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
            // for (let i = 0, len = response.data.length; i < len; i++) {
            // for (let i = 0; i < 2; i++) {
            // }
          }
        })
        .catch(() => { });
    },
    // 处理
    showDetail(item) {
      this.dialogDetailFlag = true;
            this.dialogDetailFlag = true;

      this.alarmForm.id = item.id;
      this.alarmForm.patrolRecordID = item.patrolRecordID;
      this.alarmForm.alarmCode = item.alarmCode;
      this.alarmForm.alarmName = item.alarmName;
    },
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
              console.log("查看处理", param)
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '处理成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.cancel();
                self.init();
                self.dialogVisible = false
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
    //导出全部
    exportAll() {
      let _this = this
      if (_this.exportRole) {
        exportExcel({
        alarmName: this.alarmName,
        alarmCode: this.alarmCode,
        alarmType: parseInt(this.alarmType)
      }).then(function (res) { //导出流
        _this.$notify({
          type: 'success',
          message: '导出成功',
          title: '提示',
          duration: 1000,
        });
        let name = ''
        if (_this.alarmType == 1) {
          name = '设备告警'
        } else {
          name = '巡检告警'
        }
        let blob = new Blob([res], { type: "application/vnd.ms-excel" });
        // let blob = new Blob([res]);//response.data为后端传的流文件
        let downloadFilename = '实时' + name + '数据' + _this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ".xlsx";//设置导出的文件名  用moment时间插件对文件命名防止每次都是一样的文件名
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
      else{
        _this.$notify({
          type: 'error',
          message: '您当前未拥有系统权限',
          title: '提示',
          duration: 2000,
        });
      }


    },
    // 导出本页
    handleDownload() {
      let self = this
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
          '告警级别',
          '最大告警数值',
          '机器名称',
          '设备名称',
          '发生时间'

        ];
        // const tHeader = ['location', 'alarmLevel', 'detectTime', 'detectType', 'details']
        const filterVal = [
          'alarmCode',
          'alarmName',
          'alarmStatus',
          'maxAlarmLevel',
          'maxAlarmValue',
          'machineName',
          'equipmentName',
          'happenTime',
        ];
        const data = self.formatJson(filterVal);
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


    //录像预览
    playRecord(row){
      if(!this.showImg){
        this.showImg = true
        return
      }

      this.showImg = false

      console.log("查看详情数据",row)

      this.nvrVideoSrc= row.id+'.mp4'
      // this.nvrVideoSrc= '/static/video/'+row.id+'.mp4'
      this.$refs.nvrVideo.load()
      // this.$refs.nvrVideo.onerror = function(){
      //   this.recordReload = false
      // }
      // this.$nextTick(()=>{
      // })
      // console.log("this.nvrRecordData--->",this.nvrRecordData)

      this.$forceUpdate()

      // this.nvrRecordData= {src:''}
      //
      // if(this.recordTimer){
      //   clearInterval(this.recordTimer)
      // }
      // let alarmTime = new Date(row.happenTime).getTime()
      // // let alarmTime = moment(row).format("YYYY-MM-DD HH:mm:ss")
      // console.log('row.happenTime--->',row.happenTime)
      // console.log('alarmTime--->',alarmTime)
      //
      // this.recordStart = alarmTime-1000*10
      // this.recordStop = alarmTime+1000*10
      //
      // let startTime = moment(this.recordStart).format("YYYY-MM-DD HH:mm:ss").replace(/-|:|\.\d+/g, '').replace(' ','T')+'Z'
      // let endTime  = moment(this.recordStop).format("YYYY-MM-DD HH:mm:ss").replace(/-|:|\.\d+/g, '').replace(' ','T')+'Z'
      // let channel = '101'
      // let webRtcIP = window.location.hostname
      // let port = '554'
      // // console.log('playRecord---webRtcIP',webRtcIP)
      // // if (webRtcIP == 'localhost' || webRtcIP == '127.0.0.1'){
      //   webRtcIP = '192.168.20.23'
      // // }
      // let nvrData = {
      //   userName: "user",
      //   passWord: "password2023",
      //   ip: "192.168.20.65",
      // }
      // this.nvrRecordData = {src : `/static/record.html?data=`+encodeURIComponent(`rtsp://${nvrData.userName}:${nvrData.passWord}@${nvrData.ip}:${port}/Streaming/tracks/${channel}?starttime=${startTime}&endtime=${endTime}`)+`&serve=${webRtcIP}`}
      //
      // this.reloadIframe()
    },

    //重载iframe
    reloadIframe(){
      this.recordReload = false
      this.$forceUpdate()
      let webRtcIP = window.location.hostname
      // console.log('reloadIframe---webRtcIP',webRtcIP)
      // if (webRtcIP == 'localhost' || webRtcIP == '127.0.0.1'){
      //   webRtcIP = '192.168.20.23'
      // }
      this.getPeerConnectionList(webRtcIP)
      setTimeout(()=>{
        this.recordReload = true
        this.$forceUpdate()
      },100)
    },

    //获取webrtcstreamer中正在播放的连接
    getPeerConnectionList(srvurl){
      fetch('http://'+srvurl+ ':8001'+'/api/getPeerConnectionList')
        .then((response) => response.json())
        .then((response) => {
          // console.log('getPeerConnectionList--->',response)
          if(response.length > 0){
            response.forEach((item,index) => {
              // console.log(Object.keys(item)[0])
              let peer = Object.keys(item)[0]
              //踢掉所有播放连接
              fetch('http://'+srvurl + ':8001'+'/api/hangup?peerid=' + peer)
                .then((res)=>{
                  console.log('断连hangup '+peer,res)
                })
                .catch((error) => this.onError('hangup ' + error));
            })
          }
        })
        .catch((e) => {
          console.log('获取所有链接失败 ',e)});
    },

    //视频开始播放的触发方法
    onVideoLoaded(){
      if(this.recordTimer){
        clearInterval(this.recordTimer)
      }
      let video = this.$refs.nvrRecord.contentDocument.getElementById('video')
      console.log('onVideoLoaded---->',video)
      if(video != null){

        //视频播放计时器
        this.recordTimer = setInterval(()=>{
          if(!this.dialogVisible){
            clearInterval(this.recordTimer)
          }

          if(video.currentTime >= this.recordTotalTime && !this.autoContinuePlay){
            //视频播放时长超过视频播放时间就暂停
            clearInterval(this.recordTimer)
            video.pause()
          }
          // else {
          //   //其他情况暂停播放
          //   clearInterval(this.recordTimer)
          //   video.pause()
          // }
          // console.log("recordNow",recordNow)

          // 播放重载定时器 设定一直不播放10秒后自动重载
          if(video.currentTime == 0){
            // console.log('this.recordTimerCount',this.recordTimerCount)
            this.recordTimerCount ++
            if(this.recordTimerCount > 20){
              console.log('iframe reload')
              this.recordTimerCount = 0
              this.reloadIframe()
            }
          }else {
            this.recordTimerCount = 0
          }
        },500)
      }
    },

    closeDetailDialog(){
      this.showImg = true
      console.log("this.showImg ",this.showImg)
      if(this.recordTimer){
        clearInterval(this.recordTimer)
      }
      let rtcURL = window.location.hostname
      // rtcURL = '192.168.20.23'
      this.getPeerConnectionList(rtcURL)
    },

  },
};
</script>

<style lang="scss" scoped>
.equip-header {
  // padding: 20px 10px;
  // background-color: lightblue;
  border: 1px solid #fff;

  >>>.el-collapse-item__content {
    padding-bottom: 10px !important;
  }

  .equip-setting-title {
    display: inline;
  }

  .robot-setting-inquire {
    margin-left: 15px;
    display: inline;

    >>>.el-input {
      width: 200px !important;
    }

    >>>.el-input__inner {
      width: 200px !important;
    }

    ::v-deep .el-input__icon {
      line-height: 25px;
    }
  }
}

::v-deep .el-input {
  line-height: 3.33vh;
}

.head-shrinkage {
  >>>.el-select .el-input .el-select__caret {
    line-height: 24px;
  }

  // input框中的叉叉
  >>>.el-input__icon {
    line-height: 24px;
  }

  >>>.el-input {
    width: 120px;
  }

  >>>.el-input__inner {
    width: 120px;
  }
}

::v-deep .el-input__inner,
.el-range-editor.el-input__inner {
  color: #fff;
}
.head-condition {
  display: inline-block;

  >>>.el-select .el-input .el-select__caret {
    line-height: 24px;
  }

  // input框中的叉叉
  >>>.el-input__icon {
    line-height: 24px;
  }

  >>>.el-input {
    width: 120px;
  }

  >>>.el-input__inner {
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
    background: rgba(1, 10, 53, 0);
    color: #301d0f;
  }
}

>>>.el-table th,
.el-table tr {
  background-color: transparent;
}

::v-deep .header-row-class {
  background-color: transparent;
  height:50px;
}

::v-deep .row-class {
  background-color: transparent;
  height:50px;
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
  >>>.el-dialog__header {
    padding: 20px;
    background-color: lightgray;
  }

  >>>.el-dialog__body {
    padding: 20px;
    // margin-left: 100px;
  }

  .common-form {
    margin: 0 auto;
    padding: 0px;
  }


  >>>.el-select .el-input .el-select__caret {
    line-height: 24px;
  }

  // input框中的叉叉
  ::v-deep .el-input__icon {
    line-height: 3vh;
  }

  >>>.el-input {
    width: 160px;
  }

  >>>.el-input__inner {
    width: 160px;
  }

  >>>.common-form-footer {
    margin: 10px auto 0;
  }

  >>>.is-required {
    margin-bottom: 20px;
  }
}

.detail-form {
  // padding-left: 170px;
  font-size: 13px;
  font-weight: bold;
  color: black;

  >>>.el-input {
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

>>>.pagination-container {
  background-color: lightblue;
  padding: 10px;
}

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

.nvrRecord{
  background-color: #000000;
  width: 100%;
  border: none;
  display: inline-block;
  margin-top: 1rem;
}

</style>
