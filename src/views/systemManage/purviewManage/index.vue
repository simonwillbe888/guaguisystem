<template>
  <div>
    <div class="power-container">
      <div class="content-header">
        <el-button
          type="primary"
          @click="
            addRole({
              ID: '',
              PowerLevel: 0,
            })
          "
          size="mini"
        >
          新增权限
        </el-button>
      </div>
      <el-tree
        :data="powerList"
        node-key="id"
        :props="defaultProps"
        accordion
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span
            >{{ node.label }}
            <span v-if="data.PowerCode">（{{ data.PowerCode }}）</span></span
          >
          <span>
            <el-button
              type="primary"
              v-if="data.PowerLevel !== 0"
              @click="addRole(data)"
              size="mini"
            >
              新增权限
            </el-button>
            <el-button
              type="primary"
              v-if="data.PowerLevel !== 0"
              @click="edit(data)"
              size="mini"
            >
              修改
            </el-button>
            <el-button
              size="mini"
              v-if="data.PowerLevel !== 0"
              @click="delRole(data)"
              type="danger"
            >
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <el-dialog
      :title="form.isEdit ? '编辑权限' : '新增权限'"
      :visible.sync="centerDialogVisible"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        class="form"
        :rules="rules"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="权限编号" prop="PowerCode">
          <el-input
            placeholder="请输入权限编号"
            v-model.trim="form.PowerCode"
          ></el-input>
        </el-form-item>
        <el-form-item prop="PowerName" label="权限名称">
          <el-input
            placeholder="请输入权限名称"
            v-model.trim="form.PowerName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">{{
            form.isEdit ? '保存编辑' : '立即新增'
          }}</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPowerList,
  deletePower,
  addPower,
  updatePower,
} from '../../../api/sysCtrl.js';

export default {
  data() {
    return {
      powerList: [],
      centerDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'PowerName',
      },
      form: {
        PowerCode: '',
        PowerName: '',
        PowerLevel: 1,
      },
      rules: {
        PowerCode: [
          { required: true, message: '请输入权限编号', trigger: 'blur' },
        ],
        PowerName: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getPowers();
    },
    async getPowers() {
      const res = await getPowerList();
      if (res.code === 20000) {
        let arr = res.data || [];

        let onePower = [];
        let towPower = [];
        let threePower = [];
        if (!arr || !arr.length) return;
        arr.forEach((item) => {
          if (item.PowerLevel === 1) {
            item.children = [];
            onePower.push(item);
          } else if (item.PowerLevel === 2) {
            item.children = [];
            towPower.push(item);
          } else if (item.PowerLevel === 3) {
            threePower.push(item);
          }
        });
        if (threePower && towPower) {
          threePower.forEach((node) => {
            towPower.forEach((item) => {
              if (node.ParentID === item.ID) {
                item.children.push(node);
              }
            });
          });
        }
        if (towPower && onePower) {
          towPower.forEach((node) => {
            onePower.forEach((item) => {
              if (node.ParentID === item.ID) {
                item.children.push(node);
              }
            });
          });
        }

        this.powerList = [
          {
            ID: 'tree',
            PowerName: '权限',
            PowerLevel: 0,
            children: onePower,
          },
        ];
      }
    },
    delRole(node) {
      const { ID, parentID } = node;
      this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await deletePower({
            parentID,
            powerID: ID,
          });
          if (res.code === 20000) {
            this.$notify({
              message: res.data,
              type: 'success',
              title: '提示',
              duration: 1000,
            });
            this.getPowers();
          }
        })
        .catch(() => {});
    },
    async addUser() {
      const {
        ParentID,
        PowerCode,
        PowerLevel,
        PowerName,
        ID,
        isEdit,
      } = this.form;
      let res = {};
      if (isEdit) {
        res = await updatePower({
          parentID: ParentID,
          powerCode: PowerCode,
          powerID: ID,
          powerLevel: PowerLevel,
          powerName: PowerName,
        });
      } else {
        res = await addPower({
          parentID: ParentID,
          powerCode: PowerCode,

          powerLevel: PowerLevel,
          powerName: PowerName,
        });
      }
      if (res.code === 20000) {
        this.$notify({
          message: res.data,
          type: 'success',
          title: '提示',
          duration: 1000,
        });
        this.getPowers();
        this.centerDialogVisible = false;
      }
    },

    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addUser();
          this.form = {
            PowerCode: '',
            PowerName: '',
            PowerLevel: 1,
          };
        }
      });
    },

    cancel() {
      this.centerDialogVisible = false;
    },
    edit(item) {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
      this.form = { ...item };
      this.form.isEdit = true;
      this.centerDialogVisible = true;
    },
    addRole(node) {
      this.form = {
        PowerCode: '',
        PowerName: '',
      };
      const { ID, PowerLevel } = node;
      this.form.isEdit = false;
      this.form.ParentID = ID;
      this.form.PowerLevel = PowerLevel + 1;
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
  },
};
</script>
<style scoped lang="scss">
.power-container {
  padding: 10px;
}
.content-header {
  padding: 0 !important;
  margin-bottom: 10px;
  height: 30px;
  >>> .el-button {
    float: right;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding-right: 8px;
  color: #e5eaec;
}
>>> .el-tree-node__content {
  height: 34px;
}
>>> .el-tree {
  background: rgba(140, 148, 155, 0.5);
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
</style>
