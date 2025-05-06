import { ElButton, ElIcon } from "element-plus";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/button/style/css";
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Promotion, Refresh } from "@element-plus/icons-vue";
import { bW as XRequest, bV as useSend } from "./useSend.GCLvJHLh.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "useSend-XRequest",
  __ssrInlineRender: true,
  setup(__props) {
    const str = ref("");
    let finish = () => {
    };
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
        finish();
      }
    });
    function startFn() {
      str.value = "";
      sse.send("/api/sse");
    }
    const { send, loading, abort, finish: _finish } = useSend({
      sendHandler: startFn,
      abortHandler: sse.abort
    });
    finish = _finish;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "btn-list" }, _attrs))}>`);
      if (!unref(loading)) {
        _push(ssrRenderComponent(_component_el_button, {
          color: "#c2306a",
          round: "",
          plain: "",
          size: "large",
          onClick: unref(send)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Promotion), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Promotion))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(Promotion))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_el_button, {
          color: "#c2306a",
          round: "",
          plain: "",
          size: "large",
          onClick: unref(abort)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Refresh), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Refresh))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_icon, { class: "is-loading" }, {
                  default: withCtx(() => [
                    createVNode(unref(Refresh))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div>${ssrInterpolate(unref(str))}</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/useSend/demos/useSend-XRequest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
