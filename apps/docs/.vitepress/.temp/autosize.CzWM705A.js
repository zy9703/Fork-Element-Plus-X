import "./useSend.nLhTyqQI.js";
import { defineComponent, mergeProps, unref, isRef, useSSRContext } from "vue";
import { S as Sender } from "./index.CgbaXgqI.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "autosize",
  __ssrInlineRender: true,
  setup(__props) {
    const longerValue = `💌 欢迎使用 Element-Plus-X ~`.repeat(30);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sender = Sender;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Sender, { "auto-size": { minRows: 2, maxRows: 5 } }, null, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        modelValue: unref(longerValue),
        "onUpdate:modelValue": ($event) => isRef(longerValue) ? longerValue.value = $event : null
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sender/demos/autosize.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
