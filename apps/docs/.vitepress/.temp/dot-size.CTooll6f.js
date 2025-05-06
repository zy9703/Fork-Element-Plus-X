import { bU as ThoughtChain } from "./useSend.nLhTyqQI.js";
import { defineComponent, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dot-size",
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
        thinkContent: "进行搜索文字".repeat(10)
      },
      {
        id: "2",
        title: "加载中-主标题",
        status: "loading",
        isCanExpand: true,
        isDefaultExpand: false,
        thinkTitle: "思考内容标题",
        thinkContent: "进行搜索文字".repeat(10)
      },
      {
        id: "3",
        title: "失败-主标题",
        status: "error",
        isCanExpand: true,
        isDefaultExpand: false,
        thinkTitle: "思考内容标题",
        thinkContent: "进行搜索文字".repeat(10)
      },
      {
        id: "4",
        hideTitle: true,
        status: "loading",
        isCanExpand: true,
        isDefaultExpand: true,
        thinkTitle: "隐藏主标题，思考内容标题-默认展开",
        thinkContent: "进行搜索文字".repeat(10)
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ThoughtChain = ThoughtChain;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_ThoughtChain, {
        "thinking-items": thinkingItems,
        "dot-size": "small"
      }, null, _parent));
      _push(ssrRenderComponent(_component_ThoughtChain, {
        "thinking-items": thinkingItems,
        "dot-size": "large"
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/thoughtChain/demos/dot-size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
