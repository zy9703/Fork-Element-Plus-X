import { F as FilesCard } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "base",
  __ssrInlineRender: true,
  setup(__props) {
    const filesCardRef = ref();
    const colorMap = ref({});
    onMounted(() => {
      var _a;
      colorMap.value = (_a = filesCardRef.value) == null ? void 0 : _a.colorMap;
      console.log(colorMap.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FilesCard = FilesCard;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-b1766b42><span data-v-b1766b42>设置 name 属性, 且 name 没有后缀。name=&quot;测试文件&quot;</span>`);
      _push(ssrRenderComponent(_component_FilesCard, {
        ref_key: "filesCardRef",
        ref: filesCardRef,
        name: "测试文件"
      }, null, _parent));
      _push(`<span data-v-b1766b42>设置 name 属性，有文件后缀。name=&quot;测试文件.pdf&quot;</span>`);
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试文件.pdf" }, null, _parent));
      _push(`<span data-v-b1766b42>支持更据 name 后缀匹配内置图标 </span><div class="files-card-container" data-v-b1766b42>`);
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试doc后缀.doc" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试xls后缀.xls" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试ppt后缀.ppt" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试txt后缀.txt" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试pdf后缀.pdf" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试png后缀.png" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试jpg后缀.jpg" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试gif后缀.gif" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试mp4后缀.mp4" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试mp3后缀.mp3" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试zip后缀.zip" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试rar后缀.rar" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试7z后缀.7z" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试lnk后缀.lnk" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试obj后缀.obj" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试fbx后缀.fbx" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试glb后缀.glb" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试sql后缀.sql" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试db后缀.db" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试md后缀.md" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试js后缀.js" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试py后缀.py" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试java后缀.java" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试php后缀.php" }, null, _parent));
      _push(ssrRenderComponent(_component_FilesCard, { name: "测试json后缀.json" }, null, _parent));
      _push(`</div><span data-v-b1766b42>如果有后缀，但是匹配不到常用的图标，则默认为 File 文件</span>`);
      _push(ssrRenderComponent(_component_FilesCard, { name: "https://dd.com多个特殊字符.后缀.self" }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/filesCard/demos/base.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const base = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b1766b42"]]);
export {
  base as default
};
