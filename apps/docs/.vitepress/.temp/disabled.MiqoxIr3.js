import "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, unref, isRef, useSSRContext } from "vue";
import { T as Thinking } from "./index.C4Hfdfla.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "disabled",
  __ssrInlineRender: true,
  setup(__props) {
    const senderValue = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Thinking = Thinking;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "gap": "10px", "flex-direction": "column", "align-items": "flex-start", "justify-content": "flex-start" } }, _attrs))}><div>`);
      _push(ssrRenderComponent(_component_Thinking, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        disabled: "",
        content: "欢迎使用 Element-Plus-X",
        status: "start"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_Thinking, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        disabled: "",
        content: "欢迎使用 Element-Plus-X",
        status: "thinking"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_Thinking, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        disabled: "",
        content: "欢迎使用 Element-Plus-X",
        status: "end"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_Thinking, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        disabled: "",
        content: "欢迎使用 Element-Plus-X",
        status: "error"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/thinking/demos/disabled.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
