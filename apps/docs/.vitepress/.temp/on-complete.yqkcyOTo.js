import "./useSend.nLhTyqQI.js";
import { B as BubbleList } from "./index.DbEH7pPr.js";
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, nextTick, useSSRContext } from "vue";
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "on-complete",
  __ssrInlineRender: true,
  setup(__props) {
    const list = ref(generateFakeItems(0));
    function generateFakeItems(count) {
      const messages = [];
      for (let i = 0; i < count; i++) {
        const role = i % 2 === 0 ? "ai" : "user";
        const placement = role === "ai" ? "start" : "end";
        const key = i + 1;
        const content = role === "ai" ? "💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~" : `哈哈哈，让我试试`;
        const loading = false;
        const shape = "corner";
        const variant = role === "ai" ? "filled" : "outlined";
        const isMarkdown = false;
        const typing = role === "ai";
        const avatar = role === "ai" ? "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" : "https://avatars.githubusercontent.com/u/76239030?v=4";
        messages.push({
          key,
          role,
          placement,
          content,
          loading,
          shape,
          variant,
          isMarkdown,
          typing,
          avatar,
          avatarSize: "24px"
        });
      }
      return messages;
    }
    function onComplete(instance, index) {
      console.log("@complete", instance, index);
    }
    const triggerIndices = ref("only-last");
    function changeTriggerIndices(type) {
      triggerIndices.value = type;
      list.value = [];
      nextTick(() => {
        list.value = generateFakeItems(7);
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_BubbleList = BubbleList;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}"><span style="${ssrRenderStyle({ "margin-right": "12px" })}">trigger-indices: </span>`);
      _push(ssrRenderComponent(_component_el_button, {
        style: { "width": "fit-content" },
        onClick: ($event) => changeTriggerIndices("only-last")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` only-last `);
          } else {
            return [
              createTextVNode(" only-last ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        style: { "width": "fit-content" },
        type: "primary",
        onClick: ($event) => changeTriggerIndices("all")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` all `);
          } else {
            return [
              createTextVNode(" all ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        style: { "width": "fit-content" },
        type: "success",
        onClick: ($event) => changeTriggerIndices([1, 2, 3])
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` [1, 2, 3] `);
          } else {
            return [
              createTextVNode(" [1, 2, 3] ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_BubbleList, {
        list: unref(list),
        "max-height": "350px",
        "trigger-indices": unref(triggerIndices),
        onComplete
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubbleList/demos/on-complete.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
