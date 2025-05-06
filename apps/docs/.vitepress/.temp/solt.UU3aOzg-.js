import { ElIcon } from "element-plus";
import "element-plus/es/components/icon/style/css";
import { bU as ThoughtChain } from "./useSend.GCLvJHLh.js";
import { defineComponent, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { SuccessFilled, CircleCloseFilled, Loading } from "@element-plus/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "solt",
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
      const _component_el_icon = ElIcon;
      _push(ssrRenderComponent(_component_ThoughtChain, mergeProps({
        "thinking-items": thinkingItems,
        "row-key": "codeId",
        "title-key": "self_title",
        "think-title-key": "self_thinkTitle",
        "think-content-key": "self_thinkContent"
      }, _attrs), {
        icon: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (item.status === "success") {
              _push2(`<span style="${ssrRenderStyle({ "font-size": "18px", "margin-left": "7px", "color": "var(--el-color-success)" })}" data-v-d4cca468${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(SuccessFilled), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(SuccessFilled))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (item.status === "error") {
              _push2(`<span style="${ssrRenderStyle({ "font-size": "18px", "margin-left": "7px", "color": "var(--el-color-danger)" })}" data-v-d4cca468${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(CircleCloseFilled), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(CircleCloseFilled))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (item.status === "loading") {
              _push2(`<span style="${ssrRenderStyle({ "font-size": "18px", "margin-left": "7px" })}" data-v-d4cca468${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Loading), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Loading))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              item.status === "success" ? (openBlock(), createBlock("span", {
                key: 0,
                style: { "font-size": "18px", "margin-left": "7px", "color": "var(--el-color-success)" }
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(SuccessFilled))
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true),
              item.status === "error" ? (openBlock(), createBlock("span", {
                key: 1,
                style: { "font-size": "18px", "margin-left": "7px", "color": "var(--el-color-danger)" }
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(CircleCloseFilled))
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true),
              item.status === "loading" ? (openBlock(), createBlock("span", {
                key: 2,
                style: { "font-size": "18px", "margin-left": "7px" }
              }, [
                createVNode(_component_el_icon, { class: "is-loading" }, {
                  default: withCtx(() => [
                    createVNode(unref(Loading))
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/thoughtChain/demos/solt.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const solt = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d4cca468"]]);
export {
  solt as default
};
