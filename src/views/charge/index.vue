<template>
  <div style="padding: 1%">
    <div class="inspection-header content-header">
      <!-- <h3 class="inspection-setting-title">{{ $t('charge_config.charge_station_setting') }}</h3> -->
      <div class="inspec-setting-inquire">
        <el-button type="primary" size="mini" @click="configOperate()">{{
          $t('charge_config.charge_model_config')
        }}</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="dialogMonitorFlag = true"
          >{{ $t('charge_config.monitor_setting') }}</el-button
        >
        <el-button
          class="robot-operate"
          type="primary"
          size="mini"
          @click="plusCharges()"
          >{{ $t('charge_config.addCharge_station_label') }}</el-button
        >
        <el-button
          class="robot-operate"
          type="primary"
          disabled
          size="mini"
          @click="unlockCharges()"
          >{{ $t('charge_config.unlock_charge_station') }}</el-button
        >
        <el-button
          class="robot-operate"
          type="primary"
          size="mini"
          @click="lockCharges()"
          >{{ $t('charge_config.lock_charge_station') }}</el-button
        >
        <el-button
          class="robot-operate"
          type="primary"
          disabled
          size="mini"
          @click="lockCharges()"
          >{{ $t('charge_config.retract_electrode_label') }}</el-button
        >
        <el-button
          class="robot-operate"
          type="primary"
          size="mini"
          @click="lockCharges()"
          >{{ $t('charge_config.extended_electrode_label') }}</el-button
        >
      </div>
    </div>
    <div class="charge-body content-body">
      <el-table
        class="charge-data"
        :data="chargeInfoArr"
        header-row-class-name="header-row-class"
        row-class-name="row-class"
        fit
        highlight-current-row
        size="small"
        @current-change="handleCurrentChange"
        :empty-text="'暂无数据'"
      >
        <el-table-column prop="id" label="设备ID" align="center" width="60">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
          align="center"
          width="140"
        >
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="ip" label="IP" align="center" width="100">
          <template slot-scope="{ row }">
            <span>{{ row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="activeSite"
          label="活动站点"
          align="center"
          width="80"
        >
          <template slot-scope="{ row }">
            <span>{{ row.activeSite }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roadSection"
          label="进出路段"
          align="center"
          width="100"
        >
          <template slot-scope="{ row }">
            <span>{{ row.roadSection }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="agreements"
          label="协议类型"
          align="center"
          width="80"
        >
          <template slot-scope="{ row }">
            <span>{{ row.agreements }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="行为" align="center" width="80">
          <template slot-scope="{ row }">
            <span>{{ row.action }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="blockAddress"
          label="阻塞地址(0-1999)"
          align="center"
          width="110"
        >
          <template slot-scope="{ row }">
            <span>{{ row.blockAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="充电车辆类型"
          align="center"
          width="120"
          prop="vehicleType"
        >
          <template slot-scope="{ row }">
            <span>{{ row.vehicleType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" width="100" prop="remark">
          <template slot-scope="{ row }">
            <span>{{ row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button
            style="background-color:#64C8C8 ;color:#fff"              icon="el-icon-edit"
              size="mini"
              plain
              @click="editInspect(row)"
              >{{ $t('charge_config.edit_label') }}</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              plain
              @click="deleteInspect(row)"
              >{{ $t('charge_config.delete_label') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="charge-body content-body">
      <el-table
        class="charge-data"
        :data="realChargeInfos"
        header-row-class-name="header-row-class"
        row-class-name="row-class"
        fit
        highlight-current-row
        size="small"
      >
        <el-table-column prop="id" label="设备ID" align="center" width="80">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
          align="center"
          width="120"
        >
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="online" label="在线" align="center" width="80">
          <template slot-scope="{ row }">
            <el-checkbox v-model="row.online"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="voltage" label="电压" align="center" width="100">
          <template slot-scope="{ row }">
            <span>{{ row.voltage }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="current" label="电流" align="center" width="100">
          <template slot-scope="{ row }">
            <span>{{ row.current }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="temp" label="温度" align="center" width="100">
          <template slot-scope="{ row }">
            <span>{{ row.temp }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电极状态"
          align="center"
          width="120"
          prop="electrode"
        >
          <template slot-scope="{ row }">
            <span>{{ row.electrode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="充电状态"
          align="center"
          width="120"
          prop="chargeState"
        >
          <template slot-scope="{ row }">
            <span>{{ row.chargeState }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="报警状态"
          align="center"
          width="120"
          prop="alarmState"
        >
          <template slot-scope="{ row }">
            <span>{{ row.alarmState }}</span>
          </template>
        </el-table-column>
        <el-table-column label="占用" align="center" width="80" prop="occupy">
          <template slot-scope="{ row }">
            <el-checkbox v-model="row.occupy"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="车辆" align="center" prop="vehicle">
          <template slot-scope="{ row }">
            <span>{{ row.vehicle }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="inspectDialog[dialogType]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        class="charge-form common-form"
        label-position="left"
        label-width="120px"
        :model="chargeForm"
        :rules="rules"
        ref="chargeForm"
        style="margin-left: 10%"
      >
        <el-form-item
          label="设备名称"
          :label-width="formLabelWidth"
          prop="deviceName"
        >
          <el-input v-model="chargeForm.deviceName"></el-input>
        </el-form-item>
        <el-form-item label="IP" :label-width="formLabelWidth" prop="ip">
          <el-input v-model="chargeForm.ip"></el-input>
        </el-form-item>
        <el-form-item
          label="进出路段"
          :label-width="formLabelWidth"
          prop="road"
        >
          <el-input v-model="chargeForm.road"></el-input>
        </el-form-item>
        <el-form-item
          label="协议类型"
          :label-width="formLabelWidth"
          prop="agreement"
        >
          <el-select
            v-model="chargeForm.agreement"
            clearable
            :placeholder="$t('charge_config.select_agreement_type')"
          >
            <el-option
              v-for="item in protocalOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="充电行为码"
          :label-width="formLabelWidth"
          prop="behaviorCode"
        >
          <el-input
            v-model="chargeForm.behaviorCode"
            :disabled="codeFlag"
          ></el-input>
        </el-form-item>
        <el-form-item label="行为" :label-width="formLabelWidth" prop="action">
          <el-input v-model="chargeForm.action"></el-input>
        </el-form-item>
        <el-form-item
          label="活动站点"
          :label-width="formLabelWidth"
          prop="activiSite"
        >
          <el-input v-model="chargeForm.activiSite"></el-input>
        </el-form-item>
        <el-form-item
          label="阻塞地址(0-1999)"
          :label-width="formLabelWidth"
          prop="blockAddr"
        >
          <el-input v-model="chargeForm.blockAddr"></el-input>
        </el-form-item>
        <el-form-item
          label="充电车辆类型"
          :label-width="formLabelWidth"
          prop="typeList"
        >
          <el-checkbox-group v-model="chargeForm.typeList">
            <el-checkbox label="I"></el-checkbox>
            <el-checkbox label="II"></el-checkbox>
            <el-checkbox label="III"></el-checkbox>
            <el-checkbox label="IV"></el-checkbox>
            <el-checkbox label="V"></el-checkbox>
            <el-checkbox label="VI"></el-checkbox>
            <el-checkbox label="VII"></el-checkbox>
            <el-checkbox label="VIII"></el-checkbox>
            <el-checkbox label="IX"></el-checkbox>
            <el-checkbox label="X"></el-checkbox>
            <el-checkbox label="XI"></el-checkbox>
            <el-checkbox label="XII"></el-checkbox>
            <el-checkbox label="XIII"></el-checkbox>
            <el-checkbox label="XIV"></el-checkbox>
            <el-checkbox label="XV"></el-checkbox>
            <el-checkbox label="XVI"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="chargeForm.remark"></el-input>
        </el-form-item>
        <el-form-item class="common-form-footer">
          <el-button
            type="primary"
            @click="
              dialogType === 'addCharges'
                ? addSuccess('chargeForm', chargeForm)
                : editSuccess('chargeForm', chargeForm)
            "
            >{{ $t('charge_config.sure_label') }}</el-button
          >
          <el-button type="primary" plain @click="cancel('chargeForm')">{{
            $t('charge_config.cancel_label')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="$t('charge_config.charge_model_setting')"
      :visible.sync="dialogConfigVisible"
      width="40%"
    >
      <div class="dialog-header">
        <span>{{ $t('charge_config.charge_model_label') }}</span>
        <el-checkbox label="低电压充电" v-model="lowChecked"></el-checkbox>
        <el-checkbox
          label="定时充电"
          v-model="timedChecked"
          @click.native="
            timedChecked ? (timedChargeFlag = false) : (timedChargeFlag = true)
          "
        ></el-checkbox>
        <el-checkbox
          label="闲置充电"
          v-model="freeChecked"
          @click.native="
            freeChecked ? (freeChargeFlag = false) : (freeChargeFlag = true)
          "
        ></el-checkbox>
      </div>
      <div>
        <div class="mt10" v-if="timedChargeFlag">
          <span>{{ $t('charge_config.timeCharge_thresold_label') }}</span>
          <el-input v-model="timedChargeVal" clearable></el-input>
          <br />
          <br />
          {{ $t('charge_config.start_time_label') }}
          <el-time-picker
            v-model="startVal"
            size="mini"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59',
            }"
          >
          </el-time-picker>
          &nbsp;
          {{ $t('charge_config.end_time_label') }}
          <el-time-picker
            v-model="endVal"
            size="mini"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59',
            }"
          >
          </el-time-picker>
          &nbsp;
          {{ $t('charge_config.remark_label') }}
          <el-input v-model="timedRemark" clearable></el-input>
          &nbsp;
          <el-button
            type="primary"
            size="mini"
            plain
            @click="addTimedCharges()"
            >{{ $t('charge_config.add_label') }}</el-button
          >
          <br />
          <br />
          <el-table
            class="charge-data"
            :data="timedChargeArr"
            header-row-class-name="header-row-class"
            row-class-name="row-class"
            fit
            highlight-current-row
            border
            size="mini"
            @current-change="handleCurrentChange"
          >
            <el-table-column
              prop="startTime"
              label="开始时间"
              align="center"
              width="130"
            >
              <template slot-scope="{ row }">
                <span>{{ row.startTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="结束时间"
              align="center"
              width="130"
            >
              <template slot-scope="{ row }">
                <span>{{ row.endTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="interVal"
              label="间隔(分钟)"
              align="center"
              width="80"
            >
              <template slot-scope="{ row }">
                <span>{{ row.interVal }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              align="center"
              width="100"
            >
              <template slot-scope="{ row }">
                <span>{{ row.remarks }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作" align="center">
              <template slot-scope="{ row }">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  plain
                  @click="deleteTimedCharge(row)"
                  >{{ $t('charge_config.delete_label') }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mt10" v-if="freeChargeFlag">
          <span>{{ $t('charge_config.freeCharge_thresold_label') }}</span>
          <el-input v-model="freeChargeVal" clearable></el-input>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="addChargeModel()">{{
          $t('charge_config.sure_label')
        }}</el-button>
        <el-button type="primary" plain @click="cancelChargeModel()">{{
          $t('charge_config.cancel_label')
        }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('charge_config.monitor_setting')"
      :visible.sync="dialogMonitorFlag"
      width="40%"
    >
      <div>
        <el-form
          class="charge-form common-form"
          label-position="left"
          label-width="120px"
          ref="monitorForm"
          :model="monitorForm"
          style="margin-left: 10%"
        >
          <el-form-item label="监听IP：">
            <el-input v-model="monitorForm.ip"></el-input>
          </el-form-item>
          <el-form-item label="监听端口：">
            <el-input v-model="monitorForm.port"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setMonitor(monitorForm)">{{
              $t('charge_config.sure_label')
            }}</el-button>
            <el-button type="primary" plain @click="cancelMonitor()">{{
              $t('charge_config.cancel_label')
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getChargeSetting,
  updateChargeSetting,
  getAllChargeDevice,
  getChargeDevice,
  deleteChargeDevice,
  addChargeDevice,
  updateChargeDevice,
  getProtocalType,
} from '@/api/charge';

export default {
  data() {
    return {
      inquireVal: '',
      chargeInfoArr: [],
      dialogFormVisible: false,
      dialogConfigVisible: false,
      formLabelWidth: '150px',
      dialogType: '',
      inspectDialog: {
        addCharges: this.$t('charge_config.plusCharge_station'),
        editCharges: this.$t('charge_config.editCharge_station'),
      },
      lowChecked: false,
      timedChecked: false,
      freeChecked: false,
      timedChargeFlag: false,
      freeChargeFlag: false,
      timedChargeVal: '',
      freeChargeVal: '',
      chargeForm: {
        deviceName: '',
        ip: '',
        road: '',
        agreement: 0,
        behaviorCode: '',
        activiSite: '',
        action: '',
        blockAddr: '',
        typeList: [],
        remark: '',
      },
      codeFlag: false,
      rules: {
        deviceName: [
          {
            required: true,
            message: '请输入设备名称',
            trigger: 'change',
          },
        ],
        ip: [
          {
            required: true,
            message: '请输入IP',
            trigger: 'change',
          },
        ],
        activiSite: [
          {
            required: true,
            message: '请输入活动站点',
            trigger: 'change',
          },
        ],
        blockAddr: [
          {
            required: true,
            message: '请输入阻塞地址',
            trigger: 'change',
          },
        ],
      },
      currentRow: null,
      startVal: '',
      endVal: '',
      timedRemark: '',
      timedChargeArr: [],
      dialogMonitorFlag: false,
      monitorForm: {
        ip: '192.168.1.105',
        port: '8011',
      },
      realChargeInfos: [],
      protocalOptions: [],
      ID: 0,
    };
  },
  mounted() {
    this.initCharge();
  },
  methods: {
    initCharge() {
      let self = this;
      self.chargeInfoArr = [];
      self.realChargeInfos = [];
      getProtocalType()
        .then((response) => {
          let carTypeArr = response.data;
          for (let i = 0, len = carTypeArr.length; i < len; i++) {
            let optionObj = {
              value: carTypeArr[i].dicCode,
              label: carTypeArr[i].dataDescription,
            };
            this.protocalOptions.push(optionObj);
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
      getAllChargeDevice()
        .then((response) => {
          let chargeStationArr = response.data;
          if (chargeStationArr.length) {
            for (let i = 0, len = chargeStationArr.length; i < len; i++) {
              let editedObj = {
                id: chargeStationArr[i].id,
                name: chargeStationArr[i].name,
                ip: chargeStationArr[i].ipaddress,
                activeSite: chargeStationArr[i].stationID,
                roadSection: chargeStationArr[i].throughEdges,
                action: chargeStationArr[i].action,
                blockAddress: chargeStationArr[i].address,
                vehicleType: chargeStationArr[i].carrierType,
                remark: chargeStationArr[i].remark,
              };
              for (let j = 0, len = self.protocalOptions.length; j < len; j++) {
                if (
                  chargeStationArr[i].protocol == self.protocalOptions[j].value
                ) {
                  editedObj.agreements = self.protocalOptions[j].label;
                }
              }
              self.chargeInfoArr.push(editedObj);
              let unmodifiedObj = {
                id: chargeStationArr[i].id,
                name: chargeStationArr[i].name,
                online: chargeStationArr[i].online,
                voltage: chargeStationArr[i].voltage,
                current: chargeStationArr[i].current,
                temp: chargeStationArr[i].temperature,
                electrode: chargeStationArr[i].pileStatus,
                chargeState: chargeStationArr[i].chargingStatus,
                alarmState: chargeStationArr[i].alarmStatus,
                occupy: chargeStationArr[i].occupied,
              };
              self.realChargeInfos.push(unmodifiedObj);
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
    plusCharges() {
      this.dialogFormVisible = true;
      this.dialogType = 'addCharges';
    },
    addSuccess(inspectFormData, chargeData) {
      let self = this;
      this.$refs[inspectFormData].validate((valid) => {
        if (valid) {
          let param = {
            Name: chargeData.deviceName,
            IPAddress: chargeData.ip,
            StationID: Number(chargeData.activiSite),
            ThroughEdges: chargeData.road,
            Protocol: Number(chargeData.agreement),
            Action: Number(chargeData.action),
            Address: Number(chargeData.blockAddr),
            CarrierType: 0,
            Remark: chargeData.remark,
          };
          addChargeDevice(param)
            .then((response) => {
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '新增成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.initCharge();
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
        } else {
          // console.log('error submit!!');
          return false;
        }
        this.dialogFormVisible = false;
      });
      this.$refs[inspectFormData].resetFields();
    },
    editSuccess(inspectFormData, chargeData) {
      let self = this;
      this.$refs[inspectFormData].validate((valid) => {
        if (valid) {
          let param = {
            id: self.ID,
            Name: chargeData.deviceName,
            IPAddress: chargeData.ip,
            StationID: Number(chargeData.activiSite),
            ThroughEdges: chargeData.road,
            Protocol: chargeData.agreement,
            Action: Number(chargeData.action),
            Address: Number(chargeData.blockAddr),
            CarrierType: 0,
            Remark: chargeData.remark,
          };
          updateChargeDevice(param)
            .then((response) => {
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '修改成功',
                  title: '提示',
                  duration: 1000,
                });
                self.initCharge();
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
        } else {
          // console.log('error submit!!');
          return false;
        }
        this.dialogFormVisible = false;
      });
      this.$refs[inspectFormData].resetFields();
    },
    cancel(chargeFormData) {
      this.$refs[chargeFormData].resetFields();
      this.dialogFormVisible = false;
    },
    configOperate() {
      let self = this;
      this.dialogConfigVisible = true;
      getChargeSetting()
        .then((response) => {
          let configData = response.data;
          self.lowChecked = configData.useLowPowerCharge;
          self.timedChecked = configData.useTimingCharge;
          self.freeChecked = configData.useFreeCharge;
          self.timedChargeVal = configData.timingChargeBatteryLeveLimit;
          self.freeChargeVal = configData.freeChargeBatteryLeveLimit;
          // 定时充电模式
          let timedArr = configData.timeSlotList;
          if (timedArr.length) {
            let chargeObj = {};
            self.timedChargeArr.push(chargeObj);
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
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    editInspect(item) {
      this.dialogFormVisible = true;
      this.dialogType = 'editCharges';
      this.ID = item.id;
      this.chargeForm = {
        deviceName: item.name,
        ip: item.ip,
        road: item.roadSection,
        activiSite: item.activeSite,
        blockAddr: item.blockAddress,
        action: item.action,
        typeList: item.vehicleType,
        remark: item.remark,
      };
      for (let j = 0, len = this.protocalOptions.length; j < len; j++) {
        if (item.agreements == this.protocalOptions[j].label) {
          this.chargeForm.agreement = this.protocalOptions[j].value;
        }
      }
    },
    deleteInspect(item) {
      let self = this;
      deleteChargeDevice(item.id)
        .then((response) => {
          if (response.code === 20000) {
            this.$notify({
              type: 'success',
              message: '删除成功！',
              title: '提示',
              duration: 1000,
            });
            self.initCharge();
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
    addTimedCharges() {
      if (this.startVal && this.endVal) {
        let chargeObj = {
          startTime: this.$moment(this.startVal).format('YYYY-MM-DD HH:mm:ss'),
          endTime: this.$moment(this.endVal).format('YYYY-MM-DD HH:mm:ss'),
          interVal: this.$moment(this.endVal).diff(
            this.$moment(this.startVal),
            'minutes'
          ),
          remarks: this.timedRemark,
        };
        this.timedChargeArr.push(chargeObj);
      }
    },
    deleteTimedCharge(item) {
      if (item) {
        for (let i = 0, len = this.timedChargeArr.length; i < len; i++) {
          if (
            this.timedChargeArr[i].startTime ==
            this.$moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')
          ) {
            this.timedChargeArr.splice(i, 1);
            return;
          }
        }
      }
    },
    addChargeModel() {
      let self = this;
      let para = {
        UseLowPowerCharge: self.lowChecked,
        UseTimingCharge: self.timedChecked,
        UseFreeCharge: self.freeChecked,
        TimingChargeBatteryLeveLimit: Number(self.timedChargeVal),
        FreeChargeBatteryLeveLimit: Number(self.freeChargeVal),
        TimeSlotList: self.timedChargeArr,
      };
      updateChargeSetting(para)
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
      this.dialogConfigVisible = false;
    },
    cancelChargeModel() {
      this.dialogConfigVisible = false;
      this.timedChargeArr = [];
      this.startVal = '';
      this.endVal = '';
      this.timedRemark = '';
      this.lowChecked = false;
      this.timedChecked = false;
      this.freeChecked = false;
      this.timedChargeFlag = false;
      this.freeChargeFlag = false;
    },
    setMonitor(item) {
      if (item) {
      }
      this.dialogMonitorFlag = false;
    },
    cancelMonitor() {
      this.dialogMonitorFlag = false;
    },
    selectV3Operate() {
      this.chargeForm.behaviorCode = '';
      this.codeFlag = false;
    },
    selectV4Operate() {
      this.chargeForm.behaviorCode = 'v4时是固定行为码';
      this.codeFlag = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.inspection-header {
  padding: 20px 10px;
  background-color: lightblue;
  border: 1px solid #fff;

  .inspection-setting-title {
    display: inline;
  }

  .inspec-setting-inquire {
    display: inline;

    .robot-operate {
      width: 8vw;
      background-color: #64C8C8 !important;
    }
  }
}

.charge-body {
  margin: 10px 0;
  padding: 20px 10px;
  background-color: lightblue;
  border: 1px solid #fff;

  .charge-data {
    font-size: 13px;
    width: 100%;
    background: rgba(1, 10, 53, 0);
    color: #301d0f;
  }
}

.charge-form {
  >>> .el-input {
    width: 200px;
  }
}

.mt10 {
  margin-top: 10px;

  >>> .el-input {
    width: 118px;
  }

  >>> .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
}

.dialog-header {
  // background: rgba(4, 72, 104, 0.3);
  // border: 1px solid green;
  border-radius: 5px;
  padding: 8px 10px;
  text-align: left;
  color: #fff;
}

.dialog-footer {
  margin: 20px;
  text-align: center;
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

>>> .el-dialog__header {
  padding: 20px;
  background-color: lightgray;
}

>>> .el-dialog__body {
  padding: 20px;
}
</style>
