import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import autoImportPlugin from './autoImport'
import dtsPlugin from './dts'
// import prismjsPlugin from './prismjs'

// 插件配置数组
const plugins: PluginOption[] = [
  vue({
    script: {
      propsDestructure: true, // 启用 props 解构
    },
  }),
  // prismjsPlugin, // Prism.js 代码高亮插件 (目前禁用)
  ...autoImportPlugin, // 自动导入插件
  dtsPlugin, // d.ts 文件生成插件
  libInjectCss(), // 样式注入插件
]

export default plugins
