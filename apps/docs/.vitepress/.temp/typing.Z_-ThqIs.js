import { ElButton, ElAvatar } from "element-plus";
import { B as Bubble } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, unref, createVNode, useSSRContext } from "vue";
import "element-plus/es/components/avatar/style/css";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const avatarAI = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "typing",
  __ssrInlineRender: true,
  setup(__props) {
    const num = ref(1);
    const content = computed(() => "🥰 感谢使用 Element-Plus-X ! 你的支持，是我们开源的最强动力 ~ ".repeat(num.value));
    function changeContent() {
      num.value++;
      if (num.value > 3)
        num.value = 1;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_Bubble = Bubble;
      const _component_el_avatar = ElAvatar;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_el_button, {
        style: { "width": "fit-content" },
        onClick: changeContent
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 设置 text `);
          } else {
            return [
              createTextVNode(" 设置 text ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Bubble, {
        content: unref(content),
        typing: { step: 1, interval: 100, suffix: "💩" }
      }, {
        avatar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_avatar, { src: avatarAI }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_avatar, { src: avatarAI })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubble/demos/typing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
