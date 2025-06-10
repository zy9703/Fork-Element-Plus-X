import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// 自动导入插件配置
const plugins: PluginOption[] = [
  AutoImport({
    imports: ['vue'], // 自动导入 vue 相关的 API
    ignore: ['h'], // 忽略 h 函数，避免与 jsx 冲突
    resolvers: [ElementPlusResolver()], // Element Plus 组件解析器
    dts: 'src/auto-import.d.ts', // 自动导入的类型声明文件
  }),
  Components({
    resolvers: [ElementPlusResolver()], // Element Plus 组件解析器
  }),
]

export default plugins
