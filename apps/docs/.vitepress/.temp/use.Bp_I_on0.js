import { ElButton, ElIcon } from "element-plus";
import "./useSend.GCLvJHLh.js";
import { ref, onUnmounted, defineComponent, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, isRef, createVNode, createBlock, openBlock, useSSRContext } from "vue";
import { S as Sender } from "./index.Be7-eJ27.js";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Mic, Eleme, Microphone, Loading, Service, RefreshRight } from "@element-plus/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
function useRecord({
  onError,
  onStart,
  onEnd,
  onResult
} = {}) {
  const loading = ref(false);
  const recognition = ref(null);
  const value = ref("");
  const start = () => {
    if ("webkitSpeechRecognition" in window) {
      recognition.value = new webkitSpeechRecognition();
      recognition.value.continuous = true;
      recognition.value.interimResults = true;
      recognition.value.lang = "zh-CN";
      recognition.value.onstart = () => {
        loading.value = true;
        value.value = "";
        onStart == null ? void 0 : onStart();
      };
      recognition.value.onend = () => {
        loading.value = false;
        onEnd == null ? void 0 : onEnd(value.value);
      };
      recognition.value.onerror = (e) => {
        loading.value = false;
        onError == null ? void 0 : onError(e);
      };
      recognition.value.onresult = (e) => {
        let results = "";
        for (let i = 0; i <= e.resultIndex; i++) {
          results += e.results[i][0].transcript;
        }
        value.value = results;
        onResult == null ? void 0 : onResult(results);
      };
      recognition.value.start();
    } else {
      onError == null ? void 0 : onError({
        code: -1,
        message: "The current browser does not support voice recognition"
      });
    }
  };
  const stop = () => {
    if (recognition.value) {
      recognition.value.stop();
    }
  };
  onUnmounted(() => {
    stop();
    recognition.value = null;
  });
  return {
    loading,
    start,
    stop,
    value
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "use",
  __ssrInlineRender: true,
  setup(__props) {
    const { start, value: text, loading, stop } = useRecord({
      onEnd: handleEnd
    });
    const value = ref("");
    const senderRef = ref();
    function handleStart() {
      start();
    }
    function handleEnd(res) {
      console.log("end:", res);
    }
    function submit() {
      console.log("submit:", text);
    }
    watch(text, (val) => {
      console.log("text:", val);
      value.value = val;
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_Sender = Sender;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-1653e8af><div style="${ssrRenderStyle({ "display": "flex" })}" data-v-1653e8af>`);
      _push(ssrRenderComponent(_component_el_button, {
        disabled: unref(loading),
        onClick: handleStart
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(loading) ? "录音中" : "开始录音")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(loading) ? "录音中" : "开始录音"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        disabled: !unref(loading),
        onClick: unref(stop)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 结束录音 `);
          } else {
            return [
              createTextVNode(" 结束录音 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Sender, {
        ref_key: "senderRef",
        ref: senderRef,
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        onSubmit: submit
      }, {
        "action-list": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="btn-list" data-v-1653e8af${_scopeId}>`);
            if (!unref(loading)) {
              _push2(ssrRenderComponent(_component_el_button, {
                loading: unref(loading),
                type: "primary",
                circle: "",
                plain: "",
                color: "#EC0078",
                onClick: handleStart
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Mic), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Mic))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(Mic))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                circle: "",
                color: "#EC0078",
                "z-index": 99,
                onClick: unref(stop)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, { class: "loading" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Eleme), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Eleme))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_icon, { class: "loading" }, {
                        default: withCtx(() => [
                          createVNode(unref(Eleme))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "btn-list" }, [
                !unref(loading) ? (openBlock(), createBlock(_component_el_button, {
                  key: 0,
                  loading: unref(loading),
                  type: "primary",
                  circle: "",
                  plain: "",
                  color: "#EC0078",
                  onClick: handleStart
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(Mic))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["loading"])) : (openBlock(), createBlock(_component_el_button, {
                  key: 1,
                  type: "primary",
                  circle: "",
                  color: "#EC0078",
                  "z-index": 99,
                  onClick: unref(stop)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, { class: "loading" }, {
                      default: withCtx(() => [
                        createVNode(unref(Eleme))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["onClick"]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        ref_key: "senderRef",
        ref: senderRef,
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        onSubmit: submit
      }, {
        "action-list": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="btn-list" data-v-1653e8af${_scopeId}>`);
            if (!unref(loading)) {
              _push2(ssrRenderComponent(_component_el_button, {
                loading: unref(loading),
                type: "primary",
                circle: "",
                color: "#626aef",
                onClick: handleStart
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Microphone), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Microphone))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
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
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                circle: "",
                color: "#626aef",
                plain: "",
                "z-index": 99,
                onClick: unref(stop)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, { class: "loading" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Loading), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Loading))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_icon, { class: "loading" }, {
                        default: withCtx(() => [
                          createVNode(unref(Loading))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "btn-list" }, [
                !unref(loading) ? (openBlock(), createBlock(_component_el_button, {
                  key: 0,
                  loading: unref(loading),
                  type: "primary",
                  circle: "",
                  color: "#626aef",
                  onClick: handleStart
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(Microphone))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["loading"])) : (openBlock(), createBlock(_component_el_button, {
                  key: 1,
                  type: "primary",
                  circle: "",
                  color: "#626aef",
                  plain: "",
                  "z-index": 99,
                  onClick: unref(stop)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, { class: "loading" }, {
                      default: withCtx(() => [
                        createVNode(unref(Loading))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["onClick"]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Sender, {
        ref_key: "senderRef",
        ref: senderRef,
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        onSubmit: submit
      }, {
        "action-list": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="btn-list" data-v-1653e8af${_scopeId}>`);
            if (!unref(loading)) {
              _push2(ssrRenderComponent(_component_el_button, {
                loading: unref(loading),
                type: "primary",
                color: "#FE0006",
                test: "",
                onClick: handleStart
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Service), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Service))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(Service))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                color: "#FE0006",
                plain: "",
                "z-index": 99,
                onClick: unref(stop)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, { class: "loading" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(RefreshRight), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(RefreshRight))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_icon, { class: "loading" }, {
                        default: withCtx(() => [
                          createVNode(unref(RefreshRight))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "btn-list" }, [
                !unref(loading) ? (openBlock(), createBlock(_component_el_button, {
                  key: 0,
                  loading: unref(loading),
                  type: "primary",
                  color: "#FE0006",
                  test: "",
                  onClick: handleStart
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(Service))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["loading"])) : (openBlock(), createBlock(_component_el_button, {
                  key: 1,
                  type: "primary",
                  color: "#FE0006",
                  plain: "",
                  "z-index": 99,
                  onClick: unref(stop)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, { class: "loading" }, {
                      default: withCtx(() => [
                        createVNode(unref(RefreshRight))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["onClick"]))
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/useRecord/demos/use.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const use = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1653e8af"]]);
export {
  use as default
};
