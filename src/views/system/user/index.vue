<template>
  <div style="padding: 3%;">
    <el-button type="primary" style="margin-bottom: 2%" @click="handle_create">
      {{ $t('user.Add_user') }}
    </el-button>
    <el-table
      :data="table_body_data"
      class="user-main"
      header-row-class-name="header-row-class"
      row-class-name="row-class"
      border
      highlight-current-row
      fit
      size="small"
    >
      <el-table-column
        :label="$t('user.UserName')"
        :prop="table_body_data.user_name"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column :label="$t('user.Email')" :prop="table_body_data.user_email" v-if="false">
        <template slot-scope="scope">
          <span>{{scope.row.user_email}}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        :label="$t('user.Role')"
        :prop="table_body_data.user_role"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('user.Registration_time')"
        :prop="table_body_data.register_date"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.register_date }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('user.Last_login_time')"
        :prop="table_body_data.last_login_date"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.last_login_date }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.operate')" align="center">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            @click="handle_edit(scope.row)"
            >{{ $t('user.Edit') }}</el-button
          >
          <el-button
            icon="el-icon-delete"
            type="danger"
            @click="handle_delete(scope.row)"
            >{{ $t('user.Delete') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialog_visiable" :title="text_map[dialog_status]">
      <el-form label-position="left" style="padding: 30px;margin: auto" label-width="20%">
        <el-form-item :label="$t('user.UserName')">
          <el-input
            :disabled="input_visiable"
            v-model="dialog_model_data.name"
            style="width: 250px"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('user.password')">
          <el-input
            :placeholder="$t('user.Please_enter_your_password')"
            v-model="dialog_model_data.password"
            show-password
            style="width: 250px"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('user.Role')">
          <el-select clearable v-model="dialog_model_data.role">
            <el-option
              v-for="item in role_option"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button
          type="primary"
          @click="dialog_status === 'create' ? create_user() : update_user()"
        >
          确定
        </el-button>
        <el-button @click="dialog_visiable = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addUser, getAllUser, deleteUser, updateUser } from '@/api/user.js';

export default {
  mounted: function() {
    let self = this;
    this.$nextTick(() => {
      getAllUser()
        .then((response) => {
          if (response.data) {
            for (var i = 0; i < response.data.length; i++) {
              // var temp = JSON.parse(JSON.stringify(response.data[i]))
              var temp = {
                name: '',
                role: '',
                register_date: '',
                last_login_date: '',
              };
              temp.name = response.data[i].Name;
              temp.role = this.get_role_name(Number(response.data[i].Role));
              temp.register_date = response.data[i].RegisterDate;
              temp.last_login_date = response.data[i].LastLoginDate;
              this.table_body_data.push(temp);
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
    });
  },
  data() {
    return {
      table_body_data: [],
      temp_row: {
        name: '',
        role: '',
        register_date: '',
        last_login_date: '',
      },

      dialog_visiable: false,
      dialog_status: '',
      text_map: {
        create: 'Create',
        update: 'Edit',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'user name is required',
            trigger: 'change',
          },
        ],
        email: [
          {
            type: 'date',
            required: true,
            message: 'email is required',
            trigger: 'change',
          },
        ],
        // role: [{ required: true, message: 'role is required', trigger: 'blur' }]
      },
      dialog_model_data: {
        name: '',
        email: '',
        role: '',
        password: '',
      },
      role_option: [
        { key: 1, display_name: this.$t('user.Tourist') },
        { key: 2, display_name: this.$t('user.Geust') },
        { key: 3, display_name: this.$t('user.Administrator') },
      ],
    };
  },
  computed: {
    input_visiable: function() {
      return this.dialog_status === 'create' ? false : true;
    },
  },
  methods: {
    handle_edit(row) {
      let roleOptionArr = this.role_option;
      // 显示对话框，将对话框设置为更新模式
      this.dialog_visiable = true;
      this.dialog_status = 'update';
      // 对话框显示时需要清空数据，不能保留上次的数据
      this.reset_dialog_model_data();
      // 给对话框的内容赋值
      this.dialog_model_data.name = row.name;
      for (let i = 0, len = roleOptionArr.length; i < len; i++) {
        if (row.role == roleOptionArr[i].display_name) {
          this.dialog_model_data.role = roleOptionArr[i].key;
        }
      }
    },
    handle_delete(row) {
      // 向后台申请删除数据
      deleteUser(JSON.stringify(row.name))
        .then(() => {
          for (const item of this.table_body_data) {
            if (item.name === row.name) {
              const index = this.table_body_data.indexOf(item);
              this.table_body_data.splice(index, 1);
            }
          }
          // 弹出提示
          this.$notify({
            title: this.$t('user.Success'),
            message: this.$t('user.Delete_Success'),
            type: 'success',
            duration: 1000,
          });
        })
        .catch(() => {
          this.$notify({
            title: this.$t('user.Failure'),
            message: this.$t('user.Delete_Failure'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    handle_create() {
      // 显示对话框
      this.dialog_status = 'create';
      this.dialog_visiable = true;
      this.reset_dialog_model_data();
    },

    update_user() {
      this.dialog_visiable = false;
      var temp_data = {
        Name: '',
        Role: '',
        Password: '',
        RegisterDate: '',
        LastLoginDate: '',
      };
      temp_data.Name = this.dialog_model_data.name;
      temp_data.Role = this.dialog_model_data.role;
      temp_data.Password = this.$getRsaCode(this.dialog_model_data.password);
      // 与后台通讯，添加数据库
      updateUser(temp_data)
        .then(() => {
          for (const item of this.table_body_data) {
            if (item.name === this.dialog_model_data.name) {
              const index = this.table_body_data.indexOf(item);
              this.$set(
                this.table_body_data[index],
                'role',
                this.get_role_name(this.dialog_model_data.role)
              );
            }
          }
          // 弹出提示
          this.$notify({
            title: this.$t('user.Success'),
            message: this.$t('user.Update_Success'),
            type: 'success',
            duration: 1000,
          });
        })
        .catch(() => {
          this.$notify({
            title: this.$t('user.Failure'),
            message: this.$t('user.Update_Failure'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    create_user() {
      this.temp_row.name = this.dialog_model_data.name;
      this.temp_row.role = this.get_role_name(this.dialog_model_data.role);
      this.dialog_visiable = false;

      //后台通信
      // 将dialog的数据格式转换成后台定义的格式，主要是变量的名字大小写要保持一致
      var temp = {
        Name: '',
        Role: '',
        Password: '',
        RegisterDate: '',
        LastLoginDate: '',
      };
      temp.Name = this.dialog_model_data.name;
      temp.Role = this.dialog_model_data.role;
      temp.Password = this.$getRsaCode(this.dialog_model_data.password);

      // 调用后台添加用户API
      addUser(temp)
        .then((response) => {
          const temp_row = Object.assign({}, this.temp_row);
          //添加用户时，将后台返回的时间展示在注册时间中
          temp_row.register_date = response.data;
          this.table_body_data.push(temp_row);
          this.$notify({
            title: this.$t('user.Success'),
            message: this.$t('user.Create_Success'),
            type: 'success',
            duration: 1000,
          });
        })
        .catch(() => {
          this.$notify({
            title: this.$t('user.Failure'),
            message: this.$t('user.Create_Failure'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    reset_dialog_model_data() {
      this.dialog_model_data.name = '';
      this.dialog_model_data.role = '';
      this.dialog_model_data.password = '';
    },
    get_role_name(key) {
      for (let i = 0; i < this.role_option.length; i++) {
        if (key === this.role_option[i].key) {
          return this.role_option[i].display_name;
        }
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
.user-main {
  width: 100%;
  background-color: rgba(166, 94, 240, 0.5);
  background-size: 100% 100%;
  color: rgb(48, 29, 15);
}

>>> .el-table th,
.el-table tr {
  background-color: transparent;
}

>>> .header-row-class {
  background-color: transparent;
  color: rgb(48, 29, 15);
}

>>> .row-class {
  background-color: transparent;
}

>>> .el-table th > .cell {
  padding: 10px 0;
  font-size: 14px;
}

>>> .el-table .cell {
  padding-left: 0;
  padding-right: 0;
}
</style>
