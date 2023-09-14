<template>
  <div class="screen">
    <div class="content" v-loading="loading">
      <div style="height: 6rem;margin-bottom: 1rem;background-color: transparent;display: flex;position: relative;justify-content: center;">
        <div style="position: absolute;left: 0;">
          <el-select v-model="choosedArea" placeholder="请选择" style="width: 8rem;margin: 3rem 3rem;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <h1 style="color: white;" class="screenTitle">应急巡检机器人管理系统</h1>
        </div>
        <div style="position: absolute;right: 0;top: 2rem">
          <div >
            <span style="color: white;font-size: 0.8rem;">{{ this.$store.getters.account }}，您好</span>
          </div>
          <div style="display: flex;margin-right: 2rem;align-items: center;">
            <Clock style="color: #5ea19f;margin-right: 1rem;font-size: 1.5rem"></Clock>
            <span  @click="$router.push('/dashboard/monitor')"><svg-icon icon-class="exit" style="width: 2rem;margin: auto"/></span>
          </div>
        </div>
      </div>
      <el-col :span="6">
        <!--隧道环境信息-->
        <div style="margin-bottom: 0.5rem">
          <div class="enviroment back-shaodow threeRow" style="height: 9rem">
            <div class="leftTitle" style="padding-bottom: 0;display: flex">
              <div style="z-index: 10;margin-left: 0.5rem">环境信息</div>
              <div style="display: flex;position: absolute;margin-top: 0.7rem;z-index: 9">
                <div style="width: 13rem;height: 0.7rem;background: linear-gradient(270deg,#092b2e, #2c9ea9);transform: skewX(45deg);"></div>
                <div style="width: 0.5rem;height: 0.7rem;opacity: 0.5;background: linear-gradient(270deg,rgba(44,156,167,0.49), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
                <div style="width: 0.5rem;height: 0.7rem;opacity: 0.3;background: linear-gradient(270deg,rgba(44,156,167,0.21), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
              </div>
            </div>
            <div style="display:flex">
              <div class="enviroDetail">
                <div class="detail_icon">
                  <svg-icon icon-class="tempicture" style="font-size:1.25rem;margin-left: 0.5rem;"></svg-icon>
                  <div style="color:#0FB1CBFF;width: 3rem">温度</div>
                </div>
                <div class="gasDetail" style="margin-left: 0.7rem;">
                  {{ isNaN(gasList.Temperature) ?   '0': parseFloat((gasList.Temperature / 100).toFixed(1))}}℃
                </div>
              </div>
              <div class="enviroDetail">
                <div class="detail_icon">
                  <svg-icon icon-class="shidu" style="font-size:1.25rem;margin-left: 0.5rem;"></svg-icon>
                  <div style="color:#0FB1CBFF;width: 3rem">湿度</div>
                </div>
                <div class="gasDetail" style="margin-left: 0.7rem;">
                  {{ isNaN( gasList.Humidity) ? '0' : (gasList.Humidity / 100).toFixed(1) }}
                  <span style="font-size: 0.625rem;">%</span>
                </div>
              </div>
              <div class="enviroDetail">
                <div class="detail_icon">
                  <svg-icon icon-class="fog" style="font-size:1.25rem;margin-left: 0.5rem;"></svg-icon>
                  <div style="color:#0FB1CBFF;width: 3rem">烟雾</div>
                </div>
                <div class="gasDetail" style="margin-left: 0.7rem;">
                  {{ gasList.Smoke == null ? '0' : (gasList.Smoke / 100).toFixed(1) }}
                  <span style="font-size: 0.625rem;">ppm</span>
                </div>
              </div>
            </div>
            <div style="display:flex;margin-top: 0.325rem;">
              <div class="enviroDetail">
<!--                <div style="color:#0FB1CBFF;margin: 1rem 0 0 0.375rem;width: 3.5rem">H₂S<br>硫化氢</div>-->
                <div style="color:#0FB1CBFF;margin-left:0.375rem;width: 3.5rem"><br>硫化氢</div>
                <div class="gasDetail">
                  {{ gasList.H2S == null ? '0' : (gasList.H2S / 100).toFixed(1) }}
                  <span style="font-size: 0.625rem;">ppm</span>
                </div>
              </div>
              <div class="enviroDetail">
                <div style="color:#0FB1CBFF;margin-left:0.375rem;width: 3.5rem"><br>一氧化碳</div>
                <div class="gasDetail">
                  {{ gasList.CO == null ? '0' : (gasList.CO / 100).toFixed(1) }}
                  <span style="font-size: 0.625rem;">ppm</span>
                </div>
              </div>
              <div class="enviroDetail">
                <div style="color:#0FB1CBFF;margin: 1.5rem 0 0 0.375rem;width: 3.5rem">甲烷</div>
                <div class="gasDetail">
                  {{ gasList.CH4 == null ? '0' : (gasList.CH4 / 100).toFixed(1) }}
                  <span style="font-size: 0.625rem;">ppm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--机器人信息-->
        <div style="margin-bottom: 0.5rem">

          <div class="robot back-shaodow">
            <div class="leftTitle" style="display:flex">
              <div style="z-index: 10;margin-left: 0.5rem;width: 100%">
                机器人信息
                <div style="color:#67B3B2;display: inline-block;z-index: 10;" v-if="butteryInfo">
                  <svg-icon icon-class="battery" style="font-size:1.25rem;margin-left: 0.5rem;"></svg-icon>{{ butteryInfo }}
                </div>
                <div style="float: right;z-index: 10;margin-right: 3rem">
                  <span style="color: #0fa3bd;font-size: 0.8rem">控制</span>
                  <el-switch v-model="controlManager" :active-value=false :inactive-value=true ></el-switch>
                </div>
              </div>
              <div style="display: flex;position: absolute;margin-top: 0.7rem;z-index: 9">
                <div style="width: 13rem;height: 0.7rem;background: linear-gradient(270deg,#092b2e, #2c9ea9);transform: skewX(45deg);"></div>
                <div style="width: 0.5rem;height: 0.7rem;opacity: 0.5;background: linear-gradient(270deg,rgba(44,156,167,0.49), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
                <div style="width: 0.5rem;height: 0.7rem;opacity: 0.3;background: linear-gradient(270deg,rgba(44,156,167,0.21), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
              </div>
            </div>

            <div style="display:flex;position: relative">
              <div style="display: inline-block;position: relative">
                <div>
                  <img src="../../assets/img/robot.png" class="robotPic">
                </div>
                <div class="robotEletri">
                  <div style="display:flex;">
                    <i class="el-icon-caret-left arrow" @click="changeRobotLeft"></i>
                    <div class="onLine">{{ carrierName }} ({{ carList.inSystem ? '在线' : '离线' }})</div>
                    <i class="el-icon-caret-right arrow" @click="changeRobotRight"></i>
                  </div>
                </div>
              </div>

              <div style="display: inline-block;position: relative;margin-top: 1rem;">
                <div style="display: flex;position: relative;margin: -1.5rem 0 0 1rem;justify-items: center;align-items: flex-end;">

                  <div class="runtimeinfo-first">
                    <div style="font-size: 0.8rem;color: #0FB1CBFF;white-space: nowrap;">运行里程</div>
                    <div style="margin-top: 0.5rem;white-space: nowrap;">
                      {{carList.totalDistance == null?'0':(carList.totalDistance/100000).toFixed(2) }} Km
                    </div>
                  </div>

                  <div class="runtimeinfo-second">
                    <div style="font-size: 0.8rem;color: #0FB1CBFF;white-space: nowrap;">运行时间</div>
                    <div style="margin-top: 0.5rem;white-space: nowrap;">
                      {{carList.totalRunTime == null?'0': (carList.totalRunTime/1440).toFixed(1) }} Day
                    </div>
                  </div>
                </div>

                <div style="display: flex;position: relative;margin: 0.5rem 0 0 1rem;justify-items: center">
                  <div class="runtimeinfo-third">
                    <div style="font-size: 0.8rem;color: #0FB1CBFF;white-space: nowrap;">当前速度</div>
                    <div style="margin-top: 0.5rem;white-space: nowrap;">
                      {{ carList.realTimeSpeed == null ? '0' : (carList.realTimeSpeed/1000).toFixed(1) }} m/s
                    </div>
                  </div>

                  <div class="electri">
                    <div style="font-size: 0.8rem;color: #0FB1CBFF;white-space: nowrap;">剩余电量</div>
                    <el-progress :width="40" text-color="#fbf9ea" type="circle" style="margin-top: 0.2rem"
                                 :percentage="carList.batteryLevel"></el-progress>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>

        <div class="back-shaodow" style="height: 13rem; margin-bottom: 0.5rem;width: auto">
          <div class="leftTitle" style="white-space: nowrap;display: flex">
            <div style="z-index: 10;margin-left: 0.5rem;width: 100%;">告警数据统计
              <div style="float: right;margin-right: 3rem;z-index: 10">
                <span :class="{buttonInactive:alarmSumButtonActive !== 'day',buttonActive:alarmSumButtonActive === 'day'}"  style="cursor: pointer;font-size: 0.8rem" @click="alarmSumButton('day')">今日</span>
                <span style="color:#67B3B2"> | </span>
                <span :class="{buttonInactive:alarmSumButtonActive !== 'week',buttonActive:alarmSumButtonActive === 'week'}" style="cursor: pointer;font-size: 0.8rem"  @click="alarmSumButton('week')">近一周</span>
                <span style="color:#67B3B2"> | </span>
                <span :class="{buttonInactive:alarmSumButtonActive !== 'month',buttonActive:alarmSumButtonActive === 'month'}" style="cursor: pointer;font-size: 0.8rem"  @click="alarmSumButton('month')">近30天</span>
              </div>
            </div>
            <div style="display: flex;position: absolute;margin-top: 0.7rem;z-index: 9">
              <div style="width: 13rem;height: 0.7rem;background: linear-gradient(270deg,#092b2e, #2c9ea9);transform: skewX(45deg);"></div>
              <div style="width: 0.5rem;height: 0.7rem;opacity: 0.5;background: linear-gradient(270deg,rgba(44,156,167,0.49), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
              <div style="width: 0.5rem;height: 0.7rem;opacity: 0.3;background: linear-gradient(270deg,rgba(44,156,167,0.21), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
            </div>
          </div>

