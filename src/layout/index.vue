<template>
  <div :class="themeClass">

  <div class="container">
    <div class="header">
      <div>
<!--        <img src="../assets/img/logo@2x.png" style="width:10.125rem ;height: 2rem;">-->
         <div style="font-weight: bold;font-size: 2rem;color: #64C8C8;font-style: italic;
                  text-shadow: 0px 3px 10px 0px rgba(255,255,255,0.15); position: relative;z-index:2;
          ">
          机器人管理系统
        </div>
        <div style="width:15rem;height:3rem;position: absolute;z-index: 1;margin-top: -2.5rem;
        background: radial-gradient(var(--logo-color-core) 25%, var(--logo-color-around) 35%, var(--logo-color-edge) 50%, var(--logo-color-border) 70%, transparent 70%);">
        </div>
      </div>
      <div class="changeRoad">
        <el-select v-model="choosedArea" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

      </div>
      <div class="nav">
        <template v-for="(item, index) in permission_routes">
          <div :class="[
            currentManue.meta && currentManue.meta.title === item.meta.title
              ? 'item active'
              : 'item',
          ]" :key="index" v-if="!item.hidden && item.meta && item.meta.title" @click="acitveManue(item)">
            <svg-icon :icon-class="item.meta.icon" />
            <div class="name">{{ $t(item.meta.title) }}</div>
          </div>
        </template>
      </div>
      <i class="el-icon-sort" style="rotate:90deg;color: var(--font-color);margin-right: 2rem;cursor: pointer"
        title="切换到监控大屏" @click="() => { this.$router.push('/dataScreen') }"></i>

      <screenfull title="全屏预览" id="screenfull" class="right-menu-item hover-effect" style="cursor:pointer;margin-right: 1.875rem;color: var(--font-color)" />
      <div class="right">
        <div class="message-container" v-show="show" @mouseenter="showCloseIcon = true"
          @mouseleave="showCloseIcon = false">
          <el-progress :percentage="progressPercentage" style="width: 9rem;" color="#66b3b2"></el-progress>
          <i class="el-icon-close" style="color: #fff;" v-show="showCloseIcon" @click="closeProgress"></i>
        </div>
        <el-dropdown class="avatar-container" trigger="click"  style="cursor: pointer">
          <div class="avatar-wrapper">
            <!-- <img
              src="@/assets/img/dynamic/info-icon-2.png"
              class="user-avatar"
            /> -->
            <i style="font-size: 1.5vw; color: var(--font-color)" class="el-icon-user-solid" />
            <span style="color:var(--font-color);font-size: 1vw;">{{ nickName }}</span>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="DialogVisible = true">
              <span style="display: block">关于</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="switchTheme">
              <span style="display: block">{{currentTheme}}</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              <span style="display: block">退出</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="$refs.restartChild.restart(false)" v-if="restartRole">
              <span style="display: block">重启</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="manue" v-if="currentManue.children &&
      currentManue.children[0] &&
      currentManue.children[0].name &&
      (currentManue.children[0].path != 'monitor')
      ">
      <Sidebar :sonManue="currentManue"></Sidebar>
    </div>
    <div class="main">
      <route-view>
        <router-view />
      </route-view>
      <el-dialog title="关于" :visible.sync="DialogVisible" width="30%" center :close-on-click-modal="false">
        <div style="line-height:2.5rem;color:var(--font-color)">
          <div style="color: var(--font-color)">
            <span>产品名称：</span>
            <span>隧道智能巡检系统</span>
          </div>
          <div style="color: var(--font-color)">
            <span>版本号：</span>
            <span>V2.0.0.0</span></div>
        </div>
      </el-dialog>
    </div>
    <div class="warnes">
      <WebSocket></WebSocket>
      <RestartSystem ref="restartChild"></RestartSystem>
    </div>


  </div>
</div>

</template>

