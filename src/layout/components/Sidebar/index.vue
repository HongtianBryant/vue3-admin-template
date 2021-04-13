<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables1.menuBg"
        :text-color="variables1.menuText"
        :unique-opened="false"
        :active-text-color="variables1.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables-export.scss'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'

export default {
  components: {
    SidebarItem,
    Logo
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const routes = router.options.routes
    const sidebar = computed(() => {
      return store.state.sidebar
    })

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
    const variables1 = computed(() => variables)

    return {
      routes,
      sidebar,
      isCollapse,
      activeMenu,
      showLogo,
      variables1
    }
  }
}
</script>
