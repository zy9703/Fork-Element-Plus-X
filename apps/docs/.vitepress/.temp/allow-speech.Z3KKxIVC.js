import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import { M as MentionSender } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "allow-speech",
  __ssrInlineRender: true,
  setup(__props) {
    const senderRef = ref();
    const senderValue = ref("");
    function onRecordingChange(recording) {
      if (recording) {
        ElMessage.success("开始录音");
      } else {
        ElMessage.success("结束录音");
      }
    }
    function onsubmit() {
      ElMessage.success("发送成功");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MentionSender = MentionSender;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}><span>内置语音识别：</span>`);
      _push(ssrRenderComponent(_component_MentionSender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        "allow-speech": "",
        onSubmit: onsubmit
      }, null, _parent));
      _push(`<span>自定义语音识别：</span><div style="${ssrRenderStyle({ "display": "flex" })}">`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        style: { "width": "fit-content" },
        onClick: ($event) => unref(senderRef).startRecognition()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 使用组件实例 开始录音 `);
          } else {
            return [
              createTextVNode(" 使用组件实例 开始录音 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        style: { "width": "fit-content" },
        onClick: ($event) => unref(senderRef).stopRecognition()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 使用组件实例 结束录音 `);
          } else {
            return [
              createTextVNode(" 使用组件实例 结束录音 ")
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
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        "allow-speech": "",
        onRecordingChange
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mentionSender/demos/allow-speech.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
