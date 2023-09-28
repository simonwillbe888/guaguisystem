<template>
  <div style="padding: 1%; background: rgb(6,30,51);">
    <div class="inspection-header content-header">
      <!-- <h3 class="inspection-setting-title">
        {{ $t("process_config.taskProcess_manage_label") }}
      </h3> -->
      <div class="inspec-setting-inquire">
        <el-button
          class="inspect-operate"
          icon="el-icon-plus"
          type="success"
          size="mini"
          @click="addInspectTask()"
          >添加巡检流程</el-button
        >
        <!-- <el-button
          type="success"
          size="mini"
          @click="getTaskPrograssList"
          class="inspect-operate"
        >
          查询</el-button
        > -->
      </div>
    </div>
    <div class="robot-body content-body">
      <!-- <div style="background-color: lightblue">
        <el-divider content-position="left">
          <div style="padding: 8px 2px">
            <span style="font-size: 16px; color: rgb(48, 29, 15)">{{
              $t("process_config.inspectTask_list")
            }}</span>
          </div>
        </el-divider>
      </div> -->
      <div class="inspectTask-table">
        <el-table
          class="inspect-task"
          ref="singleTable"
          :data="processTaskArr"
          header-row-class-name="header-row-class"
          row-class-name="row-class"
          fit
          highlight-current-row
          size="small"
          height="39.5rem"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="60"
          >
          </el-table-column>
          <!-- <el-table-column prop="process_id" label="流程ID" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.process_id }}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="process_name" label="流程名称" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.process_name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="map_name" label="地图显示名称" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.map_name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.createTime }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="task_name"
                           label="巡检任务名称"
                           align="center"
                           width="180">
            <template slot-scope="{row}">
              <span>{{ row.task_name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="inspect_id"
                           label="巡检点ID"
                           align="center"
                           width="80">
            <template slot-scope="{row}">
              <span>{{ row.inspect_id }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="inspect_point"
                           label="巡检点名称"
                           align="center"
                           width="160">
            <template slot-scope="{row}">
              <span>{{ row.inspect_point }}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="operate"
            width="300"

            label="操作"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                icon="el-icon-s-tools"
                size="mini"
                class="greenButton"
                @click="configInspectPoint(row)"
                >配置流程</el-button
              >
              <el-button
                class="process-operate greenButton"
                icon="el-icon-edit"
                size="mini"
                plain
                @click="editInspectTask(row)"
                >{{ $t('process_config.edit_label') }}</el-button
              >
              <el-button
                class="process-operate"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteInspectTask(row)"
                >{{ $t('process_config.delete_label') }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div>
         <pagination v-show="total > 0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getTaskPrograssList" />
        </div>
      </div>
    </div>
    <div class="dialog-sty" >
      <el-dialog style="width:50%;margin-left: 25%;"

        :title="taskDialog[dialogType]"
        :visible.sync="processDialogVisible"
        :close-on-click-modal="false"
      >
        <el-form
          label-width="150px"
          :model="taskForm"
          :rules="rules"
          ref="taskForm"
        >
          <el-form-item label="流程名称" prop="processName">
            <el-input
              placeholder="请输入流程名称"
              class="process-input"
              v-model="taskForm.processName"
            ></el-input>
          </el-form-item>
          <el-form-item label="地图显示名称" prop="mapName">
            <!-- <el-input
              placeholder="请输入地图名称"
              class="process-input"
              v-model="taskForm.mapName"
            ></el-input> -->
            <el-select
              v-model="taskForm.mapName"
              placeholder="请选择区域"
              clearable
            >
              <el-option
                v-for="item in bigAreaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="common-form-footer">
            <el-button
              type="primary"
              @click="
                dialogType === 'addInspectsTask'
                  ? addSuccess('taskForm', taskForm)
                  : editSuccess('taskForm', taskForm)
              "
              style="background-color: var(--bt-confirm-bg)"
              >{{ $t('inspection_setting.sure_add_label') }}</el-button
            >
            <el-button
                style="background-color: var(--bt-cancel-bg);color: var(--font-color)"
                plain @click="cancel('taskForm')">{{
              $t('inspection_setting.cancel_add_label')
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-dialog
      :title="$t('process_config.config_inspectTask')"
      :visible.sync="dialogFormVisible"
      center
    >
      <div style="background-color: lightblue">
        <el-divider content-position="left">
          <div style="padding: 8px 2px">
            <span style="font-size: 16px; color: rgb(48, 29, 15)">{{
              $t('process_config.taskInspect_point')
            }}</span>
          </div>
        </el-divider>
      </div>
      <div class="inspect-point">
        <el-transfer
          :titles="['巡检点列表', '目标巡检点']"
          :button-texts="['到左边', '到右边']"
          filterable
          :filter-method="filterMethod"
          :target-order="'push'"
          filter-placeholder="请输入巡检点名称"
          v-model="$root.inspectsVal"
          :render-content="renderFunc"
          :data="$root.allInspectArr"
          :left-default-checked="hasCheckedWHLeftData"
          @left-check-change="handleWHLeftChange"
          style="text-align: left; display: inline-block; font-size: 12px"
        >
        </el-transfer>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="add()">{{
          $t('process_config.sure_add_label')
        }}</el-button>
        <el-button type="primary" plain @click="dialogFormVisible = false">{{
          $t('process_config.cancel_add_label')
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import {
  getAllPatrolLocation,
  getPatrolTemplate,
  getPatrolTemplatePageList,
  getAllPatrolTemplate,
  addPatrolTemplate,
  deletePatrolTemplate,
  updatePatrolTemplate,
} from '@/api/taskConfig';
import Pagination from '@/components/Pagination';

import {getArea} from '@/api/areaConfig.js'
const inspectOptions = [];
export default {
  components:{Pagination},

  data() {
    const generateData = (_) => {
      const data = [];
      const inspects = inspectOptions;
      inspects.forEach((point, index) => {
        data.push({
          label: point,
          key: index,
        });
      });
      return data;
    };
    return {
      renderFunc(h, option) {
        return <span>{option.label}</span>;
      },
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      inquireVal: '',
      processTaskArr: [],
      dialogFormVisible: false,
      processDialogVisible: false,
      dialogType: '',
      taskDialog: {
        addInspectsTask: this.$t('process_config.addInspectTask_label'),
        editInspectsTask: this.$t('process_config.editInspectTask_label'),
      },
      taskForm: {
        processId: '',
        processName: '',
        mapName: '',
        inspectedTask: '',
        inspectedId: '',
        inspectedPoint: '',
      },
      rules: {
        processName: [
          { required: true, message: '请输流程名称', trigger: 'change' },
          { max: 32, message: '流程名称不能超过32个字符' }
        ],
        // inspectedTask: [
        //   { required: true, message: '请输入巡检任务名称', trigger: 'change' },
        // ],
        mapName: [
          { required: true, message: '请选择地图显示名称', trigger: 'change' },
        ],
      },
      currentRobot: '',
      currentInspectPoint: '',
      checkAll: false,
      checkedPoints: [],
      points: inspectOptions,
      isIndeterminate: true,
      inspectPoints: '',
      currentRow: null,
      hasCheckedWHLeftData: [],
      ID: 0,
      bigAreaOptions:[],
      total:0,
      page:1,
      limit:10
    };
  },
  mounted() {
    this.initProcessConfig();
  },
  methods: {
    getTaskPrograssList() {
      let self = this;
      self.processTaskArr = [];
      let params ={
        current:self.page,
        limit:self.limit,
        templateName:''
      }
      getPatrolTemplatePageList(params)
        .then((response) => {
          let processArr = response.data.records;
          self.total = response.data.total
          if (processArr.length) {
            for (let i = 0, len = processArr.length; i < len; i++) {
              let inspectObj = {
                process_id: processArr[i].id,
                process_name: processArr[i].taskName,
                map_name: processArr[i].mapDisplayName,
                createTime: processArr[i].createTime,
                areaId:processArr[i].areaId
              };
              self.processTaskArr.push(inspectObj);
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
    initProcessConfig() {
      let self = this;
      self.processTaskArr = [];
      this.$root.allInspectArr = [];
      this.getTaskPrograssList();
      getAllPatrolLocation()
        .then((response) => {
          // console.log("查看巡检点",response.data)
          let inspectArr = response.data;
          if (inspectArr.length) {
            for (let i = 0, len = inspectArr.length; i < len; i++) {
              let inspectObj = {
                key: inspectArr[i].locationID,
                label: inspectArr[i].name,
              };
              self.$root.allInspectArr.push(inspectObj);
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
        //获取巡检区域
        getArea()
        .then((response) => {
          let accessTypeArr = response.data;
          for (let i = 0; i < accessTypeArr.length; i++) {
            let optionObj = {
              value: accessTypeArr[i].id,
              label: accessTypeArr[i].areaName,
            };
            self.bigAreaOptions.push(optionObj);
          }
        })

    },
    handleChange(value, direction, movedKeys) {
      // console.log(value, direction, movedKeys);
    },
    addInspectTask() {
      this.processDialogVisible = true;
      this.dialogType = 'addInspectsTask';
      this.taskForm = {
        processName: '',
        mapName: '',
      };
      this.$nextTick(() => {
        this.$refs.taskForm.clearValidate();
      });
    },
    editInspectTask(item) {
      if (item) {
        this.processDialogVisible = true;
        this.dialogType = 'editInspectsTask';
        this.ID = item.process_id;
        this.taskForm = {
          processName: item.process_name,
          mapName: item.map_name,
          areaId:item.areaId
        };
      }
    },
    addSuccess(tasksFormData, taskData) {
      let self = this;
      this.$refs[tasksFormData].validate((valid) => {
        if (valid) {
          let param = {
            taskName: taskData.processName,
            mapDisplayName: taskData.mapName,
            areaId:taskData.mapName
          };
          addPatrolTemplate(param)
            .then((response) => {
              console.log('新增参数',param)
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '新增成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.initProcessConfig();

                this.$refs[tasksFormData].resetFields();
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
        this.processDialogVisible = false;
      });
    },
    editSuccess(tasksFormData, taskData) {
      let self = this;
      this.$refs[tasksFormData].validate((valid) => {
        if (valid) {
          let param = {
            id: self.ID,
            taskName: taskData.processName,
            mapDisplayName: taskData.mapName,
            areaId:taskData.areaId

          };
          updatePatrolTemplate(param)
            .then((response) => {
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '修改成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.initProcessConfig();
                this.$refs[tasksFormData].resetFields();
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
        this.processDialogVisible = false;
      });
    },
    cancel(tasksFormData) {
      this.$refs[tasksFormData].resetFields();
      this.processDialogVisible = false;
    },
    deleteInspectTask(obj) {
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
            deletePatrolTemplate(obj.process_id)
              .then((response) => {
                if (response.code === 20000) {
                  this.$notify({
                    type: 'success',
                    message: '删除成功',
                    title: '提示',
                    duration: 1000,
                  });
                  self.initProcessConfig();
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
          .catch(() => {});
      }
    },
    configInspectPoint(item) {
      console.log('配置流程详情',item)
      this.$router.push({
        name: 'action_actionManage_label',
        query: { id: item.process_id, title: item.process_name,areaId:item.areaId,mapName:item.map_name },
      });
      // let arr = [];
      // this.inspectPoints = item;
      // let itemArr = item.order;
      // if (itemArr instanceof Array && itemArr.length) {
      //   for (let i = 0, len = itemArr.length; i < len; ++i) {
      //     let it = this.$root.allInspectArr.find((obj) => {
      //       return obj.key === itemArr[i];
      //     });
      //     if (it) {
      //       arr.push(it.key);
      //     } else {
      //       let faultObj = {
      //         key: itemArr[i],
      //         label: "错误点",
      //         disabled: true,
      //       };
      //       this.$root.allInspectArr.push(faultObj);
      //       arr.push(itemArr[i]);
      //     }
      //   }
      // }
      // this.$root.inspectsVal = arr;
      // this.dialogFormVisible = true;
    },
    add() {
      let self = this;
      let sonArr = [];
      if (this.$root.inspectsVal.length) {
        let faultArr = this.$root.allInspectArr.filter(
          (item) => item.label === '错误点'
        );
        for (let j = 0, length = faultArr.length; j < length; ++j) {
          let index = this.$root.inspectsVal.findIndex(
            (item) => item === faultArr[j].key
          );
          if (index !== -1) {
            this.$root.inspectsVal.splice(index, 1);
          }
        }
        for (let i = 0, len = this.$root.inspectsVal.length; i < len; i++) {
          let obj = {
            Sequence: i + 1,
            LocationID: this.$root.inspectsVal[i],
          };
          sonArr.push(obj);
        }
      }
      let param = {
        ID: this.inspectPoints.process_id,
        TaskTemplateName: this.inspectPoints.process_name,
        MapDisplayName: this.inspectPoints.map_name,
        ItemObj: sonArr,
      };
      updatePatrolTemplate(param)
        .then((response) => {
          if (response.code === 20000) {
            this.$notify({
              type: 'success',
              message: '修改成功',
              title: '提示',
              duration: 1000,
            });
            self.initProcessConfig();
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
      this.dialogFormVisible = false;
    },
    handleCheckAllChange(val) {
      this.checkedPoints = val ? inspectOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.points.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.points.length;
    },
    drag() {
      let el = document
        .querySelector('.el-transfer')
        .querySelectorAll('.el-checkbox-group')[1];
      new Sortable(el, {
        forceFallback: false,
        onUpdate: (event) => {
          let box = this.$el
            .querySelector('.el-transfer')
            .querySelectorAll('.el-checkbox-group')[1];
          let nums = this.$el
            .querySelector('.el-transfer')
            .querySelectorAll('.el-checkbox-group')[1].childNodes.length;
          if (event.newIndex >= nums) {
            return;
          }
          let newIndex = event.newIndex;
          let oldIndex = event.oldIndex;
          let $label = box.children[newIndex];
          let $oldLabel = box.children[oldIndex];
          box.removeChild($label);
          if (newIndex < oldIndex) {
            box.insertBefore($label, $oldLabel);
          } else {
            box.insertBefore($label, $oldLabel.nextSibling);
          }
          let item = this.$root.inspectsVal.splice(oldIndex, 1);
          this.$root.inspectsVal.splice(newIndex, 0, item[0]);
        },
      });
    },
    // 数据左侧列表元素被用户选中 / 取消选中时触发
    handleWHLeftChange(key, key1) {
      var _this = this;
      console.log(_this.hasCheckedWHLeftData);
      _this.hasCheckedWHLeftData = _this.commonChangeFuc(
        key,
        key1,
        _this.hasCheckedWHLeftData,
        _this.firstWHLeftLocation,
        _this.lastWHLeftLocation,
        _this.data,
        'id'
      );
      this.drag();
    },
    // 公共按住shift 多选
    commonChangeFuc(
      key,
      key1,
      hasCheckedData,
      firstLocation,
      lastLocation,
      arrList,
      inspectsVal
    ) {
      var _this = this;
      var cFlag = false; //取消勾选
      for (var i = 0; i < key.length; i++) {
        if (key[i] == key1[0]) {
          cFlag = true; //选中
        }
      }
      if (cFlag) {
        if (key.length == 1) {
          firstLocation = 0;
          hasCheckedData.push(key[0]);
        } else if (key.length > 1) {
          let arr = [];
          // 当前有选中数据 并且 按住shift
          if (_this.shiftKey) {
            // if (isRight) {
            for (let i = 0; i < arrList.length; i++) {
              let item = inspectsVal ? arrList[i][inspectsVal] : arrList[i];
              if (item == key[key.length - 2]) {
                firstLocation = i;
              }
              if (item == key1[0]) {
                lastLocation = i;
              }
            }
            if (firstLocation != -1 && lastLocation != -1) {
              if (firstLocation < lastLocation) {
                for (var k = 0; k < arrList.length; k++) {
                  let item = inspectsVal ? arrList[k][inspectsVal] : arrList[k];

                  if (k >= firstLocation && k <= lastLocation) {
                    hasCheckedData.push(item);
                  }
                }
              } else if (firstLocation > lastLocation) {
                for (var k = 0; k < arrList.length; k++) {
                  if (k >= lastLocation && k <= firstLocation) {
                    hasCheckedData.push(item);
                  }
                }
              }
            }
          } else {
            //不再按shift
            hasCheckedData.push(key1[0]);
          }
        }
      } else {
        //取消选中的
        hasCheckedData = [];
        for (var i = 0; i < key.length; i++) {
          if (key[i] != key1[0]) {
            hasCheckedData.push(key[i]);
          }
        }
      }
      // 去重
      hasCheckedData = new Set(hasCheckedData);
      hasCheckedData = Array.from(hasCheckedData);
      return hasCheckedData;
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
    height: 4vh;

    .inspect-operate {
      background-color: #64C8C8 !important;
    }
  }
}
.robot-body {
  padding: 0 10px;
  background-color: lightblue;
  border: 1px solid #fff;
  .inspectTask-table {
    // border-left: 3px solid rgba(44, 181, 171, 0.9);
    // border-right: 3px solid rgba(44, 181, 171, 0.9);
    // border-bottom: 3px solid rgba(44, 181, 171, 0.9);
    // padding: 40px 20px 20px;

    .inspect-task {
      font-size: 13px;
      width: 100%;
      background: rgba(1, 10, 53, 0);
      color: #301d0f;
    }
  }
}
::v-deep .el-table::before{
     height: 0 !important;
   }

.dialog-sty {
  >>> .el-dialog {
    width: 500px;
  }
  >>> .el-dialog__body {
    padding: 20px;
    margin-left: 88px;
  }
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
  padding: 40px 10px 20px;
  margin-top: -25px;
  text-align: center;
  >>> .el-transfer__buttons {
    padding: 0 10px;
  }
  >>> .el-transfer-panel {
    width: 169px;
    border: 1px solid black;
  }
  >>> .el-transfer-panel
    .el-transfer-panel__header
    .el-checkbox
    .el-checkbox__label {
    font-size: 14px !important;
  }
}
.dialog-footer {
  margin: 20px;
  text-align: center;
}

.process-input {
  width: 12.5rem;
}

>>> .el-table th,
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

.el-divider--horizontal {
  height: 3px;
  background-color: rgba(44, 181, 171, 0.9);
}

.el-divider__text {
  background-color: lightblue;
}

>>> .el-dialog__header {
  padding: 20px;
  background-color: lightgray;
}

>>> .el-dialog__body {
  padding: 20px;
}

.board-column-content {
  height: auto;
  overflow: hidden;
  // border: 10px solid transparent;
  min-height: 60px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
}
::v-deep  .el-input__inner
 {
  width: 12.5rem;
  // height: 1.875rem;
  background-color: transparent;
  color: var(--font-color);
}
</style>
