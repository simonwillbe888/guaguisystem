<template>
  <div style="padding: 1%; background: rgb(6,30,51);">
    <div class="inspection-header content-header">
      <!-- <h3 class="inspection-setting-title">
        {{ $t("inspection_setting.inspecPoint_list") }}
      </h3> -->
      <el-button
          class="robot-operate"
          type="success"
          icon="el-icon-plus"
          size="mini"
          @click="plusInspects()"
          >新增巡检点</el-button
        >
      <div class="inspec-setting-inquire">
        <!-- {{ $t("inspection_setting.inspecName_label") }} -->
        <el-input
          class="robot-inquire"
          v-model="inquireVal"
          size="mini"
          :placeholder="$t('inspection_setting.inspec_tooltip')"
          clearable
        ></el-input>

        <el-button type="success"  @click="inquireInspect()">{{
          $t('inspection_setting.inquire_label')
        }}</el-button>
      </div>
    </div>
    <div class="robot-body content-body">
      <!-- <video width="320" height="240" controls>
        <source src="http://192.168.0.101:9096/api/PatrolData/stream"
              type="video/mp4">
      </video> -->
      <el-table
        class="inspect-data"
        :data="inspectInfoArr"
        header-row-class-name="header-row-class"
        row-class-name="row-class"
        fit
        height="39rem"
        highlight-current-row
        size="small"
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" label="序号" align="center" width="150">
        </el-table-column>
        <el-table-column prop="name" label="巡检点名称" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.Name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="导航点编号"
          align="center"

        >
          <template slot-scope="{ row }">
            <span>{{ row.VertexID }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="区域名称"
          align="center"

        >
          <template slot-scope="{ row }">
            <span>{{ row.AreaName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="annotation"
          label="地图标注名称"
          align="center"

        >
          <template slot-scope="{ row }">
            <span>{{ row.MapDisplayName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="group"
          label="所属组别"
          align="center"

        >
          <template slot-scope="{ row }">
            <span>{{ row.GroupID }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" align="center" width="280">
          <template slot-scope="{ row }">
            <!-- <router-link :to="'/taskConfig/inspectPoints/' + row.id"> -->
            <!-- <el-button type="primary" icon="el-icon-edit" size="mini" plain>
              {{ $t("inspection_setting.action_label") }}
            </el-button> -->
            <!-- </router-link> -->
            <el-button
              style="background-color:#64C8C8 ;color:#fff"
              icon="el-icon-edit"
              @click="editInspect(row)"
              size="mini"
              plain
              >{{ $t('inspection_setting.edit_label') }}</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteInspect(row)"
              size="mini"
              >{{ $t('inspection_setting.delete_label') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="inspectDialog[dialogType]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="120px"
        :model="inspectForm"
        :rules="rules"
        ref="inspectForm"
      >
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="巡检点名称" prop="inspectName">
          <el-input
          style="width:13.5vw"
            placeholder="请输入机器人名称"
            maxlength="20"
            v-model="inspectForm.inspectName"
          ></el-input>
        </el-form-item>
        </el-col >
        <el-col :span="12">
          <el-form-item label="导航点编号" prop="naviNumber">
          <el-input
            style="width:13.5vw"
            placeholder="请输入导航点编号"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            v-model.number="inspectForm.naviNumber"
          ></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="地图标注名称" prop="mapName">
          <el-input
          style="width:13.5vw"
            placeholder="请输入地图标注名称"
            v-model="inspectForm.mapName"
          ></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属组别" prop="belongGroup">
          <el-input
          style="width:13.5vw"
            placeholder="请输入所属组别"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            v-model.number="inspectForm.belongGroup"
          ></el-input>
        </el-form-item>
        </el-col>
      </el-row>

        <el-form-item :label="$t('robot_setting.area_label')" prop="siteName">
          <el-select
            clearable
            placeholder="请选择区域"
            v-model="inspectForm.siteName"
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
              dialogType === 'addInspects'
                ? addInspects('inspectForm', inspectForm)
                : editSuccess('inspectForm', inspectForm)
            "
            >{{ $t('inspection_setting.sure_add_label') }}</el-button
          >
          <el-button
            type="primary"
            plain
            @click="cancelOperate('inspectForm')"
            >{{ $t('inspection_setting.cancel_add_label') }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllPatrolLocation,
  addPatrolLocation,
  deletePatrolLocation,
  updatePatrolLocation,
} from '@/api/taskConfig';
import { getArea } from '@/api/areaConfig.js';

export default {
  data() {
    return {
      inquireVal: '',
      inspectInfoArr: [],
      inspectPoints:[],
      dialogFormVisible: false,
      dialogType: '',
      inspectDialog: {
        addInspects: this.$t('inspection_setting.plusInspect_label'),
        editInspects: this.$t('inspection_setting.editInspect_label'),
      },
      inspectForm: {
        inspectName: '',
        naviNumber: '',
        mapName: '',
        belongGroup: '',
        siteName: '',
      },
      bigAreaOptions: [],
      rules: {
        inspectName: [
          {
            required: true,
            message: '请输入巡检点名称',
            trigger: 'change',
          },
        ],
        naviNumber: [
          {
            required: true,
            message: '请输入导航点编号',
            trigger: 'change',
          },
        ],
        mapName: [
          {
            required: true,
            message: "请输入地图标注名称",
            trigger: "change",
          },
        ],
        siteName: [
          {
            required: true,
            message: "请输入地图标注名称",
            trigger: "change",
          },
        ],
        belongGroup: [
          {
            required: true,
            message: '请输入所属组别',
            trigger: 'change',
          },
        ],
      },
      currentInspect: '',
      currentRow: null,
      ID: 0,
    };
  },
  mounted() {
    this.init();
    this.initArea();
  },
  methods: {
    init() {
      let self = this;
      self.inspectInfoArr = [];
      getAllPatrolLocation()
        .then((response) => {
          self.inspectPoints = response.data;
           console.log("查看巡检计划",self.inspectPoints)
           self.inspectInfoArr = self.inspectPoints
          // if (self.inspectPoints.length) {
          //   for (let i = 0, len = self.inspectPoints.length; i < len; i++) {
          //     let inspectObj = {
          //       Id: self.inspectPoints[i].LocationID,
          //       Name: self.inspectPoints[i].Name,
          //       number: self.inspectPoints[i].VertexID,
          //       areaID: self.inspectPoints[i].AreaID,
          //       areaName: self.inspectPoints[i].AreaName,
          //       annotation: self.inspectPoints[i].MapDisplayName,
          //       group: self.inspectPoints[i].GroupID,
          //     };
          //     self.inspectInfoArr.push(inspectObj);
          //   }
          // }
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
    inquireInspect() {
      let self =this
      if (this.inquireVal && this.inspectPoints.length !== 0) {
        let newInspectArr = [];
        for (let i = 0; i <  this.inspectPoints.length; i++) {
          if (this.inquireVal == self.inspectPoints[i].Name) {
            newInspectArr.push(this.inspectPoints[i]);
          }
        }
        if (newInspectArr.length) {
          this.inspectInfoArr = newInspectArr;
        } else {
          alert('未检索到满足要求的巡检点');
        }
      } else {
        this.init();
      }
    },
    plusInspects() {
      this.dialogFormVisible = true;
      this.dialogType = 'addInspects';
      this.inspectForm = {
        inspectName: '',
        naviNumber: '',
        mapName: '',
        belongGroup: '',
        siteName: '',
      };
      this.$nextTick(() => {
        this.$refs.inspectForm.clearValidate();
      });
    },
    addInspects(inspectFormData, inspectData) {
      let self = this;
      this.$refs[inspectFormData].validate((valid) => {
        if (valid) {
          let param = {
            name: inspectData.inspectName,
            vertexID: Number(inspectData.naviNumber),
            mapDisplayName: inspectData.mapName,
            groupID: Number(inspectData.belongGroup),
            areaID: Number(inspectData.siteName),
          };
          addPatrolLocation(param)
            .then((response) => {
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '新增成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.init();
                self.resetForm();
                this.$refs[inspectFormData].resetFields();
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
          console.log('error submit!!');
          return false;
        }
        this.dialogFormVisible = false;
      });
    },
    editSuccess(inspectFormData, inspectData) {

      let self = this;
      this.$refs[inspectFormData].validate((valid) => {
        if (valid) {
          let param = {
            locationID: self.ID,
            name: inspectData.inspectName,
            vertexID: Number(inspectData.naviNumber),
            mapDisplayName: inspectData.mapName,
            groupID: Number(inspectData.belongGroup),
            areaID: Number(inspectData.siteName),
          };
          console.log("查看修改的参数",param,inspectData)
          updatePatrolLocation(param)
            .then((response) => {
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '修改成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.init();
                self.resetForm();
                this.$refs[inspectFormData].resetFields();
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
          console.log('error submit!!');
          return false;
        }
        this.dialogFormVisible = false;
      });
    },
    cancelOperate(inspectFormData) {
      this.dialogFormVisible = false;
      this.$refs[inspectFormData].resetFields();
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    editInspect(item) {
      console.log("查看修改巡检点的详情",item)
      this.dialogFormVisible = true;
      this.dialogType = 'editInspects';
      this.ID = item.LocationID;
      this.inspectForm = {
        inspectName: item.Name,
        naviNumber: item.VertexID,
        mapName: item.MapDisplayName,
        belongGroup: item.GroupID,
        siteName: item.AreaID,
        LocationID:item.LocationID
      };
    },
    deleteInspect(item) {
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
            console.log("查看删除ID",item)
            deletePatrolLocation(item.LocationID)
              .then((response) => {
                if (response.code === 20000) {
                  this.$notify({
                    type: 'success',
                    message: '删除成功！',
                    title: '提示',
                    duration: 1000,
                  });
                  self.init();
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
    resetForm() {
      this.inspectForm = {
        inspectName: '',
        naviNumber: '',
        mapName: '',
        belongGroup: '',
        siteName: '',
      };
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
  .robot-operate {
      background-color: #64C8C8 !important;
    }
  .inspec-setting-inquire {
    display: inline;
    float: right;
    .robot-inquire {
      width: 150px;
      margin-right: 10px;
    }


  }
}

.robot-body {
  padding: 0 10px;
  background-color: lightblue;
  border: 1px solid #fff;

  .inspect-data {
    font-size: 13px;
    width: 100%;
    background: rgba(1, 10, 53, 0);
    color: #301d0f;
  }
}

.dialog-header {
  background: lightgreen;
  border: 1px solid green;
  border-radius: 5px;
  padding: 8px 10px;
  text-align: left;
}

.detail-form {
  padding-left: 170px;
  font-size: 13px;
  font-weight: bold;
  color: black;

  >>> .el-input {
    width: 200px;
  }
}

.dialog-footer {
  margin: 20px;
  text-align: center;
}

>>> .el-input {
  width: 200px;
}
::v-deep  .el-input__inner
 {
  height: 1.875rem;
  background-color: transparent;
  color: #fff;
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
  margin-left: 70px;
}

>>> .el-dialog {
  width: 540px;
}
</style>
