import { B as Bubble } from "./useSend.nLhTyqQI.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Bubble = Bubble;
  _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}><div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "center" })}">`);
  _push(ssrRenderComponent(_component_Bubble, {
    content: "filled",
    variant: "filled"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Bubble, {
    content: "filled + round",
    variant: "filled",
    shape: "round"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Bubble, {
    content: "filled + corner",
    variant: "filled",
    shape: "corner"
  }, null, _parent));
  _push(`</div><div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "center" })}">`);
  _push(ssrRenderComponent(_component_Bubble, {
    content: "borderless",
    variant: "borderless"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Bubble, {
    content: "borderless + round",
    variant: "borderless",
    shape: "round"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Bubble, {
    content: "borderless + corner",
    variant: "borderless",
    shape: "corner"
  }, null, _parent));
  _push(`</div><div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "center" })}">`);
  _push(ssrRenderComponent(_component_Bubble, {
    content: "outlined",
    variant: "outlined"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Bubble, {
    content: "outlined + round",
    variant: "outlined",
    shape: "round"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Bubble, {
    content: "outlined + corner",
    variant: "outlined",
    shape: "corner"
  }, null, _parent));
  _push(`</div><div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "center" })}">`);
  _push(ssrRenderComponent(_component_Bubble, {
    content: "shadow",
    variant: "shadow"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Bubble, {
    content: "shadow + round",
    variant: "shadow",
    shape: "round"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Bubble, {
    content: "shadow + corner",
    variant: "shadow",
    shape: "corner"
  }, null, _parent));
  _push(`</div><div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "center" })}">`);
  _push(ssrRenderComponent(_component_Bubble, {
    content: "round",
    shape: "round"
  }, null, _parent));
  _push(`</div><div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "center" })}">`);
  _push(ssrRenderComponent(_component_Bubble, {
    content: "corner",
    shape: "corner"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Bubble, {
    content: "placement end",
    shape: "corner",
    placement: "end"
  }, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubble/demos/variant-and-shape.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const variantAndShape = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  variantAndShape as default
};
