/*
 * @Author: Edy
 * @Date: 2021-04-07 09:59:29
 * @LastEditTime: 2021-04-07 10:09:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-template/src/store/index.js
 */
import { createStore } from 'vuex'
import getters from './getters'

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
}, {})

export default createStore({
  modules,
  getters
})
