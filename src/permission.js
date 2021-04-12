/*
 * @Author: your name
 * @Date: 2021-04-07 10:57:38
 * @LastEditTime: 2021-04-08 18:55:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-template/src/permission.js
 */
import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()
  console.log(hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters.name
      // 设置底部tabbar激活状态

      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          // await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      console.log(111)
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})
