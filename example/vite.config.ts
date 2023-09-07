import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslint from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    eslint()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    host: "0.0.0.0",
    port: 3300,
    open: true,
    cors: true,
    https: false,
  },
  envDir: path.resolve(__dirname, 'env'),
  build: {
    outDir: path.resolve(__dirname, '../dist')
  }
})
