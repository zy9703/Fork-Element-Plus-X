import { bU as ThoughtChain } from "./useSend.nLhTyqQI.js";
import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "handle-expand",
  __ssrInlineRender: true,
  setup(__props) {
    const thinkingItems = [
      {
        codeId: "1",
        status: "success",
        isCanExpand: true,
        isDefaultExpand: true,
        self_title: "成功-主标题",
        self_thinkTitle: "思考内容标题-默认展开",
        self_thinkContent: "进行搜索文字".repeat(10)
      },
      {
        codeId: "2",
        self_title: "加载中-主标题",
        status: "loading",
        isCanExpand: true,
        isDefaultExpand: false,
        self_thinkTitle: "思考内容标题",
        self_thinkContent: "进行搜索文字".repeat(10)
      },
      {
        codeId: "3",
        self_title: "失败-主标题",
        status: "error",
        isCanExpand: true,
        isDefaultExpand: false,
        self_thinkTitle: "思考内容标题",
        self_thinkContent: "进行搜索文字".repeat(10)
      },
      {
        codeId: "4",
        self_title: "谢谢-主标题",
        status: "success",
        isCanExpand: true,
        isDefaultExpand: true,
        self_thinkTitle: "思考内容标题",
        self_thinkContent: "进行搜索文字".repeat(10)
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ThoughtChain = ThoughtChain;
      _push(ssrRenderComponent(_component_ThoughtChain, mergeProps({
        "thinking-items": thinkingItems,
        "row-key": "codeId",
        "title-key": "self_title",
        "think-title-key": "self_thinkTitle",
        "think-content-key": "self_thinkContent",
        onHandleExpand: (data) => console.log(data)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/thoughtChain/demos/handle-expand.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const handleExpand = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1a3689bb"]]);
export {
  handleExpand as default
};
