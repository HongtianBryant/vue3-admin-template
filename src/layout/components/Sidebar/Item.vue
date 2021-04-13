<script>
import { h } from 'vue'

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return () => {
      const vnodes = []

      if (props.icon) {
        if (props.icon.includes('el-icon')) {
          vnodes.push(<i class={[props.icon, 'sub-el-icon']} />)
        } else {
          vnodes.push(<svg-icon icon-class={props.icon}/>)
        }
      }

      if (props.title) {
        vnodes.push(<span slot='title'>{(props.title)}</span>)
      }
      return vnodes
    }
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
