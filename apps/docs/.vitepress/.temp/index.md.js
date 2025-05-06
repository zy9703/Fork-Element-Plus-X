import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Element Plus X","text":"🚀AI体验新秩序","tagline":"❤️‍🔥开箱即用的企业级 AI 交互组件库，让构建智能界面像搭积木一样简单。 RICH 设计范式，打造卓越 AI 界面解决方案，引领智能新体验。❤️‍🔥","image":{"src":"/logo.png","alt":"Element Plus X"},"actions":[{"theme":"brand","text":"✨开始使用","link":"/components/typewriter/"},{"theme":"alt","text":"👉在线预览","link":"https://v.element-plus-x.com"},{"theme":"alt","text":"⭐star支持","link":"https://github.com/HeJiaYue520/Element-Plus-X.git"}]},"features":[{"title":"😄复刻经典 推陈出新","details":"复刻 ant design x 的精华，结合自身创新，无需jsx语法，带来熟悉又惊喜的组件使用感受，助力项目出彩。"},{"title":"🔥高性能 灵活性兼备","details":"精心优化的代码结构，保证组件高性能运行，同时支持高度自定义，适配各种复杂业务逻辑。"},{"title":"💖可视化交互 体验升级","details":"打字器雾化动画、自动滚动、加载效果、等细节满满，为用户带来生动的可视化体验，增强应用交互性和吸引力。"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1746433839000}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
