<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const linkTo = reactive(props.to)

    const isExternal = computed(() => {
      return isExternal(this.to)
    })

    const type = computed(() => {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    })

    const linkProps = (to) => {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }

    return {
      linkTo,
      isExternal,
      type,
      linkProps
    }
  }
}
</script>
