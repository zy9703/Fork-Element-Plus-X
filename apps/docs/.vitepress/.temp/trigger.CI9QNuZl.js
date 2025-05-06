import { ElDialog } from "element-plus";
import "element-plus/es/components/dialog/style/css";
import "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, useSSRContext } from "vue";
import { S as Sender } from "./index.Be7-eJ27.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "trigger",
  __ssrInlineRender: true,
  setup(__props) {
    const senderValue = ref("");
    const senderValue1 = ref("");
    const triggerVisible = ref(false);
    const dialogVisible = ref(false);
    function onTrigger(event) {
      console.log("onTrigger", event);
    }
    function onTrigger1(event) {
      console.log("onTrigger1", event);
      dialogVisible.value = event.isOpen;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sender = Sender;
      const _component_el_dialog = ElDialog;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "20px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Sender, {
        modelValue: unref(senderValue),
        "onUpdate:modelValue": ($event) => isRef(senderValue) ? senderValue.value = $event : null,
        "trigger-popover-visible": unref(triggerVisible),
        "onUpdate:triggerPopoverVisible": ($event) => isRef(triggerVisible) ? triggerVisible.value = $event : null,
        placeholder: "输入 / 和 @ 触发指令弹框",
        clearable: "",
        "trigger-strings": ["/", "@"],
        "trigger-popover-width": "400px",
        "trigger-popover-left": "0px",
        "trigger-popover-offset": 10,
        "trigger-popover-placement": "top-start",
        onTrigger
      }, null, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        modelValue: unref(senderValue1),
        "onUpdate:modelValue": ($event) => isRef(senderValue1) ? senderValue1.value = $event : null,
        placeholder: "输入 XXX 和 QQ 触发指令弹框 在这里不使用 v-model:trigger-popover-visible 绑定，也可以触发 @trigger 事件 请在控制台查看触发事件",
        clearable: "",
        "trigger-strings": ["XXX", "QQ"],
        "trigger-popover-width": "400px",
        "trigger-popover-left": "0px",
        "trigger-popover-offset": 30,
        "trigger-popover-placement": "top-start",
        onTrigger: onTrigger1
      }, null, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: unref(dialogVisible),
        "onUpdate:modelValue": ($event) => isRef(dialogVisible) ? dialogVisible.value = $event : null,
        title: "💖 欢迎使用 Element-Plus-X",
        width: "500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>触发事件已经执行，可以是打开弹框、打开抽屉、任何你需要的事件 ~</span>`);
          } else {
            return [
              createVNode("span", null, "触发事件已经执行，可以是打开弹框、打开抽屉、任何你需要的事件 ~")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sender/demos/trigger.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
