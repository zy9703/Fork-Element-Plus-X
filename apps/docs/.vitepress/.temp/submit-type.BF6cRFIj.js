import "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { S as Sender } from "./index.Be7-eJ27.js";
import { ElRadioGroup, ElRadioButton } from "element-plus";
import "element-plus/es/components/radio-button/style/css";
import "element-plus/es/components/radio-group/style/css";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submit-type",
  __ssrInlineRender: true,
  setup(__props) {
    const activeName = ref("enter");
    const senderValue = ref("");
    const senderLoading = ref(false);
    function handleSubmit(value) {
      ElMessage.info(`发送中`);
      senderLoading.value = true;
      setTimeout(() => {
        console.log("submit-> value：", value);
        console.log("submit-> senderValue", senderValue.value);
        senderLoading.value = false;
        ElMessage.success(`发送成功`);
      }, 2e3);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio_button = ElRadioButton;
      const _component_Sender = Sender;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_el_radio_group, {
        modelValue: unref(activeName),
        "onUpdate:modelValue": ($event) => isRef(activeName) ? activeName.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_radio_button, { value: "enter" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` enter `);
                } else {
                  return [
                    createTextVNode(" enter ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_radio_button, { value: "shiftEnter" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` shiftEnter `);
                } else {
                  return [
                    createTextVNode(" shiftEnter ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_radio_button, { value: "enter" }, {
                default: withCtx(() => [
                  createTextVNode(" enter ")
                ]),
                _: 1
              }),
              createVNode(_component_el_radio_button, { value: "shiftEnter" }, {
                default: withCtx(() => [
                  createTextVNode(" shiftEnter ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        "submit-type": unref(activeName),
        loading: unref(senderLoading),
        onSubmit: handleSubmit
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sender/demos/submit-type.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
