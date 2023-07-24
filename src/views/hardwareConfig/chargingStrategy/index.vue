<template>
  <div style=" background: rgb(6,30,51);">
    <div>
      <div class="content-header" >
         <el-button type="primary" icon="el-icon-plus" style="margin-top: 0.5rem"  size="mini" @click="addChargingStrategy(1)">
           新增充电策略
        </el-button>
      </div>
      <div class="content-body">
        <template>
          <el-table :data="strategyList" style="width: 100%"  height="39rem"  :empty-text="'暂无数据'">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="150"
            >
            </el-table-column>
            <!-- <el-table-column
              align="center"
              prop="allowInterrupt"
              label="是否允许中断"
            >
              <template slot-scope="{ row }">
                {{ row.allowInterrupt ? '是' : '否' }}
              </template>
            </el-table-column> -->

            <el-table-column
              align="center"
              prop="mustChargePower"
              label="低电量充电阈值"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="freeChargePower"
              label="空闲充电阈值"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="interruptChargePower"
              label="中断充电阈值"
            >
            </el-table-column>
            <el-table-column align="center" prop="active" label="是否启用">
              <template slot-scope="{ row }">
                {{ row.active ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="startTime"
              label="策略生效时间"
            >
              <template slot-scope="{ row }">
                {{ row.startTime}}
                <!-- {{ $moment(Number(row.startTimeStr)).format('HH:mm:ss') }} -->
              </template>
            </el-table-column>
            <el-table-column align="center" prop="endTime" label="策略失效时间">
              <template slot-scope="{ row }">
                {{ row.endTime }}
                <!-- {{ $moment(Number(row.endTime)).format('HH:mm:ss') }} -->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              width="140"
            >
              <template slot-scope="{ row }">
                <el-button
                  type="danger"
                  @click="setStatus(0, row.id)"
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
                      ><span @click="addChargingStrategy(2, row)">
                        修改</span
                      ></el-dropdown-item
                    >
                    <el-dropdown-item
                      ><span @click="setStatus(1, row.id)"
                        >启用</span
                      ></el-dropdown-item
                    >
                    <el-dropdown-item
                      ><span @click="setStatus(2, row.id)">
                        禁用</span
                      ></el-dropdown-item
                    >
                    <!-- <el-dropdown-item
                      ><span @click="setStatus(3, row.id)"
                        >解锁</span
                      ></el-dropdown-item
                    >
                    <el-dropdown-item
                      ><span @click="setStatus(4, row.id)"
                        >锁定</span
                      ></el-dropdown-item
                    > -->
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
      width="430px"
      :close-on-click-modal="false"
    >
      <el-form label-width="140px" :model="form" :rules="rules" ref="form">
        <!-- <el-form-item label="充电方式" prop="allowInterrupt">
          <el-radio-group v-model="form.allowInterrupt">
            <el-radio :label="true">允许</el-radio>
            <el-radio :label="false">不允许</el-radio>
          </el-radio-group>
        </el-form-item>
 -->
        <el-form-item label="低电量充电阈值" prop="mustChargePower">
          <div style="display: flex;">
          <el-slider
            style="width:220px"
            :step="1"
            :min="0"
            :max="100"
            v-model.number="form.mustChargePower"
          ></el-slider>
          <span style="margin-left:0.5vw ;">{{ form.mustChargePower }}</span>
          </div>
          <!-- <el-input
            style="width:220px"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            v-model.number="form.mustChargePower"
            placeholder="请输空闲充电阈值"
          ></el-input> -->
        </el-form-item>
        <el-form-item label="空闲充电阈值" prop="freeChargePower">
          <div style="display:flex ;">
          <el-slider
            style="width:220px"
            :step="1"
            :min="0"
            :max="100"
            v-model.number="form.freeChargePower"
          ></el-slider>
          <span style="margin-left:0.5vw ;">{{ form.freeChargePower }}</span>
        </div>
          <!-- <el-input
            style="width:220px"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            v-model.number="form.freeChargePower"
            placeholder="请输空闲充电阈值"
          ></el-input> -->
        </el-form-item>
        <el-form-item label="中断充电阈值" prop="interruptChargePower">
          <div style="display: flex;">
          <el-slider
            style="width:220px"
            :step="1"
            :min="0"
            :max="100"
            v-model.number="form.interruptChargePower"
          ></el-slider>
          <span style="margin-left:0.5vw ;">{{ form.interruptChargePower }}</span>
        </div>
          <!-- <el-input
            style="width:220px"
            oninput="if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\D/g,'')}"
            v-model.number="form.interruptChargePower"
            placeholder="请输入中断充电阈值"
          ></el-input> -->
        </el-form-item>
        <el-form-item prop="startTime" label="策略生效时间">
          <el-time-picker
            v-model="form.startTime"
            placeholder="选择生效时间"
            value-format="HH:mm:ss"
                format="HH:mm:ss"
          >
          </el-time-picker>

        </el-form-item>
        <el-form-item prop="endTime" label="策略失效时间">
          <el-time-picker
            v-model="form.endTime"
            placeholder="选择失效时间"
            value-format="HH:mm:ss"
                format="HH:mm:ss"
          >
          </el-time-picker>
        </el-form-item>
        <!-- <el-form-item label="允许中断" prop="allowInterrupt">
          <el-switch
            v-model="form.allowInterrupt"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item> -->
        <el-form-item label="是否启用" prop="active">
          <el-switch
            v-model="form.active"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item class="common-form-footer">
          <el-button type="primary" @click="saveStrategy">保存</el-button>
          <el-button type="primary" @click="centerDialogVisible = false" plain
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  addNormalStrategy,
  updateNormalStrategy,
  deleteNormalStrategy,
  getNormalStrategyList,
  setStrategyEnable,
  setStrategyUnEnable,
} from '@/api/charge';

export default {
  data() {
    return {
      strategyList: [],
      centerDialogVisible: false,
      dialogTitle: '',

      form: {
        allowInterrupt: true,
        active: true,
      },
      rules: {
        // allowInterrupt: [
        //   {
        //     required: true,
        //     message: '请选择是否允许中断',
        //     trigger: 'blur',
        //   },
        // ],
        freeChargePower: [
          {
            required: true,
            message: '请输入空闲充电阈值',
            trigger: 'change',
          },
        ],
        interruptChargePower: [
          {
            required: true,
            message: '请输入中断充电阈值',
            trigger: 'change',
          },
        ],
        startTime: [
          {
            required: true,
            message: '请选择策略开始时间',
            trigger: 'change',
          },
        ],
        endTime: [
          {
            required: true,
            message: '请选择策略结束时间',
            trigger: 'change',
          },
        ],
        mustChargePower: [
          {
            required: true,
            message: '请输入低电量充电阈值',
            trigger: 'change',
          },
        ],
      },
    };
  },
  mounted() {
    this.init();
  },
  watch:{
  },
  methods: {
    init() {
      this.getChargeStrategyList()
    },
    async getChargeStrategyList() {
      const res = await getNormalStrategyList();
      if (res.code === 20000) {
        this.strategyList = res.data || [];
        console.log("查看充电站",this.strategyList)
        this.strategyList.forEach(element => {
          const str = element.startTime
          element.startTime =str.substring(str.length-8)
          const  endstr = element.endTime
          element.endTime = endstr.substring(endstr.length-8)
        });
        // console.log("查看数据",res.data[0].startTime)
      }
    },
    async addChargingStrategy(flag, item) {
      this.centerDialogVisible = true;
      if (flag === 1) {
        this.dialogTitle = '新增充电策略';
        this.form = {
          allowInterrupt: true,
          active: true,
        };
      } else if (flag === 2) {
        this.dialogTitle = '修改充电策略';
        this.form = {
          ...item,
        };

      }
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    async setStatus(flag, ID) {
      let res = {};
      let message = '';
      switch (flag) {
        case 0:
          await this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(async () => {
              res = await deleteNormalStrategy({ ID });
              message = '删除成功';
            })
            .catch(() => {});
          break;
        case 1:
          res = await setStrategyEnable({ ID });
          message = '启用成功';
          break;
        case 2:
          res = await setStrategyUnEnable({ ID });
          message = '禁用成功';
          break;
      }
      if (res.code === 20000) {
        this.$notify({
          message: message,
          type: 'success',
          title: '提示',
          duration: 1000,
        });
        this.getChargeStrategyList();
      }
    },
    async saveStrategy() {
      let valid = false;
      this.$refs.form.validate((val) => {
        valid = val;
      });
      if (!valid) return;
      if (
        !(this.form.mustChargePower < this.form.freeChargePower) ||
        !(this.form.mustChargePower < this.form.interruptChargePower)
      ) {
        this.$notify({
          message: '请输入合理阀值',
          type: 'error',
          title: '提示',
          duration: 1000,
        });
        return;
      }
      //时间转换为时间对象
    //   console.log('cwwwwwwwwww33333333',this.form.endTime)
      // this.form.endTimeStr=String(this.form.endTimeStr)
      // this.form.startTimeStr=String(this.form.startTimeStr)
      if (this.dialogTitle === '新增充电策略') {
        this.form.startTime = '1111-10-10T' + this.form.startTime
        this.form.endTime = '9999-10-10T' + this.form.endTime
        console.log("查看参数",this.form)

        const res = await addNormalStrategy(this.form);
        // console.log("查看新增的策略",res)
        if (res.code === 20000) {
          this.centerDialogVisible = false;
          this.$notify({
            message: '新增成功',
            type: 'success',
            title: '提示',
            duration: 1000,
          });
          this.getChargeStrategyList();
        }else{
          this.form.startTime = null
          this.form.endTime = null
        }
      }
      if (this.dialogTitle === '修改充电策略') {
        this.form.startTime = '1111-10-10T'  + this.form.startTime
        this.form.endTime = '9999-10-10T'  + this.form.endTime
        console.log("查看参数",this.form)
        const res = await updateNormalStrategy(this.form);

        if (res.code === 20000) {
          this.centerDialogVisible = false;
          this.$notify({
            message: '修改成功',
            type: 'success',
            title: '提示',
            duration: 1000,
          });
          this.getChargeStrategyList()
        }else{
          this.form.startTime = null
          this.form.endTime = null
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

>>> .el-form-item__label,
>>> .el-radio__label {
  font-size: 12px;
  color: #fff;
}
::v-deep  .el-input__inner
 {
  height: 1.875rem;
  background-color: transparent;
  color: #fff;
}
</style>
