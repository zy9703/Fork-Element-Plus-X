import { bU as ThoughtChain } from "./useSend.nLhTyqQI.js";
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "status-key-test",
  __ssrInlineRender: true,
  setup(__props) {
    const thinkingItems = [
      {
        codeId: "1",
        self_status: "yes",
        isCanExpand: true,
        isDefaultExpand: true,
        title: "成功-主标题",
        thinkTitle: "思考内容标题-默认展开",
        thinkContent: "进行搜索文字".repeat(10)
      },
      {
        codeId: "2",
        title: "加载中-主标题",
        self_status: "load",
        isCanExpand: true,
        isDefaultExpand: false,
        thinkTitle: "思考内容标题",
        thinkContent: "进行搜索文字".repeat(10)
      },
      {
        codeId: "3",
        title: "失败-主标题",
        self_status: "no",
        isCanExpand: true,
        isDefaultExpand: false,
        thinkTitle: "思考内容标题",
        thinkContent: "进行搜索文字".repeat(10)
      },
      {
        codeId: "4",
        title: "谢谢-主标题",
        isCanExpand: true,
        isDefaultExpand: true,
        thinkTitle: "思考内容标题",
        thinkContent: "进行搜索文字".repeat(10)
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ThoughtChain = ThoughtChain;
      _push(ssrRenderComponent(_component_ThoughtChain, mergeProps({
        "thinking-items": thinkingItems,
        "row-key": "codeId",
        "status-key": "self_status",
        "status-enum": {
          loading: { value: "load", type: "warning", color: "" },
          error: { value: "no", type: "success", color: "" },
          success: { value: "yes", type: "danger", color: "" }
        }
      }, _attrs), {
        icon: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(console.log(item))}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(console.log(item)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/thoughtChain/demos/status-key-test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
