import { F as FilesCard } from "./useSend.nLhTyqQI.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_FilesCard = FilesCard;
  _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-fdfe4cda><div class="files-card-container-wrapper" data-v-fdfe4cda><span data-v-fdfe4cda>图片文件 <span style="${ssrRenderStyle({ "color": "red" })}" data-v-fdfe4cda>可预览</span> 和 <span style="${ssrRenderStyle({ "color": "red" })}" data-v-fdfe4cda>不可预览</span></span><div class="files-card-container" data-v-fdfe4cda>`);
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "可预览的图片.jpeg",
    "show-del-icon": "",
    url: "https://avatars.githubusercontent.com/u/76239030?v=4"
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "无法预览的图片.jpeg",
    "show-del-icon": ""
  }, null, _parent));
  _push(`</div><span data-v-fdfe4cda>图片文件 <span style="${ssrRenderStyle({ "color": "red" })}" data-v-fdfe4cda>正方形变体</span> 其他格式不受变体属性影响</span><div class="files-card-container" data-v-fdfe4cda>`);
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "可预览的图片.jpeg",
    url: "https://avatars.githubusercontent.com/u/76239030?v=4",
    "img-variant": "square",
    "show-del-icon": ""
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "无法预览的图片.jpeg",
    "img-variant": "square",
    "show-del-icon": ""
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "其他文件不受变体影响.txt",
    "img-variant": "square",
    "show-del-icon": "",
    "file-size": 3e4
  }, null, _parent));
  _push(`</div><span data-v-fdfe4cda>图片文件 默认长方形变体 <span style="${ssrRenderStyle({ "color": "red" })}" data-v-fdfe4cda>支持上传状态 、支持预览开启关闭 、支持预览遮罩蒙层开启关闭</span></span><div class="files-card-container" data-v-fdfe4cda>`);
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "上传进度.jpeg",
    percent: 50,
    status: "uploading",
    "show-del-icon": "",
    url: "https://avatars.githubusercontent.com/u/76239030?v=4"
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "上传失败.jpeg",
    status: "error",
    "show-del-icon": "",
    url: "https://avatars.githubusercontent.com/u/76239030?v=4"
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "关闭预览悬停遮罩.jpeg",
    "img-preview-mask": false,
    "show-del-icon": "",
    url: "https://avatars.githubusercontent.com/u/76239030?v=4"
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "关闭预览功能.jpeg",
    "img-preview": false,
    "show-del-icon": "",
    url: "https://avatars.githubusercontent.com/u/76239030?v=4"
  }, null, _parent));
  _push(`</div><span data-v-fdfe4cda>图片文件 正方形变体 <span style="${ssrRenderStyle({ "color": "red" })}" data-v-fdfe4cda>支持上传状态 、支持预览开启关闭 、支持预览遮罩蒙层开启关闭</span></span><div class="files-card-container" data-v-fdfe4cda>`);
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "上传进度.jpeg",
    "img-variant": "square",
    percent: 50,
    status: "uploading",
    "show-del-icon": "",
    url: "https://avatars.githubusercontent.com/u/76239030?v=4"
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "上传失败.jpeg",
    "img-variant": "square",
    status: "error",
    "show-del-icon": "",
    url: "https://avatars.githubusercontent.com/u/76239030?v=4"
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "上传完成.jpeg",
    "img-variant": "square",
    "show-del-icon": "",
    url: "https://avatars.githubusercontent.com/u/76239030?v=4"
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "关闭预览悬停遮罩.jpeg",
    "img-variant": "square",
    "img-preview-mask": false,
    "show-del-icon": "",
    url: "https://avatars.githubusercontent.com/u/76239030?v=4"
  }, null, _parent));
  _push(ssrRenderComponent(_component_FilesCard, {
    name: "关闭预览功能.jpeg",
    "img-variant": "square",
    "img-preview": false,
    "show-del-icon": "",
    url: "https://avatars.githubusercontent.com/u/76239030?v=4"
  }, null, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/filesCard/demos/image-preview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const imagePreview = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fdfe4cda"]]);
export {
  imagePreview as default
};
