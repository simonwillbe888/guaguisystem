(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4161a6c4"],{"0652":function(t,e,r){"use strict";r.d(e,"c",(function(){return o})),r.d(e,"b",(function(){return i})),r.d(e,"a",(function(){return n})),r.d(e,"e",(function(){return s})),r.d(e,"d",(function(){return l}));var a=r("b775");function o(t){return Object(a["a"])({url:"/api/Area/GetAreaList",method:"post",data:t})}function i(t){return Object(a["a"])({url:"/api/Area/GetArea",method:"post",data:t})}function n(t){return Object(a["a"])({url:"/api/Area/AddArea",method:"post",data:t})}function s(t){return Object(a["a"])({url:"/api/Area/UpdateArea",method:"post",data:t})}function l(t){return Object(a["a"])({url:"/api/Area/DeleteArea",method:"post",params:t})}},"0ba8":function(t,e,r){"use strict";r("e64f")},"0dbe":function(t,e,r){"use strict";r.d(e,"h",(function(){return o})),r.d(e,"b",(function(){return i})),r.d(e,"e",(function(){return n})),r.d(e,"t",(function(){return s})),r.d(e,"i",(function(){return l})),r.d(e,"c",(function(){return c})),r.d(e,"f",(function(){return u})),r.d(e,"u",(function(){return d})),r.d(e,"k",(function(){return p})),r.d(e,"j",(function(){return b})),r.d(e,"o",(function(){return f})),r.d(e,"d",(function(){return m})),r.d(e,"g",(function(){return h})),r.d(e,"v",(function(){return v})),r.d(e,"l",(function(){return g})),r.d(e,"p",(function(){return _})),r.d(e,"a",(function(){return y})),r.d(e,"n",(function(){return O})),r.d(e,"q",(function(){return F})),r.d(e,"m",(function(){return C})),r.d(e,"r",(function(){return I})),r.d(e,"s",(function(){return $}));var a=r("b775");function o(){return Object(a["a"])({url:"/api/PatrolLocation/GetAllPatrolLocation",method:"get"})}function i(t){return Object(a["a"])({url:"/api/PatrolLocation/AddPatrolLocation",method:"post",data:t})}function n(t){return Object(a["a"])({url:"/api/PatrolLocation/DeletePatrolLocation",method:"post",data:t})}function s(t){return Object(a["a"])({url:"/api/PatrolLocation/UpdatePatrolLocation",method:"post",data:t})}function l(t){return Object(a["a"])({url:"/api/PatrolPlan/getAllPatrolPlan",method:"post",data:t})}function c(t){return Object(a["a"])({url:"/api/PatrolPlan/addPatrolPlan",method:"post",data:t})}function u(t){return Object(a["a"])({url:"/api/PatrolPlan/deletePatrolPlan",method:"post",params:t})}function d(t){return Object(a["a"])({url:"/api/PatrolPlan/updatePatrolPlan",method:"post",data:t})}function p(){return Object(a["a"])({url:"/api/PatrolPlan/getPlanTypeList",method:"get"})}function b(){return Object(a["a"])({url:"/api/PatrolTemplate/getPatrolTemplateList",method:"get"})}function f(){return Object(a["a"])({url:"/api/PatrolTemplate/getPatrolTemplateSelectList",method:"get"})}function m(t){return Object(a["a"])({url:"/api/PatrolTemplate/addPatrolTemplate",method:"post",data:t})}function h(t){return Object(a["a"])({url:"/api/PatrolTemplate/deletePatrolTemplate",method:"post",params:{ID:t}})}function v(t){return Object(a["a"])({url:"/api/PatrolTemplate/updatePatrolTemplate",method:"post",data:t})}function g(){return Object(a["a"])({url:"/api/CarrierSet/getCarrierTypeList",method:"get"})}function _(t){return Object(a["a"])({url:"/api/PatrolTemplateItem/getPatrolTemplateItemList?taskTemplateId="+t.id,method:"post"})}function y(t){return Object(a["a"])({url:"/api/PatrolTemplateItem/savePatrolTemplateItem",method:"post",data:t})}function O(){return Object(a["a"])({url:"/api/PatrolPlan/getFrequencyTypeList",method:"get"})}function F(){return Object(a["a"])({url:"/api/PatrolPlan/getPlanEnableList",method:"get"})}function C(){return Object(a["a"])({url:"/api/PatrolPlan/getExecuteTypeList",method:"get"})}function I(t){return Object(a["a"])({url:"/api/PatrolPlan/startPatrolPlan?ID="+t,method:"post"})}function $(t){return Object(a["a"])({url:"/api/PatrolPlan/stopPatrolPlan?ID="+t,method:"post"})}},"28a5":function(t,e,r){"use strict";var a=r("aae3"),o=r("cb7c"),i=r("ebd6"),n=r("0390"),s=r("9def"),l=r("5f1b"),c=r("520a"),u=r("79e5"),d=Math.min,p=[].push,b="split",f="length",m="lastIndex",h=4294967295,v=!u((function(){RegExp(h,"y")}));r("214f")("split",2,(function(t,e,r,u){var g;return g="c"=="abbc"[b](/(b)*/)[1]||4!="test"[b](/(?:)/,-1)[f]||2!="ab"[b](/(?:ab)*/)[f]||4!="."[b](/(.?)(.?)/)[f]||"."[b](/()()/)[f]>1||""[b](/.?/)[f]?function(t,e){var o=String(this);if(void 0===t&&0===e)return[];if(!a(t))return r.call(o,t,e);var i,n,s,l=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),d=0,b=void 0===e?h:e>>>0,v=new RegExp(t.source,u+"g");while(i=c.call(v,o)){if(n=v[m],n>d&&(l.push(o.slice(d,i.index)),i[f]>1&&i.index<o[f]&&p.apply(l,i.slice(1)),s=i[0][f],d=n,l[f]>=b))break;v[m]===i.index&&v[m]++}return d===o[f]?!s&&v.test("")||l.push(""):l.push(o.slice(d)),l[f]>b?l.slice(0,b):l}:"0"[b](void 0,0)[f]?function(t,e){return void 0===t&&0===e?[]:r.call(this,t,e)}:r,[function(r,a){var o=t(this),i=void 0==r?void 0:r[e];return void 0!==i?i.call(r,o,a):g.call(String(o),r,a)},function(t,e){var a=u(g,t,this,e,g!==r);if(a.done)return a.value;var c=o(t),p=String(this),b=i(c,RegExp),f=c.unicode,m=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(v?"y":"g"),_=new b(v?c:"^(?:"+c.source+")",m),y=void 0===e?h:e>>>0;if(0===y)return[];if(0===p.length)return null===l(_,p)?[p]:[];var O=0,F=0,C=[];while(F<p.length){_.lastIndex=v?F:0;var I,$=l(_,v?p:p.slice(F));if(null===$||(I=d(s(_.lastIndex+(v?0:F)),p.length))===O)F=n(p,F,f);else{if(C.push(p.slice(O,F)),C.length===y)return C;for(var A=1;A<=$.length-1;A++)if(C.push($[A]),C.length===y)return C;F=O=I}}return C.push(p.slice(O)),C}]}))},e64f:function(t,e,r){},f914:function(t,e,r){"use strict";r.d(e,"c",(function(){return o})),r.d(e,"r",(function(){return i})),r.d(e,"z",(function(){return n})),r.d(e,"m",(function(){return s})),r.d(e,"a",(function(){return l})),r.d(e,"e",(function(){return c})),r.d(e,"A",(function(){return u})),r.d(e,"g",(function(){return d})),r.d(e,"h",(function(){return p})),r.d(e,"f",(function(){return b})),r.d(e,"v",(function(){return f})),r.d(e,"i",(function(){return m})),r.d(e,"l",(function(){return h})),r.d(e,"j",(function(){return v})),r.d(e,"x",(function(){return g})),r.d(e,"t",(function(){return _})),r.d(e,"u",(function(){return y})),r.d(e,"o",(function(){return O})),r.d(e,"b",(function(){return F})),r.d(e,"C",(function(){return C})),r.d(e,"d",(function(){return I})),r.d(e,"k",(function(){return $})),r.d(e,"n",(function(){return A})),r.d(e,"B",(function(){return k})),r.d(e,"y",(function(){return S})),r.d(e,"q",(function(){return P})),r.d(e,"p",(function(){return j}));var a=r("b775");function o(t,e){return Object(a["b"])({url:"/api/Vcu/CarrierMoveSwitch?Switch="+t+"&SendTime="+e,method:"post",data:{}})}function i(t,e,r,o){return Object(a["b"])({url:"/api/Vcu/Move?Direct="+t+"&Speed="+e+"&Span="+r+"&SendTime="+o,method:"post",data:{}})}function n(t){return Object(a["b"])({url:"/api/Vcu/StopAGV?SendTime="+t,method:"post",data:{}})}function s(t){return Object(a["a"])({url:"/api/CarrierSet/getCarrierList",method:"post",data:t})}function l(t){return Object(a["a"])({url:"/api/CarrierSet/addCarrier",method:"post",data:t})}function c(t){return Object(a["a"])({url:"/api/CarrierSet/deleteCarrier",method:"post",params:{ID:t}})}function u(t){return Object(a["a"])({url:"/api/CarrierSet/updateCarrier",method:"post",data:t})}function d(){return Object(a["a"])({url:"/api/Accessory/getAccessoryTypeList",method:"get"})}function p(t){return Object(a["a"])({url:"/api/Accessory/getAccessoryListByType?accessoryType="+t,method:"post"})}function b(){return Object(a["a"])({url:"/api/CarrierSet/getActionTypeList",method:"get"})}function f(t){return Object(a["a"])({url:"/api/CarrierAccessory/SaveCarrierAccessory",method:"post",data:t})}function m(t){return Object(a["a"])({url:"/api/CarrierAccessory/GetCarrierAccessoryList",method:"post",params:{carrierID:t}})}function h(t){return Object(a["a"])({url:"/api/Area/SearchArea",method:"post",data:t})}function v(){return Object(a["a"])({url:"/api/CarrierGroup/GetAllCarrierDetailInfo",method:"get"})}function g(t){return Object(a["a"])({url:"/api/CarrierGroup/RemoteSwitch",method:"post",data:t})}function _(t){return Object(a["a"])({url:"/api/CarrierGroup/RemoteControl",method:"post",data:t})}function y(t){return Object(a["a"])({url:"/api/CarrierGroup/RemoteStop",method:"post",data:t})}function O(t){return Object(a["a"])({url:"/api/DVR/GetList",method:"post",data:t})}function F(t){return Object(a["a"])({url:"/api/DVR/Insert",method:"post",data:t})}function C(t){return Object(a["a"])({url:"/api/DVR/Update",method:"post",data:t})}function I(t){return Object(a["a"])({url:"/api/DVR/Delete",method:"post",params:t})}function $(){return Object(a["a"])({url:"/api/DVR/GetDVRBrandList",method:"get"})}function A(){return Object(a["a"])({url:"/api/DVR/GetCameraList",method:"get"})}function k(t){return Object(a["a"])({url:"/api/DVR/UpdateDetails",method:"post",data:t})}function S(t){return Object(a["a"])({url:"/api/HKControl/voiceCall",method:"post",data:t})}function P(t){return Object(a["a"])({url:"/api/HKControl/Login",method:"post",data:t})}function j(t){return Object(a["a"])({url:"/api/HKControl/LoginOut",method:"get",data:t})}},fc1c:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticStyle:{padding:"1%"}},[r("div",{staticClass:"robot-header content-header"},[r("div",{staticClass:"robot-setting-inquire"},[r("el-input",{staticClass:"robot-inquire",attrs:{size:"mini",placeholder:"请输入机器人名称关键字",clearable:""},model:{value:t.inquireVal,callback:function(e){t.inquireVal=e},expression:"inquireVal"}}),t._v(" "),r("el-button",{staticClass:"robot-operate",attrs:{type:"success",size:"mini"},on:{click:function(e){return t.plusRobot()}}},[t._v(t._s(t.$t("robot_setting.addRobot_label")))]),t._v(" "),r("el-button",{attrs:{type:"success",size:"mini"},on:{click:t.initRobot}},[t._v(t._s(t.$t("robot_setting.inquire_label")))])],1)]),t._v(" "),r("div",{staticClass:"robot-body content-body"},[r("el-table",{ref:"singleTable",staticClass:"robot-data",attrs:{data:t.robotInfoArr,"header-row-class-name":"header-row-class","row-class-name":"row-class",fit:"","highlight-current-row":"",size:"small"},on:{"current-change":t.handleCurrentChange}},[r("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"100"}}),t._v(" "),r("el-table-column",{attrs:{prop:"number",label:"机器人编码",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.number))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"name",label:"机器人名称",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.name))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"type",label:"机器人类型",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.type))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"ip",label:"机器人IP地址",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.ip))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"area",label:"区域",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.area))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"details",label:"机器人详情",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("el-button",{attrs:{type:"primary",icon:"el-icon-document",size:"mini",plain:""},on:{click:function(e){return t.editRobot(a,1)}}},[t._v(t._s(t.$t("plan_config.inqireDetail_label")))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"operate",label:"操作",align:"center",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("el-button",{staticClass:"robot-operate",attrs:{type:"primary",icon:"el-icon-setting",size:"mini"},on:{click:function(e){return t.configAccesso(a)}}},[t._v(t._s(t.$t("robot_setting.accessory_operate_label")))]),t._v(" "),r("el-button",{staticClass:"robot-operate",attrs:{type:"primary",icon:"el-icon-edit",size:"mini",plain:""},on:{click:function(e){return t.editRobot(a,2)}}},[t._v(t._s(t.$t("robot_setting.editRobot_btn")))]),t._v(" "),r("el-button",{staticClass:"robot-operate",attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(e){return t.deleteRobot(a)}}},[t._v(t._s(t.$t("robot_setting.deleteRobot_label")))])]}}])})],1)],1),t._v(" "),r("div",{staticClass:"dialog-sty"},[r("el-dialog",{attrs:{title:t.robotDialog[t.dialogType],visible:t.dialogFormVisible,"close-on-click-modal":!1,width:"500px"},on:{"update:visible":function(e){t.dialogFormVisible=e},close:t.cancelOperate}},[r("el-form",{ref:"robotForm",attrs:{"label-width":"120px",model:t.robotForm,rules:t.rules}},[r("el-form-item",{attrs:{label:t.$t("robot_setting.robot_id_label"),prop:"robotID"}},[r("el-input",{attrs:{placeholder:"请输入机器人ID"},model:{value:t.robotForm.robotID,callback:function(e){t.$set(t.robotForm,"robotID",t._n(e))},expression:"robotForm.robotID"}})],1),t._v(" "),r("el-form-item",{attrs:{label:t.$t("robot_setting.robotNum_label"),prop:"number"}},[r("el-input",{attrs:{placeholder:"请输入机器人编码",disabled:t.robotForm.isEdit},model:{value:t.robotForm.number,callback:function(e){t.$set(t.robotForm,"number","string"===typeof e?e.trim():e)},expression:"robotForm.number"}})],1),t._v(" "),r("el-form-item",{attrs:{label:t.$t("robot_setting.robotName_label"),prop:"robotName"}},[r("el-input",{attrs:{disabled:t.robotForm.isEdit,placeholder:"请输入机器人名称"},model:{value:t.robotForm.robotName,callback:function(e){t.$set(t.robotForm,"robotName","string"===typeof e?e.trim():e)},expression:"robotForm.robotName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:t.$t("robot_setting.robotIP_label"),prop:"robotIp"}},[r("el-input",{attrs:{disabled:t.robotForm.isEdit,placeholder:"请输入机器人Ip"},model:{value:t.robotForm.robotIp,callback:function(e){t.$set(t.robotForm,"robotIp","string"===typeof e?e.trim():e)},expression:"robotForm.robotIp"}})],1),t._v(" "),r("el-form-item",{attrs:{label:t.$t("robot_setting.area_label"),prop:"siteName"}},[r("el-select",{attrs:{disabled:t.robotForm.isEdit,placeholder:"请选择区域",clearable:""},model:{value:t.robotForm.siteName,callback:function(e){t.$set(t.robotForm,"siteName",e)},expression:"robotForm.siteName"}},t._l(t.bigAreaOptions,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),t._v(" "),r("el-form-item",{attrs:{label:t.$t("robot_setting.robotType_label"),prop:"agvTypes"}},[r("el-select",{attrs:{disabled:t.robotForm.isEdit,clearable:"",placeholder:t.$t("robot_setting.selectedRobotTypes_label")},model:{value:t.robotForm.agvTypes,callback:function(e){t.$set(t.robotForm,"agvTypes",e)},expression:"robotForm.agvTypes"}},t._l(t.options,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),t._v(" "),r("el-form-item",{attrs:{label:t.$t("robot_setting.ifBind_standby_label"),prop:"stand"}},[r("el-checkbox",{attrs:{disabled:t.robotForm.isEdit,label:t.$t("robot_setting.bind_standby_label")},model:{value:t.standByChecked,callback:function(e){t.standByChecked=e},expression:"standByChecked"}}),t._v(" "),r("el-input",{staticClass:"standby-input",attrs:{oninput:"if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\\D/g,'')}",placeholder:"待命点ID",disabled:!t.standByChecked||t.robotForm.isEdit},model:{value:t.standByPoint,callback:function(e){t.standByPoint=e},expression:"standByPoint"}})],1),t._v(" "),r("el-form-item",{attrs:{label:t.$t("robot_setting.ifBind_simuCar_label"),prop:"simu"}},[r("el-checkbox",{attrs:{label:t.$t("robot_setting.bind_simuCar_label"),disabled:t.robotForm.isEdit},model:{value:t.simuChecked,callback:function(e){t.simuChecked=e},expression:"simuChecked"}}),t._v(" "),r("el-input",{staticClass:"simu-input",attrs:{oninput:"if(value.length==1){value=value.replace(/[^1-9]/g,'')}else{value=value.replace(/\\D/g,'')}",placeholder:"模拟车起点",disabled:!t.simuChecked||t.robotForm.isEdit},model:{value:t.simuStarts,callback:function(e){t.simuStarts=e},expression:"simuStarts"}})],1),t._v(" "),t.robotForm.isEdit?t._e():r("el-form-item",{staticClass:"common-form-footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){"addRobots"===t.dialogType?t.addSuccess("robotForm",t.robotForm):t.editSuccess("robotForm",t.robotForm)}}},[t._v(t._s(t.$t("robot_setting.sure_label")))]),t._v(" "),r("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.cancelOperate("robotForm")}}},[t._v(t._s(t.$t("robot_setting.cancel_label")))])],1)],1)],1),t._v(" "),r("el-dialog",{attrs:{title:t.$t("robot_setting.robot_details_label"),visible:t.dialogDetailFlag,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogDetailFlag=e}}},[r("div",{staticClass:"detail-form"},[r("el-form",{attrs:{"label-position":"left","label-width":"100px",model:t.detailForm}},[r("el-form-item",{attrs:{label:"绑定待命点"}},[r("el-input",{attrs:{readonly:""},model:{value:t.detailForm.standby,callback:function(e){t.$set(t.detailForm,"standby",e)},expression:"detailForm.standby"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"模拟车起点"}},[r("el-input",{attrs:{readonly:""},model:{value:t.detailForm.simuStarts,callback:function(e){t.$set(t.detailForm,"simuStarts",e)},expression:"detailForm.simuStarts"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.dialogDetailFlag=!1}}},[t._v(t._s(t.$t("plan_config.sure_label")))])],1)],1)],1)])],1),t._v(" "),r("el-dialog",{attrs:{title:t.$t("robot_setting.access_operate_label"),visible:t.dialogAccessFlag,"close-on-click-modal":!1,width:"70%"},on:{"update:visible":function(e){t.dialogAccessFlag=e}}},[r("div",{staticStyle:{"margin-bottom":"20px","font-size":"13px"}},[r("span",[t._v(t._s(t.$t("robot_setting.accesso_type_label")))]),t._v(" "),r("el-select",{staticClass:"access-select",attrs:{placeholder:"请选择",clearable:""},on:{change:t.initListOption},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}},t._l(t.typeOptions,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t,disabled:t.disabled}})})),1),t._v("\n       \n      "),r("span",[t._v(t._s(t.$t("robot_setting.accesso_list_label")))]),t._v(" "),r("el-select",{staticClass:"access-select",attrs:{placeholder:"请选择",clearable:""},on:{focus:t.listPrompt},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}},t._l(t.listOptions,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t}})})),1),t._v("\n       \n      "),r("span",[t._v(t._s(t.$t("robot_setting.accesso_feature_label")))]),t._v(" "),r("el-select",{staticClass:"access-select",attrs:{placeholder:"请选择",multiple:"",clearable:""},model:{value:t.value3,callback:function(e){t.value3=e},expression:"value3"}},t._l(t.featureOptions,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t,disabled:t.disabled}})})),1),t._v("\n       \n      "),r("el-button",{staticStyle:{"margin-top":"10px"},attrs:{type:"primary",size:"mini",plain:""},on:{click:function(e){return t.addAccesso()}}},[t._v(t._s(t.$t("robot_setting.add_related_label")))]),t._v(" "),r("br")],1),t._v(" "),r("div",{staticClass:"content-body"},[r("el-table",{staticClass:"charge-data",attrs:{data:t.accessoInfoArr,"header-row-class-name":"header-row-class","row-class-name":"row-class",fit:"","highlight-current-row":"",size:"mini"},on:{"current-change":t.handleCurrentChange}},[r("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"50"}}),t._v(" "),r("el-table-column",{attrs:{prop:"type",label:"配件类型",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.type))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"AccessoryName",label:"配件名称",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"AccessoryCode",label:"配件编号",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"feature",label:"配件功能",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.EquipFunctionsDesc))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"operate",label:"操作",align:"center",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(r){return t.deleteAccesso(e)}}},[t._v(t._s(t.$t("charge_config.delete_label")))])]}}])})],1)],1),t._v(" "),r("div",{staticClass:"detail-dialog-footer"},[r("el-button",{attrs:{size:"mini"},on:{click:t.save}},[t._v(t._s(t.$t("plan_config.sure_label")))])],1)])],1)},o=[],i=(r("28a5"),r("c7eb")),n=(r("96cf"),r("1da1")),s=(r("7514"),r("7f7f"),r("c5f6"),r("ac6a"),r("f914")),l=r("0652"),c=r("0dbe"),u={data:function(){return{inquireVal:"",robotInfoArr:[],dialogFormVisible:!1,formLabelWidth:"110px",dialogType:"",robotDialog:{addRobots:this.$t("robot_setting.plusRobot_label"),editRobots:this.$t("robot_setting.editRobot_label"),detail:"机器人数据详情"},robotForm:{robotID:0,number:"",siteName:"",robotName:"",robotIp:"",agvTypes:"",isEdit:!1},options:[],bigAreaOptions:[],rules:{robotID:[{required:!0,message:"请输入机器人ID",trigger:"blur"},{type:"number",min:0,max:99,message:"ID在0~99",trigger:"blur"}],agvTypes:[{required:!0,message:"请选择机器人类型",trigger:"blur"}],number:[{required:!0,message:"请输入机器人编码",trigger:"blur"}],siteName:[{required:!0,message:"请输入应用场地",trigger:"change"}],robotName:[{required:!0,message:"请输入机器人名称",trigger:"blur"}],robotIp:[{required:!0,trigger:"blur",validator:function(t,e,r){""===e?r(new Error("请输入机器人IP")):/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(e)?r():r(new Error("请输入正确ip"))}}]},currentRow:null,standByChecked:!1,standByPoint:"",simuChecked:!1,simuStarts:"",dialogDetailFlag:!1,detailForm:{standby:"",simustart:""},dialogAccessFlag:!1,accessoInfoArr:[],typeOptions:[],listOptions:[],featureOptions:[],value1:"",value2:"",value3:"",ID:0,accessoList:[],robotId:0,accessoID:0}},watch:{},mounted:function(){this.initArea(),this.initRobot()},methods:{initRobot:function(){var t=this;t.options=[],t.robotInfoArr=[],Object(c["l"])().then((function(e){for(var r=e.data,a=0,o=r.length;a<o;a++){var i={value:r[a].Code,label:r[a].Desc};t.options.push(i)}Object(s["m"])({keyWord:t.inquireVal}).then((function(e){for(var r=e.data,a=function(e,a){for(var o={id:r[e].ID,carrierId:r[e].CarrierID,number:r[e].CarrierCode,site:r[e].AreaID,name:r[e].CarrierName,ip:r[e].CarrierIP,standby:r[e].IsHomeStation,simustart:r[e].IsStartVertex,homeStation:r[e].HomeStation,startVertex:r[e].StartVertex},i=0,n=t.options.length;i<n;i++)r[e].CarrierType==t.options[i].value&&(o.type=t.options[i].label);t.bigAreaOptions&&t.bigAreaOptions.length&&t.bigAreaOptions.forEach((function(t){r[e].AreaID===t.value&&(o.area=t.label)})),t.robotInfoArr.push(o)},o=0,i=r.length;o<i;o++)a(o,i);t.initAccessoType(),t.initFeatureOption()})).catch((function(e){t.$notify({title:t.$t("user.Failure"),message:t.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))})).catch((function(e){t.$notify({title:t.$t("user.Failure"),message:t.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))},initArea:function(){var t=this;t.bigAreaOptions=[],Object(l["b"])().then((function(e){var r=e.data;console.log("查看区域",r);for(var a=0,o=r.length;a<o;a++){var i={value:r[a].id,label:r[a].areaName};t.bigAreaOptions.push(i)}})).catch((function(e){t.$notify({title:t.$t("user.Failure"),message:t.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))},initAccessoType:function(){var t=this;t.typeOptions=[],Object(s["g"])().then((function(e){for(var r=e.data,a=0,o=r.length;a<o;a++){var i={value:r[a].Code,label:r[a].Desc};t.typeOptions.push(i)}})).catch((function(e){t.$notify({title:t.$t("user.Failure"),message:t.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))},initFeatureOption:function(){var t=this;t.featureOptions=[],Object(s["f"])().then((function(e){for(var r=e.data,a=0,o=r.length;a<o;a++){var i={value:r[a].Code,label:r[a].Desc};7!==i.value&&65535!==i.value&&11!==i.value&&13!==i.value&&(i.disabled=!0,t.featureOptions.push(i))}})).catch((function(e){t.$notify({title:t.$t("user.Failure"),message:t.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))},listPrompt:function(){if(""===this.value1)return this.$notify({message:"请先选择配件类型！",type:"warning",title:"提示",duration:1e3})},initListOption:function(){var t=this;t.listOptions=[],this.value1.value&&Object(s["h"])(this.value1.value).then((function(e){var r=e.data;t.accessoList=r;for(var a=0,o=r.length;a<o;a++){var i={value:r[a].id,label:r[a].accessoryName,accessoryCode:r[a].accessoryCode};t.listOptions.push(i)}})).catch((function(e){t.$notify({title:t.$t("user.Failure"),message:t.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))},plusRobot:function(){this.dialogFormVisible=!0,this.dialogType="addRobots",this.robotForm.isEdit=!1,this.resetForm()},addSuccess:function(t,e){var r=this,a=this;this.$refs[t].validate((function(t){if(!t)return console.log("error submit!!"),!1;var o={carrierID:Number(e.robotID),carrierCode:e.number,carrierName:e.robotName,carrierType:e.agvTypes,areaId:Number(e.siteName),carrierIP:e.robotIp};r.standByChecked?(o.isHomeStation=!0,o.homeStation=Number(r.standByPoint)):o.isHomeStation=!1,r.simuChecked?(o.isStartVertex=!0,o.startVertex=Number(r.simuStarts)):o.isStartVertex=!1,Object(s["a"])(o).then((function(t){2e4===t.code&&(r.$notify({type:"success",message:"新增成功！",title:"提示",duration:1e3}),a.initRobot(),a.cancelOperate())})).catch((function(t){a.cancelOperate(),a.$notify({title:a.$t("user.Failure"),message:a.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))})),this.standByChecked=!1,this.standByPoint="",this.simuChecked=!1,this.simuStarts=""},editRobot:function(t,e){var r=this;t&&(this.dialogFormVisible=!0,this.dialogType="editRobots",this.ID=t.id,this.robotForm={robotID:t.carrierId,siteName:t.site,robotName:t.name,robotIp:t.ip,number:t.number,agvTypes:t.type},t.standby?(this.standByPoint=t.homeStation,this.standByChecked=!0):(this.standByPoint="",this.standByChecked=!1),t.simustart?(this.simuStarts=t.startVertex,this.simuChecked=!0):(this.simuStarts="",this.simuChecked=!1)),1===e&&(this.dialogType="detail"),this.robotForm.isEdit=1===e,this.$nextTick((function(){r.$refs.robotForm.clearValidate()}))},editSuccess:function(t,e){var r=this,a=this;this.$refs[t].validate((function(t){if(!t)return console.log("error submit!!"),!1;var o={id:a.ID,carrierID:Number(e.robotID),carrierCode:e.number,carrierName:e.robotName,areaId:e.siteName,carrierIP:e.robotIp};if(r.standByChecked?(o.isHomeStation=!0,o.homeStation=Number(r.standByPoint)):o.isHomeStation=!1,r.simuChecked?(o.isStartVertex=!0,o.startVertex=Number(r.simuStarts)):o.isStartVertex=!1,"number"===typeof e.agvTypes)o.carrierType=e.agvTypes;else{var i=a.options.find((function(t){return t.label===e.agvTypes}));o.carrierType=i.value}Object(s["A"])(o).then((function(t){if(2e4===t.code){t.data;r.$notify({message:"修改成功！",type:"success",title:"提示",duration:1e3}),a.initRobot()}})).catch((function(t){a.$notify({title:a.$t("user.Failure"),message:a.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})})),r.dialogFormVisible=!1})),this.$refs[t].resetFields()},cancelOperate:function(t){this.dialogFormVisible=!1,this.$refs.robotForm.resetFields(),this.resetForm()},deleteRobot:function(t){var e=this,r=this;t&&this.$confirm(r.$t("public_vary.delete_operate_tip"),r.$t("public_vary.warning_tip"),{confirmButtonText:r.$t("public_vary.sure_label"),cancelButtonText:r.$t("public_vary.cancel_label"),type:"warning"}).then((function(){Object(s["e"])(t.id).then((function(t){t.data;2e4===t.code&&(r.initRobot(),e.$notify({type:"success",message:"删除成功！",title:"提示",duration:1e3}))})).catch((function(t){r.$notify({title:r.$t("user.Failure"),message:r.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))})).catch((function(){}))},resetForm:function(){this.robotForm={robotID:"",number:"",siteName:"",robotName:"",robotIp:"",agvTypes:""}},handleCurrentChange:function(t){this.currentRow=t},configAccesso:function(t){this.accessoID=t.carrierId,this.dialogAccessFlag=!0,this.infoAccesso()},infoAccesso:function(){var t=this,e=this;e.accessoInfoArr=[],Object(s["i"])(this.accessoID).then((function(r){var a=r.data?r.data:[];a.forEach((function(t){e.typeOptions.forEach((function(e){t.AccessoryType==e.value&&(t.type=e.label)}))})),e.accessoInfoArr=a,t.selecteFocus()})).catch((function(t){e.$notify({title:e.$t("user.Failure"),message:e.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))},deleteAccesso:function(t){this.accessoInfoArr=this.accessoInfoArr.filter((function(e,r){return r!==t.$index})),this.selecteFocus()},addAccesso:function(){var t=this.value1,e=this.value2,r=this.value3;if(t.value&&e.value&&r.length){var a={AccessoryName:e.label,AccessoryCode:e.accessoryCode,AccessoryID:e.value,AccessoryType:t.value,type:t.label,EquipFunctionsStr:"",EquipFunctionsDesc:""};r.forEach((function(t){a.EquipFunctionsDesc=a.EquipFunctionsDesc+(a.EquipFunctionsDesc?",":"")+t.label,a.EquipFunctionsStr=a.EquipFunctionsStr+(a.EquipFunctionsStr?",":"")+t.value})),this.accessoInfoArr.push(a),this.value1="",this.value2="",this.value3=[],this.selecteFocus()}else this.$notify({message:"请选择配置！",type:"warning",title:"提示",duration:1e3})},save:function(){var t=Object(n["a"])(Object(i["a"])().mark((function t(){var e,r,a,o;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this.accessoInfoArr,r=this.accessoID,a={carrierID:r,list:[]},e.forEach((function(t){a.list.push({carrierID:r,accessoryID:t.AccessoryID,equipFunctionsDesc:t.EquipFunctionsDesc,equipFunctionsStr:t.EquipFunctionsStr})})),t.next=5,Object(s["v"])(a);case 5:o=t.sent,2e4===o.code&&(this.dialogAccessFlag=!1,this.$notify({message:"保存成功！",type:"success",title:"提示",duration:1e3}));case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),selecteFocus:function(){var t=this;this.featureOptions.length&&this.featureOptions.forEach((function(e){return e.disabled=!1,t.accessoInfoArr.length&&t.accessoInfoArr.forEach((function(t){var r=t.EquipFunctionsStr.split(",");console.log("cgw4444444",r,String(e.value),r.indexOf(String(e.value))),-1!==r.indexOf(String(e.value))&&(e.disabled=!0)})),e})),this.typeOptions.length&&this.typeOptions.forEach((function(e){return e.disabled=!1,t.accessoInfoArr.length&&t.accessoInfoArr.forEach((function(t){t.AccessoryType===e.value&&(e.disabled=!0)})),e}))}}},d=u,p=(r("0ba8"),r("2877")),b=Object(p["a"])(d,a,o,!1,null,"f80839d4",null);e["default"]=b.exports}}]);