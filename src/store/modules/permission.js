import { asyncRoutes, constantRoutes } from '@/router';
import {setRouterRoles } from '@/utils/auth'

import Cookies from 'js-cookie'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    console.log('查看问题',roles.some((role) => route.meta.roles.includes(role)))
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
    const routeRoles = state.routes
  },
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      let accessedRoutes;
      //   if (roles.includes('admin')) {
      //     accessedRoutes = asyncRoutes || [];
      //   } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      //   }
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
