import { ElButton, ElAvatar } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/avatar/style/css";
import { B as Bubble } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Refresh, Search, Star, DocumentCopy } from "@element-plus/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const avatarAI = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "header-and-footer",
  __ssrInlineRender: true,
  setup(__props) {
    const content = ref("嗨！你好，欢迎使用 Element Plus X，有什么问题，可以问我哦~");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Bubble = Bubble;
      const _component_el_avatar = ElAvatar;
      const _component_el_button = ElButton;
      _push(ssrRenderComponent(_component_Bubble, mergeProps({ content: unref(content) }, _attrs), {
        avatar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_avatar, { src: avatarAI }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_avatar, { src: avatarAI })
            ];
          }
        }),
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-0e7d25ff${_scopeId}>Element Plus X</span>`);
          } else {
            return [
              createVNode("span", null, "Element Plus X")
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="footer-container" data-v-0e7d25ff${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "info",
              icon: unref(Refresh),
              size: "small",
              circle: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "success",
              icon: unref(Search),
              size: "small",
              circle: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "warning",
              icon: unref(Star),
              size: "small",
              circle: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              color: "#626aef",
              icon: unref(DocumentCopy),
              size: "small",
              circle: ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "footer-container" }, [
                createVNode(_component_el_button, {
                  type: "info",
                  icon: unref(Refresh),
                  size: "small",
                  circle: ""
                }, null, 8, ["icon"]),
                createVNode(_component_el_button, {
                  type: "success",
                  icon: unref(Search),
                  size: "small",
                  circle: ""
                }, null, 8, ["icon"]),
                createVNode(_component_el_button, {
                  type: "warning",
                  icon: unref(Star),
                  size: "small",
                  circle: ""
                }, null, 8, ["icon"]),
                createVNode(_component_el_button, {
                  color: "#626aef",
                  icon: unref(DocumentCopy),
                  size: "small",
                  circle: ""
                }, null, 8, ["icon"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubble/demos/header-and-footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const headerAndFooter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e7d25ff"]]);
export {
  headerAndFooter as default
};
