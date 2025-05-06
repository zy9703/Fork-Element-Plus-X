import "./useSend.GCLvJHLh.js";
import { defineComponent, ref, unref, isRef, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { T as Thinking } from "./index.C4Hfdfla.js";
import { ElRadioGroup, ElRadioButton } from "element-plus";
import "element-plus/es/components/radio-button/style/css";
import "element-plus/es/components/radio-group/style/css";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "autoCollapse",
  __ssrInlineRender: true,
  setup(__props) {
    const statusValue = ref("thinking");
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
          } else {
            return [
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
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Thinking, {
        status: unref(statusValue),
        "auto-collapse": "",
        content: "欢迎使用 Element-Plus-X",
        "button-width": "250px",
        "max-width": "100%"
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/thinking/demos/autoCollapse.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
