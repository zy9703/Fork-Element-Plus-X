import { T as Typewriter } from "./useSend.nLhTyqQI.js";
import { defineComponent, onMounted, ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "typing",
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(() => {
      setContents("text");
      setContents("markdown");
    });
    const isTyping = ref(true);
    const content = ref("");
    const content1 = ref("");
    const markdownText = ref("");
    function setContents(type) {
      if (type === "text") {
        content.value = "";
        content1.value = "";
        setTimeout(() => {
          content.value = "typing 属性开启打字效果";
          content1.value = "typing 属性也可以是对象，来控制打每次打字吐字、每次打字间隔、和打字器后缀";
        }, 800);
      } else if (type === "markdown") {
        markdownText.value = "";
        setTimeout(() => {
          markdownText.value = ` ### 🐒 is-markdown 和 typing 结合使用 
 这是一个 Markdown 示例。
 - 列表项 1 
 - 列表项 2 **粗体文本** 和 *斜体文本* 
 \`\`\`javascript 
 console.log('Hello, world!'); 
 \`\`\` `;
        }, 800);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_Typewriter = Typewriter;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "8px" } }, _attrs))}><div>`);
      _push(ssrRenderComponent(_component_el_button, {
        style: { "width": "fit-content" },
        onClick: ($event) => setContents("text")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 重置文本 `);
          } else {
            return [
              createTextVNode(" 重置文本 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        style: { "width": "fit-content" },
        type: "primary",
        onClick: ($event) => setContents("markdown")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 重置 markdown `);
          } else {
            return [
              createTextVNode(" 重置 markdown ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div style="${ssrRenderStyle({ "display": "flex", "gap": "8px", "flex-direction": "column" })}">`);
      _push(ssrRenderComponent(_component_Typewriter, {
        content: unref(content),
        typing: unref(isTyping)
      }, null, _parent));
      _push(ssrRenderComponent(_component_Typewriter, {
        content: unref(content1),
        typing: { step: 2, interval: 100, suffix: "💩" }
      }, null, _parent));
      _push(ssrRenderComponent(_component_Typewriter, {
        content: unref(markdownText),
        typing: unref(isTyping),
        "is-markdown": true
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/typewriter/demos/typing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