<!--            <el-button-group class="title-button-group">-->
<!--              <el-button :class="{buttonInactive:alarmSumButtonActive !== 'day',buttonActive:alarmSumButtonActive === 'day'}" size="mini" round @click="alarmSumButton('day')">今日</el-button>-->
<!--              <el-button :class="{buttonInactive:alarmSumButtonActive !== 'week',buttonActive:alarmSumButtonActive === 'week'}" size="mini" @click="alarmSumButton('week')">近一周</el-button>-->
<!--              <el-button :class="{buttonInactive:alarmSumButtonActive !== 'month',buttonActive:alarmSumButtonActive === 'month'}" size="mini" round @click="alarmSumButton('month')">近30天</el-button>-->
<!--            </el-button-group>-->
          <div style="height: 10rem;">
            <span v-if="alarmSumData.length == 0" style="color: #FFFFFF;position: absolute;margin: 4rem 0 0 12rem;">暂无数据</span>
            <AlarmSumEcharts :hidden="alarmSumData.length == 0" :alarmData="alarmSumData" style="width: 100%;"></AlarmSumEcharts>
          </div>
        </div>

        <div class="back-shaodow" style="height: 14rem;width: auto">
          <div class="leftTitle" style="white-space: nowrap;display: flex;z-index: 20;position: relative;">
            <div style="z-index: 10;margin-left: 0.5rem;width: 100%;">告警数据分析
              <div style="margin-right: 3rem;float: right">
                <span :class="{buttonInactive:alarmAnalysisButtonActive !== 'day',buttonActive:alarmAnalysisButtonActive === 'day'}"  style="cursor: pointer;font-size: 0.8rem" @click="alarmAnalysisButton('day')">今日</span>
                <span style="color:#67B3B2"> | </span>
                <span :class="{buttonInactive:alarmAnalysisButtonActive !== 'week',buttonActive:alarmAnalysisButtonActive === 'week'}" style="cursor: pointer;font-size: 0.8rem"  @click="alarmAnalysisButton('week')">近一周</span>
                <span style="color:#67B3B2"> | </span>
                <span :class="{buttonInactive:alarmAnalysisButtonActive !== 'month',buttonActive:alarmAnalysisButtonActive === 'month'}" style="cursor: pointer;font-size: 0.8rem"  @click="alarmAnalysisButton('month')">近30天</span>
              </div>
            </div>
            <div style="display: flex;position: absolute;margin-top: 0.7rem;z-index: 9">
              <div style="width: 13rem;height: 0.7rem;background: linear-gradient(270deg,#092b2e, #2c9ea9);transform: skewX(45deg);"></div>
              <div style="width: 0.5rem;height: 0.7rem;opacity: 0.5;background: linear-gradient(270deg,rgba(44,156,167,0.49), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
              <div style="width: 0.5rem;height: 0.7rem;opacity: 0.3;background: linear-gradient(270deg,rgba(44,156,167,0.21), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
            </div>
          </div>

          <div style="height: 8rem;">
            <span v-if="alarmAnalData.xAxisData.length == 0" style="color: #FFFFFF;position: absolute;margin: 4rem 0 0 12rem;">暂无数据</span>
            <AlarmAnalysisEcharts :hidden="alarmAnalData.xAxisData.length == 0" :alarmData="alarmAnalData"  style="width: 100%;"></AlarmAnalysisEcharts>
          </div>
        </div>

      </el-col>


      <el-col :span="12">
        <div class="center">
          <div class="video" v-if="currentAdvices.length">
            <!--              :class="[-->
            <!--              currentCamera.accessoryID === currentAdvices.accessoryID-->
            <!--              ? 'active'-->
            <!--              : '', '']"-->
            <iframe
              class="visibleLight"
              :myData="currentAdvices[0]"
              name="visibleLight"
              :id="'visibleLight'"
              :src="currentAdvices[0].src">
            </iframe>

            <el-button style="position:absolute;margin-left: 0; top:7rem;background-color:transparent;border-color: transparent" size="mini"
                       @click="glassCameraSwitch">
              <svg-icon icon-class="cameraSwitch" style="font-size: 2rem"></svg-icon>
            </el-button>
          </div>
        </div>
        <div style="margin: 0.5rem 0.5rem 0;
                position:relative;"
             ref="vue3dLoaderDiv" >

          <vue3dLoader
            style="overflow:hidden;"
            id="vue3dLoader"
            ref="model"
            v-if="vue3dShow"
            :height="vue3dLoaderHeight"
            :width="vue3dLoaderWidth"
            :enableDamping="true"
            :filePath="filePath"
            :mtlPath="mtlPath"
            :scale="scale"
            :backgroundAlpha="1"
            :backgroundColor="'#a0a0a0'"
            outputEncoding="sRGB"
            :dampingFactor="0.05"
            :cameraPosition="cameraPosition"
            :cameraLookAt="cameraLookAt"
            :cameraUp="cameraUp"
            :rotation="rotation"
            :position="position"
            :paralleLoad="true"
          ></vue3dLoader>

          <!--            <div :id="'ht'" ref="htView" style="width:500px;height:500px;"></div>-->
          <div style="position: absolute;top: 0;left: 0;width: 100%;z-index: 889;" :class="{'loaderFSB':loaderFS}">
            <el-button style="position:absolute;margin-left: 0; top:0.5rem;background-color:transparent;border-color: transparent;z-index: 101" size="mini"
                       @click="topVision()">
              <svg-icon icon-class="top-vision" style="font-size: 1.7rem"></svg-icon>
            </el-button>
            <el-button style="position:absolute;margin-left: 0; top:2.5rem;background-color:transparent;border-color: transparent;z-index: 101" size="mini"
                       @click="followAgv()">
              <svg-icon icon-class="follow" style="font-size: 2rem"></svg-icon>
            </el-button>
            <el-button style="margin-top:0.5rem;float: right;background-color:transparent;border-color: transparent;z-index: 101" size="mini"
                       @click="vue3dLoaderFullScreen()">
              <svg-icon icon-class="fullscreen" style="font-size: 1rem"></svg-icon>
            </el-button>
          </div>

<!--          <div style="position: absolute;left:1rem;top:15.5rem">-->
<!--          <span style="font-size: 1rem;padding-top: 0.3rem;">{{ carrierName }}当前位置：{{ carList.pileNumber == null ?-->
<!--            (isNaN(carList.x) ? '未知' : carList.x / 1000) :-->
<!--            '站点' + carList.pileNumber-->
<!--            }}</span>-->
<!--          </div>-->

<!--          <div style="position:absolute;left:21rem; top:15.5rem;">-->
<!--            <div style="margin-left: 1.3rem">-->
<!--              <Intercom></Intercom>-->
<!--            </div>-->
<!--            <div style="color: white;margin-top: 0.6rem">语音对讲</div>-->
<!--          </div>-->
<!--          <div style="position:absolute;left:27rem; top:15.5rem;">-->
<!--            <div style="margin-left: 0.8rem">-->
<!--              <i class="el-icon-turn-off" style="color:white;font-size: 3rem" v-if="controlManager" @click="()=>{controlManager = false}"></i>-->
<!--              <i class="el-icon-open" style="color:#64c8c8;font-size: 3rem" v-if="!controlManager" @click="()=>{controlManager = true}"></i>-->
<!--            </div>-->
<!--            <div style="color: white;">控制管理</div>-->
<!--          </div>-->
          <div style="position:relative;" v-if="!controlManager">
            <div class="button-box" v-drag draggable="false">
              <div class="hkControl back-shaodow" style="width: 54rem;height: 12rem;display: flex;">
                <div style="margin:1rem">
                  <div>
                    <svg-icon icon-class="mark" style="width: 1rem;margin: auto"/>
                    <span style="font-size: 0.8rem;color: #0cbebd">运动模式：</span>
                    <el-radio-group v-model="robotOpen" :disabled="!carID" @input="setOpen(robotOpen)">
                      <el-radio style="margin-left:1rem;color: white" :label=2>自动模式</el-radio>
                      <el-radio style="margin-left:1rem;color: white" :label=1>手动模式</el-radio>
                    </el-radio-group>
                  </div>

                  <div style="margin-top:0.5rem">
                    <svg-icon icon-class="voice" style="width: 1rem;margin: auto"/>
                    <span style="font-size: 0.8rem;color: #0cbebd">语音对讲：</span>
                    <Intercom ref="closeIntercom" hidden="hidden" :key="carID" :hkPlugin="hkPlugin" :carID="carID" :intercomControl="intercomControl"></Intercom>
                    <el-switch v-model="intercomControl" :active-value=true :inactive-value=false style="margin-left: 0.5rem"></el-switch>

                    <span style="font-size: 0.8rem;margin-left: 4rem;color: #0cbebd">
                      <svg-icon icon-class="warnLight2" style="width: 1.5rem;"/>
                      设备警灯：
                    </span>
                    <el-switch style="margin-left: 0.5rem" v-model="warnLightOpen" :active-value=1 :inactive-value=0 @change="setWarnLight"></el-switch>
                  </div>

                  <div style="margin-top:1rem;display: flex;align-items: center">
                    <svg-icon icon-class="broadcast2" style="width: 1rem;margin-right:0.3rem"/>
                    <span style="font-size: 0.8rem;color: #0cbebd">语音播报：</span>
                    <el-select v-model="broadcastSelect" placeholder="请选择" style="width: 22rem;" @input="broadcast(broadcastSelect)">
                      <el-option
                        v-for="item in broadcastList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>

                  </div>

                  <div style="margin-top:1rem;display: flex;align-items: center">
                    <svg-icon icon-class="p" style="width: 0.8rem;margin: auto"/>
                    <span style="font-size: 0.8rem;color: #0cbebd;width: 4rem;margin-left: 0.5rem">定点移动：</span>
                    <div @click="locationInput">
                      <el-input ref="locationIdInput" type="text" class="location_Detail" style="width: 10rem;" v-model="locationID" @input="$forceUpdate()" placeholder="K100+90">
                        <template slot="prefix">K</template>
                      </el-input>
                    </div>
                    <el-select v-model="riskSpeed" style="width: 10rem;margin-left: 1rem">
                      <el-option v-for="item in speedList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>

                      <el-popconfirm title="确定去往巡检点?" @confirm="goLocation">
                        <div class="goYes" slot="reference">
                          <el-button size="mini" style="margin-left: 1rem">确定
                          </el-button>
                        </div>
                      </el-popconfirm>

                  </div>

                </div>
                <div style="margin:5rem 1rem">

                  <div style="display:flex;margin: 1rem 0">
                    <div class="robotMoveDirect" @mousedown="setRobotMoveCrl(2)" @mouseup="setRobotMoveCrl(3)">
                      <svg-icon icon-class="go" style="width: 3rem;height:2rem;margin: auto;rotate: 180deg"/>
                    </div>
                    <el-select v-model="commandRiskSpeed" style="width: 7rem;margin:0 0.5rem 0 2rem">
                      <el-option v-for="item in speedList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <div class="robotMoveDirect" @mousedown="setRobotMoveCrl(1)" @mouseup="setRobotMoveCrl(3)">
                      <svg-icon icon-class="go" style="width: 3rem;height:2rem;margin: auto"/>
                    </div>
                  </div>

                  <div style="margin:1rem 0 0 1.5rem;font-size: 0.8rem;display: flex">
                    <span >后退</span>
                    <span style="margin: 0 4.5em">推荐速度</span>
                    <span >前进</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </el-col>

      <el-col :span="6">
        <div class="right">
          <iframe
            :myData="currentAdvices[1]"
            style="width:100%; height:20.5rem; border: none; "
            name="infrared"
            :id="'infrared'"
            :src="currentAdvices[1].src">
          </iframe>
          <div class="tempicture" id="tempicture" >
            <i v-if="tempictureShow">{{ tempicture }}</i>
          </div>
          <div class="tempicture" id="tempoint" >
            <i v-if="tempictureShow" style="color: #FFFFFF">+</i>
          </div>

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
          <el-radio label="前方拥堵，请注意减速"></el-radio><br>-
          <el-radio label="道路湿滑，请谨慎驾驶"></el-radio><br>
        </el-radio-group>
        <div class="broadcastBtn">
          <el-button type="primary" style="background-color:#64C8C8 ;" size="mini" @click="broadcast()">确 定</el-button>
        </div>
      </div>

      <el-dialog :visible.sync="lowButtery" title="低电量提示" width="30%">
        <span style="font-size:1.5rem ;">机器人低电量,确定启动该任务吗? </span>
        <span slot="footer">
            <el-button size="mini" type="info" style="background-color: #FFFFFF;color: #000000" @click="lowButtery = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="goLocationLowButtery()">确 定</el-button>
          </span>
      </el-dialog>
      <el-dialog :visible.sync="locationAuto" :show-close="false" :close-on-click-modal="false" title="操作提示" width="30%">
        <span style="font-size:1.5rem ;">已到达巡检点{{locationID}}，是否手动操作机器人</span>
        <span slot="footer">
            <el-button size="mini" type="info" style="background-color: #FFFFFF;color: #000000" @click="cancelLocation()">否</el-button>
            <el-button size="mini" type="primary" @click="openLocation()">是</el-button>
          </span>
      </el-dialog>
      <!--      </el-row>-->

      <!--      <el-row :gutter="10">-->
      <el-col :span="6">
        <div class="alarm-list back-shaodow">
          <div class="leftTitle" style="padding-top: 0.5rem;padding-bottom: 0.5rem;display: flex">
            <div style="z-index: 10;margin-left: 0.5rem;width: 100%;">
              告警列表
              <div style="float:right;color:#64c8c8;margin-right: 2rem;cursor: pointer" @click="goRealAlarm()">更多》</div>
            </div>
            <div style="display: flex;position: absolute;margin-top: 0.7rem;z-index: 9">
              <div style="width: 13rem;height: 0.7rem;background: linear-gradient(270deg,#092b2e, #2c9ea9);transform: skewX(45deg);"></div>
              <div style="width: 0.5rem;height: 0.7rem;opacity: 0.5;background: linear-gradient(270deg,rgba(44,156,167,0.49), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
              <div style="width: 0.5rem;height: 0.7rem;opacity: 0.3;background: linear-gradient(270deg,rgba(44,156,167,0.21), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
            </div>
          </div>

          <div class="alarm">
            <div class="myTable">
              <el-table :data="showTable" @row-click="(e)=>getDetailMessage(e,true)" style="width: 100%;" height="10rem">
                <el-table-column width="55" label="序号" type="index" align="center">
                </el-table-column>
                <!--                  <el-table-column prop="AlarmCode" :label="'告警码'" width="80" align="center">-->
                <!--                  </el-table-column>-->
                <el-table-column width="150" prop="ReportTime" label="时间" align="center">
                </el-table-column>
                <el-table-column width="120" prop="AlarmName" label="事件类型" align="center">
