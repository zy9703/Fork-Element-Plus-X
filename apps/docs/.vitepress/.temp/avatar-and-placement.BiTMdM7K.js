import { ElAvatar } from "element-plus";
import "element-plus/es/components/avatar/style/css";
import { B as Bubble } from "./useSend.GCLvJHLh.js";
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const avatarAI = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
const avatarUser = "https://avatars.githubusercontent.com/u/76239030?v=4";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "avatar-and-placement",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Bubble = Bubble;
      const _component_el_avatar = ElAvatar;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Bubble, {
        content: "Good morning, how are you?",
        placement: "start",
        avatar: avatarAI,
        "avatar-size": "48px"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Bubble, {
        content: "What a beautiful day!",
        placement: "start",
        "avatar-size": "48px"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Bubble, {
        content: "Hi, good morning, I'm fine!",
        placement: "end"
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
      _push(ssrRenderComponent(_component_Bubble, {
        content: "Hi, good morning, I'm fine! Thank you!",
        placement: "end",
        "avatar-size": "0px",
        "avatar-gap": "0px"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubble/demos/avatar-and-placement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
