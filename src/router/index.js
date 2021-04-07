/*
 * @Author: Edy
 * @Date: 2021-04-07 09:46:29
 * @LastEditTime: 2021-04-07 15:14:43
 * @LastEditors: Edy
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-template/src/router/index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = router
  router.matcher = newRouter.matcher
}

export default router