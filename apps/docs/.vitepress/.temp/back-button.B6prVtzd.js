import "./useSend.nLhTyqQI.js";
import { B as BubbleList } from "./index.DbEH7pPr.js";
import { defineComponent, ref, computed, mergeProps, unref, isRef, useSSRContext } from "vue";
import { ElSwitch, ElColorPicker, ElSlider } from "element-plus";
import "element-plus/es/components/slider/style/css";
import "element-plus/es/components/color-picker/style/css";
import "element-plus/es/components/switch/style/css";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "back-button",
  __ssrInlineRender: true,
  setup(__props) {
    const list = generateFakeItems(12);
    const alwaysShowScrollbar = ref(false);
    const btnLoading = ref(true);
    const bottomValue = ref(10);
    const leftValue = ref(85);
    const backButtonPosition = computed(() => {
      return {
        bottom: `${bottomValue.value}%`,
        left: `${leftValue.value}%`
      };
    });
    const btnColor = ref("#2D38FF");
    const btnSize = ref(40);
    function generateFakeItems(count) {
      const messages = [];
      for (let i = 0; i < count; i++) {
        const role = i % 2 === 0 ? "ai" : "user";
        const placement = role === "ai" ? "start" : "end";
        const key = i + 1;
        const content = role === "ai" ? "💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~".repeat(8) : `哈哈哈，让我试试`;
        const loading = false;
        const shape = "corner";
        const variant = role === "ai" ? "filled" : "outlined";
        const isMarkdown = false;
        const typing = role === "ai" ? i === count - 1 : false;
        const avatar = role === "ai" ? "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" : "https://avatars.githubusercontent.com/u/76239030?v=4";
        messages.push({
          key,
          // 唯一标识
          role,
          // user | ai 自行更据模型定义
          placement,
          // start | end 气泡位置
          content,
          // 消息内容 流式接受的时候，只需要改这个值即可，这里暂时没有用到流式数据
          loading,
          // 当前气泡的加载状态
          shape,
          // 气泡的形状
          variant,
          // 气泡的样式
          isMarkdown,
          // 是否渲染为 markdown
          typing,
          // 是否开启打字器效果 该属性不会和流式接受冲突
          isFog: role === "ai",
          // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
          avatar,
          avatarSize: "24px",
          // 头像占位大小
          avatarGap: "12px"
          // 头像与气泡之间的距离
        });
      }
      return messages;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_switch = ElSwitch;
      const _component_el_color_picker = ElColorPicker;
      const _component_el_slider = ElSlider;
      const _component_BubbleList = BubbleList;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "24px" } }, _attrs))}><div style="${ssrRenderStyle({ "display": "flex", "gap": "5px", "border": "1px solid gray", "border-radius": "12px", "padding": "8px", "flex-direction": "column" })}"><span>滚动条显示：`);
      _push(ssrRenderComponent(_component_el_switch, {
        modelValue: unref(alwaysShowScrollbar),
        "onUpdate:modelValue": ($event) => isRef(alwaysShowScrollbar) ? alwaysShowScrollbar.value = $event : null,
        "inactive-text": "鼠标悬停展示",
        "active-text": "一直展示"
      }, null, _parent));
      _push(`</span><span>底部按钮加载状态：`);
      _push(ssrRenderComponent(_component_el_switch, {
        modelValue: unref(btnLoading),
        "onUpdate:modelValue": ($event) => isRef(btnLoading) ? btnLoading.value = $event : null,
        "inactive-text": "false",
        "active-text": "true"
      }, null, _parent));
      _push(`</span><span>底部按钮颜色： `);
      _push(ssrRenderComponent(_component_el_color_picker, {
        modelValue: unref(btnColor),
        "onUpdate:modelValue": ($event) => isRef(btnColor) ? btnColor.value = $event : null
      }, null, _parent));
      _push(`</span><span>底部按钮位</span><span>距离底部：`);
      _push(ssrRenderComponent(_component_el_slider, {
        modelValue: unref(bottomValue),
        "onUpdate:modelValue": ($event) => isRef(bottomValue) ? bottomValue.value = $event : null
      }, null, _parent));
      _push(`</span><span>距离左边：`);
      _push(ssrRenderComponent(_component_el_slider, {
        modelValue: unref(leftValue),
        "onUpdate:modelValue": ($event) => isRef(leftValue) ? leftValue.value = $event : null
      }, null, _parent));
      _push(`</span><span>底部按钮尺寸：`);
      _push(ssrRenderComponent(_component_el_slider, {
        modelValue: unref(btnSize),
        "onUpdate:modelValue": ($event) => isRef(btnSize) ? btnSize.value = $event : null
      }, null, _parent));
      _push(`</span></div>`);
      _push(ssrRenderComponent(_component_BubbleList, {
        list: unref(list),
        "max-height": "350px",
        "always-show-scrollbar": unref(alwaysShowScrollbar),
        "btn-color": unref(btnColor),
        "btn-loading": unref(btnLoading),
        "back-button-position": unref(backButtonPosition),
        "btn-icon-size": unref(btnSize)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubbleList/demos/back-button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
