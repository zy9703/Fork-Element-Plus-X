import { ElButton, ElIcon } from "element-plus";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/button/style/css";
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Microphone, Loading, Promotion, Refresh, VideoPlay, VideoPause, VideoCamera, Aim } from "@element-plus/icons-vue";
import { bV as useSend } from "./useSend.GCLvJHLh.js";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "useSend-use",
  __ssrInlineRender: true,
  setup(__props) {
    const { send, abort, loading } = useSend({
      sendHandler: startFn,
      abortHandler: () => {
        ElMessage.info("自定义语音按钮，结束录音！");
      }
    });
    const { send: send1, abort: abort1, loading: loading1 } = useSend({
      sendHandler: startFn,
      abortHandler: () => {
        ElMessage.info("自定义发送按钮，结束发送！");
      }
    });
    const { send: send2, abort: abort2, loading: loading2 } = useSend({
      sendHandler: startFn,
      abortHandler: () => {
        ElMessage.info("自定义播放按钮，结束播放！");
      }
    });
    const { send: send3, abort: abort3, loading: loading3 } = useSend({
      sendHandler: startFn,
      abortHandler: () => {
        ElMessage.info("自定义录制按钮，结束录制！");
      }
    });
    const type = ref("voice");
    function startFn() {
      if (type.value === "voice") {
        ElMessage.success("自定义语音按钮，开始录音！");
      } else if (type.value === "sender") {
        ElMessage.success("自定义发送按钮，开始发送文本！");
      } else if (type.value === "read") {
        ElMessage.success("自定义播放，开始播放啦！");
      } else if (type.value === "record") {
        ElMessage.success("自定义录制，开始录制啦！");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "btn-list" }, _attrs))}>`);
      if (!unref(loading)) {
        _push(ssrRenderComponent(_component_el_button, {
          color: "#9145c8",
          circle: "",
          size: "large",
          onClick: () => {
            type.value = "voice";
            unref(send)();
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Microphone), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Microphone))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(Microphone))
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
          color: "#9145c8",
          circle: "",
          size: "large",
          onClick: () => {
            type.value = "voice";
            unref(abort)();
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Loading), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Loading))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_icon, { class: "is-loading" }, {
                  default: withCtx(() => [
                    createVNode(unref(Loading))
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
      if (!unref(loading1)) {
        _push(ssrRenderComponent(_component_el_button, {
          color: "#c2306a",
          round: "",
          plain: "",
          size: "large",
          onClick: () => {
            type.value = "sender";
            unref(send1)();
          }
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
      if (unref(loading1)) {
        _push(ssrRenderComponent(_component_el_button, {
          color: "#c2306a",
          round: "",
          plain: "",
          size: "large",
          onClick: () => {
            type.value = "sender";
            unref(abort1)();
          }
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
      if (!unref(loading2)) {
        _push(ssrRenderComponent(_component_el_button, {
          size: "large",
          type: "success",
          color: "#ff7f7f",
          onClick: () => {
            type.value = "read";
            unref(send2)();
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, { style: { "font-size": "20px", "color": "#fff" } }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(VideoPlay), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(VideoPlay))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_icon, { style: { "font-size": "20px", "color": "#fff" } }, {
                  default: withCtx(() => [
                    createVNode(unref(VideoPlay))
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
      if (unref(loading2)) {
        _push(ssrRenderComponent(_component_el_button, {
          size: "large",
          type: "success",
          color: "#ff7f7f",
          onClick: () => {
            type.value = "read";
            unref(abort2)();
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, {
                style: { "font-size": "20px", "color": "#fff" },
                class: "is-loading"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(VideoPause), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(VideoPause))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_icon, {
                  style: { "font-size": "20px", "color": "#fff" },
                  class: "is-loading"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(VideoPause))
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
      if (!unref(loading3)) {
        _push(ssrRenderComponent(_component_el_button, {
          size: "large",
          circle: "",
          color: "#fff884",
          onClick: () => {
            type.value = "record";
            unref(send3)();
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, { style: { "color": "#104674" } }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(VideoCamera), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(VideoCamera))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_icon, { style: { "color": "#104674" } }, {
                  default: withCtx(() => [
                    createVNode(unref(VideoCamera))
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
      if (unref(loading3)) {
        _push(ssrRenderComponent(_component_el_button, {
          size: "large",
          circle: "",
          color: "#fff884",
          onClick: () => {
            type.value = "record";
            unref(abort3)();
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, {
                style: { "color": "#104674" },
                class: "is-loading"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Aim), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Aim))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_icon, {
                  style: { "color": "#104674" },
                  class: "is-loading"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Aim))
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/useSend/demos/useSend-use.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
