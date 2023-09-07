<template>
  <div style="height:100%">
    <!-- <div class="page-title">
      {{ $t("home_page.monitor_information") }}
      <span class="video-btn" @click="$router.push('/map')"
        ><svg-icon icon-class="ditu"
      /></span>
    </div> -->
    <div class="content"  v-loading="loading">
      <el-row :gutter="10">
        <el-col :span="6">
          <!-- <div class="selectAdvice">
            <div class="cearchAdvice">
              <el-input placeholder="输入关键字进行过滤" v-model="filterText">
              </el-input>
            </div>
            <el-tree class="filter-tree"
            :data="adviceList" :props="defaultProps"
            :filter-node-method="filterNode"
            ref="tree" node-key="label" auto-expand-parent accordion expand-on-click-node
              :default-expanded-keys="defaultExpanded"
              	 @node-click="treeNodeClick">
            </el-tree>
          </div> -->
          <div class="robot back-shaodow">
            <div class="leftTitle"> 机器人信息 <span v-if="butteryInfo">({{ butteryInfo }})</span> </div>
            <div class="robotMessage">
              <div>
                当前速度
                <div>
                  {{ carList.realTimeSpeed == null ? '0' : Math.abs((carList.realTimeSpeed / 1000).toFixed(1)) }} m/s
                </div>
              </div>
              <div style="margin-left:10% ;">
                累计运行里程
                <div>
                  {{ carList.totalDistance == null ? '0' : (carList.totalDistance / 100000).toFixed(2) }} Km
                </div>
              </div>
              <div>
                累计运行时间
                <div>
                  {{ carList.totalRunTime == null ? '0' : (carList.totalRunTime / 1440).toFixed(1) }} Day
                </div>
              </div>
            </div>
            <div>
              <img src="../../assets/img/robot.png" class="robotPic">
            </div>
            <div class="robotEletri">
              <div style="display:flex;margin:2rem auto;">
                <i class="el-icon-caret-left arrow" @click="changeRobotLeft"></i>
                <div class="onLine">{{ carrierName }}({{ carList.inSystem ? '在线' : '离线' }})</div>
                <i class="el-icon-caret-right arrow" @click="changeRobotRight"></i>
              </div>
            </div>
            <div class="warnL" style="position:absolute;top: 9.2rem;left: 2.7rem;">
              <div
                style="border-radius: 0.625rem;;width: 3.1rem;background-color: #66B3B2;display: flex;height: 3rem;line-height: 2rem;align-items: center;justify-items: center;"
                @click="setWarnLight()" :class="{ 'warning_light_active': warnLightOpen == 1 }">
                <img src="../../assets/img/warnLight.png" style="margin: auto;width: 2.3rem">
                <!--                <svg-icon icon-class="warnLight" style="margin:auto;width: 2.5rem;height: 2.5rem;"></svg-icon>-->
              </div>
              <div class="warning_light" style="font-size: 0.875rem;margin: 0.5rem 0.2rem"> 警示灯</div>

            </div>

            <div class="electri">
              <el-progress :width="40" color="#66b3b2" text-color="#fff" type="circle"
                :percentage="carList.batteryLevel"></el-progress>
              <div style="font-size: 0.8rem;margin-left: 0.5rem">当前电量</div>
            </div>
            <div class="microphone">
              <Intercom ref="closeIntercom" :key="carID" :carID="carID" :hkPlugin="hkPlugin" ></Intercom>
              <div class="speak_detail" style="font-size: 0.875rem;">语音对讲</div>
            </div>
            <div class="broadcast" @click="broadcastVisible = true">
              <svg-icon icon-class="broadcast"></svg-icon>
              <!-- <svg-icon icon-class="stopBroadcast" v-show="broadcasting == true"></svg-icon> -->
            </div>
            <div class="broadcast_detail">语音播报</div>
          </div>

        </el-col>
        <el-col :span="10">
          <div class="center">
            <div class="video" v-if="currentAdvices.length">
              <iframe :class="[
                currentCamera.accessoryID === currentAdvices.accessoryID
                  ? 'active'
                  : '', 'back-shaodow'
              ]" :ref="'iframe0'" :myData="currentAdvices[0]"
                style="width: 100%;height:27.5rem;border: 1px solid transparent;" marginwidth="0" marginheight="0"
                name="ddddd" :id="'iframes0'" control="" scrolling="auto" :src="currentAdvices[0].src">
              </iframe>
              <!-- <iframe v-for="(item, index) in currentAdvices" allow="fullscreen" :class="[
                  currentCamera.accessoryID === item.accessoryID
                    ? 'active'
                    : '',
                ]" :ref="'iframe' + index" :myData="item" style="width: 25.6; height: 40 ;margin-right: 0.9375rem;"
                  name="ddddd" :id="'iframes' + index" scrolling="auto" :src="item.src" :key="index">
                </iframe> -->
              <el-button
                style="position:absolute;margin-left: 0; top:1rem;background-color:transparent;border-color: transparent"
                size="mini" @click="glassCameraSwitch">
                <svg-icon icon-class="cameraSwitch" style="font-size: 2rem"></svg-icon>
              </el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="right">
            <iframe :class="[
              'infrared', 'back-shaodow'
            ]" :ref="'iframe1'" :myData="currentAdvices[1]" style="border: 1px solid transparent" name="ddddd"
              marginwidth="0" marginheight="0" :id="'infrared'" scrolling="auto" :src="currentAdvices[1].src">
            </iframe>
            <div class="tempicture" id="tempicture">{{ tempicture }}</div>
          </div>
        </el-col>
        <div v-if="broadcastVisible" class="broadcastSelect">
          <div class="leftTitle" style="display: flex;">
            <div>语音播报</div>
            <i class="el-icon-close closeBroad" style="margin-left: auto;color: #000000;"
              @click="broadcastVisible = false"></i>
          </div>
          <el-radio-group v-model="selectedOption">
            <el-radio style="color:red ;" label="语音停止播放"></el-radio><br>
            <el-radio label="前方事故，请注意绕行"></el-radio><br>
            <el-radio label="路面凹坑，请谨慎驾驶"></el-radio><br>
            <el-radio label="路面异物，请谨慎驾驶"></el-radio><br>
            <el-radio label="前方拥堵，请注意减速"></el-radio><br>
            <el-radio label="道路湿滑，请谨慎驾驶"></el-radio><br>
          </el-radio-group>
          <div class="broadcastBtn">
            <el-button type="primary" style="background-color:#64C8C8 ;" size="mini" @click="broadcast()">确 定</el-button>
          </div>
        </div>
        <el-dialog :visible.sync="lowButtery" title="低电量提示" width="30%">
          <span style="font-size:1.5rem ;">机器人低电量,确定启动该任务吗? </span>
          <span slot="footer">
            <el-button size="mini" @click="lowButtery = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="goLocationLowButtery()">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog :visible.sync="locationAuto" :show-close="false" :close-on-click-modal="false" title="操作提示"
          width="30%">
          <span style="font-size:1.5rem ;">已到达桩号{{ locationID }}，是否手动操作机器人</span>
          <span slot="footer">
            <el-button size="mini" @click="cancelLocation()">否</el-button>
            <el-button size="mini" type="primary" @click="openLocation()">是</el-button>
          </span>
        </el-dialog>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="task back-shaodow">
            <div class="leftTitle" style="padding-top: 1rem;padding-bottom: 0.5rem;">任务信息</div>
            <div class="taskDetail">
              <div>
                当前任务 ：<span style="color:#66B3B2 ;">{{ realTimeTask == '' ? '空闲状态' : realTimeTask }} </span>
              </div>

              <span style="margin-left: 1.875rem;">

                预计完成：<span style="color:#66B3B2 ;"></span>{{ finishTime ==
                  '' ? '0' : Math.abs(finishTime) }}分钟 </span>
            </div>
            <div class="leftTitle" style="padding-top: 0.5rem;padding-bottom: 0rem;">
              任务下发
            </div>
            <div class="taskDetail">
              <span style="width: 6rem;line-height: 2rem;height: 2rem;overflow: hidden;">任务模板 ：</span>
              <span style="color:#66B3B2;width: 7rem">
                <el-select v-model="taskID" placeholder="请选择">
                  <el-option v-for="item in taskList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </span>
              <!-- <el-button size="small" round
                  style="background-color:#66B3B2 ; color:#ffffff;margin-left: 3.75rem;height: 3;line-height: 0.3125rem;"
                  @click="startPlan()">执行</el-button> -->
              <el-popconfirm title="确定执行任务吗?" @confirm="startPlan()">
                <div
                  style="background-color:#66B3B2 ; color:#ffffff;margin-left: 7.5rem;width: 3.75rem; text-align: center; height: 1.875rem;line-height: 1.875rem;"
                  slot="reference">执行</div>
              </el-popconfirm>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="map back-shaodow">
            <img src="../../assets/img/route.png" class="backgroundIm">
            <div style="display: flex;">
              <div class="nowPosition">
                <span style="margin:0.125rem 0.625rem 0  0.625rem ;font-size: 1.25rem;">巡检地图</span>
                <span style="font-size: 1rem;padding-top: 0.3rem;">{{ carrierName }}当前位置：{{ carList.pileNumber == null ?
                  (isNaN(carList.x) ? '未知' : carList.x / 1000) :
                  '站点' + carList.pileNumber
                }}</span>
              </div>
              <div class="goLocation">
                <el-input class="location_Detail" v-model="locationID" :placeholder="areaName">
                  <template slot="prefix">去往</template>
                </el-input>
                <el-popconfirm title="确定去往桩号?" @confirm="goLocation">
                  <div class="goYes" slot="reference">确定</div>
                </el-popconfirm>
              </div>
            </div>


            <div id="robot" style="position:relative;width: 3.125rem;bottom: 5.3rem;margin-left: 0rem;">
              <img src="../../assets/img/robot1.png" style="width:2.5rem;height: 1.875rem;opacity: 1;">
            </div>

          </div>
        </el-col>
        <el-col :span="8">
          <div class="robotControl back-shaodow">
            <div class="leftTitle" style="display: flex;position: relative;">
              机器人控制
              <div>
                <el-switch :disabled="!carID" style="height: 1.25rem;margin-left:1rem ;" v-model="robotOpen"
                  active-text="开" inactive-text="关" @change="setOpen()" :active-value="1" :inactive-value="2">
                </el-switch>
              </div>
              <div style="margin-left: 7vw;">机器人速度{{ robotSpeed / 1000 }}m/s</div>
            </div>

            <div style="display:flex;margin: 0.75rem 0;">
              <div class="robotDirec" @mousedown="setRobotMoveCrl(2)" @mouseup="setRobotMoveCrl(3)">
                <img src="../../assets/img/back.png" style="width:3rem" alt="">
                <!--                <span style="position: relative;;bottom: 0.3125rem;">后退</span>-->
              </div>
              <div class="robotDirec" @mousedown="setRobotMoveCrl(1)" @mouseup="setRobotMoveCrl(3)">
                <!--                <span style="position: relative;;bottom: 0.3125rem;">前进</span> -->
                <img src="../../assets/img/front.png" style="width:3rem" alt="">
              </div>
              <div class="speed">
                <div @click="robotSpeed = 1000" :class="robotSpeed == 1000 ? 'speed_detail_active' : 'speed_detail'">
                  巡检速度
                </div>
                <div style="margin-top:0.4375rem ;" @click="robotSpeed = 6000"
                  :class="robotSpeed == 6000 ? 'speed_urgency_active' : 'speed_urgency'">
                  应急速度
                </div>
              </div>
            </div>

          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="enviroment back-shaodow threeRow">
            <div class="leftTitle">环境信息</div>
            <div style="display:flex">
              <div class="enviroDetail">
                <div class="detail_icon">
                  <svg-icon icon-class="tempicture" style="font-size:1.25rem;margin-left: 0.5rem;"></svg-icon>
                  <div style="color:rgba(100 200 200) ;">温度</div>
                </div>
                <div class="gasDetail">
                  {{ typeof gasList.Temperature === 'number' ? parseFloat((gasList.Temperature / 100).toFixed(1)) : '0' }}℃
                </div>
              </div>
              <div class="enviroDetail">
                <div class="detail_icon">
                  <svg-icon icon-class="shidu" style="font-size:1.25rem;margin-left: 0.5rem;"></svg-icon>
                  <div style="color:rgba(100 200 200) ;">湿度</div>
                </div>
                <div class="gasDetail">
                  {{ gasList.Humidity == null ? '0' : (gasList.Humidity / 100).toFixed(1) }}<span
                    style="font-size: 0.625rem;">%</span>
                </div>
              </div>
              <div class="enviroDetail">
                <div style="color:rgba(100 200 200);margin: 1.25rem 0 0 0.375rem;">烟雾</div>
                <div class="gasDetail">
                  {{ gasList.Smoke == null ? '0' : (gasList.Smoke / 100).toFixed(1) }}<span
                    style="font-size: 0.625rem;">ppm</span>
                </div>
              </div>
            </div>
            <div style="display:flex;margin-top: 0.625rem;">
              <div class="enviroDetail">
                <div style="color:rgba(100 200 200);margin: 0.625rem 0 0 0.375rem;">硫化氢</div>
                <div class="gasDetail">
                  {{ gasList.H2S == null ? '0' : (gasList.H2S / 100).toFixed(1) }}<span
                    style="font-size: 0.625rem;">ppm</span>
                </div>
              </div>
              <div class="enviroDetail">
                <div class="gas" style="color:rgba(100 200 200);">一氧化碳</div>
                <div class="gasDetail">
                  {{ gasList.CO == null ? '0' : (gasList.CO / 100).toFixed(1) }}<span
                    style="font-size: 0.625rem;">ppm</span>
                </div>
              </div>
              <div class="enviroDetail">
                <div class="gas" style="color:rgba(100 200 200);margin: 1.25rem 0 0 0.375rem;">甲烷</div>
                <div class="gasDetail">
                  {{ gasList.CH4 == null ? '0' : (gasList.CH4 / 100).toFixed(1) }}<span
                    style="font-size: 0.625rem;">ppm</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="alarm_2 back-shaodow threeRow">
            <div class="alarm_title">告警信息
              <div class="chart" @click="chart()">告警分析</div>
            </div>
            <div class="alarm">
              <div class="myTable">
                <el-table :data="showTable" @row-click="getDetailMessage" style="width: 98%" height="10rem">
                  <el-table-column width="60" label="序号" type="index" align="center">
                  </el-table-column>
                  <el-table-column prop="AlarmCode" :label="'告警码'" width="80" align="center">
                  </el-table-column>
                  <el-table-column prop="AlarmName" :label="$t('alarm_dealWith.alarm_name_label')" align="center">
                    <template slot-scope="scope">
                      {{ scope.row.AlarmName }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="MaxLevel" width="100" :label="'告警级别'" align="center">
                    <template slot-scope="scope">
                      <span v-if="scope.row.MaxLevel === 4" class="first">致命</span>
                      <span v-else-if="scope.row.MaxLevel === 3" class="two">严重</span>
                      <span v-else-if="scope.row.MaxLevel === 2" class="three">一般</span>
                      <span v-else class="four">提示</span>

                      <!-- {{ scope.row.MaxLevel ==0?'默认':scope.row.MaxLevel ==1?'提示':scope.row.MaxLevel ==2?'一般':scope.row.MaxLevel ==3?'严重':'致命' }} -->
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="CarrierName" :label="$t('alarm_dealWith.machine_name_label')">
                            </el-table-column>
                             <el-table-column prop="EquipmentName" :label="$t('alarm_dealWith.equipment_name_label')">
                             </el-table-column> -->
                  <el-table-column prop="ReportTime" :label="$t('alarm_dealWith.happen_time')" align="center">
                  </el-table-column>
                </el-table>
              </div>
              <el-dialog title="告警详情" :visible.sync="dialogVisible" width="60%">
                <div style="display:flex">
                  <img :src="imageUrl" alt="" style="width:70%">
                  <div style="margin-left:2.5rem">
                    <div style="margin: 0.625rem  0;">告警级别:
                      <span v-if="alarm.MaxLevel == 4"
                        style="border: red 0.0625rem solid; color: red;font-size: 1.375rem;">致命</span>
                      <span v-if="alarm.MaxLevel == 3"
                        style="border: orange 0.0625rem solid; color: orange;font-size: 1.375rem;">严重</span>
                      <span v-if="alarm.MaxLevel == 2"
                        style="border: yellow 0.0625rem solid; color: yellow;font-size: 1.25rem;">一般</span>
                      <span v-if="alarm.MaxLevel == 1"
                        style="border: #08F9EB 0.0625rem solid; color: #08F9EB ;font-size: 1.25rem;">提示</span>
                    </div>
                    <div style="margin: 1.25rem  0;">
                      告警名称：{{ alarm.AlarmName }}
                    </div>
                    <div style="margin: 1.875rem  0;">
                      告警编号：{{ alarm.ID }}
                    </div>
                    <div style="margin: 1.875rem  0;">
                      告警类型：{{ alarm.AlarmCode == 1001 ? "行人告警" : alarm.AlarmCode == 1002 ? "非机动车告警" :
                        alarm.AlarmCode
                          == 1003 ? "异物告警" : alarm.AlarmCode == 1004 ? "温度告警" :
                          alarm.AlarmCode == 1005 ? "湿度告警" : alarm.AlarmCode == 1006 ? "气体告警" : alarm.AlarmCode ==
                            1007 ? "灯光告警" :
                            alarm.AlarmCode == 1008 ? "违停逆行告警" : alarm.AlarmCode == 1009 ? "超速告警" : alarm.AlarmCode
                              == 1010 ? "动物告警" : alarm.AlarmCode == 1012 ? "消防设备告警" : alarm.AlarmCode == 1011 ? "井盖异常告警" :
                                alarm.AlarmCode
                                  == 1013 ? "火灾烟雾告警" : alarm.AlarmCode
                                    == 1014 ? "红外测温告警" : alarm.AlarmCode
                                      == 1015 ? "算法异常告警" : alarm.AlarmCode
                                        == 1016 ? "逆行告警" : alarm.AlarmCode
                                          == 1017 ? "风机告警" :
                                  alarm.AlarmCode
                                    == 1018 ? "指示灯告警" : "机体告警" }} </div>
                    <div style="margin: 1.875rem 0;">
                      事件描述：{{ alarm.Description }}
                    </div>
                    <div style="margin: 1.875rem 0;">
                      告警位置：{{ alarm.Location }}
                    </div>
                    <div style="margin: 1.875rem  0;">
                      发生时间：{{ alarm.ReportTime }}
                    </div>
                    <div style="margin: 1.875rem  0;">
                      修复时间：{{ alarm.RecoveryTime == null ? "未修复" : alarm.RecoveryTime }}
                    </div>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="hkControl back-shaodow threeRow">
            <div class="leftTitle" widht="6.25rem">
              云台控制器
            </div>
            <div style="display:flex ;">
              <div class="hkMove">
                <img src="../../assets/img/hkUp.png" @mousedown="setCameraOperate(1)" @mouseup="stopCam()" class="hkUp">
                <div style="display: flex;">
                  <img src="../../assets/img/hkLeft.png" @mousedown="setCameraOperate(5)" @mouseup="stopCam()"
                    class="hkLeft">
                  <img src="../../assets/img/hkConnect.png" @click="HKlogin()"
                    :class="[YTlogin == true ? 'HKloading' : 'hkConnect']">
                  <img src="../../assets/img/hkRight.png" @mousedown="setCameraOperate(7)" @mouseup="stopCam()"
                    class="hkRight">
                </div>
                <img src="../../assets/img/hkDown.png" @mousedown="setCameraOperate(3)" @mouseup="stopCam()"
                  class="hkDown">
              </div>
              <div style="margin-left: 4.125rem;width:18.75rem;position: relative;">
                <div class="hkAction">
                  <div title="放大" class="action_detail" @mousedown="setCameraOperate(9)" @mouseup="stopCam()">
                    <img src="../../assets/img/fangda.png" alt="">
                  </div>
                  <div title="照相" class="action_detail">
                    <img src="../../assets/img/takephoto.png" @click="setCameraOperate(20)">
                  </div>
                  <div title="清洗" class="action_detail" @mousedown="setCameraOperate(16)" @mouseup="stopCam()">
                    <img src="../../assets/img/clean.png" alt="">
                  </div>
                  <div title="聚焦" class="action_detail" @mousedown="setCameraOperate(13)" @mouseup="stopCam(13)">
                    <img src="../../assets/img/jujiao.png" alt="">
                  </div>
                </div>
                <div class="hkAction">
                  <div title="缩小" class="action_detail" @mousedown="setCameraOperate(11)" @mouseup="stopCam(11)">
                    <img src="../../assets/img/suoxiao.png" alt="">
                  </div>
                  <div class="action_detail">
                    <img title="录像" src="../../assets/img/video.png" v-if="!videoOn" @click="setCameraOperate(21)">
                    <img title="关闭录像" src="../../assets/img/closeVideo.png" v-if="videoOn" @click="setCameraOperate(23)">
                  </div>
                  <div class="action_detail">
                    <img title="开灯" src="../../assets/img/light.png" v-if="!lightOn" @click="setCameraOperate(12)">
                    <img title="关灯" src="../../assets/img/closeLiht.png" v-if="lightOn" @click="setCameraOperate(14)">
                  </div>
                  <div class="action_detail" @mousedown="setCameraOperate(15)" @mouseup="stopCam(15)">
                    <img title="远焦" src="../../assets/img/yuanjiao.png" alt="">
                  </div>
                </div>
                <div style="margin-top:1rem;padding-left: 1rem;font-size: 0.8rem">
                  云台速度
                  <!-- <el-input disabled v-model="speed" ></el-input> -->
                  <div class="speed"
                    style="margin:0.625rem 0;width: 17rem;display: flex;position: relative;align-items: center;">
                    <el-slider :max="7" v-model="speed" style="margin: 0 1.25rem 0 -0.5rem;width: 12rem">
                    </el-slider>
                    <el-input-number size="mini" :min=0 :max=7 v-model="speed" :step="1" :controls="false"
                      style="width: 5rem"></el-input-number>
                    <!--                  <span-->
                    <!--                    style="width: 2.75rem;float: right;background-color: #071828;text-align: center; border: 0.0625rem #ffffff solid;">{{-->
                    <!--                      speed }}</span>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Notification ,Loading} from 'element-ui';
