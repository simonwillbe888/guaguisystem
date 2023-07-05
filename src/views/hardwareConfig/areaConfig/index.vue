<template>
  <div style="padding: 1%">
    <div class="robot-header content-header">
      <!-- <h3 class="robot-setting-title">
        {{ $t("equip_setting.equip_list_label") }}
      </h3> -->
      <div class="robot-setting-inquire">
        <!-- {{ $t("area_setting.keyword_label") }} -->
        <!-- <el-input
          class="robot-inquire"
          v-model="keywordVal"
          size="mini"
          :placeholder="$t('area_setting.input_keyword_label')"
          clearable
        ></el-input> -->
        <el-button
          class="robot-operate"
          icon="el-icon-plus"
          type="success"
          size="mini"
          @click="plusAccesso()"
          >新增区域</el-button
        >
        <!-- <el-button
          class="robot-operate"
          type="success"
          size="mini"
          @click="inquireAccesso()"
          >{{ $t('equip_setting.inquire_label') }}</el-button
        > -->
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
        highlight-current-row
        size="small"
        @current-change="handleCurrentChange"
        :empty-text="'暂无数据'"
        height="36.5rem"
      >
        <el-table-column type="index" label="序号" align="center" width="150" >
        </el-table-column>
        <el-table-column prop="code" label="区域编码" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="区域名称" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="parentID" label="是否为子区域" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.parentID ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" align="center" >
          <template slot-scope="{ row }">
            <el-button
              style="background-color:#64C8C8 ;color:#fff"    
              icon="el-icon-edit"
              size="mini"
              plain
              @click="editList(row)"
              >修改</el-button
            >
            <el-button
              class="robot-operate"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteList(row)"
              >{{ $t('equip_setting.deleteAccesso_label') }}</el-button
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
    <el-dialog
      :title="accessoDialog[dialogType]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      class="dialog-class"
      @close="cancelOperate"
      width="460px"
    >
      <el-form
        label-width="120px"
        :model="accessoForm"
        :rules="rules"
        ref="accessoForm"
      >
        <!-- <el-form-item
          :label="$t('area_setting.area_code_label')"
          prop="areaCode"
        >
          <el-input
            placeholder="请输入区域编码"
            v-model.trim="accessoForm.areaCode"
          ></el-input>
        </el-form-item> -->
        <el-form-item
          :label="$t('area_setting.area_name_label')"
          prop="areaName"
        >
          <el-input
            placeholder="请输入区域名称"
            v-model.trim="accessoForm.areaName"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('area_setting.bigArea_name_label')"
          prop="bigAreaName"
        >
          <el-select
            placeholder="请选择父区域"
            v-model="accessoForm.bigAreaName"
            clearable
            
          >
            <el-option
              v-for="item in bigAreaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="common-form-footer">
          <el-button
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
            plain
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
  getAreaList,
  getArea,
  getAddArea,
  getUpdateArea,
  getDeleteArea,
} from '@/api/areaConfig.js';
import Pagination from '@/components/Pagination';

