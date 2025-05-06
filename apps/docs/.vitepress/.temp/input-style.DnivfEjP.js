import { ElButton, ElIcon } from "element-plus";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/button/style/css";
import "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, useSSRContext } from "vue";
import { S as Sender } from "./index.CgbaXgqI.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { Promotion, Paperclip, ElementPlus } from "@element-plus/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "input-style",
  __ssrInlineRender: true,
  setup(__props) {
    const senderValue = ref("这是自定义输入框样式");
    const isSelect = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sender = Sender;
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "20px" } }, _attrs))} data-v-ed6d6f3a>`);
      _push(ssrRenderComponent(_component_Sender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        variant: "updown",
        "input-style": { backgroundColor: "rgb(243 244 246)", color: "#626aef", fontSize: "24px", fontWeight: 700 },
        style: { "background": "rgb(243 244 246)", "border-radius": "8px" }
      }, null, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        variant: "updown",
        "input-style": { backgroundColor: "transparent", color: "#F0F2F5", fontSize: "24px", fontWeight: 700 },
        style: { "background-image": "linear-gradient(to left, #434343 0%, black 100%)", "border-radius": "8px" }
      }, null, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        "input-style": { backgroundColor: "transparent", color: "#FF5454", fontSize: "20px", fontWeight: 700 },
        style: { "background-image": "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)", "border-radius": "8px" }
      }, null, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        variant: "updown",
        "input-style": { backgroundColor: "transparent", color: "#303133", fontSize: "16px", fontWeight: 700 },
        style: { "background-image": "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)", "border-radius": "8px" }
      }, {
        prefix: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px", "flex-wrap": "wrap" })}" data-v-ed6d6f3a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              round: "",
              plain: "",
              color: "#626aef"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Paperclip), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Paperclip))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(Paperclip))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="${ssrRenderClass({ isSelect: unref(isSelect) })}" style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "4px", "padding": "2px 12px", "border": "1px solid black", "border-radius": "15px", "cursor": "pointer", "font-size": "12px", "color": "black" })}" data-v-ed6d6f3a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ElementPlus), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ElementPlus))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span data-v-ed6d6f3a${_scopeId}>深度思考</span></div></div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "8px", "flex-wrap": "wrap" } }, [
                createVNode(_component_el_button, {
                  round: "",
                  plain: "",
                  color: "#626aef"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(Paperclip))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("div", {
                  class: { isSelect: unref(isSelect) },
                  style: { "display": "flex", "align-items": "center", "gap": "4px", "padding": "2px 12px", "border": "1px solid black", "border-radius": "15px", "cursor": "pointer", "font-size": "12px", "color": "black" },
                  onClick: ($event) => isSelect.value = !unref(isSelect)
                }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(ElementPlus))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "深度思考")
                ], 10, ["onClick"])
              ])
            ];
          }
        }),
        "action-list": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px" })}" data-v-ed6d6f3a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              round: "",
              color: "#626aef"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Promotion), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Promotion))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(Promotion))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "8px" } }, [
                createVNode(_component_el_button, {
                  round: "",
                  color: "#626aef"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(Promotion))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sender/demos/input-style.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const inputStyle = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ed6d6f3a"]]);
export {
  inputStyle as default
};
