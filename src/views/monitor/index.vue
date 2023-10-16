<template>
  <div style="height:100%" :class="themeClass">
    <div class="content"  v-loading="loading">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="robot chamfer" >
            <div class="leftTitle" style="padding-bottom: 0;display: flex;margin-bottom: 1.5rem">
              <div style="z-index: 10;margin-left: 0.5rem;font-weight: var(--title-bolder)">机器人信息
                <span v-if="butteryInfo">({{ butteryInfo }})</span>
              </div>
              <div style="display: flex;position: absolute;margin-top: 0.7rem;z-index: 9">
                <div style="width: 17rem;height: 0.7rem;background: linear-gradient(270deg,transparent,rgba(99,182,182,0.25),rgba(99,182,182,0.5), rgb(99,182,182));transform: skewX(45deg);"></div>
                <div style="width: 0.6rem;height: 0.7rem;opacity: 0.5;background: linear-gradient(0deg,transparent,rgba(99,182,182,0.5), rgb(99,182,182));transform: skewX(45deg);margin-left: 0.3rem"></div>
                <div style="width: 0.6rem;height: 0.7rem;opacity: 0.3;background: linear-gradient(0deg,transparent,rgba(99,182,182,0.4), rgb(99,182,182));transform: skewX(45deg);margin-left: 0.3rem"></div>
              </div>
            </div>
            <div class="robotMessage">
              <div>
                当前速度
                <div>
                  {{isNaN(carList.realTimeSpeed) ? '0' : Math.abs((carList.realTimeSpeed / 1000).toFixed(1)) }} m/s
                </div>
              </div>
              <div style="margin-left:10% ;">
                累计运行里程
                <div>
                  {{ isNaN(carList.totalDistance) ? '0' : (carList.totalDistance / 100000).toFixed(2) }} Km
                </div>
              </div>
              <div>
                累计运行时间
                <div>
                  {{ isNaN(carList.totalRunTime) ? '0' : (carList.totalRunTime / 1440).toFixed(1) }} Day
                </div>
              </div>
            </div>
            <div>
              <img src="../../assets/img/robot.png" class="robotPic">
            </div>
            <div class="robotEletri">
              <div style="display:flex;margin:2rem auto;">
                <i class="el-icon-caret-left arrow" style="cursor: pointer" @click="changeRobotLeft"></i>
                <div :class="[ carList.inSystem ? 'onLine': 'outLine']">{{ carrierName }}({{ carList.inSystem ? '在线' : '离线' }})</div>
                <i class="el-icon-caret-right arrow" style="cursor: pointer" @click="changeRobotRight"></i>
              </div>
            </div>
            <div class="warnL" style="cursor: pointer;position:absolute;top: 9.2rem;left: 2.7rem;">
              <div
                style="border-radius: 0.625rem;;width: 3.1rem;border: 1px solid #66B3B2;display: flex;height: 3rem;line-height: 2rem;align-items: center;justify-items: center;"
                @click="setWarnLight()" :class="{ 'warning_light_active': warnLightOpen == 1 }">
                <img src="../../assets/img/warnLight.png" style="margin: auto;width: 2.3rem">
                <!--                <svg-icon icon-class="warnLight" style="margin:auto;width: 2.5rem;height: 2.5rem;"></svg-icon>-->
              </div>
              <div class="warning_light" style="font-size: 0.875rem;margin: 0.5rem 0.2rem;color: var(--font-color)"> 警示灯</div>

            </div>

            <div class="electri">
              <el-progress :width="45" style="font-size: 24px;" color="#64C8C8" text-color="#64C8C8" type="circle"
                :percentage="carList.batteryLevel"></el-progress>
              <div style="font-size: 0.85rem;margin: 0.5rem 0 0 0.5rem">当前电量</div>
            </div>
            <div class="microphone" style="cursor: pointer">
              <Intercom ref="closeIntercom" :key="carID" :carID="carID" :hkPlugin="hkPlugin" ></Intercom>
              <div class="speak_detail" style="color: var(--font-color)">语音对讲</div>
            </div>
            <div class="broadcast" style="cursor: pointer" @click="broadcastVisible = true">
              <svg-icon icon-class="horn"></svg-icon>
              <!-- <svg-icon icon-class="stopBroadcast" v-show="broadcasting == true"></svg-icon> -->
              <div class="broadcast_detail" style="color: var(--font-color)">语音播报</div>
            </div>
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
          <el-radio-group v-model="selectedOption" style="min-height:13rem;max-height:15rem;overflow:scroll">
            <el-radio  style="color:red ;" label=" 语音停止播放"></el-radio>
             <el-radio 
               v-for="(item, index) in radioList"
               :key="index"
              :label="item.text"
             >
               {{ item.text }}
               <br> 
             </el-radio>
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
          <span style="font-size:1.5rem ;">已到达桩号{{ locationName }}，是否手动操作机器人</span>
          <span slot="footer">
            <el-button size="mini" @click="cancelLocation()">否</el-button>
            <el-button size="mini" type="primary" @click="openLocation()">是</el-button>
          </span>
        </el-dialog>

      </el-row>

      <el-row :gutter="10" style="position: relative">

        <el-col :span="16" style="padding: 0">
          <el-col :span="9">
            <div class="task chamfer">
              <div class="leftTitle" style="padding-bottom: 0;display: flex;margin-bottom: 1rem">
                <div style="z-index: 10;margin-left: 0.5rem;font-weight: var(--title-bolder)">任务信息</div>
                <div style="display: flex;position: absolute;margin-top: 0.7rem;z-index: 9">
                  <div style="width: 17rem;height: 0.7rem;background: linear-gradient(270deg,transparent,rgba(99,182,182,0.25),rgba(99,182,182,0.5), rgb(99,182,182));transform: skewX(45deg);"></div>
                  <div style="width: 0.6rem;height: 0.7rem;opacity: 0.5;background: linear-gradient(0deg,transparent,rgba(99,182,182,0.5), rgb(99,182,182));transform: skewX(45deg);margin-left: 0.3rem"></div>
                  <div style="width: 0.6rem;height: 0.7rem;opacity: 0.3;background: linear-gradient(0deg,transparent,rgba(99,182,182,0.4), rgb(99,182,182));transform: skewX(45deg);margin-left: 0.3rem"></div>
                </div>
              </div>
              <div class="taskDetail">
                <div>
                  当前任务&nbsp;
                  <span style="color:var(--data-color) ;">
                    {{ realTimeTask == '' ? '空闲状态' : realTimeTask }}
                  </span>
                </div>

              <span style="margin-left: 1.875rem;">
                  预计完成时间&nbsp;
                <span style="color:var(--data-color) ;">
                  {{ finishTime == '' ? '0' : Math.abs(finishTime) }} 分钟
                </span>
              </span>
              </div>
              <div class="leftTitle" style="padding-top: 0.5rem;padding-bottom: 0rem;">
                任务下发
              </div>
              <div class="taskDetail">
                <span style="width: 6rem;line-height: 2rem;height: 2rem;overflow: hidden;">任务模板  </span>
                <span style="color:#66B3B2;width: 7rem">
                  <el-select v-model="taskID" placeholder="任务选择">
                    <el-option v-for="item in taskList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </span>
                <el-popconfirm title="确定执行任务吗?" @confirm="startPlan()">
                  <div
                    style="cursor: pointer;border-radius:10px;background-color:#66B3B2 ; color:#ffffff;margin-left: 5.5rem;width: 3.75rem; text-align: center; height: 1.875rem;line-height: 1.875rem;"
                    slot="reference">执行</div>
                </el-popconfirm>
              </div>
            </div>
          </el-col>

          <el-col :span="15">
            <div class="map back-shaodow">
              <div class="image-container">
                <img src="../../assets/img/qfsd.png" class="backgroundIm" id="areaImage">
              </div>
              <div style="display: flex;">
                <div class="nowPosition">
                  <span style="margin:0.125rem 0.625rem 0  0.625rem ;font-size: 1.25rem;font-weight: var(--title-bolder);">巡检地图</span>
                  <span style="font-size: 1rem;padding-top: 0.3rem;">{{ carrierName }}当前位置：{{ carList.pileNumber == null ?
                    (isNaN(carList.x) ? '未知' :  (carList.x / 1000).toFixed(1)) :
                    '站点' + carList.pileNumber
                  }}</span>
                </div>
                <div class="goLocation">
                  <!-- <el-input class="location_Detail" v-model="locationID" :placeholder="areaName">
                    <template slot="prefix">去往</template>
                  </el-input> -->
                      <span style="font-size: 1rem;margin-right: 0.5rem">去往</span>
                      <el-autocomplete
                        class="location_Detail"
                        v-model="locationName"
                        value-key="areaName"
                        :fetch-suggestions="querySearch"
                        placeholder="如K19+20"
                        @select="handleSelect"
                      >
                      <!-- <template slot="prefix">去往</template> -->
                     </el-autocomplete>
                  <el-popconfirm title="确定去往桩号?" @confirm="goLocation">
                    <div class="goYes" slot="reference">确定</div>
                  </el-popconfirm>
                </div>
              </div>


              <div id="robot" style="position:relative;width: 3.125rem;bottom: 5.3rem;margin-left: 3rem;transition: left 1s ease-in-out;">
                <img src="../../assets/img/robot1.png" style="width:2.5rem;height: 1.875rem;opacity: 1;">
              </div>

            </div>
          </el-col>

          <el-col :span="9">
            <div class="enviroment chamfer threeRow">
              <div class="leftTitle" style="padding-bottom: 0;display: flex;margin-bottom: 1rem">
                <div style="z-index: 10;margin-left: 0.5rem;font-weight: var(--title-bolder)">环境信息</div>
                <div style="display: flex;position: absolute;margin-top: 0.7rem;z-index: 9">
                  <div style="width: 17rem;height: 0.7rem;background: linear-gradient(270deg,transparent,rgba(99,182,182,0.25),rgba(99,182,182,0.5), rgb(99,182,182));transform: skewX(45deg);"></div>
                  <div style="width: 0.6rem;height: 0.7rem;opacity: 0.5;background: linear-gradient(0deg,transparent,rgba(99,182,182,0.5), rgb(99,182,182));transform: skewX(45deg);margin-left: 0.3rem"></div>
                  <div style="width: 0.6rem;height: 0.7rem;opacity: 0.3;background: linear-gradient(0deg,transparent,rgba(99,182,182,0.4), rgb(99,182,182));transform: skewX(45deg);margin-left: 0.3rem"></div>
                </div>
              </div>
              <div style="display:flex">
                <div class="enviroDetail">
                  <div class="detail_icon">
                    <i class="fa fa-thermometer fa-lg" style="font-size:1.25rem;margin-left: 0.75rem;color: var(--font-color);"></i>
                    <div style="margin-top: 0.25rem">温度</div>
                  </div>
                  <div class="gasDetail" style="margin: 1.625rem 0 0 0.25rem;">
                    {{ isNaN(gasList.Temperature) ?   '0': parseFloat((gasList.Temperature / 100).toFixed(1))}} ℃
                  </div>
                </div>
                <div class="enviroDetail">
                  <div class="detail_icon">
                    <i class="fa fa-tint fa-lg" style="font-size:1.25rem;margin-left: 0.75rem;color: var(--font-color);"></i>
