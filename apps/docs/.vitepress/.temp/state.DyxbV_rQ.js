import "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, isRef, useSSRContext } from "vue";
import { S as Sender } from "./index.CgbaXgqI.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "state",
  __ssrInlineRender: true,
  setup(__props) {
    const senderReadOnlyValue = ref(`只读：💌 欢迎使用 Element-Plus-X ~`);
    const senderClearableValue = ref(`可删除：💌 欢迎使用 Element-Plus-X ~`);
    function handleSubmit(value) {
      console.log(value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sender = Sender;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Sender, {
        loading: "",
        placeholder: "加载中...",
        onSubmit: handleSubmit
      }, null, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        modelValue: unref(senderReadOnlyValue),
        "onUpdate:modelValue": ($event) => isRef(senderReadOnlyValue) ? senderReadOnlyValue.value = $event : null,
        "read-only": "",
        onSubmit: handleSubmit
      }, null, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        value: "禁用：💌 欢迎使用 Element-Plus-X ~",
        disabled: "",
        onSubmit: handleSubmit
      }, null, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        modelValue: unref(senderClearableValue),
        "onUpdate:modelValue": ($event) => isRef(senderClearableValue) ? senderClearableValue.value = $event : null,
        clearable: "",
        onSubmit: handleSubmit
      }, null, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        style: { "width": "fit-content" },
        value: "输入框最大宽度：💌 欢迎使用 Element-Plus-X ~",
        "input-width": "150px",
        onSubmit: handleSubmit
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sender/demos/state.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