<script>
import { Message, Progress } from 'element-ui';
import { Navbar, Sidebar, AppMain,restartSystem } from './components';
import { getExistCarrierAreaList } from '@/api/areaConfig.js'
import WebSocket from '@/components/WebSocket';
import Screenfull from '@/components/Screenfull';
import { getAlarmNotice } from '@/api/user.js';
import { mapGetters } from 'vuex';
import { removeToken } from '@/utils/auth';
import { loginOut, remoteLoginOut, getInfo } from '@/api/user'
import { downLoadBatchPTZFile, getDownLoadFile,getSystemXmlConfig } from '../api/sysCtrl';
import RestartSystem from './components/restartSystem.vue';
export default {
  name: 'Layout',
  components: {
    Sidebar,
    Screenfull,
    WebSocket,
    RestartSystem
},
  data() {
    return {
      currentManue: {
        currentPath: '/',
        meta: {
          title: 'menu.home_label',
          icon: 'dashboard',
        },
      },
      DialogVisible: false,
      interValTime: '',
      nickName: '',
      options: [],
      choosedArea: '',
      show: false,
      progressPercentage: 0,
      timer: null,
      progressTimer: null,
      showCloseIcon: false,
      restartRole:false,
      switchColor:true,
    };
  },
  created() {
    // getInfo(this.token).then((res)=>{
    // })
    this.init()
  },
  mounted() {
    // this.permission_routes=  sessionStorage.getItem('sessionRoles')
    this.nickName = this.$store.getters.name
    const { permission_routes } = this;
    let route = this.$route;
    if (permission_routes && permission_routes.length && route.meta) {
      permission_routes.forEach((item) => {
        if (item.meta && item.meta.id === route.meta.parent_id) {
          this.currentManue = item;
        }
      });
      this.currentManue.currentPath = route.path;
    }

  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar', 'logoutState', 'token', 'areaId','theme']),
    logoutAuto() {
      return this.logoutState
    },
    themeClass(){
      return this.theme === 'theme-1' ? 'theme-1' :'theme-2';
    },
    currentTheme(){
      // return this.theme === 'theme-1' ? '科技蓝' : '简约白';
      return '主题'
    }
  },
  beforeDestroy() {
    this.interValTime = '';
    // this.remove();
  },
  watch: {
    $route(newName, oldName) {
      setTimeout(() => {
        this.$nextTick(() => {
          let route = this.$route;
          const { currentManue, permission_routes } = this;
          if (route.path !== currentManue.currentPath) {
            if (permission_routes && permission_routes.length && route.meta) {
              permission_routes.forEach((item) => {
                if (item.meta && item.meta.id === route.meta.parent_id) {
                  this.currentManue = item;
                }
              });
              this.currentManue.currentPath = route.path;
            }
          }
          // console.log("查看子路由1",this.currentManue)
        });
      }, 500);
    },
    permission_routes(newV, oldV) {
      const { permission_routes } = this;
      let route = this.$route;
      if (permission_routes && permission_routes.length && route.meta) {
        permission_routes.forEach((item) => {
          if (item.meta && item.meta.id === route.meta.parent_id) {
            this.currentManue = item;
            this.$router.addRoutes(permission_routes);
          }
        });
        this.currentManue.currentPath = route.path;
      }
    },
    logoutAuto(old) {
      this.remove()
      this.$notify({
        message: '有新用户登录',
        type: 'success',
        title: '提示',
        duration: 1000,
      });
    },
    choosedArea(newV, old) {
      this.$store.dispatch('global/setAreaId', newV)
    }
  },
  methods: {
    acitveManue(item) {
      if (item.children && item.children[0] && item.children[0].name) {
        //去默认跳转第一个子路由
        this.$router.push({
          name: item.children[0].name,
        });
      } else {
        this.$router.push({
          name: item.name,
        });
      }
      this.currentManue = item;
      this.currentManue.currentPath = this.$route.path;
    },
    init() {
      console.log('查看角色权限',this.$store.state.user.roles)
      this.restartRole = this.$store.state.user.roles.includes("restartSystem")
      getSystemXmlConfig().then((res)=>{
        this.$store.dispatch('global/setFileAddress',res.data.fileAddress)
      })
      getExistCarrierAreaList().then((res) => {
        let areas = []
        let accessTypeArr
        if(res.code == 20000) {
          accessTypeArr = res.data
          this.choosedArea = accessTypeArr[0].id
          for (let i = 0, len = accessTypeArr.length; i < len; i++) {
            areas.push(accessTypeArr[i].id)
            let optionObj = {
              value: accessTypeArr[i].id,
              label: accessTypeArr[i].areaName,
            };
            this.options.push(optionObj);
          }
        }
        if(!isNaN(this.areaId) && areas.includes(this.areaId)){
          this.choosedArea = this.areaId
        }else {
          this.choosedArea = accessTypeArr[0].id
        }
      })
    },
    async logout() {
      loginOut().then((res) => {
        this.$store.dispatch('user/logout')
        removeToken();
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);

      })
      //   await this.$store.dispatch('user/logout');
    },
    async remove() {
      // remoteLoginOut()
      this.$store.dispatch('user/logout')
      removeToken();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    showProgressMessage() {

    },
    downloadMedia(params) {
    //获取文件
    this.closeProgress()
      downLoadBatchPTZFile(params).then((response) => {
        if(response.code != '20000'){
          this.closeProgress()
          return
        }
        clearInterval(this.progressTimer)
        let file = encodeURIComponent(response.data)
        this.progressTimer = null
        this.progressTimer = setInterval(() => {
          //打包进度
          getDownLoadFile(file).then((res) => {

            if(res.code != '20000'){
          this.closeProgress()
          return
        }
            this.show = true
            this.progressPercentage = Number(res.data)
            if (Number(res.data) >= 100) {
               this.closeProgress()
               const url = process.env.VUE_APP_BASE_API + '/download/' + response.data
                // console.log('url',url)
               window.open(url,'_blank')
            }
          })
        }, 1000)

      })
    },
    closeProgress() {
      clearInterval(this.progressTimer)
      this.progressTimer = null
      this.show = false;
      this.progressPercentage = 0;
    },
    switchTheme(){
      this.switchColor = !this.switchColor
      console.log(this.switchColor)
      this.$store.commit('global/set_theme',this.switchColor)
    }

    // getWarn() {
    //   this.interValTime = setInterval(async () => {
    //     console.log('cgw444444---dddddd');
    //     const res = await getAlarmNotice();
    //     if (res.code === 20000 && res.data) {
    //       this.warnes = res.data;
    //     }
    //   }, 5000);
    // },
  },
};
</script>

