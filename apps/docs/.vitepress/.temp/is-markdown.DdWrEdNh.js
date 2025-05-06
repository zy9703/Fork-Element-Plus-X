import { ElButton, ElAvatar } from "element-plus";
import { B as Bubble } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, createVNode, useSSRContext } from "vue";
import "element-plus/es/components/avatar/style/css";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const avatarUser = "https://avatars.githubusercontent.com/u/76239030?v=4";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "is-markdown",
  __ssrInlineRender: true,
  setup(__props) {
    const content = ref(`## 🔥Element-Plus-X 
 🥰 感谢使用 Element-Plus-X! 
 - 列表项 1 
 - 列表项 2 **粗体文本** 和 *斜体文本* 
 \`\`\`javascript 
 console.log('Hello, world!'); 
 \`\`\` 
`);
    const num = ref(1);
    function changeContent() {
      num.value++;
      content.value = content.value.repeat(num.value);
      if (num.value > 2) {
        num.value = 1;
        content.value = `## 🔥Element-Plus-X 
 🥰 感谢使用 Element-Plus-X! 
 - 列表项 1 
 - 列表项 2 **粗体文本** 和 *斜体文本* 
 \`\`\`javascript 
 console.log('Hello, world!'); 
 \`\`\` 
`;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_Bubble = Bubble;
      const _component_el_avatar = ElAvatar;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-8a46ecab>`);
      _push(ssrRenderComponent(_component_el_button, {
        style: { "width": "fit-content" },
        onClick: changeContent
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 设置 markdown `);
          } else {
            return [
              createTextVNode(" 设置 markdown ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Bubble, {
        content: unref(content),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubble/demos/is-markdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const isMarkdown = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8a46ecab"]]);
export {
  isMarkdown as default
};
