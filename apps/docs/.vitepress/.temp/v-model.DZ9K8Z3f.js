import "./useSend.GCLvJHLh.js";
import { defineComponent, ref, unref, isRef, useSSRContext } from "vue";
import { T as Thinking } from "./index.C4Hfdfla.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "v-model",
  __ssrInlineRender: true,
  setup(__props) {
    const senderValue = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Thinking = Thinking;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Thinking, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        content: "欢迎使用 Element-Plus-X"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/thinking/demos/v-model.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
