import { ElButton, ElAvatar } from "element-plus";
import { B as Bubble } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, createVNode, useSSRContext } from "vue";
import "element-plus/es/components/avatar/style/css";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const avatarUser = "https://avatars.githubusercontent.com/u/76239030?v=4";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "is-fog",
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
    function changeContent(type) {
      content.value = "";
      setTimeout(() => {
        if (type === 1) {
          content.value = `## 🔥Element-Plus-X 
 🥰 感谢使用 Element-Plus-X! 
 - 列表项 1 
 - 列表项 2 **粗体文本** 和 *斜体文本* 
 \`\`\`javascript 
 console.log('Hello, world!'); 
 \`\`\` 
`;
        } else if (type === 2) {
          content.value = `🔥Element-Plus-X `.repeat(10);
        }
      }, 80);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_Bubble = Bubble;
      const _component_el_avatar = ElAvatar;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-e074e135><div style="${ssrRenderStyle({ "display": "flex", "gap": "12px" })}" data-v-e074e135>`);
      _push(ssrRenderComponent(_component_el_button, {
        style: { "width": "fit-content" },
        onClick: ($event) => changeContent(1)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 雾化 markdown `);
          } else {
            return [
              createTextVNode(" 雾化 markdown ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        style: { "width": "fit-content" },
        onClick: ($event) => changeContent(2)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 雾化 text `);
          } else {
            return [
              createTextVNode(" 雾化 text ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Bubble, {
        content: unref(content),
        typing: { step: 3, interval: 80, suffix: "💩" },
        "is-markdown": "",
        "is-fog": { bgColor: "#f5f5f5" }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubble/demos/is-fog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const isFog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e074e135"]]);
export {
  isFog as default
};
