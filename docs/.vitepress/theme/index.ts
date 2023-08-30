import DefaultTheme from 'vitepress/theme'
import { VPDemo } from '../vitepress'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import DpUi from '../../../packages'

// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }

    ctx.app.use(DpUi)
    ctx.app.component('Demo', VPDemo)
  }
}
