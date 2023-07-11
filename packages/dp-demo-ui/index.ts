import { Component, App } from 'vue'
import Foo from '../foo'
import Card from '../card'
import '../scss/index.scss'

// 存储组件列表

const components : {
  [propName: string]: Component
} = {
  Foo,
  Card
} // components

// 全局动态添加组件
const install = (app: App): void => {
  // components.forEach(component => {
  //   app.component(component.name, component)
  // })
  for (const key in components) {
    app.component(key, components[key])
  }
}

// 按需引入
export { Foo, Card }
export default {
  install
}
