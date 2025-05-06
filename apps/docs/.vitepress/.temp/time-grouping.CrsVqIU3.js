import { bT as Conversations } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, unref, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "time-grouping",
  __ssrInlineRender: true,
  setup(__props) {
    const timeBasedItems = ref([
      {
        id: "1",
        label: "今天的会话111111111111111111111111111",
        group: "today",
        disabled: true
      },
      {
        id: "2",
        group: "today",
        label: "今天的会话2"
      },
      {
        id: "3",
        group: "yesterday",
        label: "昨天的会话1"
      },
      {
        id: "4",
        label: "昨天的会话2"
      },
      {
        id: "5",
        label: "一周前的会话"
      },
      {
        id: "6",
        label: "一个月前的会话"
      },
      {
        id: "7",
        label: "很久以前的会话"
      }
    ]);
    const activeKey1 = ref("1");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Conversations = Conversations;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px", "height": "420px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Conversations, {
        active: unref(activeKey1),
        "onUpdate:active": ($event) => isRef(activeKey1) ? activeKey1.value = $event : null,
        items: unref(timeBasedItems),
        groupable: "",
        "label-max-width": 200,
        "show-tooltip": false,
        "row-key": "id"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/conversations/demos/time-grouping.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
