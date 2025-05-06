import "./useSend.GCLvJHLh.js";
import { B as BubbleList } from "./index.CfEWVgqE.js";
import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  setup(__props) {
    const list = generateFakeItems(5);
    function generateFakeItems(count) {
      const messages = [];
      for (let i = 0; i < count; i++) {
        const role = i % 2 === 0 ? "ai" : "user";
        const placement = role === "ai" ? "start" : "end";
        const key = i + 1;
        const content = role === "ai" ? "💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~".repeat(5) : `哈哈哈，让我试试`;
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
          // 消息内容 流式接受的时候，只需要改这个值即可
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
      const _component_BubbleList = BubbleList;
      _push(ssrRenderComponent(_component_BubbleList, mergeProps({
        list: unref(list),
        "max-height": "350px"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bubbleList/demos/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
