import { T as Typewriter } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
/* empty css                   */
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mermaid",
  __ssrInlineRender: true,
  setup(__props) {
    const markdownText = ref(`#### 标题 
 这是一个 Markdown 示例。
 - 列表项 1 
 - 列表项 2 **粗体文本** 和 *斜体文本* 
 \`\`\`javascript 
 console.log('Hello, world!'); 
 \`\`\` 
 \`\`\`mermaid
 pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
 

\`\`\`

\`\`\`mermaid
 xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]

 

\`\`\`
`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Typewriter = Typewriter;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Typewriter, {
        content: markdownText.value,
        "is-markdown": true
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/typewriter/demos/mermaid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
