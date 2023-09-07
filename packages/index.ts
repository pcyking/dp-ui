import { Component, App } from 'vue'
import DpSelect from './select'
import DpSelectTable from './selectTable'
import DpButton from './button'
import './scss/index.scss'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 存储组件列表

const components : {
  [propName: string]: Component
} = {
  DpSelect,
  DpButton,
  DpSelectTable
} // components

const installComponents: any = (app: App) => {
  app.use(ElementPlus, {
    locale // 语言设置
  })

  for (const key in components) {
    app.component(key, components[key])
  }
}

// 全局动态添加组件
const install = (app: App): void => {
  installComponents(app)
}

// 按需引入
export { DpSelect, DpButton, DpSelectTable }
export default {
  install
}
