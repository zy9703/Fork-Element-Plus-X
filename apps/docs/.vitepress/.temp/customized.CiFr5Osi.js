import "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue";
import { P as Prompts } from "./index.PmOqjpzq.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "customized",
  __ssrInlineRender: true,
  setup(__props) {
    const items = ref([
      {
        key: "1",
        label: "🐛 提示集组件标题",
        description: "描述信息".repeat(3),
        itemStyle: { width: "calc(50% - 6px)", transition: "background .3s" },
        itemHoverStyle: { background: "linear-gradient(to bottom right, rgba(223, 59, 61, 0.9), rgba(203, 52, 244, 0.9)" },
        itemActiveStyle: { background: "linear-gradient(to bottom right, rgba(58, 32, 164, 0.9), rgba(254, 166, 223, 0.9)" }
      },
      {
        key: "2",
        label: "🐛 我是被禁用的",
        disabled: true,
        itemStyle: { width: "calc(50% - 6px)", transition: "background .3s" },
        itemHoverStyle: { background: "linear-gradient(to bottom right, rgba(223, 59, 61, 0.9), rgba(203, 52, 244, 0.9)" },
        itemActiveStyle: { background: "linear-gradient(to bottom right, rgba(58, 32, 164, 0.9), rgba(254, 166, 223, 0.9)" }
      },
      {
        key: "3",
        label: "🐛 单个禁用控制更准确",
        disabled: true,
        itemStyle: { width: "calc(50% - 6px)", transition: "background .3s" },
        itemHoverStyle: { background: "linear-gradient(to bottom right, rgba(223, 59, 61, 0.9), rgba(203, 52, 244, 0.9)" },
        itemActiveStyle: { background: "linear-gradient(to bottom right, rgba(58, 32, 164, 0.9), rgba(254, 166, 223, 0.9)" }
      },
      {
        key: "4",
        label: "🐛 提示集组件标题",
        itemStyle: { width: "calc(50% - 6px)", transition: "background .3s" },
        itemHoverStyle: { background: "linear-gradient(to bottom right, rgba(223, 59, 61, 0.9), rgba(203, 52, 244, 0.9)" },
        itemActiveStyle: { background: "linear-gradient(to bottom right, rgba(58, 32, 164, 0.9), rgba(254, 166, 223, 0.9)" }
      }
    ]);
    function handleItemClick(item) {
      ElMessage.success(`点击了 ${item.key}`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Prompts = Prompts;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-89039d0e>`);
      _push(ssrRenderComponent(_component_Prompts, {
        title: "🐵 提示集组件标题",
        items: unref(items),
        onItemClick: handleItemClick,
        wrap: "",
        style: { width: "300px", padding: "12px", borderRadius: "8px", background: "linear-gradient(to bottom right, rgba(237, 43, 114, 0.9), rgba(223, 67, 62, 0.9)" }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/prompts/demos/customized.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customized = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-89039d0e"]]);
export {
  customized as default
};
