import { B as Bubble } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ElButton, ElIcon, ElProgress } from "element-plus";
import "element-plus/es/components/progress/style/css";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { VideoPause, VideoPlay, RefreshLeft, Delete } from "@element-plus/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "customized",
  __ssrInlineRender: true,
  setup(__props) {
    const markdownContent = ref(`# 🔥 Bubble 实例方法-事件 
 😄 使你的打字器可高度定制化。
 - 更方便的控制打字器的状态 
 - 列表项 **粗体文本** 和 *斜体文本* 
 \`\`\`javascript 
 // 🙉 控制台可以查看相关打日志
 console.log('Hello, world!'); 
 \`\`\``);
    const isTypingValue = ref(false);
    const progressValue = ref(0);
    const bubbleRef = ref();
    function onStart(instance) {
      console.log("开始打字：组件 ref 实例", unref(instance));
      isTypingValue.value = true;
    }
    function onWriting(instance) {
      const progress = instance.progress.value;
      if (progress > 90 && progress < 100) {
        console.log("打字中 isTyping:", instance.isTyping.value, "progress:", progress);
      }
      if (~~progress === 80) {
        console.log("打字中 progress 为 80% 时候的内容", instance.renderedContent.value);
      }
      isTypingValue.value = true;
      progressValue.value = ~~progress;
    }
    function onFinish(instance) {
      isTypingValue.value = false;
      console.log("打字结束 isTyping", instance.isTyping.value, "progress:", instance.progress.value);
    }
    function onInterrupt() {
      bubbleRef.value.interrupt();
      isTypingValue.value = false;
    }
    function onDestroy() {
      bubbleRef.value.destroy();
      isTypingValue.value = false;
      progressValue.value = 0;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_progress = ElProgress;
      const _component_Bubble = Bubble;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-bc9b22b2><div style="${ssrRenderStyle({ "display": "flex" })}" data-v-bc9b22b2>`);
      if (unref(isTypingValue)) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "warning",
          style: { "width": "fit-content" },
          onClick: onInterrupt
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, { size: 18 }, {
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
              _push2(`<span data-v-bc9b22b2${_scopeId}>暂停</span>`);
            } else {
              return [
                createVNode(_component_el_icon, { size: 18 }, {
                  default: withCtx(() => [
                    createVNode(unref(VideoPause))
                  ]),
                  _: 1
                }),
                createVNode("span", null, "暂停")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(isTypingValue) && (unref(progressValue) !== 0 && unref(progressValue) !== 100)) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "success",
          style: { "width": "fit-content" },
          onClick: ($event) => {
            var _a;
            return (_a = unref(bubbleRef)) == null ? void 0 : _a.continue();
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, { size: 18 }, {
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
              _push2(`<span data-v-bc9b22b2${_scopeId}>继续</span>`);
            } else {
              return [
                createVNode(_component_el_icon, { size: 18 }, {
                  default: withCtx(() => [
                    createVNode(unref(VideoPlay))
                  ]),
                  _: 1
                }),
                createVNode("span", null, "继续")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(isTypingValue) && (unref(progressValue) === 0 || unref(progressValue) === 100)) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          style: { "width": "fit-content" },
          onClick: ($event) => {
            var _a;
            return (_a = unref(bubbleRef)) == null ? void 0 : _a.restart();
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, { size: 18 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(RefreshLeft), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(RefreshLeft))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span data-v-bc9b22b2${_scopeId}>重播</span>`);
            } else {
              return [
                createVNode(_component_el_icon, { size: 18 }, {
                  default: withCtx(() => [
                    createVNode(unref(RefreshLeft))
                  ]),
                  _: 1
                }),
                createVNode("span", null, "重播")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_el_button, {
        type: "danger",
        style: { "width": "fit-content" },
        onClick: onDestroy
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Delete), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Delete))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span data-v-bc9b22b2${_scopeId}>销毁</span>`);
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(Delete))
                ]),
                _: 1
              }),
              createVNode("span", null, "销毁")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(progressValue) > 0 && unref(progressValue) !== 100) {
        _push(ssrRenderComponent(_component_el_progress, {
          duration: 0,
          percentage: unref(progressValue)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(progressValue) === 100) {
        _push(ssrRenderComponent(_component_el_progress, {
          percentage: 100,
          status: "success"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Bubble, {
        ref_key: "bubbleRef",
        ref: bubbleRef,
        content: unref(markdownContent),
        typing: { suffix: "💩", interval: 40 },
        "is-markdown": true,
        onStart,
        onWriting,
        onFinish
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubble/demos/customized.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customized = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bc9b22b2"]]);
export {
  customized as default
};
