<template>
  <div>
    <div class="power-container">
      <!-- <div class="content-header">
        <el-button type="primary" size="mini" @click="getTaskList">
          查询
        </el-button>
      </div> -->
      <div class="content-body">
        <template>
          <el-table :data="realTimeTasks" style="width: 100%" height="39rem"  >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="80"
            >
            </el-table-column>
            <el-table-column prop="carrierName" align="center" label="机器人名称">
            </el-table-column>
            <el-table-column
              prop="planName"
              align="center"
              label="计划任务名称"
            >
            </el-table-column>
            <el-table-column align="center" label="计划类型">
              <template slot-scope="{ row }">
                {{
                  row.planType === 1
                    ? '实时巡检'
                    : row.planType === 2
                    ? '特别巡检'
                    : row.planType === 3
                    ? '连续巡检'
                    : ''
                }}
              </template>
            </el-table-column>
            <el-table-column
              prop="currentItemSequence"
              align="center"
              label="当前任务步"
            >
            </el-table-column>
            <el-table-column prop="alarmCount" align="center" label="告警数量">
            </el-table-column>
            <el-table-column prop="startTime" align="center" label="开始时间">
            </el-table-column>
            <!-- <el-table-column prop="residueCount" align="center" label="剩余次数">
            </el-table-column> -->
            <el-table-column
              align="center"
              label="操作"
              width="100"
            >
              <template slot-scope="{ row }">
                <el-button
                  type="danger"
                  @click="showDialog(row.taskID)"
                  size="mini"
                >
                  终止任务
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <el-dialog
      title="是否终止关联计划"
      :visible.sync="centerDialogVisible"
      width="35%"
      center
      :close-on-click-modal="false"
    >
      <!-- <span>是否终止关联计划</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="stopTask(true)"
          >确认</el-button
        >
        <el-button size="mini" @click="centerDialogVisible = false"
          >取消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRealPatrolTaskList, cancelPatrolTask } from '@/api/inspectRecord';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      taskList: [],
      centerDialogVisible: false,
      taskId: '',
    };
  },
  computed: {
    ...mapGetters(['realTimeTasks']),
  },
  mounted() {
    this.getTaskList();
  },
  methods: {
    async getTaskList() {
      const res = await getRealPatrolTaskList();
      console.log("获取实时任务",res)
      if (res.code === 20000) {
        // this.taskList = res.data || [];
        this.$store.dispatch('global/setRealTimeTasks', res.data || []);
      }
    },
    showDialog(id) {
      this.centerDialogVisible = true;
      this.taskId = id;
    },
    async stopTask(needStop) {
      const res = await cancelPatrolTask({
        needStop,
        taskID: this.taskId,
      });
      if (res.code === 20000) {
        this.$notify({
          message: res.data,
          type: 'success',
          title: '提示',
          duration: 1000,
        });
        this.centerDialogVisible = false;
        this.getTaskList();
      }
    },
  },
};
</script>
<style scoped lang="scss">
.power-container {
  //   padding: 10px;
  padding-top: 10px;
}
.content-header {

  >>> .el-button {
    float: right;
  }
  .el-table::before{
    height: 0;
  }
}
</style>
