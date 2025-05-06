import { B as Bubble } from "./useSend.nLhTyqQI.js";
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const avatarSize = "48px";
const avatarAI = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "content-customize",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Bubble = Bubble;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-cb558e5b>`);
      _push(ssrRenderComponent(_component_Bubble, {
        content: "欢迎使用 element-plus-x。",
        typing: "",
        avatar: avatarAI,
        "avatar-size": avatarSize,
        "no-style": ""
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="content-container" data-v-cb558e5b${_scopeId}> 😊 欢迎使用 element-plus-x，我是自定义气泡 </div>`);
          } else {
            return [
              createVNode("div", { class: "content-container" }, " 😊 欢迎使用 element-plus-x，我是自定义气泡 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Bubble, {
        "avatar-size": avatarSize,
        typing: "",
        "no-style": "",
        variant: "borderless"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="content-container-header" data-v-cb558e5b${_scopeId}> 推荐内容 自定义气泡 </div>`);
          } else {
            return [
              createVNode("div", { class: "content-container-header" }, " 推荐内容 自定义气泡 ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="content-borderless-container" data-v-cb558e5b${_scopeId}> 🥤 长时间工作后如何有效休息？ </div>`);
          } else {
            return [
              createVNode("div", { class: "content-borderless-container" }, " 🥤 长时间工作后如何有效休息？ ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Bubble, {
        "avatar-size": avatarSize,
        typing: "",
        "no-style": "",
        variant: "borderless"
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="content-borderless-container" data-v-cb558e5b${_scopeId}> 💌 保持积极心态的秘诀是什么？ </div>`);
          } else {
            return [
              createVNode("div", { class: "content-borderless-container" }, " 💌 保持积极心态的秘诀是什么？ ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Bubble, {
        "avatar-size": avatarSize,
        typing: "",
        "no-style": "",
        variant: "borderless"
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="content-borderless-container" data-v-cb558e5b${_scopeId}> 🔥 如何在巨大的压力下保持冷静？ </div>`);
          } else {
            return [
              createVNode("div", { class: "content-borderless-container" }, " 🔥 如何在巨大的压力下保持冷静？ ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubble/demos/content-customize.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contentCustomize = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cb558e5b"]]);
export {
  contentCustomize as default
};
