import type { Plugin, PluginOption } from 'vite'
// import path from 'node:path'
// import { fileURLToPath } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import { tsxAutoProps } from 'vite-plugin-tsx-auto-props'
// 导入demo插件
import vitepressDemo from 'vite-plugin-vitepress-demo'
import { tovUIResolver } from './scripts/vue-element-plus-x-resolver'

// 读取我们当前的根目录
// const baseUrl = fileURLToPath(new URL('.', import.meta.url))
const vueAutoImports = [
  'EffectScope',
  'computed',
  'createApp',
  'customRef',
  'defineAsyncComponent',
  'defineComponent',
  'effectScope',
  'getCurrentInstance',
  'getCurrentScope',
  ['h', 'vueH'] as [string, string],
  'inject',
  'isProxy',
  'isReactive',
  'isReadonly',
  'isRef',
  'markRaw',
  'nextTick',
  'onActivated',
  'onBeforeMount',
  'onBeforeUnmount',
  'onBeforeUpdate',
  'onDeactivated',
  'onErrorCaptured',
  'onMounted',
  'onRenderTracked',
  'onRenderTriggered',
  'onScopeDispose',
  'onServerPrefetch',
  'onUnmounted',
  'onUpdated',
  'onWatcherCleanup',
  'provide',
  'reactive',
  'readonly',
  'ref',
  'resolveComponent',
  'shallowReactive',
  'shallowReadonly',
  'shallowRef',
  'toRaw',
  'toRef',
  'toRefs',
  'toValue',
  'triggerRef',
  'unref',
  'useAttrs',
  'useCssModule',
  'useCssVars',
  'useId',
  'useModel',
  'useSlots',
  'useTemplateRef',
  'watch',
  'watchEffect',
  'watchPostEffect',
  'watchSyncEffect'
];
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      // imports: ['vue'],
      imports: {
        vue: vueAutoImports
      }
      // resolvers: [ElementPlusResolver()],
      // dts: 'packages/vue-element-plus-x/src/auto-imports.d.ts',
    }) as PluginOption,
    Components({
      resolvers: [
        tovUIResolver(),
        // ElementPlusResolver(),
      ],
    }) as PluginOption,
    tsxAutoProps(),
    vitepressDemo({
      // 我们让他自动搜索，我们所有项目中的demos下的vue文件
      // glob: ['**/demos/*.vue'],
    }) as PluginOption,
    vueJsx() as PluginOption,
    Unocss() as PluginOption,
    // eslint-disable-next-line ts/no-unsafe-call
    eslintPlugin({
      include: ['packages/**/*.js', 'packages/**/*.vue', 'packages/**/*.ts'], // 根据你的项目结构调整路径
      exclude: [
        '**/node_modules/**',
        '**/.gitignore',
        '**/dist/**',
        '**/cache/**',
      ],
    }),
    ElementPlus({}) as PluginOption,
  ] as Plugin[],
  // 我们使用vite中给我们提供的resolve配置项中的alias来实现一个重命名。
  resolve: {
    alias: [
      // {
      //   // 我们复制我们的utils中的配置，直接修改一下
      //   find: /^vue-element-plus-x/,
      //   // 然后再把utils替换成vue-element-plus-x，这样我们就完成了配置
      //   replacement: path.resolve(baseUrl, 'packages/vue-element-plus-x/src'),
      // },
      // {
      //   // 我们通过正则表达式去匹配以@vue-element-plus-x/utils的导入配置
      //   find: /^@vue-element-plus-x\/utils/,
      //   // 然后我们把路径替换成绝对路径地址
      //   replacement: path.resolve(baseUrl, 'packages/utils/src'),
      // },
      // {
      //   // 我们通过正则表达式去匹配以@vue-element-plus-x/icons
      //   find: /^@vue-element-plus-x\/icons/,
      //   // 然后我们把路径替换成绝对路径地址
      //   replacement: path.resolve(baseUrl, 'packages/icons/src'),
      // },
    ],
  },
})
