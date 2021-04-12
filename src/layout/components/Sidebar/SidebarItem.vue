<template>
  <div v-if="!item.hidden">
    <!-- <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu> -->
    <template v-if="onlyOneChild">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="basePath"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import { computed, ref } from 'vue'

export default {
  name: 'SidebarItem',
  components: {
    Item,
    AppLink
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    console.log(props)
    // let onlyOneChild = ref(null)
    const basePath1 = props.basePath
    console.log(props.item)

    const onlyOneChild = computed(() => {
      if (!props.item.children) {
        return props.item
      }
      let oneChild
      const showingChildren = props.item.children.filter(item => {
        if (!item.hidden) {
          oneChild = item
        }
        return !item.hidden
      })

      // 可见的元素超过一个
      if (showingChildren.length > 1) return false

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return oneChild
      }

      if (showingChildren.length === 0) {
        return { ... parent, path: '', noShowingChildren: true }
      }

      return oneChild
    })

    const hasOneShowingChild = (children = [], parent) => {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild = item
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
    const resolvePath = (routePath) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(basePath1)) {
        return basePath1
      }
      return path.resolve(basePath1, routePath)
    }

    return {
      onlyOneChild,
      basePath1,
      hasOneShowingChild,
      resolvePath
    }
  }
}
</script>
