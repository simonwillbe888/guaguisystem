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
                @click="nvrRecord(row,true)"
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
        <el-form-item label="录像机名称" prop="dvrname">
          <el-input
            placeholder="请输入录像机名称"
            v-model="form.dvrname"
            :disabled="form.isDetail"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="录像机编号" prop="dvrcode">
          <el-input
            placeholder="请输入录像机编号"
            v-model="form.dvrcode"
            :disabled="form.isDetail"
          ></el-input>
        </el-form-item> -->
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
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="!form.isDetail"
          style="width:100%"
          class="common-form-footer"
        >
          <div style="margin-right: 6% ;">
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
      ref="nvrDialog"
      id="nvrDialog"
      title="录像回看"
      :visible.sync="nvrRecordVisible"
      width="80%"
      :close-on-click-modal="false"
      @close="closeRecordDialog"
    >
      <div class="content-body">
        <div style="display: flex;position:relative;width: 100%">
          <div style="align-items: center;width: 45%;display: flex;justify-content: center;font-size: 1.5rem;margin-right: 2rem">
            {{ this.titleName }}
          </div>
          <div style="position:relative;display: flex;align-items: center;width: 55%">
            <span>{{ $t('comment_vary.default_time_label') }}</span>
            <el-date-picker v-model="startVal" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                            @input="startTimeCheck"
                            :clearable=false
                            :placeholder="$t('comment_vary.start_time_label')">
            </el-date-picker>
            <span> -- </span>
            <el-date-picker v-model="endVal" type="datetime" :placeholder="$t('comment_vary.end_time_label')"
                            @input="endTimeCheck"
                            :clearable=false
                            style="margin-right: 20px" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
            <el-button @click="getNVRRecord()" type="primary" size="mini" :loading="searchLoading">搜索</el-button>
            <el-button @click="resetting()" type="info" size="mini" :loading="searchLoading">重置</el-button>
          </div>
        </div>

        <div style="display: flex">
          <div v-show="recordVideoSrc == '' && nvrRecordData.src == ''"
               class="nvrRecord"
               style="background-color: #000000;font-size: 1.5rem;align-items: center;justify-content: center;display: flex;">
            点击[预览]直接查看录像<br/><br/>
            点击[加载]完成后支持快速[回看]
          </div>
          <video ref="recordVideo"
                 v-show="recordVideoSrc != ''"
                 controls autoplay
                 class="nvrRecord"
                 :src="recordVideoSrc"
          >
          </video>

          <div v-if="!recordReload"
               class="nvrRecord"
               style="background-color: #000000;font-size: 1.5rem;align-items: center;justify-content: center;display: flex;">
          </div>
          <iframe
            style="background-color: #000000"
            v-show="nvrRecordData.src != ''"
            class="nvrRecord"
            :myData="nvrRecordData"
            v-if="recordReload"
            name="nvrRecord"
            :id="'nvrRecord'"
            ref="nvrRecord"
            @load="onVideoLoaded('iframe')"
            :src="nvrRecordData.src">
          </iframe>

          <div style="margin: 1rem 0 0 1rem;width: 55%">
            <el-table
              id="recordTable"
              :key="recordTableKey"
              :data="fileList"
              style="width: 100%;"
              height="25rem"
              :header-cell-style="headerCellStyle"
              :cell-style="cellStyle"
              :cell-class-name="getCellClass"
              ref="recordTable"
            >
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="start" label="开始时间"> </el-table-column>
              <el-table-column prop="stop" label="结束时间"> </el-table-column>
              <el-table-column prop="size" label="录像大小" width="100">
                <template slot-scope="{ row }">
                <span>
                  {{ (row.size/1024/1024).toFixed(1) }}M
                </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="{ row,$index }">
                  <div style="display: flex;position: relative">
                    <el-progress v-if="row.downloading" style="margin-right: auto;margin-left: 1rem" :percentage="row.progress" :show-text="false" type="circle" :width="30"></el-progress>
                    <el-button v-if="!row.downloading" type="primary" @click="downloadRecord(row,$index)" size="mini">
                      加载
                    </el-button>
                    <el-button type="success" @click="playRecordFile(row)" :disabled="!row.download" size="mini">
                      回看
                    </el-button>
                    <el-button type="info" @click="playRecord(row,true)" size="mini">
                      预览
                    </el-button>
                  </div>

                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

      </div>

      <span slot="footer" class="dialog-footer">
        <div style="display: flex;justify-content: center;align-items: center;margin-top: 0.5rem">
          <el-button type="success" size="mini" @click="loadNextRecord(1)" :disabled="ids >= fileList.length">
            ←
          </el-button>
          <div style="margin: auto 1rem;width: 5rem;text-align: center;justify-content:center;">
            <span style="color: #FFFFFF;">
              {{ this.searchResultText }}
            </span>
          </div>
          <el-button type="success" size="mini" @click="loadNextRecord(-1)" :disabled="ids <= 0">
            →
          </el-button>
        </div>
        <div style="position: absolute;left: 1rem;bottom: 1.5rem;justify-content:center;text-align: center">
          <span style="color: #FFFFFF;">自动续播</span>
          <el-switch active-text="开" inactive-text="关" v-model="autoContinuePlay" :active-value=true :inactive-value=false ></el-switch>
          <span style="color: #FFFFFF;margin-left: 1rem;cursor: pointer" v-if="autoContinuePlay" @click="()=>{this.playDirection=this.playDirection*-1}">方向 {{ this.playDirection == 1? "←" : "→"}}</span>
        </div>
        <div style="position: absolute;right: 1rem;bottom: 1.5rem;">
          <el-button type="primary" size="mini" @click="nvrRecordVisible = false">
          关闭
          </el-button>
        </div>
      </span>

