import { ElSwitch } from "element-plus";
import "element-plus/es/components/switch/style/css";
import { B as Bubble } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "loading",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const content = ref("hello world !");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Bubble = Bubble;
      const _component_el_switch = ElSwitch;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "10px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Bubble, {
        content: unref(content),
        loading: unref(loading)
      }, null, _parent));
      _push(ssrRenderComponent(_component_Bubble, {
        content: unref(content),
        loading: unref(loading)
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>loading...</div>`);
          } else {
            return [
              createVNode("div", null, "loading...")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Bubble, {
        content: unref(content),
        loading: unref(loading)
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>感谢使用 Element-Plus-X 🌹 请稍后...</div>`);
          } else {
            return [
              createVNode("div", null, "感谢使用 Element-Plus-X 🌹 请稍后...")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}"><span>状态：</span>`);
      _push(ssrRenderComponent(_component_el_switch, {
        modelValue: unref(loading),
        "onUpdate:modelValue": ($event) => isRef(loading) ? loading.value = $event : null
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubble/demos/loading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
