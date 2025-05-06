import { F as FilesCard } from "./useSend.GCLvJHLh.js";
import { defineComponent, computed, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-color",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMap1 = {
      word: "#5E74A8",
      excel: "#4A6B4A",
      ppt: "#C27C40",
      pdf: "#5A6976",
      txt: "#D4C58C",
      mark: "#FFA500",
      image: "#8E7CC3",
      audio: "#A67B5B",
      video: "#4A5568",
      three: "#5F9E86",
      code: "#4B636E",
      database: "#4A5A6B",
      link: "#5D7CBA",
      zip: "#8B5E3C",
      file: "#AAB2BF",
      unknown: "#888888"
    };
    const colorMap2 = {
      word: "#0078D4",
      excel: "#4CB050",
      ppt: "#FF9933",
      pdf: "#E81123",
      txt: "#666666",
      mark: "#FFA500",
      image: "#B490F3",
      audio: "#00B2EE",
      video: "#2EC4B6",
      three: "#00C8FF",
      code: "#00589F",
      database: "#F5A623",
      link: "#007BFF",
      zip: "#888888",
      file: "#F0D9B5",
      unknown: "#D8D8D8"
    };
    const colorKeys = computed(() => Object.keys(colorMap1));
    const filesCardProps = ref({
      uid: "1",
      name: "测试名称",
      description: "测试description"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FilesCard = FilesCard;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-7786fcfe><div class="files-card-container-wrapper" data-v-7786fcfe><p data-v-7786fcfe>自定义颜色1</p><div class="files-card-container" data-v-7786fcfe><!--[-->`);
      ssrRenderList(unref(colorKeys), (items) => {
        _push(ssrRenderComponent(_component_FilesCard, mergeProps({
          key: items,
          ref_for: true
        }, { ...unref(filesCardProps) }, {
          "icon-color": colorMap1[items],
          "file-type": items
        }), null, _parent));
      });
      _push(`<!--]--></div><p data-v-7786fcfe>自定义颜色2</p><div class="files-card-container" data-v-7786fcfe><!--[-->`);
      ssrRenderList(unref(colorKeys), (items) => {
        _push(ssrRenderComponent(_component_FilesCard, mergeProps({
          key: items,
          ref_for: true
        }, { ...unref(filesCardProps) }, {
          "icon-color": colorMap2[items],
          "file-type": items
        }), null, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/filesCard/demos/custom-color.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customColor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7786fcfe"]]);
export {
  customColor as default
};
