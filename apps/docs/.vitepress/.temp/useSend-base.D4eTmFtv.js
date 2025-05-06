import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { bV as useSend } from "./useSend.nLhTyqQI.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "useSend-base",
  __ssrInlineRender: true,
  setup(__props) {
    const { send, finish, loading } = useSend({
      sendHandler: startFn
    });
    async function startFn() {
      console.log("开始模拟请求");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="btn-list">`);
      _push(ssrRenderComponent(_component_el_button, {
        disabled: unref(loading),
        type: "primary",
        onClick: unref(send)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(loading) ? "加载中..." : "模拟请求")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(loading) ? "加载中..." : "模拟请求"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        disabled: !unref(loading),
        onClick: unref(finish)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 结束请求 `);
          } else {
            return [
              createTextVNode(" 结束请求 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/useSend/demos/useSend-base.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
