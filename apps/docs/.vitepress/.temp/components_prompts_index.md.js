import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Prompts 提示集组件 🎁","description":"","frontmatter":{},"headers":[],"relativePath":"components/prompts/index.md","filePath":"components/prompts/index.md","lastUpdated":1746503545000}');
const _sfc_main = { name: "components/prompts/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo = resolveComponent("demo");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="prompts-提示集组件-🎁" tabindex="-1">Prompts 提示集组件 🎁 <a class="header-anchor" href="#prompts-提示集组件-🎁" aria-label="Permalink to &quot;Prompts 提示集组件 🎁&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p><code>Prompts</code> 用于显示一组与当前上下文相关的预定义的问题或建议。</p><h2 id="代码演示" tabindex="-1">代码演示 <a class="header-anchor" href="#代码演示" aria-label="Permalink to &quot;代码演示&quot;">​</a></h2><h3 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h3>`);
  _push(ssrRenderComponent(_component_demo, { src: "components/prompts/demos/base.vue" }, null, _parent));
  _push(`<h3 id="禁用状态" tabindex="-1">禁用状态 <a class="header-anchor" href="#禁用状态" aria-label="Permalink to &quot;禁用状态&quot;">​</a></h3>`);
  _push(ssrRenderComponent(_component_demo, { src: "components/prompts/demos/disabled.vue" }, null, _parent));
  _push(`<h3 id="垂直排列" tabindex="-1">垂直排列 <a class="header-anchor" href="#垂直排列" aria-label="Permalink to &quot;垂直排列&quot;">​</a></h3>`);
  _push(ssrRenderComponent(_component_demo, { src: "components/prompts/demos/vertical.vue" }, null, _parent));
  _push(`<h3 id="可换行" tabindex="-1">可换行 <a class="header-anchor" href="#可换行" aria-label="Permalink to &quot;可换行&quot;">​</a></h3>`);
  _push(ssrRenderComponent(_component_demo, { src: "components/prompts/demos/wrap.vue" }, null, _parent));
  _push(`<h3 id="响应式宽度" tabindex="-1">响应式宽度 <a class="header-anchor" href="#响应式宽度" aria-label="Permalink to &quot;响应式宽度&quot;">​</a></h3>`);
  _push(ssrRenderComponent(_component_demo, { src: "components/prompts/demos/responsive.vue" }, null, _parent));
  _push(`<h3 id="定制化样式" tabindex="-1">定制化样式 <a class="header-anchor" href="#定制化样式" aria-label="Permalink to &quot;定制化样式&quot;">​</a></h3>`);
  _push(ssrRenderComponent(_component_demo, { src: "components/prompts/demos/customized.vue" }, null, _parent));
  _push(`<h3 id="嵌套组合" tabindex="-1">嵌套组合 <a class="header-anchor" href="#嵌套组合" aria-label="Permalink to &quot;嵌套组合&quot;">​</a></h3>`);
  _push(ssrRenderComponent(_component_demo, { src: "components/prompts/demos/nested.vue" }, null, _parent));
  _push(`<h2 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h2><table tabindex="0"><thead><tr><th>属性名</th><th>类型</th><th>是否必填</th><th>默认值</th><th>描述</th></tr></thead><tbody><tr><td>variant</td><td>string</td><td>否</td><td>filled</td><td>组件样式变体（filled/borderless）</td></tr><tr><td>direction</td><td>string</td><td>否</td><td>ltr</td><td>文本方向（ltr/rtl）</td></tr><tr><td>icon</td><td>string</td><td>否</td><td>-</td><td>图标URL地址</td></tr><tr><td>title</td><td>string</td><td>否</td><td>-</td><td>主标题文本内容</td></tr><tr><td>extra</td><td>string</td><td>否</td><td>-</td><td>副标题文本内容</td></tr><tr><td>description</td><td>string</td><td>否</td><td>-</td><td>描述文本内容</td></tr><tr><td>className</td><td>string</td><td>否</td><td>-</td><td>容器外层自定义类名</td></tr><tr><td>rootClassName</td><td>string</td><td>否</td><td>-</td><td>根节点自定义类名</td></tr><tr><td>classNames</td><td>object</td><td>否</td><td>-</td><td>各部分自定义类名（{ icon, title, extra, description }）</td></tr><tr><td>style</td><td>object</td><td>否</td><td>-</td><td>容器外层自定义样式</td></tr><tr><td>styles</td><td>object</td><td>否</td><td>-</td><td>各部分自定义样式（{ icon, title, extra, description }）</td></tr><tr><td>prefixCls</td><td>string</td><td>否</td><td>welcome</td><td>组件类名前缀</td></tr></tbody></table><h2 id="插槽" tabindex="-1">插槽 <a class="header-anchor" href="#插槽" aria-label="Permalink to &quot;插槽&quot;">​</a></h2><table tabindex="0"><thead><tr><th>插槽名</th><th>参数</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td><code>#image</code></td><td>-</td><td>Slot</td><td>自定义欢迎图片内容</td></tr><tr><td><code>#extra</code></td><td>-</td><td>Slot</td><td>自定义副标题内容</td></tr></tbody></table><h2 id="功能特性" tabindex="-1">功能特性 <a class="header-anchor" href="#功能特性" aria-label="Permalink to &quot;功能特性&quot;">​</a></h2><ul><li><p>通过 <code>variant</code> 属性目前暂时支持 <code>filled</code>（填充）和 <code>borderless</code>（无边框）两种视觉风格</p></li><li><p>支持 <code>direction</code> 属性控制文本方向</p></li><li><p>可通过 <code>classNames</code> 和 <code>styles</code> 细粒度控制样式</p></li><li><p>支持 <code>image</code> 、 <code>extra</code> 插槽扩展自定义内容</p></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/prompts/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
