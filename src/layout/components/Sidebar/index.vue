<template>
  <!-- <div :class="{ 'has-logo': showLogo }"> -->
  <!-- <logo v-if="showLogo"
          :collapse="isCollapse" /> -->
  <!-- <logo :collapse="isCollapse" /> -->
  <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
  <el-menu
    :default-active="activeMenu"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#031B31"
    text-color="#fff"
    active-text-color="#64C8C8"
    v-if="sonManue && sonManue.children"
  >
    <sidebar-item
      v-for="route in sonManue.children || []"
      :key="route.path"
      :item="route"
      :base-path="sonManue.path + '/' + route.path"
      @click.native="foldMap(route)"
    />
  </el-menu>
  <!-- </el-scrollbar>
  </div> -->
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.scss';

export default {
  components: { SidebarItem, Logo },
  props: {
    sonManue: {
      default: {},
    },
  },
  computed: {
    ...mapGetters(['', 'sidebar']),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    foldMap(item) {
      let nav = document.getElementsByClassName('navbar');
      let sidebar = document.getElementsByClassName('sidebar-container');
      if (!sidebar[0] || !nav[0].style) return;
      let sidebarWidth = sidebar[0] && sidebar[0].clientWidth;
      if (
        item.name == 'SH-fir-map' ||
        item.name == 'SH-sec-map' ||
        item.name == 'BJ-fir-map' ||
        item.name == 'BJ-sec-map'
      ) {
        nav[0].style.height = '0';
        if (sidebarWidth == 210) {
          this.$store.dispatch('app/toggleSideBar');
        }
      } else {
        nav[0].style.height = '50px';
        if (sidebarWidth == 54) {
          this.$store.dispatch('app/toggleSideBar');
        }
      }
    },
  },
};
</script>
<style scoped>
.el-menu-demo {
  margin: 20px auto;
  display: flex;
  text-align: center;
}
</style>
