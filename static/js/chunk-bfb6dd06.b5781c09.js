(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bfb6dd06"],{"0652":function(e,t,a){"use strict";a.d(t,"c",(function(){return r})),a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return o})),a.d(t,"e",(function(){return s})),a.d(t,"d",(function(){return c}));var i=a("b775");function r(e){return Object(i["a"])({url:"/api/Area/GetAreaList",method:"post",data:e})}function n(e){return Object(i["a"])({url:"/api/Area/GetArea",method:"post",data:e})}function o(e){return Object(i["a"])({url:"/api/Area/AddArea",method:"post",data:e})}function s(e){return Object(i["a"])({url:"/api/Area/UpdateArea",method:"post",data:e})}function c(e){return Object(i["a"])({url:"/api/Area/DeleteArea",method:"post",params:e})}},"333d":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},r=[];a("c5f6");Math.easeInOutQuad=function(e,t,a,i){return e/=i/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function o(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function c(e,t,a){var i=s(),r=e-i,c=20,l=0;t="undefined"===typeof t?500:t;var u=function e(){l+=c;var s=Math.easeInOutQuad(l,i,r,t);o(s),l<t?n(e):a&&"function"===typeof a&&a()};u()}var l={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&c(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&c(0,800)}}},u=l,d=(a("9567"),a("2877")),p=Object(d["a"])(u,i,r,!1,null,"2fa86365",null);t["a"]=p.exports},4356:function(e,t,a){},"867b":function(e,t,a){"use strict";a("4356")},9567:function(e,t,a){"use strict";a("c54f")},c54f:function(e,t,a){},e868:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{padding:"1%"}},[a("div",{staticClass:"robot-header content-header"},[a("div",{staticClass:"robot-setting-inquire"},[a("el-button",{staticClass:"robot-operate",attrs:{type:"success",size:"mini"},on:{click:function(t){return e.plusAccesso()}}},[e._v(e._s(e.$t("area_setting.add_area_label")))])],1)]),e._v(" "),a("div",{staticClass:"robot-body content-body"},[a("el-table",{ref:"singleTable",staticClass:"robot-data",attrs:{data:e.accessoInfoArr,"header-row-class-name":"header-row-class","row-class-name":"row-class",fit:"","highlight-current-row":"",size:"small"},on:{"current-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"code",label:"区域编码",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.code))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"区域名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"parentID",label:"是否为子区域",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.parentID?"是":"否"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.createTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"operate",label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("el-button",{staticClass:"robot-operate",attrs:{type:"primary",icon:"el-icon-edit",size:"mini",plain:""},on:{click:function(t){return e.editList(i)}}},[e._v("修改")]),e._v(" "),a("el-button",{staticClass:"robot-operate",attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(t){return e.deleteList(i)}}},[e._v(e._s(e.$t("equip_setting.deleteAccesso_label")))])]}}])})],1),e._v(" "),a("div",[a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,page:e.page,limit:e.limit},on:{"update:page":function(t){e.page=t},"update:limit":function(t){e.limit=t},pagination:e.init}})],1)],1),e._v(" "),a("el-dialog",{staticClass:"dialog-class",attrs:{title:e.accessoDialog[e.dialogType],visible:e.dialogFormVisible,"close-on-click-modal":!1,width:"460px"},on:{"update:visible":function(t){e.dialogFormVisible=t},close:e.cancelOperate}},[a("el-form",{ref:"accessoForm",attrs:{"label-width":"120px",model:e.accessoForm,rules:e.rules}},[a("el-form-item",{attrs:{label:e.$t("area_setting.area_code_label"),prop:"areaCode"}},[a("el-input",{attrs:{placeholder:"请输入区域编码"},model:{value:e.accessoForm.areaCode,callback:function(t){e.$set(e.accessoForm,"areaCode","string"===typeof t?t.trim():t)},expression:"accessoForm.areaCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("area_setting.area_name_label"),prop:"areaName"}},[a("el-input",{attrs:{placeholder:"请输入区域名称"},model:{value:e.accessoForm.areaName,callback:function(t){e.$set(e.accessoForm,"areaName","string"===typeof t?t.trim():t)},expression:"accessoForm.areaName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("area_setting.bigArea_name_label"),prop:"bigAreaName"}},[a("el-select",{attrs:{placeholder:"请选择父区域",clearable:""},model:{value:e.accessoForm.bigAreaName,callback:function(t){e.$set(e.accessoForm,"bigAreaName",t)},expression:"accessoForm.bigAreaName"}},e._l(e.bigAreaOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value,disabled:e.disabled}})})),1)],1),e._v(" "),a("el-form-item",{staticClass:"common-form-footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){"addAccesso"===e.dialogType?e.addSuccess("accessoForm",e.accessoForm):e.editSuccess("accessoForm",e.accessoForm)}}},[e._v(e._s(e.$t("equip_setting.sure_label")))]),e._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){return e.cancelOperate("accessoForm")}}},[e._v(e._s(e.$t("equip_setting.cancel_label")))])],1)],1)],1)],1)},r=[],n=(a("ac6a"),a("7f7f"),a("0652")),o=a("333d"),s={components:{Pagination:o["a"]},data:function(){return{keywordVal:"",accessoInfoArr:[],dialogFormVisible:!1,dialogType:"",accessoDialog:{addAccesso:this.$t("area_setting.add_area_label"),editAccesso:this.$t("area_setting.editor_area_label")},accessoForm:{id:"",areaCode:"",areaName:"",bigAreaName:""},bigAreaOptions:[],rules:{areaCode:[{required:!0,message:"请输入区域编码",trigger:"blur"}],areaName:[{required:!0,message:"请输入区域名称",trigger:"blur"}]},currentRow:null,ID:0,total:0,page:1,limit:10}},mounted:function(){this.init(),this.initAccesso()},methods:{initAccesso:function(){var e=this;e.bigAreaOptions=[],Object(n["b"])().then((function(t){for(var a=t.data,i=0,r=a.length;i<r;i++){var n={value:a[i].id,label:a[i].areaName,parentID:a[i].parentID};e.bigAreaOptions.push(n)}})).catch((function(t){e.$notify({title:e.$t("user.Failure"),message:e.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))},init:function(){var e=this,t={current:e.page,limit:e.limit,searchKey:e.keywordVal};e.accessoInfoArr=[],Object(n["c"])(t).then((function(t){e.total=t.data.total;for(var a=t.data.records,i=0,r=a.length;i<r;i++){var n={id:a[i].id,parentID:a[i].parentID||"",code:a[i].areaCode,name:a[i].areaName,createTime:a[i].createTime};e.accessoInfoArr.push(n)}})).catch((function(t){e.$notify({title:e.$t("user.Failure"),message:e.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))},inquireAccesso:function(){if(this.inquireVal&&0!==this.accessoInfoArr.length){for(var e=[],t=0,a=this.accessoInfoArr.length;t<a;t++)this.inquireVal==this.accessoInfoArr[t].name&&e.push(this.accessoInfoArr[t]);e.length?this.accessoInfoArr=e:alert("未检索到满足要求的配件")}else this.init()},plusAccesso:function(){var e=this;this.dialogFormVisible=!0,this.dialogType="addAccesso",this.resetForm(),this.$nextTick((function(){e.$refs.accessoForm.clearValidate()})),this.bigAreaOptions.forEach((function(e){e.disabled=!1}))},addSuccess:function(e,t){var a=this,i=this;this.$refs.accessoForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;var r={areaCode:t.areaCode,areaName:t.areaName,parentID:t.bigAreaName||0};Object(n["a"])(r).then((function(e){2e4===e.code&&(a.$notify({type:"success",message:"新增成功！",title:"提示",duration:1e3}),i.init(),i.initAccesso(),i.cancelOperate())})).catch((function(e){i.cancelOperate(),i.$notify({title:i.$t("user.Failure"),message:i.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))}))},editList:function(e){var t=this;this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs.accessoForm.clearValidate()})),this.dialogType="editAccesso",e&&(this.ID=e.id,this.accessoForm={id:e.id,areaCode:e.code,areaName:e.name,bigAreaName:e.parentID}),this.bigAreaOptions.length&&this.bigAreaOptions.forEach((function(t){t.disabled=!1,e.id===t.value&&(t.disabled=!0)}))},editSuccess:function(e,t){var a=this,i=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var r={id:t.id,areaCode:t.areaCode,areaName:t.areaName,parentID:t.bigAreaName||0};Object(n["e"])(r).then((function(e){2e4===e.code&&(a.$notify({type:"success",message:"修改成功！",title:"提示",duration:1e3}),i.init(),i.initAccesso(),i.cancelOperate())})).catch((function(e){i.cancelOperate(),i.$notify({title:i.$t("user.Failure"),message:i.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))}))},cancelOperate:function(e){var t=this;this.dialogFormVisible=!1,this.resetForm(),this.$nextTick((function(){t.$refs.accessoForm.resetFields()}))},deleteList:function(e){var t=this,a=this;e&&this.$confirm(a.$t("public_vary.delete_operate_tip"),a.$t("public_vary.warning_tip"),{confirmButtonText:a.$t("public_vary.sure_label"),cancelButtonText:a.$t("public_vary.cancel_label"),type:"warning"}).then((function(){Object(n["d"])({id:e.id}).then((function(e){2e4===e.code&&(a.init(),t.$notify({type:"success",message:"删除成功！",title:"提示",duration:1e3}),a.initAccesso())})).catch((function(e){a.$notify({title:a.$t("user.Failure"),message:a.$t("user.interface_call_failed_tip"),type:"error",duration:1e3})}))})).catch((function(){}))},resetForm:function(){this.accessoForm={id:"",areaCode:"",areaName:"",bigAreaName:""}},handleCurrentChange:function(e){this.currentRow=e}}},c=s,l=(a("867b"),a("2877")),u=Object(l["a"])(c,i,r,!1,null,"6028f42e",null);t["default"]=u.exports}}]);