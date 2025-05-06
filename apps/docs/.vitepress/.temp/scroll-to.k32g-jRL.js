import "./useSend.nLhTyqQI.js";
import { B as BubbleList } from "./index.DbEH7pPr.js";
import { defineComponent, ref, onMounted, mergeProps, withCtx, createTextVNode, unref, isRef, toDisplayString, useSSRContext } from "vue";
import { ElButton, ElInputNumber } from "element-plus";
import "element-plus/es/components/input-number/style/css";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "scroll-to",
  __ssrInlineRender: true,
  setup(__props) {
    const bubbleItems = ref(generateFakeItems(2));
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
        const typing = false;
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
          avatarSize: "32px"
        });
      }
      return messages;
    }
    const bubbleListRef = ref();
    const num = ref(0);
    function addMessage() {
      const i = bubbleItems.value.length;
      const isUser = !!(i % 2);
      const content = isUser ? "哈哈哈，让我试试" : "💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~".repeat(5);
      const shape = "corner";
      const variant = !isUser ? "filled" : "outlined";
      const placement = isUser ? "end" : "start";
      const typing = isUser ? false : { step: 5, suffix: "🍆", interval: 35 };
      const avatar = isUser ? "https://avatars.githubusercontent.com/u/76239030?v=4" : "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
      const obj = {
        key: i,
        role: isUser ? "user" : "ai",
        content,
        placement,
        typing,
        avatar,
        shape,
        variant,
        avatarSize: "32px",
        isFog: !isUser
      };
      bubbleItems.value.push(obj);
      scrollBottom();
    }
    function clearMessage() {
      bubbleItems.value = [];
    }
    function scrollToTop() {
      bubbleListRef.value.scrollToTop();
    }
    function scrollBottom() {
      bubbleListRef.value.scrollToBottom();
    }
    function scrollToBubble() {
      bubbleListRef.value.scrollToBubble(num.value);
    }
    onMounted(() => {
      setTimeout(() => {
        bubbleItems.value.map((item) => {
          item.loading = false;
          return item;
        });
      }, 3e3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_input_number = ElInputNumber;
      const _component_BubbleList = BubbleList;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "component-container" }, _attrs))} data-v-fa9b72d9><div class="top-wrap" data-v-fa9b72d9><div class="btn-list" data-v-fa9b72d9>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        plain: "",
        onClick: addMessage
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 添加对话 `);
          } else {
            return [
              createTextVNode(" 添加对话 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "danger",
        plain: "",
        onClick: clearMessage
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 清空对话列表 `);
          } else {
            return [
              createTextVNode(" 清空对话列表 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        plain: "",
        onClick: scrollToTop
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 滚动到顶部 `);
          } else {
            return [
              createTextVNode(" 滚动到顶部 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        plain: "",
        onClick: scrollBottom
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 滚动到底部 `);
          } else {
            return [
              createTextVNode(" 滚动到底部 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="btn-list" data-v-fa9b72d9>`);
      _push(ssrRenderComponent(_component_el_input_number, {
        modelValue: unref(num),
        "onUpdate:modelValue": ($event) => isRef(num) ? num.value = $event : null,
        min: 0,
        max: 10,
        "controls-position": "right"
      }, null, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        plain: "",
        onClick: scrollToBubble
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 滚动第${ssrInterpolate(unref(num))}个气泡框 `);
          } else {
            return [
              createTextVNode(" 滚动第" + toDisplayString(unref(num)) + "个气泡框 ", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="component-1" data-v-fa9b72d9>`);
      _push(ssrRenderComponent(_component_BubbleList, {
        ref_key: "bubbleListRef",
        ref: bubbleListRef,
        list: unref(bubbleItems),
        "max-height": "350px"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubbleList/demos/scroll-to.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const scrollTo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa9b72d9"]]);
export {
  scrollTo as default
};
