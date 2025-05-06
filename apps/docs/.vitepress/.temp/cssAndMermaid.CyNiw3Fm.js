import { ElAvatar } from "element-plus";
import "element-plus/es/components/avatar/style/css";
import { B as Bubble } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const avatarUser = "https://avatars.githubusercontent.com/u/76239030?v=4";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cssAndMermaid",
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
      const _component_Bubble = Bubble;
      const _component_el_avatar = ElAvatar;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-5031969d>`);
      _push(ssrRenderComponent(_component_Bubble, {
        content: unref(markdownText),
        typing: "",
        "is-markdown": ""
      }, {
        avatar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_avatar, {
              size: 32,
              src: avatarUser
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_avatar, {
                size: 32,
                src: avatarUser
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubble/demos/cssAndMermaid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cssAndMermaid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5031969d"]]);
export {
  cssAndMermaid as default
};
