import type { PluginOption } from 'vite'
import prismjsPlugin from 'vite-plugin-prismjs'

// Prism.js 代码高亮插件配置
export default prismjsPlugin({
  languages: 'all', // 语言
  theme: 'default', // 主题
  // theme: 'okaidia', // 主题
  // plugins: ['line-numbers', 'show-language', 'copy-to-clipboard', 'inline-color'], // 插件
  // css: true, // 是否引入默认 CSS
}) as PluginOption
