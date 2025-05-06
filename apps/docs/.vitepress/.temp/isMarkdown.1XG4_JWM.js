import { T as Typewriter } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "isMarkdown",
  __ssrInlineRender: true,
  setup(__props) {
    const markdownText = ref(`#### 标题 
 这是一个 Markdown 示例。
 - 列表项 1 
 - 列表项 2 **粗体文本** 和 *斜体文本* 
 \`\`\`javascript 
 console.log('Hello, world!'); 
 \`\`\``);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Typewriter = Typewriter;
      _push(ssrRenderComponent(_component_Typewriter, mergeProps({
        content: unref(markdownText),
        "is-markdown": true
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/typewriter/demos/isMarkdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
