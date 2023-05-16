<template>
  <div>
    <!-- <div class="page-title">
      {{ $t("home_page.monitor_information") }}
      <span class="video-btn" @click="$router.push('/map')"
        ><svg-icon icon-class="ditu"
      /></span>
    </div> -->
    <div class="content">
      <el-row>
        <el-col :span="4"
          ><div class="selectAdvice">
            <div class="cearchAdvice">
              <el-input placeholder="输入关键字进行过滤" v-model="filterText">
              </el-input>
            </div>
            <el-tree
              class="filter-tree"
              :data="adviceList"
              :props="defaultProps"
              :filter-node-method="filterNode"
              ref="tree"
              node-key="label"
              accordion
              auto-expand-parent
              :check-on-click-node="false"
              expand-on-click-node
              :default-expanded-keys="defaultExpanded"
              @node-click="treeNodeClick"
            >
            </el-tree></div
        ></el-col>
        <el-col :span="16"
          ><div class="center" >
            <div class="video" id="myMap" style="height:43vh">
              <iframe
                v-for="(item, index) in currentAdvices"
                :class="[
                  currentCamera.accessoryID === item.accessoryID
                    ? 'iframe active'
                    : 'iframe',
                ]"
                :ref="'iframe' + index"
                :myData="item"
                style="display: none;"
                name="ddddd"
                :id="'iframes' + index"
                scrolling="auto"
                :src="item.src"
                :key="index"
              ></iframe>
              <div class="bgdimg" style="width:102%;height:100%;margin:1vh;position: relative;right: 3.5%;bottom: 3%;">                      
                      <div style="padding-top: 18%;padding-left: 3.5%;">
                        <div id="robot" style="position:relative;width: 5vh;">
                          <img  src="../../assets/img/robot1.png" style="width:3.5vw">
                        </div>      
                     
                      </div>
              </div>
              <!-- <Map></Map> -->
              <!-- <span
                title="全屏模式"
                v-if="!isscreenfullMap"
                class="screenfullBtn"
                @click="screenfull"
                ><i class="el-icon-rank"></i
              ></span> -->
            </div>
            <div class="alarm_title" style="color:#ffffff;font-size:18px;margin:1vh;padding-left: 1vh;">{{ $t('home_page.current_alarm') }}</div>
            <div class="alarm" style="margin-left:1vh">
             
             <div class="myTable">
               <el-table :data="showTable" style="width: 100%" @row-click="getDetailMessage" height="30vh"  :empty-text="'加载中...'">
                 <el-table-column width="80" label="序号">
                   <template slot-scope="scope">
                    <!-- <span>{{ scope.row.index }}</span> -->
                    <span v-if="scope.row.MaxLevel === 4" class="one">{{
                          scope.row.index
                      }}</span>
                      <span v-else-if="scope.row.MaxLevel === 3" class="two">{{
                          scope.row.index
                      }}</span>
                      <span v-else-if="scope.row.MaxLevel === 2" class="three">{{
                          scope.row.index
                      }}</span>
                      <span v-else class="four">{{ scope.row.index }}</span>
                   </template>
                 </el-table-column>
                 <el-table-column prop="AlarmCode" :label="$t('alarm_dealWith.alarm_code_label')">
                 </el-table-column>
                 <el-table-column prop="AlarmName" :label="$t('alarm_dealWith.alarm_name_label')">
                 </el-table-column>
                 <el-table-column prop="Status" :label="$t('alarm_dealWith.alarm_status_label')">
                   <template slot-scope="{ row }">
                     <span>{{ row.Status === 1 ? '发生' : '未发生' }}</span>
                   </template>
                 </el-table-column>
                 <el-table-column prop="MaxLevel" :label="$t('alarm_dealWith.maxAlarm_level_label')">
                 </el-table-column>
                 <el-table-column prop="HighValue" :label="$t('alarm_dealWith.maxAlarm_value_label')">
                 </el-table-column>
                 <el-table-column prop="CarrierName" :label="$t('alarm_dealWith.machine_name_label')">
                 </el-table-column>
                 <el-table-column prop="AccessoryName" :label="$t('alarm_dealWith.equipment_name_label')">
                 </el-table-column>
                 <el-table-column prop="ReportTime" :label="$t('alarm_dealWith.happen_time')" align="center" width="180"
                   >
                 </el-table-column>
               </el-table>
             </div>
             <el-dialog
          title="告警详情"
           :visible.sync="dialogVisible"
           width="60%"
         >
         <div style="display:flex">
          <img :src="imageUrl" alt="" style="width:70%">
          <div style="margin-left:2vw">
            <div style="margin: 1vh  0;">告警级别: 
              <span v-if="alarm.MaxLevel ==4" style="border: red 1px solid; color: red;font-size: 1.2vw;">致命</span>
              <span v-if="alarm.MaxLevel ==3" style="border: red 1px solid; color: orange;font-size: 1.2vw;">严重</span>
              <span v-if="alarm.MaxLevel ==2" style="border: red 1px solid; color: yellow;font-size: 1vw;">一般</span>
              <span v-if="alarm.MaxLevel ==1" style="border: red 1px solid; color: #08F9EB ;font-size: 1vw;">提示</span>      
            </div>
            <div style="margin: 2vh  0;">
              告警名称：{{ alarm.AlarmName }}
            </div>
            <div style="margin: 3vh  0;">
              告警编号：{{ alarm.ID }}
            </div>
            <div style="margin: 3vh  0;">
              告警类型：{{  alarm.AlarmCode ==1001?"行人告警": alarm.AlarmCode ==1002?"非机动车告警": alarm.AlarmCode ==1003?"异物告警": alarm.AlarmCode ==1004?"温度告警": 
            alarm.AlarmCode ==1005?"湿度告警": alarm.AlarmCode ==1006?"气体告警":alarm.AlarmCode ==1007?"灯光告警": alarm.AlarmCode ==1008?"违停逆行告警": alarm.AlarmCode ==1009?"超速告警":alarm.AlarmCode ==1010?"动物告警":alarm.AlarmCode ==1012?"消防设备告警": alarm.AlarmCode ==1011?"井盖异常告警":alarm.AlarmCode ==1013?"火灾烟雾告警":"机体告警"}}            </div>
            <div style="margin: 3vh 0;">
              事件描述：{{ alarm.Description }}
            </div>
            <div style="margin: 3vh 0;">
              告警位置：{{ alarm.X }},{{ alarm.Y }}
            </div>
            <div style="margin: 3vh  0;">
              发生时间：{{ alarm.ReportTime }}
            </div>
            <div style="margin: 3vh  0;">
              修复时间：{{alarm.RecoveryTime==null?"未修复":alarm.RecoveryTime}}
            </div>
          </div>
         </div>           
            <span slot="footer" class="dialog-footer">           
           <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
      </el-dialog>
           </div>
            </div></el-col>
            <el-col :span="4">
          <div class="contorl" >
           <div class="control_box">
            <div class="title">
              <div>
                <span>对讲</span>
                <span style="margin:0 5px;font-size:14px">({{ currentNode.label }})</span>
              </div>
              <Intercom></Intercom>          
            </div>
          </div>
          <div class="control_yuntai">
            <div class="title">
              云台控制
              <span style="margin:0 5px;font-size:14px">({{ currentNode.label }})</span>
            </div>
            <div class="tab">
              <!-- <div class="tabs">
                <div class="tab-item" @click="tabClick('云台')">云台</div>
                <div class="tab-item">预置</div>
                <div class="tab-item">参数</div>
              </div> -->
              <div class="content">
 <!--    云台控制器             -->
 <template v-if="activeName === '云台'">               
                  <div class="control_centerbox">  
                  <el-row class="el-row">                              
                    <el-col :span="15">
                      <div>
                        <el-button :disabled="!currentCamera.configObj"  @mousedown.native="setCameraOperate(1)" @mouseup.native="stopCam()"  size="mini"
                          type="text" style="position: relative; left: 1.9vw;bottom: 1vh;height: 4vh; ">
                          <i class="el-icon-caret-top" style="font-size:1vw;color: black;"></i>
                        </el-button>
                      </div>
                    </el-col>
                  
                    <el-col :span="9">
                      <div style="width:5vw;height: 3vh; background-color: #B8D5E0;margin-left: 4.5vw;margin-bottom: 1.5vh;">
                        <span class="left">
                          <el-button :disabled="!currentCamera.configObj"  @mousedown.native="setCameraOperate(9)" @mouseup.native="stopCam()"    size="mini"
                            type="text" style="margin-left: 1vh;height: 3vh;">
                            <i class="el-icon-zoom-in left" style="font-size:1vw;color: black;position: relative;bottom: 0.5vh;"></i>
                          </el-button>
                        </span>
                        <span class="left">
                          <el-button :disabled="!currentCamera.configObj" @mousedown.native="setCameraOperate(11)" @mouseup.native="stopCam()" @click="setCameraOperate(11)"  size="mini"
                            type="text" style="margin-left: 1vw;height: 3vh;">
                            <i class="el-icon-zoom-out left" style="font-size:1vw;color: black;position: relative;bottom: 0.5vh;"></i>
                          </el-button>
                        </span>
                      </div>
                    </el-col>
                  
                  </el-row>
                  <el-row class="el-row">
                    <el-col :span="5">
                      <div>
                        <el-button :disabled="!currentCamera.configObj" @mousedown.native="setCameraOperate(5)" @mouseup.native="stopCam()"   size="mini"
                          type="text" style="position: relative;bottom: 1.4vh;height: 4vh;">
                          <i class="el-icon-caret-left" style="font-size:1vw;color: black;"></i>
                        </el-button>
                      </div>
                    </el-col>
                       
                    <!-- <el-col :span="5">
                      <div style="position: relative; left: 0.9vw; bottom: 1.2vh;">
                        <el-button :disabled="!currentCamera.configObj" @click="stopCam"  size="mini"
                          type="text" >
                          <img src="../../../src/icons/svg/stop.png" alt="">
                        </el-button>
                      </div>
                    </el-col> -->
                    <el-col :span="10">
                      <div>
                        <el-button :disabled="!currentCamera.configObj" @mousedown.native="setCameraOperate(7)" @mouseup.native="stopCam()"   size="mini"
                          type="text" style="position: relative;left: 2.9vw;bottom: 1.4vh;height: 4vh;">
                          <i class="el-icon-caret-right" style="font-size:1vw;color: black;"></i>
                        </el-button>
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div style="width:5vw;height: 3vh; background-color: #B8D5E0;margin-left: 4.5vw;margin-bottom: 1.5vh;">
                        <span class="left">
                          <el-button :disabled="!currentCamera.configObj" @mousedown.native="setCameraOperate(13)" @mouseup.native="stopCam()"     size="mini"
                            type="text" style="margin-left: 1vh;margin-bottom: 1vh;position: relative;bottom: 0.5vh;height: 2vh;">
                            <svg-icon icon-class="icon-24-jinjiao" style="font-size:1vw;color: black;" />
                          </el-button>
                        </span>
                        <span class="left">
                          <el-button :disabled="!currentCamera.configObj"  @mousedown.native="setCameraOperate(15)" @mouseup.native="stopCam()"  size="mini"
                            type="text" style="margin-left: 1vw;position: relative;bottom: 0.5vh;">
                            <svg-icon icon-class="icon-24-yuanjiao" style="font-size:1vw;color: black;" />
                          </el-button>
                        </span>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row class="el-row">                 
                   <el-col :span="9">
                      <div >
                        <el-button :disabled="!currentCamera.configObj" @mousedown.native="setCameraOperate(3)" @mouseup.native="stopCam()"   size="mini"
                          type="text" style="position: relative; left: 1.9vw;bottom: 2.4vh;"  >
                          <i class="el-icon-caret-bottom" style="font-size:1vw;color: black;"></i>
                        </el-button>
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div style="width:5vw;height: 3vh; background-color: #B8D5E0; margin-left: 5.75vw;">
                        <span class="left">
                          <el-button :disabled="!currentCamera.configObj" @mousedown.native="setCameraOperate(17)" @mouseup.native="stopCam()"   size="mini"
                            type="text" style="margin-left: 1vh;">
                            <svg-icon icon-class="guangquan" style="font-size:1vw;color: black;position: relative;bottom: 0.5vh;" />
                          </el-button>
                        </span>
                        <span class="left">
                          <el-button :disabled="!currentCamera.configObj"  @mousedown.native="setCameraOperate(19)" @mouseup.native="stopCam()"  size="mini"
                            type="text" style="margin-left: 1vw;">
                            <svg-icon icon-class="guangquan-"  style="font-size:1vw;color: black;position: relative;bottom: 0.5vh;"/>
                          </el-button>
                        </span>
                      </div>
                    </el-col>
                  </el-row>
                </div> 
                  <el-row>
                    <div style="margin:5vh 1vw 1vh 1vw;font-size: 0.9vw;">云台速度
                      <el-slider :disabled="!currentCamera.configObj" :max="64" v-model="speed"></el-slider>
                    </div>
                  </el-row>
                  <el-row class="status" style="width:13vw;height:3.5vh;background-color:#B8D5E0;margin: auto;" >
                    <el-col :span="8">
                      <span>
                        <el-button :disabled="!currentCamera.configObj" @click="setCameraOperate(20)" size="mini"
                          type="text">
                          <i class="el-icon-camera-solid" style="font-size:1vw;color: black;"></i>
                        </el-button>
                      </span>
                    </el-col>
                    <el-col :span="8">
                      <span>
                        <el-button  :disabled="!currentCamera.configObj" @click="setCameraOperate(21)" size="mini"
                          type="text">
                          <i class="el-icon-video-camera" style="font-size:1vw;color: black;"></i>
                        </el-button>
                      </span>
                    </el-col>
                    <el-col :span="8">
                      <span v-if="videoOn === false">
                        <el-button   @click="setCameraOperate(22)" size="mini"
                          type="text">
                          <!-- <svg-icon icon-class="zanting" style="font-size:1vw;color: black;"/> -->
                          <i class="el-icon-video-play" style="font-size:1vw;color: black;"></i>
                        </el-button>
                      </span>
                      <span v-if="videoOn === true">
                        <el-button   @click="setCameraOperate(23)" size="mini"
                          type="text">
                          <!-- <svg-icon icon-class="zanting" style="font-size:1vw;color: black;"/> -->
                          <i class="el-icon-video-pause" style="font-size:1vw;color: black;"></i>
                        </el-button>
                      </span>
                    </el-col> 
                       <!--视频照片播放  -->
                    <el-dialog   title="详情" :visible.sync="videoPhoto" width="50%">
                      <img :src="takevideoPhoto" alt="">
                    </el-dialog>
                  </el-row>             
                </template>
              </div>
            </div>
          </div>
          <div class="robotCrl">
              <div class="title">
                机器人控制<span style="margin:0 0.5vh;font-size:0.9vw">({{ currentNode.label }})</span>
                </div>
              <div class="content">
                <el-row>
                  <el-col :span="24">
                    <el-switch :disabled="!catId" style="height: 2vh;margin: 1vh;" v-model="robotOpen" active-text="开"
                      inactive-text="关" @change="setOpen" :active-value="1" :inactive-value="2">
                    </el-switch>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col style="display:flex;margin-top: 1vh;">
                    <div class="control_direction"  @mousedown="setRobotMoveCrl(1)" @mouseup="setRobotMoveCrl(3)" style="width:5vw;height:3.33vh;font-size:1.2vh;background-color: #B8D5E0;text-align: center;line-height: 3.5vh;margin-left: 20px;">
                      <span class="el-icon-top" style="font-size:1.4vh" ></span> 前进
                    </div>
                    <div class="control_direction" @mousedown="setRobotMoveCrl(2)" @mouseup="setRobotMoveCrl(3)" style="width:5vw;height:3.33vh;font-size:1.2vh;background-color: #B8D5E0;text-align: center;line-height: 3.5vh;margin-left: 30px;">
                      <span class="el-icon-bottom" style="font-size:1.4vh" ></span> 后退
                    </div>
                  </el-col>
                </el-row>
                
                <el-row>
                  <div style="font-size:1.5vh;padding:4vh 0 0 1vw;color: #ffffff;">机器人速度（{{robotSpeed}}mm/s）</div>
                  <div class="speed" style="margin: 1vh 1vh 0 1vh;">
                    <el-slider :disabled="!catId" :max="5000" v-model="robotSpeed" >
                    </el-slider>
                  </div>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getCurrentAlarmRecordList } from '../../api/inspectRecord';
