import "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, isRef, useSSRContext } from "vue";
import { S as Sender } from "./index.CgbaXgqI.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submit-btn-disabled",
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
      const _component_Sender = Sender;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}><span>这是内置的禁用逻辑：</span>`);
      _push(ssrRenderComponent(_component_Sender, {
        ref_key: "senderRef",
        ref: senderRef,
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        loading: unref(senderLoading),
        clearable: "",
        onSubmit: handleSubmit,
        onCancel: handleCancel
      }, null, _parent));
      _push(`<span>自定义禁用逻辑：</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mentionSender/demos/submit-btn-disabled.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