import { getCurrentAlarmRecordList } from '../../api/inspectRecord';
import { mapGetters, mapState } from 'vuex';
import { GetRealPatrolTaskByCarrierId, cancelPatrolTask } from '@/api/inspectRecord';
import { getSystemXmlConfig } from '../../api/sysCtrl';
import {
  getCarrierDetailInfo, getPatrolPointListByAreaId
} from '../../api/map';
import { getAllPatrolLocation } from '@/api/taskConfig'
import { debounce } from '../../utils/debounce';
import {
  getEquipmentList, SetSpeed,
  moveToPatrolPoint,
  getAllCarrierDetailInfo,
  getChargingStateByCarrierID,
  GetMonitorData,
  informOpenRobot,
  informCloseRobot,
  robotStop,
  setDeviceOperate,
  startBroadcast,
  openBroadcast,
  login,
  logOut,
  connectCar, startWarningLight, stopWarningLight,
  moveCar,
  stopCar, CancelCarrierControl, getTemperature,
  startVoiceBroadcast, stopVoiceBroadcast, getCarrierListByAreaId, getRtsp, getTaskRemainingMileage
} from '../../api/robot';
import { getAllPatrolPlan, startPatrolPlan } from '../../api/taskConfig';
import {
  StartLight, EndLight, StartWiper, EndWiper, startPanLeft, endPanLeft, startPanRight, endPanRight, startTiltUp, endTiltUp, startTiltDown, endTiltDown,
  StartZoomIn, StartZoomOut, EndZoomIn, EndZoomOut, StartIrisOpen, EndIrisOpen, StartIrisClose, EndIrisClose, StartFocusFar, EndFocusFar, StartFocusNear, EndFocusNear, takePhoto, startRecord, endRecord
} from '../../api/dashboard';
import Intercom from './intercom.vue';
import { clearInterval } from 'timers';
import { async } from 'q';
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
      activeName: '云台',
      speed: 3,
      robotSpeed: 1000,
      currentAdvices: [{}, {}],
      robotOpen: 2,
      carID: '',
      robotDrict: 1,
      robotStop: 1,
      currentCamera: {},
      currentNode: {},
      defaultExpanded: [],
      webRtcIP: '',
      recorder: null,
      broadcastStatus: 1,
      camState: 1,
      glassCamera: false,
      glassCameraBak: '',
      timeInte: null,
      dialogVisible: false,
      imageUrl: null,
      alarm: [],
      videoOn: false,
      lightOn: false,
      YTlogin: false,
      HKloading: false,
      pageNum: 1,
      pageSize: 15,
      carList: [],
      gasList: '',
      taskList: [],
      taskID: '',
      locationID: '',
      realTimeTask: '',
      carRoller: '',
      carMove: '',
      broadcastVisible: false,
      selectedOption: '',
      speedList: [{
        value: 2000,
        label: "应急速度"
      }, {
        value: 1000,
        label: "巡检速度"
      }],
      riskSpeed: 1000,
      speedMode: 1,
      broadcasting: false,
      lowButtery: false,
      butteryInfo: null,
      carrierIndex: 0,
      carrierName: null,
      carrierArr: [],
      carrierSelected: null,
      locationAuto: false,
      lowButteryType: false, //false去巡检点 true特殊计划
      locationContent: '',
      finishTime: '',
      tranLeft: 100,
      tempicture: null,
      tempicTimer: null,
      moveSet: null,
      areaName: '',
      warnLightOpen: 0,
      hkPlugin:{},
      loading:false
      };
  },
  created() {
    this.init()
  },


  async mounted() {
    try {
      await this.getAlarmList()
      await this.getSysConfig();
      await this.getVideo()
      // await this.init();
      // await this.getAdvices();
      await this.lazyLoad()
      await this.getCarTask()
      await this.getcarList()
    } catch (error) {
      console.log(error);
    }
    this.beforeunloadHandler()
    if (this.dialogLocationBoolen.includes('机器人到达巡检点')) {
      this.locationAuto = true
    }
    this.carRoller = setInterval(() => {
      this.getcarList()
    }, 1000)
  },
  beforeDestroy() {
    this.HKlogout()
    this.stopBroadcast()
    this.stopWarn()
    if (this.robotOpen == 1) {
      this.logoutCar()
    }

    window.clearInterval(this.carRoller)
    window.clearInterval(this.tempicTimer)
    this.carRoller = null
    this.tempicTimer = null
  },

  computed: {
    ...mapState({
      systemConfig: (state) => state.sysConfig.systemConfig,
    }),
    ...mapGetters(['realTimeAlarm', 'cameraOut', 'carrierSelectedIp', 'locationTips', 'locationBoolen',
      'closeAll', 'closeBroadcast', 'closeWarnL', 'dealwithAlarm', 'areaId']),
    realTimeAlarminfo() {
      return this.realTimeAlarm[0]
    },
    yuntaiInfo() {
      return this.cameraOut
    },
    standby() {
      return this.closeAll
    },
    showTable() {
      const now = 0
      const next = this.pageSize * this.pageNum
      return this.alarmList.slice(now, next);
    },
    carrierIp() {
      return this.carrierSelectedIp
    },
    dialogLocation() {
      return this.locationBoolen
    },
    dialogLocationBoolen() {
      return this.locationTips
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    realTimeAlarminfo(newV, oldV) {
      if (newV != undefined) {
        this.showTable.unshift(newV)
      }
    },
    dialogLocation(newV, old) {
      this.locationAuto = true
    },
    yuntaiInfo() {
      if (this.YTlogin == true) {
        this.HKlogout()
        this.$notify({
          message: '云台退出连接',
          type: 'warning',
          title: '提示',
          duration: 5000,
        });
      }
    },

    riskSpeed(newV, oldV) {
      if (newV == 1000) {
        this.speedMode = 1
      } else {
        this.speedMode = 2
      }
    },
    standby() {
      if (this.robotOpen == 1) {
        this.logoutCar()
      }
      this.stopWarn()

      if (this.selectedOption != '语音停止播放' && this.selectedOption != '') {
        stopVoiceBroadcast(this.carrierSelected.CarrierID)
        this.selectedOption = ''
      }
      this.HKlogout()
      this.$refs.closeIntercom.end()

    },
    closeBroadcast(newV, oldV) {
      this.stopBroadcast()
    },
    closeWarnL() {
      this.stopWarn()
    },
    dealwithAlarm() {
      this.alarmList = []
      setTimeout(() => {
        this.getAlarmList()

      }, 1000)
    },
    //左右切换机器时的改变
    carrierIndex() {
      if (this.robotOpen == 1) {
        this.logoutCar()
      }
      this.$store.dispatch('global/setCloseAll', '待机')
      this.carrierSelected = this.carrierArr[this.carrierIndex]
      this.carID = this.carrierSelected.CarrierID
      this.carrierName = this.carrierSelected.CarrierName
      const camera = this.carrierSelected.CarrierAccessoryList[0]
      this.getAreaName()
      this.getCarTask()
      if (camera == undefined) {
        this.currentAdvices[0].accessoryID = null
        this.currentAdvices[0].accessoryType = null
        this.currentAdvices[0].configJson = null
      }
      else {
        this.currentAdvices[0].accessoryID = camera.AccessoryID
        this.currentAdvices[0].accessoryType = camera.AccessoryType
        this.currentAdvices[0].configJson = JSON.stringify(camera.ConfigJson)
      }
      this.$store.dispatch('global/getIp', this.carrierSelected.CarrierIP)
      this.getVideo()
    },
    //切换隧道
    areaId() {
      this.$store.dispatch('global/setCloseAll', '待机')
      this.loading = true
      this.init()
      setTimeout(() => {
        this.getCarTask()

      }, 300);

      setTimeout(() => {
        const camera = this.carrierSelected.CarrierAccessoryList[0]
        this.currentAdvices[0].accessoryID = camera.AccessoryID
        this.currentAdvices[0].accessoryType = camera.AccessoryType
        this.currentAdvices[0].configJson = JSON.stringify(camera.ConfigJson)
      }, 2000);
      this.getVideo()

      
    }
  },

  methods: {
    async init() {
      //机器人列表
      const robotInfo = await getCarrierListByAreaId(this.areaId)
      this.carrierArr = robotInfo.data //机器人的集合
      if (this.carrierArr.length == 0) {
        this.carrierSelected = null
      } else {
        this.carrierIndex = 0 //数组长度
        this.carrierSelected = robotInfo.data[this.carrierIndex]
        this.carrierSelected.CarrierAccessoryList.forEach((res) => {
          this.currentAdvices.push(res)
        })
        // console.log('查看选中机器人', this.carrierSelected)
        this.getAreaName()
        this.carID = this.carrierSelected.CarrierID
        this.carrierName = this.carrierSelected.CarrierName
        this.$store.dispatch('global/getIp', this.carrierSelected.CarrierIP)
        const iframe = document.getElementById('iframes0');
        iframe.onload = () => {
          iframe.contentDocument.onclick = (e) => {
            this.currentCamera = this.currentAdvices[0]
          };
        };

        infrared.onload = () => {
          let clientX = 2
          let clientY = 110
          let timer
          let that = this
          infrared.contentDocument.onmousemove = (e) => {
            clientX = parseFloat(e.clientX).toFixed(1)
            clientY = parseFloat(e.clientY).toFixed(1)
          }
          infrared.contentDocument.onmouseover = (e) => {
            that.tempicTimer = setInterval(() => {
              let param = {
                accessoryID: this.carrierSelected.CarrierAccessoryList[0].AccessoryID,
                sourceHeight: 512,// parseFloat(e.target.clientWidth * 512 / 640)
                sourceWidth: 640, //e.target.clientWidth,//640
                x: parseInt(640 / e.target.clientWidth * clientX),
                y: parseInt(512 / e.target.clientHeight * clientY),
              }
              getTemperature(param).then((res) => {
                if (res.code == 20000) {
                  this.tempicture = res.data + '℃'
                }
                getHot()
                setTimeout(() => {
                  this.tempicture = null
                }, 10000)
              })
              const getHot = function () {
                let tempictureMove = document.getElementById('tempicture')
                const rightMove = e.target.clientWidth - clientX
                if (clientX > 65) {
                  tempictureMove.style.right = rightMove + 'px'
                  tempictureMove.style.top = clientY + 'px'
                }
                else {
                  tempictureMove.style.right = e.target.clientWidth - 65 + 'px'
                  tempictureMove.style.top = clientY + 'px'
                }

              }
            }, 800);

          };
          infrared.contentDocument.onmouseout = () => {
            window.clearInterval(that.tempicTimer)
            timer = null
          }
        };
      }

    },

    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.cancelLocation()
          done();
        })
        .catch(_ => { });
    },
    cancelLocation() {
      CancelCarrierControl(this.carID).then((res) => {
        if (res.code == '20000') {
          this.locationAuto = false
          this.$store.dispatch('global/setLocation', '返回待命点')
        }
      })
    },
    async openLocation() {
      this.robotOpen = 1
      this.HKlogin()
      const time = this.getNowtime()
      const informOpen = await informOpenRobot(this.carrierSelected.CarrierID)
      if (informOpen.code == 20000) {
        connectCar(this.robotOpen, time).then((res) => {
          if (res.code == 20000) {
            Notification({
              title: '提示',
              message: res.message,
              type: 'success',
              duration: 5000
            });
          }
          else {
            Notification({
              title: '提示',
              message: res.message,
              type: 'error',
              duration: 5000
            });
            this.robotOpen = 2
          }
        })
      }
      else {
        this.robotOpen = 2
      }
      this.locationAuto = false
    },
    clearDetail() {
      this.carList = []
      this.butteryInfo = null
      this.gasList = ''
    },
    getAreaName() {
      getPatrolPointListByAreaId(this.carrierSelected.AreaID).then((res) => {

        if (res.data[0] !== undefined) {
          this.areaName = res.data[0].mapDisplayName
        }
        else {
          this.areaName = '绑定区域无站点'
        }
      })
    },
    async changeRobotLeft() {
      setTimeout(() => {
        this.clearDetail()
      }, 1500)
      let i = 0
      if (this.carrierIndex > 0) {
        --this.carrierIndex
      } else {
        this.carrierIndex = this.carrierArr.length - 1
      }

    },
    getVideo() {
      let that = this
      setTimeout(() => {
        getRtsp(this.carID).then((res) => {
          that.currentAdvices[0].src = `/static/video.html?data=${res.data.lightRTSP}&serve=${this.webRtcIP
            }`
          that.currentAdvices[1].src = `/static/video.html?data=${res.data.infraredRTSP}&serve=${this.webRtcIP
            }`
          var text = that.currentAdvices[0].src
          var username = text.match(/\/\/(.*?):/)[1];
          var usernamePassword = text.match(/:(.*?)@/)[1].split(':');
          var password = usernamePassword[1];         
          var ip = text.match(/@(.*?):/)[1];
          that.hkPlugin = {
            Username:username,
            Password:password,
            Ip:ip,
          }
        })
 
      }, 1000);

    },
    async changeRobotRight() {
      setTimeout(() => {
        this.clearDetail()
      }, 1500)

      if (this.carrierIndex >= this.carrierArr.length - 1) {
        this.carrierIndex = 0
      } else {
        ++this.carrierIndex
      }

    },
    async getAlarmList() {
      //获取实时警告
      const res = await getCurrentAlarmRecordList({
        // current: 1,
        alarmCode: null,
        alarmName: null,
        alarmType: 2,
        current: 1,
        limit: 1000000,
        status: ""
      });
      if (res.code === 20000) {
        if (res.data) {
          res.data.records.forEach(element => {

            this.alarmList.push(element)
          });
          this.alarmList.forEach((item, index) => {
            item.index = index + 1;
          });
        }
      }
    },
    async getcarList() {
      if (this.carrierSelected.CarrierID == undefined || this.carrierSelected.CarrierID == '') {
        console.log('CarrierID is null')
        return
      }
      const res = await getCarrierDetailInfo(this.carrierSelected.CarrierID);
      const gas = await GetMonitorData()
      const buttery = await getChargingStateByCarrierID(this.carrierSelected.CarrierID)
      // console.log('小车具体速度,总运行时间,',res)
      this.butteryInfo = buttery.data
      let robot = document.getElementById('robot')
      if (res.code == '20000') {
        this.carList = res.data || [];
        //  console.log('小车速度',this.carList.realTimeSpeed)
        if (this.carList.x >= 1) {
          const left = (93 / 46072) * this.carList.x
          robot.style.left = left * 0.95 + '%'
        }
      }
      //气体
      if (gas.code == '20000') {
        this.gasList = gas.data
      } else {
        this.gasList = []
      }
      const car = await GetRealPatrolTaskByCarrierId(this.carID)
      if (car.data != null) {
        getTaskRemainingMileage(car.data.taskID).then((res) => {
          const time = parseFloat((res.data.time / 60).toFixed(1))
          if (res.data.mileage > 2000 && Math.abs(this.carList.realTimeSpeed) > 100) {
            this.finishTime = parseFloat(((res.data.mileage / (Math.abs(this.carList.realTimeSpeed) * 60))).toFixed(1)) + time
            this.finishTime = this.finishTime.toFixed(1)
            if (res.data.mileage = 0) {
              this.finishTime = 0
            }
          }
          else if (this.carList.realTimeSpeed > 300 && res.data.mileage < 2000) {
            this.finishTime = 0.1
          }
        })
        this.realTimeTask = car.data.planName
      }
      else {
        this.finishTime = 0
        this.realTimeTask = ''
      }

    },
    async getCarTask() {
      this.taskList = []
      this.taskID = ''
      getAllPatrolPlan({
        keyWord: '',
        planType: 2,
      }).then((res) => {
        res.data.forEach(element => {
          if (element.IsEnable != 2 && element.CarrierID == this.carID) {
            this.taskList.push({
              label: element.PlanName,
              value: element.PlanID
            })
          } else {
          }
        });
                this.loading = false

      })
    },
    beforeunloadHandler(e) {
      window.addEventListener("beforeunload", () => {
        this.$store.dispatch('global/setCloseAll', '待机')
      });
    },
    broadcast() {
      this.broadcastVisible = false
      if (this.selectedOption != '语音停止播放' && this.selectedOption != '') {
        let params = {
          carrierID: this.carrierSelected.CarrierID,
          text: this.selectedOption
        }
        startVoiceBroadcast(params).then((res) => {
          if (res.code == 20000) {
            this.broadcasting = true
          } else {
            this.selectedOption = null
          }
        })
      }
      else if (this.selectedOption == '语音停止播放') {
        stopVoiceBroadcast(this.carrierSelected.CarrierID).then((res) => {
          if (res.code == 20000) {
            Notification({
              title: '提示',
              duration: 5000,
              message: '语音停止播放',
              type: 'success'
            })
          }
        })
      }
    },
    startPlan() {
      this.lowButteryType = true
      if (this.taskID == '') {
        Notification({
          title: '提示',
          duration: 5000,
          message: '请选择任务模板',
          type: 'error'
        })
      }
      else {
        this.startPatrol()
      }
    },
    startPatrol() {
      startPatrolPlan(this.taskID, this.lowButtery).then((res) => {
        if (res.code === 20000) {
          Notification({
            title: '提示',
            duration: 5000,
            message: res.data,
            type: 'success',
          });
          this.lowButtery = false
        }
        else if (res.code === 20003) {
          this.lowButtery = true
        }
      })
    },
    goLocation() {
      this.lowButteryType = false
      if (this.locationID == '') {
        Notification({
          title: '提示',
          duration: 5000,
          message: '请输入巡检点',
          type: 'error'
        })
      }
      else {
        let param = {
          carrierId: this.carrierSelected.CarrierID,
          patrolPoint: this.locationID,
          count: null,
          voiceBroadcastText: null,
          exit: this.lowButtery,
          speed: 5000,
          speedMode: 2
        }
        moveToPatrolPoint(param).then((res) => {
          if (res.code === 20000) {
            Notification({
              title: '提示',
              duration: 5000,
              message: res.data,
              type: 'success',
            });
            this.lowButtery = false
          } else if (res.code === 20003) {
            this.lowButtery = true
          }
        })
      }
    },
    goLocationLowButtery() {
      // this.lowButtery = false
      if (this.lowButteryType == false) {
        this.goLocation()
      }
      else {
        this.startPatrol()
      }
      this.lowButtery = false
    },

    async HKlogin() {
      const camera = this.carrierSelected.CarrierAccessoryList[0]
          this.currentAdvices[0].accessoryID = camera.AccessoryID
        this.currentAdvices[0].accessoryType = camera.AccessoryType
        this.currentAdvices[0].configJson = JSON.stringify(camera.ConfigJson)
      //  console.log('查看云台参数',this.carrierSelected.CarrierAccessoryList[0])
      if (!this.YTlogin) {
        let param = {
          carrierID: this.carID,
          id: this.currentAdvices[0].accessoryID,
          configJson: this.currentAdvices[0].configJson,
          accessoryType: this.currentAdvices[0].accessoryType,

        }
        login(param).then((res) => {
          if (res.code == '20000') {
            this.YTlogin = true
          }
          else {

            this.YTlogin = false

          }
        })
      }
      else {
        this.HKlogout()

      }
    },
    HKlogout() {
      if(this.videoOn){
         this.setCameraOperate(23)
      }
      if(this.lightOn){
        this.setCameraOperate(14)
      }
      if (this.YTlogin == true) {
        setTimeout(()=>{
          logOut(this.currentAdvices[0].accessoryID).then((res) => {
          this.YTlogin = false

        })
           },1000)
   
      }

    },
    chart() {
      this.$router.push({
        name: 'menu.sys_run',
      });
    },
    async lazyLoad() {
      this.$nextTick(() => {
        const arr = document.getElementsByClassName('el-table__body-wrapper'); // 伪数组
        const el = arr[arr.length - 1];
        // 绑定事件
        el.addEventListener('scroll', this.handlerLazyLoad);
      });
    },
    async handlerLazyLoad(e) {
      const scrollDistance = e.target.scrollHeight - e.target.scrollTop - 1 - e.target.clientHeight;
      if (scrollDistance <= 0) {
        this.pageNum++;
      }
    },
    async getDetailMessage(e) {
      // console.log("实时", e)
      if (e.AlarmCode == 1014) {
        this.imageUrl = 'http://192.168.20.6:8888/images/' + e.Image
      }
      else {
        this.imageUrl = 'http://192.168.20.44:8888/images/' + e.Image
      }
      this.alarm = e
      this.dialogVisible = true
    },
    //树结构 隧道
    // async getAdvices() {
    //   try {
    //     const res = await getEquipmentList();
    //     // console.log("获取设备列表", res)
    //     //递归重构数据 把设备和隧道组合起来
    //     let hasFindFirstVideo = true;
    //     const deepfined = (list) => {
    //       if (!list && !list.length) return;
    //       list.forEach((item, index) => {
    //         //默认播放第一个机器人摄像头
    //         // console.log('第一个节点',item.children)
    //         // console.log('看隧道',item.areaList && item.areaList.length == true)
    //         if (hasFindFirstVideo && item.children && item.children[0]) {

    //           hasFindFirstVideo = false;
    //           this.treeNodeClick(item.children[0]);
    //           // console.log('第er个节点', item.children[0])
    //           //展开并选中第一个节点
    //           this.defaultExpanded = [item.label];
    //           this.$nextTick(() => {
    //             this.$refs.tree.setCurrentKey(item.children[0].label);
    //           });
    //         }
    //         if (item.areaList && item.areaList.length) {
    //           item.children = [...item.children, ...item.areaList];

    //         }
    //         if (item.children && item.children.length) {
    //           deepfined(item.children);
    //         }
    //       });
    //     };
    //     if (res.code === 20000) {
    //       if (res.data) {
    //         deepfined(res.data);
    //         this.adviceList = res.data || [];

    //       }
    //     }
    //   } catch (error) {
    //   }
    // },
    // treeNodeClick(node) {
    //   if (!node.accessoryList) {
    //     if (this.YTlogin == true) {
    //       this.HKlogout()
    //     }
    //     this.$notify({
    //       message: '请点击机器节点经行选择！',
    //       type: 'warning',
    //       title: '提示',
    //       duration: 5000,
    //     });
    //     this.$refs.tree.setCurrentKey(null);
    //     this.$refs.tree.setCurrentKey(this.currentNode.label);
    //     return;
    //   }
    //   if (this.robotOpen === 1) {
    //     // this.$notify({
    //     //   message: '当前有机器正在被控制,不允许切换',
    //     //   type: 'warning',
    //     //   title: '提示',
    //     //   duration: 1000,
    //     // });
    //     // this.$refs.tree.setCurrentKey(null);
    //     // this.$refs.tree.setCurrentKey(this.currentNode.label);
    //     // return;
    //   }
    //   let arr = [];
    //   if (node && node.accessoryList) {
    //     node.accessoryList.forEach((item) => {
    //       if (item && item.configObj) {
    //         let video = item.configObj;
    //         const src = `/static/video.html?data=${video.rtsp}&serve=${this.webRtcIP
    //           }`;
    //         arr.push({
    //           ...item,
    //           src,
    //         });
    //       }
    //     });
    //     this.currentNode = node;
    //   }
    //   if (arr.length < 1) {
    //     this.arr = [{}, {}];
    //   }
    //   this.currentAdvices = arr;
    // },
    // tabClick(val) {
    //   this.activeName = val;
    // },
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.label.indexOf(value) !== -1;
    // },
    async setOpen() {
      const time = this.getNowtime()
      //通知后台再开遥控
      if (this.robotOpen == 1) {
        const informOpen = await informOpenRobot(this.carrierSelected.CarrierID)
        if (informOpen.code == 20000) {
          connectCar(this.robotOpen, time).then((res) => {
            if (res.code == 20000) {
              Notification({
                title: '提示',
                message: res.message,
                type: 'success',
                duration: 5000
              });

            }
            else {
              Notification({
                title: '提示',
                message: res.message,
                type: 'error',
                duration: 5000
              });
              informCloseRobot(this.carrierSelected.CarrierID)

              this.robotOpen = 2

            }
          })
        }
        else {
          this.robotOpen = 2
        }
      } else if (this.robotOpen == 2) {
        this.logoutCar()
      }

      //关闭后通知
    },
    setWarnLight() {
      const time = this.getNowtime()
      if (this.warnLightOpen == 0) {
        //警示灯closed
        startWarningLight(this.carID).then((res) => {
          if (res.code != 20000) {
            this.warnLightOpen = 0
          }
          else { this.warnLightOpen = 1 }
        })
      } else if (this.warnLightOpen == 1) {
        //警示灯ing
        stopWarningLight(this.carID).then((res) => {
          if (res.code != 20000) {
            this.warnLightOpen = 1
          }
          else {
            this.warnLightOpen = 0
          }          
        })

      }
    },
    stopBroadcast() {
      if (this.selectedOption != '语音停止播放' && this.selectedOption != '') {
        this.selectedOption = '语音停止播放'
        this.broadcast()
      }
    },
    stopWarn() {
      if (this.warnLightOpen == 1) {
        stopWarningLight(this.carID).then((res) => {
          if (res.code == 20000) {
            this.warnLightOpen = 0

          }
        })
      }
    },
    logoutCar() {
      const time = this.getNowtime()
      connectCar(2, time).then((res) => {
        if (res.code == 20000) {
          informCloseRobot(this.carrierSelected.CarrierID)
          this.robotOpen = 2
          this.$store.dispatch('global/setLocation', '返回待命点')
        }

      })

    },
    //速度执行
    async setRobotMoveCrl(flag) {
      const time = this.getNowtime()
      if (this.robotOpen == 2 && flag != 3) {
        Notification({
          title: '提示',
          message: '请打开开关',
          type: 'error',
          duration: 5000
        });
      } else {
        if (flag == 1) {
          this.moveSet = setTimeout(() => {
            moveCar(flag, 1000, 1000000, time).then((res) => {
            })
          }, 1000)

        }
        else if (flag == 2) {
          this.moveSet = setTimeout(() => {
            moveCar(flag, 1000, 1000000, time).then((res) => {
            })

          }, 1000)
        }
        else if (flag == 3) {
          clearTimeout(this.moveSet)
          setTimeout(() => {
            const time = this.getNowtime()
            stopCar(time).then((res) => {
            })
          }, 300)
        }
      }

    },
    async stopCam() {
      if (this.YTlogin == true) {
        setTimeout(() => {
          switch (this.camState) {
            case 1:
              endTiltUp(this.currentAdvices[0].accessoryID)
              break;
            case 3:
              endTiltDown(this.currentAdvices[0].accessoryID)
              break;
            case 5:
              endPanLeft(this.currentAdvices[0].accessoryID)
              break;
            case 7:
              endPanRight(this.currentAdvices[0].accessoryID)
              break;
            case 9:
              EndZoomIn(this.currentAdvices[0].accessoryID)
              break;
            case 11:
              EndZoomOut(this.currentAdvices[0].accessoryID)
              break;
            case 13:
              EndFocusNear(this.currentAdvices[0].accessoryID)
              break;
            case 15:
              EndFocusFar(this.currentAdvices[0].accessoryID)
              break;
            case 17:
              EndIrisOpen(this.currentAdvices[0].accessoryID)
              break;
            case 19:
              EndIrisClose(this.currentAdvices[0].accessoryID)
              break;
          }
        }, 300)
      }
    },
    async setCameraOperate(val) {
      this.camState = val
      if (this.YTlogin == false) {
        Notification({
          title: '提示',
          message: '请先登录设备',
          type: 'error',
          duration: 5000
        })

      } else {
        switch (val) {
          case 1:
            this.camState = val
            startTiltUp(this.speed, this.currentAdvices[0].accessoryID).then((res) => {
            })
            break;
          case 3:
            startTiltDown(this.speed, this.currentAdvices[0].accessoryID).then((res) => {
            })
            break;
          case 5:
            startPanLeft(this.speed, this.currentAdvices[0].accessoryID).then((res) => {
            })
            break;
          case 7:
            startPanRight(this.speed, this.currentAdvices[0].accessoryID).then((res) => {
            })
            break;
          case 9:
            StartZoomIn(this.speed, this.currentAdvices[0].accessoryID)
            break;
          case 11:
            StartZoomOut(this.speed, this.currentAdvices[0].accessoryID)
            break;

          case 12:
            StartLight(this.speed, this.currentAdvices[0].accessoryID).then((res) => {
              if (res.code == 20000) {
                this.lightOn = true
              }
            })
          case 13:
            StartFocusNear(this.speed, this.currentAdvices[0].accessoryID)
            break;
          case 14:
            if (this.YTlogin == true) {
              EndLight(this.currentAdvices[0].accessoryID).then((res) => {
                console.log('关闭补光灯')

                if (res.code == 20000) {
                  this.lightOn = false
                }
              })
            }

          case 15:
            StartFocusFar(this.speed, this.currentAdvices[0].accessoryID)
            break;
          case 16:
            StartWiper(this.speed, this.currentAdvices[0].accessoryID).then((res) => {
            })
            break;
          case 17:
            StartIrisOpen(this.speed, this.currentAdvices[0].accessoryID)
            break;
          case 18:
            EndWiper()
            break;
          case 19:
            StartIrisClose(this.speed, this.currentAdvices[0].accessoryID)
            break;
          case 20:
            takePhoto(this.currentAdvices[0].accessoryID).then((res) => {
              if (res.code == 20000) {
                this.$notify({
                  title: '提示',
                  message: '已拍照，请在媒体文件中查看',
                  duration: 5000
                });
              }

            })
            break;
          case 21:
            startRecord(this.currentAdvices[0].accessoryID).then((res) => {
              if (res.code == 20000) {
                Notification({
                  title: '提示',
                  message: '录像中',
                  type: 'success',
                  duration: 0
                });
                this.videoOn = true
              }

            })
            break;
          case 23:
            endRecord(this.currentAdvices[0].accessoryID).then((res) => {
              if (res.code == 20000) {
                this.$notify.closeAll()
                this.$notify({
                  title: '提示',
                  message: '结束录像，请在媒体文件中查看',
                  duration: 5000
                });
              }
              this.videoOn = false
            })
        }
      }
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
        if (!currentCamera.accessoryID) {
          this.$notify({
            type: 'error',
            message: '请选择摄像头',
            title: '提示',
            duration: 5000,
          });
          return;
        }
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
      } catch (error) { }
    },
    async getSysConfig() {
      const res = await getSystemXmlConfig();
      if (res.code === 20000 && res.data) {
        this.webRtcIP = res.data.webRtcIP;
      }
    },




    async upload() {
      if (this.recorder) {
        const { currentCamera, currentNode, speed } = this;
        // const {
        //   ip,
        //   brandName,
        //   passWord,
        //   port,
        //   userName,
        //   brandType,
        // } = currentCamera.configObj;

        if (!currentCamera.accessoryID) {
          this.$notify({
            type: 'error',
            message: '请选择摄像头',
            title: '提示',
            duration: 5000,
          });
          return;
        }

        const res = await openBroadcast({
          id: currentCamera.accessoryID,
          accessoryType: currentCamera.accessoryType,
          configJson: currentCamera.configJson,
        });
        if (res.code === 20000) {
          let blob = this.recorder.getWAVBlob();
          let formData = new FormData();
          formData.append('file', blob);
          const res2 = await startBroadcast(formData);
          if (res2.code === 20000) {
            this.broadcastStatus = 1;
          }
        }
      }
    },

    getNowtime() {

      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      let ms = new Date().getMilliseconds();
      _this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss + '.' + ms;
      return _this.gettime
    },

    glassCameraSwitch() {
      let glassAddress = "192.168.20.2"
      if (this.glassCamera) {
        this.currentAdvices[0].src = this.glassCameraBak
      } else {
        this.glassCameraBak = this.currentAdvices[0].src
        this.currentAdvices[0].src = `/static/video.html?data=rtsp://${glassAddress}:8080/h264_pcm.sdp&serve=${this.webRtcIP}`
      }
      this.glassCamera = !this.glassCamera
    },
  },




};
</script>
<style lang="scss" scoped>
.page-title {
  line-height: 1.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: rgb(243, 239, 239);
  padding-left: 0.9375rem;
  border-bottom: 0.0625rem solid rgb(4, 114, 141);

  .time {
    font-size: 0.75rem;
    color: #bae1f3;
    margin-left: 0.625rem;
    font-weight: normal;
  }

  .video-btn {
    float: right;
    margin-right: 0.75rem;
    font-size: 1.25rem;
    cursor: pointer;
  }
}

