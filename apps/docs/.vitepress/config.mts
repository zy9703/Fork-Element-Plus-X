import { defineConfig } from "vitepress";
import path from "path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Element-Plus-X",
  description: '一个 Vue3 + Element-Plus AI体验组件库',
  // srcDir: "",
  
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    // logo
    logo: "/logo.png",
    // 显示隐藏标题
    // siteTitle: false,

    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "💌交流邀请", link: "/components/Users" }],

    sidebar: [
      {
        text: "基础组件",
        items: [
          { text: "Bubble 气泡", link: "/components/Bubble" },
          { text: "BubbleList 气泡列表", link: "/components/BubbleList" },
          { text: "Sender 输入框", link: "/components/Sender" },
          { text: "Typography 打字器", link: "/components/Typography" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/HeJiaYue520/Element-Plus-X" },
      {
        icon: {
          svg: '<svg t="1741408990097" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1514" width="200" height="200"><path d="M64 960V128h832v832z" fill="#CB3837" p-id="1515"></path><path d="M192 320h576v512h-128V448H448v384H192z" fill="#FFFFFF" p-id="1516"></path></svg>',
        },
        link: "https://www.npmjs.com/package/vue-element-plus-x",
      },
    ],

    // git提交的更新
    lastUpdated: {
      text: "更新时间",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    },

    // 定义 footer 内容
    footer: {
      // message: 'Released under the MIT License.',
      // copyright: `Copyright © 2024-${new Date().getFullYear()}&nbsp;&nbsp;<a href="https://github.com/yunyoujun" target="_blank">@yunyoujun</a>`,
    },

    // 中文配置
    // 文档底部
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "最后更新于",
    // editLink: {
    //   pattern: "https://github.com/yunyoujun/chat-ui/edit/main/docs/:path",
    //   text: "在 GitHub 上编辑此页",
    // },
    darkModeSwitchLabel: "深色模式",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    outline: {
      label: "如何使用",
      level: [2, 6],
    },

    // 搜索相关配置
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
  },

  // markdown 配置
  markdown: {
    // 显示代码行数
    lineNumbers: true,
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "展开",
    },
  },

  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "vitepress"),
      },
    },
  },
});
