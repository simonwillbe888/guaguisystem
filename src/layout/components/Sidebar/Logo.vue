<template>
  <div class="sidebar-logo-container"
       :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse"
                   key="collapse"
                   class="sidebar-logo-link"
                   to="/">
        <!-- <svg-icon icon-class="casun-logo" /> -->
        <img v-if="logo"
             :src="logo"
             class="sidebar-logo">
        <!-- <h1 v-else
            class="sidebar-title">{{ title }} </h1> -->
      </router-link>
      <router-link v-else
                   key="expand"
                   class="sidebar-logo-link"
                   to="/">
        <!-- <svg-icon icon-class="casun-logo" /> -->
        <img v-if="logo"
             :src="logo"
             class="sidebar-logo">
        <!-- src="@/assets/img/logo.png"-->
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      // title: 'Casun AGV',
      // logo: '@/assets/img/logo.png'
      logo: 'http://www.casun.cn/Public/Home/images/agv%E5%B0%8F%E8%BD%A6-logo.png'
      // logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 51px;
  line-height: 50px;
  background: rgba(62, 68, 152, 0.5);
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 130px;
      height: 30px;
      margin-top: 6px;
      // vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
