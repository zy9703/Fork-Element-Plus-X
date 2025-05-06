import "./useSend.nLhTyqQI.js";
import { mergeProps, useSSRContext } from "vue";
import { W as Welcome } from "./index.CpVKYPsr.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Welcome = Welcome;
  _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Welcome, { title: "欢迎来到 Element Plus X 🦋" }, null, _parent));
  _push(ssrRenderComponent(_component_Welcome, {
    title: "欢迎使用 Element Plus X 💖",
    description: "这是描述信息 ~"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Welcome, {
    icon: "https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp",
    title: "欢迎使用 Element Plus X 💖",
    description: "这是描述信息 ~"
  }, null, _parent));
  _push(ssrRenderComponent(_component_Welcome, {
    icon: "https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp",
    title: "欢迎使用 Element Plus X 💖",
    extra: "副标题",
    description: "这是描述信息 ~"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/welcome/demos/base.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const base = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  base as default
};
