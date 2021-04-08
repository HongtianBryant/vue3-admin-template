<!--
 * @Author: Edy
 * @Date: 2021-04-07 09:53:40
 * @LastEditTime: 2021-04-08 16:48:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-template/src/views/dashboard/index.vue
-->
<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  components: { adminDashboard, editorDashboard },
  setup() {
    const store = useStore()
    const currentRole = ref('adminDashboard')

    const roles = computed(() => {
      return store.getters.roles
    })

    return {
      currentRole,
      roles
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
