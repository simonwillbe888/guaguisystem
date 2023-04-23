<template>
  <div>
    <div class="content-header">
        <el-button class="headerBtn" icon="el-icon-plus" size="mini" @click="add">新增角色</el-button>
    </div>
    <div class="content-body">
      <template>
        <el-table :data="roleList" style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="RoleCode" align="center" label="角色编号">
            <template slot-scope="{ row }">
            <span>{{ row.RoleCode}}</span>
          </template>
          </el-table-column>
          <el-table-column prop="RoleName" align="center" label="角色名称">
          </el-table-column>
          <el-table-column prop="RoleDesc" align="center" label="角色描述">
          </el-table-column>
          <el-table-column align="center" label="创建时间">
            <template slot-scope="{ row }">
              {{ row.CreateTime }}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="200"
          >
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                @click="edit(row)"
                icon="el-icon-edit"
                size="mini"
                plain
              >
                修改
              </el-button>
              <el-button
                @click="delRole(row.ID)"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="pagination-container">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          size="mini"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="form.isEdit ? '编辑角色' : '新增角色'"
      :visible.sync="centerDialogVisible"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        class="form"
        :rules="rules"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="角色编号" prop="RoleCode">
          <el-input
            :disabled="form.isEdit"
            placeholder="请输入角色编号"
            v-model.trim="form.RoleCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="RoleName">
          <el-input
            placeholder="请输入角色名称"
            v-model.trim="form.RoleName"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述信息" prop="RoleDesc">
          <el-input
            style="margin:10px 0"
            type="textarea"
            maxlength="100"
            placeholder="请输入描述信息"
            v-model.trim="form.RoleDesc"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属权限" prop="PowerList">
          <el-tree
            style="margin-bottom:24px;margin-top:10px"
            :data="powerList"
            show-checkbox
            node-key="ID"
            ref="tree"
            @check="nodeCheck"
            accordion
            :props="defaultProps"
            :expand-on-click-node="false"
          >
            <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="primary" @click="addRole(data)" size="mini">
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
        </span> -->
          </el-tree>
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
  getRoleList,
  deleteRole,
  addRole,
  getPowerList,
  updateRole,
  getPowerListByRoleID,
} from '../../../api/sysCtrl.js';
export default {
  data() {
    return {
      centerDialogVisible: false,
      form: {
        RoleCode: '',
        PowerList: null,
      },
      powerList: [],
      roleList: [],
      currentPage: 1,
      total: 0,
      searchLoding: false,
      rules: {
        RoleCode: [
          { required: true, message: '请输入角色编号' },
        ],
        RoleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        RoleDesc: [
          { required: true, message: '请输入描述信息', trigger: 'blur' },
        ],
        // PowerList: [
        //   {
        //     required: true,
        //     trigger: 'change',
        //     // validator: (rule, value, callback) => {
            //   console.log('cgw33333333', value);
        //     //   if (!value || !value.length) {
        //     //     callback(new Error('请选择全线'));
        //     //   } else {
        //     //     callback();
        //     //   }
        //     // },
        //     message: '请选择权限',
        //   },
        // ],
      },
      defaultProps: {
        children: 'children',
        label: 'PowerName',
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getPowers();
      this.getRoleManageList();
    },
    async getRoleManageList() {
      const { currentPage } = this;
      const res = await getRoleList({
        current: currentPage,
        limit: 10,
      });
      if (res.code === 20000) {
        this.roleList = (res.data || {}).records || [];
        this.total = (res.data || {}).total || 0;
        this.total = (res.data || {}).total || 0;
      }
    },
    add() {
      this.form.isEdit = false;
      this.form = {
        RoleName: '',
        RoleCode: '',
        RoleDesc: '',
        PowerList: null,
      };
      this.centerDialogVisible = true;

      this.$nextTick(() => {
        this.$refs.form.clearValidate();
        this.$refs.tree.setCheckedKeys([]);
      });
    },
    // async getRoles() {
    //   const res = await getRole();
    //   if (res.code === 20000) {
    //     this.roles = res.data || [];
    //   } else {
    //     this.$message(res.data);
    //   }
    // },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRoleManageList();
    },
    delRole(id) {
      // console.log("查看row",id)
      this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await deleteRole(id);
          if (res.code === 20000) {
            this.$notify({
              message: res.data,
              type: 'success',
              title: '提示',
              duration: 1000,
            });
            this.getRoleManageList();
          }
        })
        .catch(() => {});
    },

    async addUserRole() {
      const { isEdit, RoleCode, RoleName, PowerList, RoleDesc, ID } = this.form;
      let res = {};
      const obj = {
        powerList: PowerList,
        roleCode: RoleCode,
        roleDesc: RoleDesc,
        roleName: RoleName,
        roleID: ID,
      };
      if (isEdit) {
        // console.log("查看obj",obj)
        res = await updateRole(obj);
      } else {
        res = await addRole(obj);
      }
      if (res.code === 20000) {
        this.$notify({
          message: res.data,
          type: 'success',
          title: '提示',
          duration: 1000,
        });
        this.getRoleManageList();
        this.centerDialogVisible = false;
      }
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addUserRole();
          //   this.$refs.form.resetFields();
        }
      });
    },
    cancel() {
      this.centerDialogVisible = false;
    },
    async edit(item) {
      // console.log("查看用户信息",item)
      // this.$nextTick(() => {
      //   this.$refs.form.clearValidate();
      // });
      this.form = { ...item };
      const res = await getPowerListByRoleID(item.ID);
   
      if (res.code === 20000) {
        // console.log("查看Eidt",this.form.isEdit)
        this.form.isEdit = true;
        this.centerDialogVisible = true;
        this.$nextTick(() => {
          let arr = (res.data || []).map((item) => {
            return item.id;
          });
          this.form.PowerList = arr || [];
          if (!this.powerList) return;
          this.powerList.forEach((item) => {
            if (!item.children || !arr) return;
            item.children.forEach((node) => {
              if (!arr.some((a) => a === node.ID)) {
                arr = arr.filter((b) => b !== item.ID);
              }
              if (!node.children || !arr) return;
              node.children.forEach((el) => {
                if (!arr.some((c) => c === node.ID)) {
                  arr = arr.filter((d) => d !== node.ID);
                }
              });
            });
          });
          this.$refs.tree.setCheckedKeys(arr);
        });
      }
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

        this.powerList = onePower;
      }
    },
    nodeCheck(data, { checkedKeys, halfCheckedKeys }) {
      this.form.PowerList = [...checkedKeys, ...halfCheckedKeys];
    },
  },
};
</script>
<style scoped lang="scss">
.content-body {
  margin-top: 10px;
}
.headerBtn {
  width: 8vw;
  background-color: #15B3B4 !important;
}
.content-header {
  margin-bottom: 10px;
  height: 38px;
}
.form {
  width: 70%;
  margin-left: 10%;
}
>>> .el-tree-node__label {
  font-size: 12px;
}
</style>
