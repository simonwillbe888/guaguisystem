<template>
  <div class="page">
    <div class="page-title">
      配置流程
<!--      <span class="right-btn" @click="$router.back()"-->
<!--        ><svg-icon icon-class="fanhui"-->
<!--      /></span>-->
    </div>

    <el-container class="page-container">
      <el-aside class="page-left">
        <div style="border-radius: 15px;background-color: #7f93a6;height: 26rem">
          <el-tree
            :data="templateList"
            :props="templateList"
            :default-expand-all="true"
            @node-click=""></el-tree>
        </div>
<!--        <el-collapse v-model="activeName" accordion>-->
<!--          <el-collapse-item title="任务模板列表" name="1">-->
<!--            <div-->
<!--              class="list-item oneLine"-->
<!--              v-for="item in templateList"-->
<!--              :key="item.id"-->
<!--            >-->
<!--              模板ID：{{ item.id }}-->
<!--              <span style="margin-left: 5px"-->
<!--                >模板名称：{{ item.taskName }}</span-->
<!--              >-->
<!--            </div>-->
<!--          </el-collapse-item>-->
<!--        </el-collapse>-->
        <el-tag class="header-label" style="margin-bottom:10px">动作</el-tag>
        <el-scrollbar>
          <el-button
            class="common-btn comp"
            icon="el-icon-rank"
            plain
            @click="operateRobotic()"
            >移动</el-button
          >
          <el-button
            class="common-btn comp"
            icon="el-icon-camera"
            plain
            @click="operateThermalCame()"
          >拍照</el-button
          >
          <el-button
            class="common-btn comp"
            icon="el-icon-video-camera-solid"
            plain
            @click="operateCamera()"
          >录像</el-button
          >
          <!-- <el-button
            class="common-btn comp"
            icon="el-icon-connection"
            plain
            @click="operateInfrar()"
            >红外检测</el-button
          > -->
          <el-button
            class="common-btn comp"
            icon="el-icon-connection"
            plain
            @click="operateFire()"
            >语音播报</el-button
          >
          <!-- <el-tag class="next-header">移动</el-tag> -->
        </el-scrollbar>
      </el-aside>
      <el-main class="page-main">
        <el-tag class="header-label"
          >{{ $t('process_config.action_list') }}

          <el-button
            size="small"
            style="background-color:#64C8C8 ;color:#fff;float: right;margin-left: 1rem; margin-top: 10px;font-size: 20px"
            @click="$router.back()">
            <svg-icon icon-class="goback" />
            返回
          </el-button>

          <el-button
            size="small"
            style="background-color:#64C8C8 ;color:#fff;float: right; margin-top: 10px;font-size: 20px"
            @click="saveTemplate">
            <svg-icon icon-class="save" />
            保存
          </el-button>

        </el-tag>

        <el-scrollbar>
          <div
            v-for="(item, index) in actionsList"
            :key="item.id"
            style="margin: 15px;height: 2.5rem; background: rgba(255,255,255,0.8); position: relative; display: flex;border-radius: 5px;align-items: center;"
          >
            <!-- <div class="act-icon">
              <i class="el-icon-info"></i>
            </div> -->
            <div style="flex:1;">
              <div style="width:50%;padding-left: 2.5rem;color: #000000;font-size: 18px;">
                <el-descriptions>
                  <el-descriptions-item style="margin-left:40px ;" label="名称">{{
                    taskName(item.type)
                  }}</el-descriptions-item>
                  <el-descriptions-item label="顺序">{{
                    item.sequence
                  }}</el-descriptions-item>
                  <el-descriptions-item label="巡检点">{{
                    showInfo(item.locationID)
                  }}</el-descriptions-item>
                </el-descriptions>
              </div>
            </div>
            <div
              style="
                display: inline-block;
                float: right;
                height: 32px;
                line-height: 32px;
                margin-right: 1rem;
              "
            >
              <el-button
                class="edit-btn"
                icon="el-icon-edit"
                size="mini"
                plain
                @click="editParam(item, index)"
                >修改</el-button
              >
              <el-button
                class="delete-btn"
                icon="el-icon-delete"
                size="mini"
                plain
                @click="deleteParam(index)"
                >删除</el-button
              >
            </div>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
    <!-- 所有弹窗展示页面 -->
    <el-dialog
      :title="sonTemplateDialogTitle"
      :visible.sync="sonTemplateDialogVisible"
      :close-on-click-modal="false"
    >
      <div class="common-tip">配置子模版</div>
      <div class="common-sty">
        <span style="margin: 10px 0; display: inline-block">参数类型</span
        ><br />
        <div class="form-sty">
          <el-form
            label-width="80px"
            :model="sonTemplateForm"
            ref="sonTemplateForm"
            :rules="sonTemplateRules"
          >
            <!-- <el-form-item label="模式" prop="mode">
              <el-radio-group v-model="sonTemplateForm.mode">
                <el-radio :label="1">串行</el-radio>
                <el-radio :label="0">并行</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="顺序" prop="sequence">
              <el-input
                oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
                v-model.number="sonTemplateForm.sequence"
              ></el-input>
              <!-- <el-input-number
                style="width:200px"
                size="mini"
                :min="1"
                :step="1"
                step-strictly
                v-model.number="sonTemplateForm.sequence"
              ></el-input-number> -->
            </el-form-item>
            <!-- <el-form-item label="巡检点" prop="locationID">
              <el-select
                v-model="sonTemplateForm.locationID"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in patrolLocationList"
                  :key="item.LocationID"
                  :label="item.Name"
                  :value="item.LocationID"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sonTemplateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAction(1, 'sonTemplateForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :title="
        dialogTitle == '录像'
          ? $t('inspection_setting.plus_video_label')
          : $t('inspection_setting.edit_video_label')
      "
      :visible.sync="cameraDialogVisible"
      :close-on-click-modal="false"
    >
      <!-- <div class="common-tip">
        预置点通过在浏览器中输入摄像头IP可登陆摄像头管理系统，查看摄像头预置点ID
      </div> -->
      <div class="common-sty">
        <!-- <span style="margin: 10px 0; display: inline-block">参数类型</span
        ><br /> -->
        <div class="form-sty" v-if="cameraVal == '1' ? true : false">
          <el-form
            label-width="120px"
            :model="videoForm"
            ref="videoForm"
            :rules="videoRules"
          >
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="录像时长(秒)" prop="duration">
              <el-input
                oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
                v-model.number="videoForm.duration"
              ></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="顺序" prop="sequence">
              <el-input
                oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
                v-model.number="videoForm.sequence"
              ></el-input>
            </el-form-item>
            </el-col>
          </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="水平角度(0~360)" prop="yunPAngle">
                <el-input
                v-model.number="videoForm.yunPAngle"
                ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- oninput="if(value.length==1){value=value.replace(/[^1-360]/g,'')}else{value=value.replace(/\D/g,'')}" -->
                <el-form-item label="垂直角度(-90~90)" prop="yunTAngle">
                <el-input
                v-model.number="videoForm.yunTAngle"
              ></el-input>
              </el-form-item>
               </el-col>
             </el-row>

            <el-form-item label="巡检点" prop="locationID">
              <el-select
                clearable
                v-model="videoForm.locationID"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in patrolLocationList"
                  :key="item.locationID"
                  :label="item.name"
                  :value="item.locationID"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cameraDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAction(2, 'videoForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :title="dialogTitle == '拍照' ? '新增拍照' : '修改拍照'"
      :visible.sync="thermalCameDialogVisible"
      :close-on-click-modal="false"
    >
      <!-- <div class="common-tip">
        预置点通过在浏览器中输入摄像头IP可登陆摄像头管理系统，查看摄像头预置点ID
      </div> -->
      <div class="common-sty">
        <span style="margin: 0.7vh 0; display: inline-block">参数类型</span
        ><br />
        <div class="form-sty" v-if="cameraVal == '1' ? true : false">
          <el-form
            label-width="110px"
            ref="photoForm"
            :model="photoForm"
            :rules="photoRules"
          >

            <el-row :gutter="10">
             <el-col :span="12">
              <el-form-item label="拍照数量" prop="count">
              <el-input
                oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
                v-model.number="photoForm.count"
              ></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="12">
              <el-form-item label="采集频率(秒)" prop="frequency">
               <el-input
                oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
                v-model.number="photoForm.frequency"
               ></el-input>
              </el-form-item>
            </el-col>
            </el-row>


             <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="水平角度(0~360)" prop="yunPAngle">
                <el-input
                v-model.number="photoForm.yunPAngle"
                ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="垂直角度(-90~90)" prop="yunTAngle">
                <el-input
                v-model.number="photoForm.yunTAngle"
              ></el-input>
              </el-form-item>
               </el-col>
             </el-row>
             <el-row :gutter="10">
               <el-col :span="12">
                <el-form-item label="顺序" prop="sequence">
                  <el-input
                 oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
                 v-model.number="photoForm.sequence"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="巡检点" prop="locationID">
              <el-select
                clearable
                v-model="photoForm.locationID"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in patrolLocationList"
                  :key="item.locationID"
                  :label="item.name"
                  :value="item.locationID"
                >
                </el-option>
              </el-select>
            </el-form-item>
            </el-col>
             </el-row>

          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="thermalCameDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAction(3, 'photoForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :title="dialogTitle == '移动' ? '新增移动' : '修改移动'"
      :visible.sync="roboticDialogVisible"
      :close-on-click-modal="false"
      center

    >
      <div class="common-photo" style="width: 25vw;">
        <el-form
          label-width="80px"
          ref="moveForm"
          :model="moveForm"
          :rules="moveRules"
        >
          <el-form-item label="目标点" prop="toPatrolLocation">
            <el-radio-group v-model="moveForm.toPatrolLocation">
              <el-radio :label="true">移动到巡检点</el-radio>
              <el-radio :label="false">移动到导航点</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="顺序" prop="sequence">
            <el-input
              oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
              v-model.number="moveForm.sequence" style="width:13vw"
            ></el-input>

          </el-form-item>
          <el-form-item
            label="导航点"
            v-if="!moveForm.toPatrolLocation"
            prop="vertexID"
          >
            <el-select
              class="access-select"
              v-model="moveForm.vertexID"
              filterable
              clearable

            >
                   <el-option
                  v-for="item in patrolLocationList"
                  :key="item.locationID"
                  :label="item.vertexID"
                  :value="item.locationID"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="moveForm.toPatrolLocation"
            label="巡检点"
            prop="locationID"
          >
            <el-select
              clearable
              v-model="moveForm.locationID"
              placeholder="请选择"
              style="width:15vw"
            >
              <el-option
                v-for="item in patrolLocationList"
                :key="item.locationID"
                :label="item.name"
                :value="item.locationID"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="播报内容"
            prop="voiceBroadcastText"
          >
            <el-input v-model.trim="moveForm.voiceBroadcastText">

            </el-input>
          </el-form-item>

        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roboticDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAction(4, 'moveForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :title="dialogType == 'addInfra' ? '新增红外检测' : '修改红外检测'"
      :visible.sync="infraDialogVisible"
      :close-on-click-modal="false"
    >
      <div class="common-photo">
        <el-form
          label-width="80px"
          ref="infraForm"
          :model="infraForm"
          :rules="infraRules"
        >

          <el-form-item label="时长(秒)" prop="duration">
            <el-input
              oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
              v-model.number="infraForm.duration"
            ></el-input>
          </el-form-item>

          <el-form-item label="顺序" prop="sequence">
            <el-input
              oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
              v-model.number="infraForm.sequence"
            ></el-input>

          </el-form-item>
          <el-form-item label="巡检点" prop="locationID">
            <el-select
              clearable
              v-model="infraForm.locationID"
              placeholder="请选择"
            >
              <el-option
                v-for="item in patrolLocationList"
                :key="item.locationID"
                :label="item.name"
                :value="item.locationID"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infraDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAction(5, 'infraForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :title="dialogFire == 'addFire' ? '新增语音播报' : '修改语音播报'"
      :visible.sync="fireDialogVisible"
      :close-on-click-modal="false"
    >
      <div class="common-photo" style=" margin: auto;">
        <el-form
          label-width="10vw"
          ref="broadcast"
          :model="broadcast"
          :rules="fireRules"
        >

        <el-row :gutter="10">
           <el-col :span="12">
            <el-form-item label="播报内容" prop="readText">
            <el-input
              v-model.number="broadcast.readText"
            ></el-input>
          </el-form-item>

           </el-col>
           <el-col :span="12">
            <el-form-item label="播报音量(0~100)" prop="volume">
            <el-input
              v-model.number="broadcast.volume"
            ></el-input>
          </el-form-item>
           </el-col>
        </el-row>
        <el-row :gutter="10">
           <el-col :span="12">
            <el-form-item label="播报速度(-10~10)" prop="rate">
            <!-- oninput="if(value.length==1){value=value.replace(/[^-10-10]/g,'')}else{value=value.replace(/\D/g,'')}" -->
            <el-input

              v-model.number="broadcast.rate"
            ></el-input>
          </el-form-item>

           </el-col>
           <el-col :span="12">

          <el-form-item label="执行顺序" prop="sequence">
            <el-input
              v-model.number="broadcast.sequence"
            ></el-input>
          </el-form-item>
           </el-col>
        </el-row>
        <el-row :gutter="10">
           <el-col :span="12">
            <el-form-item label="播报次数" prop="count">
            <el-input
              oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
              v-model.number="broadcast.count"
            ></el-input>
          </el-form-item>
           </el-col>
           <el-col :span="12">

          <el-form-item label="巡检点" prop="locationID">
            <el-select
              clearable
              v-model="broadcast.locationID"
              placeholder="请选择"
            >
              <el-option
                v-for="item in patrolLocationList"
                :key="item.locationID"
                :label="item.name"
                :value="item.locationID"
              >
              </el-option>
            </el-select>
          </el-form-item>
           </el-col>
        </el-row>



        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fireDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAction(6, 'broadcast')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllPatrolLocation,
  getPatrolTemplates,
  getAllPatrolTemplate,
  UpdatePatrolTemplates,
} from '@/api/taskConfig';
import { getPatrolPointListByAreaId} from '@/api/map.js'
import { getMapData } from '@/api/map.js';

export default {
  data() {
    return {
      dialogTitle: '',
      lightDialogVisible: false,
      lightVal: true,
      cameraDialogVisible: false,
      cloudDialogVisible: false,
      thermalCameDialogVisible: false,
      roboticDialogVisible: false,
      editDialogVisible: false,
      sonTemplateDialogVisible: false,
      cameraVal: '1',
      measureTemp: '',
      presetVal: '',
      videoForm: {
        duration: 1,
        presetNo: '',
        pAngle: '',
        tAngle: '',
        zAngle: '',
        p: '',
        pSpeed: 0,
        t: '',
        tSpeed: 0,
        z: '',
        zSpeed: 0,
        sequence: 1,
        mode: 1,
        yunPAngle:null,
        yunTAngle:null,
      },
      videoRules: {
        duration: [
          {
            required: true,
            message: '请输入时长',
            trigger: 'change',
          },
        ],
        sequence: [
          {
            required: true,
            message: '请输入顺序',
            trigger: 'change',
          },
        ],
        yunPAngle:[
          
        { validator: this.validateYunPAngle, trigger: 'blur' }
        ],
        yunTAngle:[
        { validator: this.validateYunTAngle, trigger: 'blur' }

        ],
        presetNo: [
          {
            required: true,
            message: '请输入预置点',
            trigger: 'change',
          },
        ],
        locationID: [
          {
            required: true,
            message: '请选择巡检点',
            trigger: 'change',
          },
        ],
      },
      pointOptions: [],
      photoForm: {
        count: 1,
        frequency: 1,
        sequence: 1,
        presetNo: '',
        p: '',
        t: '',
        z: '',
        mode: 1,
        yunPAngle:0,
        yunTAngle:0,
      },
      photoRules: {
        count: [
          {
            required: true,
            message: '请输入拍照数量',
            trigger: 'change',
          },
        ],
        frequency: [
          {
            required: true,
            message: '请输入拍照频率',
            trigger: 'change',
          },
        ],
        sequence: [
          {
            required: true,
            message: '请输入顺序',
            trigger: 'change',
          },
        ],
        yunPAngle:[
        { validator: this.validateYunPAngle, trigger: 'blur' }
        ],
        yunTAngle:[
        { validator: this.validateYunTAngle, trigger: 'blur' }

        ],
        presetNo: [
          {
            required: true,
            message: '请输入预置点',
            trigger: 'change',
          },
        ],
        locationID: [
          {
            required: true,
            message: '请选择巡检点',
            trigger: 'change',
          },
        ],
      },
      sonTemplateForm: {
        mode: 1,
        sequence: 1,
      },
      sonTemplateRules: {
        sequence: [
          {
            required: true,
            message: '请输入顺序',
            trigger: 'change',
          },
        ],
      },
      joint1: 50,
      joint2: 50,
      joint3: 50,
      actionsList: [],
      moveForm: {
        toPatrolLocation: true,
        point: '',
        sequence: 1,
        mode: 1,
        vertexID: '',
      },
      moveRules: {
        vertexID: [
          {
            required: true,
            message: '请输选择导航点',
            trigger: 'change',
          },
        ],
        sequence: [
          {
            required: true,
            message: '请输入顺序',
            trigger: 'change',
          },
        ],
        locationID: [
          {
            required: true,
            message: '请选择巡检点',
            trigger: 'change',
          },
        ],
      },
      ID: 0,
      infraDialogVisible: false,
      dialogType: '',
      infraForm: {
        duration: 1,
        presetNo: '',
        sequence: 1,
        mode: 1,
      },
      infraRules: {
        duration: [
          {
            required: true,
            message: '请输入时长',
            trigger: 'change',
          },
        ],
        sequence: [
          {
            required: true,
            message: '请输入顺序',
            trigger: 'change',
          },
        ],
        presetNo: [
          {
            required: true,
            message: '请输入预置点',
            trigger: 'change',
          },
        ],
        locationID: [
          {
            required: true,
            message: '请选择巡检点',
            trigger: 'change',
          },
        ],
      },
      fireDialogVisible: false,
      dialogFire: '',
      broadcast: {
        readText: null,
        volume: 0,
        rate:0,
        count:0,
        sequence: 1,
        mode: 1,
      },
      fireRules: {
        readText: [
          {
            required: true,
            message: '请输入内容',
            trigger: 'change',
          },
        ],
        rate: [
          {
            required: true,
            message: '请输入播报速度',
            trigger: 'change',
          },
          { validator: this.validateRate, trigger: 'blur' },

        ],
        count: [
          {
            required: true,
            message: '请输入播报次数',
            trigger: 'change',
          },
        ],
        sequence: [
          {
            required: true,
            message: '请输入顺序',
            trigger: 'change',
          },
        ],
        volume: [
          {
            required: true,
            message: '请输入播报音量',
            trigger: 'change',
          },
          { validator: this.validateVolume, trigger: 'blur' },

        ],
        locationID: [
          {
            required: true,
            message: '请选择巡检点',
            trigger: 'change',
          },
        ],
      },
      activeName: '1',
      templateList: [{id:0,label: '任务模板列表',children:[]}],
      patrolLocationList: [],
      sonTemplateDialogTitle: '',
    };
  },
  computed:{

  },
  mounted() {
    this.getAllTemplate();
    this.getTemplates();
    this.getAllPatrolLocationList();
    this.initInspectOpt();
    this.$nextTick(()=>{
      const menuItems = document.querySelectorAll('.el-menu-item');
      menuItems.forEach(menuItem => {
        if (menuItem.querySelector('span').textContent == '巡检流程配置') {
          menuItem.classList.toggle('is-active')
          menuItem.style = 'color: rgb(100, 200, 200); border-bottom-color: rgb(100, 200, 200); background-color: rgb(3, 27, 49);'
        }
      });
    })
  },
  beforeDestroy() {
    // console.log('route',this.$route.path)
    if(this.$route.path != '/taskConfig/processTask'){
      this.$nextTick(()=>{
        const menuItems = document.querySelectorAll('.el-menu-item');
        menuItems.forEach(menuItem => {
          if (menuItem.querySelector('span').textContent == '巡检流程配置') {
            menuItem.classList.toggle('is-active')
            menuItem.style = 'color: rgb(255, 255, 255); border-bottom-color: transparent; background-color: rgb(3, 27, 49);'
          }
        });
      })
    }

  },
  methods: {
    initInspectOpt() {
      let self = this;
      self.actionsList = [];
      self.pointOptions = [];
      getMapData()
        .then((response) => {
          console.log('导航点编号',response)
          let jsonData = response.data;
          if (jsonData) {
            let pointArr = jsonData.vertexs;
            for (let i = 0, len = pointArr.length; i < len; i++) {
              let optionObj = {
                value: pointArr[i].number,
                label: pointArr[i].number,
              };
              self.pointOptions.push(optionObj);
            }
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
    taskName(val) {
      switch (val) {
        case 1:
          return '拍照';
          break;
        case 2:
          return '录像';
          break;
        case 7:
          return '移动';
          break;
        case 8:
          return '红外检测';
          break;
        case 12:
          return '火点检测';
          break;
          case 14:
            return '语音播报';
            break;
        case 65535:
          return '子模版';
          break;
      }
    },
    taskType(val) {},
    async getAllPatrolLocationList() {
      // try {
      const res = await getPatrolPointListByAreaId(this.$route.query.areaId);
      console.log('当前区域的巡检点',res)
      if (res.code === 20000) {
        res.data.forEach((element)=>{
          this.patrolLocationList.push(element)
        })
      }
      
      // } catch (error) {}
    },
    async getAllTemplate() {
      const { id } = this.$route.query;
      // try {
      const res = await getAllPatrolTemplate();
      if (res.code === 20000) {
        let arr = res.data;
        if (arr && arr.length) {
          // this.templateList = arr.filter((item) => item.id != id) || [];
          arr.forEach(i => {
            this.templateList[0].children.push({
              label: '任务ID:'+i.id+'  模板名称:'+i.taskName
            })
          })
        }
      }
      // } catch (error) {}
    },
    async getTemplates() {
      const { id } = this.$route.query;
      // try {
      const res = await getPatrolTemplates({
        id,
      });
      console.log('查看id',id)
      if (res.code === 20000) {
        this.actionsList = res.data || [];
        console.log('查看已添加的',this.actionsList)
      }
      // } catch (error) {}
    },
    addSonTemplate() {
      this.sonTemplateDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.sonTemplateForm.clearValidate();
      });
      this.sonTemplateDialogTitle = '新增子模版';
      this.sonTemplateForm.isEdite = false;
    },
    operateLight() {
      this.dialogTitle = '补光灯';
      this.lightDialogVisible = true;
    },
    operateCamera() {
      this.dialogTitle = '录像';
      this.cameraDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.videoForm.clearValidate();
      });
      this.videoForm = {
        presetNo: 1,
      };
      this.videoForm.isEdite = false;
    },
    operateCloud() {
      this.dialogTitle = '云台';
      this.cloudDialogVisible = true;
    },
    operateThermalCame() {
      this.dialogTitle = '拍照';
      this.thermalCameDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.photoForm.clearValidate();
      });
      this.photoForm = {
        presetNo: 1,
      };
      this.photoForm.isEdite = false;
    },
    operateRobotic() {
      this.dialogTitle = '移动';
      this.roboticDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.moveForm.clearValidate();
      });
      this.moveForm = {
        toPatrolLocation: true,
        isEdite: false,
      };
    },
    operateInfrar() {
      this.dialogType = 'addInfra';
      this.infraDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.infraForm.clearValidate();
      });
      this.infraForm = {
        isEdite: false,
        presetNo: 1,
      };
    },
    //语音播报
    operateFire() {
      this.dialogFire = 'addFire';
      this.fireDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.broadcast.clearValidate();
      });
      this.broadcast = {
        isEdite: false,
        presetNo: 1,
      };
    },
    compare(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    addAction(obj, formName) {
      const {
        sonTemplateForm,
        videoForm,
        moveForm,
        photoForm,
        infraForm,
        broadcast,
      } = this;
      const { id } = this.$route.query;
      let valid = false;
      switch (obj) {
        case 1:
          this.$refs.sonTemplateForm.validate((status) => {
            valid = status;
          });
          if (!valid) return;
          if (sonTemplateForm.isEdite) {
            this.actionsList.splice(sonTemplateForm.index, 1);
          }
          this.actionsList.push({
            // id,
            objId: Date.now(),
            type: 65535,
            taskTemplateID: id,
            mode: 1,
            presetNo: Number(videoForm.presetNo),
            sequence: Number(sonTemplateForm.sequence),
            // locationID: sonTemplateForm.locationID || 0,
          });

          this.sonTemplateDialogVisible = false;
          break;
        case 2:
          this.$refs.videoForm.validate((status) => {
            valid = status;
          });
          if (!valid) return;
          if (videoForm.isEdite) {
            this.actionsList.splice(videoForm.index, 1);
          }
          this.actionsList.push({
            // id,
            locationID: videoForm.locationID || 0,
            objId: Date.now(),
            type: 2,
            taskTemplateID: id,
            mode:1,
            sequence: Number(videoForm.sequence),
            duration: Number(videoForm.duration),
            presetNo: Number(videoForm.presetNo),
            yunTAngle:Number(videoForm.yunTAngle),
            yunPAngle:Number(videoForm.yunPAngle),
          });
          this.cameraDialogVisible = false;
          break;
        case 3:

          this.$refs.photoForm.validate((status) => {
            valid = status;
          });
          if (!valid) return;
          if (photoForm.isEdite) {
            this.actionsList.splice(photoForm.index, 1);
          }
          this.actionsList.push({
            // id,
            locationID: photoForm.locationID || 0,
            objId: Date.now(),
            type: 1,
            taskTemplateID: id,
            mode: 1,
            sequence: Number(photoForm.sequence),
            frequency: Number(photoForm.frequency),
            count: Number(photoForm.count),
            presetNo: Number(photoForm.presetNo),
            yunPAngle:Number(photoForm.yunPAngle),
            yunTAngle:Number(photoForm.yunTAngle),
          });
          this.thermalCameDialogVisible = false;
          break;
        case 4:
          this.$refs.moveForm.validate((status) => {
            valid = status;
          });
          if (!valid) return;
          if (moveForm.isEdite) {
            this.actionsList.splice(moveForm.index, 1);
          }
          this.actionsList.push({
            // id,
            locationID: moveForm.locationID,
            objId: Date.now(),
            type: 7,
            toPatrolLocation: moveForm.toPatrolLocation,
            taskTemplateID: id,
            vertexID: moveForm.vertexID || -1,
            mode: 1,
            sequence: Number(moveForm.sequence),
            voiceBroadcastText:moveForm.voiceBroadcastText
          });
          this.roboticDialogVisible = false;
          break;
        case 5:
          this.$refs.infraForm.validate((status) => {
            valid = status;
          });
          if (!valid) return;
          if (infraForm.isEdite) {
            this.actionsList.splice(infraForm.index, 1);
          }
          this.actionsList.push({
            // id,
            locationID: infraForm.locationID || 0,
            objId: Date.now(),
            type: 8,
            taskTemplateID: id,
            mode: 1,
            duration: Number(infraForm.duration),
            presetNo: Number(infraForm.presetNo),
            sequence: Number(infraForm.sequence),
          });
          this.infraDialogVisible = false;
          break;
        case 6:
          this.$refs.broadcast.validate((status) => {
            valid = status;
          });
          if (!valid) return;
          if (broadcast.isEdite) {
            this.actionsList.splice(broadcast.index, 1);
          }
          this.actionsList.push({
            // id,
            locationID: broadcast.locationID || 0,
            objId: Date.now(),
            type: 14,
            taskTemplateID: id,
            mode: 1,
            readText:broadcast.readText,
            volume:Number(broadcast.volume) ,
            count:Number(broadcast.count) ,
            rate:Number(broadcast.rate) ,
            duration: Number(broadcast.duration),
            presetNo: Number(broadcast.presetNo),

            sequence: Number(broadcast.sequence),
          });
          this.fireDialogVisible = false;
          break;
      }
      this.actionsList.sort((a, b) => {
        return a.sequence - b.sequence;
      });
      this.$refs[formName].resetFields();
    },
    editParam(obj, index) {
      this.ID = obj.id;
      if (obj.type === 2) {
        this.dialogTitle = '修改录像';
        this.cameraDialogVisible = true;
        this.$nextTick(() => {
          this.$refs.videoForm.clearValidate();
        });
        this.videoForm = {
          ...this.videoForm,
          ...obj,
          ...obj.operateObj,
          isEdite: true,
          index,
        };
        this.videoForm.yunTAngle = this.videoForm.yunTAngle
        this.videoForm.yunPAngle = this.videoForm.yunPAngle
      } else if (obj.type === 1) {
        this.dialogTitle = '修改拍照';
        this.thermalCameDialogVisible = true;
        this.$nextTick(() => {
          this.$refs.photoForm.clearValidate();
        });
        this.photoForm = {
          ...this.photoForm,
          ...obj,
          ...obj.operateObj,
          isEdite: true,
          index,
        };
        this.photoForm.yunTAngle = this.photoForm.yunTAngle
        this.photoForm.yunPAngle = this.photoForm.yunPAngle
      } else if (obj.type === 7) {
        this.dialogTitle = '修改移动';
        this.roboticDialogVisible = true;
        this.$nextTick(() => {
          this.$refs.moveForm.clearValidate();
        });
        this.moveForm = {
          ...this.moveForm,
          isEdite: true,
          ...obj,
          ...obj.operateObj,
          index,
        };
      } else if (obj.type === 8) {
        this.dialogType = 'editInfra';
        this.infraDialogVisible = true;
        this.$nextTick(() => {
          this.$refs.infraForm.clearValidate();
        });
        // console.log('cgw44444444444');
        this.infraForm = {
          ...this.infraForm,
          ...obj,
          ...obj.operateObj,
          isEdite: true,
          index,
        };
      } else if (obj.type === 14) {
        this.dialogFire = 'editFire';
        this.fireDialogVisible = true;
        this.$nextTick(() => {
          this.$refs.broadcast.clearValidate();
        });
        this.broadcast = {
          ...this.broadcast,
          ...obj,
          ...obj.operateObj,
          isEdite: true,
          index,
        };

      }
      else if (obj.type === 65535) {
        this.sonTemplateDialogTitle = '修改子模版';
        this.sonTemplateDialogVisible = true;
        this.$nextTick(() => {
          this.$refs.sonTemplateForm.clearValidate();
        });
        this.sonTemplateForm = {
          ...this.sonTemplateForm,
          ...obj,
          ...obj.operateObj,
          isEdite: true,
          index,
        };
      }
    },
    deleteParam(index) {
      this.actionsList.splice(index, 1);
      this.actionsList.sort((a, b) => {
        return a.sequence - b.sequence;
      });
      return;
    },
    async saveTemplate() {
      const { id } = this.$route.query;
      // try {
      const arr = this.actionsList.map((el) => {
        let obj = {};
        const item = {
          ...el,
          ...(el.operateObj || {}),
        };
        // console.log("查看保存状态",item)
        switch (item.type) {
          case 1:
            obj = {
              frequency:item.frequency,
              yunPAngle: item.yunPAngle,
              yunTAngle: item. yunTAngle,
              count:item.count,

            };
            break;
          case 2:
            obj = {
              duration: item.duration,
              yunPAngle: item.yunPAngle,
              yunTAngle: item. yunTAngle,
            };
            break;
          case 7:
            obj = {
              toPatrolLocation: item.toPatrolLocation,
              locationID: item.locationID || -1,
              vertexID: item.vertexID || -1,
              voiceBroadcastText:item.voiceBroadcastText||''
            };
            break;
          case 8:
            obj = {
              presetNo: item.presetNo,
              duration: item.duration,
            };
            break;
          case 12:
            obj = {
              presetNo: item.presetNo,
              duration: item.duration,
            };
            break;
          case 14:
            obj={
              readText:item.readText,
              volume:item.volume,
              rate:item.rate,
              count:item.count
            }
            break
          case 65535:
            obj = {
              taskTemplateID: item.taskTemplateID,
            };
            break;
        }
        item.operateJson = JSON.stringify(obj);
        return item;
      });
      let obj = {
        list: arr,
        taskTemplateID: id,
      };
      console.log('保存的参数',this.$route.query)
      const res = await UpdatePatrolTemplates(obj);
      if (res.code === 20000) {
        console.log('保存参数',obj)
        this.$notify({
          message: '保存成功',
          type: 'success',
          title: '提示',
          duration: 1000,
        });
        this.$router.back();
      }
      // console.log(res)
      // } catch (error) {}
    },
    showInfo(val) {
      if (!val || !this.patrolLocationList.length){
        return;
      } 
      let txt = '';
      this.patrolLocationList.forEach((item) => {
        if (item.locationID == val) {
          txt = item.mapDisplayName;
        }
      });
      return  txt;
    },
    //校验规则
    validateVolume(rule, value, callback) {
      const volume = Number(value);
      if (isNaN(volume) || volume < 0 || volume > 100) {
        callback(new Error('音量范围为0~100'));
      } else {
        callback();
      }
    },
    validateRate(rule, value, callback) {
      const volume = Number(value);
      if (isNaN(volume) || volume < -10 || volume > 10) {
        callback(new Error('音量范围为-10~10'));
      } else {
        callback();
      }
    },
    
    validateYunPAngle(rule, value, callback) {
      const volume = Number(value);
      if (isNaN(volume) || volume < 0 || volume > 360) {
        callback(new Error('水平角度为0~360'));
      } else {
        callback();
      }
    },
    validateYunTAngle(rule, value, callback) {
      const volume = Number(value);
      if (isNaN(volume) || volume < -90 || volume > 90) {
        callback(new Error('垂直角度为-90~90'));
      } else {
        callback();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background: rgb(6,30,51);
  .page-title {
    line-height: 28px;
    font-size: 13px;
    font-weight: 700;
    color: rgb(243, 239, 239);
    padding-left: 15px;
    //background: rgb(46, 80, 104);
    // border-bottom: 1px solid rgb(4, 114, 141);
    z-index: 99;
    //box-shadow: 0 2px 6px 0 rgba(209, 207, 207, 0.1);
    .right-btn {
      float: right;
      margin-right: 10px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .page-container {
    // padding: 10px;
    // min-height: calc(100vh - 123px);
    .page-left {
      opacity: 0.7;
      font-size: initial;
      // margin-right: 10px;
      background: transparent;
      padding: 10px;
      width: 24rem !important;
      .el-collapse {
        margin-bottom: 10px;
        border-bottom: none;
        border-top: none;

        ::v-deep .el-collapse-item__wrap{
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }

        ::v-deep .el-collapse-item__header {
          height: 30px;
          line-height: 30px;
          padding-left: 20px;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          border-top: none;
        }
        ::v-deep .el-collapse-item__content {
        border-radius: 15px;
          padding: 10px;
          height: 43vh;
          overflow-y: scroll;
          .list-item {
            padding: 0.3125rem;
            padding-left: 1.25rem;
            font-size: 0.75rem;
            background: #fff;
            border-radius: 4px;
            width: 100%;
            cursor: pointer;
            &:hover {
              //background: rgba(69, 173, 243, 0.2);
            }
          }
        }
      }
    }
    .page-main {
      opacity: 0.7;
      .header-label {
        border-radius: 0;
        line-height: 40px;
        height: 40px;
        //background: rgba(43, 69, 125, 0.3);
      }
    }
  }
}
>>> .el-dialog__body {
  padding: 10px;
  margin-left: 0 !important;
}

.dialog-footer {
  //   margin-top: 20px;
  text-align: center;
}

.header-label {
  width: 100%;
  height: 34px;
  line-height: 34px;
  background-color: transparent;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: bold;
  border: none;
  // margin-bottom: 10px;
}

.next-header {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: rgba(51, 59, 180, 0.5);
  color: rgba(229, 255, 255, 0.8);
  font-size: 12px;
  border: none;
  margin: 10px 0px;
}

.el-main {
  padding: 0;
}

.common-btn {
  width: 100%;
  margin: 5px 0;
  height: 2rem;
  text-align: left;
  color: black;
  font-size: 12px;
}

.comp {
  background-color: #b3bfca;
}

.file {
  background-color: lightskyblue;
}

.move {
  background-color: lightgreen;
}

.logic {
  background-color: lightcoral;
}

.other {
  background-color: lightseagreen;
}

.common-tip {
  background-color: lightgreen;
  padding: 10px;
  font-size: 12px;
  color: black;
  margin-top: 0;
  margin-bottom: 10px;
  border-left: 2px solid blue;
}

.common-sty {
  font-size: 0.8vh;
    margin: auto;
  ::v-deep .el-input {
   width: 13vw;

  }
  .common-slider {
    width: 200px;
    margin-left: 76px;
  }

  .form-sty {
    text-align: left;

  }
}

.common-photo {
  font-size: 0.8vw;
  margin: auto;

  //   text-align: center;


  ::v-deep  .el-input {
    width: 13vw;
  }
}

.el-radio {
  color: rgb(230, 255, 255);
}

>>> .el-radio__label {
  font-size: 12px;
}

.demonstration {
  display: inherit;
}

.el-input {
  font-size: 12px;
}

.el-button {
  padding: 4px 20px;
}

.edit-btn {
  background-color: #64C8C8;
  color: #fff;
  margin: 3px 0;
  text-align: left;
  font-size: 15px;
}

.delete-btn {
  background-color: red;
  margin: 3px 0;
  text-align: left;
  color: #fff;
  font-size: 15px;
}

.act-icon {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  font-size: 16px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  vertical-align: middle;
  background-color: lightblue;
  // margin-top: -46px;
  position: relative;
}

>>> .el-dialog {
  width: 540px;
}

.aside_scroll {
  height: 100%;
}

.aside_scroll .el-scrollbar__wrap {
  overflow-x: hidden;
}
>>> .el-dialog__footer {
  //   padding: 0px !important;
  //   padding-bottom: 20px;
  .el-button {
    background: #565f65;
    border-color: #2e3235;
    margin-left: 10px;
    color: #fff;
    padding: 7px 15px !important;
  }
}
::v-deep .el-descriptions__body{
  background-color: transparent;
}

::v-deep .el-descriptions-item {
  padding-bottom: 0 !important;
  font-size: 1rem !important;
  line-height: 32px !important;
}
::v-deep  .el-input__inner
 {
  height: 1.875rem;
  background-color: transparent;
  color: #fff;
}

::v-deep .el-tree{
  top: 1rem;
  background: transparent;
}

::v-deep .el-tree-node__content{
  background-color: transparent;
  color: #000000;
}

</style>
