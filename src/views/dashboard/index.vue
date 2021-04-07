<!--
 * @Author: your name
 * @Date: 2021-04-07 09:53:40
 * @LastEditTime: 2021-04-07 09:53:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-template/src/views/dashboard/index.vue
-->
<template>
  <div>
    首页
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
export default {
  setup() {
    const state = reactive({
      name: ''
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