<!--                    <svg-icon icon-class="shidu" style="font-size:1.25rem;margin-left: 0.5rem;"></svg-icon>-->
                    <div style="margin-top: 0.25rem">湿度</div>
                  </div>
                  <div class="gasDetail" style="margin: 1.625rem 0 0 0.25rem;">
                    {{ isNaN( gasList.Humidity) ? '0' : (gasList.Humidity / 100).toFixed(1) }} %
                  </div>
                </div>
                <div class="enviroDetail">
                  <div class="gas" style="margin: 1.5rem 0 0 0.75rem">烟雾</div>
                  <div class="gasDetail">
                    {{ gasList.Smoke == null ? '0' : (gasList.Smoke / 100).toFixed(1) }}
                    <div style="font-size: 1rem;">ppm</div>
                  </div>
                </div>
              </div>
              <div style="display:flex;margin-top: 0.625rem;">
                <div class="enviroDetail">
                  <div class="gas" style="text-align:center;margin-left: 0.75rem">硫化氢</div>
                  <div class="gasDetail">
                    {{ gasList.H2S == null ? '0' : (gasList.H2S / 100).toFixed(1) }}
                    <div style="font-size: 1rem;">ppm</div>
                  </div>
                </div>
                <div class="enviroDetail">
                  <div class="gas" style="margin-left: 0.75rem;">一氧化碳</div>
                  <div class="gasDetail">
                    {{ gasList.CO == null ? '0' : (gasList.CO / 100).toFixed(1) }}
                    <div style="font-size: 1rem;">ppm</div>
                  </div>
                </div>
                <div class="enviroDetail">
                  <div class="gas" style="margin: 1.5rem 0 0 0.75rem">甲烷</div>
                  <div class="gasDetail">
                    {{ gasList.CH4 == null ? '0' : (gasList.CH4 / 100).toFixed(1) }}
                    <div style="font-size: 1rem;">ppm</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="15">
            <div class="alarm_2 back-shaodow threeRow">
              <div class="alarm_title" style="margin-bottom: 0.5rem;font-weight: var(--title-bolder)">告警信息
                <div class="chart" style="font-weight: normal;cursor: pointer" @click="chart()">告警分析</div>
              </div>
              <div class="alarm">
                <div class="myTable">
                  <el-table :data="showTable" @row-click="getDetailMessage" style="width: 98%" height="10rem">
                    <el-table-column width="60" label="序号" type="index" align="center">
                    </el-table-column>
                    <el-table-column prop="AlarmCode" :label="'告警码'" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="CarrierName" :label="'机器人名称'"  align="center">


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

                <el-dialog title="告警详情" :visible.sync="dialogVisible" width="60%" @close="closeDetailDialog">
                  <div style="display:flex;color: var(--font-color);">
                    <div style="width:70%;position: relative;">
                      <div style="height:60%;display: flex;margin-bottom: 1rem">
                        <div style="width:50%;background-color: #8c939d;margin-right: 1rem">
                          <el-image :src="imageUrl"
                                  style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center"
                                  :preview-src-list="imageUrl">
                            <div slot="error" class="image-slot">
                              <div style="font-size: 2rem;">暂无图片</div>
                            </div>
                          </el-image>
                        </div>
                        <div v-if="nvrVideoSrc == ''"
                             class="nvrRecord"
                             style="width:50%;background-color: #8c939d;font-size: 2rem;align-items: center;justify-content: center;display: flex;">
                          暂无视频
                        </div>
                        <video
                            style="width:50%;background-color: #8c939d;"
                            class="nvrRecord"
                            ref="nvrVideo"
                            v-if="nvrVideoSrc != ''"
                            :src="nvrVideoSrc"
                            autoplay controls
                        >
                        </video>
                      </div>
                      <div style="width: 100%;height:40%;position: relative;display: flex;justify-content: center;align-items: center;">
                        <span style="font-size: 2.5rem;color: rgb(100,200,200)">{{this.alarm.statusNum == 0 || this.alarm.statusNum == 1 ? "未处理":"已处理"}}</span>
                      </div>
                    </div>

                    <div style="margin-left:2vw">
                      <div style="margin: 1rem 0; display: flex;position:relative;    align-items: center">告警级别:
                        <div style="margin: 0 1rem;border: red 1px solid;width: 3rem;height: 1.5rem;display: flex;align-items: center;justify-content: center;">
                          <span v-if="alarm.MaxLevel == 4" style="color: red;font-size: 1rem;text-shadow: 0 0 3px #000000;">致命</span>
                          <span v-if="alarm.MaxLevel == 3" style="color: orange;font-size: 1rem;text-shadow: 0 0 3px #000000;">严重</span>
                          <span v-if="alarm.MaxLevel == 2" style="color: yellow;font-size: 1rem;text-shadow: 0 0 3px #000000;">一般</span>
                          <span v-if="alarm.MaxLevel == 1" style="color: #08F9EB ;font-size: 1rem;text-shadow: 0 0 3px #000000;">提示</span>
                        </div>

                      </div>
                      <div style="margin: 2vh  0;">
                        告警名称：{{ alarm.AlarmName }}
                      </div>
                      <div style="margin: 3vh  0;">
                        告警编号：{{ alarm.ID }}
                      </div>
                      <div style="margin: 3vh  0;">
                        告警类型：{{
                          alarm.AlarmCode == 1001 ? "行人告警" :
                          alarm.AlarmCode == 1002 ? "非机动车告警" :
                          alarm.AlarmCode == 1003 ? "异物告警" :
                          alarm.AlarmCode == 1004 ? "温度告警" :
                          alarm.AlarmCode == 1005 ? "湿度告警" :
                          alarm.AlarmCode == 1006 ? "气体告警" :
                          alarm.AlarmCode == 1007 ? "灯光告警" :
                          alarm.AlarmCode == 1008 ? "违停逆行告警" :
                          alarm.AlarmCode == 1009 ? "超速告警" :
                          alarm.AlarmCode == 1010 ? "动物告警" :
                          alarm.AlarmCode == 1012 ? "消防设备告警" :
                          alarm.AlarmCode == 1011 ? "井盖异常告警" :
                          alarm.AlarmCode == 1013 ? "火灾烟雾告警" :
                          alarm.AlarmCode == 1014 ? "红外测温告警" : "机体告警"
                        }}
                      </div>
                      <div style="margin: 3vh 0;">
                        事件描述：{{ alarm.Description }}
                      </div>
                      <div style="margin: 3vh 0;">
                        告警位置：{{ alarm.Location }}
                      </div>
                      <div style="margin: 3vh  0;">
                        发生时间：{{ alarm.ReportTime }}
                      </div>
                      <div style="margin: 3vh  0;">
                        修复时间：{{ alarm.RecoveryTime == null ? "未修复" : alarm.RecoveryTime }}
                      </div>
                    </div>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <template>
