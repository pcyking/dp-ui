import { App } from 'vue'
import Foo from '../foo'
import Card from '../card'
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

// 按需引入
export { Foo, Card }
export default {
  install
}