import { getSystemXmlConfig } from '../../api/sysCtrl';
import { mapGetters, mapState } from 'vuex';
import Intercom from '../monitor/intercom.vue'
import {
  getEquipmentList,
  setRemoteSwitch,
  robotMoveCrl,
  robotStop,
  setDeviceOperate,
  connectCar,
  moveCar,
  stopCar,
} from '../../api/robot';
import {
  getCarrierDetailInfo,
  getAllCarrierDetailInfo
} from '../../api/map';
import Map from './map.vue';
import { type } from 'os';
export default {
  components: {
    Intercom,
  },
  data() {
    return {
      filterText: '',
      adviceList: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      alarmList: [],
      rolltimer: '',
      activeName: '云台',
      speed: 0,
      robotSpeed: 0,
      currentAdvices: [{}, {}],
      robotOpen: 2,
      catId: '',
      robotSpeed: 0,
      robotDrict: 1,
      robotStop: 1,
      currentCamera: {},
      currentNode: {},
      defaultExpanded: [],
      webRtcIp: '',
      isscreenfullMap: false,
      distance:0,
      move:'',
      dialogVisible:false,
      alarm:[],
      videoOn:false,
      pageNum:1,
      pageSize:10
    };
  },
  created() {},
  computed: {
    ...mapState({
      systemConfig: (state) => state.sysConfig.systemConfig,
    }),
    ...mapGetters(['realTimeAlarm']),
   realTimeAlarminfo(){
     return this.realTimeAlarm[0]
   },
   showTable(){
    const dataSource = this.alarmList
    const now = 0
    const next = this.pageSize * this.pageNum
    return dataSource.slice(now,next);
   }
  },

  async mounted() {
    await this.getSysConfig();
    await this.init();
    await this.getAlarmList();
    await this.getAdvices();
    await this.lazyLoad();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    realTimeAlarminfo(){
          this.getAlarmList();
        }
  },

  methods: {

    async lazyLoad(){
      this.$nextTick(() => {
                const arr = document.getElementsByClassName('el-table__body-wrapper'); // 伪数组
                const el = arr[arr.length - 1];
                // 绑定事件
                el.addEventListener('scroll', this.handlerLazyLoad);
            });
    },
    async handlerLazyLoad(e) {
      // console.log("查看监听高度",e.target.scrollHeight,e.target.scrollTop,e.target.clientHeight )
        // 滚动条距离底部的距离
            const scrollDistance = e.target.scrollHeight - e.target.scrollTop- 1 - e.target.clientHeight;
            if (scrollDistance <= 0) {
              // console.log("滚动事件监听")
                this.pageNum++;        
            }
     },

    init() {
      const iframe = document.getElementById('iframes0');
      iframe.onload = () => {
        iframe.contentDocument.onclick = (e) => {
          this.cameraClick(this.currentAdvices[0]);
        };
      };
      const iframe1 = document.getElementById('iframes1');
      iframe1.onload = () => {
        iframe1.contentDocument.onclick = (e) => {
          this.cameraClick(this.currentAdvices[1]);
        };
      };
    },

    async getAlarmList() {
      try {
        const res = await getCurrentAlarmRecordList({
          // current: 1,
          limit: 0,
        });
        if (res.code === 20000) {
          if (res.data) {
            this.alarmList = res.data || [];
            this.alarmList.forEach((item, index) => {
              item.index = index + 1;
            });
            
          }
        }
        // let flag = false;
        // clearInterval(this.rolltimer);
        // this.rolltimer = setInterval(() => {
        //   if (!this.alarmList.length) return;

        //   const lastObj = this.alarmList[0] || {};

        //   if (lastObj.index === this.alarmList.length) {
        //     clearInterval(this.rolltimer);
        //     this.getAlarmList();
        //     return;
        //   }
        //   if (flag) {
        //     const arr = [...this.alarmList.slice(1), lastObj];
        //     this.alarmList = arr;
        //   } else {
        //     flag = true;
        //   }
        //   this.alarmes = this.alarmList.slice(0, 6);
        // }, 300000);
      } catch (error) {}
    },
    async getAdvices() {
      try {
        const res = await getEquipmentList();
        //递归重构数据 把设备和隧道组合起来
        let hasFindFirstVideo = true;
        const deepfined = (list) => {
          if (!list && !list.length) return;
          list.forEach((item, index) => {
            //默认播放第一个机器人摄像头
            if (hasFindFirstVideo && item.children && item.children[0]) {
              hasFindFirstVideo = false;
              this.treeNodeClick(item.children[0]);
              //展开并选中第一个节点
              this.defaultExpanded = [item.label];
              this.$nextTick(() => {
                this.$refs.tree.setCurrentKey(item.children[0].label);
              });
            }
            if (item.areaList) {
              item.children = [...item.children, ...item.areaList];
            }
            if (item.children && item.children.limit) {
              deepfined(item.children);
            }
          });
        };
        if (res.code === 20000) {
          if (res.data) {
            deepfined(res.data);
            this.adviceList = res.data || [];
          }
        }
      } catch (error) {}
    },
    async setRobotMoveCrl(flag) {
      const time = this.getNowtime()
      if(flag == 1){
      
        moveCar(flag,this.robotSpeed,10000,time).then((res)=>{
          // console.log("前进",res)
        })
      }
      else if (flag==2) {
        moveCar(flag,this.robotSpeed,10000,time)
        // console.log("后退",this.getNowtime())
      }
      else if (flag == 3){
        stopCar(time).then((res)=>{
          //  console.log("停止了",res)
        })
       
      }
    },
    async getDetailMessage(e){
      // console.log("实时",e)
      this.alarm = e
      this.imageUrl = 'http://192.168.20.4:8888/images/' + e.Image
      this.dialogVisible = true
    },
    treeNodeClick(node) {
      if (!node.accessoryList) {
        this.$notify({
          message: '请点击机器节点经行选择！',
          type: 'warning',
          title: '提示',
          duration: 1000,
        });
        this.$refs.tree.setCurrentKey(null);
        this.$refs.tree.setCurrentKey(this.currentNode.label);
        return;
      }

      if (this.robotOpen === 1) {
        this.$notify({
          message: '当前有机器正在被控制,不允许切换',
          type: 'warning',
          title: '提示',
          duration: 1000,
        });
        this.$refs.tree.setCurrentKey(null);
        this.$refs.tree.setCurrentKey(this.currentNode.label);
        return;
      }
      let arr = [];
      if (node && node.accessoryList) {
        clearInterval(this.move);
        node.accessoryList.forEach((item) => {
          if (item && item.configObj) {
            let video = item.configObj;
            // const src = `/static/video.html?data=rtsp://${video.userName}:${
            //   video.passWord
            // }@${video.ip}:554/h264/ch1/main/av_stream&serve=${
            //   this.systemConfig.webRtcIP
            // }`;
            const src = `/static/video.html?data=${video.rtsp}&serve=${
              this.webRtcIP
            }`;
            arr.push({
              ...item,
              src,
            });
          }
        });
        this.catId = node.id;
        this.currentNode = node;
        // 获取地图节点信息 移动
          this.move = setInterval(() => {
            getCarrierDetailInfo(this.catId).then((res)=>{
            // console.log("查看x坐标",res.data.x,this.catId)
            this.distance = res.data.x
            let robot = document.getElementById('robot')
            // 总长尺寸1430px 路程47500mm
            const left = (1430/47500)*this.distance
            robot.style.left = left + 'px'
          })  
          }, 1000);
         
        
      }
      if (arr.length < 1) {
        this.arr = [{}, {}];
      }
      this.currentAdvices = arr;
    },
    tabClick(val) {
      this.activeName = val;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    async setOpen() {
      try {
        const res = await setRemoteSwitch({
          carrierIndex: this.catId,
          enable: this.robotOpen,
        });
        if (res.code === 20000) {
        }
      } catch (error) {}
    },
    async setRobotStop() {
      try {
        const res = await robotStop({
          carrierIndex: this.catId,
          enable: this.robotOpen,
        });
        if (res.code === 20000) {
        }
      } catch (error) {}
    },
    async setRobotMoveCrl(flag) {
      try {
        if (flag) {
          this.robotDrict = flag;
        }
        const res = await robotMoveCrl({
          carrierIndex: this.catId,
          direction: this.robotDrict,
          speed: this.robotSpeed,
        });
        if (res.code === 20000) {
        }
      } catch (error) {}
    },
    async setCameraOperate(val) {
      try {
        const { currentCamera, currentNode, speed } = this;
        const {
          ip,
          brandName,
          passWord,
          port,
          userName,
          brandType,
        } = currentCamera.configObj;
        const res = await setDeviceOperate({
          deviceID: currentCamera.accessoryID,
          deviceName: currentCamera.accessoryID,
          ip,
          operateCode: val,
          brandName,
          passWord,
          port,
          speed,
          userName,
          brandType,
        });
        if (res.code === 20000) {
        }
      } catch (error) {}
    },
    cameraClick(val) {
      this.currentCamera = val;
    },
    async getSysConfig() {
      const res = await getSystemXmlConfig();
      if (res.code === 20000 && res.data) {
        this.webRtcIP = res.data.webRtcIP;
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.rolltimer);
    clearInterval(this.move);
    this.distance = 0
  },
};
</script>
<style lang="scss" scoped>
.page-title {
  line-height: 28px;
  font-size: 13px;
  font-weight: 700;
  color: rgb(243, 239, 239);
  padding-left: 15px;
  border-bottom: 1px solid rgb(4, 114, 141);
  .time {
    font-size: 12px;
    color: #bae1f3;
    margin-left: 10px;
    font-weight: normal;
  }
  .video-btn {
    float: right;
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
}
.content {
  > .el-row {
    height: 100%;
    > .el-col {
      height: 100%;
    }
  }
  .selectAdvice {
    height: 80vh;
    background: #384C55;
    padding: 10px;
    margin-left: 20px;
    margin-top: 2vh;
    .cearchAdvice {
      margin-bottom: 39px;

      padding: 4px 6px;
      height: 3.33vh;
      >>> .el-input__inner {
        background: rgba(16, 74, 182, 0);
        color: #e1ecf1;
      }
   
    }
    ::v-deep .el-tree {
      background-color: #384C55;
      color: #fff;
      .el-tree-node__label {
        font-size: 18px;
      }
      .el-tree-node__content:hover {
        background-color: transparent;
      }
      .el-tree-node:focus {
        background-color: transparent;
      }
      .el-tree-node:focus > .el-tree-node__content {
        background-color: transparent;
      }
      .is-current {
        background-color: #4069a7 !important;
      }
    }
  }
 // 云台控制
 .contorl {
    // height: 84vh;
    // background: rgba(9, 86, 158, 0.2);
    margin:2vh 10px 0 10px; 
  .control_box{
    width: 15vw;
    height: 12vh;
    background-color: #46555B;
  }
  .control_yuntai{
    height: 35vh;
    background-color: #46555B;
    margin-top: 1.5vh;
    overflow: hidden;
  }
    .title {  
      padding: 20px 0 0 20px;
      font-size: 0.9vw;
      line-height: 1.66vh;
      color: #ffffff;      
    }
  
    .tab {
 
      color: #ffffff;

      .tabs {
        display: flex;

        .tab-item {
          flex: 1;
          width: 80px;
          height: 40px;        
          line-height: 40px;
          font-size: 12px;
          margin: 10px;
          text-align: center;
          border: 1px solid #637D88;
          cursor: pointer;
        }
      }

      .content {
        // height: 40vh;
        margin-top: 1vh;
      background-color: #46555B;
      .control_centerbox{
        width: 5vw;
        height: 5vw;
        border-radius: 50%;
        background-color: #B8D5E0;  
        margin-left: 10px;   
        
          .el-button:active{
            
            background-color: #384C55;
          }
              
      }
 
 
        >>>.el-col {
          text-align: center;
         
          div {
            display: inline-block;
            background: #fff;
            border-radius: 3px;
            // line-height: 28px;
            // padding: 5px;
            margin-bottom: 6px;
            
            .left:nth-of-type(1) {
              //   border-right: 1px solid #333;
              //   padding-right: 5px;  
            }

            .left:nth-of-type(2) {
              padding-left: 5px;
            }

            .el-button--mini,
            .el-button--mini.is-round {
              padding: 5px;
            }
          }
        }

        .speed {
          margin: 0 20px;
        }

        .adviceSet {
          .el-col {
            border-right: 1px solid #333;
          }
        }

        .status {
          bottom: 10px;

          .el-col {
            text-align: center;
          }
          .el-button:active{
            width: 50px;
            height: 40px;
            background-color: #384C55;
          }
        }
      }
    }

    i,
    svg {
      cursor: pointer;
    }
  }
  .control_direction:active{
         color: red;       
        }
  .robotCrl {
    margin-top: 10px;
    background-color: #46555B;
    .content {
      margin-top: 10px;
      padding: 10px;
      >>> .el-col {
        text-align: center;
        div {
          display: inline-block;
          background: #fff;
          border-radius: 3px;
          // line-height: 28px;
          //   padding: 5px;
          margin-bottom: 6px;

          .left:nth-of-type(1) {
            border-right: 1px solid #333;
            padding-right: 5px;
          }
          .left:nth-of-type(2) {
            padding-left: 5px;
          }
          .el-button--mini,
          .el-button--mini.is-round {
            padding: 5px;
          }
        }
      }
    }
    i,
    >>> .el-switch {
      width: 100%;
      .el-switch__label {
        font-size: 12px;
      }
    }
    svg {
      //   cursor: pointer;
    }
  }
  .center {
    // height: 84vh;
  
    .video {
      // display: flex;
      // height: calc(100vh - 320px);
      // position: relative;
      // padding: 10px 5px;
      .bgdimg{
      background-image: url('../../assets/img/suidao.png');
      background-size:100% ;
      background-repeat: no-repeat;

}
      .iframe {
        background: #1b1c1d;
        position: absolute;
        top: 15px;
        right: 10px;
        z-index: 999;
        border: 3px solid #054666;
      }
      .iframe:nth-of-type(2) {
        margin-top: 20px;
        top: 20vh;
      }
      .active {
        border: 3px solid #fff;
      }
      .screenfullBtn {
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 20px;
        color: #fff;
      }
    }

    .alarm {
      .title {
        // background: rgba(239, 240, 243, 0.2);
        padding-left: 10px;
        font-size: 13px;
        line-height: 26px;
        color: #bae1f3;
      }
      .el-table::before{
        height: 0;
      }
      .one {
        background: rgb(230, 91, 7);
        border-radius: 2px;
        padding: 1px 4px;
      }
      .two {
        background: rgb(233, 127, 61);
        border-radius: 2px;
        padding: 1px 4px;
      }
      .three {
        background: rgb(238, 153, 100);
        border-radius: 2px;
        padding: 1px 4px;
      }
      .four {
        background: rgb(100, 229, 238);
        border-radius: 2px;
        padding: 1px 4px;
      }
    }
  }
}
</style>