export default {
  components: { Pagination },
  data() {
    return {
      keywordVal: '',
      accessoInfoArr: [],
      dialogFormVisible: false,
      dialogType: '',
      accessoDialog: {
        addAccesso: this.$t('area_setting.add_area_label'),
        editAccesso: this.$t('area_setting.editor_area_label'),
      },
      accessoForm: {
        id: '',
        areaCode: '',
        areaName: '',
        bigAreaName: '',
      },
      bigAreaOptions: [],
      rules: {
        // areaCode: [
        //   {
        //     required: true,
        //     message: '请输入区域编码',
        //     trigger: 'blur',
        //   },
        // ],
        areaName: [
          {
            required: true,
            message: '请输入区域名称',
            trigger: 'blur',
          },
        ],
      },
      currentRow: null,
      ID: 0,
      total: 0,
      page: 1,
      limit: 10,
    };
  },
  mounted() {
    this.init();
    this.initAccesso();
  },
  methods: {
    initAccesso() {
      let self = this;
      self.bigAreaOptions = [];
      getArea()
        .then((response) => {
          let accessTypeArr = response.data;
          for (let i = 0, len = accessTypeArr.length; i < len; i++) {
            let optionObj = {
              value: accessTypeArr[i].id,
              label: accessTypeArr[i].areaName,
              parentID: accessTypeArr[i].parentID,
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
    init() {
      let self = this;
      let param = {
        current: self.page,
        limit: self.limit,
        searchKey: self.keywordVal,
      };
      self.accessoInfoArr = [];
      getAreaList(param)
        .then((response) => {
          self.total = response.data.total;
          let accessoArr = response.data.records;
          for (let i = 0, len = accessoArr.length; i < len; i++) {
            let rowObj = {
              id: accessoArr[i].id,
              parentID: accessoArr[i].parentID || '',
              code: accessoArr[i].areaCode,
              name: accessoArr[i].areaName,
              createTime: accessoArr[i].createTime,
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
    // 新增
    plusAccesso() {
      this.dialogFormVisible = true;
      this.dialogType = 'addAccesso';
      this.resetForm();
      this.$nextTick(() => {
        this.$refs.accessoForm.clearValidate();
      });
      this.bigAreaOptions.forEach((node) => {
        node.disabled = false;
      });
    },
    addSuccess(accessoForm, accessoParam) {
      let self = this;
      this.$refs.accessoForm.validate((valid) => {
        if (valid) {
          let param = {
            areaCode: accessoParam.areaCode,
            areaName: accessoParam.areaName,
            parentID: accessoParam.bigAreaName || 0,
          };
          getAddArea(param)
            .then((response) => {
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '新增成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.init();
                self.initAccesso();
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
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 修改
    editList(item) {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.accessoForm.clearValidate();
      });
      this.dialogType = 'editAccesso';
      if (item) {
        this.ID = item.id;
        this.accessoForm = {
          id: item.id,
          areaCode: item.code,
          areaName: item.name,
          bigAreaName: item.parentID,
        };
      }
      if (!this.bigAreaOptions.length) return;
      this.bigAreaOptions.forEach((node) => {
        node.disabled = false;
        if (item.id === node.value) {
          node.disabled = true;
        }
      });
    },
    editSuccess(accessoForm, accessoParam) {
      let self = this;
      this.$refs[accessoForm].validate((valid) => {
        if (valid) {
          let param = {
            id: accessoParam.id,
            areaCode: accessoParam.areaCode,
            areaName: accessoParam.areaName,
            parentID: accessoParam.bigAreaName || 0,
          };
          getUpdateArea(param)
            .then((response) => {
              if (response.code === 20000) {
                this.$notify({
                  type: 'success',
                  message: '修改成功！',
                  title: '提示',
                  duration: 1000,
                });
                self.init();
                self.initAccesso();
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
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 关闭
    cancelOperate(accessoForm) {
      this.dialogFormVisible = false;
      this.resetForm();
      this.$nextTick(() => {
        this.$refs.accessoForm.resetFields();
      });
    },
    deleteList(item) {
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
            getDeleteArea({
              id: item.id,
            })
              .then((response) => {
                if (response.code === 20000) {
                  self.init();
                  this.$notify({
                    type: 'success',
                    message: '删除成功！',
                    title: '提示',
                    duration: 1000,
                  });
                  self.initAccesso();
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
        id: '',
        areaCode: '',
        areaName: '',
        bigAreaName: '',
      };
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-container {
  padding: 8px 16px;
}
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
    .robot-inquire {
      width: 150px;
      margin-right: 10px;
    }

    .robot-operate {
      width: 8vw;
      background-color: #64C8C8 !important;
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
.dialog-class {
  ::v-deep .el-dialog__body {
    padding: 20px;
    margin-left: 30px;
    .el-select .el-input .el-select__caret {
      line-height: 24px;
    }
    // input框中的叉叉
    .el-input__icon {
      line-height: 24px;
    }
    .el-input {
      width: 200px !important;
    }
    .el-input__inner {
      width: 200px !important;
    }
  }
}

>>> .el-checkbox__label {
  font-size: 12px;
}

// >>> .el-input.is-disabled .el-input__inner {
//   width: 110px;
// }

>>> .el-input__inner {
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
</style>
