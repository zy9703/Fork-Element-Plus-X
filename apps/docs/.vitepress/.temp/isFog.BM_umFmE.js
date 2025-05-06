import { T as Typewriter } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "isFog",
  __ssrInlineRender: true,
  setup(__props) {
    const content = ref(`#### 标题 
 这是一个 Markdown 示例。
 - 列表项 1 
 - 列表项 2 **粗体文本** 和 *斜体文本* 
 \`\`\`javascript 
 console.log('Hello, world!'); 
 \`\`\``);
    function setContent(type) {
      content.value = "";
      setTimeout(() => {
        content.value = type === 1 ? `#### 标题 
 这是一个 Markdown 示例。
 - 列表项 1 
 - 列表项 2 **粗体文本** 和 *斜体文本* 
 \`\`\`javascript 
 console.log('Hello, world!'); 
 \`\`\`` : "欢迎使用 Element-Plus-X 💖".repeat(10);
      }, 800);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_Typewriter = Typewriter;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "10px" } }, _attrs))}><div style="${ssrRenderStyle({ "display": "flex", "gap": "10px" })}">`);
      _push(ssrRenderComponent(_component_el_button, {
        onClick: ($event) => setContent(1)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 雾化 Markdown `);
          } else {
            return [
              createTextVNode(" 雾化 Markdown ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        onClick: ($event) => setContent(2)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 雾化 文本 `);
          } else {
            return [
              createTextVNode(" 雾化 文本 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Typewriter, {
        content: unref(content),
        "is-markdown": true,
        "is-fog": "",
        typing: ""
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/typewriter/demos/isFog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
