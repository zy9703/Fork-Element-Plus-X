import { ElIcon, ElAvatar } from "element-plus";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/avatar/style/css";
import { M as MentionSender } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { Loading } from "@element-plus/icons-vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "solts",
  __ssrInlineRender: true,
  setup(__props) {
    const senderValue1 = ref("");
    const options = ref();
    const triggerLoading = ref(false);
    function handleSearch() {
      triggerLoading.value = true;
      setTimeout(() => {
        options.value = [
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
        ];
        triggerLoading.value = false;
      }, 1500);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MentionSender = MentionSender;
      const _component_el_avatar = ElAvatar;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "20px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_MentionSender, {
        modelValue: unref(senderValue1),
        "onUpdate:modelValue": ($event) => isRef(senderValue1) ? senderValue1.value = $event : null,
        placeholder: "输入 @ 触发指令弹框",
        options: unref(options),
        "trigger-strings": ["@"],
        whole: true,
        "trigger-loading": unref(triggerLoading),
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
        "trigger-loading": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "justify-content": "center", "height": "100%", "padding": "24px", "gap": "12px" })}"${_scopeId}> 这是自定义加载中状态 `);
            _push2(ssrRenderComponent(_component_el_icon, {
              class: "is-loading",
              style: { "color": "cornflowerblue", "font-size": "20px" }
            }, {
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
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "align-items": "center", "justify-content": "center", "height": "100%", "padding": "24px", "gap": "12px" } }, [
                createTextVNode(" 这是自定义加载中状态 "),
                createVNode(_component_el_icon, {
                  class: "is-loading",
                  style: { "color": "cornflowerblue", "font-size": "20px" }
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Loading))
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        "trigger-header": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "justify-content": "center", "height": "100%", "padding": "8px" })}"${_scopeId}> 这是自定义下拉列表顶部的内容 </div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "align-items": "center", "justify-content": "center", "height": "100%", "padding": "8px" } }, " 这是自定义下拉列表顶部的内容 ")
            ];
          }
        }),
        "trigger-footer": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "justify-content": "center", "height": "100%", "padding": "8px" })}"${_scopeId}> 这是自定义下拉列表底部的内容 </div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "align-items": "center", "justify-content": "center", "height": "100%", "padding": "8px" } }, " 这是自定义下拉列表底部的内容 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mentionSender/demos/solts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
