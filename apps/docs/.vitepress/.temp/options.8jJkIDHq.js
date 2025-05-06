import { M as MentionSender } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "options",
  __ssrInlineRender: true,
  setup(__props) {
    const senderValue = ref("");
    const options = [
      {
        value: "value1",
        label: "选项1"
      },
      {
        value: "value2",
        label: "选项2",
        disabled: true
      },
      {
        value: "value3",
        label: "选项3"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MentionSender = MentionSender;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "20px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_MentionSender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        placeholder: "输入 / 触发指令弹框",
        clearable: "",
        options,
        "trigger-strings": ["/"]
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mentionSender/demos/options.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
