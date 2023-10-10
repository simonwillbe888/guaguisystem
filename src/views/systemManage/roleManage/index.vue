<template>
  <div>
    <div class="content-header">
      <el-button class="headerBtn" icon="el-icon-plus" size="mini" @click="add">新增角色</el-button>
    </div>
    <div class="content-body">
      <template>
        <el-table
            :data="roleList"
            style="width: 100%"
            height="39.5rem"
            header-row-class-name="header-row-class"
            row-class-name="row-class"
            :empty-text="'暂无数据'">
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="RoleCode" align="center" label="角色编号">
            <template slot-scope="{ row }">
              <span>{{ row.RoleCode }}</span>
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
          <el-table-column align="center" label="操作" width="auto">
            <template slot-scope="{ row }">
              <el-button style="background-color:#64C8C8 ;color:#fff"   @click="edit(row)" icon="el-icon-edit" size="mini" plain>
                修改
              </el-button>
              <el-button @click="delRole(row.ID)" type="danger" icon="el-icon-delete" size="mini">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="pagination-container">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" background
          layout="total, prev, pager, next, jumper" :total="total" size="mini">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="form.isEdit ? '编辑角色' : '新增角色'" :visible.sync="centerDialogVisible" width="1000px"
      :close-on-click-modal="false">

      <el-form ref="form" class="form" :rules="rules" :model="form" label-width="80px" >

        <el-row>
          <el-col :span="8">
            <el-form-item label="角色编号" prop="RoleCode" >
              <el-input :disabled="form.isEdit" placeholder="请输入角色编号" v-model.trim="form.RoleCode"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="角色权限" prop="RoleLevel">
              <el-select v-model="form.RoleLevel" placeholder="请选择角色权限" >
                <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="角色名称" prop="RoleName">
              <el-input placeholder="请输入角色名称" v-model.trim="form.RoleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-form-item label="描述信息" prop="RoleDesc">
          <el-input style="margin:10px 0" type="textarea" maxlength="100" placeholder="请输入角色描述"
            v-model.trim="form.RoleDesc"></el-input>
        </el-form-item>

        <el-form-item label="所属权限" prop="PowerList">
          <div style="border: 1px solid var(--tableborder);">
            <el-collapse :accordion="true">
              <el-checkbox-group v-model="powerListArray" @change="collapseChange">
                <el-collapse-item v-for="p in powerList" style="margin: 0.5rem">
                  <template #title>
                    <el-checkbox style="margin-left: 1rem" :label="p.ID" @change="checkboxClick(p)">{{p.PowerName}}</el-checkbox>
                  </template>
                  <span v-for="c in p.children">
                    <el-checkbox v-if="c.children.length == 0" style="margin-left: 1rem" :label="c.ID">{{c.PowerName}}</el-checkbox>
                    <el-tooltip placement="top" v-else>
                      <el-checkbox style="margin-left: 1rem" :label="c.ID" @change="checkboxClick(c)" >{{c.PowerName}}</el-checkbox>
                      <div slot="content">
                        <el-checkbox-group v-model="powerListArray">
                          <span v-for="cc in c.children">
                            <el-checkbox style="margin-left: 1rem" :label="cc.ID">{{cc.PowerName}}</el-checkbox><br>
                          </span>
                        </el-checkbox-group>
                      </div>
                    </el-tooltip>

                  </span>
                </el-collapse-item>
              </el-checkbox-group>
            </el-collapse>
          </div>
