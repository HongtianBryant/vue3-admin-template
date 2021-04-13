// import Vue from 'vue'
import { createApp } from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

const app = createApp()

// register globally
app.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
