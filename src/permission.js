import router from './router';
import store from './store';
import { Message, Notification } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken,getRouterRoles } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({
  showSpinner: false,
}); // NProgress Configuration

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  //cgw
  // const {
  //   roles
  // } = store.dispatch('user/getInfo')
  // const accessRoutes = store.dispatch('permission/generateRoutes', roles)
  // next()
  // return
  //cgw
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/',
      });
      NProgress.done();
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      const roling =   sessionStorage.getItem('sessionRoles')

      console.log('查看hasroles',store.getters.roles)
      if (hasRoles) {
        next();
      } else {

        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const info = await store.dispatch('user/getInfo');
          const { powerList: roles } = info;
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          );
          // dynamically add accessible routes
          router.addRoutes(accessRoutes);

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({
            ...to,
            replace: true,
          });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken');
          Notification({
            title: '提示',
            duration: 1000,
            message: error || 'Has Error',
            type: 'error',
            // duration: 5 * 1000,
          });
          //   Notification.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
