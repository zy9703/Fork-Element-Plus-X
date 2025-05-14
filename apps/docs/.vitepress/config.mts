import type { Plugin } from 'vitepress'
// import { prismjsPlugin } from 'vite-plugin-prismjs'
import { defineConfig } from 'vitepress'
// 另一种 demo 插件
// import { vitepressDemoPlugin } from 'vitepress-demo-plugin'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Element-Plus-X',
  description: '一个 Vue3 + Element-Plus AI体验组件库',
  // locales: {
  //   root: {
  //     label: '简体中文',
  //     lang: 'zh-CN',
  //   },
  //   en: {
  //     label: 'English',
  //     lang: 'en', // 可选，将作为 `lang` 属性添加到 `html` 标签中
  //     link: '/en/', // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的
  //     themeConfig: {
  //       nav: [
  //         { text: '💌 Invitation', link: '/introduce' },
  //         { text: '🎀 Roadmap', link: '/roadmap' },
  //         { text: '📆 Changelog', link: '/update-log' },
  //         { text: '🧭 Guide', link: '/guide/install/' },
  //         { text: '🎨 Components', link: '/components/typewriter/' },
  //       ],
  //     },
  //   },
  // },
  rewrites: {
    // 'docs/(.*)': '(.*)',
    // 'packages/icons/docs/(.*)': 'components/icons/(.*)',
    // 'packages/vue-element-plus-x/src/:path/(.*)': 'components/:path/(.*)',
    // 'packages/utils/src/:path/(.*)': 'utils/:path/(.*)',
    // 'docs/guide/:path/(.*)': 'guide/:path/(.*)',
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    nav: [
      // 这里大家需要注意我们直接写/introduce，他会自动读取我们运行目录中的introduce.md文件
      // 我们来实现一下这个文件，
      // 我们的根目录就是我们的项目的根目录
      // { text: '介绍', link: '/introduce' },
      // 我们这种最后带着斜杠的，他真正读取的是我们根目录下的components/index.md的文件，那么我们先创建一下这个文件
      { text: '💌 交流邀请', link: '/introduce' },
      { text: '🎀 开发计划', link: '/roadmap' },
      { text: '📆 更新日志', link: '/update-log' },
      { text: '🧭 指南', link: '/guide/install/' },
      { text: '🎨 组件', link: '/components/typewriter/' },
      // { text: '工具', link: '/utils/' },
    ],
    // 我们将sidebar变成一个对象，然后我们将nav中的link做为key，这个key对应的value就是数组
    // 我们先来实现一下这个数组
    sidebar: {
      '/components/': [
        {
          text: '通用',
          items: [
            // 自定义组件
            { text: 'Typewriter 打字器 ✍', link: '/components/typewriter/' },
            { text: 'Bubble 对话气泡 🔥', link: '/components/bubble/' },
            { text: 'BubbleList 气泡列表 🍅', link: '/components/bubbleList/' },
            { text: 'Conversations 会话管理 📱', link: '/components/conversations/' },
          ],
        },
        {
          text: '唤醒',
          items: [
            { text: 'Welcome 欢迎 🌹', link: '/components/welcome/' },
            { text: 'Prompts 提示集 🎁', link: '/components/prompts/' },
          ],
        },
        {
          text: '表达',
          items: [
            { text: 'FilesCard 文件卡片 📇', link: '/components/filesCard/' },
            { text: 'Attachments 输入附件 📪️', link: '/components/attachments/' },
            { text: 'Sender 输入框 💭', link: '/components/sender/' },
            { text: 'MentionSender 提及输入框 🦥', link: '/components/mentionSender/' },
          ],
        },
        {
          text: '确认',
          items: [
            { text: 'Thinking 思考中 🍓', link: '/components/thinking/' },
            { text: 'ThoughtChain 思维链 🔗', link: '/components/thoughtChain/' },
          ],
        },
        {
          text: '工具',
          items: [
            { text: 'useRecord 🌴', link: '/components/useRecord/' },
            { text: 'useXStream 🌱', link: '/components/useXStream/' },
            { text: 'useSend & XRequest 🌳', link: '/components/useSend/' },
          ],
        },
      ],
      // 指南
      '/guide/': [
        {
          text: '基础',
          items: [
            { text: '📦 安装指南', link: '/guide/install' },
            { text: '🗝 开发指南', link: '/guide/develop' },
          ],
        },
      ],

    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/HeJiaYue520/Element-Plus-X' },
      {
        icon: {
          svg: '<svg t="1741408990097" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1514" width="200" height="200"><path d="M64 960V128h832v832z" fill="#CB3837" p-id="1515"></path><path d="M192 320h576v512h-128V448H448v384H192z" fill="#FFFFFF" p-id="1516"></path></svg>',
        },
        link: 'https://www.npmjs.com/package/vue-element-plus-x',
      },
    ],
    // git提交的更新
    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },
    // 定义 footer 内容
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © Element-Plus-X ${new Date().getFullYear()}&nbsp;&nbsp;<a href="https://beian.miit.gov.cn/" target="_blank">赣ICP备2025057058号-1</a> `,
    },

    // 中文配置
    // 文档底部
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '最后更新于',
    // editLink: {
    //   pattern: "https://github.com/yunyoujun/chat-ui/edit/main/docs/:path",
    //   text: "在 GitHub 上编辑此页",
    // },
    darkModeSwitchLabel: '深色模式',
    // lightModeSwitchTitle: '切换到浅色模式',
    // darkModeSwitchTitle: '切换到深色模式',
    outline: {
      label: '📖 目录',
      level: [2, 6],
    },
  },
  // markdown 配置
  markdown: {
    // 显示代码行数
    lineNumbers: true,
    container: {
      tipLabel: '💡 提示',
      warningLabel: '📌 注意',
      dangerLabel: '💔 危险',
      infoLabel: '💌 消息',
      detailsLabel: '🎨 展开',
    },
    config(md) {
      // md.use(vitepressDemoPlugin)
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      // 配置vitepress的插件
      // https://github.com/antfu/vite-plugin-inspect
      // 插件调试
      // inspect(),
      // https://github.com/antfu/vite-plugin-pages
      // 页面路由
      // prismjsPlugin({
      //   languages: 'all', // 语言
      //   theme: 'default', // 主题
      // }) as Plugin,
      groupIconVitePlugin() as Plugin,
    ],
    ssr: {
      noExternal: ['element-plus']
    }
  },
})