<!--                  <template slot-scope="scope">-->
<!--                    {{ scope.row.AlarmName.slice(0, -2) }}-->
<!--                  </template>-->
                </el-table-column>
                <el-table-column prop="MaxLevel" width="90" :label="'告警等级'" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.MaxLevel != undefined && scope.row.MaxLevel === 4" class="first">致命</span>
                    <span v-else-if="scope.row.MaxLevel != undefined && scope.row.MaxLevel === 3" class="two">严重</span>
                    <span v-else-if="scope.row.MaxLevel != undefined && scope.row.MaxLevel === 2" class="three">一般</span>
                    <span v-else class="four">提示</span>

                    <!-- {{ scope.row.MaxLevel ==0?'默认':scope.row.MaxLevel ==1?'提示':scope.row.MaxLevel ==2?'一般':scope.row.MaxLevel ==3?'严重':'致命' }} -->
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="CarrierName" :label="$t('alarm_dealWith.machine_name_label')">
                          </el-table-column>
                           <el-table-column prop="EquipmentName" :label="$t('alarm_dealWith.equipment_name_label')">
                           </el-table-column> -->
                <!--                  <el-table-column prop="ReportTime" :label="$t('alarm_dealWith.happen_time')" align="center">-->
                <!--                  </el-table-column>-->
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
                    告警类型：{{ this.alarmJudge(alarm.AlarmCode) }} </div>
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

          <div class="leftTitle" style="display:flex;padding-top: 0.5rem;padding-bottom: 0.5rem;">
            <div style="z-index: 10;margin-left: 0.5rem">告警信息</div>
            <div style="display: flex;position: absolute;margin-top: 0.7rem;z-index: 9">
              <div style="width: 13rem;height: 0.7rem;background: linear-gradient(270deg,#092b2e, #2c9ea9);transform: skewX(45deg);"></div>
              <div style="width: 0.5rem;height: 0.7rem;opacity: 0.5;background: linear-gradient(270deg,rgba(44,156,167,0.49), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
              <div style="width: 0.5rem;height: 0.7rem;opacity: 0.3;background: linear-gradient(270deg,rgba(44,156,167,0.21), #23757d);transform: skewX(45deg);margin-left: 0.3rem"></div>
            </div>
          </div>

          <div style="display:flex;">
            <!--              <img :src="imageUrl" alt="" style="width:70%">-->
            <div style="margin:0 1.0rem">
              <div style="width: 23rem; height: 2rem;
                    color: red;
                    display: flex;
                    justify-content:center;
                    align-items:center;
                    font-weight: bold;">
                <div>
                  {{this.alarmJudge(alarm.AlarmCode)}}
                </div>
              </div>

              <div style="margin: 0.5rem 0 0 0;vertical-align:top;" >
                <div style="color:#0FB0CAFF;font-size: 15px">
                  <i class="el-icon-time" style="margin-right: 0.5rem"></i>告警时间：
                  <span style="color: #FFFFFF">{{ alarm.ReportTime }}</span>
                </div>
              </div>
              <div style="margin: 1rem 0 0 0; vertical-align:top;">
                <div style="color:#0FB0CAFF;font-size: 15px">
                  <i class="el-icon-location" style="margin-right: 0.5rem"></i>告警位置：
                  <span style="color: #FFFFFF">{{ alarm.Location }}</span>
                </div>
              </div>
              <div style="margin: 1rem 0 0 0;">
                <div style="color:#0FB0CAFF;font-size: 15px">
                  <i class="el-icon-document" style="margin-right: 0.5rem"></i>告警描述：
                  <span style="color: #FFFFFF">{{ alarm.Description }}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </el-col>
    </div>
    <WebSocket></WebSocket>
  </div>
</template>

<script>
import { Notification, Loading } from 'element-ui';
import { getCurrentAlarmRecordList } from '../../api/inspectRecord';
import { mapGetters, mapState } from 'vuex';
import { GetRealPatrolTaskByCarrierId, cancelPatrolTask } from '@/api/inspectRecord';
import { getSystemXmlConfig } from '../../api/sysCtrl';
import {
  getCarrierDetailInfo, getPatrolPointListByAreaId
} from '../../api/map';
import { debounce } from '../../utils/debounce';
import {
  getEquipmentList,
  SetSpeed,
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
  connectCar,
  moveCar,
  stopCar,
  CancelCarrierControl,
  getTemperature,
  startVoiceBroadcast,
  stopVoiceBroadcast,
  getCarrierListByAreaId,
  getRtsp,
  getTaskRemainingMileage,
  startWarningLight,
  stopWarningLight
} from '../../api/robot'
import { getAllPatrolPlan, startPatrolPlan } from '../../api/taskConfig';
import {
  StartLight, EndLight, StartWiper, EndWiper, startPanLeft, endPanLeft, startPanRight, endPanRight, startTiltUp, endTiltUp, startTiltDown, endTiltDown,
  StartZoomIn, StartZoomOut, EndZoomIn, EndZoomOut, StartIrisOpen, EndIrisOpen, StartIrisClose, EndIrisClose, StartFocusFar, EndFocusFar, StartFocusNear, EndFocusNear, takePhoto, startRecord, endRecord
} from '../../api/dashboard';
import Intercom from './intercom.vue';
import { clearInterval } from 'timers';
import { async } from 'q';
import { type } from 'os';

import { vue3dLoader } from "vue-3d-loader"
import AlarmSumEcharts from '@/views/dashboard/echarts/AlarmSumEcharts.vue'
import AlarmAnalysisEcharts from '@/views/dashboard/echarts/AlarmAnalysisEcharts.vue'
import controlSwitch from '@/views/monitor/controlSwitch.vue'
import moment from 'moment'
import { getCountByCode, getCountByDate, getCountByLevelAndStatus } from '@/api/homepageAlarm'
import Clock from '@/layout/components/Sidebar/Clock.vue'
import WebSocket from '@/components/WebSocket/index.vue'
import { getExistCarrierAreaList } from '@/api/areaConfig'

