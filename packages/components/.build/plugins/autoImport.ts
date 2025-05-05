import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

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

// const vueTypeReExports = [
//   'Component',
//   'Slot',
//   'Slots',
//   'ComponentPublicInstance',
//   'ComputedRef',
//   'DirectiveBinding',
//   'ExtractDefaultPropTypes',
//   'ExtractPropTypes',
//   'ExtractPublicPropTypes',
//   'InjectionKey',
//   'PropType',
//   'Ref',
//   'MaybeRef',
//   'MaybeRefOrGetter',
//   'VNode',
//   'WritableComputedRef'
// ];

// const vueTypeReExportsTarget = vueTypeReExports.map(item=> ({
//   name: item,
//   type: true
// }))

const plugins: PluginOption[] = [
  AutoImport({
    imports: [{
      vue: vueAutoImports
    }],
    // imports: ['vue'],
    resolvers: [ElementPlusResolver()],
    dts: 'src/auto-import.d.ts',
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
]

export default plugins
