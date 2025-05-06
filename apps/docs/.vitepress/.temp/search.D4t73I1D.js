import { ElAvatar } from "element-plus";
import "element-plus/es/components/avatar/style/css";
import { M as MentionSender } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    const senderValue1 = ref("");
    const options = ref([
      {
        value: "HeJiaYue520",
        avatar: "https://avatars.githubusercontent.com/u/76239030"
      },
      {
        value: "JsonLee12138",
        avatar: "https://avatars.githubusercontent.com/u/160690954"
      },
      {
        value: "ageerle",
        avatar: "https://avatars.githubusercontent.com/u/32251822"
      }
    ]);
    const filterOptions = ref();
    function handleSearch(searchValue, prefix) {
      console.log("搜索的值", searchValue);
      console.log("弹框触发的 字符前缀", prefix);
      filterOptions.value = options.value.filter((option) => {
        if (searchValue) {
          return option.value.includes(searchValue);
        } else {
          return option;
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MentionSender = MentionSender;
      const _component_el_avatar = ElAvatar;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "20px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_MentionSender, {
        modelValue: unref(senderValue1),
        "onUpdate:modelValue": ($event) => isRef(senderValue1) ? senderValue1.value = $event : null,
        placeholder: "输入 @ 触发指令弹框，此处已经过滤了 HeJiaYue520",
        options: unref(filterOptions),
        "trigger-strings": ["@"],
        "trigger-split": ",",
        whole: true,
        onSearch: handleSearch
      }, {
        "trigger-label": withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_avatar, {
              size: 24,
              src: item.avatar
            }, null, _parent2, _scopeId));
            _push2(`<span style="${ssrRenderStyle({ "margin-left": "6px" })}"${_scopeId}>${ssrInterpolate(item.value)}</span></div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "align-items": "center" } }, [
                createVNode(_component_el_avatar, {
                  size: 24,
                  src: item.avatar
                }, null, 8, ["src"]),
                createVNode("span", { style: { "margin-left": "6px" } }, toDisplayString(item.value), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mentionSender/demos/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
