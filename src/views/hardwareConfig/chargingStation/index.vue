<template>
  <div style=" background: rgb(6,30,51);">
    <div>
      <div class="content-header">
        <el-button type="primary" icon="el-icon-plus" style="margin-top: 0.5rem"  size="mini" @click="addChargingStrategy(1)">
          新增充电站
        </el-button>
      </div>
      <div class="content-body">
        <template>
          <el-table :data="strategyList" style="width: 100%"  height="39rem" :empty-text="'暂无数据'">
            <el-table-column
              type="index"
              align="center"
              width="150"
              label="序号"
            >
            </el-table-column>
            <el-table-column

              prop="chargePileCode"
              label="充电站编码"
              align="center"
            >
            <template slot-scope="{ row }">
            <span>{{ row.chargePileCode }}</span>
          </template>
            </el-table-column>
            <el-table-column
              prop="chargePileName"
              align="center"
              label="充电站名称"
            >
            </el-table-column>
            <el-table-column prop="ipaddress" align="center" label="充电站ip">
            </el-table-column>
            <!-- <el-table-column align="center" label="允许小车类型">
              <template slot-scope="{ row }">
                {{ (row.canAGVUseType || []).join() }}
              </template>
            </el-table-column>
 -->
            <!-- <el-table-column
              prop="maxChargingSecondTime"

              align="center"
              label="最大充电时长(分钟)"
            >
            </el-table-column> -->
            <!-- <el-table-column
              prop="mapID"
              align="center"

              label="地图ID"
            >
            </el-table-column> -->
            <!-- <el-table-column
              prop="vertexNumber"
              align="center"
              width="100"
              label="导航点编号"
            >
            </el-table-column> -->
            <el-table-column
              prop="station"

              label="活动站点编号"
              align="center"
            >
            
            </el-table-column>
            <el-table-column
              prop="parameter1"
              label="充电状态"
              align="center"
            >
            <template slot-scope="{row}"> <span>{{ row.parameter1==0?"未充电":"充电中" }}</span></template>
            </el-table-column>
            <el-table-column
              prop="active"
              label="锁定状态"
              align="center"
            >
            <template slot-scope="{row}"> <span>{{ row.active==false?"锁定":"空闲" }}</span></template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              width="150"
            >
              <template slot-scope="{ row }">
                <!-- <el-button size="mini">
                  修改
                </el-button> -->
                <el-button
                  type="danger"
                  @click="setChargingStrategy(1, row.id)"
                  size="mini"
                >
                  删除
                </el-button>

                <el-dropdown>
                  <el-button size="mini" type="primary">
                    更多
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      ><span @click="addChargingStrategy(2, row)"
                        >修改</span
                      ></el-dropdown-item
                    >
                    <el-dropdown-item
                      ><span @click="setChargingStrategy(2, row.id)"
                        >解锁</span
                      ></el-dropdown-item
                    >
                    <el-dropdown-item
                      ><spqn @click="setChargingStrategy(3, row.id)"
                        >锁定</spqn
                      ></el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="centerDialogVisible"
      width="800px"
      :close-on-click-modal="false"
    >
      <el-form
        :inline="true"
        label-width="140px"
        :model="form"
        :rules="rules"
        ref="form"
      >
        <!-- <el-form-item prop="chargePileCode" label="充电站编码">
          <el-input
            style="width:220px"
            v-model="form.chargePileCode"
            placeholder="请输入充电站编码"
          ></el-input>
        </el-form-item> -->
        <!-- <el-form-item prop="chargePileID" label="充电站ID">
          <el-input
            style="width:220px"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            v-model.number="form.chargePileID"
            placeholder="请输入充电站ID"
          ></el-input>
        </el-form-item> -->
        <el-form-item prop="chargePileName" label="充电站名称">
          <el-input
            v-model="form.chargePileName"
            placeholder="请输入充电站名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="ipaddress" label="充电站IP">
          <el-input
            v-model="form.ipaddress"
            placeholder="请输入充电站ip"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item prop="maxChargingSecondTime" label="最大充电时长(分钟)">
          <el-input
            style="width:220px"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            v-model.number="form.maxChargingSecondTime"
            placeholder="请输最大时长"
          ></el-input>
        </el-form-item> -->
        <!-- <el-form-item prop="mapID" label="地图ID">
          <el-input
            style="width:220px"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            v-model.number="form.mapID"
            placeholder="请输地图ID"
          ></el-input>
        </el-form-item> -->
        <el-form-item prop="station" label="活动站点编号">
          <el-select
          style="width: 188.4px;"
            placeholder="请选择活动站点"
            v-model="form.station"
            clearable
          >
            <el-option
            
              v-for="item in station"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- <el-input
            style="width:220px"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            v-model.number="form.station"
            placeholder="请输入活动站点编号"
          ></el-input> -->
        </el-form-item>

        <el-form-item class="common-form-footer">
          <el-button type="primary" @click="chargeStation">保存</el-button>
          <el-button type="primary" plain @click="centerDialogVisible = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getChargeProtocolType,
  getChargingWay,
  getCharrierType,
  addChargePileSetting,
  updateChargeSetting,
  deleteChargePileSetting,
  lockChargePile,
  unLockChargePile,
  getChargePileSettingList,
  getStation
} from '@/api/charge';

