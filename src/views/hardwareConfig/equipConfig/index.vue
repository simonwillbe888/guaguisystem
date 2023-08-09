<template>
  <div style="padding: 1%; background: rgb(6,30,51);">
    <div class="robot-header content-header">
      <!-- <h3 class="robot-setting-title">
        {{ $t("equip_setting.equip_list_label") }}
      </h3> -->
      <div class="robot-setting-inquire">
        <!-- {{ $t("equip_setting.equip_name") }} -->
        <!-- <el-input
          class="robot-inquire"
          v-model="inquireVal"
          size="mini"
          :placeholder="$t('equip_setting.equip_tooltip')"
          clearable
        ></el-input> -->
        <el-button
          icon="el-icon-plus"
          class="robot-operate"
          type="success"
          size="mini"
          @click="plusAccesso()"
          >{{ $t('equip_setting.add_equip_label') }}</el-button>

        <!-- <el-button
          type="success"
          class="robot-operate"
          size="mini"
          @click="init"
          >{{ $t('equip_setting.inquire_label') }}</el-button >-->

      </div>
    </div>
    <div class="robot-body content-body">
      <el-table
        class="robot-data"
        ref="singleTable"
        :data="accessoInfoArr"
        header-row-class-name="header-row-class"
        row-class-name="row-class"
        fit
        height="39rem"
        highlight-current-row
        size="small"
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" label="序号" align="center" width="100">
        </el-table-column>
        <!-- <el-table-column prop="id" label="配件ID" align="center" width="80">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="name" label="配件名称" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="配件编号" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="brand" label="配件品牌" align="center">
          <template slot-scope="{ row }">
            <span>{{ text(row.brand, 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="配件类型" align="center">
          <template slot-scope="{ row }">
            <span>{{ text(row.type, 2) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="配件状态"
          align="center"
          width="120"
        >
          <template slot-scope="{ row }">
            <span>{{ text(row.state, 3) }}</span>
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="details"-->
<!--          label="配件详情"-->
<!--          align="center"-->

<!--        >-->
<!--          <template slot-scope="{ row }">-->
<!--            <el-button-->
<!--              type="primary"-->
<!--              icon="el-icon-document"-->
<!--              size="mini"-->
<!--              plain-->
<!--              @click="editAccessoed(row, 1)"-->
<!--              >{{ $t('plan_config.inqireDetail_label') }}</el-button-->
<!--            >-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column prop="operate" label="操作" width="300"  align="center">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-document"
              size="mini"
              plain
              @click="editAccessoed(row, 1)"
            >{{ $t('plan_config.inqireDetail_label') }}</el-button
            >
            <el-button
              class="robot-operate"
              style="background-color:#64C8C8 ;color:#fff"

              icon="el-icon-edit"
              size="mini"
              plain
              @click="editAccessoed(row,null)"
              >修改</el-button
            >
            <el-button
              class="robot-operate"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteAccesso(row)"
              >{{ $t('equip_setting.deleteAccesso_label') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="accessoDialog[dialogType]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="cancelOperate"
      width="740px"
    >
      <el-form
        label-width="100px"
        :model="accessoForm"
        :rules="rules"
        ref="accessoForm"
        style="margin-left:30px"
        :inline="true"
      >
        <!-- <el-form-item
          :label="$t('equip_setting.accesso_number')"
          prop="accessoNum"
        >
          <el-input
            :disabled="accessoForm.isEdit || accessoForm.state==2"
            placeholder="请输入配件编号"
            v-model="accessoForm.accessoNum"
          ></el-input>
        </el-form-item> -->
        <el-form-item
          :label="$t('equip_setting.equip_name')"
          prop="accessoName"
        >
          <el-input
            placeholder="请输入配件名称"
            :disabled="accessoForm.isEdit  || accessoForm.state==2"
            v-model="accessoForm.accessoName"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('equip_setting.accesso_type')"
          prop="accessoType"
        >
          <el-select  style="width:185px"
            placeholder="请选择配件类型"
            :disabled="accessoForm.isEdit  || accessoForm.state==2"
            v-model="accessoForm.accessoType"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.Code"
              :label="item.Desc"
              :value="item.Code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('equip_setting.accesso_state')"
          prop="accessoState"
        >
          <el-select style="width:188px"
            placeholder="请选择配件状态"
            clearable
            v-model="accessoForm.accessoState"
            @focus="selectChange()"
          >
            <el-option
              v-for="item in stateOptions"
              :key="item.Code"
              :label="item.Desc"
              :value="item.Code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('equip_setting.camera_type')"
          prop="cameraType"
        >
          <el-select style="width:185px"
            placeholder="请选择设备类型"
            :disabled="accessoForm.isEdit  || accessoForm.state==2"
            v-model="accessoForm.cameraType"
            clearable
          >
            <el-option
              v-for="item in cameraOptions"
              :key="item.Code"
              :label="item.Desc"
              :value="item.Code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('equip_setting.brand_name')" prop="brandName">
          <el-select style="width:188px"
            :disabled="accessoForm.isEdit  || accessoForm.state==2"
            v-model="accessoForm.brandName"
            placeholder="请选择品牌"
            clearable
          >
            <el-option
              v-for="item in brandNameOptions"
              :key="item.Code"
              :label="item.Desc"
              :value="item.Code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('equip_setting.accesso_ip')" prop="accessoIp">
          <el-input
            :disabled="accessoForm.isEdit  || accessoForm.state==2"
            v-model="accessoForm.accessoIp"
            placeholder="请输入ip"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('equip_setting.accesso_port')"
          prop="accessoPort"
        >
          <el-input
            :disabled="accessoForm.isEdit  || accessoForm.state==2"
            placeholder="请输入端口"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            v-model.number="accessoForm.accessoPort"
          ></el-input>
        </el-form-item>

        <el-form-item :label="$t('equip_setting.user_name')" prop="userName">
          <el-input
           :disabled="accessoForm.isEdit  || accessoForm.state==2"
            placeholder="请输入用户名"
            v-model="accessoForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('equip_setting.password_label')"
          prop="password"
        >
          <el-input
            :disabled="accessoForm.isEdit  || accessoForm.state==2"
            placeholder="请输入密码"
            v-model="accessoForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="推流地址" prop="rtsp">
          <el-input
            style="width:490px;margin:10px 0;"
            type="textarea"
            maxlength="150"
            placeholder="请输入推流地址"
            :disabled="accessoForm.isEdit  || accessoForm.state==2"
            v-model="accessoForm.rtsp"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!accessoForm.isEdit" class="common-form-footer">
          <el-button
            size="mini"
            type="primary"
            @click="
              dialogType === 'addAccesso'
                ? addSuccess('accessoForm', accessoForm)
                : editSuccess('accessoForm', accessoForm)
            "
            >{{ $t('equip_setting.sure_label') }}</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="cancelOperate('accessoForm')"
            >{{ $t('equip_setting.cancel_label') }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  getPatrolDicByType,
  addAccessory,
  deleteAccessory,
  updateAccessory,
  getPatrolDicByState,
  getPatrolDicByCamera,
  getPatrolDicByBrand,
} from '@/api/accesso';

export default {
  data() {
    return {
      inquireVal: '',
      accessoInfoArr: [],
      dialogFormVisible: false,
      dialogType: '',
      options: [],
      stateOptions: [],
      cameraOptions: [],
      accessoDialog: {
        addAccesso: this.$t('equip_setting.plusAccesso_label'),
        editAccesso: this.$t('equip_setting.editAccesso_label'),
        detail: '配件详情',
      },
      accessoForm: {
        accessoName: '',
        accessoNum: '',
        accessoType: '',
        accessoBrand: '',
        accessoState: 1,
        accessoIp: '',
        accessoPort: '',
        cameraType: '',
        brandName: '',
        userName: '',
        password: '',
      },
      brandNameOptions: [],
      rules: {
        accessoName: [
          {
            required: true,
            message: '请输入配件名称',
            trigger: 'blur',
          },
        ],
        // accessoNum: [
        //   {
        //     required: true,
        //     message: '请输入配件编号',
        //     trigger: 'blur',
        //   },
        // ],
        accessoType: [
          {
            required: true,
            message: '请选择配件类型',
            trigger: 'change',
          },
        ],
        accessoState: [
          {
            required: true,
            message: '请选择配件状态',
            trigger: 'change',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change',
          },
        ],
        userName: [
          {
            required: true,
            message: '请输入用户名称',
            trigger: 'change',
          },
        ],
        accessoPort: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入端口'));
              } else if (
                !/^(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[0-5]\d{4}|[1-9]\d{0,3})$/.test(
                  value
                )
              ) {
                callback(new Error('请输入正确端口'));
              } else {
                callback();
              }
            },
          },
        ],
        cameraType: [
          {
            required: true,
            message: '请选择设备类型',
            trigger: 'change',
          },
        ],
        accessoIp: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入配件IP'));
              } else if (
                !/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(
                  value
                )
              ) {
                callback(new Error('请输入正确IP'));
              } else {
                callback();
              }
            },
          },
        ],
        brandName: [
          {
            required: true,
            message: '请选择品牌',
            trigger: 'change',
          },
        ],
        rtsp: [
          {
            required: true,
            message: '输入推流地址',
            trigger: 'change',
          },
        ],
      },
      currentRow: null,
      standByChecked: false,
      standByPoint: '',
      simuChecked: false,
      simuStarts: '',
      dialogDetailFlag: false,
      detailForm: {
        accessType: '',
        ip: '',
        port: '',
        cameraType: '',
        brandName: '',
        userName: '',
        password: '',
        rtsp: '',
      },
      ID: 0,
      selectState:null,
    };
  },
  mounted() {
    this.initAccesso();
    this.initBrand();
    this.init();
  },
  methods: {
    initBrand() {
      getPatrolDicByBrand()
        .then((res) => {
          if (res.code === 20000) {
            this.brandNameOptions = res.data || [];
          }
        })
        .catch((error) => {
          this.$notify({
            title: this.$t('user.Failure'),
            message: this.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    initAccesso() {
      getPatrolDicByType()
        .then((res) => {
          if (res.code === 20000) {
            this.options = res.data || [];
          }
          this.initState();
        })
        .catch((error) => {
          this.$notify({
            title: this.$t('user.Failure'),
            message: this.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    initState() {
      getPatrolDicByState()
        .then((res) => {
          if (res.code === 20000) {
            // console.log("配件使用状态",res.data)
            this.stateOptions = res.data || [];
          }
          this.initCamera();
        })
        .catch((error) => {
          this.$notify({
            title: this.$t('user.Failure'),
            message: this.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    initCamera() {
      getPatrolDicByCamera()
        .then((res) => {
          if (res.code === 20000) {
            this.cameraOptions = res.data || [];
          }
        })
        .catch((error) => {
          this.$notify({
            title: this.$t('user.Failure'),
            message: this.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    init() {
      let self = this;
      self.accessoInfoArr = [];
      getList()
        .then((response) => {
          let accessoArr = response.data;
          // console.log("查看配件状态",accessoArr)
          for (let i = 0, len = accessoArr.length; i < len; i++) {
            let rowObj = {
              id: accessoArr[i].id,
              number: accessoArr[i].accessoryCode,
              brand: accessoArr[i].accessoryBrand,
              name: accessoArr[i].accessoryName,
              type: accessoArr[i].accessoryType,
              state: accessoArr[i].accessoryState,
              cameraType: accessoArr[i].configJson['cameraType'],
              ip: accessoArr[i].configJson['ip'],
              brandName: accessoArr[i].configJson['brandName'],
              port: accessoArr[i].configJson['port'],
              userName: accessoArr[i].configJson['userName'],
              password: accessoArr[i].configJson['passWord'],
              rtsp: accessoArr[i].configJson.rtsp,
            };
            self.accessoInfoArr.push(rowObj);

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
    inquireAccesso() {
      if (this.inquireVal && this.accessoInfoArr.length !== 0) {
        let newRobotArr = [];
        for (let i = 0, len = this.accessoInfoArr.length; i < len; i++) {
          if (this.inquireVal == this.accessoInfoArr[i].name) {
            newRobotArr.push(this.accessoInfoArr[i]);
          }
        }
        if (newRobotArr.length) {
          this.accessoInfoArr = newRobotArr;
        } else {
          alert('未检索到满足要求的配件');
        }
      } else {
        this.init();
      }
    },
    selectChange(){
      // console.log(this.selectState)
      if(this.selectState ==2){
        this.$notify({
          title: '提示',
          message: '当前配件使用中，是否进行修改',
          duration: 0
        });
      }
    },

    plusAccesso() {
      this.dialogFormVisible = true;
      this.selectState =  null
      this.dialogType = 'addAccesso';
      this.resetForm();
      //   this.accessoForm.isEdit = false;
    },
    addSuccess(accessoForm, accessoParam) {
      let self = this;
      this.$refs.accessoForm.validate((valid) => {
        if (valid) {
          let sonObj = {
            ip: accessoParam.accessoIp,
            cameraType: accessoParam.cameraType,
            port: Number(accessoParam.accessoPort),
            userName: accessoParam.userName,
            brandName: accessoParam.brandName,
            passWord: accessoParam.password,
            modelNo: 'HK001',
            rtsp: accessoParam.rtsp,
          };
          let param = {
            accessoryCode: accessoParam.accessoNum,
            accessoryBrand: accessoParam.brandName,
            accessoryName: accessoParam.accessoName,
            accessoryType: accessoParam.accessoType,
            accessoryState: accessoParam.accessoState,
            configJson: JSON.stringify(sonObj),
            rtsp: accessoParam.rtsp,
          };
          addAccessory(param)
            .then((response) => {
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '新增成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.init();
                this.dialogFormVisible = false;
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
          // console.log('error submit!!');
          return false;
        }
      });
    },
    editAccessoed(item, flag) {
      this.dialogFormVisible = true;
      this.dialogType = 'editAccesso';
      // console.log("查看修改row",item)
      this.selectState = item.state
      if (item) {
        this.ID = item.id;
        this.accessoForm = {
          accessoName: item.name,
          accessoNum: item.number,
          accessoBrand: item.brand,
          accessoIp: item.ip,
          accessoPort: item.port,
          brandName: item.brandName,
          userName: item.userName,
          password: item.password,
          accessoType: item.type,
          //   port: item.port,
          accessoState: item.state,
          cameraType: item.cameraType,
          rtsp: item.rtsp,
          state:item.state,
        };
      }
      if (flag === 1) {
        this.accessoForm.isEdit = true;
        this.dialogType = 'detail';
      } else {
        this.accessoForm.isEdit = false;
      }
    },
    editSuccess(accessoForm, accessoParam) {
      let self = this;
      this.$refs[accessoForm].validate((valid) => {
        if (valid) {
          let sonObj = {
            ip: accessoParam.accessoIp,
            port: Number(accessoParam.accessoPort),
            userName: accessoParam.userName,
            brandName: accessoParam.brandName,
            cameraType: accessoParam.cameraType,
            passWord: accessoParam.password,
            modelNo: 'HK001',
            rtsp: accessoParam.rtsp,
          };
          let param = {
            id: self.ID,
            accessoryCode: accessoParam.accessoNum,
            accessoryBrand: accessoParam.brandName,
            accessoryName: accessoParam.accessoName,
            accessoryType: accessoParam.accessoType,
            accessoryState: accessoParam.accessoState,
            configJson: JSON.stringify(sonObj),
            rtsp: accessoParam.rtsp,
          };

          updateAccessory(param)
            .then((response) => {
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '修改成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.init();
                this.dialogFormVisible = false;
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
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 关闭
    cancelOperate(accessoForm) {
      this.dialogFormVisible = false;
      this.$refs.accessoForm.resetFields();
      this.resetForm();
    },
    deleteAccesso(item) {
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
            deleteAccessory(item.id)
              .then((response) => {
                let data = response.data;
                if (response.code === 20000) {
                  self.init();
                  this.$notify({
                    title: this.$t('user.Success'),
                    message: this.$t('user.Delete_Success'),
                    type: 'success',
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
          .catch(() => {});
      }
    },
    resetForm() {
      this.accessoForm = {
        accessoName: '',
        accessoNum: '',
        accessoType: '',
        accessoBrand: '',
        accessoState: (this.stateOptions[0] || {}).Code,
        accessoIp: '',
        accessoPort: '',
        cameraType: '',
        brandName: '',
        userName: '',
        password: '',
      };
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    text(val, flag) {
      let txt = '';
      switch (flag) {
        case 1:
          this.brandNameOptions.forEach((item) => {
            if (item.Code === val) {
              txt = item.Desc;
            }
          });
          break;
        case 2:
          this.options.forEach((item) => {
            if (item.Code === val) {
              txt = item.Desc;
            }
          });
          break;
        case 3:
          this.stateOptions.forEach((item) => {
            if (item.Code === val) {
              txt = item.Desc;
            }
          });
          break;
        default:
          break;
      }
      return txt;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}
.robot-header {
  padding:5px 10px 10px 10px;
  background-color: lightblue;
  border: 1px solid #fff;

  .robot-setting-title {
    display: inline;
  }

  .robot-setting-inquire {
    // display: inline;
    height: 30px;
    // width: 100%;
    .robot-inquire {
      width: 150px;
      margin-right: 10px;
    }


  }
}
::v-deep  .el-input__inner
 {
  height: 1.875rem;
  background-color: transparent;
  color: #fff;
}
.robot-body {
  padding: 0 10px;
  background-color: lightblue;
  border: 1px solid #fff;

  .robot-data {
    font-size: 13px;
    width: 100%;
    //background: rgba(1, 10, 53, 0);
    color: #301d0f;
  }
}

>>> .el-input {
  width: 200px;
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
  background-color:#2A3940 ;
}

>>> .el-dialog__body {
  padding: 20px;
  // margin-left: 88px;
}

>>> .el-checkbox__label {
  font-size: 12px;
}

>>> .el-input.is-disabled .el-input__inner {
  background-color:#2A3940 ;
}

>>> .el-input__inner {
  background-color:#2A3940 ;
  &::placeholder {
    font-size: 12px;
    background-color:#2A3940 ;
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

.detail-form {
  text-align: center;
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

.detail-dialog-footer {
  margin: 20px;
  text-align: right;
}

>>> .el-dialog {
  width: 540px;
  .common-form-footer {
    width: 100%;
    text-align: center;
    margin-left: 20px;
    margin-top: 20px;
  }
}
</style>
