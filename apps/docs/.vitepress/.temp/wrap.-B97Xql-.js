import "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue";
import { P as Prompts } from "./index.BAw9nyLv.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wrap",
  __ssrInlineRender: true,
  setup(__props) {
    const items = ref([
      {
        key: "1",
        label: "🐛 提示集组件标题",
        description: "描述信息".repeat(3)
      },
      {
        key: "2",
        label: "🐛 我是被禁用的",
        disabled: true
      },
      {
        key: "3",
        label: "🐛 单个禁用控制更准确",
        disabled: true
      },
      {
        key: "4",
        label: "🐛 提示集组件标题"
      }
    ]);
    function handleItemClick(item) {
      ElMessage.success(`点击了 ${item.key}`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Prompts = Prompts;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Prompts, {
        title: "🐵 提示集组件标题",
        items: unref(items),
        onItemClick: handleItemClick,
        wrap: ""
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/prompts/demos/wrap.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
