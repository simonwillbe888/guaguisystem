<template>
  <div id="app"
       v-cloak>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    const targetRoute = sessionStorage.getItem('sessionRoles');
    if(targetRoute == '/system/licenseSetting'){
      this.$router.push('system/licenseSetting')
    }
  }
}
resizeWeb();
window.addEventListener('resize',(e)=>{
  resizeWeb()
})
function resizeWeb(){
    	var wH = window.innerHeight; // 当前窗口的高度
        var wW = window.innerWidth; // 当前窗口的宽度
        const pageWidth = wW/wH > 1920/1080 ? wH*1920/1080 : wW
        const pageHeight = pageWidth * 1080/1920
        var whdef = 16 / 1920; // 表示1920的设计图,使用16PX的默认值
        var rem = wW * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
      //  console.log('窗口宽度',wW,'窗口高度',wH)
        if(wW>920){
          var html = document.documentElement;
          html.style.fontSize =  pageWidth/100 + "px"; //适用于PC网站
        };
  	};


</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  min-width: 1180px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* 解决element-ui的table表格控件表头与内容列不对齐问题 */
.el-table th.gutter {
  display: table-cell !important;
}
.el-table::before{
  height: 0;
}
</style>
