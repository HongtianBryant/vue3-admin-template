/*
 * @Author: your name
 * @Date: 2021-04-07 10:03:38
 * @LastEditTime: 2021-04-07 10:03:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-template/src/store/getters.js
 */
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}

export default getters
