import { ElButton, ElIcon } from "element-plus";
import "./useSend.nLhTyqQI.js";
import { defineComponent, ref, onMounted, mergeProps, withCtx, unref, createTextVNode, toDisplayString, isRef, createVNode, withModifiers, useSSRContext } from "vue";
import { S as Sender } from "./index.CgbaXgqI.js";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { CircleClose } from "@element-plus/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const senderRef = ref();
    const senderValue = ref("");
    const showHeaderFlog = ref(false);
    onMounted(() => {
      showHeaderFlog.value = true;
      senderRef.value.openHeader();
    });
    function openCloseHeader() {
      if (!showHeaderFlog.value) {
        senderRef.value.openHeader();
      } else {
        senderRef.value.closeHeader();
      }
      showHeaderFlog.value = !showHeaderFlog.value;
    }
    function closeHeader() {
      showHeaderFlog.value = false;
      senderRef.value.closeHeader();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_Sender = Sender;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px", "height": "300px", "justify-content": "space-between" } }, _attrs))} data-v-9377951d>`);
      _push(ssrRenderComponent(_component_el_button, {
        style: { "width": "fit-content" },
        onClick: openCloseHeader
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(showHeaderFlog) ? "关闭头部" : "打开头部")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(showHeaderFlog) ? "关闭头部" : "打开头部"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        ref_key: "senderRef",
        ref: senderRef,
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header-self-wrap" data-v-9377951d${_scopeId}><div class="header-self-title" data-v-9377951d${_scopeId}><div class="header-left" data-v-9377951d${_scopeId}> 💯 欢迎使用 Element Plus X </div><div class="header-right" data-v-9377951d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, { onClick: closeHeader }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(CircleClose), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(CircleClose))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span data-v-9377951d${_scopeId2}>关闭头部</span>`);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(CircleClose))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "关闭头部")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="header-self-content" data-v-9377951d${_scopeId}> 🦜 自定义头部内容 </div></div>`);
          } else {
            return [
              createVNode("div", { class: "header-self-wrap" }, [
                createVNode("div", { class: "header-self-title" }, [
                  createVNode("div", { class: "header-left" }, " 💯 欢迎使用 Element Plus X "),
                  createVNode("div", { class: "header-right" }, [
                    createVNode(_component_el_button, {
                      onClick: withModifiers(closeHeader, ["stop"])
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(CircleClose))
                          ]),
                          _: 1
                        }),
                        createVNode("span", null, "关闭头部")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "header-self-content" }, " 🦜 自定义头部内容 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sender/demos/header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const header = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9377951d"]]);
export {
  header as default
};
