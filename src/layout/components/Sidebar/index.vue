<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  components: { SidebarItem, Logo },
  setup() {
    const route = useRoute()
    const store = useStore

    const permission_routes = computed(() => store.state.permission_routes)
    const sidebar = computed(() => store.state.sidebar)

    const activeMenu = computed(() => {
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })

    const showLogo = computed(() => store.state.settings.sidebarLogo)
    const isCollapse = computed(() => !sidebar.opened)
    const variables = computed(() => variables)

    return {
      permission_routes,
      sidebar,
      isCollapse,
      activeMenu,
      showLogo,
      variables
    }
  }
}
</script>
