import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { bW as XRequest } from "./useSend.GCLvJHLh.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "XRequest-use",
  __ssrInlineRender: true,
  setup(__props) {
    const str = ref("");
    const sse = new XRequest({
      baseURL: "https://node-test.element-plus-x.com",
      type: "fetch",
      transformer: (e) => {
        console.log("transformer:", e);
        const a = e.trim().split("\n");
        const r = a.pop();
        return r;
      },
      onMessage: (msg) => {
        console.log("onMessage:", msg);
        str.value += `
${msg}`;
      },
      onError: (es, e) => {
        console.log("onError:", es, e);
      },
      onOpen: () => {
        console.log("onOpen");
      },
      onAbort: (messages) => {
        console.log("onAbort", messages);
      },
      onFinish: (data) => {
        console.log("onFinish:", data);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="btn-list">`);
      _push(ssrRenderComponent(_component_el_button, {
        onClick: () => {
          str.value = "";
          unref(sse).send("/api/sse");
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 发起请求 `);
          } else {
            return [
              createTextVNode(" 发起请求 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        onClick: ($event) => unref(sse).abort()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 取消请求 `);
          } else {
            return [
              createTextVNode(" 取消请求 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div>${ssrInterpolate(unref(str))}</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/useSend/demos/XRequest-use.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
