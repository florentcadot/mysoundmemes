import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { StateInterface } from '../store';
import routes from './routes';
import { Route } from 'vue-router/types/router';
import { getModule } from 'vuex-module-decorators';
import { UserStore } from 'src/store/user.store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>( function ({ Vue, store }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });


  const userModule = getModule(UserStore, store)
  userModule.checkIsUserLoggedIn()

  Router.beforeEach((to: Route, from: Route, next: (go?: string) => void) => {
    if(to.matched.some(record => record.meta.requiresAuth) && !(store.getters.isUserLogged)){
      next('/login')
    } else {
      next()
    }
  })

  return Router;
})
