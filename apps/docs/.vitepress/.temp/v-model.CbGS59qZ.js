import "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, isRef, useSSRContext } from "vue";
import { S as Sender } from "./index.CgbaXgqI.js";
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "v-model",
  __ssrInlineRender: true,
  setup(__props) {
    const senderRef = ref();
    const timeValue = ref(null);
    const senderValue = ref("");
    const senderLoading = ref(false);
    const submitBtnDisabled = ref(true);
    function handleSubmit(value) {
      ElMessage.info(`发送中`);
      senderLoading.value = true;
      timeValue.value = setTimeout(() => {
        console.log("submit-> value：", value);
        console.log("submit-> senderValue", senderValue.value);
        senderLoading.value = false;
        ElMessage.success(`发送成功`);
      }, 3500);
    }
    function handleCancel() {
      senderLoading.value = false;
      if (timeValue.value)
        clearTimeout(timeValue.value);
      timeValue.value = null;
      ElMessage.info(`取消发送`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_Sender = Sender;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}><div style="${ssrRenderStyle({ "display": "flex" })}">`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        style: { "width": "fit-content" },
        onClick: ($event) => unref(senderRef).clear()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 使用组件实例清空 `);
          } else {
            return [
              createTextVNode(" 使用组件实例清空 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        style: { "width": "fit-content" },
        disabled: !unref(senderValue),
        onClick: ($event) => unref(senderRef).submit()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 使用组件实例提交 `);
          } else {
            return [
              createTextVNode(" 使用组件实例提交 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        style: { "width": "fit-content" },
        onClick: ($event) => unref(senderRef).cancel()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 使用组件实例取消 `);
          } else {
            return [
              createTextVNode(" 使用组件实例取消 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Sender, {
        ref_key: "senderRef",
        ref: senderRef,
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        "submit-btn-disabled": unref(submitBtnDisabled),
        loading: unref(senderLoading),
        clearable: "",
        onSubmit: handleSubmit,
        onCancel: handleCancel
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sender/demos/v-model.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