export default {
  components: {
    WebSocket,
    Clock,
    controlSwitch,
    AlarmAnalysisEcharts,
    AlarmSumEcharts,
    Intercom,
    vue3dLoader,
  },
  data() {
    return {
      //模型路径 存放在/public/static/model/
      filePath: [],
      // filePath: ["/static/model/screen.glb","/static/model/robot.glb"],
      // mtlPath: ["","/static/model/plane.mtl"],
      mtlPath: ["",""],
      //模型比例缩放
      // scale:[{x:1,y:1,z:1},{x:0.2,y:0.2,z:0.2}],
      scale:[{x:1,y:1,z:1},{x:1,y:1,z:1}],
      //相机视角 位置/角度
      cameraPosition: {x:5,y:15,z:0},
      // cameraPosition: {x:4,y:1,z:4.5},
      // cameraRotation: {x:0,y:Math.PI/2,z:0},
      cameraRotation: {x:0,y:0,z:0},
      cameraFollow: true,
      cameraLookAt: {x:0,y:0,z:0},
      cameraUp: {x:0,y:1,z:0},
      controlsOptions: {target:{x:0,y:0,z:0}},
      //模型 位置/角度
      position: [{x:0,y:0,z:0},{x:3,y:2.5,z:3.5}],
      rotation: [{x:0,y:Math.PI,z:0},{x:0,y:Math.PI/2,z:0}],
      // rotation: [{x:0,y:Math.PI,z:0},{x:0,y:0,z:0}],
      //机器人移动锁和方向
      agvMoveLock: false,
      agvDirection: true,
      alarmSumButtonActive: 'day',
      alarmAnalysisButtonActive: 'day',
      alarmSumRequest: true,
      alarmAnalysisRequest : true,
      controlManager: true,
      vue3dLoaderHeight: 275,
      vue3dLoaderWidth: 943,
      vue3dShow:false,
      loaderFS: false,
      alarmAnalData: {
        xAxisData: [],
        legendData: [],
        seriesData: []
      },
      alarmSumData: [],
      tempicture: null,
      tempictureShow: false,
      tempicTimer: null,
      glassCamera: false,
      glassCameraBak: "",
      dataModel: null,
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
      timeInte: null,
      dialogVisible: false,
      imageUrl: null,
      alarm: [],
      videoOn: false,
      lightOn: false,
      YTlogin: false,
      HKloading: false,
      moveMode: 2,
      intercomControl: false,
      warnLightOpen: 0,
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
        value: 8000,
        label: "应急速度"
      }, {
        value: 1000,
        label: "巡检速度"
      }],
      riskSpeed: 1000,
      commandRiskSpeed: 1000,
      speedMode:1,
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
      moveSet: null,
      loading:false,
      // batteryLevelColors: [
      //   {color: '#ff0000', percentage: 20},
      //   {color: '#e6a23c', percentage: 50},
      //   {color: '#1989fa', percentage: 99},
      //   {color: '#5cb87a', percentage: 100},
      // ],
      options: [],
      choosedArea: '',

      broadcastList: [{
        key:1,
        value:'语音停止播放',
        label:'语音停止播放'
      },{
        key:2,
        value:'前方事故，请注意绕行',
        label:'前方事故，请注意绕行'
      },{
        key:3,
        value:'道路路滑，请谨慎驾驶',
        label:'道路路滑，请谨慎驾驶'
      },{
        key:4,
        value:'路面异物，请谨慎驾驶',
        label:'路面异物，请谨慎驾驶'
      }],
      broadcastSelect: '语音停止播放'
    };
  },
  created() {
    // this.init()
  },


  async mounted() {
    try {
      await this.AreaSwap()
      await this.init()
      await this.getSysConfig()
      // await this.getAdvices()
      await this.getVideo()
      await this.lazyLoad()
      await this.getCarTask()
      await this.getCarList()
      await this.getAlarmList()
      await this.alarmSumButton('day')
      await this.alarmAnalysisButton('day')
    } catch (error) {
      console.log(error);
    }
    this.beforeunloadHandler()
    if (this.dialogLocationBoolen.includes('机器人到达巡检点')) {
      this.locationAuto = true
    }
    this.carRoller = setInterval(() => {
      this.getCarList()
    }, 1000)

    this.judgeIsFullScreen()
    // this.initHT();
  },

  beforeDestroy() {
    this.HKlogout()
    this.broadcast('语音停止播放')
    this.stopWarn()
    // console.log('beforeDestroy this.warnLightOpen',this.warnLightOpen)
    // if(this.warnLightOpen == 1){
    //   this.setWarnLight(0)
    // }
    // console.log(this.robotOpen == 1)
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
      'closeAll', 'closeBroadcast','closeWarnL', 'dealwithAlarm', 'areaId']),
    realTimeAlarminfo() {
      return this.realTimeAlarm[0]
    },
    yuntaiInfo() {
      return this.cameraOut
    },
    // standby(){
    //   return this.closeAll
    // },
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
    }
  },

  watch: {
    // filterText(val) {
    //   this.$refs.tree.filter(val);
    // },
    realTimeAlarminfo(newV, oldV) {
      // if(newv != undefined){
      //   this.showTable.unshift(newV)
      //   this.getDetailMessage(newV,false)
      //   this.alarmAnalysisButton(this.alarmAnalysisButtonActive)
      //   this.alarmSumButton(this.alarmSumButtonActive)
      // }
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
    // carID() {
    //   return this.carrierSelected.CarrierID
    // },
    riskSpeed(newV, oldV) {
      console.log('速度变化了')
      if (newV == 1000) {
        this.speedMode = 1
      } else {
        this.speedMode = 2
      }
    },
    standby(){
      console.log('触发了')
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
      console.log('关闭语音对讲了', newV)
      this.stopBroadcast()
    },
    closeWarnL(){
      this.stopWarn()
    },
    dealwithAlarm() {
      // this.alarmList = []
      setTimeout(() => {
        this.getAlarmList()
      }, 1000)
    },
    //左右切换机器时的改变
    carrierIndex() {
      console.log('切换机器')

      this.$store.dispatch('global/setCloseAll', '待机')
      setTimeout(()=>{
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
        } else {
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
        console.log("areaId running")
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
        },1000)
    },

    logoutAuto(old) {
      this.remove()
      this.$notify({
        message: '有新用户登录',
        type: 'success',
        title: '提示',
        duration: 1000,
      });
    },
    choosedArea(newV,old){
      this.$store.dispatch('global/setAreaId',newV)
      console.log('区域切换了',newV,this.areaId)
    }
  },

  directives: {
    drag (el) {
      let oDiv = el // 当前元素
      // let self = this // 上下文
      // 禁止选择网页上的文字
      document.onselectstart = function () {
        return false
      }
      oDiv.onmousedown = function (e) {
        // 鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft
        let disY = e.clientY - oDiv.offsetTop
        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          let l = e.clientX - disX
          let t = e.clientY - disY
          // 移动当前元素
          oDiv.style.left = l + 'px'
          oDiv.style.top = t + 'px'
        }
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        }
        // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false
      }
    }
  },

  methods: {
    async init() {
      //机器人列表
      console.log('this.areaId',this.areaId)
      const robotInfo = await getCarrierListByAreaId(this.areaId)
      this.carrierArr = robotInfo.data //机器人的集合
      console.log('robotInfo',robotInfo)
      console.log('this.carrierArr',this.carrierArr)
      if (this.carrierArr.length == 0) {
        this.carrierSelected = null
      } else {
        this.carrierIndex = 0 //数组长度
        this.carrierSelected = robotInfo.data[this.carrierIndex]
        this.carrierSelected.CarrierAccessoryList.forEach((res) => {
          this.currentAdvices.push(res)
        })
      }
      console.log('查看选中机器人', this.carrierSelected)
      if(this.carrierSelected == null){
        return
      }
      this.getAreaName()
      this.carID = this.carrierSelected.CarrierID
      this.carrierName = this.carrierSelected.CarrierName
      this.$store.dispatch('global/getIp', this.carrierSelected.CarrierIP)

      const visibleLight = document.getElementById('visibleLight');
      visibleLight.onload = () => {
        visibleLight.contentDocument.ondblclick = (e) =>{
          visibleLight.classList.toggle("iframe-fullScreen")
        }
        visibleLight.contentDocument.onclick = (e) => {
          // console.log("查看摄像机信息", this.currentAdvices[0].accessoryID)
          this.currentCamera = this.currentAdvices[0]
        }
      };
      const infrared = document.getElementById('infrared');
      infrared.onload = () => {
        infrared.contentDocument.ondblclick=(e)=>{
          infrared.classList.toggle("iframe-fullScreen")
        }
        infrared.contentDocument.onclick = (e) => {
        };

        let clientX = 2
        let clientY = 110
        // let timer
        let that = this
        infrared.contentDocument.onmousemove = (e) => {
          // this.currentCamera = this.currentAdvices[1]
          // console.log('视频宽高', e.clientX,e.clientY)
          // console.log("查看红外信息", this.carrierSelected.CarrierAccessoryList[0].AccessoryID)
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
              // console.log('调用接口参数', param, res)
              if (res.code == 20000 && res.data != '') {
                this.tempicture = res.data + '℃'
                getHot(e)
                setTimeout(()=>{
                  that.tempicture = null
                  that.tempictureShow = false
                },10000)
              }
            })
            const getHot = function (e) {
              let tempictureMove = document.getElementById('tempicture')
              let tempoint = document.getElementById('tempoint')
              const rightMove = e.target.clientWidth - clientX

              if(tempictureMove != null){
                if (clientX > 75) {
                  if(rightMove < 30){
                    tempictureMove.style.right = '30px'
                  }else {
                    tempictureMove.style.right = rightMove - 25 + 'px'
                  }
                }else {
                  tempictureMove.style.right = e.target.clientWidth -  75 + 'px'
                }
                tempictureMove.style.top = clientY - 15 + 'px'


                tempoint.style.right = rightMove + 'px'
                tempoint.style.top = clientY + 'px'

                that.tempictureShow = true
              }

            }
          }, 500);

        };
        infrared.contentDocument.onmouseout = ()=>{
          // console.log('移除')
          window.clearInterval(that.tempicTimer)
          // timer = null
        }

      };

      if(this.choosedArea == 37){
        this.filePath = ["/static/model/screen.glb","/static/model/robot.glb"]
        this.vue3dShow = false
        this.vue3dShow = true
      }else {
        this.filePath = ["/static/model/robot.glb"]
        this.vue3dShow = false
        this.vue3dShow = true
      }


    },

    async AreaSwap(){
      getExistCarrierAreaList().then((res) => {
        console.log('区域',res)
        let accessTypeArr = res.data
        this.choosedArea = accessTypeArr[1].id
        for (let i = 0, len = accessTypeArr.length; i < len; i++) {
          let optionObj = {
            value: accessTypeArr[i].id,
            label: accessTypeArr[i].areaName,
          };
          this.options.push(optionObj);
        }
      })
      this.choosedArea = this.areaId
    },

    vue3dLoaderFullScreen(){
      const vue3dLoader = document.getElementById('vue3dLoader')
      this.loaderFS = vue3dLoader.classList.toggle("iframe-fullScreen")
      if(this.loaderFS){
        this.$nextTick(()=>{
          this.vue3dLoaderWidth = document.documentElement.clientWidth
          this.vue3dLoaderHeight = document.documentElement.clientHeight
        })
      }else {
        this.vue3dLoaderWidth = 943
        this.vue3dLoaderHeight = 275
      }
      this.$refs.model.$forceUpdate()
    },

    judgeIsFullScreen() {
      window.onresize = () => {
        // 可视区域的高度
        // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        // screen是window的属性方法，window.screen可省略window，指的是窗口
        // screen.height == clientHeight
        if(!this.loaderFS){
          this.$nextTick(()=>{
            this.vue3dLoaderWidth = document.documentElement.clientWidth*950/1920
            this.vue3dLoaderHeight = document.documentElement.clientHeight*290/955

            // const menuItems = document.querySelectorAll('.viewer-canvas');
            // console.log('viewer-canvas',menuItems,document.documentElement.clientHeight)
            // menuItems.forEach(menuItem => {
            //   menuItem.style = "height: "+document.documentElement.clientHeight*290/955+"px;width:"+document.documentElement.clientWidth*943/1920+"px;"
            // });
          })
        }else {
          this.$nextTick(()=>{
            this.vue3dLoaderWidth = document.documentElement.clientWidth
            this.vue3dLoaderHeight = document.documentElement.clientHeight
          })
        }

      }
    },

    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.cancelLocation()
          // done();
        })
        .catch(_ => { });
    },

    cancelLocation() {
      CancelCarrierControl(this.carID).then((res) => {
        // console.log('取消回到返回', res)
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
          console.log("开关状态", res)
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
      this.gasList = []
    },
    getAreaName(){
      getPatrolPointListByAreaId( this.carrierSelected.AreaID).then((res)=>{
        if( res.data[0]  !== undefined){
          this.areaName = res.data[0].mapDisplayName
        }else{
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
      // this.carrierSelected = this.carrierArr[this.carrierIndex]
      // this.carID = this.carrierSelected.CarrierID
      // this.carrierName = this.carrierSelected.CarrierName
      // const camera = this.carrierSelected.CarrierAccessoryList[0]
      // if (camera == undefined) {
      //   this.currentAdvices[0].accessoryID = null
      //   this.currentAdvices[0].accessoryType = null
      //   this.currentAdvices[0].configJson = null
      // }
      // else {
      //   this.currentAdvices[0].accessoryID = camera.AccessoryID
      //   this.currentAdvices[0].accessoryType = camera.AccessoryType
      //   this.currentAdvices[0].configJson = JSON.stringify(camera.ConfigJson)
      // }
      // console.log('查左侧',this.currentAdvices[0])
      // this.$store.dispatch('global/getIp', this.carrierSelected.CarrierIP)
      // console.log('选中机器人且更改参数',this.currentAdvices[0])
      // this.getVideo()
    },
    getVideo() {
      let that = this
      setTimeout(() => {
        getRtsp(this.carID).then((res) => {
          that.currentAdvices[0].src = `/static/video.html?data=${res.data.lightRTSP}&serve=${this.webRtcIP}`
          that.currentAdvices[1].src = `/static/video.html?data=${res.data.infraredRTSP}&serve=${this.webRtcIP}`
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
      // this.carrierSelected = this.carrierArr[this.carrierIndex]
      // this.carID = this.carrierSelected.CarrierID
      // this.carrierName = this.carrierSelected.CarrierName
      // const camera = this.carrierSelected.CarrierAccessoryList[0]
      //
      // if (camera == undefined) {
      //   this.currentAdvices[0].accessoryID = null
      //   this.currentAdvices[0].accessoryType = null
      //   this.currentAdvices[0].configJson = null
      // }
      // else {
      //   this.currentAdvices[0].accessoryID = camera.AccessoryID
      //   this.currentAdvices[0].accessoryType = camera.AccessoryType
      //   this.currentAdvices[0].configJson = JSON.stringify(camera.ConfigJson)
      // }
      // console.log('查看右侧',this.currentAdvices[0])
      // this.$store.dispatch('global/getIp', this.carrierSelected.CarrierIP)
      // this.getVideo()
    },
    async getAlarmList() {
      this.alarmList = []
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
      // console.log('实时告警', res)
      if (res.code === 20000) {
        if (res.data) {
          res.data.records.forEach((element,index) => {
            element.index = index + 1
            this.alarmList.push(element)
          });
          if(this.alarmList.length > 0){
            this.alarm = this.alarmList[0]
          }
          // console.log('this.alarmList',this.alarmList)
          // this.alarmList.forEach((item, index) => {
          //   item.index = index + 1;
          // });
        }
      }
    },
    async getCarList() {
      if(this.carrierSelected == null || this.carrierSelected.CarrierID == null ||
        this.carrierSelected.CarrierID == undefined || this.carrierSelected.CarrierID == ''){
        console.log('CarrierID is null')
        return
      }
      const res = await getCarrierDetailInfo(this.carrierSelected.CarrierID);
      const gas = await GetMonitorData()
      const buttery = await getChargingStateByCarrierID(this.carrierSelected.CarrierID)
      // console.log('小车具体速度,总运行时间,',res.data.realTimeSpeed,res.data.totalRunTime)
      this.butteryInfo = buttery.data
      // console.log('气体',gas)
      let robot = document.getElementById('robot')
      // console.log("model----->",this.$refs.model)
      if (res.code === '20000') {
        this.carList = res.data || [];

        // if (this.carList.x >= 1) {
        const left = (93 / 46072) * this.carList.x
        // robot.style.left = left + '%'
        this.moveAgv(left)
        // }

      }
      //气体
      if (gas.code == '20000') {
        this.gasList = gas.data
      }
      const car = await GetRealPatrolTaskByCarrierId(this.carID)
      if (car.data != null) {
        getTaskRemainingMileage(car.data.taskID).then((res)=>{
          const time =  parseFloat((res.data.time / 60).toFixed(1))
          // console.log('查看剩余里程',res.data.mileage,time)
          if (this.carList.realTimeSpeed > 0 && res.data.mileage > 20000) {
            this.finishTime = parseFloat(((res.data.mileage / (this.carList.realTimeSpeed * 60))).toFixed(1)) + time
            this.finishTime = this.finishTime.toFixed(1)
            // console.log('看看时间', typeof this.finishTime ,time)
            if (res.data.mileage = 0) {
              this.finishTime = 0
            }
          }else if (this.carList.realTimeSpeed > 0 &&res.data.mileage < 20000 ){
            this.finishTime = 0.1
          }
        })
        this.realTimeTask = car.data.planName
      }
      else{
        this.finishTime = 0
        this.realTimeTask = ''
      }
    },
    async getCarTask() {
      getAllPatrolPlan({
        keyWord: '',
        planType: 2,
      }).then((res) => {
        // console.log('查看巡检计划',res)
        res.data.forEach(element => {
          // console.log(element.PlanName.includes('巡检点'))
          if (element.IsEnable != 2) {
            this.taskList.push({
              label: element.PlanName,
              value: element.PlanID
            })
          }
        });
        console.log('特殊巡检计划',this.taskList)
        this.loading = false
      })
    },
    beforeunloadHandler(e) {
      window.addEventListener("beforeunload", () => {
        this.$store.dispatch('global/setCloseAll', '待机')
      });
    },
    locationInput(){
      console.log('locationInput')
      this.$refs.locationIdInput.focus()
      this.$forceUpdate()
    },
    broadcast(e) {
      console.log('broadcast e',e)
      this.broadcastVisible = false
      this.selectedOption = e
      if (this.selectedOption != '语音停止播放' && this.selectedOption != '') {
        let params = {
          carrierID: this.carrierSelected.CarrierID,
          text: this.selectedOption
        }
        startVoiceBroadcast({params}).then((res) => {
          if (res.code == 20000) {
            this.broadcasting = true
            Notification({
              title: '提示',
              duration: 5000,
              message: res.data,
              type: 'success'
            })
          } else {
            this.selectedOption = null
            Notification({
              title: '提示',
              duration: 5000,
              message: res.data,
              type: 'error'
            })
          }
        })
      }
      else if (this.selectedOption == '语音停止播放' && this.broadcasting) {
        stopVoiceBroadcast(this.carrierSelected.CarrierID).then((res) => {
          if (res.code == 20000) {
            this.broadcasting = false
            Notification({
              title: '提示',
              duration: 5000,
              message: '语音停止播放',
              type: 'success'
            })
          }else {
            Notification({
              title: '提示',
              duration: 5000,
              message: res.data,
              type: 'error'
            })
          }
        })
      }
    },
    goRealAlarm(){
      this.$router.push('/inspection/realAlarm');
    },

    controlManagerSwitch(data){
      if(data){
        this.controlManager = false
        //TODO 关闭控制弹窗
      }else {
        this.controlManager = true
        //TODO 开启控制弹窗
      }
    },

    setWarnLight(e) {
      console.log('warnLightOpen',this.warnLightOpen,e)
      const time = this.getNowtime()
      if (e == 1) {
        //警示灯closed
        startWarningLight(this.carID).then((res) => {
          if (res.code != 20000) {
            this.warnLightOpen = 0
            Notification({
              title: '提示',
              message: res.data,
              type: 'error',
              duration: 5000
            });
          }
          else{
            this.warnLightOpen = 1
            Notification({
              title: '提示',
              message: res.data,
              type: 'success',
              duration: 5000
            });}
        })
      } else if (e == 0) {
        //警示灯ing
        stopWarningLight(this.carID).then((res) => {
          console.log(res)
          if (res.code != 20000) {
            this.warnLightOpen = 1
            Notification({
              title: '提示',
              message: res.data,
              type: 'error',
              duration: 5000
            });
          }
          else{
            this.warnLightOpen = 0
            Notification({
              title: '提示',
              message: res.data,
              type: 'info',
              duration: 5000
            });
          }
        })

      }
    },

    //TODO 调试代码
    mouseDown (e) { // 鼠标按下时的鼠标所在的X，Y坐标
      this.mouseDownX = e.pageX
      this.mouseDownY = e.pageY
      // 初始位置的X，Y 坐标
      // this.initX = obj.offsetLeft;
      // this.initY = obj.offsetTop;
      console.log('e', e)
      // 表示鼠标已按下
      this.flag = true
    },
    mouseMove (e) {
      if (this.flag) {
        console.log('e :', e)
      }
    },
    // 调试代码 --> end

    // AGV移动方法
    moveAgv(mileage,direct,sp){

      // 判断position里是否存在[1]
      // agv的坐标位置
      let agvPosition = this.position[1] || {}
      let agvRotation = this.rotation[1] || {}

      // agv运行速度 与轨道等比例
      let speed = sp || 0.05
      // agv运行方向
      let direction = direct || false

      // 轨道交点
      let railA = { x:-2.1, y:0, z:-14.5 }
      let railB = { x:-2.1, y:0, z:12.5 }
      let railC = { x:2.7, y:0, z:12.5 }
      let railD = { x:2.7, y:0, z:3.5 }

      let routeA = Math.abs(railA.z - railB.z)
      let routeB = Math.abs(railB.x - railC.x)
      let routeC = Math.abs(railC.z - railD.z)

      let agvMileage = (routeA + routeB + routeC) / 100 * mileage

      // console.log("agvMileage---->",agvMileage)
      // console.log("mileage---->",mileage)
      //
      // console.log("--- carList.vertexNumber --->",this.carList.vertexNumber)
      // console.log("--- carList.x / 1000 --->",this.carList.x / 1000)
      // agvMileage = 15

      // //起始站点为101站点
      // if(agvMileage < routeA){
      //   agvPosition.x = railA.x
      //   agvPosition.z = (agvMileage - Math.abs(railA.z))
      // }else if( agvMileage < (routeA + routeB) ){
      //   agvPosition.x = (agvMileage - routeA) - Math.abs(railB.x)
      //   agvPosition.z = railB.z
      // }else if( agvMileage < (routeA + routeB + routeC)){
      //   agvPosition.x = railC.x
      //   agvPosition.z = Math.abs(railC.z) - (agvMileage - routeA - routeB)
      // }

      //TODO 判断机器人所处站点 流畅移动

      // 设定起始站点为102站
      if(agvMileage < routeC){
        agvPosition.x = railD.x
        agvPosition.y = 2.1
        agvPosition.z = (agvMileage + Math.abs(railD.z))
        agvRotation.y = Math.PI/2
      }else if(agvMileage < (routeC + routeB)){
        agvPosition.x = Math.abs(railC.x) - (agvMileage - routeC)
        if((agvMileage - routeC) < 1.6){
          agvPosition.y = 2.1
        }else if((agvMileage - routeC) < 2.4){
          agvPosition.y = 2.2
        }else if((agvMileage - routeC) < 3.2){
          agvPosition.y = 2.3
        }else {
          agvPosition.y = 2.5
        }
        agvPosition.z = railC.z
        agvRotation.y = 0
      }else if(agvMileage < (routeC + routeB + routeA)){
        agvPosition.x = railB.x
        agvPosition.y = 2.5
        agvPosition.z = Math.abs(railB.z) - (agvMileage - routeC - routeB)
        agvRotation.y = Math.PI/2
      }

      if(this.$refs.model.controls == undefined){
        return
      }
      let lastTarget = this.$refs.model.controls.target
      // console.log("lastTarget---",lastTarget)

      if(this.cameraFollow){
        //判断AGV的坐标没发生改变
        if(lastTarget.x == agvPosition.x &&
          lastTarget.y == agvPosition.y -2 &&
          lastTarget.z == agvPosition.z ){
          // console.log("agv not move, return")
          return
        }

        let incPosition = { x:0, y:0, z:0 }

        incPosition.x = agvPosition.x - lastTarget.x
        incPosition.y = agvPosition.y - lastTarget.y
        incPosition.z = agvPosition.z - lastTarget.z
        // console.log("incPosition---",incPosition)

        this.cameraPosition.x = lastTarget.x + (incPosition.x == 0 ? 0 : (incPosition.x > 0 ? -1.5 : 1.5))
        this.cameraPosition.y = lastTarget.y
        this.cameraPosition.z = lastTarget.z + (incPosition.z == 0 ? 0 : (incPosition.z > 0 ? -1.5 : 1.5))

        this.cameraLookAt.x = agvPosition.x
        this.cameraLookAt.y = agvPosition.y -2
        this.cameraLookAt.z = agvPosition.z

        lastTarget.x = agvPosition.x
        lastTarget.y = agvPosition.y -2
        lastTarget.z = agvPosition.z
        // console.log("controls---",this.$refs.model.controls.target)
      }

      this.$set(this.position,1,agvPosition)
      this.$set(this.rotation,1,agvRotation)

      // //渲染请求
      // requestAnimationFrame(this.moveAgv.bind(this,direct,sp))
    },

    alarmSumButton(data){

      if(!this.alarmSumRequest){
        return
      }
      this.alarmSumRequest = false

      this.alarmSumButtonActive = data

      let amount = 0;
      switch (data) {
        case 'day':{
          amount = 0
          break
        }
        case 'week':{
          amount = 6
          break
        }
        case 'month':{
          amount = 29
          break

        }
      }
      let timeFrameStart = moment().subtract(amount,'day').format('YYYY-MM-DD')
      let timeFrameEnd = moment().subtract(0,'day').format('YYYY-MM-DD')
      // console.log("时间范围开始",timeFrameStart)
      // console.log("时间范围结束",timeFrameEnd)
      let param = {
        startTime: timeFrameStart,
        endTime: timeFrameEnd,
      };
      getCountByCode(param)
        .then((response) => {
          // console.log(param)
          // console.log(response)
          this.alarmSumData = []
          if (response && response.data.length > 0) {
            response.data.forEach((item) => {
              if('机体告警'.localeCompare(this.alarmJudge(item.alarmType)) !== 0){
                this.alarmSumData.push({name:this.alarmJudge(item.alarmType),value:item.count})
              }
            });
            // console.log("this.alarmSumData--->",this.alarmSumData)
          }
          this.alarmSumRequest = true
        })
        .catch(() => {});
      // const end = new Date();
      // const start = new Date();
      // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      // console.log("时间范围开始start",start.toString())
      // console.log("时间范围结束end",end.toString())

    },

    alarmAnalysisButton(data){
      // console.log('alarmAnalysisButton',data)
      if(!this.alarmAnalysisRequest){
        return
      }
      this.alarmAnalysisRequest = false
      this.alarmAnalysisButtonActive = data
      let searchUnit,amount = 0;
      switch (data) {
        case 'day':{
          searchUnit = 3
          amount = 0
          break
        }
        case 'week':{
          searchUnit = 2
          amount = 6
          break
        }
        case 'month':{
          searchUnit = 2
          amount = 29
          break

        }
      }

      let timeFrameStart = moment().subtract(amount,'day').format('YYYY-MM-DD')
      let timeFrameEnd = moment().subtract(0,'day').format('YYYY-MM-DD')
      // console.log("时间范围开始",timeFrameStart)
      // console.log("时间范围结束",timeFrameEnd)
      let param = {
        startTime: timeFrameStart,
        endTime: timeFrameEnd,
        searchUnit: searchUnit
      }
      let xAxisData = new Set()
      let legendData = new Set()
      let arrayData = []
      let tempData = []
      function compareFunc(a,b){
        if(searchUnit == 3){
          return a - b
        }else {
          return a.localeCompare(b) || b.localeCompare(a)
        }
      }
      //TODO 可优化 一次循环完成
      // 遍历对象类型和日期 均为set集合
      // 1 判断类型 如果类型不存在 推入类型数组 推入对象数据 建立对象数据数组
      // 2 判断时间 如果时间不存在 推入时间数组 按顺序排序 插入后返回下标; 如果时间存在 返回下标
      // 3 判断已存在的类型对象数据 根据时间返回下标进行数据插入
      getCountByDate(param)
        .then((response) => {
          this.alarmAnalData.xAxisData = []
          this.alarmAnalData.legendData = []
          this.alarmAnalData.seriesData = []
          if (response && response.data.length > 0) {
            response.data.forEach((item) => {
              if('机体告警'.localeCompare(this.alarmJudge(item.alarmType)) !== 0){
                legendData.add(item.alarmType)
                xAxisData.add(item.alarmDate)
              }
            });
            legendData.forEach((i)=>{ //类型
              // 对每种类型进行一次时间遍历 时间先进行排序
              Array.from(xAxisData).sort(compareFunc).forEach((j,index)=>{ //时间
                // 每种类型的时间与数据集的时间进行匹配
                response.data.forEach((k)=>{ //数据集
                  if(i == k.alarmType){
                    if(j == k.alarmDate){
                      tempData.push(k.count)
                    }
                  }
                })
                //如果该类在该时间内没有就赋予0
                if(tempData.length < index+1){
                  tempData.push(0)
                }
                //判断时间类型
                if(searchUnit == 3){
                  j = j+":00"
                }
                //时间数据推入到新数组
                this.alarmAnalData.xAxisData.push(j)
              })
              //重组数组推入到seriesData
              this.alarmAnalData.seriesData.push(
                {
                  name: this.alarmJudge(i), //echarts图名字
                  type: 'line',//echarts 类型
                  smooth: true,
                  minAngle: 0,//echarts数据value为0时默认为value为5
                  // label:{
                  //   color: '#FFFFFF',
                  // },
                  data: tempData,
                  // areaStyle: {}, //曲线背景填充
                  // stack: 'x',
                }
              )
              tempData = []
              //判断数据类型推入到legend数据组
              this.alarmAnalData.legendData.push(this.alarmJudge(i))
            })
            this.alarmAnalData.xAxisData = Array.from(new Set(this.alarmAnalData.xAxisData))
            this.$forceUpdate()
          }
          // console.log('alarmAnalData',this.alarmAnalData)
          this.alarmAnalysisRequest = true
        })
        .catch(() => {
          this.alarmAnalysisRequest = true
        });
    },
    locationAgv(){
      if(this.position.length > 1){
        this.$refs.model.controls.target.x = this.position[1].x
        this.$refs.model.controls.target.y = this.position[1].y
        this.$refs.model.controls.target.z = this.position[1].z
      }
    },

    followAgv(){
      if(this.cameraFollow){
        // this.topVision()
        this.cameraFollow = false
        this.cameraPosition = {x:5,y:15,z:0}
      }else {
        this.cameraFollow = true
        // this.cameraPosition = {x:5,y:20,z:0}
        // this.cameraRotation = {x:0,y:Math.PI/2,z:0}
      }

    },
    topVision(){
      this.cameraFollow = false
      this.cameraPosition = {x:5,y:15,z:0}
      this.$refs.model.controls.target.x = 0
      this.$refs.model.controls.target.y = 0
      this.$refs.model.controls.target.z = 0
      // this.cameraRotation = {x:0,y:Math.PI/2,z:0}
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
          speed:this.riskSpeed,
          speedMode:this.speedMode
        }
        moveToPatrolPoint(param).then((res) => {
          console.log(param)
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
      console.log('查看参数',this.carrierSelected.CarrierAccessoryList[0])
      if (!this.YTlogin) {
        let param = {
          carrierID: this.carID,
          id: this.currentAdvices[0].accessoryID,
          configJson: this.currentAdvices[0].configJson,
          accessoryType: this.currentAdvices[0].accessoryType
        }
        // console.log("连接云台",param)
        login(param).then((res) => {
          console.log("连接云台",param)
          if (res.code == '20000') {
            this.YTlogin = true
          }
          else {
            this.$notify({
              message: res.data,
              type: 'warning',
              title: '提示',
              duration: 5000,
            });
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
    //报警判断
    alarmJudge(alarmCode){
      if(alarmCode != null && alarmCode != undefined){
        switch (alarmCode) {
          case 1001: return '行人告警'
          case 1002: return '非机动车告警'
          case 1003: return '异物告警'
          case 1004: return '温度告警'
          case 1005: return '湿度告警'
          case 1006: return '气体告警'
          case 1007: return '灯光告警'
          case 1008: return '违停逆行告警'
          case 1009: return '超速告警'
          case 1010: return '动物告警'
          case 1011: return '井盖异常告警'
          case 1012: return '消防设备告警'
          case 1013: return '火灾烟雾告警'
          case 1014: return '红外测温告警'
          case 1015: return '算法启动告警'
          case 1016: return '逆行告警'
          case 1017: return '风机告警'
          case 1018: return '指示灯告警'
          default: return '机体告警'
        }
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
        if(arr.length > 0){
          const el = arr[arr.length - 1];
          // 绑定事件
          el.addEventListener('scroll', this.handlerLazyLoad);
        }
      });
    },
    async handlerLazyLoad(e) {
      const scrollDistance = e.target.scrollHeight - e.target.scrollTop - 1 - e.target.clientHeight;
      if (scrollDistance <= 0) {
        this.pageNum++;
      }
    },
    async getDetailMessage(e,dialog) {
      console.log("实时", e)
      // let serverAddress = defaultSettings.backService+':'+defaultSettings.servicePort
      if (e.AlarmCode == 1014) {
        this.imageUrl = process.env.VUE_APP_BASE_API + e.Image
      }
      else {
        this.imageUrl = 'http://192.168.20.44:8888/images/' + e.Image
      }
      this.alarm = e
      if(dialog){
        this.dialogVisible = true
      }
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
    //
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
    //
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
    //
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
    //     // console.log("点击节点信息", node.accessoryList)
    //     node.accessoryList.forEach((item) => {
    //       if (item && item.configObj) {
    //         let video = item.configObj;
    //         const src = `/static/video.html?data=${video.rtsp}&serve=${this.webRtcIP}`;
    //         arr.push({
    //           ...item,
    //           src,
    //         });
    //       }
    //     });
    //     // console.log('获取小车ID', node)
    //     // this.carID = node.id;
    //     this.currentNode = node;
    //     // console.log('摄像机ID',this.carID)
    //   }
    //   if (arr.length < 1) {
    //     this.arr = [{}, {}];
    //   }
    //   this.currentAdvices = arr;
    //   // console.log('摄像机信息', this.currentAdvices)
    // },
    // tabClick(val) {
    //   this.activeName = val;
    // },
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.label.indexOf(value) !== -1;
    // },
    async setOpen(e) {
      this.robotOpen = e

      const time = this.getNowtime()
      //通知后台再开遥控
      if (this.robotOpen == 1) {
        // console.log("查看kai", this.robotOpen)
        const informOpen = await informOpenRobot(this.carrierSelected.CarrierID)
        if (informOpen.code == 20000) {
          connectCar(this.robotOpen, time).then((res) => {
            console.log("开关状态", res)
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
        console.log('关闭切换')
        this.logoutCar()
      }

      //关闭后通知
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
            moveCar(flag, this.commandRiskSpeed, 1000000, time).then((res) => {
              console.log('前进', time, res)
            })
          }, 1000)
        }
        else if (flag == 2) {
          this.moveSet = setTimeout(() => {
            moveCar(flag, this.commandRiskSpeed, 1000000, time).then((res) => {
              console.log('后退', time, res)
            })
          }, 1000)
        }
        else if (flag == 3) {
          clearTimeout(this.moveSet)
          setTimeout(() => {
            const time = this.getNowtime()
            stopCar(time).then((res) => {
              console.log('暂停', res)
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
        }, 500)
      }
    },
    async setCameraOperate(val) {
      // console.log( this.speed)
      this.camState = val
      if (this.YTlogin == false) {
        console.log('点击了')
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
            console.log('点击了')
            startTiltUp(this.speed, this.currentAdvices[0].accessoryID).then((res) => {
            })
            break;
          case 3:
            startTiltDown(this.speed, this.currentAdvices[0].accessoryID).then((res) => {
              // console.log("点击向下",res)
            })
            break;
          case 5:
            startPanLeft(this.speed, this.currentAdvices[0].accessoryID).then((res) => {
              console.log("左移动", res)
            })
            break;
          case 7:
            startPanRight(this.speed, this.currentAdvices[0].accessoryID).then((res) => {
              // console.log("右移动",res)
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
              console.log('开灯', res)
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
              console.log(res)
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
            // console.log("点击拍照")
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
    // 时间格式

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
        // this.currentAdvices[0].src = `/static/video.html?data=rtsp://${glassAddress}:8080/h264_pcm.sdp&serve=${this.webRtcIP}`
        this.currentAdvices[0].src = `/static/video.html?data=rtsp://admin:Jiaqi2022@192.168.20.64:554/h264/ch2/main/av_stream&serve=192.168.20.23`
        // this.currentAdvices[0].src = `/static/video.html?data=rtsp://admin:jiaqi2023@192.168.20.66:554/Streaming/Channels/101&serve=${this.webRtcIP}`
      }
      this.glassCamera = !this.glassCamera
      console.log(this.currentAdvices[0].src)
    },
  },

  // initHT() {
  //   return
  //   ht.Default.setImage('port', 32, 32, 'data:image/png;base64,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')
  //   this.dataModel = new ht.DataModel()
  //   let g3d = new ht.graph3d.Graph3dView(this.dataModel)
  //   let view = g3d.getView()
  //   view.className = 'htView'
  //   view.style.width = '100%';
  //   view.style.height = '100%';
  //   this.$refs.htView.appendChild(view);
  //
  //   // let dm = new ht.DataModel();
  //   // let gv = new ht.graph.GraphView(dm);
  //   // let node = new ht.Node();
  //   // console.log('node--->',node)
  //   // node.setName('Hello World!');
  //   // node.setPosition(200, 200);
  //   // dm.add(node);
  //   // let view = gv.getView();
  //   // view.style.width = '100%';
  //   // view.style.height = '100%';
  //   // this.$refs.htView.appendChild(view);
  //
  //
  //   window.addEventListener('resize', function(e) {
  //     g3d.invalidate()
  //   }, false)
  //
  //   g3d.setEye([0, 300, 600])
  //   g3d.enableToolTip()
  //   g3d.getToolTip = function(e) {
  //     let data = this.getDataAt(e)
  //     if (data) {
  //       return '<pre>' + JSON.stringify(data.getStyleMap(), null, 4) + '</pre>'
  //     }
  //     return null
  //   }
  //   g3d.getMoveMode = function(e) {
  //     return 'xyz'
  //   }
  //   g3d.getBrightness = function(data) {
  //     if (data.s('isFocused')) {
  //       return 0.7
  //     }
  //     return null
  //   }
  //   let lastFocusData = null
  //   g3d.getView().addEventListener('mousemove', function(e) {
  //     let data = g3d.getDataAt(e)
  //     if (data !== lastFocusData) {
  //       if (lastFocusData) {
  //         lastFocusData.s('isFocused', false)
  //       }
  //       if (data) {
  //         data.s('isFocused', true)
  //       }
  //       lastFocusData = data
  //     }
  //   })
  //
  //   let floor = this.createNode([0, 0, 0], [600, 5, 400]).s({
  //     'all.color': '#A0A0A0',
  //     'label': 'This is a floor',
  //     'label.face': 'top',
  //     'label.background': 'yellow',
  //     'label.position': 22,
  //     'label.t3': [10, 0, -10],
  //     'label.font': '28px arial, sans-serif'
  //   })
  //   let table = this.createNode([0, 120, 0], [400, 10, 280], floor).s({
  //     'shape3d': 'cylinder',
  //     'shape3d.side': 60,
  //     'shape3d.color': '#E5BB77',
  //     'label': 'This is a table',
  //     'label.face': 'top',
  //     'label.background': 'yellow',
  //     'label.position': 23,
  //     'label.t3': [0, 0, -10],
  //     'label.font': '20px arial, sans-serif'
  //   })
  //   let foot1 = this.createNode([100, 60, 80], [20, 110, 20], table).s({
  //     'shape3d': 'cylinder',
  //     'shape3d.color': '#E5BB77',
  //     'label': 'Foot 1 hosting on table',
  //     'label.background': 'yellow',
  //     'label.position': 20
  //   })
  //   let foot2 = this.createNode([-100, 60, 80], [20, 110, 20], table).s({
  //     'shape3d': 'cylinder',
  //     'shape3d.color': '#E5BB77',
  //     'label': 'Foot 2 hosting on table',
  //     'label.background': 'yellow',
  //     'label.position': 14
  //   })
  //   let foot3 = this.createNode([100, 60, -80], [20, 110, 20], table).s({
  //     'shape3d': 'cylinder',
  //     'shape3d.color': '#E5BB77',
  //     'label': 'Foot 3 hosting on table',
  //     'label.background': 'yellow',
  //     'label.position': 25,
  //     'label.reverse.flip': true
  //   })
  //   let foot4 = this.createNode([-100, 60, -80], [20, 110, 20], table).s({
  //     'shape3d': 'cylinder',
  //     'shape3d.color': '#E5BB77',
  //     'label': 'Foot 4 hosting on table',
  //     'label.background': 'yellow',
  //     'label.position': 21,
  //     'label.reverse.flip': true
  //   })
  //   let chassis = this.createNode([0, 150, 0], [100, 50, 60], table).s({
  //     'all.color': '#2e2f32',
  //     'front.color': '#BDC3C7',
  //     'back.uv.scale': [2, 1],
  //     'note': 'This is a chassis with two panels and 8 ports',
  //     'note.face': 'top',
  //     'note.position': 7,
  //     'note.t3': [0, 0, 10],
  //     'note.autorotate': true
  //   })
  //   let panel1 = this.createNode([0, 162, 30], [90, 20, 2], chassis).s({
  //     'note': 'Panel 1',
  //     'note.r3': [0, -Math.PI / 4, 0]
  //   })
  //   for (var i = 0; i < 4; i++) {
  //     var port = this.createNode([-30 + i * 20, 162, 31], [16, 12, 2], panel1).s({
  //       'all.color': '#303030',
  //       'front.image': 'port'
  //     })
  //     if (i === 0) {
  //       port.s({
  //         'all.blend': 'red',
  //         'note': 'Critical Alarm',
  //         'note.position': 1,
  //         'note.t3': [0, 0, 5],
  //         'note.r3': [Math.PI / 10, 0, 0],
  //         'note.background': 'red'
  //       })
  //     }
  //   }
  //   let panel2 = this.createNode([0, 138, 30], [90, 20, 2], chassis).s({
  //     'note': 'Panel 2',
  //     'note.r3': [Math.PI / 7, Math.PI / 6, 0]
  //   })
  //   for (var i = 0; i < 4; i++) {
  //     this.createNode([-30 + i * 20, 138, 31], [16, 12, 2], panel2).s({
  //       'all.color': '#303030',
  //       'front.image': 'port'
  //     })
  //   }
  // },

  // createNode(p3, s3, host) {
  //   let node = new ht.Node()
  //   node.p3(p3)
  //   node.s3(s3)
  //   node.setHost(host)
  //   node.s({
  //     'wf.visible': 'selected',
  //     'wf.color': '#FF6B10',
  //     'wf.width': 2,
  //     'wf.short': true
  //   })
  //   this.dataModel.add(node)
  //   return node
  // }

}

</script>
<style lang="scss" scoped>

.screen {
  background-image: url(../../assets/img/screenBackground.png);
  background-size: cover;
  background-repeat: no-repeat;
  height: 56.25rem;
}

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
  //bottom: 26rem;
  margin-top: 6rem;
  color:darkgreen;
  z-index: 890;
}

.myTable ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: auto !important;
  background-color: rgb(9, 43, 46,0.8) !important;
}

.htView {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.myTable ::v-deep .el-table td.el-table__cell{
  border-bottom: 0.5px solid rgba(235, 238, 245, 0.5) !important;
}

.myTable ::v-deep .el-table tbody .el-table__cell {
  background: rgb(9, 43, 46)!important;
  font-size: 14px;
}

.myTable ::v-deep .el-table thead .el-table__cell{
  background: rgb(9, 43, 46)!important;
}

.content {

  .screenTitle{
    font-style: italic;
  }

  font-size: 1.25rem;

  >.el-row {
    height: 100%;

    >.el-col {
      height: 100%;
    }
  }

  .visibleLight{
    width: 100%;
    height: 30.5rem;
    border: none;
  }

  .iframe-fullScreen{
    left: 0 !important;
    top: 0 !important;
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
    background-color: rgba(0, 0, 0, 0.5) !important;
    z-index: 100 !important;
  }

  .loaderFSB{
    position: fixed!important;
  }

  .button-box {
    //width: 20rem;
    border-radius: 50%;
    position: fixed;
    bottom: 1rem;
    //right: 10rem;
    left: 25%;
    padding-left: 1rem;
    padding-top: 1.5rem;
    cursor: pointer;
    //opacity: 0.8;
    z-index: 889;
  }
  .button-box:hover {
    color: white;
    opacity: 1;
  }

  .font-box {
    width: 80px;
    color: #3193ef;
    text-align: center;
  }

  .el-table{
    background-color: rgb(9, 43, 46,0.8)!important;
  }

  .back-shaodow {
    position: relative;
    background-color: rgb(9, 43, 46,0.8);
    background: linear-gradient(135deg, transparent 15px, rgb(9, 43, 46,0.8) 0) top left,
                linear-gradient(-135deg, transparent 0, rgb(9, 43, 46,0.8) 0) top right,
                linear-gradient(-45deg, rgb(103, 178, 177) 10px, transparent 11px,transparent 15px, rgb(9, 43, 46,0.8) 0) bottom right,
                linear-gradient(45deg, rgb(103, 178, 177) 10px, transparent 11px,transparent 15px, rgb(9, 43, 46,0.8) 0) bottom left;
    background-size: 50.1% 50.1%;
    background-repeat: no-repeat;
    //border: 1px solid rgba(255, 255, 255, 0.5);
  }

  //.back-shaodow::before {
  //  content: '';
  //  position: absolute;
  //  width: 0;
  //  height: 0;
  //  right: 0;
  //  bottom: 0;
  //  border: 5px solid #fff;
  //  border-top-color: transparent;
  //  border-left-color: transparent;
  //}
  //.back-shaodow::after{
  //  content: '';
  //  position: absolute;
  //  width: 0;
  //  height: 0;
  //  left: 0;
  //  top: 0;
  //  border: 5px solid #fff;
  //  border-bottom-color: transparent;
  //  border-right-color: transparent;
  //}

  ::v-deep .el-input__prefix{
    left: 10px;
    display: flex;
    position: absolute;
    align-items: center;
  }

  .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
  }

  ::v-deep .el-dialog{
    background: rgb(9, 43, 46,0.9);
  }

  ::v-deep .el-input__inner{
    color: #FFFFFF;
  }

  //::v-deep .el-select-dropdown,
  //::v-deep .el-select-dropdown__item.hover{
  //  background-color: transparent!important;
  //}

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
    border-radius: 10px;
    padding-bottom: 1rem;
    left: 25.3%;
    background-color: #fff;
    z-index: 999;

    .leftTitle {
      color: #66B3B2;
      padding-right: 2rem;
    }

    // .closeBroad:hover{
    //   background-color: #64c8c8;
    // }

  }

  .title-button-group {
    display: flex;
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    width: auto;
    z-index: 777;
  }

  .buttonActive {
    //color: #FFFFFF;
    //background-color:#67B3B2;
    color:#67B3B2;
    margin-top: 0.5rem;
  }

  .buttonInactive {
    //color: #FFFFFF;
    //background-color: rgba(103, 179, 178, 0.20);
    color: #FFFFFF;
    margin-top: 0.5rem;
  }

  //机器人信息2.0
  .leftTitle {
    font-size: 1.2rem;
    color: #fff;
    padding: 0.75rem 0 0.5rem 1.25rem;
  }

  .robot {
    height: 11rem; //27.5rem
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
      //width: 14vh;
      height: 5rem;
      margin-left: 25%;
      //margin-top: 1rem;
    }

    .robotEletri {
      display: flex;
      flex: 1;
      font-size: 0.625rem;
      color: #fff;

      .arrow {
        margin-top: 0.2rem;
        font-size: 2rem;
      }

      .arrow:active {
        color: #64c8c8;
      }

      .onLine {
        height: 1.5rem;
        width: 7rem;
        margin-top: 0.5rem;
        border-radius: 2px;
        background-color: #67B3B2;
        text-align: center;
        line-height: 1.575rem;
      }
    }

    .electri {
      //position: absolute;
      color: #fff;
      margin-top: 0.8rem;
      margin-left: 0;

      .el-progress {
        margin-left: 0.5rem;
      }

      ::v-deep .el-progress__text {
        color: #fff;
      }
    }

    .runtimeinfo-first {
      //position: absolute;
      width: 8rem;
      color: #fff;
      //margin-left: 1.0125rem;
      margin-top: 0.6rem;

      ::v-deep .el-progress__text {
        color: #fff;
      }
    }

    .runtimeinfo-second {
      //position: absolute;
      color: #fff;
      margin-left: 0;
      margin-top: 0.8rem;

      ::v-deep .el-progress__text {
        color: #fff;
      }
    }

    .runtimeinfo-third {
      //position: absolute;
      width: 8rem;
      color: #fff;
      //margin-left: 1.0125rem;
      margin-top: 0.8rem;

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

  .alarm-list{
    height: 28rem;
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
        width: 8rem;
        height: 1.875rem;
      }
    }

  }

  .threeRow {
    height: 12rem;
    min-height: 150px;
  }

  .enviroment {
    // height: 13.8rem;
    color: #fff;

    .enviroDetail {
      display: flex;
      width: 30%;
      min-width: 6rem;
      height: 2rem;
      min-height: 45px;
      //font-weight:bold;
      //background: linear-gradient(181deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.00) 100%);
      opacity: 0.9;
      margin: auto;
      border-radius: 0.2081rem;
      font-size: 1rem;
      word-break: break-all;

      .environInfo {
        color: #0FB1CBFF;
        margin: 0.625rem 0 0 0.375rem;
      }

      .gasDetail {
        margin: 1.625rem 0 0 0.5rem;
        width: 6rem;
      }

      div {
        width: 2.5rem;
      }

      .detail_icon {
        margin-left: 0.375rem;
        margin-top: 0.625rem;
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
      margin: 0.625rem 0 0 1.25rem;

      .chart {
        background-color: #64C8C8;
        border-radius: 0.625rem;
        font-size: 1.125rem;
        width: 6.25rem;
        position: absolute;
        right: 0;
        text-align: center;
        line-height: 1.875rem;
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
      margin: 0 0.5rem;

      // .active {
      //   border: 0.1875rem solid #bae1f3;
      // }
    }
  }

  .goLocation {
    display: flex;
    position: relative;
    //bottom: 8.3rem;
    left: 1.25rem;
    font-size: 1.125rem;
    line-height: 1.875rem;

    .location_Detail {
      width: 12.5rem;
      min-width: 150px;

      ::v-deep .el-input__inner {

        padding-left: 52px;
      }
    }

    ::v-deep .el-input__inner {
      background-color: rgba($color: #071828, $alpha: 1);
      height: 1.875rem;
    }

    .el-select {
      width: 9.5rem;
      min-width: 110px;
      margin: 0 0.625rem;
    }

    .goYes {
      width: 3.75rem;
      height: 1.875rem;
      line-height: 1.9375rem;
      background-color: #64C8C8;
      border-radius: 0.1875rem;
      text-align: center;
      margin-left: 1.5rem;
    }
  }

  .map {
    // margin: 0.625rem;
    margin: 0.5rem 0; //1.25rem
    height: 20.5rem;
    background-size: 100%;
    background-repeat: no-repeat;
    color: #fff;
    z-index: 100;

    .backgroundIm {
      border: transparent;
      width: 103%;
      height: 10.2rem;
      position: relative;
      right: 1.5625rem;
      bottom: 0.8rem;
      opacity: 0.5;
    }

    .nowPosition {
      flex: 1;
      display: flex;
      position: relative;
      bottom: 10.25rem;
    }

    .goLocation {
      display: flex;
      position: relative;
      bottom: 8.3rem;
      left: 1.25rem;
      font-size: 1.125rem;
      line-height: 1.875rem;

      .location_Detail {
        width: 12.5rem;
        min-width: 150px;

        ::v-deep .el-input__inner {
          padding-left: 52px;
        }
      }

      ::v-deep .el-input__inner {
        background-color: rgba($color: #071828, $alpha: 1);
        height: 1.875rem;
      }

      .el-select {
        width: 9.5rem;
        min-width: 110px;
        margin: 0 0.625rem;
      }

      .goYes {
        width: 3.75rem;
        height: 1.875rem;
        line-height: 1.9375rem;
        background-color: #64C8C8;
        border-radius: 0.1875rem;
        text-align: center;
        margin-left: 2.5rem;
      }
    }
  }

  // .right {
  //   width: 19.375rem;

  // }

  //::v-deep .el-table--scrollable-y .el-table__body-wrapper{
  //  overflow-y: hidden;
  //}

  .hkControl {
    //width: 100%;
    width: 27rem;
    height: 28rem;
    background: none;
    background-color: rgba(7, 24, 40, 0.7);
    border-radius: 0.625rem;
    //margin: 0 0 0.875rem 0;
    color: #fff;
    border: 0.0625rem solid rgba($color: #fff, $alpha: 0.5);

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

    .robotMoveDirect{
      width: 2rem;
      height:1.5rem;
      margin: 0 0.5rem;
      border-radius: 0.625rem;
      text-align: center;
    }

    .robotMoveDirect:active{
        opacity: 0.5;
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
      //margin-left: 6rem;
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

  ::v-deep .el-radio {
    color: #000000;
    margin: 0.625rem 1.25rem;

    .el-radio__inner {
      border: 1px solid #000000;
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
    border: 0.0625rem solid rgba($color: #fff, $alpha: 0.5);

    .leftTitle {
      // padding-bottom: 0.5rem;
      display: inline-block;
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
