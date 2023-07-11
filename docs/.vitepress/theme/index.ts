import DefaultTheme from 'vitepress/theme'
// import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import { EnhanceAppContext } from 'vitepress'
import { VPDemo } from '../vitepress'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import DpUi from '../../../packages/dp-demo-ui'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.use(ElementPlus, {
      locale, // 语言设置
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    ctx.app.use(ElementPlus)
    ctx.app.use(DpUi)
    ctx.app.component('Demo', VPDemo)

    // ctx.app.component('demo-preview', AntDesignContainer)
  }
}
