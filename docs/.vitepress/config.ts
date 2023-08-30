import { DefaultTheme, defineConfig } from 'vitepress'
import { components } from '../components'
import { mdPlugin } from './config/plugins'

const nav: DefaultTheme.NavItem[] = [
  { text: '指南', link: '/guide/' },
  { text: '组件', link: '/components/DpSelect/base.md' }
]

const sidebar: DefaultTheme.Sidebar = {
  '/guide': [
    {
      text: '指南',
      items: [
        { text: '组件库介绍', link: '/guide/' },
        { text: '快速开始', link: '/guide/quickstart' },
      ]
    }
  ],
  '/components': [{
    text: '组件',
    items: [
      ...components
    ]
  }]
}

export default defineConfig({
  title: 'dp-admin-ui',
  description: 'DP Vue3企业级中后台组件库',
  lang: 'cn-ZH',
  base: '/dp-ui',
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.jpg',
    siteTitle: 'dp-admin-ui',
    outline: 3,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pcyking/dp-ui' }
    ],
    nav,
    sidebar
  },
  markdown: {
    config: (md) => mdPlugin(md),
  },
})
