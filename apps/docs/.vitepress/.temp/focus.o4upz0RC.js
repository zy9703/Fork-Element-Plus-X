import { M as MentionSender } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, isRef, useSSRContext } from "vue";
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "focus",
  __ssrInlineRender: true,
  setup(__props) {
    const senderRef = ref();
    const senderValue = ref("🐳 欢迎使用 Element Plus X");
    function blur() {
      senderRef.value.blur();
    }
    function focus2(type = "all") {
      senderRef.value.focus(type);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_MentionSender = MentionSender;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-f391a3f6><div style="${ssrRenderStyle({ "display": "flex" })}" data-v-f391a3f6>`);
      _push(ssrRenderComponent(_component_el_button, {
        dark: "",
        type: "success",
        plain: "",
        onClick: ($event) => focus2("start")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 文本最前方 `);
          } else {
            return [
              createTextVNode(" 文本最前方 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        dark: "",
        type: "success",
        plain: "",
        onClick: ($event) => focus2("end")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 文本最后方 `);
          } else {
            return [
              createTextVNode(" 文本最后方 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        dark: "",
        type: "success",
        plain: "",
        onClick: ($event) => focus2("all")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 整个文本 `);
          } else {
            return [
              createTextVNode(" 整个文本 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        dark: "",
        type: "success",
        plain: "",
        onClick: blur
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 失去焦点 `);
          } else {
            return [
              createTextVNode(" 失去焦点 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_MentionSender, {
        ref_key: "senderRef",
        ref: senderRef,
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mentionSender/demos/focus.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const focus = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f391a3f6"]]);
export {
  focus as default
};