export default {
  data() {
    return {
      strategyList: [],
      charrierList: [],
      centerDialogVisible: false,
      dialogTitle: '',
      form: {},
      rules: {
        // chargingMode: [
        //   { required: true, message: '请选择小车类型', trigger: 'change' },
        // ],
        // chargePileCode: [
        //   { required: true, message: '请输入充电站编码', trigger: 'change' },
        // ],
        // chargePileID: [
        //   { required: true, message: '请输入充电站ID', trigger: 'change' },
        // ],
        chargePileName: [
          { required: true, message: '请输入充电站名称', trigger: 'change' },
        ],
        ipaddress: [
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
        chargingMode: [
          { required: true, message: '请选择协议', trigger: 'change' },
        ],
        station: [
          { required: true, message: '活动站点编号', trigger: 'change' },
        ],
        // maxChargingSecondTime: [
        //   { required: true, message: '输入最大时长', trigger: 'change' },
        // ],
        // vertexNumber: [
        //   { required: true, message: '导航点编号', trigger: 'change' },
        // ],
        // canAgvUseTypeStr: [
        //   { required: true, message: '请选择小车车型', trigger: 'change' },
        // ],
        // protocolType: [
        //   { required: true, message: '请选择充电协议', trigger: 'change' },
        // ],
      },
      protocolList: [],
      chargingWayList: [],
      station:[],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getChargeList();
      this.getProtocolList();
      this.getChargingWayList();
      this.getCharrierList();
      getStation().then((res)=>{
        console.log('aabc',res)
        res.data.forEach(element => {
          this.station.push(element)
        });
      })
    },
    async getProtocolList() {
      const res = await getChargeProtocolType();
      if (res.code === 20000) {
        this.protocolList = res.data || [];
      }
    },
    async getChargingWayList() {
      const res = await getChargingWay();
      if (res.code === 20000) {
        this.chargingWayList = res.data || [];
      }
    },
    async getCharrierList() {
      const res = await getCharrierType();
      if (res.code === 20000) {
        this.charrierList = res.data || [];
      }
    },
    async getChargeList() {
      const res = await getChargePileSettingList();
      if (res.code === 20000) {
        this.strategyList = res.data || [];
        console.log('充电站数据',this.strategyList)
        // this.strategyList.forEach((item) => {
        //   item.canAgvUseTypeStr = item.canAgvUseTypeStr
        //     .split(',')
        //     .map((node) => Number(node));
        // });
      }
    },

    async addChargingStrategy(flag, data) {
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
      if (flag === 1) {
        this.form = {};
        this.dialogTitle = '新增充电站';
      } else if (flag === 2) {
        this.form = {
          ...data,
        };
        console.log('查看修改详情',data)
        this.dialogTitle = '修改充电站';
      }
    },
    async setChargingStrategy(flag, ID) {
      if (flag === 2) {
        const res = await unLockChargePile({ ID });
        if (res.code === 20000) {
          this.$notify({
            message: '解锁成功',
            type: 'success',
            title: '提示',
            duration: 1000,
          });
          this.init()
        }
      } else if (flag === 3) {
        const res = await lockChargePile({ ID });
        if (res.code === 20000) {
          this.$notify({
            message: '锁定成功',
            type: 'success',
            title: '提示',
            duration: 1000,
          });
          this.init()
        }
      } else if (flag === 1) {
        this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            const res = await deleteChargePileSetting({
              ID,
            });
            if (res.code === 20000) {
              this.$notify({
                message: '删除成功！',
                type: 'success',
                title: '提示',
                duration: 1000,
              });
              this.getChargeList();
            }
          })
          .catch(() => {});
      }
    },
    async chargeStation() {
      let valid = false;
      this.$refs.form.validate((val) => {
        valid = val;
      });
      if (!valid) return;
      const newForm = this.form;
      //   if (newForm.canAgvUseTypeStr instanceof Array) {
      //     newForm.canAgvUseTypeStr = newForm.canAgvUseTypeStr.join();
      //   }
      if (this.dialogTitle === '新增充电站') {
        const res = await addChargePileSetting(newForm);
        if (res.code === 20000) {
          this.$notify({
            message: '新增成功',
            type: 'success',
            title: '提示',
            duration: 1000,
          });
          this.centerDialogVisible = false;
          this.getChargeList();
        }
      }
      if (this.dialogTitle === '修改充电站') {
        newForm.canAGVUseType = undefined;
        const res = await updateChargeSetting(newForm);
        if (res.code === 20000) {
          this.$notify({
            message: '修改成功',
            type: 'success',
            title: '提示',
            duration: 1000,
          });
          this.centerDialogVisible = false;
          this.getChargeList();
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.content-header {
  padding: 0 !important;
  margin: 10px;
  height: 30px;
  >>> .el-button {
    float: right;
  }
}
::v-deep  .el-input__inner
 {
  height: 1.875rem;
  background-color: transparent;
  color: #fff;
}
.el-table::before{
  background-color: none;
}
>>> .el-form-item__label,
>>> .el-radio__label {
  font-size: 12px;
  color: #fff;
}
</style>
