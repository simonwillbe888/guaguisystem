(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54324bf6"],{"0652":function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return o})),n.d(t,"e",(function(){return l})),n.d(t,"d",(function(){return s}));var a=n("b775");function r(e){return Object(a["a"])({url:"/api/Area/GetAreaList",method:"post",data:e})}function i(e){return Object(a["a"])({url:"/api/Area/GetArea",method:"post",data:e})}function o(e){return Object(a["a"])({url:"/api/Area/AddArea",method:"post",data:e})}function l(e){return Object(a["a"])({url:"/api/Area/UpdateArea",method:"post",data:e})}function s(e){return Object(a["a"])({url:"/api/Area/DeleteArea",method:"post",params:e})}},"0dbe":function(e,t,n){"use strict";n.d(t,"h",(function(){return r})),n.d(t,"b",(function(){return i})),n.d(t,"e",(function(){return o})),n.d(t,"t",(function(){return l})),n.d(t,"i",(function(){return s})),n.d(t,"c",(function(){return c})),n.d(t,"f",(function(){return u})),n.d(t,"u",(function(){return p})),n.d(t,"k",(function(){return m})),n.d(t,"j",(function(){return d})),n.d(t,"o",(function(){return f})),n.d(t,"d",(function(){return b})),n.d(t,"g",(function(){return g})),n.d(t,"v",(function(){return h})),n.d(t,"l",(function(){return v})),n.d(t,"p",(function(){return _})),n.d(t,"a",(function(){return N})),n.d(t,"n",(function(){return P})),n.d(t,"q",(function(){return y})),n.d(t,"m",(function(){return I})),n.d(t,"r",(function(){return F})),n.d(t,"s",(function(){return $}));var a=n("b775");function r(){return Object(a["a"])({url:"/api/PatrolLocation/GetAllPatrolLocation",method:"get"})}function i(e){return Object(a["a"])({url:"/api/PatrolLocation/AddPatrolLocation",method:"post",data:e})}function o(e){return Object(a["a"])({url:"/api/PatrolLocation/DeletePatrolLocation",method:"post",data:e})}function l(e){return Object(a["a"])({url:"/api/PatrolLocation/UpdatePatrolLocation",method:"post",data:e})}function s(e){return Object(a["a"])({url:"/api/PatrolPlan/getAllPatrolPlan",method:"post",data:e})}function c(e){return Object(a["a"])({url:"/api/PatrolPlan/addPatrolPlan",method:"post",data:e})}function u(e){return Object(a["a"])({url:"/api/PatrolPlan/deletePatrolPlan",method:"post",params:e})}function p(e){return Object(a["a"])({url:"/api/PatrolPlan/updatePatrolPlan",method:"post",data:e})}function m(){return Object(a["a"])({url:"/api/PatrolPlan/getPlanTypeList",method:"get"})}function d(){return Object(a["a"])({url:"/api/PatrolTemplate/getPatrolTemplateList",method:"get"})}function f(){return Object(a["a"])({url:"/api/PatrolTemplate/getPatrolTemplateSelectList",method:"get"})}function b(e){return Object(a["a"])({url:"/api/PatrolTemplate/addPatrolTemplate",method:"post",data:e})}function g(e){return Object(a["a"])({url:"/api/PatrolTemplate/deletePatrolTemplate",method:"post",params:{ID:e}})}function h(e){return Object(a["a"])({url:"/api/PatrolTemplate/updatePatrolTemplate",method:"post",data:e})}function v(){return Object(a["a"])({url:"/api/CarrierSet/getCarrierTypeList",method:"get"})}function _(e){return Object(a["a"])({url:"/api/PatrolTemplateItem/getPatrolTemplateItemList?taskTemplateId="+e.id,method:"post"})}function N(e){return Object(a["a"])({url:"/api/PatrolTemplateItem/savePatrolTemplateItem",method:"post",data:e})}function P(){return Object(a["a"])({url:"/api/PatrolPlan/getFrequencyTypeList",method:"get"})}function y(){return Object(a["a"])({url:"/api/PatrolPlan/getPlanEnableList",method:"get"})}function I(){return Object(a["a"])({url:"/api/PatrolPlan/getExecuteTypeList",method:"get"})}function F(e){return Object(a["a"])({url:"/api/PatrolPlan/startPatrolPlan?ID="+e,method:"post"})}function $(e){return Object(a["a"])({url:"/api/PatrolPlan/stopPatrolPlan?ID="+e,method:"post"})}},"3c74":function(e,t,n){"use strict";n("f56b")},"64d3":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{padding:"1%"}},[n("div",{staticClass:"inspection-header content-header"},[n("div",{staticClass:"inspec-setting-inquire"},[n("el-input",{staticClass:"robot-inquire",attrs:{size:"mini",placeholder:e.$t("inspection_setting.inspec_tooltip"),clearable:""},model:{value:e.inquireVal,callback:function(t){e.inquireVal=t},expression:"inquireVal"}}),e._v(" "),n("el-button",{staticClass:"robot-operate",attrs:{type:"success",size:"mini"},on:{click:function(t){return e.plusInspects()}}},[e._v(e._s(e.$t("inspection_setting.addInspec_label")))]),e._v(" "),n("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(t){return e.inquireInspect()}}},[e._v(e._s(e.$t("inspection_setting.inquire_label")))])],1)]),e._v(" "),n("div",{staticClass:"robot-body content-body"},[n("el-table",{staticClass:"inspect-data",attrs:{data:e.inspectInfoArr,"header-row-class-name":"header-row-class","row-class-name":"row-class",fit:"","highlight-current-row":"",size:"small"},on:{"current-change":e.handleCurrentChange}},[n("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"150"}}),e._v(" "),n("el-table-column",{attrs:{prop:"name",label:"巡检点名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"number",label:"导航点编号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.number))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"areaName",label:"区域名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.areaName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"annotation",label:"地图标注名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.annotation))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"group",label:"所属组别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.group))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"operate",label:"操作",align:"center",width:"280"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini",plain:""},on:{click:function(t){return e.editInspect(a)}}},[e._v(e._s(e.$t("inspection_setting.edit_label")))]),e._v(" "),n("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(t){return e.deleteInspect(a)}}},[e._v(e._s(e.$t("inspection_setting.delete_label")))])]}}])})],1)],1),e._v(" "),n("el-dialog",{attrs:{title:e.inspectDialog[e.dialogType],visible:e.dialogFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"inspectForm",attrs:{"label-width":"120px",model:e.inspectForm,rules:e.rules}},[n("el-form-item",{attrs:{label:"巡检点名称",prop:"inspectName"}},[n("el-input",{attrs:{placeholder:"请输入机器人名称",maxlength:"20"},model:{value:e.inspectForm.inspectName,callback:function(t){e.$set(e.inspectForm,"inspectName",t)},expression:"inspectForm.inspectName"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"导航点编号",prop:"naviNumber"}},[n("el-input",{attrs:{placeholder:"请输入导航点编号",oninput:"if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\\D/g,'')}"},model:{value:e.inspectForm.naviNumber,callback:function(t){e.$set(e.inspectForm,"naviNumber",e._n(t))},expression:"inspectForm.naviNumber"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"地图标注名称",prop:"mapName"}},[n("el-input",{attrs:{placeholder:"请输入地图标注名称"},model:{value:e.inspectForm.mapName,callback:function(t){e.$set(e.inspectForm,"mapName",t)},expression:"inspectForm.mapName"}})],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("robot_setting.area_label"),prop:"siteName"}},[n("el-select",{attrs:{clearable:"",placeholder:"请选择区域"},model:{value:e.inspectForm.siteName,callback:function(t){e.$set(e.inspectForm,"siteName",t)},expression:"inspectForm.siteName"}},e._l(e.bigAreaOptions,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),n("el-form-item",{attrs:{label:"所属组别",prop:"belongGroup"}},[n("el-input",{attrs:{placeholder:"请输入所属组别",oninput:"if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\\D/g,'')}"},model:{value:e.inspectForm.belongGroup,callback:function(t){e.$set(e.inspectForm,"belongGroup",e._n(t))},expression:"inspectForm.belongGroup"}})],1),e._v(" "),n("el-form-item",{staticClass:"common-form-footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){"addInspects"===e.dialogType?e.addInspects("inspectForm",e.inspectForm):e.editSuccess("inspectForm",e.inspectForm)}}},[e._v(e._s(e.$t("inspection_setting.sure_add_label")))]),e._v(" "),n("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){return e.cancelOperate("inspectForm")}}},[e._v(e._s(e.$t("inspection_setting.cancel_add_label")))])],1)],1)],1)],1)},r=[],i=(n("c5f6"),n("7f7f"),n("0dbe")),o=n("0652"),l={data:function(){return{inquireVal:"",inspectInfoArr:[],dialogFormVisible:!1,dialogType:"",inspectDialog:{addInspects:this.$t("inspection_setting.plusInspect_label"),editInspects:this.$t("inspection_setting.editInspect_label")},inspectForm:{inspectName:"",naviNumber:"",mapName:"",belongGroup:"",siteName:""},bigAreaOptions:[],rules:{inspectName:[{required:!0,message:"请输入巡检点名称",trigger:"change"}],naviNumber:[{required:!0,message:"请输入导航点编号",trigger:"change"}],belongGroup:[{required:!0,message:"请输入所属组别",trigger:"change"}]},currentInspect:"",currentRow:null,ID:0}},mounted:function(){this.init(),this.initArea()},methods:{init:function(){var e=this;e.inspectInfoArr=[],Object(i["h"])().then((function(t){console.log("查看巡检计划",t.data);var n=t.data;if(n.length)for(var a=0,r=n.length;a<r;a++){var i={id:n[a].LocationID,name:n[a].Name,number:n[a].VertexID,areaID:n[a].AreaID,areaName:n[a].AreaName,annotation:n[a].MapDisplayName,group:n[a].GroupID};e.inspectInfoArr.push(i)}})).catch((function(t){e.$notify({title:e.$t("user.Failure"),message:e.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))},initArea:function(){var e=this;e.bigAreaOptions=[],Object(o["b"])().then((function(t){for(var n=t.data,a=0,r=n.length;a<r;a++){var i={value:n[a].id,label:n[a].areaName};e.bigAreaOptions.push(i)}})).catch((function(t){e.$notify({title:e.$t("user.Failure"),message:e.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))},inquireInspect:function(){if(this.inquireVal&&0!==this.inspectInfoArr.length){for(var e=[],t=0,n=this.inspectInfoArr.length;t<n;t++)this.inquireVal==this.inspectInfoArr[t].name&&e.push(this.inspectInfoArr[t]);e.length?this.inspectInfoArr=e:alert("未检索到满足要求的巡检点")}else this.init()},plusInspects:function(){var e=this;this.dialogFormVisible=!0,this.dialogType="addInspects",this.inspectForm={inspectName:"",naviNumber:"",mapName:"",belongGroup:"",siteName:""},this.$nextTick((function(){e.$refs.inspectForm.clearValidate()}))},addInspects:function(e,t){var n=this,a=this;this.$refs[e].validate((function(r){if(!r)return console.log("error submit!!"),!1;var o={name:t.inspectName,vertexID:Number(t.naviNumber),mapDisplayName:t.mapName,groupID:Number(t.belongGroup),areaID:Number(t.siteName)};Object(i["b"])(o).then((function(t){2e4===t.code&&(n.$notify({type:"success",message:"新增成功！",title:"提示",duration:1e3}),a.init(),a.resetForm(),n.$refs[e].resetFields())})).catch((function(e){a.$notify({title:a.$t("user.Failure"),message:a.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})})),n.dialogFormVisible=!1}))},editSuccess:function(e,t){var n=this,a=this;this.$refs[e].validate((function(r){if(!r)return console.log("error submit!!"),!1;var o={locationID:a.ID,name:t.inspectName,vertexID:Number(t.naviNumber),mapDisplayName:t.mapName,groupID:Number(t.belongGroup),areaID:Number(t.siteName)};Object(i["t"])(o).then((function(t){2e4===t.code&&(n.$notify({type:"success",message:"修改成功！",title:"提示",duration:1e3}),a.init(),a.resetForm(),n.$refs[e].resetFields())})).catch((function(e){a.$notify({title:a.$t("user.Failure"),message:a.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})})),n.dialogFormVisible=!1}))},cancelOperate:function(e){this.dialogFormVisible=!1,this.$refs[e].resetFields()},handleCurrentChange:function(e){this.currentRow=e},editInspect:function(e){this.dialogFormVisible=!0,this.dialogType="editInspects",this.ID=e.id,this.inspectForm={inspectName:e.name,naviNumber:e.number,mapName:e.annotation,belongGroup:e.group,siteName:e.areaID}},deleteInspect:function(e){var t=this,n=this;e&&this.$confirm(n.$t("public_vary.delete_operate_tip"),n.$t("public_vary.warning_tip"),{confirmButtonText:n.$t("public_vary.sure_label"),cancelButtonText:n.$t("public_vary.cancel_label"),type:"warning"}).then((function(){Object(i["e"])(e.id).then((function(e){2e4===e.code&&(t.$notify({type:"success",message:"删除成功！",title:"提示",duration:1e3}),n.init())})).catch((function(e){n.$notify({title:n.$t("user.Failure"),message:n.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))})).catch((function(){}))},resetForm:function(){this.inspectForm={inspectName:"",naviNumber:"",mapName:"",belongGroup:"",siteName:""}}}},s=l,c=(n("3c74"),n("2877")),u=Object(c["a"])(s,a,r,!1,null,"59fc8cc8",null);t["default"]=u.exports},f56b:function(e,t,n){}}]);