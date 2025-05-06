import { bU as ThoughtChain } from "./useSend.nLhTyqQI.js";
import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "line-gradient",
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
      },
      {
        id: "2",
        status: "loading",
        isCanExpand: true,
        title: "加载-主标题",
        thinkTitle: "思考内容标题-默认展开",
        thinkContent: "进行搜索文字".repeat(20)
      },
      {
        id: "3",
        status: "error",
        isCanExpand: true,
        title: "失败-主标题",
        thinkTitle: "思考内容标题-默认展开",
        thinkContent: "进行搜索文字".repeat(20)
      },
      {
        id: "4",
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
        "line-gradient": ""
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/thoughtChain/demos/line-gradient.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
