import { T as Typewriter } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "updates",
  __ssrInlineRender: true,
  setup(__props) {
    const content = ref("🥰 感谢使用 Element-Plus-X ! 你的支持，是我们开源的最强动力 ~ ");
    const num = ref(1);
    function setContents() {
      num.value++;
      content.value = content.value.repeat(num.value);
      if (num.value > 3) {
        num.value = 1;
        content.value = "🥰 感谢使用 Element-Plus-X ! 你的支持，是我们开源的最强动力 ~ ";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_Typewriter = Typewriter;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "10px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_el_button, {
        style: { "width": "fit-content" },
        onClick: setContents
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 设置 content `);
          } else {
            return [
              createTextVNode(" 设置 content ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Typewriter, {
        typing: "",
        content: unref(content)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/typewriter/demos/updates.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
