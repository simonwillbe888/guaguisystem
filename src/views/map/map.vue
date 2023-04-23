<template>
  <div class="map-container">
    <el-container style="height: 100%;margin-right: 1%;">
      
       <el-main  class="bgdimg" >
        <div style="margin-top: 18%;margin-left: 3%;width: 100%; " >
          <div id="robot" style="position:relative;top:0;width: 1500px;">
            <img src="../../assets/img/robot1.png"  style="width:5%">
          </div>
         <button @click="move">按钮</button>
        </div>
        
      </el-main>
      <!-- <el-main style="height: 100%">
        <svg
          id="sv"
          version="1.1"
          width="100%"
          height="100%"
          preserveAspectRatio="xMinYMin meet"
          transform="scale(1, -1)"
          @mousewheel="setD3Zoom()"
        >
          <g id="mapContainer">
       
       
            <point
              v-for="item in pointInfos"
              :key="item.index"
              :pointInfo="item"
            />
        
            <arc v-for="item in arcInfos" :key="item.index" :arcInfo="item" />
            <location-inform
              v-for="item in locationInfos"
              :key="item.index"
              :locationInfo="item"
            />
            <agv-radar
              v-for="item in radar"
              :key="item.indx"
              :radarInfo="item"
            />
            <plan-route
              v-for="item in routeInfo1"
              :key="item.index"
              :routeInfo="item"
            />
            <plan-arc
              v-for="item in routeInfo2"
              :key="item.index"
              :routeInfo2="item"
            />
            <agv-two
              v-for="(item, index) in naviCarTwo"
              :key="index"
              :carInfoTwo="item"
            />
            <agv-one
              v-for="(item, index) in naviCarOne"
              :key="index"
              :carInfoOne="item"
            />
            <cargo-inform
              v-for="item in cargoInfos"
              :key="item.dex"
              :cargoInfo="item"
            />
          </g>
        </svg>
      </el-main> --> 
    </el-container>
  </div>
</template>

<script>
import * as d3 from 'd3';
import {
  getMapData,
  getAllCarrierDetailInfo,
  moveToVertex,
  getAllLocationInfo,
} from '@/api/map.js';
import Point from '@/components/MapComponent/graphics/Point';
import ActivityPoint from '@/components/MapComponent/graphics/ActivityPoint';
import StandPoint from '@/components/MapComponent/graphics/StandPoint';
import LocationInform from '@/components/MapComponent/graphics/LocationInform';
import CargoInform from '@/components/MapComponent/graphics/CargoInform';
import Line from '@/components/MapComponent/graphics/Line';
import Arc from '@/components/MapComponent/graphics/Arc';
import AgvOne from '@/components/MapComponent/agv/AgvOne';
import AgvTwo from '@/components/MapComponent/agv/AgvTwo';
import AgvCard from '@/components/MapComponent/agvmoreinfo/AgvCard';
import AgvState from '@/components/MapComponent/agvmoreinfo/AgvState';
import PlanRoute from '@/components/MapComponent/agvmoreinfo/PlanRoute';
import PlanArc from '@/components/MapComponent/agvmoreinfo/PlanArc';
import AgvRadar from '@/components/MapComponent/agvmoreinfo/AgvRadar';
import { getEquipmentList } from '../../api/robot';

