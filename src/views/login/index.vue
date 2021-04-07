<!--
 * @Author: your name
 * @Date: 2021-04-07 09:51:43
 * @LastEditTime: 2021-04-07 09:51:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-template/src/views/login/index.vue
-->
<template>
  <div class="login-container">
    dd
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
export default {
  setup() {
    const state = reactive({
      loginName: ''
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
