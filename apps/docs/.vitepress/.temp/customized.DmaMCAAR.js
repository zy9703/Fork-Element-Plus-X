import { ElSwitch, ElButton } from "element-plus";
import "./useSend.nLhTyqQI.js";
import { B as BubbleList } from "./index.DbEH7pPr.js";
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/switch/style/css";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Refresh, Search, Star, DocumentCopy } from "@element-plus/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "customized",
  __ssrInlineRender: true,
  setup(__props) {
    const bubbleItems = ref(generateFakeItems(5));
    const avatar = ref("https://avatars.githubusercontent.com/u/76239030?v=4");
    const avartAi = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png");
    const switchValue = ref(false);
    const loading = ref(false);
    function generateFakeItems(count) {
      const messages = [];
      for (let i = 0; i < count; i++) {
        const role = i % 2 === 0 ? "ai" : "user";
        const placement = role === "ai" ? "start" : "end";
        const key = i + 1;
        messages.push({
          key,
          role,
          placement,
          noStyle: true
          // 如果你不想用默认的气泡样式
        });
      }
      return messages;
    }
    function setLoading(loading2) {
      bubbleItems.value[bubbleItems.value.length - 1].loading = loading2;
      bubbleItems.value[bubbleItems.value.length - 2].loading = loading2;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_switch = ElSwitch;
      const _component_BubbleList = BubbleList;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-a1b32b59><div style="${ssrRenderStyle({ "display": "flex", "gap": "12px" })}" data-v-a1b32b59><span data-v-a1b32b59>动态设置内容 `);
      _push(ssrRenderComponent(_component_el_switch, {
        modelValue: unref(switchValue),
        "onUpdate:modelValue": ($event) => isRef(switchValue) ? switchValue.value = $event : null
      }, null, _parent));
      _push(`</span><span data-v-a1b32b59>自定义 loading `);
      _push(ssrRenderComponent(_component_el_switch, {
        modelValue: unref(loading),
        "onUpdate:modelValue": ($event) => isRef(loading) ? loading.value = $event : null,
        onChange: (value) => setLoading(value)
      }, null, _parent));
      _push(`</span></div>`);
      _push(ssrRenderComponent(_component_BubbleList, {
        list: unref(bubbleItems),
        "max-height": "350px"
      }, {
        avatar: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="avatar-wrapper" data-v-a1b32b59${_scopeId}><img${ssrRenderAttr("src", item.role === "ai" ? unref(avartAi) : unref(avatar))} alt="avatar" data-v-a1b32b59${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "avatar-wrapper" }, [
                createVNode("img", {
                  src: item.role === "ai" ? unref(avartAi) : unref(avatar),
                  alt: "avatar"
                }, null, 8, ["src"])
              ])
            ];
          }
        }),
        header: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header-wrapper" data-v-a1b32b59${_scopeId}><div class="header-name" data-v-a1b32b59${_scopeId}>${ssrInterpolate(item.role === "ai" ? "Element Plus X 🍧" : "🧁 用户")}</div></div>`);
          } else {
            return [
              createVNode("div", { class: "header-wrapper" }, [
                createVNode("div", { class: "header-name" }, toDisplayString(item.role === "ai" ? "Element Plus X 🍧" : "🧁 用户"), 1)
              ])
            ];
          }
        }),
        content: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="content-wrapper" data-v-a1b32b59${_scopeId}><div class="content-text" data-v-a1b32b59${_scopeId}>${ssrInterpolate(item.role === "ai" ? `${unref(switchValue) ? `#ai-${item.key}：` : ""} 💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~` : `${unref(switchValue) ? `#user-${item.key}：` : ""}哈哈哈，让我试试`)}</div></div>`);
          } else {
            return [
              createVNode("div", { class: "content-wrapper" }, [
                createVNode("div", { class: "content-text" }, toDisplayString(item.role === "ai" ? `${unref(switchValue) ? `#ai-${item.key}：` : ""} 💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~` : `${unref(switchValue) ? `#user-${item.key}：` : ""}哈哈哈，让我试试`), 1)
              ])
            ];
          }
        }),
        footer: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="footer-wrapper" data-v-a1b32b59${_scopeId}><div class="footer-container" data-v-a1b32b59${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "info",
              icon: unref(Refresh),
              size: "small",
              circle: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "success",
              icon: unref(Search),
              size: "small",
              circle: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "warning",
              icon: unref(Star),
              size: "small",
              circle: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              color: "#626aef",
              icon: unref(DocumentCopy),
              size: "small",
              circle: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="footer-time" data-v-a1b32b59${_scopeId}>${ssrInterpolate(item.role === "ai" ? "下午 2:32" : "下午 2:33")}</div></div>`);
          } else {
            return [
              createVNode("div", { class: "footer-wrapper" }, [
                createVNode("div", { class: "footer-container" }, [
                  createVNode(_component_el_button, {
                    type: "info",
                    icon: unref(Refresh),
                    size: "small",
                    circle: ""
                  }, null, 8, ["icon"]),
                  createVNode(_component_el_button, {
                    type: "success",
                    icon: unref(Search),
                    size: "small",
                    circle: ""
                  }, null, 8, ["icon"]),
                  createVNode(_component_el_button, {
                    type: "warning",
                    icon: unref(Star),
                    size: "small",
                    circle: ""
                  }, null, 8, ["icon"]),
                  createVNode(_component_el_button, {
                    color: "#626aef",
                    icon: unref(DocumentCopy),
                    size: "small",
                    circle: ""
                  }, null, 8, ["icon"])
                ]),
                createVNode("div", { class: "footer-time" }, toDisplayString(item.role === "ai" ? "下午 2:32" : "下午 2:33"), 1)
              ])
            ];
          }
        }),
        loading: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="loading-container" data-v-a1b32b59${_scopeId}><span data-v-a1b32b59${_scopeId}>#${ssrInterpolate(item.role)}-${ssrInterpolate(item.key)}：</span><span data-v-a1b32b59${_scopeId}>我</span><span data-v-a1b32b59${_scopeId}>是</span><span data-v-a1b32b59${_scopeId}>自</span><span data-v-a1b32b59${_scopeId}>定</span><span data-v-a1b32b59${_scopeId}>义</span><span data-v-a1b32b59${_scopeId}>加</span><span data-v-a1b32b59${_scopeId}>载</span><span data-v-a1b32b59${_scopeId}>内</span><span data-v-a1b32b59${_scopeId}>容</span><span data-v-a1b32b59${_scopeId}>哦</span><span data-v-a1b32b59${_scopeId}>~</span></div>`);
          } else {
            return [
              createVNode("div", { class: "loading-container" }, [
                createVNode("span", null, "#" + toDisplayString(item.role) + "-" + toDisplayString(item.key) + "：", 1),
                createVNode("span", null, "我"),
                createVNode("span", null, "是"),
                createVNode("span", null, "自"),
                createVNode("span", null, "定"),
                createVNode("span", null, "义"),
                createVNode("span", null, "加"),
                createVNode("span", null, "载"),
                createVNode("span", null, "内"),
                createVNode("span", null, "容"),
                createVNode("span", null, "哦"),
                createVNode("span", null, "~")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubbleList/demos/customized.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customized = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a1b32b59"]]);
export {
  customized as default
};
