<template>
  <div style="padding: 1%">
    <div class="inspection-header content-header">
      <!-- <h3 class="inspection-setting-title">
        {{ $t("plan_config.robotTask_manage") }}
      </h3> -->
      <el-button style="  width: 9.375rem;background-color: #64C8C8 !important;" icon="el-icon-plus" type="success"
        size="mini" @click="addTimedTask(null, 1)">{{ $t('plan_config.addTimedTask_label') }}</el-button>
      <div class="inspec-setting-inquire">
        <el-input placeholder="请输入关键字" size="mini" clearable v-model="keyWord"
          style="width:150px;margin-right:10px"></el-input>
        <el-select placeholder="请选择计划类型" size="mini" clearable v-model="planType">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="success" @click="initPlanList" size="mini">
          查询</el-button>


      </div>
    </div>
    <div class="robot-body content-body">
      <div class="inspectTask-table">
        <el-table class="inspect-task" ref="singleTable" :data="planTasks" header-row-class-name="header-row-class"
          row-class-name="row-class" style="width:100%" size="small" height="70vh">
          <!-- <el-table-column prop="id" label="计划编号" align="center" width="70">
            <template slot-scope="{ row }">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column> -->
          <el-table-column type="index"  label="序号" align="center" width="60">
          </el-table-column>
          <el-table-column prop="PlanName" label="计划名称" align="center" >
          </el-table-column>
          <el-table-column prop="TaskName" label="流程模板" align="center">
          </el-table-column>
          <el-table-column prop="plantypeName" label="计划类型" align="center">
          </el-table-column>
          <el-table-column prop="executeTypeName" label="执行方式" align="center">
          </el-table-column>
          <el-table-column prop="CarrierName" label="机器人名称" align="center">
          </el-table-column>
          <el-table-column prop="frequencyTypeName" label="执行时间" align="center">
            <template slot-scope="{ row }">
              {{ row.frequencyTypeName }} <span style="margin:1px"></span>
              {{ row.OpenTime ? row.OpenTime.slice(22, 27) : '' }}
            </template>
          </el-table-column>
          <el-table-column prop="ExecuteCount" label="执行次数" align="center">
            <template slot-scope="{ row }">
              {{ row.PlanType === 3 ? '--' : row.ExecuteCount }}
            </template>
          </el-table-column>
          <el-table-column prop="ExecuteCount" label="剩余次数" align="center">
            <template slot-scope="{ row }">
              {{ row.PlanType === 3 ? '--' : row.residueCount }}
            </template>
          </el-table-column>
          <el-table-column prop="ExecuteSpace" label="执行间隔(分钟)" align="center">
          </el-table-column>
          <el-table-column prop="StartTime" label="开始时间" align="center">
            <template slot-scope="{ row }">
              {{ row.StartTime || '--' }}
            </template>
          </el-table-column>
          <el-table-column prop="EndTime" label="结束时间" align="center">
            <template slot-scope="{ row }">
              {{ row.EndTime || '--' }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="StartTime" label="开始时间" align="center">
            <template slot-scope="{ row }">
              {{ row.StartTime ? row.StartTime.slice(11, 16) : '' }}
            </template>
          </el-table-column> -->
          <el-table-column prop="isEnableName" label="是否启用" align="center">
          </el-table-column>
          <el-table-column prop="ExecuteState" label="实时状态" align="center">
            <template slot-scope="{ row }">
              {{
                row.ExecuteState === 1
                ? '未执行'
                : row.ExecuteState === 2
                  ? '执行中'
                  : ''
              }}
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="ResidueCount"
            label="剩余次数"
            align="center"
            
          >
            <template slot-scope="{ row }">
              {{ row.ResidueCount === row.ExecuteCount ? 0 : row.ResidueCount }}
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            prop="type"
            label="任务详情"
            align="center"
            
          >
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                icon="el-icon-document"
                size="mini"
                plain
                @click="addTimedTask(row, 3)"
                >{{ $t('plan_config.inqireDetail_label') }}</el-button
              >
            </template>
          </el-table-column> -->
          <el-table-column prop="operate" label="操作" align="center">
            <template slot-scope="{ row }">
              <!-- <el-button
                type="primary"
                icon="el-icon-document"
                size="mini"
                plain
                @click="addTimedTask(row, 3)"
                >{{ $t('plan_config.inqireDetail_label') }}</el-button
              > -->
              <el-dropdown>
                <el-button size="mini" type="primary">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <span @click="addTimedTask(row, 3)">
                      详情
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span v-if="row.PlanType === 2" @click="startTask(row)">
                      启动
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="addTimedTask(row, 2)">
                      修改
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span v-if="row.PlanType === 3" @click="stopTask(row)">
                      终止
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="deleteTimedTask(row)">
                      删除
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="taskDialog[dialogType]" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
      @close="cancelOperate()" width="750px">
      <el-form style="margin:0 auto" label-width="120px" :model="taskForm" 
      ref="taskForm" :rules="rules" :inline="true">
        <el-form-item label="计划名称" prop="PlanName">
          <el-input style="width:12vw" placeholder="请输入计划名称" :disabled="taskForm.isDetail"
            v-model="taskForm.PlanName"></el-input>
        </el-form-item>
        <el-form-item label="计划类型" prop="PlanType">
          <el-select style="width:12vw" placeholder="请选择计划类型" :disabled="taskForm.isDetail || taskForm.isEdit"
            v-model="taskForm.PlanType" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="初始水平角度" prop="YunPAngle">
          <el-input style="width:12vw" placeholder="请输入初始水平角度" :disabled="taskForm.isDetail"
            v-model="taskForm.YunPAngle"></el-input>
        </el-form-item>
        <el-form-item label="初始垂直角度" prop="YunTAngle">
          <el-input style="width:12vw" placeholder="请输入初始垂直角度" :disabled="taskForm.isDetail"
            v-model="taskForm.YunTAngle"></el-input>
        </el-form-item>
        <el-form-item label="巡检计划模板" prop="TaskTemplateID">
          <el-select style="width:12vw" :disabled="taskForm.isDetail" v-model="taskForm.TaskTemplateID"
            placeholder="请选择巡检计划模板" clearable>
            <el-option v-for="item in processOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执行方式" prop="ExecuteType">
          <el-select style="width:12vw" :disabled="taskForm.isDetail" v-model="taskForm.ExecuteType" placeholder="请选择执行方式"
            clearable>
            <el-option v-for="item in runTypeList" :key="item.Code + item.Desc" :label="item.Desc" :value="item.Code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="selectRobotFlag" label="机器人" prop="CarrierID">
          <el-select style="width:12vw" placeholder="请选择机器人" :disabled="taskForm.isDetail" v-model="taskForm.CarrierID"
            clearable>
            <el-option v-for="item in carOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <template v-if="taskForm.PlanType !== 3">

          <el-form-item label="执行次数" prop="ExecuteCount">
            <el-input style="width:12vw"
              oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
              v-model.number="taskForm.ExecuteCount" :disabled="taskForm.isDetail"></el-input>
          </el-form-item>
          <!-- oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}" -->
          <el-form-item label="执行间隔(分钟)" prop="ExecuteSpace">
            <el-input style="width:12vw" v-model.number="taskForm.ExecuteSpace" :disabled="taskForm.isDetail"></el-input>
          </el-form-item>
          <el-form-item v-if="taskForm.PlanType !== 2" label="执行时间" prop="OpenTime">
            <el-time-picker style="width:12vw" :disabled="taskForm.isDetail" v-model="taskForm.OpenTime"
              placeholder="任意时间点" value-format="HH:mm:ss" format="HH:mm:ss">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="执行频率" prop="FrequencyType" v-if="taskForm.PlanType !== 2">
            <el-select style="width:12vw" :disabled="taskForm.isDetail" v-model="taskForm.FrequencyType"
              placeholder="请选择执行频率" clearable @change="frequencyTypeChange(taskForm.FrequencyType)">
              <el-option v-for="item in frequencyTypeList" :key="item.Code + item.Desc" :label="item.Desc"
                :value="item.Code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="formSelect" prop="FrequencyCount" v-if="taskForm.PlanType !== 2">
            <template>
              <template v-if="taskForm.FrequencyType == 2">
                <el-select :disabled="taskForm.isDetail" placeholder="请选择执行日期" v-model="taskForm.FrequencyCount"
                  clearable>
                  <el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="taskForm.FrequencyType == 3">
                <el-select :disabled="taskForm.isDetail" placeholder="请选择执行日期" v-model="taskForm.FrequencyCount"
                  clearable>
                  <el-option v-for="(item,
                    index) in '1111111111111111111111111111111'.split('')" :key="index" :label="index + 1 + '号'"
                    :value="index + 1">
                  </el-option>
                </el-select>
              </template>

            </template>
          </el-form-item>

        </template>
        <template v-else>
          <el-form-item label="执行间隔(分钟)" prop="ExecuteSpace">
            <!-- oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}" -->
            <el-input v-model.number="taskForm.ExecuteSpace" :disabled="taskForm.isDetail"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="StartTime">
            <el-date-picker style="width:12vw" :disabled="taskForm.isDetail" v-model="taskForm.StartTime"
              placeholder="请选择开始时间" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="EndTime">
            <el-date-picker style="width:12vw" 
            :disabled="taskForm.isDetail" 
            v-model="taskForm.EndTime"
              placeholder="请选择结束时间"
               type="datetime" 
               value-format="yyyy-MM-dd HH:mm:ss" 
               format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>

        </template>

        <el-form-item label="是否启用" prop="IsEnable">
          <el-radio-group v-model="taskForm.IsEnable">
            <el-radio :disabled="taskForm.isDetail" :label="1">是</el-radio>
            <el-radio :disabled="taskForm.isDetail" :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="算法启动" prop="Ai">
          <el-checkbox-group v-model="taskAi">
            <div>
              <el-checkbox 	 label="1001">行人</el-checkbox>
              <el-checkbox label="1002">非机动车</el-checkbox>
              <el-checkbox label="1007">照明</el-checkbox>
              <el-checkbox style="width: 60px;" label="1011">井盖</el-checkbox>
              <el-checkbox label="1008">违停</el-checkbox>
            </div>
            <div>
              <el-checkbox label="1016">逆行</el-checkbox>
              <el-checkbox label="1012">消防设备</el-checkbox>
              <el-checkbox label="1017">风机</el-checkbox>
              <el-checkbox style="width: 60px;" label="1018">指示灯</el-checkbox>
              <el-checkbox label="1013">火灾烟雾</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="taskForm.PlanType === 1">
          <span style="color:#f56c6c;margin-left:55px">同一机器人设置启动时间间隔不能小于1小时</span>
        </el-form-item>

        <el-form-item v-if="!taskForm.isDetail" class="common-form-footer">
          <el-button type="primary" @click="addSuccess">确定</el-button>
          <el-button type="primary" plain @click="cancelOperate()">{{
            $t('inspection_setting.cancel_add_label')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="lowButtery" title="低电量提示" width="30%">
      <span style="font-size:1.5rem ;">机器人低电量,确定启动该任务吗? </span>
      <span slot="footer">
        <el-button @click="lowButtery = false">取 消</el-button>
        <el-button type="primary" @click="goLocation()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCarTypeByType,
  getPatrolPlan,
  getAllPatrolPlan,
  getPatrolTemplateSelectList,
  addPatrolPlan,
  deletePatrolPlan,
  updatePatrolPlan,
  getCarrierTypeByDic,
  getExecuteTypeList,
  getPlanEnableList,
  getFrequencyTypeList,
  startPatrolPlan,
  stopPatrolPlan,
} from '../../../api/taskConfig';
import { getCarrierList } from '@/api/robot';
import { mapGetters } from 'vuex';
const inspectOptions = ['1#凝结水泵', '中压蒸汽发生器', '碱液储罐', '充电屋'];
export default {
  data() {
    return {
      planType: '',
      keyWord: '',
      inquireVal: '',
      planTaskArr: [],
      dialogFormVisible: false,
      options: [],
      carOptions: [],
      processOptions: [],
      robotTypeOption: [],
      dialogType: '',
      dialogDetailFlag: false,
      detailForm: {
        excutes: '',
        cycle: '',
        endTime: '',
        openTime: '',
      },
      taskDialog: {
        addTimedTask: this.$t('plan_config.addTimedTask_label'),
        editTimedTask: this.$t('plan_config.editTimedTask_label'),
        detail: '巡检计划详情',
      },
      option1: [
        {
          value: 1,
          label: '周一',
        },
        {
          value: 2,
          label: '周二',
        },
        {
          value: 3,
          label: '周三',
        },
        {
          value: 4,
          label: '周四',
        },
        {
          value: 5,
          label: '周五',
        },
        {
          value: 6,
          label: '周六',
        },
        {
          value: 7,
          label: '周日',
        },
      ],
      taskAi:[],
      taskForm: {
        PlanName: '',
        PlanType: '',
        TaskTemplateID: '',
        ExecuteType: '',
        FrequencyType: 1,
        ExecuteCount: 1,
        ExecuteSpace: 0,
        OpenTime: '',
        IsEnable: 1,
        CarrierID: '',
        FrequencyCount: 1,
        StartTime: '',
        EndTime: '',
        Ai:[],

      },
      rules: {
        PlanName: [
          { required: true, message: '请输入计划名称', trigger: 'blur' },
        ],
        YunPAngle: [
          { required: true, message: '请输入初始水平角度', trigger: 'blur' },
        ],
        YunTAngle: [
          { required: true, message: '初始垂直角度', trigger: 'blur' },
        ],
        TaskTemplateID: [
          { required: true, message: '请选择任务选择', trigger: 'change' },
        ],
        PlanType: [
          { required: true, message: '请选择计划类型', trigger: 'change' },
        ],
        ExecuteType: [
          { required: true, message: '请选择执行方式', trigger: 'change' },
        ],
        CarrierID: [
          { required: true, message: '请选择机器人', trigger: 'change' },
        ],
        FrequencyType: [
          { required: true, message: '请输入执行频率', trigger: 'change' },
        ],
        ExecuteCount: [
          { required: true, message: '请输入执行次数', trigger: 'change' },
        ],
        ExecuteSpace: [
          { required: true, message: '请输入执行间隔', trigger: 'change' },
        ],
        OpenTime: [
          { required: true, message: '请选择启动时间', trigger: 'change' },
        ],
        // FrequencyCount: [
        //   { required: true, message: '请输入执行日期', trigger: 'change' },
        // ],
        StartTime: [
          { required: true, message: '请输入开始时间', trigger: 'change' },
        ],
        EndTime: [
          { required: true, message: '请输入结束时间', trigger: 'change' },
        ],
        Ai: [
          { type:'array',required: true, message: '选择算法', trigger: 'change' },
        ],


      },
      currentRobot: '',
      currentInspectPoint: '',
      checkAll: false,
      checkedPoints: [],
      points: inspectOptions,
      isIndeterminate: true,
      currentRow: null,
      planID: 0,
      selectRobotFlag: true,
      runTypeList: [],
      enableList: [],
      frequencyTypeList: [],
      lowButtery: false
    };
  },
  computed: {
    ...mapGetters(['planTasks']),
  },
  watch: {
    'taskForm.executeWay': {
      handler(newPoint, oldPoint) {
        if (newPoint != oldPoint) {
          if (newPoint === 0) {
            this.selectRobotFlag = true;
          } else if (newPoint === 1) {
            this.selectRobotFlag = false;
          }
        }
      },
      deep: true,
      immediate: true,
    },
    taskAi(newV,oldV){
     this.taskForm.Ai = newV
    }
  },
  async mounted() {
    await this.init();
    await this.initCarrierType();
    await this.initCarOption();
    await this.initTaskList();
    await this.initPlanList();
  },
  methods: {
    async init() {
      let self = this;
      self.options = [];
      getCarTypeByType()
        .then((response) => {
          let carTypeArr = response.data;
          for (let i = 0, len = carTypeArr.length; i < len; i++) {
            let optionObj = {
              value: carTypeArr[i].Code,
              label: carTypeArr[i].Desc,
            };
            self.options.push(optionObj);
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

      const res1 = await getExecuteTypeList();
      if (res1.code === 20000) {
        this.runTypeList = res1.data || [];
      }
      const res2 = await getPlanEnableList();
      if (res2.code === 20000) {
        self.enableList = res2.data || [];
      }
      const res3 = await getFrequencyTypeList();
      if (res3.code === 20000) {
        self.frequencyTypeList = res3.data || [];
      }

      //   const res4 = await getPlanTypeList();
      //   if (res4.code === 20000) {
      //     self.planTypeList = res4.data || [];
      //   } else {
      //     self.$message({
      //       message: res4.data,
      //       type: 'error',
      //     });
      //   }
    },
    initCarrierType() {
      let self = this;
      self.robotTypeOption = [];
      getCarrierTypeByDic()
        .then((response) => {
          let carTypeArr = response.data;
          for (let i = 0, len = carTypeArr.length; i < len; i++) {
            let optionObj = {
              value: carTypeArr[i].dicCode,
              label: carTypeArr[i].dataDescription,
            };
            self.robotTypeOption.push(optionObj);
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
    initCarOption() {
      let self = this;

      self.carOptions = [];
      getCarrierList({
        keyWord: '',
      })
        .then((response) => {
          let carArr = response.data;
          for (let i = 0, len = carArr.length; i < len; i++) {
            let optionObj = {
              label: carArr[i].CarrierName,
              value: carArr[i].CarrierID,
              carType: carArr[i].CarrierType,
            };
            self.carOptions.push(optionObj);
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
    initPlanList() {
      let self = this;
      self.planTaskArr = [];
      const { keyWord, planType } = self;
      getAllPatrolPlan({
        keyWord,
        planType: planType || -1,
      })
        .then((response) => {
          let planArr = response.data || [];
          //  console.log("查看巡检计划",planArr)
          if (planArr.length) {
            //表格数据重构
            planArr.forEach((item) => {
              self.runTypeList.forEach((node) => {
                if (item.ExecuteType == node.Code) {
                  item.executeTypeName = node.Desc || '';
                }
              });
              self.options.forEach((node) => {
                if (item.PlanType == node.value) {
                  item.plantypeName = node.label || '';
                }
              });
              if (item.PlanType === 1) {
                self.frequencyTypeList.forEach((node) => {
                  if (item.FrequencyType == node.Code) {
                    let txt = '';
                    switch (item.FrequencyType) {
                      case 1:
                        txt = node.Desc;
                        break;
                      case 2:
                        let number = '';
                        switch (item.FrequencyCount) {
                          case 1:
                            number = '一';
                            break;
                          case 2:
                            number = '二';
                            break;
                          case 3:
                            number = '三';
                            break;
                          case 4:
                            number = '四';
                            break;
                          case 5:
                            number = '五';
                            break;
                          case 6:
                            number = '六';
                            break;
                          case 7:
                            number = '日';
                            break;
                          default:
                            break;
                        }
                        txt = node.Desc + number;
                        break;
                      case 3:
                        txt = node.Desc + item.FrequencyCount + '号';
                        break;
                      default:
                        break;
                    }
                    item.frequencyTypeName = txt;
                  }
                });
              } else {
                item.frequencyTypeName = '--';
              }
              self.enableList.forEach((node) => {
                if (item.IsEnable == node.Code) {
                  item.isEnableName = node.Desc || '';
                }
              });

            });
          }
          //   self.planTaskArr = planArr;
          this.$store.dispatch('global/setPlanTasks', planArr || []);
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
    initTaskList() {
      let self = this;
      this.processOptions = [];
      getPatrolTemplateSelectList()
        .then((response) => {
          let carTypeArr = response.data;
          for (let i = 0, len = carTypeArr.length; i < len; i++) {
            let optionObj = {
              value: carTypeArr[i].id,
              label: carTypeArr[i].taskName,
            };
            self.processOptions.push(optionObj);
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
    },
    addTimedTask(item, flag) {
      this.dialogFormVisible = true;
      this.taskAi = []
      if (flag === 1) {
        this.taskForm = {
          isEdit: false,
          PlanName: '',
          PlanType: '',
          TaskTemplateID: '',
          ExecuteType: '',
          FrequencyType: 1,
          ExecuteCount: 1,
          ExecuteSpace: 0,
          OpenTime: '',
          IsEnable: 1,
          CarrierID: '',
          FrequencyCount: 1,
          StartTime: '',
          EndTime: '',
          //剩余执行次数
          executeState: 0,
          residueCount: '',
          state: '',
        };
        this.dialogType = 'addTimedTask';
      } else if (flag === 2) {
        this.dialogType = 'editTimedTask';
        this.taskForm = {
          isEdit: true,
          ...item,
        };
        this.taskAi = this.taskForm.DetectionTypeList

        console.log("查看详情",this.taskForm,this.taskAi)
      }
      if (flag === 3) {
        this.dialogType = 'detail';
        this.taskForm = {
          isDetail: true,
          ...item,
        };
        console.log('查看详情',this.taskForm)
        this.taskAi = this.taskForm.DetectionTypeList

      } else {
        this.taskForm.isDetail = false;
      }
      this.$nextTick(() => {
        this.$refs.taskForm.clearValidate();
      });
    },
    addSuccess() {
      let self = this;
      this.$refs.taskForm.validate((valid) => {
        if (valid) {
          const {
            PlanName,
            PlanType,
            TaskTemplateID,
            ExecuteType,
            FrequencyType,
            ExecuteCount,
            ExecuteSpace,
            OpenTime,
            YunPAngle,
            YunTAngle,
            IsEnable,
            CarrierID,
            FrequencyCount,
            isEdit,
            PlanID,
            StartTime,
            EndTime,
            //剩余执行次数
            residueCount,
            executeState,
            state,
          } = self.taskForm;
          let time = self.taskForm.OpenTime;
          // console.log("查看执行时间",time)
          if (time && time.length === 5) {
            time = time + ':00';
          }
          if (PlanType == 2 || PlanType == 1) {
            self.taskForm.StartTime = ''
            self.taskForm.EndTime = ''
          }
          let obj = {
            planName: PlanName,
            planType: PlanType,
            taskTemplateID: TaskTemplateID,
            executeType: ExecuteType,
            carrierID: CarrierID,
            //carrierType: CarrierID,
            executeCount: ExecuteCount,
            frequencyType: FrequencyType,
            frequencyCount: FrequencyCount,
            openTime: time ? time : '',
            executeSpace: ExecuteSpace,
            isEnable: IsEnable,
            startTime: self.taskForm.StartTime,
            endTime: self.taskForm.EndTime,
            yunPAngle: YunPAngle,
            yunTAngle: YunTAngle,
            residueCount,
            executeState,
            state,
            detectionTypeList:self.taskAi,
          };
          // Date.parse(this.taskForm.EndTime)>Date.parse(this.taskForm.StartTime)
          // console.log("查看时间")
          if (this.taskForm.StartTime !== null && obj.startTime !== ':00') {
            if (Date.parse(obj.startTime) > Date.parse(obj.endTime)) {
              self.$notify({
                title: '提示',
                message: '开始时间不能大于结束时间',
                type: 'warning',
                duration: 1000,
              });
              return;
            }
            if (Date.parse(obj.startTime) + 600000 < Date.now()) {
              self.$notify({
                title: '提示',
                message: '开始时间应大于当前时间',
                type: 'warning',
                duration: 1000,
              });
              return;
            }
          }
          if (!isEdit) {
            addPatrolPlan(obj)
              .then((response) => {
                console.log("查看参数",obj)
                if (response.code === 20000) {
                  // this.dialogFormVisible = false;
                  self.initPlanList();
                  self.cancelOperate();
                  self.$notify({
                    title: self.$t('user.Success'),
                    message: self.$t('user.Create_Success'),
                    type: 'success',
                    duration: 1000,
                  });
                  this.taskForm = {
                    PlanName: '',
                    PlanType: '',
                    TaskTemplateID: '',
                    ExecuteType: '',
                    FrequencyCount: 1,
                    ExcuteCount: 1,
                    ExcuteSpace: 1,
                    OpenTime: '',
                    IsEnable: false,
                    CarrierID: '',
                    StartTime: '',
                    EndTime: '',
                  };
                }
              })
              .catch((error) => {
                // self.dialogFormVisible = false;
                self.$notify({
                  title: self.$t('user.Failure'),
                  message: self.$t('user.interface_call_failed_tip'),
                  type: 'error',
                  duration: 1000,
                });
              });
          } else {
            obj.planID = PlanID;
            updatePatrolPlan(obj)
              .then((response) => {
                console.log("查看修改的参数",obj)
                let data = response.data;
                if (response.code === 20000) {
                  self.initPlanList();
                  // this.dialogFormVisible = false;
                  self.cancelOperate();
                  this.$notify({
                    title: this.$t('user.Success'),
                    message: this.$t('user.Update_Success'),
                    type: 'success',
                    duration: 1000,
                  });
                }
              })
              .catch((error) => {
                // this.dialogFormVisible = false;
                self.$notify({
                  title: self.$t('user.Failure'),
                  message: self.$t('user.interface_call_failed_tip'),
                  type: 'error',
                  duration: 1000,
                });
              });
          }
        } else {
          return false;
        }
      });
    },
    goLocation() {
      console.log(this.planID)
      startPatrolPlan(this.planID, true).then((res) => {
        this.lowButtery = false
        if (res.code === 20000) {
          this.$notify({
            type: 'success',
            message: res.data,
            title: '提示',
            duration: 3000,
          });
        }
      })
    },
    // 关闭
    cancelOperate(taskForm) {
      //   this.$refs.taskForm.resetFields();
      this.dialogFormVisible = false;
      // this.taskForm = {
      //   timedName: '',
      //   robotName: '',
      //   processName: '',
      //   executeWay: '',
      //   mapShowName: '',
      //   enableType: false,
      //   excutes: '',
      //   cycle: '',
      //   endTime: '',
      //   openTime: '',
      // };
    },
    deleteTimedTask(obj) {
      let self = this;
      if (obj) {
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
            deletePatrolPlan({
              ID: obj.PlanID,
            })
              .then((response) => {
                if (response.code === 20000) {
                  this.$notify({
                    type: 'success',
                    message: '删除成功！',
                    title: '提示',
                    duration: 1000,
                  });
                  self.initPlanList();
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
    stopTask(obj) {
      this.$confirm('确定要终止该任务吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          if (!obj.PlanID) return;
          const res = await stopPatrolPlan(obj.PlanID);
          if (res.code === 20000) {
            this.$notify({
              type: 'success',
              message: res.data,
              title: '提示',
              duration: 1000,
            });
            this.initPlanList();
          }
        })
        .catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消删除',
          //   });
        });
    },

    startTask(obj) {
      this.$confirm('确定要启动该任务吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          if (!obj.PlanID) return;
          this.planID = obj.PlanID
          const res = await startPatrolPlan(obj.PlanID, false);
          if (res.code === 20000) {
            this.$notify({
              type: 'success',
              message: res.data,
              title: '提示',
              duration: 3000,
            });
          } else if (res.code === 20001) {
            console.log('提示两次aaa')
            // this.$notify({
            //   type: 'error',
            //   message: res.data,
            //   title: '提示',
            //   duration: 3000,
            // });
          } else if (res.code === 20003) {
            this.lowButtery = true
          }
        })
        .catch((res) => {
          // this.$message({
          //   type: 'info',
          //   message: res.data,
          // });
          // console.log("查看启动失败原因",res)
        });
    },

    frequencyTypeChange(val) {
      // console.log(val)
      this.taskForm.FrequencyCount = ''
      if (!val || val === 1) {
        this.$refs.taskForm.clearValidate('FrequencyCount');

      }
    },
  },
};
</script>

<style lang="scss" scoped>
.inspection-header {
  padding: 0 10px;
  background-color: lightblue;
  border: 1px solid #fff;

  .inspection-setting-title {
    display: inline;
  }

  .inspec-setting-inquire {
    display: inline;
    height: 50px;
    // margin-bottom: 10px;
    float: right;
  }
}

::v-deep .el-table::before {
  height: 0;
}
::v-deep .el-input::before {
  height: 0;
}

.robot-body {
  padding: 0 10px;
  margin-bottom: 0;
  background-color: lightblue;
  border: 1px solid #fff;

}

.detail-sty {
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  color: black;

  ::v-deep .el-input {
    width: 200px;
  }

  ::v-deep .el-dialog__body {
    padding: 10px;
  }
}
::v-deep .el-input.is-disabled .el-input__inner {

height: 32px;
background-color: transparent !important;
color: #fff;
}
::v-deep  .el-input__inner
 {
  height: 1.875rem;
  background-color: transparent;
  color: #fff;
}
.dialog-header {
  background: lightgreen;
  border: 1px solid green;
  border-radius: 5px;
  padding: 8px 10px;
  text-align: center;
}

.inspect-point {
  border-left: 3px solid rgba(44, 181, 171, 0.9);
  border-right: 3px solid rgba(44, 181, 171, 0.9);
  border-bottom: 3px solid rgba(44, 181, 171, 0.9);
  padding: 40px 20px 20px;
  margin-top: -25px;
}

.dialog-footer {
  margin: 10px 66px;
}

>>>.el-dialog__body .el-input {
  width: 200px;
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

.el-divider--horizontal {
  height: 3px;
  background-color: rgba(44, 181, 171, 0.9);
}

.el-divider__text {
  background-color: lightblue;
}

>>>.el-dialog__header {
  padding: 20px;
  background-color: lightgray;
}

>>>.el-dialog__body {
  padding: 20px;
  margin-left: 10px;
}
::v-deep .el-checkbox{
  margin-left: 5px;
}
>>>.el-dialog {
  width: 540px;
}

>>>.el-input-number--mini {
  width: auto;
}

>>>.common-form-footer {
  // margin-top: 10px;
  margin-left: 0px;
  width: 100%;
  text-align: center;
}

>>>.formSelect1 .el-input {
  width: 84px;
}

>>>.formSelect {
  .el-input {
    width: 98px;
  }
}

>>>.el-table__body-wrapper {
  height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
