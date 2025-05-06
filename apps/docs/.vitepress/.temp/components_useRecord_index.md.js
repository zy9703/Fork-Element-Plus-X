import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"useRecord 🪴","description":"","frontmatter":{},"headers":[],"relativePath":"components/useRecord/index.md","filePath":"components/useRecord/index.md","lastUpdated":1745920435000}');
const _sfc_main = { name: "components/useRecord/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo = resolveComponent("demo");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="userecord-🪴" tabindex="-1">useRecord 🪴 <a class="header-anchor" href="#userecord-🪴" aria-label="Permalink to &quot;useRecord 🪴&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>这是一个自动调用 浏览器内置 API 语音转文字的 钩子函数，让用户快速使用 语音转文字功能，并且返回开始、结束、错误等事件，和 loading 状态。方便开发者 集成使用，实现自定义的 语音按钮样式。</p><p>结合 <code>sender</code> 发送输入框 和 useRecord 钩子函数，可以很好的实现自定义的 语音按钮样式。</p><h2 id="代码演示" tabindex="-1">代码演示 <a class="header-anchor" href="#代码演示" aria-label="Permalink to &quot;代码演示&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo, { src: "components/useRecord/demos/use.vue" }, null, _parent));
  _push(`<h2 id="config-配置" tabindex="-1">config 配置 <a class="header-anchor" href="#config-配置" aria-label="Permalink to &quot;config 配置&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td>onEnd</td><td>结束语音的回调函数</td><td><code>(res: 语音转换结果) =&gt; void</code></td></tr></tbody></table><h2 id="返回钩子" tabindex="-1">返回钩子 <a class="header-anchor" href="#返回钩子" aria-label="Permalink to &quot;返回钩子&quot;">​</a></h2><table tabindex="0"><thead><tr><th>属性名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td>start</td><td>触发开始语音</td><td><code>(event:MouseEvent) =&gt; void</code></td></tr><tr><td>stop</td><td>触发开始语音</td><td><code>(event:MouseEvent) =&gt; void</code></td></tr><tr><td>loading</td><td>是否正在语音中</td><td><code>boolean</code></td></tr><tr><td>value</td><td>语音转换的实时文字</td><td><code>string</code></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/useRecord/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
