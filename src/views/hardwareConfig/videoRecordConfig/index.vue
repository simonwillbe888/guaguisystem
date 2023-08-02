<template>
  <div style="background: rgb(3 27 49);">
    <div class="content-header">
      <el-button class="headerBtn" size="mini" @click="add" icon="el-icon-plus">新增录像机配置</el-button>

      <div class="inquireCamera">
      <el-input
        v-model="form1.dvrname"
        style="width:160px;"
        size="mini"
        placeholder="请输入录像机名称"
      ></el-input>
      <!-- <span style="margin:0 10px">品牌:</span> -->
      <el-select
        size="mini"
        v-model="form1.dvrbrandCode"
        placeholder="请选择品牌"
        clearable
        style="width:150px"
      >
        <el-option
          v-for="item in options"
          :key="item.Code"
          :label="item.Desc"
          :value="item.Code"
        >
        </el-option>
      </el-select>
      <!-- <span style="margin:0 10px">IP地址:</span> -->
      <el-input
        v-model="form1.ip"
        style="width:120px"
        size="mini"
        placeholder="请输入ip地址"
      ></el-input>
      <el-button style=" text-align: center;"  @click="getVideoRecords"
        >查询</el-button
      >
    </div>
    </div>
    <div class="content-body">
      <template>
        <el-table :data="videoRecordList" style="width: 100%"  height="39rem" :empty-text="'暂无数据'">
          <el-table-column type="index" label="序号" align="center" width="150">
          </el-table-column>
          <!-- <el-table-column prop="dvrbrand" label="配件ID"> </el-table-column> -->
          <el-table-column prop="dvrname" align="center" label="录像机名称">
          </el-table-column>
          <el-table-column prop="dvrcode" align="center" label="录像机编号">
            <template slot-scope="{ row }">
            <span>{{ row.dvrcode }}</span>
          </template>
          </el-table-column>
          <el-table-column prop="ip" align="center" label="IP地址">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="500"
          >
            <template slot-scope="{ row }">
              <el-button
                icon="el-icon-document"
                type="primary"
                @click="edit(row, true)"
                size="mini"
                plain
              >
                详情
              </el-button>

              <el-button
                class="robot-operate"
                type="primary"
                icon="el-icon-setting"
                size="mini"
                @click="connentAdvices(row)"
                >{{ $t('robot_setting.accessory_operate_label') }}</el-button
              >

              <el-button
                class="robot-operate"
                type="success"
                icon="el-icon-video-camera-solid"
                size="mini"
                @click="nvrRecord(row)"
                >录像回看</el-button
              >

              <el-button
                icon="el-icon-edit"
                style="background-color:#64C8C8 ;color:#fff"

                @click="edit(row, false)"
                size="mini"
                plain
              >
                修改
              </el-button>
              <el-button
                @click="delVideoRecord(row.id)"
                type="danger"
                size="mini"
                icon="el-icon-delete"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- <div class="pagination-container">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          size="mini"
        >
        </el-pagination>
      </div> -->
    </div>
    <el-dialog
      :title="
        form.isDetail
          ? '硬盘录像机配置详情'
          : form.isEdit
          ? '修改录像机配置'
          : '新增录像机配置'
      "
      :visible.sync="centerDialogVisible"
      width="820px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        class="form"
        :rules="rules"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="录像机品牌" prop="dvrbrand">
          <el-select
            size="mini"
            style="width:100%"
            v-model="form.dvrbrand"
            placeholder="请选择录像机品牌"
            :disabled="form.isDetail"
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
        <el-form-item label="相录像机名称" prop="dvrname">
          <el-input
            placeholder="请输入录像机名称"
            v-model="form.dvrname"
            :disabled="form.isDetail"
          ></el-input>
        </el-form-item>
        <el-form-item label="录像机编号" prop="dvrcode">
          <el-input
            placeholder="请输入录像机编号"
            v-model="form.dvrcode"
            :disabled="form.isDetail"
          ></el-input>
        </el-form-item>
        <el-form-item label="IP" prop="ip">
          <el-input
            placeholder="请输入IP"
            v-model="form.ip"
            :disabled="form.isDetail"
          ></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port">
          <el-input
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            placeholder="请输入端口号"
            v-model.number="form.port"
            :disabled="form.isDetail"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input
            placeholder="请输入用户名"
            v-model="form.userName"
            :disabled="form.isDetail"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input
            v-model="form.passWord"
            placeholder="请输入密码"
            :disabled="form.isDetail"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="!form.isDetail"
          style="width:100%"
          class="common-form-footer"
        >
          <div>
            <el-button type="primary" size="mini" @click="save">{{
              form.isEdit ? '保存编辑' : '立即新增'
            }}</el-button>
            <el-button type="primary" size="mini" @click="cancel"
              >取消</el-button
            >
          </div>
        </el-form-item>
      </el-form>

      <!-- <span slot="footer" class="dialog-footer"> </span> -->
    </el-dialog>

    <el-dialog
      title="添加通道"
      :visible.sync="DialogVisible"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form2"
        class="form2"
        :rules="rules2"
        :inline="true"
        :model="form2"
        label-width="100px"
      >
        <el-form-item label="输入通道号" prop="channel">
          <el-input
            placeholder="请输入通道号"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            v-model.number="form2.channel"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择相机" prop="accessoryCode">
          <el-select
            size="mini"
            v-model="form2.accessoryCode"
            placeholder="请选择品牌"
            clearable
          >
            <el-option
              v-for="item in sysCameraList"
              :key="item.id"
              :label="item.accessoryName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="saveChannel"
            >新增通道</el-button
          ></el-form-item
        >
      </el-form>
      <div class="content-body">
        <template>
          <el-table :data="details" style="width: 100%">
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="accessoryName" label="相机名称">
              <template slot-scope="{ row }">
                <span>
                  {{ cameraName(row.accessoryID) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="IP">
              <template slot-scope="{ row }">
                <span>
                  {{ cameraName(row.accessoryID, 'ip') }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="channel" label="通道号"> </el-table-column>
            <el-table-column label="操作" width="70">
              <template slot-scope="{ row }">
                <el-button type="danger" @click="delDetail(row)" size="mini">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="savelinked"
          >保存</el-button
        >
        <el-button type="primary" size="mini" @click="DialogVisible = false"
          >取消</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="录像回看"
      :visible.sync="nvrRecordVisible"
      width="60%"
      :close-on-click-modal="false"
    >
      <div class="content-body">
        <div style="display: flex;position:relative;height:3rem;align-items:center;float: right;margin-bottom: 1rem">
          <span>{{ $t('comment_vary.default_time_label') }}</span>
          <el-date-picker v-model="startVal" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                          @input="startTimeCheck"
                          :placeholder="$t('comment_vary.start_time_label')">
          </el-date-picker>
          <span> -- </span>
          <el-date-picker v-model="endVal" type="datetime" :placeholder="$t('comment_vary.end_time_label')"
                          @input="endTimeCheck"
                          style="margin-right: 20px" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
<!--          可见光红外-->
          <el-button @click="getNVRRecord()" size="mini">回放</el-button>
        </div>
        <div v-if="nvrRecordData.src == ''"
             class="nvrRecord"
             style="background-color: #000000;font-size: 1.5rem;align-items: center;justify-content: center;display: flex;">
          请选择录像起止时间 点击回放按钮查看
        </div>
        <iframe
          v-if="nvrRecordData.src != ''"
          class="nvrRecord"
          :myData="nvrRecordData"
          name="nvrRecord"
          :id="'nvrRecord'"
          :src="nvrRecordData.src">
        </iframe>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="nvrRecordVisible = false"
        >取消</el-button
        >
      </span>
    </el-dialog>

  </div>
</template>
<script>
import {
  getVideoRecordList,
  addVideoRecorder,
  updateVideoRecorder,
  delVideoRecordList,
  getCameraList,
  getSysCameraes,
  updateDetails,
} from '../../../api/robot.js';
export default {
  data() {
    return {
      keyWord: '',
      centerDialogVisible: false,
      DialogVisible: false,
      form: {
        dvrbrand: '',
        dvrname: '',
        ip: '',
        port: '',
        dvrcode: '',
        userName: '',
        passWord: '',
      },
      details: [],
      form1: {
        dvrname: '',
        dvrbrandCode: '',
        ip: '',
      },
      form2: {
        accessoryCode: '',
        channel: 33,
      },
      options: [],
      videoRecordList: [],
      currentPage: 1,
      total: 0,
      searchLoding: false,
      sysCameraList: [],
      rules: {
        dvrbrand: [
          { required: true, message: '请选择品牌', trigger: 'change' },
        ],
        dvrname: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        port: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入端口号'));
              } else if (
                !/^(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[0-5]\d{4}|[1-9]\d{0,3})$/.test(
                  value
                )
              ) {
                callback(new Error('请输入正确端口号'));
              } else {
                callback();
              }
            },
          },
        ],
        ip: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入ip'));
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
        dvrcode: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        passWord: [
          { required: true, message: '其请输入密码', trigger: 'blur' },
        ],
      },
      rules2: {
        accessoryCode: [
          { required: true, message: '请选择相机', trigger: 'change' },
        ],
        channel: [{ required: true, message: '请输入通道', trigger: 'change' }],
      },
      nvrRecordVisible: false,
      nvrRecordData: {src:''},
      nvrData: {},
      startVal: '',
      endVal: '',
      nvrTimePickerError: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getCameraes();
      this.getVideoRecords();
      this.getSysCameraList();
    },
    async getVideoRecords() {
      const { currentPage, form1 } = this;
      const res = await getVideoRecordList({
        current: currentPage,
        limit: 10,
        ...form1,
      });
      if (res.code === 20000) {
        this.videoRecordList = res.data || {} || [];
        // console.log("查看磁盘数据",res.data)
        this.total = (res.data || {}).length || 0;
      }
    },

    nvrRecord(obj){
      this.nvrRecordVisible = true
      this.nvrData = obj
      this.nvrRecordData= {src:''}
      this.startVal = ''
      this.endVal = ''
    },

    startTimeCheck(){
      // console.log('startTimeCheck',(new Date(this.endVal) - new Date(this.startVal)))
      if(this.endVal != ''){
        let betweenTime = new Date(this.endVal) - new Date(this.startVal)
        if(betweenTime > 86400000){
          this.$notify({
            message: '回放时间长度不能超过24小时',
            type: 'info',
            title: '提示',
          });
          this.nvrTimePickerError = true
        }else if(betweenTime < 0){
          this.$notify({
            message: '回放开始时间不能大于结束时间',
            type: 'info',
            title: '提示',
          });
          this.nvrTimePickerError = true
        }else {
          this.nvrTimePickerError = false
        }
      }
    },

    endTimeCheck(){
      // console.log('endTimeCheck',(new Date(this.endVal) - new Date(this.startVal)))
      if(this.startVal != ''){
        let betweenTime = new Date(this.endVal) - new Date(this.startVal)
        if(betweenTime > 86400000){
          this.$notify({
            message: '回放时间长度不能超过24小时',
            type: 'info',
            title: '提示',
          });
          this.nvrTimePickerError = true
        }else if(betweenTime < 0){
          this.$notify({
            message: '回放结束时间不能小于开始时间',
            type: 'info',
            title: '提示',
          });
          this.nvrTimePickerError = true
        }else {
          this.nvrTimePickerError = false
        }
      }
    },

    getNVRRecord(){
      this.nvrRecordData= {src:''}
      if(this.startVal == '' || this.endVal == ''){
        this.$notify({
          message: '请选择回放时间',
          type: 'warning',
          title: '提示',
        });
        return
      }
      if(this.nvrTimePickerError){
        this.$notify({
          message: '请选择正确回放时间区间',
          type: 'warning',
          title: '提示',
        });
        return
      }
      console.log('nvrData',this.startVal,this.endVal)
      let startTime = this.startVal.replace(/-|:|\.\d+/g, '').replace(' ','t')+'z'
      let endTime = this.endVal.replace(/-|:|\.\d+/g, '').replace(' ','t')+'z'
      let channel = '101'
      let webRtcIP = '192.168.20.6'
      this.nvrData.src = `/static/video.html?data=`+encodeURIComponent(`rtsp://${this.nvrData.userName}:${this.nvrData.passWord}@${this.nvrData.ip}:${this.nvrData.port}/Streaming/tracks/${channel}?starttime=${startTime}&endtime=${endTime}`)+`&serve=${webRtcIP}`
      // this.nvrData.src = `/static/video.html?data=`+encodeURIComponent(`rtsp://admin:jiaqi2023@192.168.20.66:554/Streaming/tracks/101?starttime=20230727t000000z&endtime=20230728t000000z`)+`&serve=192.168.20.23`
      this.nvrRecordData = Object.assign({},this.nvrData)
      this.$forceUpdate()
    },

    connentAdvices(obj) {
      const { details, id } = obj;
      this.form2.dvrid = id;
      this.details = [...details];
      this.DialogVisible = true;
      this.$nextTick(() => {
        this.$refs.form2.clearValidate();
      });
    },
    add() {
      this.form.isEdit = false;
      this.form = {
        dvrbrand: '',
        dvrname: '',
        ip: '',
        port: '',
        dvrcode: '',
        userName: '',
        passWord: '',
      };
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getVideoRecords();
    },
    delVideoRecord(id) {
      this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await delVideoRecordList({
            ID: id,
          });
          if (res.code === 20000) {
            this.$notify({
              message: '删除成功！',
              type: 'success',
              title: '提示',
              duration: 1000,
            });
            this.getVideoRecords();
          }
        })
        .catch(() => {});
    },

    async addRecorder() {
      const { form } = this;
      form.channel = Number(form.channel);
      form.port = Number(form.port);
      let res = {};
      if (form.isEdit) {
        // console.log("查看相机修改",form)
        res = await updateVideoRecorder(form);
      } else {
        res = await addVideoRecorder(form);
      }
      if (res.code === 20000) {
        this.$notify({
          message: '保存成功！',
          type: 'success',
          title: '提示',
          duration: 1000,
        });
        this.getVideoRecords();
        this.centerDialogVisible = false;
      }
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addRecorder();
        }
      });
    },
    cancel() {
      this.centerDialogVisible = false;
    },
    delDetail(data) {
      this.details = this.details.filter(
        (item) => item.channel !== data.channel
      );
    },
    async edit(item, isDetail) {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
      this.form = { ...item };
      this.form.isEdit = true;
      this.form.isDetail = isDetail;
      this.centerDialogVisible = true;
    },
    async getCameraes() {
      const res = await getCameraList();
      if (res.code === 20000) {
        this.options = res.data || [];
      }
    },
    async getSysCameraList() {
      const res = await getSysCameraes();
      if (res.code === 20000) {
        // console.log("查看摄像机列表",res.data)
        this.sysCameraList = res.data || [];
      }
    },
    addChannel() {
      this.DialogVisible = true;
    },
    saveChannel() {
      let flag = false;
      this.$refs.form2.validate((valid) => {
        if (valid) {
          flag = valid;
        } else {
          return false;
        }
      });
      if (!flag) return;
      const { accessoryCode, channel } = this.form2;
      let hasChannel = false;
      if (this.details.length) {
        this.details.forEach((item) => {
          if (item.accessoryID === accessoryCode || item.channel === channel) {
            hasChannel = true;
          }
        });
      }
      if (hasChannel) {
        this.$notify({
          message: '请不要经行重复配置',
          type: 'error',
          title: '提示',
          duration: 1000,
        });
        return;
      }
      this.details.push({
        accessoryID: Number(accessoryCode),
        channel: Number(channel),
      });
      this.form2 = {
        dvrid: this.form2.dvrid,
      };
      this.$nextTick(() => {
        this.$refs.form2.clearValidate();
      });
      //   this.DialogVisible = false;
    },
    cameraName(val, ip) {
      const { sysCameraList } = this;
      let text = '';
      if (sysCameraList && sysCameraList.length) {
        sysCameraList.forEach((item) => {
          if (Number(item.id) === val) {
            if (ip) {
              text = item.configJson.ip;
            } else {
              text = item.accessoryName;
            }
          }
        });
      }
      return text;
    },
    async savelinked() {
      const { form2, details } = this;
      try {
        const res = await updateDetails({
          details,
          dvrid: form2.dvrid,
        });
        if (res.code === 20000) {
          this.getVideoRecords();
          this.$notify({
            type: 'success',
            message: '保存成功',
            title: '提示',
            duration: 1000,
          });
          this.DialogVisible = false;
        }
      } catch (error) {}
    },
  },
};
</script>
<style scoped lang="scss">
.content-body {
  margin-top: 10px;
}
.headerBtn {
  background-color: #64C8C8 !important;
}

::v-deep .el-input__icon {
  line-height: 30px;
}

.nvrRecord{
  width: 100%;
  height: 30.5rem;
  border: none;
  display: inline-block;
  margin-top: 1rem;
}

  .content-header {

  margin-bottom: 10px;
  height: 38px;
  .inquireCamera{
    display: inline;
    float: right;
  }
  .el-input,
  .el-select {
    margin-right: 10px;
  }

}
::v-deep .el-table__fixed-right::before{
  height: 0;
}
.form {
  width: 70%;
  margin-left: 10%;

}
>>> .el-tree-node__label {
  font-size: 12px;
}
::v-deep .form {
  width: 100%;
  margin-left: 0px;
  .el-form-item {
    display: inline-block;
    width: 360px;
    margin-left: 20px;
  }
}
::v-deep  .el-input__inner
 {
  height: 1.875rem;
  background-color: transparent;
  color: #fff;
}
>>> .dialog-footer {
  .el-button {
    background: #565f65;
    border-color: #2e3235;
    margin-left: 10px;
    color: #fff;
  }
}
</style>
