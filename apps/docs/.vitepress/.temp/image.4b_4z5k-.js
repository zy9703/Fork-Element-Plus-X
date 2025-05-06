import "./useSend.GCLvJHLh.js";
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { W as Welcome } from "./index.CEovKVud.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
const bgColor = "linear-gradient(97deg, rgba(90,196,255,0.12) 0%, rgba(174,136,255,0.12) 100%)";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "image",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Welcome = Welcome;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Welcome, {
        variant: "borderless",
        style: { background: bgColor },
        title: "欢迎使用 Element Plus X 💖",
        description: "用 vue3 对 ant-design-x 的复刻。后续将会集成 AI 工作流编排组件 和 md 多功能渲染组件，给 Vue 开发社区 一个好用的 AI 组件库"
      }, {
        image: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="https://element-plus-x.com/logo.png" style="${ssrRenderStyle({ "width": "80px" })}"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: "https://element-plus-x.com/logo.png",
                style: { "width": "80px" }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/welcome/demos/image.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
