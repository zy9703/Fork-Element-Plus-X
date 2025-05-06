import "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, isRef, useSSRContext } from "vue";
import { W as Welcome } from "./index.CEovKVud.js";
import { ElButton, ElIcon, ElSwitch } from "element-plus";
import "element-plus/es/components/switch/style/css";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/button/style/css";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { Refresh } from "@element-plus/icons-vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "bg",
  __ssrInlineRender: true,
  setup(__props) {
    const bgColor = ref("linear-gradient(97deg, rgba(90,196,255,0.12) 0%, rgba(174,136,255,0.12) 100%)");
    const value = ref("ltr");
    function generateGradientColor() {
      const randomBrightColor = () => {
        const r = Math.floor(Math.random() * 128) + 128;
        const g = Math.floor(Math.random() * 128) + 128;
        const b = Math.floor(Math.random() * 128) + 128;
        return `rgba(${r}, ${g}, ${b}, 0.2)`;
      };
      const color1 = randomBrightColor();
      const color2 = randomBrightColor();
      const color3 = randomBrightColor();
      return `linear-gradient(to bottom right, ${color1}, ${color2}, ${color3})`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_switch = ElSwitch;
      const _component_Welcome = Welcome;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}><div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "center" })}">`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "warning",
        style: { "width": "fit-content" },
        onClick: ($event) => bgColor.value = generateGradientColor()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 设置你喜欢的背景颜色 `);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Refresh), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Refresh))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" 设置你喜欢的背景颜色 "),
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(Refresh))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span>切换布局：</span> `);
      _push(ssrRenderComponent(_component_el_switch, {
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        "active-value": "ltr",
        "inactive-value": "rtl"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Welcome, {
        direction: unref(value),
        title: "欢迎来到 Element Plus X 🦋",
        style: { background: unref(bgColor) }
      }, null, _parent));
      _push(ssrRenderComponent(_component_Welcome, {
        direction: unref(value),
        title: "欢迎使用 Element Plus X 💖",
        description: "这是描述信息 ~",
        style: { background: unref(bgColor) }
      }, null, _parent));
      _push(ssrRenderComponent(_component_Welcome, {
        direction: unref(value),
        icon: "https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp",
        title: "欢迎使用 Element Plus X 💖",
        description: "这是描述信息 ~",
        style: { background: unref(bgColor) }
      }, null, _parent));
      _push(ssrRenderComponent(_component_Welcome, {
        direction: unref(value),
        icon: "https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp",
        title: "欢迎使用 Element Plus X 💖",
        extra: "副标题",
        description: "这是描述信息 ~",
        style: { background: unref(bgColor) }
      }, null, _parent));
      _push(ssrRenderComponent(_component_Welcome, {
        direction: unref(value),
        variant: "borderless",
        title: "欢迎来到 Element Plus X 🦋",
        style: { background: unref(bgColor) }
      }, null, _parent));
      _push(ssrRenderComponent(_component_Welcome, {
        direction: unref(value),
        variant: "borderless",
        title: "欢迎使用 Element Plus X 💖",
        description: "这是描述信息 ~",
        style: { background: unref(bgColor) }
      }, null, _parent));
      _push(ssrRenderComponent(_component_Welcome, {
        direction: unref(value),
        icon: "https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp",
        variant: "borderless",
        title: "欢迎使用 Element Plus X 💖",
        description: "这是描述信息 ~",
        style: { background: unref(bgColor) }
      }, null, _parent));
      _push(ssrRenderComponent(_component_Welcome, {
        direction: unref(value),
        icon: "https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp",
        variant: "borderless",
        title: "欢迎使用 Element Plus X 💖",
        extra: "副标题",
        description: "这是描述信息 ~",
        style: { background: unref(bgColor) }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/welcome/demos/bg.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
