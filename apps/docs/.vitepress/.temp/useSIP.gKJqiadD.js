import { B as Bubble } from "./useSend.GCLvJHLh.js";
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { u as useXStream } from "./useXStream.Du8ZWeHD.js";
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "useSIP",
  __ssrInlineRender: true,
  setup(__props) {
    const { startStream, cancel, data, error, isLoading } = useXStream();
    async function startSIPStream() {
      try {
        const response = await fetch("https://node-test.element-plus-x.com/api/sip", {
          headers: { "Content-Type": "application/sip" }
        });
        const readableStream = response.body;
        const sipTransformStream = new TransformStream({
          transform(chunk, controller) {
            controller.enqueue(chunk);
          }
        });
        await startStream({ readableStream, transformStream: sipTransformStream });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    const content = computed(() => {
      if (!data.value.length)
        return "";
      let text = "";
      for (let index = 0; index < data.value.length; index++) {
        const chunk = data.value[index];
        try {
          console.log("chunk", chunk);
          text += chunk;
        } catch (error2) {
          console.error("解析数据时出错:", error2);
        }
      }
      console.log("Text:", text);
      return text;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_Bubble = Bubble;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-9fe88425><div class="btn-list" data-v-9fe88425>`);
      _push(ssrRenderComponent(_component_el_button, {
        disabled: unref(isLoading),
        onClick: startSIPStream
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(isLoading) ? "加载中..." : "获取 SIP 协议数据")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(isLoading) ? "加载中..." : "获取 SIP 协议数据"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        disabled: !unref(isLoading),
        onClick: ($event) => unref(cancel)()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 中断请求 `);
          } else {
            return [
              createTextVNode(" 中断请求 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(error)) {
        _push(`<div class="error" data-v-9fe88425>${ssrInterpolate(unref(error).message)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(content)) {
        _push(ssrRenderComponent(_component_Bubble, {
          content: unref(content),
          "is-markdown": "",
          style: { "width": "calc(100% - 12px)" }
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/useXStream/demos/useSIP.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useSIP = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9fe88425"]]);
export {
  useSIP as default
};
