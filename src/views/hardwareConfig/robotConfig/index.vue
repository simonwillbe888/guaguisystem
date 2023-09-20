<template>
  <div style="padding: 1%; background: rgb(6,30,51);">
    <div class="robot-header content-header">
      <!-- <h3 class="robot-setting-title">{{ $t('robot_setting.robot_list') }}</h3> -->
      <div class="robot-setting-inquire">
        <!-- {{ $t('robot_setting.robot_name') }} -->
        <el-input class="robot-inquire" v-model="inquireVal" size="mini" placeholder="请输入机器人名称关键字" clearable></el-input>
        <el-button type="success" @click="initRobot">查询</el-button>
      </div>
      <el-button class="robot-operate" type="success" size="mini" icon="el-icon-plus"
        @click="plusRobot()">新增机器人</el-button>
    </div>
    <div class="robot-body content-body">
      <el-table height="39rem" class="robot-data" ref="singleTable" :data="robotInfoArr"
        header-row-class-name="header-row-class" row-class-name="row-class" fit highlight-current-row size="small"
        @current-change="handleCurrentChange" :empty-text="'暂无数据'">
        <el-table-column type="index" label="序号" align="center" width="100">
        </el-table-column>
        <!-- <el-table-column
          prop="carrierId"
          label="机器人ID"
          align="center"
          width="100"
        >
        </el-table-column> -->
        <el-table-column prop="number" label="机器人编码" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="机器人名称" align="center" width="110">
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="机器人类型" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.type }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="ip" label="机器人IP地址" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="area" label="区域" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.area }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column-->
        <!--          prop="details"-->
        <!--          label="机器人详情"-->
        <!--          align="center"-->

        <!--        >-->
        <!--          <template slot-scope="{ row }">-->
        <!--            <el-button-->
        <!--              type="primary"-->
        <!--              icon="el-icon-document"-->
        <!--              size="mini"-->
        <!--              plain-->
        <!--              @click="editRobot(row, 1)"-->
        <!--              >详情</el-button-->
        <!--            >-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column prop="operate" label="操作" align="center" width="400">
          <template slot-scope="{ row }">
            <el-button type="primary" icon="el-icon-document" size="mini" plain @click="editRobot(row, 1)">详情</el-button>
            <el-button class="robot-operate" type="primary" icon="el-icon-setting" size="mini"
              @click="configAccesso(row)">{{ $t('robot_setting.accessory_operate_label') }}</el-button>
            <el-button class="robot-operate" style="background-color:#64C8C8 ;color:#fff" icon="el-icon-edit" size="mini"
              plain @click="editRobot(row, 2)">修改</el-button>
            <el-button class="robot-operate" type="danger" size="mini" icon="el-icon-delete" @click="deleteRobot(row)">{{
              $t('robot_setting.deleteRobot_label') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-sty">
      <el-dialog :title="robotDialog[dialogType]" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
        @close="cancelOperate">
        <el-form label-width="120px" :model="robotForm" :rules="rules" ref="robotForm">
          <el-form-item :label="$t('robot_setting.robot_id_label')" prop="robotID">
            <el-input placeholder="请输入机器人ID" v-model.number="robotForm.robotID" :disabled="this.dialogType !== 'addRobots'"></el-input>
          </el-form-item>
          <!-- <el-form-item
            :label="$t('robot_setting.robotNum_label')"
            prop="number"
          >
            <el-input
              placeholder="请输入机器人编码"
              :disabled="robotForm.isEdit"
              v-model.trim="robotForm.number"
            ></el-input>
          </el-form-item> -->
          <el-form-item :label="$t('robot_setting.robotName_label')" prop="robotName">
            <el-input :disabled="robotForm.isEdit" v-model.trim="robotForm.robotName" placeholder="请输入机器人名称"></el-input>
          </el-form-item>
          <el-form-item :label="$t('robot_setting.robotIP_label')" prop="robotIp">
            <el-input :disabled="robotForm.isEdit" placeholder="请输入机器人Ip" v-model.trim="robotForm.robotIp"></el-input>
          </el-form-item>
          <el-form-item :label="$t('robot_setting.area_label')" prop="siteName">
            <el-select :disabled="robotForm.isEdit" v-model="robotForm.siteName" placeholder="请选择区域" clearable>
              <el-option v-for="item in bigAreaOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('robot_setting.robotType_label')" prop="agvTypes">
            <el-select :disabled="robotForm.isEdit" v-model="robotForm.agvTypes" clearable :placeholder="'请选择机器人类型'">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="'是否绑定待命点'" prop="stand">
            <el-checkbox :label="$t('robot_setting.bind_standby_label')" v-model="standByChecked"></el-checkbox>
            <el-select v-if="standByChecked" :disabled="robotForm.isEdit" v-model="vertex" placeholder="请选择">
              <el-option v-for="item in StationVertex" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="!robotForm.isEdit" class="common-form-footer">
            <el-button type="primary" @click="
              dialogType === 'addRobots'
                ? addSuccess('robotForm', robotForm)
                : editSuccess('robotForm', robotForm)
              ">{{ $t('robot_setting.sure_label') }}</el-button>
            <el-button type="primary" plain @click="cancelOperate('robotForm')">{{ $t('robot_setting.cancel_label')
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 关联配件设置 -->
    <el-dialog :title="$t('robot_setting.access_operate_label')" :visible.sync="dialogAccessFlag"
      :close-on-click-modal="false" width="70%">
      <div style="margin-bottom: 20px; font-size: 13px">
        <span>{{ $t('robot_setting.accesso_type_label') }}</span>
        <el-select class="access-select" v-model="value1" placeholder="请选择" @change="initListOption" clearable>
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item"
            :disabled="item.disabled">
          </el-option>
        </el-select>
        &nbsp;
        <span>{{ $t('robot_setting.accesso_list_label') }}</span>
        <el-select class="access-select" v-model="value2" placeholder="请选择" @focus="listPrompt" clearable>
          <el-option v-for="item in listOptions" :key="item.value" :label="item.label" :value="item">
          </el-option>
        </el-select>
        &nbsp;
        <span>{{ $t('robot_setting.accesso_feature_label') }}</span>
        <el-select class="access-select" v-model="value3" placeholder="请选择" multiple clearable>
          <el-option v-for="item in featureOptions" :key="item.value" :label="item.label" :value="item"
            :disabled="item.disabled">
          </el-option>
        </el-select>
        &nbsp;
        <el-button type="primary" size="mini" plain style="margin-top: 10px;margin-left:10vw;" @click="addAccesso()">{{
          $t('robot_setting.add_related_label') }}</el-button>
        <br />
      </div>
      <div class="content-body">
        <el-table class="charge-data" :data="accessoInfoArr" header-row-class-name="header-row-class"
          row-class-name="row-class" fit highlight-current-row size="mini" @current-change="handleCurrentChange">
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="type" label="配件类型" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="AccessoryName" label="配件名称" align="center">
          </el-table-column>
          <el-table-column prop="AccessoryCode" label="配件编号" align="center">
          </el-table-column>
          <el-table-column prop="feature" label="配件功能" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.EquipFunctionsDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作" align="center" width="80">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteAccesso(scope)">{{ $t('charge_config.delete_label')
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="detail-dialog-footer">
        <el-button size="mini" @click="save">{{
          $t('plan_config.sure_label')
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCarrierList,
  addCarrier,
  deleteCarrier,
  updateCarrier,
  getAccessoType,
  getAccessoFeatureType,
  getAccessoriesByType,
  addAccessory,
  saveAccessory,
  deleteAccessory,
  getAccessory,

} from '@/api/robot';
import { getArea, GetMapData } from '@/api/areaConfig.js';
import { getCarrierTypeByDic } from '@/api/taskConfig';
import { ninvoke } from 'q';

export default {
  data() {
    return {
      inquireVal: '',
      robotInfoArr: [],
      dialogFormVisible: false,
      formLabelWidth: '110px',
      dialogType: '',
      robotDialog: {
        addRobots: this.$t('robot_setting.plusRobot_label'),
        editRobots: this.$t('robot_setting.editRobot_label'),
        detail: '机器人数据详情',
      },
      robotForm: {
        robotID: 0,
        number: '',
        siteName: '',
        robotName: '',
        robotIp: '',
        agvTypes: '',
        isEdit: false,
      },
      options: [],
      bigAreaOptions: [],
      vertex: null,
      StationVertex: [],
      rules: {
        robotID: [
          {
            required: true,
            message: '请输入机器人ID',
            trigger: 'blur',
          },
          {
            type: 'number',
            min: 0,
            max: 200,
            message: 'ID在0~99',
            trigger: 'blur'
          }
        ],
        agvTypes: [
          {
            required: true,
            message: '请选择机器人类型',
            trigger: 'blur',
          },
        ],
        number: [
          // {
          //   required: true,
          //   message: '请输入机器人编码',
          //   trigger: 'blur',
          // },

        ],
        siteName: [
          {
            required: true,
            message: '请输入应用场地',
            trigger: 'change',
          },
        ],
        robotName: [
          {
            required: true,
            message: '请输入机器人名称',
            trigger: 'blur',
          },
        ],
        robotIp: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入机器人IP'));
              } else if (
                !/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(
                  value
                )
              ) {
                callback(new Error('请输入正确ip'));
              } else {
                callback();
              }
            },
          },
        ],
      },
      currentRow: null,
      standByChecked: false,
      standByPoint: '',

      simuStarts: '',
      dialogDetailFlag: false,
      detailForm: {
        standby: '',
        simustart: '',
      },
      dialogAccessFlag: false,
      accessoInfoArr: [],
      typeOptions: [],
      listOptions: [],
      featureOptions: [],
      value1: '',
      value2: '',
      value3: '',
      ID: 0,
      accessoList: [],
      robotId: 0,
      accessoID: 0,
      dataID: 0,
    };
  },
  watch: {
    // 'value1': {
    //   handler (newPoint, oldPoint) {
    //     if (newPoint && newPoint != oldPoint) {
    //       this.initListOption(newPoint)
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // }
    // standByChecked(newV,oldV){
    //   if(!oldV){
    //     console.log('点击待命点了')
    //     this.vertex = null

    //   }
    // }
  },
  mounted() {
    this.initArea();
    this.initRobot();
  },
  methods: {
    initRobot() {
      let self = this;
      self.options = [];
      self.robotInfoArr = [];
      getCarrierTypeByDic()
        .then((response) => {
          let carTypeArr = response.data;
          for (let i = 0, len = carTypeArr.length; i < len; i++) {
            let optionObj = {
              value: carTypeArr[i].Code,
              label: carTypeArr[i].Desc,
            };
            self.options.push(optionObj);
          }
          let params = {
            current: null,
            keyWord: self.inquireVal,
            limit: null,
          }
          getCarrierList(params)
            .then((response) => {
              let robotArr = response.data;
              console.log('相应参数', response, params)
              for (let i = 0, len = robotArr.length; i < len; i++) {
                let rowObj = {
                  id: robotArr[i].ID,
                  carrierId: robotArr[i].CarrierID,
                  number: robotArr[i].CarrierCode,
                  site: robotArr[i].AreaID,
                  name: robotArr[i].CarrierName,
                  ip: robotArr[i].CarrierIP,
                  standby: robotArr[i].IsHomeStation,
                  simustart: robotArr[i].IsStartVertex,
                  homeStation: robotArr[i].HomeStation,
                  startVertex: robotArr[i].StartVertex,
                };
                for (let j = 0, len = self.options.length; j < len; j++) {
                  if (robotArr[i].CarrierType == self.options[j].value) {
                    rowObj.type = self.options[j].label;
                  }
                }
                if (self.bigAreaOptions && self.bigAreaOptions.length) {
                  self.bigAreaOptions.forEach((item) => {
                    if (robotArr[i].AreaID === item.value) {
                      rowObj.area = item.label;
                    }
                  });
                }
                self.robotInfoArr.push(rowObj);
              }
              // console.log("查看机器列表",this.robotInfoArr,params)
              self.initAccessoType();
              self.initFeatureOption();
            })
            .catch((error) => {
              self.$notify({
                title: self.$t('user.Failure'),
                message: self.$t('user.interface_call_failed_tip'),
                type: 'error',
                duration: 1000,
              });
            });
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
    initArea() {
      let self = this;
      self.bigAreaOptions = [];
      GetMapData().then((res) => {
        const obj = []
        res.data.stations.forEach(element => {
          console.log(element.type, 'aaaaa')
          if (element.type == 2) {
            obj.push({
              label: element.vertex.number,
              value: element.vertex.number
            })
          }
          self.StationVertex = obj
        });
      })
      getArea()
        .then((response) => {
          let accessTypeArr = response.data;

          for (let i = 0, len = accessTypeArr.length; i < len; i++) {
            let optionObj = {
              value: accessTypeArr[i].id,
              label: accessTypeArr[i].areaName,
            };
            self.bigAreaOptions.push(optionObj);
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
    initAccessoType() {
      let self = this;
      self.typeOptions = [];
      getAccessoType()
        .then((response) => {
          let carTypeArr = response.data;
          for (let i = 0, len = carTypeArr.length; i < len; i++) {
            let optionObj = {
              value: carTypeArr[i].Code,
              label: carTypeArr[i].Desc,
            };
            self.typeOptions.push(optionObj);
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
    initFeatureOption() {
      let self = this;
      self.featureOptions = [];
      getAccessoFeatureType()
        .then((response) => {
          let carTypeArr = response.data;
          for (let i = 0, len = carTypeArr.length; i < len; i++) {
            let optionObj = {
              value: carTypeArr[i].Code,
              label: carTypeArr[i].Desc,
            };
            if (
              optionObj.value !== 7 &&
              optionObj.value !== 65535 &&
              optionObj.value !== 11 &&
              optionObj.value !== 13
            ) {
              optionObj.disabled = true;
              self.featureOptions.push(optionObj);
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
    listPrompt() {
      if (this.value1 === '') {
        return this.$notify({
          message: '请先选择配件类型！',
          type: 'warning',
          title: '提示',
          duration: 1000,
        });
      }
    },
    initListOption() {
      let self = this;
      self.listOptions = [];
      if (!this.value1.value) return;
      getAccessoriesByType(this.value1.value)
        .then((response) => {
          let accessoArr = response.data;
          self.accessoList = accessoArr;
          for (let i = 0, len = accessoArr.length; i < len; i++) {
            let optionObj = {
              value: accessoArr[i].id,
              label: accessoArr[i].accessoryName,
              accessoryCode: accessoArr[i].accessoryCode,
            };
            self.listOptions.push(optionObj);
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
    plusRobot() {
      this.dialogFormVisible = true;
      this.dialogType = 'addRobots';
      this.robotForm.isEdit = false;
      this.standByChecked = false
      this.vertex = null
      this.resetForm();
    },
    addSuccess(robotForm, robotParam) {
      let self = this;

      this.$refs[robotForm].validate((valid) => {
        if (valid) {
          let param = {
            carrierID: Number(robotParam.robotID),
            carrierCode: robotParam.number,
            carrierName: robotParam.robotName,
            carrierType: robotParam.agvTypes,
            areaID: Number(robotParam.siteName),
            carrierIP: robotParam.robotIp,
          };
          // 绑定待命点
          if (this.standByChecked) {
            param.isHomeStation = true;
            if (this.vertex == null) {
              this.$notify({
                title: '提示',
                message: '请选择待命点',
                type: 'error',
                duration: 3000,
              });
            return
            }  
            param.homeStation = Number(this.vertex);
          } else {
            param.isHomeStation = false;
          }
          // 绑定模拟车起点
          if (this.simuChecked) {
            param.isStartVertex = true;
            param.startVertex = Number(this.simuStarts);
          } else {
            param.isStartVertex = false;
          }
          addCarrier(param)
            .then((response) => {
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '新增成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.initRobot();
                self.cancelOperate();
              }
            })
            .catch((error) => {
              self.cancelOperate();
              self.$notify({
                title: self.$t('user.Failure'),
                message: self.$t('user.interface_call_failed_tip'),
                type: 'error',
                duration: 1000,
              });
            });
        } else {
          return false;
        }
      });
      this.standByChecked = false;
      this.standByPoint = '';
      this.simuChecked = false;
      this.simuStarts = '';
    },
    editRobot(item, flag) {
      let that = this
      this.vertex = item.homeStation
      console.log('啊啊啊啊', item)
      if (item) {
        this.dialogFormVisible = true;
        this.dialogType = 'editRobots';
        this.ID = item.id;
        this.robotForm = {
          robotID: item.carrierId,
          siteName: item.site,
          robotName: item.name,
          robotIp: item.ip,
          number: item.number,
          agvTypes: item.type,
        };
        if (item.standby) {
          this.standByPoint = item.homeStation;
          that.standByChecked = true;
          // console.log("",typeof that.standByChecked)
        } else {
          // console.log("为什么还绑定")
          this.standByPoint = 0;
          this.vertex = null
          this.standByChecked = false;
        }

      }
      if (flag === 1) {
        this.dialogType = 'detail';
      }
      this.robotForm.isEdit = flag === 1;

      this.$nextTick(() => {
        this.$refs.robotForm.clearValidate();
      });
    },
    editSuccess(robotForm, robotParam) {
      let self = this;
      this.$refs[robotForm].validate((valid) => {
        if (valid) {
          let param = {
            id: self.ID,
            carrierID: Number(robotParam.robotID),
            carrierCode: robotParam.number,
            carrierName: robotParam.robotName,
            areaID: robotParam.siteName,
            carrierIP: robotParam.robotIp,
          };
          // 绑定待命点
          if (this.standByChecked) {
            param.isHomeStation = true;
            if (this.vertex == null) {
              this.$notify({
                title: '提示',
                message: '请选择待命点',
                type: 'error',
                duration: 3000,
              });
            return
            }            
              param.homeStation = Number(this.vertex);

          } else {
            param.isHomeStation = false;
          }
          // 绑定模拟车起点
          if (this.simuChecked) {
            param.isStartVertex = true;
            param.startVertex = Number(this.simuStarts);
          } else {
            param.isStartVertex = false;
          }
          // 机器人类型
          if (typeof robotParam.agvTypes === 'number') {
            param.carrierType = robotParam.agvTypes;
          } else {
            let obj = self.options.find(
              (item) => item.label === robotParam.agvTypes
            );
            param.carrierType = obj.value;
          }
          updateCarrier(param)
            .then((response) => {
              console.log("查看修改的参数", param)
              if (response.code === 20000) {
                let data = response.data;
                this.$notify({
                  message: '修改成功！',
                  type: 'success',
                  title: '提示',
                  duration: 1000,
                });
                self.initRobot();
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
          return false;
        }
        this.dialogFormVisible = false;
      });
      // this.$refs[robotForm].resetFields();
    },
    cancelOperate(robotForm) {
      this.dialogFormVisible = false;
      this.$refs.robotForm.resetFields();
      this.resetForm();
    },
    deleteRobot(item) {
      let self = this;
      if (item) {
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
            deleteCarrier(item.id)
              .then((response) => {
                let data = response.data;
                if (response.code === 20000) {
                  self.initRobot();
                  this.$notify({
                    type: 'success',
                    message: '删除成功！',
                    title: '提示',
                    duration: 1000,
                  });
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
          })
          .catch(() => { });
      }
    },
    // 重置新增修改表单
    resetForm() {
      this.robotForm = {
        robotID: '',
        number: '',
        siteName: '',
        robotName: '',
        robotIp: '',
        agvTypes: '',
      };
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 关联配件
    configAccesso(val) {
      let self = this;
      //   this.robotId = val.carrierId;
      this.accessoID = val.carrierId
      this.dataID = val.id
      this.dialogAccessFlag = true;
      this.infoAccesso();
    },
    infoAccesso() {
      let self = this;
      self.accessoInfoArr = [];
      getAccessory(this.accessoID)
        .then((response) => {
          let data = response.data ? response.data : [];
          data.forEach((item) => {
            self.typeOptions.forEach((node) => {
              if (item.AccessoryType == node.value) {
                item.type = node.label;
              }
            });
          });
          self.accessoInfoArr = data;
          this.selecteFocus();
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
    // 删除关联配件
    deleteAccesso(item) {
      this.accessoInfoArr = this.accessoInfoArr.filter(
        (node, index) => index !== item.$index
      );
      this.selecteFocus();
    },
    // 添加关联
    addAccesso() {
      const { value1, value2, value3 } = this;
      if (!value1.value || !value2.value || !value3.length) {
        this.$notify({
          message: '请选择配件及功能！',
          type: 'warning',
          title: '提示',
          duration: 1000,
        });
        return;
      }

      let obj = {
        AccessoryName: value2.label,
        AccessoryCode: value2.accessoryCode,
        AccessoryID: value2.value,
        AccessoryType: value1.value,
        type: value1.label,
        EquipFunctionsStr: '',
        EquipFunctionsDesc: '',
      };
      value3.forEach((item) => {
        obj.EquipFunctionsDesc =
          obj.EquipFunctionsDesc +
          (obj.EquipFunctionsDesc ? ',' : '') +
          item.label;
        obj.EquipFunctionsStr =
          obj.EquipFunctionsStr +
          (obj.EquipFunctionsStr ? ',' : '') +
          item.value;
      });
      this.accessoInfoArr.push(obj);
      this.value1 = '';
      this.value2 = '';
      this.value3 = [];
      this.selecteFocus();
    },
    async save() {
      const { accessoInfoArr, accessoID } = this;
      let data = {
        carrierID: this.dataID,
        list: [],
      };
      accessoInfoArr.forEach((item) => {
        data.list.push({
          carrierID: this.dataID,
          accessoryID: item.AccessoryID,
          equipFunctionsDesc: item.EquipFunctionsDesc,
          equipFunctionsStr: item.EquipFunctionsStr,
        });
      });
      const res = await saveAccessory(data);
      if (res.code === 20000) {
        this.dialogAccessFlag = false;
        this.$notify({
          message: '保存成功！',
          type: 'success',
          title: '提示',
          duration: 1000,
        });
      }
    },
    selecteFocus() {
      if (this.featureOptions.length) {
        this.featureOptions.forEach((node) => {
          node.disabled = false;
          if (this.accessoInfoArr.length) {
            this.accessoInfoArr.forEach((item) => {
              let arr = item.EquipFunctionsStr.split(',');
              // console.log(
              //   'cgw4444444',
              //   arr,
              //   String(node.value),
              //   arr.indexOf(String(node.value))
              // );
              if (arr.indexOf(String(node.value)) !== -1) {
                node.disabled = true;
              }
            });
          }
          return node;
        });
      }
      if (this.typeOptions.length) {
        this.typeOptions.forEach((node) => {
          node.disabled = false;
          if (this.accessoInfoArr.length) {
            this.accessoInfoArr.forEach((item) => {
              if (item.AccessoryType === node.value) {
                node.disabled = true;
              }
            });
          }
          return node;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.robot-header {
  padding: 5px 10px 10px 10px;
  background-color: lightblue;
  border: 1px solid #fff;

  .robot-setting-title {
    display: inline;
  }

  .el-input--mini .el-input__inner {
    width: 180px !important;
  }

  .robot-setting-inquire {
    // margin-left: 30px;
    display: inline;
    float: right;

    .robot-inquire {
      width: 180px;
      margin-right: 10px;
    }


  }
}

.robot-body {
  padding: 0 10px;
  background-color: lightblue;
  border: 1px solid #fff;

  .robot-data {
    font-size: 13px;
    width: 100%;
    background: rgba(1, 10, 53, 0);
    color: #301d0f;
  }
}

::v-deep .el-input {
  width: 200px;
}

>>>.el-table th,
.el-table tr {
  background-color: transparent;
}

::v-deep .el-input__inner {
  height: 1.875rem;
  background-color: transparent;
  color: #fff;
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

>>>.el-dialog__header {
  padding: 20px;
  background-color: lightgray;
}

>>>.el-dialog__body {
  padding: 20px;
}

>>>.el-checkbox__label {
  font-size: 12px;
}

// >>> .el-input.is-disabled .el-input__inner {
//   width: 110px;
// }

>>>.standby-input .el-input__inner {
  width: 110px;
}

>>>.simu-input .el-input__inner {
  width: 110px;
}

>>>.el-input__inner {
  &::placeholder {
    font-size: 12px;
  }

  &::-webkit-input-placeholder {
    /* WebKit browsers 适配谷歌 */
    font-size: 12px;
  }

  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 适配火狐 */
    font-size: 12px;
  }

  &::-moz-placeholder {
    /* Mozilla Firefox 19+ 适配火狐 */
    font-size: 12px;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10+  适配ie*/
    font-size: 12px;
  }
}



::v-deep .access-select .el-input__icon {
  line-height: 0;
}

.detail-dialog-footer {
  margin: 10px;
  text-align: right;
}

.dialog-sty {
  ::v-deep .el-dialog {
    width: 540px;
  }

  ::v-deep .el-dialog__body {
    padding: 20px;
    margin-left: 60px;

    .common-form-footer {
      margin-left: -30px;
    }
  }

  .detail-form {
    text-align: center;
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

  .detail-footer {
    margin: 10px;
    text-align: right;
  }
}
</style>