<!--      <span slot="footer" class="dialog-footer" style="align-self: flex-end;">-->
<!--        <el-button type="primary" size="mini" @click="nvrRecordVisible = false">-->
<!--          关闭-->
<!--        </el-button>-->
<!--      </span>-->

      <div class="timeLineContainer" ref="timeLineContainer">
        <div style="margin: auto;display: flex;justify-content: center;">{{this.middleTime}}</div>
        <canvas
          ref="canvas"
          @mousemove="onMousemove"
          @mousedown="onMousedown"
          @mousewheel="onMouseweel"
          @mouseup="onMouseup(null,true,true)"
          @mouseout="onMouseout"
        ></canvas>
      </div>
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
  updateDetails, findRecordList, downloadRecordByFile, getRecordByName
} from '@/api/robot'
import moment from "moment"
import flvjs from 'flv.js'
import { error } from 'autoprefixer/lib/utils'

// 一小时的毫秒数
const ONE_HOUR_STAMP = 60 * 60 * 1000;
// 时间分辨率
const ZOOM = [0.5, 1, 2, 6, 12, 24];

export default {
  components: {
  },
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
          { required: true, message: '请输入密码', trigger: 'blur' },
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
      flvPlayer: null,
      downloading: {},
      startVal: '',
      endVal: '',
      searchLoading: false,
      nvrTimePickerError: false,
      recordVideoSrc: "",
      fileList: [],
      recordTableKey: Math.random(),
      recordDownloadList: [],
      searchResultText: "",
      titleName: "",
      //时间分辨对应的层级
      currentZoomIndex: 0,
      // 中间刻度的当前时间 (默认为当天的0点减12小时，即昨天中午12点,若有操作时间则为操作后的时间)
      currentTime: new Date(moment().format("YYYY-MM-DD 00:00:00")).getTime(),
      // 时间轴左侧起点所代表的时间，默认为当天的0点减12小时，即昨天中午12点
      startTimestamp:
        new Date(moment().format("YYYY-MM-DD 00:00:00")).getTime() -
        12 * ONE_HOUR_STAMP +
        15 * 60 * 1000,
      middleTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      width: null, //画布容器宽度
      height: null, //画布容器高度
      mousedown: false, // 移动开关
      ctx: null, //画布容器
      mousedownX: null, // 鼠标相当于时间轴左侧的距离
      //时间段数据
      timeSegments: [
        // {
        //   beginTime: new Date("2023-09-01 02:30:00").getTime(),
        //   endTime: new Date("2023-09-01 11:20:00").getTime(),
        //   style: {
        //     background: "#7f93a6",
        //   },
        // },
      ],
      timer: null,//定时器
      recordTimer: null,
      recordTimerCount: 0,
      recordStart: null,
      recordStop: null,
      recordTotalTime: null,
      recordReload: true,
      recordPlayTime: null,
      autoContinuePlay: false,
      videoPlaying: false,
      autoCoutinueCount: 0,
      playDirection: -1,
      headerCellStyle: {"text-align":"center"},
      cellStyle: { "text-align":"center" },
      cleanBuff: null,
      currentTableRow: 0,
      ids: null,
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    init() {
      this.getCameraes()
      this.getVideoRecords()
      this.getSysCameraList()
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
    destroy() {
      clearInterval(this.timer)
      clearInterval(this.recordTimer)
      let video = this.$refs.recordVideo
      if(this.$refs.recordVideo._eventListeners != null){
        for (let i = 0; i < video._eventListeners.length; i++) {
          video.removeEventListener(video._eventListeners[i].type, video._eventListeners[i].listener);
        }
      }
    },
    resetting(){
      this.destroy()
      this.nvrRecord(this.nvrData,false)
    },
    getCellClass({ row, rowIndex, column, columnIndex }){
      // console.log('getCellClass',row, rowIndex,column, columnIndex)
      if(rowIndex == this.ids){
        return 'rowStyle'
      }else {
        return ''
      }
    },

    // handleSelectionChange(selection){
    //   console.log('selection--->',selection)
    //   // this.ids = selection.map(item => item.id)
    // },
    //
    // rowStyle({row}){
    //   if(row.name == this.fileList[this.ids].name){
    //     return "rowStyle"
    //   }
    // },

    nvrRecord(obj,draw){
      this.nvrRecordVisible = true
      this.nvrData = obj
      this.nvrRecordData= {src:''}
      this.fileList = []
      this.startVal = ''
      this.endVal = ''
      this.searchLoading = true
      this.id = 0
      this.titleName = ''
      this.recordVideoSrc = ''
      this.recordTimerCount = 0
      this.ids = 0

      this.middleTime = moment(new Date()).format("YYYY-MM-DD 00:00:00")
      this.currentTime = new Date(this.middleTime).getTime()
      this.startTimestamp = new Date(this.middleTime).getTime() - 15 * 60 * 1000

      const { nvrData } = this
      nvrData.channel = Number(nvrData.channel)
      nvrData.port = Number(nvrData.port)
      let now = new Date()
      this.endVal = nvrData.stopTime = this.formatDate(now)
      now.setMonth(now.getMonth()-1)
      this.startVal = nvrData.startTime = this.formatDate(now)

      //自动查找最近三十天录像文件
      findRecordList(nvrData).then((res)=>{
        console.log('res--->',res)
        if(res.code == 20000){
          if(res.data.length>0){
            this.fileList = [...res.data]
          }else {
            return
          }
          this.searchResultText = (this.ids+1)+' / '+ res.data.length
          this.recordTimerCount = res.data.length

          this.timeSegments = []
          res.data.forEach((item,index)=>{
            this.timeSegments.push({
              beginTime: new Date(item.start).getTime(),
              endTime: new Date(item.stop).getTime(),
              style: {
                background: "#7f93a6",
              }
            })
          })
          // console.log('this.timeSegments--->',this.timeSegments)
          if(res.data.length > 0){
            this.middleTime = res.data[0].start
            this.currentTime = new Date(this.middleTime).getTime()
            this.startTimestamp = this.currentTime - 15 * 60 * 1000
            this.onMouseup(res.data[0],false,false)
            this.ctx.clearRect(0, 0, this.width, this.height)
          }
          this.draw();
        }else {
          this.$notify({
            message: "搜索失败 请重试",
            type: 'warning',
            title: '提示',
          });
        }
        this.searchLoading = false
      })
      if(draw){
        this.$nextTick(()=>{
          this.initTimeLine()
        })
      }
    },

    startTimeCheck(){
      if(this.endVal != ''){
        let betweenTime = new Date(this.endVal) - new Date(this.startVal)
        if(betweenTime < 0){
          this.$notify({
            message: '搜索开始时间不能大于结束时间',
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
      if(this.startVal != ''){
        let betweenTime = new Date(this.endVal) - new Date(this.startVal)
        if(betweenTime < 0){
          this.$notify({
            message: '搜索结束时间不能小于开始时间',
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

      if(this.startVal == '' || this.startVal == null ||
          this.endVal == '' || this.endVal == null){
        this.$notify({
          message: '请选择回看搜索时间',
          type: 'warning',
          title: '提示',
        });
        return
      }
      if(this.nvrTimePickerError){
        this.$notify({
          message: '请选择正确回看搜索时间区间',
          type: 'warning',
          title: '提示',
        });
        return
      }

      const { nvrData } = this
      nvrData.channel = Number(nvrData.channel)
      nvrData.port = Number(nvrData.port)
      nvrData.stopTime = this.endVal
      nvrData.startTime = this.startVal
      // console.log('getNVRRecord--->',this.nvrData)
      this.searchLoading = true
      findRecordList(nvrData).then((res)=>{
        // console.log('res--->',res)
        if(res.code == 20000){
          this.fileList = [...res.data]
          this.searchResultText = (this.ids+1)+' / '+res.data.length
          this.recordTimerCount = res.data.length

          this.timeSegments = []
          res.data.forEach((item,index)=>{
            this.timeSegments.push({
              beginTime: new Date(item.start).getTime(),
              endTime: new Date(item.stop).getTime(),
              style: {
                background: "#7f93a6",
              },
            })
          })
          this.draw()

        }else {
          this.$notify({
            message: res.data,
            type: 'warning',
            title: '提示',
          });
        }
        this.searchLoading = false
      })
    },

    //下载录像文件
    downloadRecord(row,index){

      //调用下载接口
      downloadRecordByFile(this.nvrData.id,row.name).then((res)=>{
        console.log('downloadRecordByFile--->',res)
        if (res.data == true){
          this.$notify({
            message: "正在加载录像文件",
            type: 'info',
            title: '提示',
          });
          //检测下载进度
          this.downloading[row.name] = setInterval(()=>{
            getRecordByName(this.nvrData.id,row.name).then((res)=>{
              // console.log('res-->',res.data)
              if(res.code == 20000){

                if(res.data.progress != 101 && res.data.downloading == false){
                  this.$set(this.fileList[index],'downloading',false)
                  this.$notify({
                    message: "加载失败 请重试",
                    type: 'warning',
                    title: '提示',
                  });
                  clearInterval(this.downloading[row.name])
                }else {
                  //更新下载状态
                  this.$set(this.fileList[index],'progress',res.data.progress)
                  this.$set(this.fileList[index],'downloading',true)
                }

                // this.fileList.forEach((item,index) => {
                //   if(item.name == res.data.name){

                //下载完成标志
                if(res.data.progress == 101){
                  this.$set(this.fileList[index],'download',true)
                  this.$set(this.fileList[index],'downloading',false)
                  clearInterval(this.downloading[row.name])
                }
                //   }
                // })

              }else {
                this.$notify({
                  message: "下载失败 请重试",
                  type: 'warning',
                  title: '提示',
                });

                //清除定时器 更新下载文件的状态属性
                clearInterval(this.downloading[row.name])
                this.$set(this.fileList[index],'downloading',false)
              }
              this.$forceUpdate()
            }).catch(()=>{
              clearInterval(this.downloading[row.name])
              this.$set(this.fileList[index],'downloading',false)
              this.$forceUpdate()
            })
          },1000)

        }else {
          this.$notify({
            message: res.data,
            type: 'error',
            title: '提示',
          });
        }
      })
    },

    //录像回看文件
    playRecordFile(row,timing){

      // console.log("playRecordFile",+row)
      this.nvrRecordData = {src:''}
      this.titleName = '回看 '+ row.start + ' - ' + row.stop +' '
      this.recordVideoSrc = '/'+row.name+".mp4"
      // this.recordVideoSrc = '/static/video/'+row.name+".mp4"

      this.recordStart = row.start
      this.recordStop = row.stop
      this.recordTotalTime = (new Date(row.stop) - new Date(row.start))/1000
      if(row.jump != null){
        this.recordStart = moment(new Date(row.start).getTime() - row.jump*1000).format("YYYY-MM-DD HH:mm:ss")
        this.recordTotalTime -= row.jump
      }

      if(this.recordTimer){
        clearInterval(this.recordTimer)
      }

      if(timing){
        console.log('playRecordFile --- this.timingTimeline',row.start)
        this.timingTimeline(row.start)
      }

      let video = this.$refs.recordVideo

      if(this.$refs.recordVideo._eventListeners != null){
        for (let i = 0; i < video._eventListeners.length; i++) {
          video.removeEventListener(video._eventListeners[i].type, video._eventListeners[i].listener);
        }
      }
      let _this = this
      video.addEventListener("loadeddata",function() {
        _this.videoPlaying = true
        _this.onVideoLoaded('video')
      })
      video.addEventListener("ended", function(){
        if(_this.autoContinuePlay && _this.videoPlaying){
          _this.videoPlaying = false
          _this.loadNextRecord(_this.playDirection)
        }
      })
      // console.log(row)
      this.$nextTick(()=>{
        video.load()
        if(row.jump != null){
          video.currentTime = row.jump
        }
      })
      this.$forceUpdate()
      // this.currentTime = new Date(row.start).getTime()
      // this.startTimestamp = this.currentTime - 15 * 60 * 1000;
      // this.middleTime = row.start
      // this.onMouseup(null,false)
      // this.ctx.clearRect(0, 0, this.width, this.height);
      // this.draw();

      // this.$refs.recordVideo.play()
    },

    //调整时间轴指向标
    timingTimeline(time){

      const PX_PER_MS = this.width / (ZOOM[this.currentZoomIndex] * ONE_HOUR_STAMP)
      this.startTimestamp = new Date(time).getTime() - this.width / 2 / PX_PER_MS
      this.currentTime = new Date(time).getTime()

      this.middleTime = time
      this.onMouseup(null,false,false)
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.draw();
    },

    //录像预览
    playRecord(row,timing){

      this.nvrRecordData= {src:''}
      this.recordVideoSrc = ''
      this.titleName = '预览 ' + row.start + ' - ' + row.stop

      if(timing){
        this.timingTimeline(row.start)
      }

      if(this.recordTimer){
        clearInterval(this.recordTimer)
      }

      this.recordStart = row.start
      this.recordStop = row.stop
      this.recordTotalTime = (new Date(row.stop) - new Date(row.start))/1000

      let startTime = row.start.replace(/-|:|\.\d+/g, '').replace(' ','T')+'Z'
      let endTime  = row.stop.replace(/-|:|\.\d+/g, '').replace(' ','T')+'Z'
      let channel = '101'
      let webRtcIP = window.location.hostname
      // console.log('playRecord---webRtcIP',webRtcIP)
      // if (webRtcIP == 'localhost' || webRtcIP == '127.0.0.1'){
        webRtcIP = '192.168.20.23'
      // }
      let port = '554'
      this.nvrData.src = `/static/record.html?data=`+encodeURIComponent(`rtsp://${this.nvrData.userName}:${this.nvrData.passWord}@${this.nvrData.ip}:${port}/Streaming/tracks/${channel}?starttime=${startTime}&endtime=${endTime}`)+`&serve=${webRtcIP}`

      this.nvrRecordData = Object.assign({},this.nvrData)
      // this.$forceUpdate()
      this.reloadIframe()
    },

    loadNextRecord(i){
      this.playDirection = i
      console.log('this.ids,i',this.ids,i)
      console.log('this.fileList.length',this.fileList.length)
      console.log('(this.ids+i >= 0) && (this.ids+i < this.fileList.length)',(this.ids+i >= 0) , (this.ids+i < this.fileList.length))

      if((this.ids+i >= 0) && (this.ids+i < this.fileList.length) ){
        // console.log('row--->',this.fileList[this.ids+i])
        // if(this.fileList[this.ids+i].download){
        //   console.log('loadNextRecord --- 录像回看')
        //   this.playRecordFile(this.fileList[this.ids+i],true)
        // }else {
        //   console.log('loadNextRecord --- 录像预览')
        //   this.playRecord(this.fileList[this.ids+i],true)
        // }
        this.onMouseup(this.fileList[this.ids+i],true,true)
      }else {
        console.log('this.ids+i越界',this.ids+i)
      }
    },

    //视频开始播放的触发方法
    onVideoLoaded(type){
      console.log('onVideoLoaded type',type)
      if(this.recordTimer){
        clearInterval(this.recordTimer)
      }
      let video = null

      //判断是回看还是预览
      if(type == 'video'){
        video = this.$refs.recordVideo
      }else if (type == 'iframe'){
        video = this.$refs.nvrRecord.contentDocument.getElementById('video')
      }
      // console.log('onVideoLoaded---->',this.playDirection)
      if(video != null){
        // video.setAttribute("autoplay",true)
        // video.setAttribute("controls",true)

        //视频播放计时器
        this.recordTimer = setInterval(()=>{
          if(!this.nvrRecordVisible){
            clearInterval(this.recordTimer)
          }

          let lastPlayTime = this.recordPlayTime

          this.recordPlayTime = moment(new Date(this.recordStart).getTime()+video.currentTime*1000).format("YYYY-MM-DD HH:mm:ss")

          //当开启了自动续播后在播放结束后3秒会自动播放
          if(this.autoContinuePlay && new Date(this.recordPlayTime) - new Date(this.recordStop) < 5*1000 && this.autoCoutinueCount >= 6) {
            // console.log('autoContinuePlay')
            this.autoCoutinueCount = 0
            console.log('autoContinuePlay',this.playDirection)
            this.loadNextRecord(this.playDirection)
          }

          //当播放时间未超过结束时间持续调整指向标
          if(new Date(this.recordPlayTime) - new Date(this.recordStop) < 0){
            console.log('onVideoLoaded --- this.timingTimeline',this.recordPlayTime)
            this.timingTimeline(this.recordPlayTime)
            if(lastPlayTime == this.recordPlayTime && video.currentTime!= 0){
              this.autoCoutinueCount ++
            }else {
              this.autoCoutinueCount = 0
            }
          }else if(video.currentTime >= this.recordTotalTime && !this.autoContinuePlay){
            //视频播放时长超过视频播放时间就暂停
              clearInterval(this.recordTimer)
              video.pause()
          }
          // else {
          //   //其他情况暂停播放
          //   clearInterval(this.recordTimer)
          //   video.pause()
          // }
          // console.log("recordNow",recordNow)

          // 播放重载定时器 设定一直不播放10秒后自动重载
          if(video.currentTime == 0){
            // console.log('this.recordTimerCount',this.recordTimerCount)
            this.recordTimerCount ++
            if(this.recordTimerCount > 20){
              console.log('iframe reload')
              this.recordTimerCount = 0
              this.reloadIframe()
            }
          }else {
            this.recordTimerCount = 0
          }
        },500)
      }
    },

    //重载iframe
    reloadIframe(){
      this.recordReload = false
      this.$forceUpdate()
      let webRtcIP = window.location.hostname
      // console.log('reloadIframe---webRtcIP',webRtcIP)
      // if (webRtcIP == 'localhost' || webRtcIP == '127.0.0.1'){
        webRtcIP = '192.168.20.23'
      // }
      this.getPeerConnectionList(webRtcIP)
      setTimeout(()=>{
        this.recordReload = true
        this.$forceUpdate()
      },100)
    },

    //获取webrtcstreamer中正在播放的连接
    getPeerConnectionList(srvurl){
      fetch('http://'+srvurl+ ':8001'+'/api/getPeerConnectionList')
        .then((response) => response.json())
        .then((response) => {
          // console.log('getPeerConnectionList--->',response)
          if(response.length > 0){
            response.forEach((item,index) => {
              // console.log(Object.keys(item)[0])
              let peer = Object.keys(item)[0]
              //踢掉所有播放连接
              fetch('http://'+srvurl + ':8001'+'/api/hangup?peerid=' + peer)
                .then((res)=>{
                  console.log('断连hangup '+peer,res)
                })
                .catch((error) => this.onError('hangup ' + error));
            })
          }
        })
        .catch((e) => {
          console.log('获取所有链接失败 ',e)});
    },

    //关闭弹窗时候关闭定时器
    closeRecordDialog(){
      console.log('closeRecordDialog')
      if(this.recordTimer){
        clearInterval(this.recordTimer)
      }
    },

    initTimeLine() {
      // 获取外层宽高
      let { width, height } = this.$refs.timeLineContainer.getBoundingClientRect();
      this.width = width;
      this.height = height;
      // 设置画布宽高为外层元素宽高
      this.$refs.canvas.width = width;
      this.$refs.canvas.height = height;
      // 获取画图上下文
      this.ctx = this.$refs.canvas.getContext("2d");
      //绘制
      this.draw();
    },

    draw() {
      this.drawScaleLine();//绘制时间刻度
      this.drawTimeSegments(); //绘制时间段
      this.drawMiddleLine();//绘制中线  绘制原则  想要谁的层级再最上面的随后绘制 前提是层级一样的时候
    },

    // 画中间的白色竖线
    drawMiddleLine() {
      //中线的宽度
      let lineWidth = 2;
      // 线的x坐标是时间轴的中点，y坐标即时间轴的高度
      let x = this.width / 2;
      //划线
      this.drawLine(x, 0, x, this.height, lineWidth, "#fff");
    },

    // 画线段方法
    drawLine(x1, y1, x2, y2, lineWidth, color) {
      // 开始一段新路径
      this.ctx.beginPath();
      // 设置线段颜色
      this.ctx.strokeStyle =color || "#fff";
      // 设置线段宽度
      this.ctx.lineWidth = lineWidth || 1;
      // 将路径起点移到x1,y1
      this.ctx.moveTo(x1, y1);
      // 将路径移动到x2,y2
      this.ctx.lineTo(x2, y2);
      // 把路径画出来
      this.ctx.stroke();
    },

    //画刻度
    drawScaleLine() {
      // 时间分辨率对应的每格小时数
      const ZOOM_HOUR_GRID = [1 / 60, 1 / 60, 2 / 60, 1 / 6, 0.25, 0.5];

      // 一共可以绘制的格数，时间轴的时间范围小时数除以每格代表的小时数，24/0.5=48
      let gridNum =
        ZOOM[this.currentZoomIndex] / ZOOM_HOUR_GRID[this.currentZoomIndex];

      // 一格多少毫秒，将每格代表的小时数转成毫秒数就可以了  ;
      let msPerGrid = ZOOM_HOUR_GRID[this.currentZoomIndex] * ONE_HOUR_STAMP;

      // 每格宽度，时间轴的宽度除以总格数
      let pxPerGrid = this.width / gridNum;

      // 时间偏移量，初始时间除每格时间取余数，
      let msOffset = msPerGrid - (this.startTimestamp % msPerGrid);
      // 距离偏移量，时间偏移量和每格时间比例乘每格像素
      let pxOffset = (msOffset / msPerGrid) * pxPerGrid;

      // 时间分辨率对应的时间显示判断条件
      const ZOOM_DATE_SHOW_RULE = [
        () => {
          // 全都显示
          return true;
        },
        (date) => {
          // 每五分钟显示
          return date.getMinutes() % 5 === 0;
        },
        (date) => {
          // 显示10、20、30...分钟数
          return date.getMinutes() % 10 === 0;
        },
        (date) => {
          // 显示整点和半点小时
          return date.getMinutes() === 0 || date.getMinutes() === 30;
        },
        (date) => {
          // 显示整点小时
          return date.getMinutes() === 0;
        },
        (date) => {
          // 显示2、4、6...整点小时
          return date.getHours() % 2 === 0 && date.getMinutes() === 0;
        },
      ];

      for (let i = 0; i < gridNum; i++) {
        // 横坐标就是当前索引乘每格宽度
        let x = pxOffset + i * pxPerGrid;
        // 当前刻度的时间，时间轴起始时间加上当前格子数乘每格代表的毫秒数
        let graduationTime = this.startTimestamp + msOffset + i * msPerGrid;
        // 时间刻度高度  根据刻/时/月展示高度不同  具体可以自己去定义
        let h = 0;
        let date = new Date(graduationTime);
        if (date.getHours() === 0 && date.getMinutes() === 0) {
          // 其他根据判断条件来显示
          h = this.height * 0.3;
          // 刻度线颜色
          this.ctx.fillStyle = "rgba(151,158,167,1)";
          // 显示时间
          this.ctx.fillText(
            this.graduationTitle(graduationTime),
            x - 13,// 向左平移一半
            h + 15 // 加上行高
          );
        } else if (ZOOM_DATE_SHOW_RULE[this.currentZoomIndex](date)) {
          h = this.height * 0.2;
          this.ctx.fillStyle = "rgba(151,158,167,1)";
          this.ctx.fillText(
            this.graduationTitle(graduationTime),
            x - 13,
            h + 15
          );
        } else {
          // 其他不显示时间
          h = this.height * 0.15;
        }
        this.drawLine(x, 0, x, h, 1, "#fff");
      }
    },

    //格式时间的，在0点时显示日期而不是时间
    graduationTitle(datetime) {
      let time = moment(datetime);
      // 0点则显示当天日期
      if (
        time.hours() === 0 &&
        time.minutes() === 0 &&
        time.milliseconds() === 0
      ) {
        return time.format("MM-DD");
      } else {
        // 否则显示小时和分钟
        return time.format("HH:mm");
      }
    },

    //鼠标按下的操作
    onMousedown(e) {
      let { left } = this.$refs.canvas.getBoundingClientRect()
      // 也是计算鼠标相当于时间轴左侧的距离
      this.mousedownX = e.clientX - left
      // 设置一下标志位
      this.mousedown = true
      // 缓存一下鼠标按下时的起始时间点
      this.mousedownCacheStartTimestamp = this.startTimestamp

      clearInterval(this.recordTimer)

      let video = this.$refs.recordVideo
      if(this.$refs.recordVideo._eventListeners != null){
        console.log('this.$refs.recordVideo._eventListeners',this.$refs.recordVideo._eventListeners)
        for (let i = 0; i < video._eventListeners.length; i++) {
          video.removeEventListener(video._eventListeners[i].type, video._eventListeners[i].listener);
        }
      }

    },

    // 鼠标移动事件
    onMousemove(e) {
      // 计算出相对画布的位置
      let { left } = this.$refs.canvas.getBoundingClientRect()
      let x = e.clientX - left
      // 计算出时间轴上每毫秒多少像素
      const PX_PER_MS =
        this.width / (ZOOM[this.currentZoomIndex] * ONE_HOUR_STAMP) // px/ms
      //拖拽时候
      if (this.mousedown) {
        // 计算鼠标当前相当于鼠标按下那个点的距离
        let diffX = x - this.mousedownX
        // 用鼠标按下时的起始时间点减去拖动过程中的偏移量，往左拖是负值，减减得正，时间就是在增加，往右拖时间就是在减少
        this.startTimestamp = this.mousedownCacheStartTimestamp - Math.round(diffX / PX_PER_MS)

        this.middleTime = moment(this.startTimestamp + this.width / 2 / PX_PER_MS).format("YYYY-MM-DD HH:mm:ss")
        // 不断刷新重绘就ok了
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.draw()
      } else {
        // 计算所在位置的时间  平移时候
        let time = this.startTimestamp + x / PX_PER_MS
        // 清除画布
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.draw()
        // 绘制实时的竖线及时间
        this.drawLine(x, 0, x, this.height * 0.3, "#fff", 1)
        this.ctx.fillStyle = "#fff"
        this.ctx.fillText(
          moment(time).format("YYYY-MM-DD HH:mm:ss"),
          x - 20,
          this.height * 0.3 + 20
        );
      }
    },

    //鼠标起来的操作
    onMouseup(data,play,timing) {

      // 设置一下标志位 移动取消
      this.mousedown = false;
      //中间刻度距离左侧画布左侧距离
      let x = this.width / 2;
      // 计算出时间轴上每毫秒多少像素
      const PX_PER_MS =
        this.width / (ZOOM[this.currentZoomIndex] * ONE_HOUR_STAMP); // px/ms
      // 计算中间位置刻度的时间位置的时间
      this.currentTime = this.startTimestamp + x / PX_PER_MS;

      //判断指向标落在哪个区间段的录像 并进行播放
      let ctime = this.currentTime

      // console.log('this.currentTime',moment(this.currentTime).format("YYYY-MM-DD HH:mm:ss"),)
      let findout = false
      let closestTime = null
      //给播放区段赋浅蓝色
      this.timeSegments.forEach((item,index)=>{
        if(ctime >= item.beginTime && ctime < item.endTime && !findout){
          findout = true
          this.$set(this.timeSegments[index],'style',{background: "#64c8c8"})
          this.ids = index
          closestTime = item
          this.searchResultText = (index+1)+' / '+this.fileList.length
          //滚动到录像指定行
          this.$nextTick(()=>{
            if (index !== this.currentTableRow) {
              let rt = this.$refs.recordTable;
              const targetTop = rt.$el.querySelectorAll('.el-table__body tr')[index].getBoundingClientRect().top
              const containerTop = rt.$el.querySelector('.el-table__body').getBoundingClientRect().top
              rt.bodyWrapper.scrollTop = targetTop - containerTop;
            }
            this.currentTableRow = index
          })

        }else {
          //判断录像是否已下载 下载为绿色 未下载为灰色
          let timelineColor
          if(this.fileList[index].download){
            timelineColor = "#57cc42"
          }else {
            timelineColor = "#7f93a6"
          }
          this.$set(this.timeSegments[index],'style',{background: timelineColor})
        }
      })
      // console.log('closestTime',closestTime)


      if(closestTime == null){
        //暂时未处理未找到指定播放段情况
        return
      }
      if(data == null){
        data = {
          name: this.fileList[this.ids].name,
          jump: (this.currentTime - closestTime.beginTime)/1000,
          start: moment(this.currentTime).format("YYYY-MM-DD HH:mm:ss"),
          stop: moment(closestTime.endTime).format("YYYY-MM-DD HH:mm:ss")
        }
      }
      // console.log('jump',data)
      // console.log('this.fileList[this.ids]',this.fileList[this.ids])
      if(play){
        //移动到指定点后启动播放 不执行跳转
        //判断是否已经缓存了 如果已缓存则直接播放 否则使用预览
        if(this.fileList[this.ids].download){
          console.log('onMouseup --- 录像回看')
          this.playRecordFile(data,timing)
        }else {
          console.log('onMouseup --- 录像预览')
          this.playRecord(data,timing)
        }
        // this.playRecord(data,timing)
      }
    },


    //鼠标移出事件
    onMouseout() {
      // 清除画布
      this.ctx.clearRect(0, 0, this.width, this.height);
      //重新绘制画布
      this.draw();
    },


    //鼠标滚动事件
    onMouseweel(event) {
      let e = window.event || event;
      let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      if (delta < 0) {
        // 缩小
        if (this.currentZoomIndex + 1 >= ZOOM.length - 1) {
          this.currentZoomIndex = ZOOM.length - 1;
        } else {
          this.currentZoomIndex++;
        }
      } else if (delta > 0) {
        // 放大
        if (this.currentZoomIndex - 1 <= 0) {
          this.currentZoomIndex = 0;
        } else {
          this.currentZoomIndex--;
        }
      }
      this.ctx.clearRect(0, 0, this.width, this.height);
      // 重新计算起始时间点，当前时间-新的时间范围的一半
      this.startTimestamp = this.currentTime - (ZOOM[this.currentZoomIndex] * ONE_HOUR_STAMP) / 2;

      if(this.recordPlayTime == null){
        this.draw();
      }else {
        //重新标定时间轴
        this.timingTimeline(this.recordPlayTime)
      }
    },

    //绘制时间段 开始到结束时都在
    drawTimeSegments() {
      const PX_PER_MS =
        this.width / (ZOOM[this.currentZoomIndex] * ONE_HOUR_STAMP); // px/ms
      this.timeSegments.forEach((item) => {
        if (
          item.beginTime <=
          this.startTimestamp +
          ZOOM[this.currentZoomIndex] * ONE_HOUR_STAMP &&
          item.endTime >= this.startTimestamp
        ) {
          let x = (item.beginTime - this.startTimestamp) * PX_PER_MS;
          let w;
          if (x < 0) {
            x = 0;
            w = (item.endTime - this.startTimestamp) * PX_PER_MS;
          } else {
            w = (item.endTime - item.beginTime) * PX_PER_MS;
          }
          this.ctx.fillStyle = item.style.background;
          this.ctx.fillRect(x, this.height * 0.6, w, this.height * 0.3);
        }
      });
    },

    // //播放
    // play(){
    //   this.timer = setInterval(() => {
    //     //项目中我设置的是1秒钟移动一下刻度,结合实际情况分析  需要考虑跟播放速度 我本地项目不涉及到播放速度暂未考虑
    //     this.startTimestamp += 1000;
    //     //记录中间位置刻度 否者滚动之后中间刻度位置丢失
    //     this.onMouseup()
    //     // 不断刷新重绘就ok了
    //     this.ctx.clearRect(0, 0, this.width, this.height);
    //     this.draw();
    //   }, 1000);
    // },
    //
    // //暂停
    // pause(){
    //   clearInterval(this.timer);
    // },

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
    formatDate(date) {
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');
      let hours = date.getHours().toString().padStart(2, '0');
      let minutes = date.getMinutes().toString().padStart(2, '0');
      let seconds = date.getSeconds().toString().padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
  width: 45%;
  height: 25rem;
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

.timeLineContainer {
  margin-top: 1rem;
  height: 3rem;
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

::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  //display: none;
}

>>> .dialog-footer {
  .el-button {
    background: #565f65;
    border-color: #2e3235;
    margin-left: 10px;
    color: #fff;
  }
}

// 点击后背景颜色和文本颜色
::v-deep .rowStyle {
  background-color: #64c8c8 !important;

}

//// 鼠标滑过背景颜色
//::v-deep #nvrDialog .el-table tbody tr:hover > td {
//  background-color: #e0bd63 !important;
//}

</style>
