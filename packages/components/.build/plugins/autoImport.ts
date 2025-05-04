import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

const plugins: PluginOption[] = [
  AutoImport({
    // imports: [{
    //   vue: ['computed', 'createApp', 'ref', 'watchEffect', 'watch', ['h', 'vueH']]
    // }],
    imports: ['vue'],
    resolvers: [ElementPlusResolver()],
    dts: 'src/auto-import.d.ts',
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
]

export default plugins
