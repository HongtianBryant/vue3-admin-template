/*
 * @Author: your name
 * @Date: 2021-04-07 10:57:23
 * @LastEditTime: 2021-04-08 15:51:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-template/src/setting.js
 */
module.exports = {

  title: '后台管理模板',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  errorLog: 'production',

  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1
}
