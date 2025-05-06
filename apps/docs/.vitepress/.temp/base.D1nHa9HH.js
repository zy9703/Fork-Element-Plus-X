import { bR as Attachments } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "base",
  __ssrInlineRender: true,
  setup(__props) {
    const files = ref([]);
    function handleBeforUpload(file) {
      console.log("befor", file);
      if (file.size > 1024 * 1024 * 2) {
        ElMessage.error("文件大小不能超过 2MB!");
        return false;
      }
    }
    async function handleUploadDrop(files2, props) {
      console.log("drop", files2);
      console.log("props", props);
      if (files2 && files2.length > 0) {
        if (files2[0].type === "") {
          ElMessage.error("禁止上传文件夹！");
          return false;
        }
        for (let index = 0; index < files2.length; index++) {
          const file = files2[index];
          await handleHttpRequest({ file });
        }
      }
    }
    async function handleHttpRequest(options) {
      const formData = new FormData();
      formData.append("file", options.file);
      ElMessage.info("上传中...");
      setTimeout(() => {
        const res = {
          fileName: options.file.name,
          uid: options.file.uid,
          fileSize: options.file.size,
          imgFile: options.file
        };
        files.value.push({
          id: files.value.length,
          uid: res.uid,
          name: res.fileName,
          fileSize: res.fileSize,
          imgFile: res.imgFile,
          showDelIcon: true,
          imgVariant: "square"
        });
        ElMessage.success("上传成功");
      }, 1e3);
    }
    function handleDeleteCard(item) {
      files.value = files.value.filter((items) => items.id !== item.id);
      console.log("delete", item);
      ElMessage.success("删除成功");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Attachments = Attachments;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Attachments, {
        "file-list": files.value,
        "http-request": handleHttpRequest,
        items: files.value,
        drag: "",
        "before-upload": handleBeforUpload,
        "hide-upload": false,
        onUploadDrop: handleUploadDrop,
        onDeleteCard: handleDeleteCard
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/attachments/demos/base.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