.tempicture {
  position: absolute;
  bottom: 26rem;
  color: black;
}

.content {
  background: transparent;
  font-size: 1.25rem;
  padding-top: 1vh;

  >.el-row {
    height: 100%;

    >.el-col {
      height: 100%;
    }
  }

  //筛选框
  // .selectAdvice {
  //   height: 80;
  //   background: #384C55;
  //   padding: 0.625rem;

  //   .cearchAdvice {
  //     margin-bottom: 2.4375rem;
  //     margin-top: 1.25rem;
  //     padding: 0.25rem 0rem;
  //     height: 2.125rem;

  //     >>>.el-input__inner {
  //       background: rgba(16, 74, 182, 0);
  //       color: #e1ecf1;
  //     }
  //   }

  //   ::v-deep .el-tree {
  //     background-color: #384C55;
  //     color: #fff;

  //     .el-tree-node__label {
  //       font-size: 1.125rem;
  //     }

  //     .el-tree-node__content:hover {
  //       background-color: transparent;
  //     }

  //     .el-tree-node:focus {
  //       background-color: transparent;
  //     }

  //     .el-tree-node:focus>.el-tree-node__content {
  //       background-color: transparent;
  //     }

  //     .is-current {
  //       background-color: #4069a7 !important;
  //     }
  //   }
  // }
  .broadcastSelect {
    position: absolute;
    top: 9rem;
    border-radius: .625rem;
    padding-bottom: 1rem;
    left: 25.3%;
    background-color: #fff;
    z-index: 999;

    .leftTitle {
      color: #66B3B2;
      padding-right: 2rem;
    }

    // .closeBroad:hover{
    //   background-color: #64C8C8;
    // }

  }

  //机器人信息2.0
  .leftTitle {
    font-size: 1.2rem;
    color: #fff;
    padding: 0.75rem 0 0.75rem 1.25rem;
  }

  .robot {
    height: 27.5rem; //27.5rem
    // min-height: 40.7vh;

    .robotMessage {
      display: flex;
      font-size: 1.125rem;
      color: #fff;

      div {
        margin: auto;

        div {
          margin-top: 0.625rem;
          text-align: center;
          color: #67B3B3;
        }
      }
    }

    .robotPic {
      width: 10rem;
      height: 10.625rem;
      margin-left: 33%;
      margin-top: 2.6rem;
    }

    .robotEletri {
      display: flex;
      flex: 1;
      font-size: 1.125rem;
      color: #fff;

      .arrow {
        font-size: 2rem;
      }

      .arrow:active {
        color: #64C8C8;
      }

      .onLine {
        width: 10rem;
        background-color: #67B3B2;
        text-align: center;
        line-height: 1.875rem;
      }
    }

    .warnL {
      .warnLight {

        width: 3.1rem;
        height: 2rem;
        animation: flashAnimation 1s infinite;
        background: linear-gradient(to right, blue 50%, red 50%);
      }

      @keyframes flashAnimation {
        0% {
          opacity: 0;
        }

        50% {
          opacity: 1;
        }

        100% {
          opacity: 0;
        }
      }

      ::v-deep .el-switch__core {
        width: 2.1875rem !important;
        height: .9375rem;
      }

      ::v-deep .el-switch__core::after {
        width: .875rem;
        height: .875rem;
        margin-top: -0.0625rem;
        margin-bottom: .125rem;
      }

    }


    .electri {
      position: absolute;
      color: #fff;
      top: 15.875rem;
      left: 1.8125rem;

      .el-progress {
        margin-left: 1rem;
      }

      ::v-deep .el-progress__text {
        color: #fff;
      }
    }

    .microphone,
    .broadcast {
      position: absolute;
      margin-bottom: 3.125rem;
      top: 16.875rem;
      left: 20.3%;
      border-radius: 0.625rem;
      font-size: 2.5rem;
      color: #fff;
      width: 3.75rem;
      height: 3.125rem;
      line-height: 3.125rem;
      background-color: #66B3B2;
      text-align: center;
    }

    .warning_light {
      color: #fff;
      // position: fixed;
      font-size: 0.8em;
      text-align: left;
      width: 6.5rem;
    }

    .warning_light_active {
      animation: flashAnimation 1s infinite;
      background: linear-gradient(to right, blue 50%, red 50%);
      background-image: linear-gradient(to bottom left, blue 50%, #eee, red 51%);
    }

    .speak_detail {
      color: #fff;
      // position: fixed;
      font-size: 0.8rem;
      text-align: left;
      width: 6.5rem;
    }

    .microphone {
      top: 16rem;
    }

    .broadcast {
      top: 9.375rem;
    }

    .broadcast_detail {
      color: #fff;
      position: absolute;
      font-size: 0.8rem;
      left: 20.3%;
      top: 48%;
    }

    .broadcast:active {
      opacity: 0.7;
    }
  }

  .task {
    //28.75rem
    height: 8.5rem; //11.25rem
    margin: 0.5rem 0; //1.25rem


    .taskDetail {
      display: flex;
      padding-left: 1.25rem;
      // margin-top: %;
      color: #fff;
      font-size: 1rem;
      width: 100%;

      ::v-deep .el-input__inner {
        background-color: rgba($color: #071828, $alpha: 0.5);
        width: 14rem;
        height: 1.875rem;
      }
    }

  }

  .threeRow {
    height: 13.1rem;
    min-height: 10.625rem;
  }

  .enviroment {
    // height: 13.8rem;
    color: #fff;

    .enviroDetail {
      display: flex;
      width: 25%;
      min-width: 6rem;
      height: 4.5rem;
      min-height: 3.75rem;
      background: linear-gradient(181deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.00) 100%);
      opacity: 0.9;
      margin: auto;
      border-radius: 0.5rem;
      font-size: 1rem;
      word-break: break-all;
      overflow: hidden;

      .gas {
        color: #66B3B2;
        margin: 0.625rem 0 0 0.375rem;

      }

      .gasDetail {
        margin: 1.625rem 0 0 0.5rem;
        width: 4rem;
        word-break: keep-all;
      }

      div {
        width: 2.5rem;
      }

      .detail_icon {
        margin-left: 0.375rem;
        margin-top: 0.625rem;
        word-break: keep-all;
      }

    }
  }

  .alarm_2 {

    .alarm_title {
      width: 95%;
      position: relative;
      display: flex;
      font-size: 1.125rem;
      color: #ffffff;
      padding: 0.625rem 0 0 1.25rem;

      .chart {
        background-color: #64C8C8;
        border-radius: 0.625rem;
        font-size: 1rem;
        width: 6.25rem;
        position: absolute;
        right: 0;
        text-align: center;
        line-height: 1.675rem;
      }

      .chart:active {
        opacity: 0.5;
      }

    }

    .alarm {
      padding-left: 0.625rem;
      height: 1.875rem;

      .el-table::before {
        height: 0;
      }


      .first {
        background: rgb(254, 0, 0);
        border-radius: 0.125rem;
        padding: 0.0625rem 0.25rem;
      }

      .two {
        background: rgb(236, 109, 30);
        border-radius: 0.125rem;
        padding: 0.0625rem 0.25rem;
      }

      .three {
        background: rgb(215, 146, 102);
        border-radius: 0.125rem;
        padding: 0.0625rem 0.25rem;
      }

      .four {
        background: rgb(100, 229, 238);
        border-radius: 0.125rem;
        padding: 0.0625rem 0.25rem;
      }
    }
  }

  // 云台控制
  .control_direction:active {
    color: red;
  }



  ::v-deep .el-select .el-input .el-select__caret {
    line-height: 1.5rem;
  }

  .center {

    // height: 84;
    .video {
      display: flex;
      // .active {
      //   border: 0.1875rem solid #f3caba;
      // }
    }
  }

  .infrared {
    width: 100%;
    height: 27.5rem;

  }

  .infrared:hover {
    border: 0.1rem solid #f3caba;
  }

  .map {
    // margin: 0.625rem;
    margin: 0.5rem 0; //1.25rem
    height: 8.5rem;
    background-size: 100%;
    background-repeat: no-repeat;
    color: #fff;

    .backgroundIm {
      border: transparent;
      width: 100%;
      height: 100%;
      position: relative;
      //right: 1.5625rem;
      //bottom: 0.8rem;
      opacity: 1;
    }

    .nowPosition {
      flex: 1;
      display: flex;
      position: relative;
      bottom: 8.25rem;
    }

    .goLocation {
      display: flex;
      margin-left: auto;
      position: relative;
      bottom: 8.5rem;
      // left: 22vw;
      font-size: 0.8rem;
      line-height: 1.875rem;
      margin-right: 1rem;

      .location_Detail {
        width: 12rem;
        min-width: 11.5rem;

        ::v-deep .el-input__inner {

          padding-left: 3.25rem;
        }
      }

      ::v-deep .el-input__inner {
        background-color: rgba($color: #071828, $alpha: 1);
        height: 1.875rem;
      }

      .el-select {
        width: 9.5rem;
        min-width: 6.875rem;
        margin: 0 0.625rem;
      }

      .goYes {
        width: 3.75rem;
        height: 1.875rem;
        line-height: 1.9375rem;
        background-color: #64C8C8;
        border-radius: 0.1875rem;
        text-align: center;
        margin-left: 0.8rem;
      }
    }
  }

  // .right {
  //   width: 19.375rem;

  // }

  ::v-deep .el-input__inner,
  .el-range-editor.el-input__inner {
    height: 1.875rem;
    // background-color: rgba($color: #071828, $alpha: 1);
    background-color: transparent;
    color: #fff;
  }

  .hkControl {
    width: 100%;
    background-color: rgba(7, 24, 40, 0.5);
    //border-radius: 0.625rem;
    margin: 0 0 0.875rem 0;
    color: #fff;
    border: 0.0625rem solid transparent;

    .leftTitle {
      padding-bottom: 0.3125rem;
    }

    .hkMove {

      .hkUp,
      .hkLeft,
      .hkRight,
      .hkDown,
      .hkConnect,
      .HKloading {
        position: relative;
      }

      .hkUp {
        width: 6.25rem;
        left: 3.125rem;
        top: 0.5375rem;
      }

      .hkLeft,
      .hkRight {
        width: 2.8125rem;
        left: 1.5625rem;
        transform: translateY(-15%);
      }

      .hkRight {
        left: 1.875rem;
      }

      .hkConnect,
      .HKloading {
        width: 3.4375rem;
        height: 3.4375rem;
        left: 1.75rem;
        transform: translateY(15%);
      }

      .HKloading {
        opacity: 0.7;
      }

      .hkDown {
        width: 6.25rem;
        left: 3.125rem;
        transform: translateY(-68%);
      }
    }


    ::v-deep .el-input.is-disabled .el-input__inner {
      width: 3.75rem;
      text-align: center;
    }

    img:active,
    .action_detail:active {
      opacity: 0.5;
    }

    .hkAction {
      display: flex;
      margin-top: 0.625rem;

      .action_detail {
        width: 3.125rem;
        height: 1.875rem;
        line-height: 1.875rem;
        background-color: #64C8C8;
        border-radius: 0.2081rem;
        margin: auto;
        text-align: center;

        //  justify-content: center;
        img {
          height: 1.5625rem;
          margin-top: 0.125rem;
        }
      }
    }
  }

  ::v-deep .el-radio {
    color: #000000;
    margin: 0.625rem 1.25rem;

    .el-radio__inner {
      border: .0625rem solid #000000;
    }
  }

  ::v-deep .el-slider__bar {
    background-color: #64C8C8;
  }
  ::v-deep .el-loading-mask {
  background: none;   
}
  .broadcastBtn {
    position: relative;
    top: 2%;
    margin-left: 33%;
  }

  .robotControl {
    margin: 0.5rem 0; //1.25rem
    width: 100%;
    background-color: rgba(7, 24, 40, 0.5);
    color: #fff;
    height: 8.5rem;
    border: 0.0625rem solid transparent;

    .leftTitle {
      // padding-bottom: 0.5rem;
    }

    .robotDirec {
      width: 7rem;
      height: 3rem;
      background-color: #64C8C8;
      margin: 0 1.1563rem;
      border-radius: 0.625rem;
      text-align: center;
      line-height: 3.635rem;

      img {
        width: 1.5625rem;

      }
    }

    .speed {
      margin-left: 6rem;

      font-size: 1rem;

    }

    .robotDirec:active {
      opacity: 0.5;
    }

    .speed_detail,
    .speed_urgency,
    .speed_detail_active,
    .speed_urgency_active {
      width: 6.25rem;
      height: 1.875rem;
      line-height: 1.875rem;
      border-radius: 0.625rem;
      background-color: #64C8C8;
      text-align: center;
      margin: auto;
      opacity: 0.5;
    }

    .speed_urgency,
    .speed_detail {
      background-color: #fff;
      color: black;
    }

    .speed_detail_active,
    .speed_urgency_active {
      opacity: 1;
    }
  }

}
</style>
