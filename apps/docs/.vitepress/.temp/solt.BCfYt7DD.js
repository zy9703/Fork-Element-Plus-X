import "./useSend.GCLvJHLh.js";
import { defineComponent, ref, unref, isRef, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { T as Thinking } from "./index.C4Hfdfla.js";
import { ElRadioGroup, ElRadioButton } from "element-plus";
import "element-plus/es/components/radio-button/style/css";
import "element-plus/es/components/radio-group/style/css";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "solt",
  __ssrInlineRender: true,
  setup(__props) {
    const statusValue = ref("start");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio_button = ElRadioButton;
      const _component_Thinking = Thinking;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_radio_group, {
        modelValue: unref(statusValue),
        "onUpdate:modelValue": ($event) => isRef(statusValue) ? statusValue.value = $event : null,
        style: { "margin-bottom": "12px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_radio_button, { value: "start" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` start `);
                } else {
                  return [
                    createTextVNode(" start ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_radio_button, { value: "thinking" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` thinking `);
                } else {
                  return [
                    createTextVNode(" thinking ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_radio_button, { value: "end" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` end `);
                } else {
                  return [
                    createTextVNode(" end ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_radio_button, { value: "error" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` error `);
                } else {
                  return [
                    createTextVNode(" error ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_radio_button, { value: "start" }, {
                default: withCtx(() => [
                  createTextVNode(" start ")
                ]),
                _: 1
              }),
              createVNode(_component_el_radio_button, { value: "thinking" }, {
                default: withCtx(() => [
                  createTextVNode(" thinking ")
                ]),
                _: 1
              }),
              createVNode(_component_el_radio_button, { value: "end" }, {
                default: withCtx(() => [
                  createTextVNode(" end ")
                ]),
                _: 1
              }),
              createVNode(_component_el_radio_button, { value: "error" }, {
                default: withCtx(() => [
                  createTextVNode(" error ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Thinking, {
        status: unref(statusValue),
        content: "欢迎使用 Element-Plus-X",
        "button-width": "250px",
        "max-width": "100%"
      }, {
        "status-icon": withCtx(({ status }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (status === "start") {
              _push2(`<span${_scopeId}>😄</span>`);
            } else if (status === "error") {
              _push2(`<span${_scopeId}>😭</span>`);
            } else if (status === "thinking") {
              _push2(`<span${_scopeId}>🤔</span>`);
            } else if (status === "end") {
              _push2(`<span${_scopeId}>😊</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              status === "start" ? (openBlock(), createBlock("span", { key: 0 }, "😄")) : status === "error" ? (openBlock(), createBlock("span", { key: 1 }, "😭")) : status === "thinking" ? (openBlock(), createBlock("span", { key: 2 }, "🤔")) : status === "end" ? (openBlock(), createBlock("span", { key: 3 }, "😊")) : createCommentVNode("", true)
            ];
          }
        }),
        label: withCtx(({ status }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (status === "start") {
              _push2(`<span${_scopeId}>有什么指示嘛？</span>`);
            } else if (status === "thinking") {
              _push2(`<span${_scopeId}>容我想想</span>`);
            } else if (status === "end") {
              _push2(`<span${_scopeId}>想出来了</span>`);
            } else if (status === "error") {
              _push2(`<span${_scopeId}>想不出来</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              status === "start" ? (openBlock(), createBlock("span", { key: 0 }, "有什么指示嘛？")) : status === "thinking" ? (openBlock(), createBlock("span", { key: 1 }, "容我想想")) : status === "end" ? (openBlock(), createBlock("span", { key: 2 }, "想出来了")) : status === "error" ? (openBlock(), createBlock("span", { key: 3 }, "想不出来")) : createCommentVNode("", true)
            ];
          }
        }),
        arrow: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>👇</span>`);
          } else {
            return [
              createVNode("span", null, "👇")
            ];
          }
        }),
        content: withCtx(({ content, status }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(status)}: ${ssrInterpolate(content)}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(status) + ": " + toDisplayString(content), 1)
            ];
          }
        }),
        error: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>抱歉，无法解决您的问题</span>`);
          } else {
            return [
              createVNode("span", null, "抱歉，无法解决您的问题")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/thinking/demos/solt.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
