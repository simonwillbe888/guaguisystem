<template>
  <div style="padding: 1%">
    <div class="robot-header content-header">
      <!-- <h3 class="alarm-setting-title">{{ $t('alarm_setting.alarm_standard_settings') }}</h3> -->
      <el-button
          style="width: 8vw;background-color: #15B3B4;"
          class="robot-operate"
          icon="el-icon-plus"
          type="success"
          size="mini"
          @click="addAlarmWindow()"
          >添加告警</el-button
        > 
      <div class="alarm-setting-inquire">
        <!-- <span>{{ $t('alarm_setting.alarm_type_label') }}：</span> -->
        <el-select
          clearable
          placeholder="请选择告警类型"
          v-model="alarmType"
          size="mini"
        >
          <el-option
            v-for="item in alarmTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- &nbsp;&nbsp;
        <span>{{ $t('alarm_setting.alarmLevel_label') }}：</span> -->
        <el-select
          class="access-select"
          v-model="alarmLevel1"
          placeholder="请选择告警级别"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in alarmLevelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- &nbsp;&nbsp;
        <span>{{ $t('alarm_setting.equipment_type_label') }}：</span> -->
        <el-select
          placeholder="请选择设备类型"
          clearable
          size="mini"
          v-model="equipmentType"
        >
          <el-option
            v-for="item in equipmentTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          style="margin: 0px"
          type="success"
          size="mini"
          @click="init()"
          >查询</el-button
        >

      </div>
    </div>
    <div class="robot-body content-body">
      <el-table
        class="warn-data"
        :data="alarmInfoArr"
        header-row-class-name="header-row-class"
        row-class-name="row-class"
        fit
        size="small"
        :empty-text="'暂无数据'"
        height="36.5rem"
      >
        <el-table-column type="index" label="序号" align="center" width="150">
        </el-table-column>
        <el-table-column
          prop="alarmID"
          :label="$t('alarm_setting.alarmID_label')"
          align="center"
          width="100"
        >
          <template slot-scope="{ row }">
            <span>{{ row.AlarmCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="AlarmName"
          :label="$t('alarm_setting.alarm_name_label')"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.AlarmName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="AlarmType"
          :label="'告警类型'"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.AlarmType ==1001?"行人告警": row.AlarmType ==1002?"非机动车告警": row.AlarmType ==1003?"异物告警": row.AlarmType ==1004?"温度告警": 
            row.AlarmType ==1005?"湿度告警": row.AlarmType ==1006?"气体告警":row.AlarmType ==1007?"灯光告警": row.AlarmType ==1008?"违停逆行告警": row.AlarmType ==1009?"超速告警":row.AlarmType ==1010?"动物告警":row.AlarmType ==1012?"消防设备告警": row.AlarmType ==1011?"井盖异常告警":row.AlarmType ==1013?"火灾烟雾告警":row.AlarmType ==1014?"红外测温告警":"机体告警" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="DeviceType"
          :label="'设备类型'"
          align="center"
        >
          <template scope="{ row }">
            <span>{{ row.DeviceType == 1?"可见光摄像头":row.DeviceType == 1?"可见光摄像头":row.DeviceType == 2?"红外摄像头":row.DeviceType == 3?"气体传感器":row.DeviceType == 4?"温湿度传感器":"激光雷达"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="AlarmLevel"
          :label="'告警级别'"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.AlarmLevel == 0? "默认":  row.AlarmLevel == 1? "提示": row.AlarmLevel == 2? "一般": row.AlarmLevel == 3? "严重":"致命"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="OccurThreshold"
          :label="'告警产生门限'"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.OccurThreshold/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="RecoveryThreshold"
          :label="$t('alarm_setting.alarm_repair_label')"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.RecoveryThreshold/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center" width="300" >
          <template slot-scope="{ row }">
            <!-- <el-button
              class="robot-operate"
              type="primary"
              icon="el-icon-setting"
              size="mini"
              @click="configAccesso(row)"
              >详情配置</el-button
            > -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              plain
              @click="editAlarm(row)"
              >{{ $t('plan_config.edit_label') }}</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteAlarmSetting(row)"
              >{{ $t('plan_config.delete_label') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
    <!-- 新增修改 -->
    <el-dialog
      :title="
        dialogType == 'addAlarmTask'
          ? $t('alarm_setting.addAlarm_label')
          : $t('alarm_setting.editAlarm_label')
      "
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      class="dialog-class"
      @close="cancel()"
    >
      <el-form
        class="common-form"
        label-width="120px"
        :model="alarmForm"
        :rules="rules"
        ref="alarmForm"
        style="margin-left: 13%"
      >
        <!-- <el-form-item
          :label="$t('alarm_setting.alarmID_label')"
          :label-width="formLabelWidth"
          prop="AlarmCode"
        >
          <el-input
            v-model="alarmForm. AlarmCode"
            placeholder="请输入告警码"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
          ></el-input>
        </el-form-item> -->
        <el-form-item
          :label="$t('alarm_setting.alarm_name_label')"
          :label-width="formLabelWidth"
          prop="AlarmName"
        >
          <el-input
            placeholder="请输入告警名称"
            v-model="alarmForm.AlarmName"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('alarm_setting.alarm_type_label')"
          :label-width="formLabelWidth"
          prop="AlarmType"
        >
          <el-select
            clearable
            placeholder="请选择告警类型"
            v-model="alarmForm.AlarmType"
          >
            <el-option
              v-for="item in alarmTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="alarmForm.AlarmType==1006"
          :label="'气体类型'"
          :label-width="formLabelWidth"
          prop="gasType"
        >
          <el-select
            clearable
            placeholder="请选择气体类型"
            v-model="alarmForm.gasType"
          >
            <el-option
              v-for="item in gasOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('alarm_setting.equipment_type_label')"
          :label-width="formLabelWidth"
          prop="DeviceType"
        >
          <el-select
            placeholder="请选择设备类型"
            v-model="alarmForm.DeviceType"
            clearable
          >
            <el-option
              v-for="item in equipmentTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('alarm_setting.alarmLevel_label')"
          :label-width="formLabelWidth"
          prop="AlarmLevel"
        >
          <el-select
            placeholder="请选择告警级别"
            v-model="alarmForm.AlarmLevel"
            clearable
          >
            <el-option
              v-for="item in alarmLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item :label="$t('alarm_setting.alarm_area_label')"
                      :label-width="formLabelWidth"
                      prop="alarmArea">
          <el-input v-model="alarmForm.alarmArea" placeholder="请输入数字"></el-input>
        </el-form-item> -->
        <el-form-item
          :label="'告警产生门限'"
          :label-width="formLabelWidth"
          prop="OccurThreshold"
        >
          <el-input
            v-model="alarmForm.OccurThreshold"
            placeholder="请输入告警上限值"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('alarm_setting.alarm_repair_label')"
          :label-width="formLabelWidth"
          prop="RecoveryThreshold"
        >
          <el-input
            v-model="alarmForm.RecoveryThreshold"
            placeholder="请输入告警修复门限值"
          ></el-input>
        </el-form-item>
        <el-form-item class="common-form-footer">
          <el-button
            type="primary"
            @click="
              dialogType === 'addAlarmTask'
                ? addSuccess(alarmForm)
                : editSuccess(alarmForm)
            "
            >确定</el-button
          >
          <el-button type="primary" plain @click="cancel('alarmForm')">{{
            $t('inspection_setting.cancel_add_label')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 关联操作--明细 -->
  </div>
</template>

<script>
import {
  getAlarmSetList,
  getDeleteAlarmSet,
  getAlarmTypeList,
  getDeviceTypeList,
  getAlarmLevelList,
  getAddAlarmSet,
  getUpdateAlarmSet,
  getAlarmSetDetailList,
  getDealModeList,
  getUpdateAlarmSetDetail,
} from '@/api/alarm';
import Pagination from '@/components/Pagination';

export default {
  components: { Pagination },
  data() {
    return {
      alarmType: '',
      alarmLevel1: '',
      equipmentType: '',
      alarmInfoArr: [],
      // 新增
      dialogFormVisible: false,
      formLabelWidth: '110px',
      dialogType: '',
      alarmForm: {
        id: '',
        alarmCode: '',
        alarmName: '',
        alarmType: '',
        equipmentType: '',
        alarmLevel: '',
        alarmArea: '',
        alarmProduce: '',
        alarmRepair: '',
      },
      alarmTypeOptions: [],
      equipmentTypeOptions: [],
      alarmLevelOptions: [],
      gasOption:[{
        label:'甲烷',
        value:1,
      },
      {
        label:'一氧化碳',
        value:2,
      },{
        label:'氢气',
        value:3,
      },{
        label:'硫化氢',
        value:4,
      }],
      rules: {
        // AlarmCode: [
        //   { required: true, message: '请输入告警码', trigger: 'change' },
        // ],
        AlarmName: [
          { required: true, message: '请输入告警名称', trigger: 'change' },
        ],
        AlarmType: [
          { required: true, message: '请选择告警类型', trigger: 'change' },
        ],
        DeviceType: [
          { required: true, message: '请选择设备类型', trigger: 'change' },
        ],
        AlarmLevel: [
          { required: true, message: '请选择告警级别', trigger: 'change' },
        ],
        AlarmArea: [
          { required: true, message: '请输入告警区域', trigger: 'change' },
        ],
        gasType:[
        { required: true, message: '请输入告警区域', trigger: 'change' },
        ],
        OccurThreshold: [
          {  message: '请输入告警产生门限', trigger: 'change' },
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的格式,可保留两位小数' }
        ],
        RecoveryThreshold: [
          {  message: '请输入告警修复门限', trigger: 'change' },
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的格式,可保留两位小数' }
        ],
      },
      // 关联操作--明细
      dialogAccessFlag: false,
      alarmLevel: '',
      processMode: '',
      upperLimit: '',
      lowerLimit: '',
      processModeOptions: [],
      detailInfoArr: [],
      ID: '',
      total: 0,
      page: 1,
      limit: 10,
      totalDetail: 0,
      pageDetail: 1,
      limitDetail: 10,
    };
  },
  mounted() {
    // this.initAlarmSet();
    this.initSelect();
  },
  methods: {
    init() {
      let self = this;
      // console.log("查看告警级别",this.alarmLevel1)
      let param = {
        current: self.page,
        limit: self.limit,
        alarmType: self.alarmType || -1,
        alarmLevel: self.alarmLevel1,
        deviceType: self.equipmentType !== '' ? self.equipmentType : -1,
      };
      getAlarmSetList(param)
        .then((response) => {
          self.total = response.data.total;
           this.alarmInfoArr = (response.data || {}).records;
           console.log("查看数据",this.alarmInfoArr)

        })
        .catch((error) => {
          //   self.$notify({
          //     title: self.$t('user.Failure'),
          //     message: self.$t('user.interface_call_failed_tip'),
          //     type: 'error',
          //     duration: 2000,
          //   });
        });
    },
    // 告警类型、设备类型、级别、处理方式
    initSelect() {
      let self = this;
      self.alarmTypeOptions = [];
      self.equipmentTypeOptions = [];
      self.alarmLevelOptions = [];
      getAlarmTypeList()
        .then((response) => {
          console.log("查看告警类型",response)
          if (response && response.data.length) {
            self.alarmTypeOptions = [];
            response.data.forEach((item) => {
              const optionObj = {
                value: item.Code,
                label: item.Desc,
              };
              self.alarmTypeOptions.push(optionObj);
            });
          }
        })
        .catch(() => {});
      // 设备类型
      getDeviceTypeList()
        .then((response) => {

          if (response && response.data.length) {
            self.equipmentTypeOptions = [];
            response.data.forEach((item) => {
              const optionObj = {
                value: item.Code,
                label: item.Desc,
              };
              self.equipmentTypeOptions.push(optionObj);
            });
            // console.log("查看设备类型",this.equipmentTypeOptions)
          }
        })
        .catch(() => {});
      // 级别
      getAlarmLevelList()
        .then((response) => {
          if (response && response.data.length) {
            self.alarmLevelOptions = [];
            response.data.forEach((item) => {
              const optionObj = {
                value: item.Code,
                label: item.Desc,
              };
              self.alarmLevelOptions.push(optionObj);
            });
          }
        })
        .catch(() => {});
      // 处理方式
      getDealModeList()
        .then((response) => {
          if (response && response.data.length) {
            self.processModeOptions = [];
            response.data.forEach((item) => {
              const optionObj = {
                value: item.Code,
                label: item.Desc,
              };
              self.processModeOptions.push(optionObj);
            });
          }
          self.init();
        })
        .catch(() => {});
    },
    // 删除
    deleteAlarmSetting(item) {
      let self = this;
      this.$confirm(
        self.$t('public_vary.delete_operate_tip'),
        self.$t('public_vary.warning_tip'),
        {
          confirmButtonText: self.$t('public_vary.sure_label'),
          cancelButtonText: self.$t('public_vary.cancel_label'),
          type: 'warning',
        }
      )
        .then(() => {
          let param = item.ID;
          // console.log("删除ID",param)
          getDeleteAlarmSet(param)
            .then((response) => {
              let data = response.data;
              if (response.code === 20000) {
                self.init();
                this.$notify({
                  title: '提示',
                  type: 'success',
                  message: '删除成功！',
                  duration: 1000,
                });
              }
            })
            .catch(() => {
              self.$notify({
                title: self.$t('user.Failure'),
                message: self.$t('user.interface_call_failed_tip'),
                type: 'error',
                duration: 1000,
              });
            });
        })
        .catch(() => {});
    },
    addAlarmWindow() {
      this.dialogFormVisible = true;
      this.dialogType = 'addAlarmTask';
    },

    // 新增成功
    addSuccess(alarmForm) {
      let self = this;
      this.$refs.alarmForm.validate((valid) => {
        if (valid) {
          let param = {
            alarmCode: Number(alarmForm.AlarmType),
            alarmName: alarmForm.AlarmName,
            alarmType: alarmForm.AlarmType,
            deviceType: alarmForm.DeviceType,
            alarmLevel: Number(alarmForm.AlarmLevel),
            // areaId: Number(alarmForm.alarmArea),
            occurThreshold: alarmForm.OccurThreshold*100,
            recoveryThreshold: alarmForm.RecoveryThreshold*100,
          };
          console.log("查看新增数据",param)
          getAddAlarmSet(param)
            .then((response) => {
              if (response.code === 20000) {
                this.cancel();
                let data = response.data;
                self.init();
                this.$notify({
                  message: '新增成功！',
                  type: 'success',
                  duration: 1000,
                  title: '提示',
                });
              }
            })
            .catch((error) => {
              this.cancel();
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
    editAlarm(obj) {
  
      if (obj) {
        this.dialogFormVisible = true;
        this.dialogType = 'editAlarmTask';
        this.alarmForm = { ...obj };
      }
          console.log("查看修改的数据",this.alarmForm)
          this.alarmForm.OccurThreshold=  this.alarmForm.OccurThreshold/100
          this.alarmForm.RecoveryThreshold = this.alarmForm.RecoveryThreshold/100
    },
    // 修改成功
    editSuccess(alarmData) {
      let self = this;
      
      this.$refs.alarmForm.validate((valid) => {
        if (valid) {
          let param = {
            id: Number(alarmData.ID),
            alarmCode: Number(alarmData.AlarmType),
            alarmName: alarmData.AlarmName,
            alarmType: alarmData.AlarmType,
            deviceType: alarmData.DeviceType,
            alarmLevel: Number(alarmData.AlarmLevel),
            // areaId: Number(alarmData.alarmArea),
            occurThreshold: alarmData.OccurThreshold*100,
            recoveryThreshold: alarmData.RecoveryThreshold*100,
            gasType:alarmData.gasType
          };
          getUpdateAlarmSet(param)
            .then((response) => {
              console.log('修改的参数',param)
              if (response.code === 20000) {
                this.cancel();
                self.init();
                this.$notify({
                  type: 'success',
                  message: '修改成功！',
                  title: '提示',
                  duration: 1000,
                });
              }
            })
            .catch((error) => {
              this.cancel();
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
        alarmCode: '',
        alarmName: '',
        alarmType: '',
        deviceType: '',
        alarmLevel: '',
        alarmArea: '',
        alarmProduce: '',
        alarmRepair: '',
      };
    },
    cancel(alarmForm) {
      this.$refs.alarmForm.resetFields();
      this.dialogFormVisible = false;
      this.resetForm();
    },
    filterLevelOptions() {
      if (this.alarmLevelOptions.length) {
        this.alarmLevelOptions.forEach((node) => {
          node.disabled = false;
          if (this.detailInfoArr.length) {
            this.detailInfoArr.forEach((item) => {
              if (node.value === item.alarmLevel) {
                node.disabled = true;
              }
            });
          }
        });
      }
    },
  
    // 明细中的添加
    addDetail() {
      if (
        this.alarmLevel === '' ||
        this.processMode === '' ||
        this.upperLimit === '' ||
        this.lowerLimit === ''
      ) {
        return this.$notify({
          type: 'error',
          message: '请添加关联数据！',
          title: '提示',
          duration: 1000,
        });
      }
      let levelName = this.alarmLevelOptions.find(
        (item) => item.value === this.alarmLevel
      ).label;
      let modeName = this.processModeOptions.find(
        (item) => item.value === this.processMode
      ).label;
      let detailObj = {
        levelName: levelName,
        modeName: modeName,
        alarmLevel: this.alarmLevel,
        processMode: this.processMode,
        upperLimit: this.upperLimit,
        lowerLimit: this.lowerLimit,
      };
      this.detailInfoArr.push(detailObj);
      this.resetDetail();
      this.filterLevelOptions();
    },
    // 明细-删除
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.filterLevelOptions();
    },
    // 编辑明细
    addDetailSuccess() {
      let self = this;
      let detailList = [];
      for (let i = 0, len = this.detailInfoArr.length; i < len; i++) {
        let detailObj = {
          alarmLevel: this.detailInfoArr[i].alarmLevel,
          dealMode: this.detailInfoArr[i].processMode,
          lowValue: this.detailInfoArr[i].lowerLimit,
          upperValue: this.detailInfoArr[i].upperLimit,
          alarmSetID: Number(this.ID),
        };
        detailList.push(detailObj);
      }
      var param = {
        alarmSetID: Number(this.ID),
        detailList: detailList ? detailList : [],
      };
      console.log("查看参数",param,self.detailInfoArr)
      getUpdateAlarmSetDetail(param)
        .then((response) => {
          let data = response.data;
          //   self.init();
          if (response.code === 20000) {
            self.closeDetail();
            this.$notify({
              title: this.$t('user.Success'),
              message: this.$t(data),
              type: 'success',
              duration: 1000,
            });
          }
        })
        .catch((error) => {
          //   console.log(error, '--------00');
          //   self.closeDetail();
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    // 关闭明细
    closeDetail() {
      this.dialogAccessFlag = false;
      this.resetDetail();
    },
    resetDetail() {
      this.alarmLevel = '';
      this.processMode = '';
      this.upperLimit = '';
      this.lowerLimit = '';
    },
    //输入小数点正则
    formatNum(val,key){
      let temp = val.toString();
      temp = temp.replace(/。/g, ".");
  temp = temp.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
  temp = temp.replace(/^\./g, ""); //验证第一个字符是数字
  temp = temp.replace(/\.{2,}/g, ""); //只保留第一个, 清除多余的
  temp = temp.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
  this.form[key] = temp;


    }
  },
};
</script>

<style lang="scss" scoped>
.pagination-container {
  padding: 5px 15px;
  overflow: auto;
}
// >>> .content-body {
//   padding: 0px !important;
// }
.robot-header {
  padding:5px 10px 10px 10px;
  background-color: lightblue;
  border: 1px solid #fff;
  .alarm-setting-title {
    display: inline;
  }
  .alarm-setting-inquire {
    display: inline;
    float: right;
    .alarm-inquire {
      width: 140px;
      margin-right: 10px;
    }
    .el-select {
      margin-right: 10px;
    }

    >>> .el-select .el-input .el-select__caret {
      line-height: 24px;
    }
    // input框中的叉叉
    >>> .el-input__icon {
      line-height: 24px;
    }
    >>> .el-input {
      //   width: 200px;
      //   padding-right: 10px;
    }
    >>> .el-input__inner {
      width: 160px;
    }
  }
}
.robot-body {
  padding: 0 10px;
  background-color: lightblue;
  border: 1px solid #fff;
  .warn-data {
    font-size: 13px;
    width: 100%;
    background: rgba(1, 10, 53, 0);
    color: #301d0f;
  }
}
.dialog-class {
  ::v-deep .el-dialog {
    width: 520px;
    // min-width: 600px;
  }

  // >>> .common-form{
  ::v-deep .el-form-item {
    margin-bottom: 10px !important;
  }
  // }
  ::v-deep .el-select .el-input .el-select__caret {
    line-height: 24px;
  }
  // input框中的叉叉
  ::v-deep .el-input__icon {
    line-height: 24px;
  }
  ::v-deep .el-input {
    width: 210px;
  }
  ::v-deep .el-input__inner {
    width: 220px;
  }
}
.access-dialog {
  // >>> .el-dialog {
  //   width: 40vw;
  //   // min-width: 600px;
  // }

  ::v-deep .el-select .el-input .el-select__caret {
    line-height: 2vh;
  }
  // input框中的叉叉
  ::v-deep .el-input__icon {
    line-height: 2vh;
  }
  ::v-deep .el-input {
    width: 160px;
  }
  ::v-deep .el-input__inner {
    width: 160px;
  }
}
// >>> .el-input {
//   width: 200px;
// }
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

>>> .el-dialog__header {
  padding: 20px;
  background-color: lightgray;
}

>>> .el-dialog__body {
  padding: 20px;
}
.detail-dialog-footer {
  text-align: right;
  margin-right: 10px;
}
</style>
