import { F as FilesCard } from "./useSend.nLhTyqQI.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_FilesCard = FilesCard;
  _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-fca849b3><div class="files-card-container-wrapper" data-v-fca849b3><span data-v-fca849b3>设置 status 属性，控制文件加载状态 &quot;uploading&quot;,&quot;done&quot;,&quot;error&quot;</span><div class="files-card-container" data-v-fca849b3>`);
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "uploading 测试文件.pdf",
    status: "uploading"
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "done 测试文件.pdf",
    status: "done"
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "error 测试文件.pdf",
    status: "error"
  }, null, _parent));
  _push(`</div><span data-v-fca849b3>&quot;uploading&quot;+&quot;percent&quot; 控制上传进度，&quot;error&quot;+&quot;errorTip&quot;控制自定义失败提示 </span><div class="files-card-container" data-v-fca849b3>`);
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "uploading 测试文件.doc",
    status: "uploading",
    percent: 50
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "error 测试文件.doc",
    status: "error",
    "error-tip": "自定义失败提示"
  }, null, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/filesCard/demos/status.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const status = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fca849b3"]]);
export {
  status as default
};
