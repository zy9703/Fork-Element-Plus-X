import { B as Bubble } from "./useSend.GCLvJHLh.js";
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { u as useXStream } from "./useXStream.Du8ZWeHD.js";
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "useSSE",
  __ssrInlineRender: true,
  setup(__props) {
    const { startStream, cancel, data, error, isLoading } = useXStream();
    async function startSSE() {
      try {
        const response = await fetch("https://node-test.element-plus-x.com/api/sse", {
          headers: { "Content-Type": "text/event-stream" }
        });
        const readableStream = response.body;
        await startStream({ readableStream });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    const content = computed(() => {
      if (!data.value.length)
        return "";
      let text = "";
      for (let index = 0; index < data.value.length; index++) {
        const chunk = data.value[index].data;
        try {
          const parsedChunk = JSON.parse(chunk).content;
          text += parsedChunk;
        } catch (error2) {
          if (chunk === " [DONE]") ;
          else {
            console.error("解析数据时出错:", error2);
          }
        }
      }
      console.log("Text:", text);
      return text;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_Bubble = Bubble;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-0a4f4364><div class="btn-list" data-v-0a4f4364>`);
      _push(ssrRenderComponent(_component_el_button, {
        disabled: unref(isLoading),
        onClick: startSSE
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(isLoading) ? "加载中..." : "获取 SSE流数据")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(isLoading) ? "加载中..." : "获取 SSE流数据"), 1)
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
        _push(`<div class="error" data-v-0a4f4364>${ssrInterpolate(unref(error).message)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/useXStream/demos/useSSE.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useSSE = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0a4f4364"]]);
export {
  useSSE as default
};
