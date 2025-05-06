import { M as MentionSender } from "./useSend.GCLvJHLh.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_MentionSender = MentionSender;
  _push(ssrRenderComponent(_component_MentionSender, mergeProps({ placeholder: "💌 欢迎使用 Element-Plus-X ~" }, _attrs), null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mentionSender/demos/placeholder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const placeholder = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  placeholder as default
};