<!--          <el-tree :data="powerList" show-checkbox node-key="ID" ref="tree"-->
<!--            @check="nodeCheck" accordion :props="defaultProps"-->
<!--            :expand-on-click-node="true"-->
<!--             style="margin-bottom:24px;margin-top:10px" >-->
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
<!--          </el-tree>-->
        </el-form-item>
        <el-form-item style="display: flex;justify-content: center;margin: 2rem 0">
          <el-button type="primary" style="background-color: var(--bt-confirm-bg)" @click="save">确认</el-button>
          <el-button style="background-color: var(--bt-cancel-bg);color: var(--font-color)" @click="cancel">取消</el-button>
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
      powerListArray: [],
      roleList: [],
      currentPage: 1,
      total: 0,
      searchLoding: false,
      options: [{
        value: 1,
        name: '管理员'
      }, {
        value: 2,
        name: '普通用户'
      }],
      rules: {
        RoleCode: [
          { required: true, message: '请输入角色编号' },
        ],
        RoleLevel: [
          { required: true, message: '请输入角色权限' },
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
      this.powerListArray = []
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
        // this.$refs.tree.setCheckedKeys([]);
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
        .catch(() => { });
    },

    async addUserRole() {
      const { isEdit, RoleCode, RoleName, PowerList, RoleDesc, ID, RoleLevel } = this.form;
      let res = {};
      const obj = {
        // powerList: PowerList,
        powerList: this.powerListArray,
        roleCode: RoleCode,
        roleDesc: RoleDesc,
        roleName: RoleName,
        roleID: ID,
        roleLevel: RoleLevel,
      };
      if (isEdit) {
        console.log("查看更新", obj)
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
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
      this.form = { ...item };
      const res = await getPowerListByRoleID(item.ID);
      if (res.code === 20000) {
        this.form.isEdit = true;
        this.centerDialogVisible = true;
        this.$nextTick(() => {
          let arr = (res.data || []).map((item) => {
            return item.id;
          });
          this.form.PowerList = arr || [];
          console.log("arr",arr)
          this.powerListArray = arr
          if (!this.powerList) return;
          this.powerList.forEach((item) => {
            item.children.forEach((node) => {
              if (!arr.some((a) => a === node.ID)) {
                arr = arr.filter((b) => b !== item.ID);
              }
              if (!node.children || !arr) return;
              node.children.forEach((el) => {
                if (!arr.some((a) => a === el.ID)) {
                  // console.log(arr.filter((d) => d !== node.ID))
                  arr = arr.filter((d) => d !== node.ID);
                }
              });
            });
            // arr = arr.filter(item => item != item.ID)
            // console.log('一级菜单的ID',item.ID)
          });
          //避免全选
          arr = arr.filter(item => item !='9760bcad8dacf00df6578a59617ff02d')
          arr = arr.filter(item => item !='5ad38201e15340124f7762967eb75ca2')
          arr = arr.filter(item => item !='10192ce6f28b936d6ca47c36ceeceec2')
          arr = arr.filter(item => item !='123e43b101cfa5876db6501c1b5db60e')
          arr = arr.filter(item => item !='85c6e4edd4acd192fe4805250b06b759')
          arr = arr.filter(item => item !='e501bbaa44c82b30967d7217b8eb7363')
          // this.$nextTick(()=>{
          //      this.$refs.tree.setCheckedKeys(arr)
          // })
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
        console.log('查看powerList', this.powerList)
      }
    },
    // nodeCheck(data, { checkedKeys, halfCheckedKeys }) {
      // console.log(data,checkedKeys,halfCheckedKeys)
    //   this.form.PowerList = [...checkedKeys, ...halfCheckedKeys];
    // },
    collapseChange(e){
      // console.log('powerList',this.powerList)
      // console.log('collapseChange',e)
      // this.powerList.forEach(i=>{
      //   console.log("powerList",i.children)
      // })
    },

    checkboxClick(e){
      // console.log('checkboxClick',e)
      // console.log('this.powerListArray.includes(e)',this.powerListArray.includes(e.ID))
      if(this.powerListArray.includes(e.ID)){
        if(e.children != undefined && e.children.length>0) {
          e.children.forEach(c => {
            if (!this.powerListArray.includes(c.ID)) {
              this.powerListArray.push(c.ID)
              if (c.children != undefined && c.children.length > 0) {
                c.children.forEach(cc => {
                  this.powerListArray.push(cc.ID)
                })
              }
            }
          })
        }
      }else {
        if(e.children != undefined && e.children.length>0) {
          e.children.forEach(c => {
            if (this.powerListArray.includes(c.ID)) {
              this.powerListArray.splice(this.powerListArray.indexOf(c.ID), 1)
              if (c.children != undefined && c.children.length > 0) {
                c.children.forEach(cc => {
                  this.powerListArray.splice(this.powerListArray.indexOf(cc.ID), 1)
                })
              }
            }
          })
        }
      }
      this.$forceUpdate()
    },

  },
};
</script>
<style scoped lang="scss">
.content-body {
  //margin-top: 10px;
}

.headerBtn {
  background-color: #64C8C8 !important;
}

.form {
  width: 70%;
  margin-left: 10%;
}

::v-deep .el-select {
  // width: 16rem;
}

>>>.el-tree-node__label {
  font-size: 12px;
}

::v-deep .header-row-class {
  background-color: transparent;
  height:50px;
}

::v-deep .row-class {
  background-color: transparent;
  height:50px;
}
</style>
