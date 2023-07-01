import { App } from 'vue'
import Foo from '@dp-ui/foo'
import Card from '@dp-ui/card'
import '../scss/index.scss'

const components = [
  Foo,
  Card
] // components

// 全局动态添加组件
const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install
}
