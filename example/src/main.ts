import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import DpElUi from 'dp-el-ui' // 全局引入

const env = import.meta.env
console.log(env)

const app = createApp(App)
app.use(ElementPlus)
app.use(DpElUi)
app.mount('#app')
