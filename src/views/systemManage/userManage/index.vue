<template>
  <div>
    <div class="content-header">
      <div style="display:inline;float: right;">
      <el-input
        size="mini"
        style="width:150px;margin-right:10px"
        v-model="keyWord"
        placeholder="请输入关键字"
      ></el-input>
      <el-select
        clearable
        v-model="role"
        size="mini"
        placeholder="请选择用户角色"
      >
        <el-option
          v-for="item in roles"
          :key="item.ID"
          :label="item.RoleName"
          :value="item.ID"
        >
        </el-option>
      </el-select>
      <el-button :loading="searchLoding"  @click="searchBtn"
        >查询</el-button
      >
    </div>
        <el-button class="headerBtn" icon="el-icon-plus" size="mini" @click="add">新增用户</el-button>

    </div>
    <div class="content-body">
      <template>
        <el-table :data="userList" style="width: 100%" height="36.5rem">
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column
            prop="UserName"
            align="center"
            label="账号"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="NickName"
            align="center"
            label="用户姓名"
            width="120"
          >
          </el-table-column>
          <el-table-column align="center" label="用户类型">
            <template slot-scope="{ row }">
              {{
                row.UserType === 1 ? '永久' : row.UserType === 2 ? '临时' : ''
              }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间">
            <template slot-scope="{ row }">
              {{ row.CreateTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="到期时间">
            <template slot-scope="{ row }">
              {{ row.DueTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="{ row }">
              {{ row.State === 1 ? '正常' : row.State === 2 ? '冻结' : '' }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="200"
          >
            <template slot-scope="{ row }">
              <el-button
              style="background-color:#64C8C8 ;color:#fff"
                @click="edit(row)"
                icon="el-icon-edit"
                size="mini"
                plain
              >
                修改
              </el-button>
              <el-button
                @click="delUser(row.ID)"
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
      :title="addForm.isEdit ? '修改用户' : '新增用户'"
      :visible.sync="centerDialogVisible"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        class="form"
        :rules="rules"
        :model="addForm"
        label-width="80px"
      >
        <el-form-item prop="UserType" label="用户类型">
          <el-radio-group  v-model="addForm.UserType">
            <el-radio :label="2">临时</el-radio>
            <el-radio :label="1">永久</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账号" prop="UserName">

          <el-input
            placeholder="请输入账号"
            :disabled="addForm.isEdit"
            v-model.trim="addForm.UserName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="NickName" label="用户姓名">
          <el-input
            placeholder="请输入用户名"
            v-model.trim="addForm.NickName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="PassWord" label="密码">
          <el-input
            placeholder="请输入密码"
            clearable
            v-model.trim="addForm.PassWord"
          ></el-input>
        </el-form-item>
        <el-form-item prop="RoleID" label="用户角色">
          <el-select
            style="width:100%"
            v-model="addForm.RoleID"
            size="mini"
            placeholder="请选择角色"
            clearable
          >
            <el-option
              v-for="item in roles"
              :key="item.ID"
              :label="item.RoleName"
              :value="item.ID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="addForm.UserType !== 1"
          prop="DueTime"
          label="到期时间"
        >
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="addForm.DueTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="State" label="用户状态">
          <el-radio-group v-model="addForm.State">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">冻结</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="background-color: #64C8C8FF" @click="save">确认</el-button>

          <el-button type="primary" style="background-color: #FFFFFF;color: #000000" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRole,
  getUserList,
  deleteUser,
  tianjiaUser,
  updateUser,
} from '../../../api/sysCtrl.js';
export default {
  data() {
    return {
      centerDialogVisible: false,
      addForm: {
        isEdit: false,
        UserName: '',
        NickName: '',
        UserType: 1,
        DueTime: '',
        State: 1,
        PassWord: '',
        RoleID: '',
      },
      keyWord: '',
      userList: [],
      roles: [],
      role: '',
      currentPage: 1,
      total: 0,
      searchLoding: false,
      rules: {
        UserName: [
          { required: true, message: '请输入账号', trigger: 'change' },
        ],
        NickName: [
          { required: true, message: '请输入用户名', trigger: 'change' },
        ],
        PassWord: [
          { required: true, message: '请输入密码', trigger: 'change' },
        ],
        RoleName: [
          { required: true, message: '请选择角色', trigger: 'change' },
        ],
        RoleID: [
          { required: true, message: '请输入用户状态', trigger: 'change' },
        ],
        DueTime: [
          {
            // type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
        UserType: [
          { required: true, message: '请选择活动资源', trigger: 'change' },
        ],
        State: [
          { required: true, message: '请选择活动资源', trigger: 'change' },
        ],
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getRoles();
      this.getUserManageList();
    },
    async getUserManageList() {
      const { keyWord, role, currentPage } = this;
      const res = await getUserList({
        current: currentPage,
        keyWord: keyWord,
        limit: 10,
        roleID: role,
      });
      if (res.code === 20000) {
        // console.log("查看账号表格",res.data)
        this.userList = (res.data || {}).records || [];
        this.total = (res.data || {}).total || 0;
      }
    },
    async getRoles() {
      const res = await getRole();
      if (res.code === 20000) {
        this.roles = res.data || [];
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserManageList();
    },
    searchBtn() {
      this.searchLoding = true;
      this.getUserManageList();
      this.searchLoding = false;
    },
    async delUser(userID) {
      // console.log("查看ID",userID)
      this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await deleteUser(userID);
          if (res.code === 20000) {
            this.$notify({
              message: res.data,
              type: 'success',
              title: '提示',
              duration: 1000,
            });
            this.getUserManageList();
          }
        })
        .catch(() => {});
    },
    async addUser() {
      const {
        DueTime,
        NickName,
        State,
        UserName,
        UserType,
        PassWord,
        RoleID,
        isEdit,
      } = this.addForm;
      let res = {};
      if (isEdit) {
        // console.log("用户保存信息",this.addForm)
        res = await updateUser({
          dueTime: UserType === 1 ? null : DueTime,
          nickName: NickName,
          roleID: RoleID,
          state: State,
          userName: UserName,
          userType: UserType,
          passWord: PassWord,
          userID: this.addForm.ID,
        });
      } else {
        // console.log("用户保存的 信息",this.addForm)
        res = await tianjiaUser({
          dueTime: DueTime || null,
          nickName: NickName,
          roleID: RoleID,
          state: State,
          userName: UserName,
          userType: UserType,
          passWord: PassWord,
        });
        // console.log(res)
      }
      if (res.code === 20000) {
        this.$notify({
          type: 'success',
          message: res.data,
          title: '提示',
          duration: 1000,
        });
        this.getUserManageList();
        this.centerDialogVisible = false;
      }
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addUser();
          //   this.$refs.form.resetFields();
        }
      });
    },
    cancel() {
      this.centerDialogVisible = false;
    },
    add() {
      this.addForm = {
        UserType: 1,
        State: 1,
      };
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    edit(item) {
      // console.log("查看用户详情",item)
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
      item.PassWord = '******'
      this.addForm = { ...item };
      this.addForm.isEdit = true;
      this.centerDialogVisible = true;
    },
  },
};
</script>
<style scoped lang="scss">
.content-body {
  margin-top: 10px;
}
.headerBtn {
  // width: 8vw;
  margin-top: 0.5rem;
  background-color: #64C8C8 !important;
}

.form {
  width: 70%;
  //margin-left: 10%;
  margin: auto;
}

</style>
