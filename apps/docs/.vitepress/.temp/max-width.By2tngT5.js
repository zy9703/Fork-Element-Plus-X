import { bU as ThoughtChain } from "./useSend.nLhTyqQI.js";
import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "max-width",
  __ssrInlineRender: true,
  setup(__props) {
    const thinkingItems = [
      {
        id: "1",
        status: "success",
        isCanExpand: true,
        isDefaultExpand: true,
        title: "成功-主标题",
        thinkTitle: "思考内容标题-默认展开",
        thinkContent: "进行搜索文字".repeat(20)
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ThoughtChain = ThoughtChain;
      _push(ssrRenderComponent(_component_ThoughtChain, mergeProps({
        "thinking-items": thinkingItems,
        "max-width": "calc(100% - 300px)"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/thoughtChain/demos/max-width.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