<!--                      <el-button v-if="alarm.Status == 0 || alarm.Status == 1"  type="primary" @click="showDetail(alarm)">处 理</el-button>-->
                      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </template>
                  </span>
                </el-dialog>
              </div>
            </div>
          </el-col>
        </el-col>

        <el-col :span="8">
          <div class="robotControl back-shaodow" style="border-bottom: 1px solid rgb(100, 200, 200)">
            <div class="leftTitle" style="display: flex;position: relative;;font-weight: var(--title-bolder)">
              机器人控制
              <div>
                <el-switch :disabled="!carID" style="height: 1.25rem;margin-left:1rem ;" v-model="robotOpen"
                           active-text="开" inactive-text="关" @change="setOpen()" :active-value="1" :inactive-value="2">
                </el-switch>
              </div>
              <div style="margin-left: 7vw;">机器人速度{{ robotSpeed / 1000 }}m/s</div>
            </div>

            <div style="display:flex;margin: 0.75rem 0;">
              <div class="robotDirec" style="cursor: pointer" @mousedown="setRobotMoveCrl(2)" @mouseup="setRobotMoveCrl(3)">
                <img src="../../assets/img/back.png" style="width:3rem" alt="">
                <!--                <span style="position: relative;;bottom: 0.3125rem;">后退</span>-->
              </div>
              <div class="robotDirec" style="cursor: pointer" @mousedown="setRobotMoveCrl(1)" @mouseup="setRobotMoveCrl(3)">
                <!--                <span style="position: relative;;bottom: 0.3125rem;">前进</span> -->
                <img src="../../assets/img/front.png" style="width:3rem" alt="">
              </div>
              <div class="speed">
                <div @click="robotSpeed = 1000" style="cursor: pointer" :class="robotSpeed == 1000 ? 'speed_detail_active' : 'speed_detail'">
                  巡检速度
                </div>
                <div style="margin-top:0.4375rem; cursor: pointer;" @click="robotSpeed = 8000"
                     :class="robotSpeed == 8000 ? 'speed_urgency_active' : 'speed_urgency'">
                  应急速度
                </div>
              </div>
            </div>
            <div class="hkControl back-shaodow">
              <div class="leftTitle" width="6.25rem;" style="margin-top: 1rem;font-weight: var(--title-bolder)">
                云台控制
              </div>
              <div style="display:flex ;">
                <div class="hkMove">
                  <img src="../../assets/img/hkUp.png" style="cursor: pointer" @mousedown="setCameraOperate(1)" @mouseup="stopCam()" class="hkUp">
                  <div style="display: flex;">
                    <img src="../../assets/img/hkLeft.png" style="cursor: pointer" @mousedown="setCameraOperate(5)" @mouseup="stopCam()"
                         class="hkLeft">
                    <img src="../../assets/img/hkConnect.png" @click="HKlogin()" style="cursor: pointer"
                         :class="[YTlogin == true ? 'HKloading' : 'hkConnect']">
                    <img src="../../assets/img/hkRight.png" style="cursor: pointer" @mousedown="setCameraOperate(7)" @mouseup="stopCam()"
                         class="hkRight">
                  </div>
                  <img src="../../assets/img/hkDown.png" style="cursor: pointer" @mousedown="setCameraOperate(3)" @mouseup="stopCam()"
                       class="hkDown">
                </div>
                <div style="margin-left: 4.125rem;width:18.75rem;position: relative;">
                  <div class="hkAction">
                    <div title="放大" class="action_detail" style="cursor: pointer" @mousedown="setCameraOperate(9)" @mouseup="stopCam()">
                      <img src="../../assets/img/fangda.png" alt="">
                    </div>
                    <div title="照相" class="action_detail" style="cursor: pointer">
                      <img src="../../assets/img/takephoto.png" @click="setCameraOperate(20)">
                    </div>
                    <div title="清洗" class="action_detail" style="cursor: pointer" @mousedown="setCameraOperate(16)" @mouseup="stopCam()">
                      <img src="../../assets/img/clean.png" alt="">
                    </div>
                    <div title="聚焦" class="action_detail" style="cursor: pointer" @mousedown="setCameraOperate(13)" @mouseup="stopCam(13)">
                      <img src="../../assets/img/jujiao.png" alt="">
                    </div>
                  </div>
                  <div class="hkAction">
                    <div title="缩小" class="action_detail" style="cursor: pointer" @mousedown="setCameraOperate(11)" @mouseup="stopCam(11)">
                      <img src="../../assets/img/suoxiao.png" alt="">
                    </div>
                    <div class="action_detail" style="cursor: pointer">
                      <img title="录像" src="../../assets/img/video.png" v-if="!videoOn" @click="setCameraOperate(21)">
                      <img title="关闭录像" src="../../assets/img/closeVideo.png" v-if="videoOn" @click="setCameraOperate(23)">
                    </div>
                    <div class="action_detail" style="cursor: pointer">
                      <img title="开灯" src="../../assets/img/light.png" v-if="!lightOn" @click="setCameraOperate(12)">
                      <img title="关灯" src="../../assets/img/closeLiht.png" v-if="lightOn" @click="setCameraOperate(14)">
                    </div>
                    <div class="action_detail" style="cursor: pointer" @mousedown="setCameraOperate(15)" @mouseup="stopCam(15)">
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
                    </div>
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
import { getAllPatrolPlan, startPatrolPlan,getVoiceNoPageList } from '../../api/taskConfig';
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
      nvrVideoSrc: '',
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
      locationName: '',
      realTimeTask: '',
      carRoller: '',
      carMove: '',
      broadcastVisible: false,
      selectedOption: '',
      speedList: [{
        value: 8000,
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
      areaName: [],
      warnLightOpen: 0,
      hkPlugin:{},
      loading:false,
      frameShadow: true,
      previewSrcList: [],
      offset:0,
      radioList:[],
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
    this.$refs.closeIntercom.end()

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
      'closeAll', 'closeBroadcast', 'closeWarnL', 'dealwithAlarm', 'areaId','theme']),
    realTimeAlarminfo() {
      return this.realTimeAlarm[0]
    },
    yuntaiInfo() {
      return this.cameraOut
    },
    themeClass(){
      return this.theme === 'theme-1' ? 'theme-1' :'theme-2';

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
    themeClass(nv,ov){
      // console.log('themeClass',nv,ov)
      switch (nv) {
        case 'theme-1': this.frameShadow = true;break;
        case 'theme-2': this.frameShadow = false;break;
      }
      // console.log('this.frameShadow--->',this.frameShadow)
    },

    filterText(val) {
      this.$refs.tree.filter(val);
    },
    realTimeAlarminfo(newV, oldV) {
      // if (newV != undefined) {
      //   this.showTable.unshift(newV)
      // }
      // this.showTable = []
      this.getAlarmList()
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

      if (!this.selectedOption.includes('语音停止播放') && this.selectedOption != '') {
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
      setTimeout(() => {
        this.getAlarmList()
      }, 1000)
    },
    //左右切换机器时的改变
    carrierIndex() {
      this.$store.dispatch('global/setCloseAll', '待机')
      this.locationName = ''

      setTimeout(()=>{
      if (this.robotOpen == 1) {
        this.logoutCar()
      }
      this.carrierSelected = this.carrierArr[this.carrierIndex]
      console.log('查看选中机器人',this.carrierSelected)
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
    },1000)
    },
    //切换隧道
    areaId() {
      this.$store.dispatch('global/setCloseAll', '待机')
      setTimeout(() => {

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
    }, 1000);


    }
  },

  methods: {
    async init() {
      //机器人列表
      this.locationName = ''
      const robotInfo = await getCarrierListByAreaId(this.areaId)
      this.carrierArr = robotInfo.data //机器人的集合
      getVoiceNoPageList().then((res)=>{
        this.radioList = res.data
      })
      if (this.carrierArr.length == 0) {
        this.carrierSelected = null
      } else {
        this.carrierIndex = 0 //数组长度
        this.carrierSelected = robotInfo.data[this.carrierIndex]
        this.carrierSelected.CarrierAccessoryList.forEach((res) => {
          this.currentAdvices.push(res)
        })

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
              // getTemperature(param).then((res) => {
              //   if (res.code == 20000 && res.data != '') {
              //     this.tempicture = res.data + '℃'
              //   }
              //   getHot()
              //   setTimeout(() => {
              //     this.tempicture = null
              //   }, 10000)
              // })
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
      this.areaName= []
      getPatrolPointListByAreaId(this.carrierSelected.AreaID).then((res) => {
        // console.log('获取巡检点',res,this.carrierSelected.AreaID)
        if (res.data[0] !== undefined) {
          res.data.forEach((element)=>{
            this.areaName.push(
            {
              areaName:element.mapDisplayName,
             locationID:element.locationID
            }
            )
          })
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
        if(typeof (this.carID) != 'number'){
          return
        }
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
      this.alarmList = []
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
      this.butteryInfo = buttery.data
      let robot = document.getElementById('robot')
      //动态移动
      let areaImage = document.getElementById('areaImage')
      let container = document.querySelector('.image-container')
      let containerWidth = container.offsetWidth
          if (res.code == '20000') {
        this.carList = res.data || [];
        this.offset = Math.floor(this.carList.x / 200)
        // this.offset = this.offset +50
         if (this.offset >= 1 && this.carList.pileNumber === null ) {
         //1587 对应的参数是 地图的总长，需做相应的修改
          areaImage.style.width = 1600 + "px"
          console.log('查看数据偏移量',this.offset,container.offsetWidth)
          if(this.offset < containerWidth){
            container.scrollLeft = 0
            const left = (93/containerWidth) * this.offset
            robot.style.left = left * 0.95  + '%'
          }
          else if (this.offset > containerWidth * 2&& this.offset > containerWidth*2 ){
            if((this.offset - containerWidth*2) > containerWidth){
              this.offset = 0
              return
            }
            container.scrollLeft = containerWidth*2 
            const left = (93/containerWidth)* (this.offset - containerWidth*2)
            robot.style.left = left  * 0.95 + '%'
          }
          else if(this.offset>containerWidth){
             container.scrollLeft = containerWidth
             const left = (93/containerWidth)* (this.offset - containerWidth)
             robot.style.left = left * 0.95 + '%'
          }
          else if ( this.offset == containerWidth || this.offset == containerWidth*2){
            robot.style.transform = 'translateX(0px)'
          }
          // if(this.offset  < container.scrollWidth - container.clientWidth){
          //   setTimeout(() => {
          //     container.scrollLeft = this.offset + 100
          //   }, 0);
          // }
          // else{
          //   setTimeout(() => {
          //     container.scrollLeft = this.offset + 100
          //   }, 0);
          //   const left = (93 / container.clientWidth) * (this.offset -  container.scrollWidth + container.clientWidth)
          //   robot.style.left = left * 0.6 + '%'
          // }
        }
        else{
          areaImage.style.width = 100 + "%"
          const move = (93/1587) * this.offset
          robot.style.left =  move* 0.78 + '%'
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
      if (!this.selectedOption.includes('语音停止播放') && this.selectedOption != '') {
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
      else if (this.selectedOption.includes('语音停止播放')) {
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
      if (this.locationName == '') {
        Notification({
          title: '提示',
          duration: 5000,
          message: '请输入巡检点',
          type: 'error'
        })
      }
      else {
        let params = {
          carrierId: this.carrierSelected.CarrierID,
          patrolPoint: this.locationName,
          count: null,
          voiceBroadcastText: null,
          exit: this.lowButtery,
          speed: 5000,
          speedMode: 2
        }
        moveToPatrolPoint(params).then((res) => {
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
      if (e.AlarmCode == 1014) {
        this.imageUrl = process.env.VUE_APP_BASE_API + '/images/'+ e.Image
      }
      else {
        this.imageUrl = 'http://'+ this.$store.state.global.fileAddress + ':8888/images/' + e.Image
      }
      this.alarm = e
      this.dialogVisible = true

      this.alarm.hasMedia = this.alarmJudge(this.alarm.alarmCode)
      if(this.alarm.hasMedia){
        this.playRecord(e)
      }else {
        this.imageUrl = ''
        this.nvrVideoSrc = ''
      }
    },

    playRecord(row){
      console.log("查看详情数据",row)
      this.nvrVideoSrc = row.id+'.mp4'
      // this.nvrVideoSrc= '/static/video/'+row.id+'.mp4'
      this.$refs.nvrVideo.load()
      this.$forceUpdate()
    },

    //去巡检点的提示
    querySearch(queryString, cb) {
      const results = queryString
        ? this.areaName.filter(
          area => area.areaName.toLowerCase().includes(queryString.toLowerCase())
          )
        : this.areaName;
      setTimeout(() => {
        cb(results);
      }, 200);
    },
    handleSelect(item){
    },
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
      if (!this.selectedOption.includes('语音停止播放')  && this.selectedOption != '') {
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

    closeDetailDialog(){
      this.showImg = true
      console.log("this.showImg ",this.showImg)
      if(this.recordTimer){
        clearInterval(this.recordTimer)
      }
      let rtcURL = window.location.hostname
      // rtcURL = '192.168.20.23'
      this.getPeerConnectionList(rtcURL)
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
::-webkit-scrollbar {
  display: none; /* 隐藏滚动条上的箭头 */
}
.back-shaodow {
  background-color: var(--back-shadow);
  box-shadow: 2px 2px 3px 0px var(--shadow-color);
}

.chamfer {
  background: var(--chamfer-background);
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.2));
}

.page-title {
  line-height: 1.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--font-color);
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
  color: var(--font-color);
}

.content {
  background: transparent;
  font-size: 1.25rem;
  padding-top: 1vh;
  color: var(--font-color);
  >.el-row {
    height: 100%;

    >.el-col {
      height: 100%;
    }
  }


  .broadcastSelect {
    position: absolute;
    top: 9rem;
    border-radius: .625rem;
    padding-bottom: 1rem;
    left: 25.3%;
    background-color: #fff;
    z-index: 999;

    .leftTitle {
      color: var(--font-color);

      padding-right: 2rem;
    }

    // .closeBroad:hover{
    //   background-color: #64C8C8;
    // }

  }

  //机器人信息2.0
  .leftTitle {
    font-size: 1.2rem;
    color: var(--font-color);

    padding: 0.75rem 0 0.75rem 1.25rem;
  }

  .robot {
    height: 27.5rem; //27.5rem
    // min-height: 40.7vh;
    color: var(--font-color);

    .robotMessage {
      display: flex;
      font-size: 1.125rem;

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
      color: var(--font-color);

      .arrow {
        font-size: 3rem;
        color: #64C8C8;
      }

      .arrow:active {
        opacity: 0.5;
      }

      .onLine,.outLine {
        // width: 10rem;
        padding:0 10px;
        background-color: var(--online);
        text-align: center;
        height: 2rem;
        margin-top: 0.5rem;
        line-height: 2rem;
        border: 1px solid #67B3B2;
      }
      .outLine{
        background-color: gray;
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
      color: var(--font-color);
      top: 15.875rem;
      left: 1.8125rem;
      width: 80%;
      margin: auto;
      .el-progress {
        margin-left: 1rem;
      }

      ::v-deep .el-progress__text {
        color: var(--active-color);
        font-size:12px !important;
      }
    }

    .microphone,
    .broadcast {
      position: absolute;
      margin-bottom: 3.125rem;
      top: 16.675rem;
      left: 80%;
      border-radius: 0.625rem;
      font-size: 2.5rem;
      color: #fff;
      width: 3.25rem;
      height: 3.125rem;
      line-height: 3.125rem;
      //background-color: #66B3B2;
      border: 1px solid #66B3B2;
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
      width: 6.5rem;
      text-align: left;
      //left: 20.3%;
      //top: 48%;
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
      color: var(--font-color);
      font-size: 1rem;
      width: 100%;

      ::v-deep .el-input__inner {
        background-color: #fff;
        border: 1px solid #64C8C8;
        color:  #000;
        width: 12rem;
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
        color: var(--font-color);
        margin: 1.125rem 0 0 0.375rem;

      }

      .gasDetail {
        margin: 1rem 0 0 0.75rem;
        width: 3rem;
        word-break: keep-all;
        white-space: nowrap;
        color: var(--active-color);
      }

      div {
        width: 2.5rem;
      }

      .detail_icon {
        margin-left: 0.575rem;
        margin-top: 1.025rem;
        word-break: keep-all;
        color: var(--font-color);
      }

    }
  }

  .alarm_2 {

    .alarm_title {
      width: 97%;
      position: relative;
      display: flex;
      font-size: 1.125rem;
      color: var(--font-color);
      padding: 0.625rem 0 0 1.25rem;

      .chart {
        background-color: #64C8C8;
        color: #fff;
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


      // .first {
      //   background: rgb(254, 0, 0);
      //   border-radius: 0.125rem;
      //   padding: 0.0625rem 0.25rem;
      // }

      // .two {
      //   background: rgb(236, 109, 30);
      //   border-radius: 0.125rem;
      //   padding: 0.0625rem 0.25rem;
      // }

      // .three {
      //   background: rgb(215, 146, 102);
      //   border-radius: 0.125rem;
      //   padding: 0.0625rem 0.25rem;
      // }

      // .four {
      //   background: rgb(100, 229, 238);
      //   border-radius: 0.125rem;
      //   padding: 0.0625rem 0.25rem;
      // }
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
    .image-container {
      width: 100%;
      height: 8.5rem;
      overflow-x: scroll;
      scroll-behavior: smooth; /* 添加平滑滚动效果 */
      scrollbar-width: none;
      /* hide scrollbar for Firefox */
      -ms-overflow-style: none;
      /* hide scrollbar for IE and Edge */
    }

    .image-container::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .image-container::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    .image-container::-webkit-scrollbar-track {
      background-color: transparent;
    }

    .backgroundIm {
      width: 100% ;//1587
      height: 8.2rem;
      border: transparent;
      position: relative;
      opacity: 1;
      object-fit: fill;
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
        width: 8rem;
        min-width: 8rem;

        ::v-deep .el-input__inner {
          //padding-left: 3.25rem;
          background-color: #FFFFFF;
        }
      }

      ::v-deep .el-input__inner {
        background-color: rgba($color: #071828, $alpha: 1);
        height: 1.875rem;
        font-size: 1rem;
      }
      ::v-deep .el-input__prefix{
        font-size: 1rem;
      }
      .el-select {
        width: 9.5rem;
        min-width: 6.875rem;
        margin: 0 0.625rem;
      }

      .goYes {
        cursor: pointer;
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

  .el-autocomplete {
    ::v-deep .el-input__inner{
      color: #000;
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
    color:var(--font-color);
  }

  .hkControl {
    width: 100%;
    //border-radius: 0.625rem;
    margin: 0 0 0.875rem 0;
    color: var(--font-color);
    height: 13.5rem;

    border: 0.0625rem solid transparent;

    .leftTitle {
      padding-top: 0;
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
    display:block;
    color: #000000;
    margin: 1rem 1.25rem;


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
    color: var(--font-color);
    height: 8.5rem;
    border: 0.0625rem solid transparent;
    position: relative;

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
      border: 1px solid #64c8c8;
      border-radius: 5px;
      background-color: #64C8C8;
      text-align: center;
      margin: auto;
      opacity: 0.5;
      color: #fff;
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
.image-slot{
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.nvrRecord{
  background-color: #000000;
  border: none;
  display: inline-block;
}

</style>
