import { defineConfig } from 'vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 设置neme属性

export default defineConfig({
  plugins: [
    VueJsx(),
    vueSetupExtend()
  ]
})
