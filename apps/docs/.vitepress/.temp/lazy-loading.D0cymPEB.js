import { bT as Conversations } from "./useSend.GCLvJHLh.js";
import { defineComponent, shallowRef, ref, mergeProps, unref, isRef, markRaw, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ChatLineRound, ChatDotRound } from "@element-plus/icons-vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "lazy-loading",
  __ssrInlineRender: true,
  setup(__props) {
    const lazyItems = shallowRef([
      {
        key: "l1",
        label: "初始项目1",
        prefixIcon: ChatLineRound
      },
      {
        key: "l2",
        label: "初始项目2",
        prefixIcon: ChatDotRound
      },
      {
        key: "l3",
        label: "初始项目3",
        prefixIcon: ChatLineRound
      },
      {
        key: "l4",
        label: "初始项目1",
        prefixIcon: ChatLineRound
      },
      {
        key: "l5",
        label: "初始项目2",
        prefixIcon: ChatDotRound
      },
      {
        key: "l6",
        label: "初始项目3",
        prefixIcon: ChatLineRound
      },
      {
        key: "l7",
        label: "初始项目1",
        prefixIcon: ChatLineRound
      },
      {
        key: "l8",
        label: "初始项目2",
        prefixIcon: ChatDotRound
      },
      {
        key: "l9",
        label: "初始项目3",
        prefixIcon: ChatLineRound
      }
    ]);
    const isLoading = ref(false);
    function loadMoreItems() {
      if (isLoading.value)
        return;
      isLoading.value = true;
      console.log("加载更多数据...");
      setTimeout(() => {
        const newItems = [
          {
            key: `l${lazyItems.value.length + 1}`,
            label: `加载的项目${lazyItems.value.length + 1}`,
            prefixIcon: markRaw(ChatLineRound)
          },
          {
            key: `l${lazyItems.value.length + 2}`,
            label: `加载的项目${lazyItems.value.length + 2}`,
            prefixIcon: markRaw(ChatDotRound)
          }
        ];
        lazyItems.value = [...lazyItems.value, ...newItems];
        isLoading.value = false;
      }, 2e3);
    }
    const activeKey6 = ref("l1");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Conversations = Conversations;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px", "height": "420px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Conversations, {
        active: unref(activeKey6),
        "onUpdate:active": ($event) => isRef(activeKey6) ? activeKey6.value = $event : null,
        items: unref(lazyItems),
        "label-max-width": 200,
        "row-key": "key",
        "show-tooltip": true,
        "load-more": loadMoreItems,
        "load-more-loading": unref(isLoading),
        "show-to-top-btn": ""
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/conversations/demos/lazy-loading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
