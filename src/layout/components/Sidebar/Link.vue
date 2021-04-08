<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'
import { reactive, computed } from 'vue'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const linkTo = reactive(props.to)

    const isExternalUrl = computed(() => {
      return isExternal(linkTo)
    })

    const type = computed(() => {
      if (isExternalUrl) {
        return 'a'
      }
      return 'router-link'
    })

    const linkProps = (to) => {
      if (isExternalUrl) {
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
      isExternalUrl,
      type,
      linkProps
    }
  }
}
</script>
