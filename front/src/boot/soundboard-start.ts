import { boot } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import { getModule } from 'vuex-module-decorators'
import { UserStore } from 'src/store/user.store'

let routerInstance: VueRouter | undefined

export default boot(async ({ router, store }) => {
  routerInstance = router
  const userModule = getModule(UserStore, store)
  const localUser = userModule.userLocal
  if (localUser) {
    try {
      await userModule.handleGetUserProfile(localUser.email)
    } catch {
      routerInstance.push('/login')
    }
  }
})
export { routerInstance }
