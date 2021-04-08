/*
 * @Author: Edy
 * @Date: 2021-04-07 09:59:29
 * @LastEditTime: 2021-04-08 16:36:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-template/src/store/index.js
 */
import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import user from './modules/user'

export default createStore({
  modules: {
    app,
    errorLog,
    permission,
    settings,
    tagsView,
    user
  },
  getters
})
