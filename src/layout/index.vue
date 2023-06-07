<template>
  <div class="container">
    <div class="header">
      <div>
         <img src="../assets/img/logo@2x.png" style="width:10.125rem ;height: 2rem;">
      </div>
      <div class="changeRoad">
         <span> 高速隧道</span>
        <svg-icon icon-class="changeSuidao"></svg-icon>
        <span>切换隧道</span>
      </div>
      <div class="nav">
        <template v-for="(item, index) in permission_routes">
          <div
            :class="[
              currentManue.meta && currentManue.meta.title === item.meta.title
                ? 'item active'
                : 'item',
            ]"
            :key="index"
            v-if="!item.hidden && item.meta && item.meta.title"
            @click="acitveManue(item)"
          >
            <svg-icon :icon-class="item.meta.icon" />
            <div class="name">{{ $t(item.meta.title) }}</div>
          </div>
        </template>
      </div>
      <screenfull id="screenfull" class="right-menu-item hover-effect" style="margin-right: 1.875rem;"/>
      <div class="right">
        
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <!-- <img
              src="@/assets/img/dynamic/info-icon-2.png"
              class="user-avatar"
            /> -->
            <i
              style="font-size: 1.5vw; color: #fdfdfd"
              class="el-icon-user-solid"
            />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="DialogVisible = true">
              <span style="display: block">关于</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              <span style="display: block">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div
      class="manue"
      v-if="
        currentManue.children &&
          currentManue.children[0] &&
          currentManue.children[0].name&&
          (currentManue.children[0].path!= 'monitor')
      "
    >
      <Sidebar :sonManue="currentManue"></Sidebar>
    </div>
    <div class="main">
      <route-view>
        <router-view />
      </route-view>
      <el-dialog
        title="关于"
        :visible.sync="DialogVisible"
        width="30%"
        center
        :close-on-click-modal="false"
      >
        <div style="line-height:2.5rem">
          <div>
            <span>产品名称：</span><span>隧道智能巡检系统</span>
          </div>
          <div><span>版本号：</span><span>V2.0.0.0</span></div>
        </div>
      </el-dialog>
    </div>
    <div class="warnes">
      <WebSocket></WebSocket>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components';
import WebSocket from '@/components/WebSocket';
import Screenfull from '@/components/Screenfull';
import { getAlarmNotice } from '@/api/user.js';
import { mapGetters } from 'vuex';
import { removeToken } from '@/utils/auth';
import {loginOut,remoteLoginOut,getInfo} from '@/api/user'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Screenfull,
    WebSocket,
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
    };
  },
  created(){
    // getInfo(this.token).then((res)=>{
    // })
  },
  mounted() {
    const { permission_routes } = this;
    let route = this.$route;
    if (permission_routes && permission_routes.length && route.meta) {
      permission_routes.forEach((item) => {
        if (item.meta && item.meta.id === route.meta.parent_id) {
          this.currentManue = item;
          // console.log("导航子菜单",item.meta.icon)
        }
      });
      this.currentManue.currentPath = route.path;
    }
    // this.getWarn();

  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar','logoutState','token']),
    logoutAuto(){
      return this.logoutState
    },
  },
  beforeDestroy() {
    this.interValTime = '';
    // this.remove();
  },
  watch: {
    $route(newName, oldName) {
      console.log('查看',newName,oldName)
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
    logoutAuto(old){
       this.remove()
       this.$notify({
        message: '有新用户登录',
        type: 'success',
        title: '提示',
        duration: 1000,
      });
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
      // console.log("查看子路由2",this.currentManue)
    },
    async logout() {
      loginOut().then((res)=>{
        this.$store.dispatch('user/logout')
        removeToken();
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);

      })
      //   await this.$store.dispatch('user/logout');
    },
    async remove(){
      // remoteLoginOut()
      this.$store.dispatch('user/logout')
      removeToken();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
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
.container {
  padding: 0;
  background: rgb(8,46,80);
  min-height: 100%;
  // max-width: 100%;
  min-width: 80rem;
  // min-height: 60rem;
 overflow: hidden;

  // width: 120rem;
  background-image: url('../assets/img/background.png');
  display: flex;
  flex-direction: column;
  > .manue {
    margin: 0 .625rem;
    .el-menu-item{
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
    background: #021E37;
    display: flex;
    align-items: center;
    
    .changeRoad{
      font-size: 1.25rem;
      display: flex;
      color: #fff;
      span{
        margin:0 1rem;
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
        color: #fff;
        .svg-icon {
          font-size: 1.25rem;
          // margin-bottom: .5rem;
          margin-top: .25rem;
        }

        .name {
          font-size: 1.25rem;
          // height: 3.75rem;
          line-height: 2.1875rem;
          width: 100%;
          overflow: hidden;
        }
      }
      .active {
        color: #15B3B4;
      }
    }
    >>> .right {
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
  >>> .manue {
 
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
>>> .warnes {
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