export default {
  components: {
    Point,
    ActivityPoint,
    StandPoint,
    'v-line': Line,
    Arc,
    LocationInform,
    CargoInform,
    AgvOne,
    AgvTwo,
    AgvCard,
    AgvState,
    PlanRoute,
    PlanArc,
    AgvRadar,
  },
  data() {
    return {
      scale: 0.3,
      asideShow: true,
      naviCarOne: [],
      naviCarTwo: [],
      agvInfo: [],
      agvState: [],
      routeInfo1: [],
      routeInfo2: [],
      pointArr: [],
      pointInfos: [],
      carIndex: 0,
      activityArr: [],
      actiPointInfos: [],
      standPointArr: [],
      standPointInfos: [],
      lineArr: [],
      lineInfos: [],
      arcArr: [],
      arcInfos: [],
      locationInfos: [],
      cargoInfos: [],
      showCargoFlag: false,
      cargoArr: [],
      contextMenuVisible: false,
      left: '',
      top: '',
      config_car_visible: false,
      move_car_visible: false,
      carInfo: [],
      form: {
        carType: '',
        carNumber: '',
        taskPoint: '',
      },
      zoom: '',
      groupLeft: 0,
      groupTop: 0,
      scaleK: 0.15,
      planRoute: {
        routeShow: false,
        carIndex: 0,
      },
      radar: [],
      selectedCarNum: 0,
      animateObjs: [],
      mapCarTime: undefined,
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      filterText: '',
      adviceList: [],
    };
  },
  mounted() {
    if (this.mapCarTime) {
      this.removeCarTiming();
    }
    // this.getCarInfo()
    this.init();
    this.setD3Zoom();
    this.initialMap();
    this.getAdvices();
  },

  watch: {
    contextMenuVisible() {
      if (this.contextMenuVisible) {
        document.body.addEventListener('click', this.closeContextMenu);
      } else {
        document.body.removeEventListener('click', this.closeContextMenu);
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  beforeDestroy() {
    this.refreshCar = null;
    this.removeCarTiming();
  },

  methods: {
    move(){
      
       let robot = document.getElementById('robot')
      //  笔记本尽头 1390px
       robot.style.left = 1390 +'px'
       
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    cardTrans(item, flag) {
      let carArr = document.getElementsByClassName('agv_card');
      let currentCard = carArr[item.index - 1];
      if (flag) {
        currentCard.style.border = '5px solid darkgray';
      } else {
        currentCard.style.border = '1px solid #EBEEF5';
      }
    },
    async getAdvices() {
      const res = await getEquipmentList();
      //递归重构数据 把设备和隧道组合起来
      const deepfined = (list) => {
        if (!list && !list.length) return;
        list.forEach((item) => {
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
    },

    getChildMsg(obj) {
      if (obj) {
        this.planRoute.routeShow = obj.planRoute.selectState;
        this.planRoute.carIndex = obj.planRoute.index;
      }
    },
    operateAgvVisible: function() {
      if (this.asideShow) {
        this.asideShow = false;
      } else {
        if (this.agvState.length) {
          this.agvState = this.agvState;
        }
        if (this.planRoute.routeShow) {
          this.planRoute.carIndex;
        }
        this.asideShow = true;
      }
    },
    setD3Zoom() {
      var self = this;
      // 缩放 禁止双击放大
      let svg = d3.select('#sv');
      (this.zoom = d3
        .zoom()
        .scaleExtent([0.01, 1000])
        .on('zoom', zoom)),
        svg.call(this.zoom).on('dblclick.zoom', null);
      function zoom() {
        //左偏移量，就是<g>的左边界距离显示区域的距离
        self.groupLeft = d3.event.transform.x;
        //上偏移量,就是<g>的上边界距离显示区域的距离
        self.groupTop = d3.event.transform.y;
        // 缩放比值
        self.scaleK = d3.event.transform.k;
        d3.select(this)
          .select('#mapContainer')
          .attr(
            'transform',
            'translate(' +
              self.groupLeft +
              ',' +
              self.groupTop +
              ') scale(' +
              self.scaleK +
              ')'
          );
      }
    },
    initialMap() {
      var self = this;
      let sv = document.getElementById('sv');
      let g = document.getElementById('mapContainer');
      let svg = d3.select('#sv');
      // svg画布的可视化区域
      let visualArea = sv.getBoundingClientRect();
      let x = visualArea.width / 6;
      let y = visualArea.height / 22;
      svg.call(self.zoom.transform, d3.zoomIdentity.translate(x, y).scale(0.1));
      // 获取小车声波初始化位置
      self.animateObjs = document.getElementsByClassName('radar-animate');
    },
    drawMap: function() {
      var svg = document.getElementById('sv');
      // svg.setAttribute("viewBox", "0 0 800 500");
      //   画活动站点
      var activityArr = this.activityArr;
      let actiPoints = [];
      for (
        let i = 0, activePointLength = activityArr.length;
        i < activePointLength;
        i++
      ) {
        activityArr[i].vertex.x *= this.scale;
        activityArr[i].vertex.y *= this.scale;
        let actiPointObj = {
          x: activityArr[i].vertex.x,
          y: activityArr[i].vertex.y,
          number: activityArr[i].index,
          text: '加工车间库位',
        };
        actiPoints.push(actiPointObj);
      }
      this.actiPointInfos = actiPoints;
      //   画待命点
      var standPointArr = this.standPointArr;
      let standPoints = [];
      for (
        let i = 0, standPointLength = standPointArr.length;
        i < standPointLength;
        i++
      ) {
        standPointArr[i].vertex.x *= this.scale;
        standPointArr[i].vertex.y *= this.scale;
        let standPointObj = {
          x: standPointArr[i].vertex.x,
          y: standPointArr[i].vertex.y,
          number: standPointArr[i].index,
        };
        standPoints.push(standPointObj);
      }
      this.standPointInfos = standPoints;
      //   画点
      var pointArr = this.pointArr;
      let points = [];
      for (let i = 0, pointLength = pointArr.length; i < pointLength; i++) {
        pointArr[i].x *= this.scale;
        pointArr[i].y *= this.scale;
        let pointObj = {
          x: pointArr[i].x,
          y: pointArr[i].y,
          number: pointArr[i].number,
        };
        points.push(pointObj);
      }
      this.pointInfos = points;
      //   画直线
      var lineArr = this.lineArr;
      let lines = [];
      for (let i = 0, lineLength = lineArr.length; i < lineLength; i++) {
        lineArr[i].startVertex.x *= this.scale;
        lineArr[i].startVertex.y *= this.scale;
        lineArr[i].stopVertex.x *= this.scale;
        lineArr[i].stopVertex.y *= this.scale;
        let lineObj = {
          x1: lineArr[i].startVertex.x,
          y1: lineArr[i].startVertex.y,
          x2: lineArr[i].stopVertex.x,
          y2: lineArr[i].stopVertex.y,
          number: lineArr[i].number,
        };
        lines.push(lineObj);
      }
      this.lineInfos = lines;
      // 画弧线
      var arcArr = this.arcArr;
      let arcs = [];
      for (let i = 0, arcLength = arcArr.length; i < arcLength; i++) {
        arcArr[i].startVertex.x *= this.scale;
        arcArr[i].startVertex.y *= this.scale;
        arcArr[i].stopVertex.x *= this.scale;
        arcArr[i].stopVertex.y *= this.scale;
        let circleCenterArr = arcArr[i].arcCenter || {};
        //   arcArr[i] && arcArr[i].arcCenter
        //     ? arcArr[i].arcCenter.split(',')
        //     : '';
        circleCenterArr[0] *= this.scale;
        circleCenterArr[1] *= this.scale;
        let arcObj = {
          x1: arcArr[i].startVertex.x,
          y1: arcArr[i].startVertex.y,
          x0: circleCenterArr.x * this.scale,
          y0: circleCenterArr.y * this.scale,
          x2: arcArr[i].stopVertex.x,
          y2: arcArr[i].stopVertex.y,
          number: arcArr[i].number,
        };
        arcs.push(arcObj);
      }
      this.arcInfos = arcs;
      // this.controlLocationInfo()
    },
    init: function() {
      var self = this;
      this.$nextTick(() => {
        getMapData()
          .then((response) => {
            self.pointArr = [];
            self.activityArr = [];
            self.standPointArr = [];
            self.lineArr = [];
            self.arcArr = [];
            // 数据处理
            let jsonData = response.data;
            if (jsonData) {
              // 导航点
              self.pointArr = jsonData.vertexs;
              // 活动站点和待命点
              let stationArr = jsonData.stations;
              for (
                let i = 0, stationArrLength = stationArr.length;
                i < stationArrLength;
                i++
              ) {
                if (stationArr[i].type == 1) {
                  self.activityArr.push(stationArr[i]);
                } else if (stationArr[i].type == 2) {
                  self.standPointArr.push(stationArr[i]);
                }
              }
              // 线
              let edgesArr = jsonData.edges;
              for (
                let i = 0, edgesArrLength = edgesArr.length;
                i < edgesArrLength;
                i++
              ) {
                if (edgesArr[i].startAttitude == edgesArr[i].stopAttitude) {
                  self.lineArr.push(edgesArr[i]);
                } else {
                  self.arcArr.push(edgesArr[i]);
                }
              }
            }
            self.drawMap();
            // 给小车设置定时器实时刷新小车位置
            self.refreshCar();
          })
          .catch((error) => {
            self.$notify({
              title: self.$t('user.Failure'),
              message: self.$t('user.interface_call_failed_tip'),
              type: 'error',
              duration: 1000,
            });
          });
      });
    },
    controlLocationInfo() {
      var self = this;
      this.locationInfos = [];
      this.cargoArr = [];
      // 调库位信息接口
      getAllLocationInfo()
        .then((response) => {
          let locationArr = response.data;
          for (let i = 0, len = locationArr.length; i < len; i++) {
            if (locationArr[i].State === 'OnCarrier') {
              let cargoObj = {
                index: Number(locationArr[i].CarrierID),
                name: locationArr[i].Name,
              };
              self.cargoArr.push(cargoObj);
            }
            self.activityArr.some((item) => {
              if (item.Index == locationArr[i].Station) {
                let locationObj = {
                  x: item.Vertex.X,
                  y: item.Vertex.Y,
                  stateText: locationArr[i].State,
                  goodsText: locationArr[i].Name,
                  inText: self
                    .$moment(locationArr[i].InStockTime)
                    .format('YYYY-MM-DD HH:mm:ss'),
                  locationNum: locationArr[i].Location,
                };
                return self.locationInfos.push(locationObj);
              }
            });
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    getCarInfo: function() {
      var self = this;
      this.$nextTick(() => {
        getAllCarrierDetailInfo()
          .then((response) => {
            self.carInfo = [];
            // 小车信息数据
            self.carInfo = response.data;
            // 放置所有小车到地图
            // self.dropCar()
            let carInfoLength = self.carInfo.length;
            for (let i = 0; i < carInfoLength; i++) {
              // 小车卡片数据
              let cardData = {
                index: self.carInfo[i].Index,
                status: self.carInfo[i].OrderStatus,
                battery_level: self.carInfo[i].BatteryLevel + '%',
                connect_state: self.carInfo[i].ConnectionStatus,
                selectedFlag: false,
              };
              self.agvInfo.push(cardData);
            }
            if (self.carIndex === 0) {
              let stateInfo = {
                agv_number: '',
                agv_types: '',
                x_coordinate: '',
                y_coordinate: '',
                plan_start_point: '',
                plan_end_point: '',
                agv_behavior_code: '',
                regulate_type: '',
                regulate_param: '',
                agv_control_mode: '',
                agv_obstacle: '',
                agv_emergency_stop: '',
              };
              self.agvState.push(stateInfo);
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
      });
    },
    dropCar() {
      var self = this;
      let carType = self.form.carType ? Number(self.form.carType) : 1;
      self.naviCarOne = [];
      self.naviCarTwo = [];
      for (
        let i = 0, carInfoLength = self.carInfo.length;
        i < carInfoLength;
        i++
      ) {
        self.carInfo[i].X *= self.scale;
        self.carInfo[i].Y *= self.scale;
        let item = {
          x: self.carInfo[i].X.toFixed(2),
          y: self.carInfo[i].Y.toFixed(2),
          attitude: self.carInfo[i].Attitude.toFixed(2),
          index: self.carInfo[i].Index,
        };
        if (carType == 1) {
          self.naviCarOne.push(item);
        } else if (carType == 2) {
          self.naviCarTwo.push(item);
        }
      }
    },
    refreshCar() {
      var self = this;
      var g = document.getElementById('mapContainer');
      // freshCar()
      // function freshCar () {
      getAllCarrierDetailInfo()
        .then((response) => {
          let carInfoArr = [];
          self.carInfo = [];
          self.agvInfo = [];
          self.agvState = [];
          carInfoArr = response.data;
          self.carInfo = carInfoArr;
          self.naviCarOne = [];
          self.naviCarTwo = [];
          self.radar = [];
          self.cargoInfos = [];
          let carType = self.form.carType ? Number(self.form.carType) : 1;
          let agvInfos = [];
          let agvStates = [];
          for (
            let i = 0, carInfoArrLength = carInfoArr.length;
            i < carInfoArrLength;
            i++
          ) {
            // if (self.planRoute.routeShow && carInfoArr[i].index == self.planRoute.carIndex) {
            let planEdgeNumbers = carInfoArr[i].systemPlanningEdges.concat(
              carInfoArr[i].systemAllocatedEdges
            );
            if (carInfoArr[i].edgeNumber !== 0) {
              planEdgeNumbers.push(carInfoArr[i].edgeNumber);
            }
            let planStopNum = carInfoArr[i].taskSystemPlanningStopNumber;
            let stgLines = []
            let arcLines = []
            self.routeInfo1 = []
            self.routeInfo2 = []
            for (let j = 0, len = planEdgeNumbers.length; j < len; j++) {
              self.lineArr.some((item, index) => {
                if (item.number == planEdgeNumbers[j]) {
                  let strLineObj = {
                    startPtX: item.startVertex.x,
                    startPtY: item.startVertex.y,
                    endPtX: item.stopVertex.x,
                    endPtY: item.stopVertex.y,
                    flag: true,
                  }
                  return stgLines.push(strLineObj);
                }
              })
              let pointObj = {
                startPtX: carInfoArr[i].x * self.scale,
                startPtY: carInfoArr[i].y * self.scale,
                endPtX: 0,
                endPtY: 0,
                flag: false,
              }
              self.pointArr.some((item, index) => {
                if (item.number == planStopNum) {
                  pointObj.endPtX = item.x;
                  pointObj.endPtY = item.y;
                }
              })
              stgLines.push(pointObj)
              self.arcArr.some((item, index) => {
                if (item.number == planEdgeNumbers[j]) {
                  let circleCenterArr = item.arcCenter || {}
                  //     item && item.arcCenter ? item.arcCenter.split(',') : '';
                  circleCenterArr[0] *= self.scale;
                  circleCenterArr[1] *= self.scale;
                  let arcLineObj = {
                    x1: item.startVertex.x,
                    y1: item.startVertex.y,
                    x0: circleCenterArr.x * this.scale,
                    y0: circleCenterArr.y * this.scale,
                    x2: item.stopVertex.x,
                    y2: item.stopVertex.y,
                  };
                  return arcLines.push(arcLineObj);
                }
              })
            }
            self.routeInfo1 = stgLines
            self.routeInfo2 = arcLines
            // } else if (!self.planRoute.routeShow) {
            //   self.routeInfo1 = []
            //   self.routeInfo2 = []
            // }
            carInfoArr[i].x *= self.scale
            carInfoArr[i].y *= self.scale
            if (carInfoArr[i].inSystem) {
              let item = {
                x: carInfoArr[i].x.toFixed(2),
                y: carInfoArr[i].y.toFixed(2),
                attitude: carInfoArr[i].attitude.toFixed(2),
                index: carInfoArr[i].index,
              };
              if (self.cargoArr.length) {
                for (let i = 0, len = self.cargoArr.length; i < len; i++) {
                  if (carInfoArr[i].index == self.cargoArr[i].index) {
                    let cargoObj = {
                      x: carInfoArr[i].x.toFixed(2),
                      y: carInfoArr[i].y.toFixed(2),
                      attitude: carInfoArr[i].attitude.toFixed(2),
                      goodsName: self.cargoArr[i].name,
                    };
                    self.cargoInfos.push(cargoObj)
                  }
                }
              }
              if (carType == 1) {
                self.naviCarOne.push(item)
              } else if (carType == 2) {
                self.naviCarTwo.push(item)
              }
              item = null
            }
            if (
              self.selectedCarNum != 0 &&
              self.selectedCarNum == carInfoArr[i].index
            ) {
              let radarObj = {
                x: carInfoArr[i].x,
                y: carInfoArr[i].y,
              };
              self.radar.push(radarObj)
            }
          }
          self.agvInfo = agvInfos
          self.agvState = agvStates
          carInfoArr = null;
          carType = null;
          if (self.carIndex === 0) {
            let stateInfo = {
              agv_number: '',
              agv_types: '',
              x_coordinate: '',
              y_coordinate: '',
              plan_start_point: '',
              plan_end_point: '',
              agv_behavior_code: '',
              regulate_type: '',
              regulate_param: '',
              agv_control_mode: '',
              agv_obstacle: '',
              agv_emergency_stop: '',
            };
            self.agvState.push(stateInfo);
            stateInfo = null;
          }
          self.removeCarTiming();
          self.mapCarTime = setTimeout(() => {
            if (self.refreshCar) {
              self.refreshCar();
            }
          }, 500)
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
      //   }
    },
    // 清除定时器
    removeCarTiming() {
      clearTimeout(this.mapCarTime);
    },
    performTasks() {
      var self = this;
      // 调后台下发任务接口
      let taskPoint = Number(self.form.taskPoint);
      let param = {
        carrierIndex: self.form.carNumber,
        vertex: taskPoint,
      };
      this.$nextTick(() => {
        moveToVertex(param).then((response) => {
          // 弹出提示
          self.$notify({
            title: self.$t('user.Success'),
            message: self.$t('map_config.task_perform_success_tip'),
            type: 'success',
            duration: 1000,
          });
        });
      });
      self.move_car_visible = false;
    },
    setAgvSelected: function(item) {
      var self = this;
      let sv = document.getElementById('sv');
      let svg = d3.select('#sv');
      // svg画布的可视化区域
      let visualArea = sv.getBoundingClientRect();
      if (item && typeof item.index == 'number') {
        this.selectedCarNum = item.index;
        let carArr = this.carInfo;
        for (let i = 0, carArrLength = carArr.length; i < carArrLength; i++) {
          if (carArr[i].Index == item.index) {
            if (self.animateObjs.length) {
              for (let j = 0, len = self.animateObjs.length; j < len; j++) {
                self.animateObjs[j].beginElement();
              }
            }
            // 所单击的卡片小车的位置的偏移量及地图页面的平移到可视页面的中心点
            self.groupLeft = visualArea.width - carArr[i].X * self.scaleK;
            self.groupTop = visualArea.height - carArr[i].Y * self.scaleK;
            svg.call(
              self.zoom.transform,
              d3.zoomIdentity
                .translate(self.groupLeft, self.groupTop)
                .scale(self.scaleK)
            );
          }
        }
      }
    },
    showAgvState(item) {
      if (typeof item.index == 'number') {
        this.carIndex = item.index;
      }
    },
    openContextMenu(e) {
      e.preventDefault(); //防止默认菜单弹出
      this.contextMenuVisible = true;
      this.left = e.clientX - 200;
      this.top = e.clientY + 5;
    },
    context() {
      var cirArr = document.getElementsByTagNameNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      for (let i = 0, cirArrLen = cirArr.length; i < cirArrLen; i++) {
        cirArr[i].addEventListener('contextmenu', this.openContextMenu);
      }
    },
    // 关闭contextMenu
    closeContextMenu() {
      this.contextMenuVisible = false;
    },
    show_car_config() {
      this.config_car_visible = true;
    },
    move_car_config() {
      this.move_car_visible = true;
    },
    cancel() {
      this.config_car_visible = false;
      this.move_car_visible = false;
    },
    treeNodeClick(node) {
      let sv = document.getElementById('sv');
      let svg = d3.select('#sv');
      // svg画布的可视化区域
      let visualArea = sv.getBoundingClientRect();
      let fakeRadar = [];
      const { naviCarOne, naviCarTwo } = this;
      const carArr = [...naviCarOne, ...naviCarTwo];

      carArr.forEach((item) => {
        if (node.id === item.index) {
          let radarObj = {
            x: item.x,
            y: item.y,
          };
          fakeRadar.push(radarObj);
          // 所单击的卡片小车的位置的偏移量及地图页面的平移到可视页面的中心点
          this.$root.mapOriginX = visualArea.width - item.x * this.scaleK;
          this.$root.mapOriginY = visualArea.height - item.y * this.scaleK;
          svg.call(
            this.zoom.transform,
            d3.zoomIdentity
              .translate(this.$root.mapOriginX, this.$root.mapOriginY)
              .scale(this.scaleK)
          );
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.map-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.bgdimg{
  background-image: url('../../assets/img/suidao.png');
  background-size:100% ;
  background-repeat: no-repeat;

}
.el-header,
.el-footer {
 
  color: #fff;
  padding: 0;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
  height: 800px;
}
.agv_info {
  width: 200px;
  height: 40px;
  line-height: 40px;
}
.aside_scroll {
  height: 100%;
}
.aside_scroll .el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-main {
  background-color: inherit;
  text-align: left;
  padding: 4px;
  overflow: hidden;

}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.contextmenu {
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
}
.contextmenu li {
  margin: 0;
  padding: 0px 22px;
}
.contextmenu li:hover {
  background: #f2f2f2;
  cursor: pointer;
}
.contextmenu li button {
  color: #2c3e50;
}

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
  flex: 1;
  > .el-row {
    height: 100%;
    > .el-col {
      height: 100%;
    }
  }
  .selectAdvice {
    height: 100%;
    background: rgba(9, 86, 158, 0.2);
    padding: 10px;
    .cearchAdvice {
      margin-bottom: 10px;
      padding: 4px 6px;
      >>> .el-input__inner {
        background: rgba(16, 74, 182, 0);
        color: #e1ecf1;
      }
    }
    >>> .el-tree {
      background: transparent;
      color: #e1ecf1;
      .el-tree-node__label {
        font-size: 12px;
      }
      .el-tree-node__content:hover {
        background-color: #4069a7;
      }
      .el-tree-node:focus {
        background-color: #4069a7 !important;
      }
      .is-current {
        background-color: #4069a7 !important;
      }
      .el-tree-node:focus > .el-tree-node__content {
        background-color: #4069a7 !important;
      }
    }
  }
}
#sv {
  background: rgba(4, 141, 175, 0.5);
}
</style>
