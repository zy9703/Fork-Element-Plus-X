import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

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
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // imports: ["vue"],
      imports: {
        vue: vueAutoImports
      },
      resolvers: [ElementPlusResolver({
        exclude: /ElButtonGroup/ // 忽略自动导入 ElButtonGroup
      })],
      dts: 'src/auto-import.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