<style lang="scss" scoped>
.message-container {
  display: flex;
  position: fixed;
  top: 6rem;
  width: 10rem;
  right: 20px;
  z-index: 99;
}

::v-deep .el-progress__text {
  color: #fff;
}

.container {
  padding: 0;
  min-height: 100%;
  // max-width: 100%;
  min-width: 1180px;
  // min-height: 60rem;
  overflow: hidden;
  // width: 120rem;
  display: flex;
  flex-direction: column;
  background: transparent;
  >.manue {
    margin: 0 .625rem;

    .el-menu-item {
      width: 10rem;
      height: 3rem;
      margin: auto;
    }

    ::v-deep .el-menu {
      justify-content: center;
      border: none;
    }
  }

  .header {
    padding: 0 1.875rem;
    height: 3.75rem;
    // background: url(../assets/img/main/header_bg.jpg) no-repeat;
    // background-size: cover;
    background: var();
    display: flex;
    align-items: center;

    .changeRoad {
      margin-left: 2rem;
      width:10rem;
      ::v-deep .el-input__inner{
        color: #64c8c8;
      }
      ::v-deep .el-select .el-input__inner{
        border: 1px solid #64c8c8;
      }
    }

    .nav {
      flex: 1;
      height: 100%;
      padding-right: 12.5rem;
      // background: red;
      // border-left: .0938rem solid rgba(223, 230, 235, 0.8);
      text-align: right;
      text-align: center;

      .item {
        display: inline-block;
        text-align: center;
        margin: .3125rem 1.25rem;
        height: 1.75rem;
        cursor: pointer;
        // background: rgb(198, 211, 123);
        border-radius: .3125rem;
        color: var(--font-color);

        .svg-icon {
          font-size: 1.5rem;
          // margin-bottom: .5rem;
          margin-top: .25rem;
        }

        .name {
          font-size: 1.25rem;
          // height: 3.75rem;
          line-height: 2rem;
          width: 100%;
          overflow: hidden;
        }
      }

      .active {
        color: #64C8C8;
      }
    }

    >>>.right {
      height: 100%;
      padding-left: 1.25rem;
      padding-right: .625rem;
      padding-top: .5rem;
      // border-left: .0938rem solid rgba(223, 230, 235, 0.8);
      line-height: 3.125rem;
      display: flex;
      align-items: center;

      #screenfull {
        margin-right: 1.25rem;
        padding-bottom: .3125rem;

        .svg-icon {
          font-size: 1.375rem;
          color: #fff;
        }
      }
    }
  }

  >>>.manue {

    .el-submenu,
    .el-submenu__title {
      height: 2rem;
      line-height: 2rem;
    }

    .el-submenu__title {

      // padding: 0 .5rem;
      i {
        color: #fff;
      }

      .el-submenu__icon-arrow {
        right: .3125rem;
      }
    }

    // z-index: 88;
    // box-shadow: 0 .125rem .375rem 0 rgba(42, 47, 63, 0.4);
    // border-top: .0313rem solid #ddd;
  }

  // >>> .el-menu--collapse .el-menu .el-submenu,
  // .el-menu--popup {
  //   min-width: 9.375rem;
  // }
}

.main {
  flex: 1;
  margin: 0rem .625rem .625rem;

}

::v-deep .el-select .el-input .el-select__caret {
  line-height: 24px;
}

::v-deep .el-input__inner {
  color: #fff;
}
//  .el-dropdown-menu{
//  background-color:rgba($color: #64C8C8, $alpha: 0.5) ;
//  opacity: 0.2;
//  .el-dropdown-menu__item{
//   color: black;
//  }
// }
>>>.warnes {
  position: fixed;
  bottom: 6.25rem;
  right: 1.5625rem;
  z-index: 999;

  .el-button {
    padding: .5rem;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 1.25rem;
    font-size: 1.25rem;
    background: rgba(255, 255, 255, 1);
    // color: #fff;
    border-color: #c1c3c4;
  }

  .el-badge__content.is-fixed {
    right: 1.25rem;
    // top: 1.875rem;
  }

}
</style>
