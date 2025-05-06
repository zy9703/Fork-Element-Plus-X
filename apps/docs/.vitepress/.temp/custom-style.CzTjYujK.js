import { F as FilesCard } from "./useSend.GCLvJHLh.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_FilesCard = FilesCard;
  _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}>`);
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "自定义style样式.xls",
    style: { "background-color": "#f0f9eb", "border": "2px solid #67c23a", "border-radius": "20px" }
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "自定义hoverStyle样式.xls",
    style: { "background-color": "#f0f9eb", "border": "1px solid #67c23a", "border-radius": "20px" },
    "hover-style": {
      "box-shadow": "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
      "border-color": "red",
      "background-color": "rgba(255, 0, 0, 0.1)"
    }
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/filesCard/demos/custom-style.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customStyle = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  customStyle as default
};
