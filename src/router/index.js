import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  // {
  //   path: '/',
  //   redirect: '/dashboard/monitor',
  // },
    {
    path: '/',
    redirect: '/dashboard/monitor',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  //系统信息
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      title: 'menu.sys_label',
      icon: 'sys_info',
      id: 1,
      // roles: ['SystemInfo'],
      // roles: ['vertify'],

    },
    children: [
      {
        path: 'monitor',
        name: 'menu.sys_monitor',
        meta: {
          title: 'menu.sys_monitor',
          parent_id: 1,
          // roles: ['SystemMonitor'],
          // roles: ['vertify'],

        },
        component: () => import('@/views/monitor/index'),
      },
      {
        path: 'dashboard',
        name: 'menu.sys_run',
        meta: {
          title: 'menu.sys_run',
          parent_id: 1,
          // roles: ['SystemRun'],


        },
        component: () => import('@/views/dashboard/index'),
        hidden:true,
      },

      {
        path: 'map',
        name: 'menu.sys_map',
        meta: {
          title: 'menu.sys_map',
          parent_id: 1,
          // roles: ['SystemMap'],

        },
        component: () => import('@/views/map/index'),
        hidden:true,
      },

    ],
  },
  {
    path: '/dataScreen',
    name: 'dataScreen',
    meta: {},
    component: () => import('@/views/monitor/dataScreen'),
  },
  // 硬件配置
  {
    path: '/hardwareConfig',
    component: Layout,
    redirect: '/hardwareConfig/chargeConfig',
    meta: {
      title: 'menu.hardware_config_label',
      icon: 'yingjian_setting',
      id: 4,
      // roles: ['HardwareSetting'],
      // roles: ['vertify'],


    },
    children: [
      //   {
      //     path: 'chargeConfig',
      //     name: 'charge_config_label',
      //     component: () => import('@/views/charge/index'),
      //     meta: {
      //       title: 'menu.charge_config_label',
      //       icon: 'battery',
      //       parent_id: 4,
      //       roles: ['ChargeSetting'],
      //     },
      //   },

      {
        path: 'areaConfig',
        name: 'area_config_label',
        component: () => import('@/views/hardwareConfig/areaConfig/index'),
        meta: {
          title: 'menu.area_config_label',
          icon: 'carrier_type',
          parent_id: 4,
          // roles: ['AreaSetting'],

        },
      },
      {
        path: 'equipConfig',
        name: 'equip_config_label',
        component: () => import('@/views/hardwareConfig/equipConfig/index'),
        meta: {
          title: 'menu.equip_config_label',
          parent_id: 4,
          // roles: ['EquipSetting'],

        },
      },
      {
        path: 'robotConfig',
        name: 'robot_label',
        component: () => import('@/views/hardwareConfig/robotConfig/index'),
        meta: {
          title: 'menu.robot_label',
          icon: 'people',
          parent_id: 4,
          // roles: ['RobotSetting'],

        },
      },
      {
        path: 'videoRecordConfig',
        name: 'menu.video_record_config_label',
        component: () =>
          import('@/views/hardwareConfig/videoRecordConfig/index'),
        meta: {
          title: 'menu.video_record_config_label',
          parent_id: 4,
          // roles: ['videoRecordSetting'],

        },
      },
      {
        path: 'chargingStation',
        name: 'menu.charging_station_label',
        component: () => import('@/views/hardwareConfig/chargingStation/index'),
        meta: {
          title: 'menu.charging_station_label',
          parent_id: 4,
          // roles: ['ChargingStation'],

        },
      },

      {
        path: 'chargingStrategy',
        name: 'menu.charging_strategy_label',
        component: () =>
          import('@/views/hardwareConfig/chargingStrategy/index'),
        meta: {
          title: 'menu.charging_strategy_label',
          parent_id: 4,
          // roles: ['ChargingStrategy'],

        },
      },
    ],
  },

  // 巡检配置
  {
    path: '/taskConfig',
    component: Layout,
    redirect: '/taskConfig/inspectPoints',
    meta: {
      title: 'menu.taskConfig_label',
      icon: 'xunjian_setting',
      id: 2,
      // roles: ['PatrolSetting'],
      // roles: ['vertify'],

    },
    children: [
      {
        path: 'inspectPoints',
        component: () => import('@/views/taskConfig/inspectPoints/index'),
        name: 'inspectPoints_config',
        meta: {
          title: 'menu.inspectPoints_config',
          icon: 'excel',
          parent_id: 2,
          // roles: ['PointSetting'],

        },
      },
      {
        path: 'inspectPointsTask',
        name: 'action_actionManage_label',
        component: () =>
          import('@/views/taskConfig/inspectPoints/actionManage'),
        meta: {
          // title: 'inspection_setting.action_manage_label',
          // noCache: true,
          // activeMenu: '/taskConfig/inspectPoints'
          parent_id: 2,
          // roles: ['inspectTaskEdit'],

        },
        hidden: true,
      },
      {
        path: 'processTask',
        name: 'processTask_label',
        component: () => import('@/views/taskConfig/processConfig/index'),
        meta: {
          title: 'menu.processTask_label',
          icon: 'skill',
          parent_id: 2,
          // roles: ['ProcessSetting'],

        },
      },
      {
        path: 'planTask',
        name: 'planTask_label',
        component: () => import('@/views/taskConfig/planConfig/index'),
        meta: {
          title: 'menu.planTask_label',
          icon: 'list',
          parent_id: 2,
          // roles: ['PlanSetting'],

        },
      },
    ],
  },
  // 报警配置
  {
    path: '/alarm',
    component: Layout,
    meta: {
      title: 'menu.alarm_label',
      icon: 'alarm_setting',
      id: 3,
      // roles: ['AlarmSetting'],
      // roles: ['vertify'],

    },
    children: [
      {
        path: 'alarm',
        name: 'alarm_label',
        component: () => import('@/views/alarm/index'),
        meta: {
          title: 'menu.alarm_label',
          icon: 'list',
          parent_id: 3,
          // roles: ['AlarmSetting'],

        },
      },
    ],
  },
  // 巡检记录
  {
    path: '/inspection',
    component: Layout,
    redirect: '/inspection/realAlarm',
    // name: 'RealAlarm',
    meta: {
      title: 'menu.dataRecord_label',
      icon: 'shuju_jilu',
      id: 5,
      // roles: ['DataRecord'],
      // roles: ['vertify'],

    },
    children: [
      {
        path: 'realAlarm',
        name: 'real_alarm_label',
        component: () =>
          import('@/views/inspectionRecord/realTimeAlarm/realAlarm'),
        meta: {
          title: 'menu.real_alarm_label',
          icon: 'battery',
          parent_id: 5,
          // roles: ['RealAlarm'],

        },
      },
      {
        path: 'historyAlarm',
        name: 'historyAlarm',
        component: () => import('@/views/inspectionRecord/historyAlarm/index'),
        meta: {
          title: 'menu.history_alarm_label',
          icon: 'battery',
          parent_id: 5,
          // roles: ['HistoryAlarm'],

        },
      },
      {
        path: 'task',
        name: 'real_alarm_task',
        component: () => import('@/views/inspectionRecord/realTimeTask/index'),
        meta: {
          title: 'menu.real_alarm_task',
          // roles: ['AlarmTask'],

          parent_id: 5,
        },
      },

      {
        path: 'equipAlarm',
        name: 'equip_alarm_label',
        component: () => import('@/views/inspectionRecord/equipAlarm/index'),
        meta: {
          title: 'menu.equip_alarm_label',
          icon: 'guide',
          parent_id: 5,
          // roles: ['PatrolData'],

        },
      },
      {
        path: 'dataRecord',
        name: '操作日志',
        component: () => import('@/views/inspectionRecord/dataRecord/index'),
        meta: {
          title: '操作日志',
          icon: 'guide',
          parent_id: 5,
          // roles: ['OperationLog'],

        },
      },
      {
        path: 'media',
        name: 'media',
        component: () => import('@/views/inspectionRecord/media/media'),
        meta: {
          title: '媒体文件',
          icon: 'battery',
          parent_id: 5,
          // roles: ['MediaFiles'],

        },
      },
    ],
  },

  //系统管理
  {
    path: '/system',
    component: Layout,
    meta: {
      title: 'menu.system',
      icon: '系统管理',
      id: 6,
      // roles: ['SystemManage'],

    },
    children: [
      {
        path: 'userManage',
        name: 'system_user_manage',
        component: () => import('@/views/systemManage/userManage/index'),
        meta: {
          title: 'menu.sys_u_mg',
          //   icon: 'battery',
          parent_id: 6,
          roles: ['UserManage'],
        },
      },
      {
        path: 'roleManage',
        name: 'system_role_manage',
        component: () => import('@/views/systemManage/roleManage/index'),
        meta: {
          title: 'menu.sys_role_mg',
          //   icon: 'battery',
          parent_id: 6,
          roles: ['RoleSetting'],
        },

      },
      {
        path: 'purviewManage',
        name: 'system_purview_manage',
        component: () => import('@/views/systemManage/purviewManage/index'),
        meta: {
          title: 'menu.sys_purview_mg',
          //   icon: 'battery',
          parent_id: 6,
          roles: ['PowerSetting'],
        },
      },
      {
        path: 'systemSetting',
        name: 'system_setting',
        component: () => import('@/views/systemManage/systemSetting/index'),
        meta: {
          title: 'menu.system_setting',
          //   icon: 'battery',
          parent_id: 6,
          roles: ['SysSetting'],
          
        },
        // hidden: true,

      },
      {
        path: 'licenseSetting',
        name: 'license_setting',
        component: () => import('@/views/systemManage/licenseSetting/index'),
        meta: {
          title: 'menu.license_setting',
          //   icon: 'battery',
          parent_id: 6,
          // roles: ['LicenseSetting'],
        },
      },
    ],
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
