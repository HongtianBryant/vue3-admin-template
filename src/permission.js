/*
 * @Author: your name
 * @Date: 2021-04-07 10:57:38
 * @LastEditTime: 2021-04-08 15:42:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-template/src/permission.js
 */
import router from './router'
import { useStore } from 'vuex'
import { getToken } from '@/utils/auth'

const store = useStore()

const whiteList = ['/login', '/']

router.beforeEach(async(to, from, next) => {
  document.title = '模板'
  console.log(router)
  next()
  return

  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})
