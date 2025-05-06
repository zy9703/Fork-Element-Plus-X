import { ElButton, ElIcon } from "element-plus";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/button/style/css";
import { M as MentionSender } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { Promotion, Paperclip, ElementPlus } from "@element-plus/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "variant",
  __ssrInlineRender: true,
  setup(__props) {
    const senderValue = ref("");
    const isSelect = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MentionSender = MentionSender;
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "20px" } }, _attrs))} data-v-9c17f2f9>`);
      _push(ssrRenderComponent(_component_MentionSender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        variant: "updown"
      }, null, _parent));
      _push(ssrRenderComponent(_component_MentionSender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        variant: "updown",
        clearable: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_MentionSender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        variant: "updown",
        clearable: "",
        "allow-speech": ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_MentionSender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        variant: "updown",
        "auto-size": { minRows: 2, maxRows: 5 },
        clearable: "",
        "allow-speech": "",
        placeholder: "💌 在这里你可以自定义变体后的 prefix 和 action-list"
      }, {
        prefix: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px", "flex-wrap": "wrap" })}" data-v-9c17f2f9${_scopeId}>`);
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
            _push2(`<div class="${ssrRenderClass({ isSelect: unref(isSelect) })}" style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "4px", "padding": "2px 12px", "border": "1px solid silver", "border-radius": "15px", "cursor": "pointer", "font-size": "12px" })}" data-v-9c17f2f9${_scopeId}>`);
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
            _push2(`<span data-v-9c17f2f9${_scopeId}>深度思考</span></div> 左边是自定义 prefix 前缀 右边是自定义 操作列表 </div>`);
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
                  style: { "display": "flex", "align-items": "center", "gap": "4px", "padding": "2px 12px", "border": "1px solid silver", "border-radius": "15px", "cursor": "pointer", "font-size": "12px" },
                  onClick: ($event) => isSelect.value = !unref(isSelect)
                }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(ElementPlus))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "深度思考")
                ], 10, ["onClick"]),
                createTextVNode(" 左边是自定义 prefix 前缀 右边是自定义 操作列表 ")
              ])
            ];
          }
        }),
        "action-list": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px" })}" data-v-9c17f2f9${_scopeId}>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mentionSender/demos/variant.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const variant = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9c17f2f9"]]);
export {
  variant as default
};
