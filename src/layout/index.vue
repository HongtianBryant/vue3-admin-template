<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import { notify } from 'element-plus'
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

const { body } = document
const WIDTH = 992

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  sockets: {
    // 监听notify事件，方法是后台定义和提供的
    notify(data) {
      // 判断消息id是否与所要展示的任务一致
      if (data && data.notifyId === 'testing') {
        notify({
          title: '提示',
          message: data.message,
          duration: 0
        })
      }
    }
  },
  setup() {
    const store = useStore()
    const $_isMobile = () => {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }
    const $_resizeHandler = () => {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }

    const handleClickOutside = () => {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }

    watch(
      '$route', () => {
        if (device === 'mobile' && sidebar.opened) {
          store.dispatch('app/closeSideBar', { withoutAnimation: false })
        }
      }
    )

    onMounted(() => {
      const isMobile = $_isMobile()
      if (isMobile) {
        store.dispatch('app/toggleDevice', 'mobile')
        store.dispatch('app/closeSideBar', { withoutAnimation: true })
      }
    })

    const classObj = computed(() => {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    })
    const sidebar = computed(() => store.state.sidebar)
    const device = computed(() => store.state.device)
    const showSettings = computed(() => store.state.showSettings)
    const needTagsView = computed(() => store.state.needTagsView)
    const fixedHeader = computed(() => store.state.fixedHeader)

    return {
      // state
      sidebar,
      device,
      showSettings,
      needTagsView,
      fixedHeader,
      // methods
      $_isMobile,
      $_resizeHandler,
      handleClickOutside,
      // computed
      classObj
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
