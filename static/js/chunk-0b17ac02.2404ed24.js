(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b17ac02"],{8996:function(e,t,r){"use strict";r.d(t,"g",(function(){return n})),r.d(t,"j",(function(){return i})),r.d(t,"d",(function(){return s})),r.d(t,"b",(function(){return o})),r.d(t,"m",(function(){return l})),r.d(t,"h",(function(){return c})),r.d(t,"c",(function(){return d})),r.d(t,"a",(function(){return u})),r.d(t,"l",(function(){return m})),r.d(t,"e",(function(){return p})),r.d(t,"f",(function(){return f})),r.d(t,"i",(function(){return h})),r.d(t,"k",(function(){return b}));var a=r("b775");function n(){return Object(a["a"])({url:"/api/Role/getRole",method:"get"})}function i(e){return Object(a["a"])({url:"/api/User/getUserList",method:"post",data:e})}function s(e){return Object(a["a"])({url:"/api/User/deleteUser",method:"post",data:e})}function o(e){return Object(a["a"])({url:"/api/User/addUser",method:"post",data:e})}function l(e){return Object(a["a"])({url:"/api/User/updateUser",method:"post",data:e})}function c(e){return Object(a["a"])({url:"/api/Role/getRoleList",method:"post",data:e})}function d(e){return Object(a["a"])({url:"/api/Role/deleteRole",method:"post",data:e})}function u(e){return Object(a["a"])({url:"/api/Role/addRole",method:"post",data:e})}function m(e){return Object(a["a"])({url:"/api/Role/updateRole",method:"post",data:e})}function p(e){return Object(a["a"])({url:"/api/Power/getPowerList",method:"get"})}function f(e){return Object(a["a"])({url:"/api/Power/getPowerListByRoleID",method:"post",data:e})}function h(){return Object(a["a"])({url:"/api/SystemConfig/GetSystemXmlConfig",method:"get"})}function b(e){return Object(a["a"])({url:"/api/SystemConfig/SetSystemXmlConfig",method:"post",data:e})}},ca1e:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"content-header"},[r("el-input",{staticStyle:{width:"150px","margin-right":"10px"},attrs:{size:"mini",placeholder:"请输入关键字"},model:{value:e.keyWord,callback:function(t){e.keyWord=t},expression:"keyWord"}}),e._v(" "),r("el-select",{attrs:{clearable:"",size:"mini",placeholder:"请选择用户类型"},model:{value:e.role,callback:function(t){e.role=t},expression:"role"}},e._l(e.roles,(function(e){return r("el-option",{key:e.ID,attrs:{label:e.RoleName,value:e.ID}})})),1),e._v(" "),r("el-button",{attrs:{loading:e.searchLoding,size:"mini"},on:{click:e.searchBtn}},[e._v("查询")]),e._v(" "),r("div",{staticClass:"headerBtn"},[r("el-button",{attrs:{size:"mini"},on:{click:e.add}},[e._v("新增用户")])],1)],1),e._v(" "),r("div",{staticClass:"content-body"},[[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.userList}},[r("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"50"}}),e._v(" "),r("el-table-column",{attrs:{prop:"UserName",align:"center",label:"账号",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"NickName",align:"center",label:"用户姓名",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"用户类型"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._v("\n            "+e._s(1===r.UserType?"永久":2===r.UserType?"暂时":"")+"\n          ")]}}])}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._v("\n            "+e._s(r.CreateTime)+"\n          ")]}}])}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"到期时间"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._v("\n            "+e._s(r.DueTime)+"\n          ")]}}])}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._v("\n            "+e._s(1===r.State?"正常":2===r.State?"冻结":"")+"\n          ")]}}])}),e._v(" "),r("el-table-column",{attrs:{align:"center",fixed:"right",label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini",plain:""},on:{click:function(t){return e.edit(a)}}},[e._v("\n              修改\n            ")]),e._v(" "),r("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(t){return e.delUser(a.ID)}}},[e._v("\n              删除\n            ")])]}}])})],1)],e._v(" "),r("div",{staticClass:"pagination-container"},[r("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":10,background:"",layout:"total, prev, pager, next, jumper",total:e.total,size:"mini"},on:{"current-change":e.handleCurrentChange}})],1)],2),e._v(" "),r("el-dialog",{attrs:{title:e.addForm.isEdit?"修改用户":"新增用户",visible:e.centerDialogVisible,width:"500px","close-on-click-modal":!1},on:{"update:visible":function(t){e.centerDialogVisible=t}}},[r("el-form",{ref:"form",staticClass:"form",attrs:{rules:e.rules,model:e.addForm,"label-width":"80px"}},[r("el-form-item",{attrs:{prop:"UserType",label:"用户类型"}},[r("el-radio-group",{attrs:{disabled:!0},model:{value:e.addForm.UserType,callback:function(t){e.$set(e.addForm,"UserType",t)},expression:"addForm.UserType"}},[r("el-radio",{attrs:{label:2}},[e._v("临时")]),e._v(" "),r("el-radio",{attrs:{label:1}},[e._v("永久")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"账号",prop:"UserName"}},[r("el-input",{attrs:{placeholder:"请输入账号",disabled:e.addForm.isEdit},model:{value:e.addForm.UserName,callback:function(t){e.$set(e.addForm,"UserName","string"===typeof t?t.trim():t)},expression:"addForm.UserName"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"NickName",label:"用户姓名"}},[r("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:e.addForm.NickName,callback:function(t){e.$set(e.addForm,"NickName","string"===typeof t?t.trim():t)},expression:"addForm.NickName"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"PassWord",label:"密码"}},[r("el-input",{attrs:{placeholder:"请输入密码",disabled:e.addForm.isEdit},model:{value:e.addForm.PassWord,callback:function(t){e.$set(e.addForm,"PassWord","string"===typeof t?t.trim():t)},expression:"addForm.PassWord"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"RoleID",label:"用户角色"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{size:"mini",placeholder:"请选择角色",clearable:""},model:{value:e.addForm.RoleID,callback:function(t){e.$set(e.addForm,"RoleID",t)},expression:"addForm.RoleID"}},e._l(e.roles,(function(e){return r("el-option",{key:e.ID,attrs:{label:e.RoleName,value:e.ID}})})),1)],1),e._v(" "),1!==e.addForm.UserType?r("el-form-item",{attrs:{prop:"DueTime",label:"到期时间"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"选择日期"},model:{value:e.addForm.DueTime,callback:function(t){e.$set(e.addForm,"DueTime",t)},expression:"addForm.DueTime"}})],1):e._e(),e._v(" "),r("el-form-item",{attrs:{prop:"State",label:"用户状态"}},[r("el-radio-group",{model:{value:e.addForm.State,callback:function(t){e.$set(e.addForm,"State",t)},expression:"addForm.State"}},[r("el-radio",{attrs:{label:1}},[e._v("正常")]),e._v(" "),r("el-radio",{attrs:{label:2}},[e._v("冻结")])],1)],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v(e._s(e.addForm.isEdit?"保存编辑":"立即新增"))]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.cancel}},[e._v("取消")])],1)],1)],1)],1)},n=[],i=r("5530"),s=r("c7eb"),o=(r("96cf"),r("1da1")),l=r("8996"),c={data:function(){return{centerDialogVisible:!1,addForm:{isEdit:!1,UserName:"",NickName:"",UserType:1,DueTime:"",State:1,PassWord:"",RoleID:""},keyWord:"",userList:[],roles:[],role:"",currentPage:1,total:0,searchLoding:!1,rules:{UserName:[{required:!0,message:"请输入账号",trigger:"change"}],NickName:[{required:!0,message:"请输入用户名",trigger:"change"}],PassWord:[{required:!0,message:"请输入密码",trigger:"change"}],RoleName:[{required:!0,message:"请选择角色",trigger:"change"}],RoleID:[{required:!0,message:"请输入用户状态",trigger:"change"}],DueTime:[{required:!0,message:"请选择日期",trigger:"change"}],UserType:[{required:!0,message:"请选择活动资源",trigger:"change"}],State:[{required:!0,message:"请选择活动资源",trigger:"change"}]}}},mounted:function(){this.init()},methods:{init:function(){this.getRoles(),this.getUserManageList()},getUserManageList:function(){var e=Object(o["a"])(Object(s["a"])().mark((function e(){var t,r,a,n;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.keyWord,r=this.role,a=this.currentPage,e.next=3,Object(l["j"])({current:a,keyWord:t,limit:10,roleID:r});case 3:n=e.sent,2e4===n.code&&(this.userList=(n.data||{}).records||[],this.total=(n.data||{}).total||0);case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),getRoles:function(){var e=Object(o["a"])(Object(s["a"])().mark((function e(){var t;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(l["g"])();case 2:t=e.sent,2e4===t.code&&(this.roles=t.data||[]);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),handleCurrentChange:function(e){this.currentPage=e,this.getUserManageList()},searchBtn:function(){this.searchLoding=!0,this.getUserManageList(),this.searchLoding=!1},delUser:function(){var e=Object(o["a"])(Object(s["a"])().mark((function e(t){var r=this;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$confirm("此操作将永久删除数据，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(Object(s["a"])().mark((function e(){var a;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(l["d"])({userID:t});case 2:a=e.sent,2e4===a.code&&(r.$notify({message:a.data,type:"success",title:"提示",duration:1e3}),r.getUserManageList());case 4:case"end":return e.stop()}}),e)})))).catch((function(){}));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),addUser:function(){var e=Object(o["a"])(Object(s["a"])().mark((function e(){var t,r,a,n,i,o,c,d,u,m;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this.addForm,r=t.DueTime,a=t.NickName,n=t.State,i=t.UserName,o=t.UserType,c=t.PassWord,d=t.RoleID,u=t.isEdit,m={},!u){e.next=8;break}return e.next=5,Object(l["m"])({dueTime:1===o?null:r,nickName:a,roleID:d,state:n,userName:i,userType:o,userID:this.addForm.ID});case 5:m=e.sent,e.next=11;break;case 8:return e.next=10,Object(l["b"])({dueTime:r||null,nickName:a,roleID:d,state:n,userName:i,userType:o,passWord:c});case 10:m=e.sent;case 11:2e4===m.code&&(this.$notify({type:"success",message:m.data,title:"提示",duration:1e3}),this.getUserManageList(),this.centerDialogVisible=!1);case 12:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),save:function(){var e=this;this.$refs.form.validate((function(t){t&&e.addUser()}))},cancel:function(){this.centerDialogVisible=!1},add:function(){var e=this;this.addForm={UserType:1,State:1},this.centerDialogVisible=!0,this.$nextTick((function(){e.$refs.form.clearValidate()}))},edit:function(e){var t=this;this.$nextTick((function(){t.$refs.form.clearValidate()})),this.addForm=Object(i["a"])({},e),this.addForm.PassWord="0000",this.addForm.isEdit=!0,this.centerDialogVisible=!0}}},d=c,u=(r("dac0"),r("2877")),m=Object(u["a"])(d,a,n,!1,null,"1e415f12",null);t["default"]=m.exports},dac0:function(e,t,r){"use strict";r("f75c")},f75c:function(e,t,r){}}]);