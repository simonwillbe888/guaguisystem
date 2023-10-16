<template>
    <div style="padding: 1%; background: rgb(6,30,51);">
      <div class="robot-header content-header">
        <!-- <h3 class="alarm-setting-title">{{ $t('alarm_setting.alarm_standard_settings') }}</h3> -->
        <el-button
            style="margin:0"
            icon="el-icon-plus"
            type="success"
            size="mini"
            @click="addAlarmWindow()"
            >添加语音</el-button
          >

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
          height="37rem"
        >
          <el-table-column type="index" label="序号" align="center" width="150">
          </el-table-column>

          <el-table-column
            prop="text"
            :label="'语音播报内容'"
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.text }}</span>
            </template>
          </el-table-column>
     
        
  
          <el-table-column
            prop="createTime"
            :label="'创建时间'"
            align="center"
            width="250"
          >
            <template slot-scope="{ row }">
              <span>{{row.createTime}}</span>
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
              style="background-color:#64C8C8 ;color:#fff"
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
                @click="deleteVoiceMessage(row)"
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
            ? '新增语音播报内容'
            : '修改语音播报内容'
        "
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        class="dialog-class"
        @close="cancel()"
      >
        <el-form
          class="common-form"
          :model="alarmForm"
          :rules="rules"
          ref="alarmForm"
        
        >
         
          </el-form-item>


          <el-form-item
            :label="'播报内容'"
            :label-width="formLabelWidth"
            prop="text"
          >
            <el-input 
              type="textarea"
              v-model.number="alarmForm.text"
              placeholder="请输入语音播报内容"
            ></el-input>
          </el-form-item>
          <el-form-item class="common-form-footer">
            <div style="margin:1% 8%"> 
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
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 关联操作--明细 -->
    </div>
  </template>
  
  <script>
  import {
    getVoicePageList,
    addVoice,
    deleteVoice,
    updateVoice,
  } from '@/api/alarm';
  import Pagination from '@/components/Pagination';
  
  export default {
    components: { Pagination },
    data() {
      return {
        alarmType: '',
        alarmInfoArr: [],
        // 新增
        dialogFormVisible: false,
        formLabelWidth: '110px',
        dialogType: '',
        alarmForm: {
          id: '',
          text: '',
          createTime: '',
        },
        rules: {
          // AlarmCode: [
          //   { required: true, message: '请输入告警码', trigger: 'change' },
          // ],
          text: [
            { required: true, message: '请输入播报内容', trigger: 'change' },
          ],
        },
        total: 0,
        page: 1,
        limit: 10,
        totalDetail: 0,

      };
    },
    mounted() {
            this.init()
    },
    methods: {
      init() {
        let self = this;
        let param = {
          current: self.page,
          limit: self.limit,
        };
        getVoicePageList(param)
          .then((response) => {
            console.log('告警配置',response.data)
            self.total = response.data.total;
             this.alarmInfoArr = (response.data || {}).records;
  
          })
          .catch((error) => {
  
          });
      },
      // 告警类型、设备类型、级别、处理方式

      // 删除
      deleteVoiceMessage(item) {
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
            // console.log("删除ID",param)
            deleteVoice(item.id)
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
              text: alarmForm.text,
            };
            console.log("查看新增数据",param)
            addVoice(param).then((response) => {
                if (response.code === 20000) {
                  this.cancel();
                  self.init();
                  this.$notify({
                    type: 'success',
                    message: '新增成功！',
                    title: '提示',
                    duration: 1000,
                  });
                }
                else{
                }
              })
              .catch((error) => {
                this.cancel();
              });
            
        }  });
      },
      editAlarm(obj) {
        if (obj) {
          this.dialogFormVisible = true;
          this.dialogType = 'editAlarmTask';
          this.alarmForm = { ...obj };
        }
            // this.alarmForm.gasType = obj.AlarmName
      },
      // 修改成功
      editSuccess(alarmData) {
        let self = this;
        this.$refs.alarmForm.validate((valid) => {
          if (valid) {
            let param = {
              text: alarmData.text,
              id:alarmData.id,
            };
            updateVoice(param)
              .then((response) => {
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
                else{
                }
              })
              .catch((error) => {
                this.cancel();
              });
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.alarmForm = {
          text: '',
        };
      },
      cancel(alarmForm) {
        this.$refs.alarmForm.resetFields();
        this.dialogFormVisible = false;
        this.resetForm();
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
    ::v-deep .el-form-item__error{
      line-height:2.5;
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
  ::v-deep  .el-input__inner
   {
    height: 1.875rem;
    background-color: transparent;
    color: #fff;
  }
  >>> .el-dialog__body {
    padding: 20px;
  }
  .detail-dialog-footer {
    text-align: right;
    margin-right: 10px;
  }
  </style>
  