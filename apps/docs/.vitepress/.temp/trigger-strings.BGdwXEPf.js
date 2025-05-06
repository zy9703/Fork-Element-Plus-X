import { M as MentionSender } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "trigger-strings",
  __ssrInlineRender: true,
  setup(__props) {
    const senderValue = ref("");
    const MOCK_DATA = {
      "@": ["Element-Plus-X", "HeJiaYue520", "JsonLee12138", "lisentowind", "ZRMYDYCG"],
      "#": ["1.0", "2.0", "3.0", "4.0", "5.0"]
    };
    const options = ref([]);
    function handleSearch(_, prefix) {
      console.log("handleSearch", _, prefix);
      options.value = (MOCK_DATA[prefix] || []).map((value) => ({
        value
      }));
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MentionSender = MentionSender;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "20px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_MentionSender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        placeholder: "输入 @ 和 # 触发指令弹框",
        clearable: "",
        options: unref(options),
        "trigger-strings": ["@", "#"],
        onSearch: handleSearch
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mentionSender/demos/trigger-strings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
