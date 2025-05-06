import { bR as Attachments } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "scroll-mode",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMap = {
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
    const files = ref([]);
    const typeList = Object.keys(colorMap);
    onMounted(() => {
      for (let index = 0; index < 30; index++) {
        files.value.push({
          id: index,
          uid: index,
          name: `文件${index}`,
          fileSize: 1024 * 2,
          fileType: typeList[Math.floor(Math.random() * typeList.length)],
          // description: `描述 ${index}`,
          url: "https://www.baidu.com",
          thumbUrl: "https://www.baidu.com",
          imgFile: new File([], "test.txt"),
          showDelIcon: true
        });
      }
    });
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
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}><div>scrollX</div>`);
      _push(ssrRenderComponent(_component_Attachments, {
        "file-list": files.value,
        "http-request": handleHttpRequest,
        items: files.value,
        drag: "",
        overflow: "scrollX",
        "before-upload": handleBeforUpload,
        "hide-upload": false,
        onUploadDrop: handleUploadDrop,
        onDeleteCard: handleDeleteCard
      }, null, _parent));
      _push(`<div>scrollY</div>`);
      _push(ssrRenderComponent(_component_Attachments, {
        "file-list": files.value,
        "http-request": handleHttpRequest,
        items: files.value,
        drag: "",
        overflow: "scrollY",
        "list-style": { height: "200px" },
        "before-upload": handleBeforUpload,
        "hide-upload": false,
        onUploadDrop: handleUploadDrop,
        onDeleteCard: handleDeleteCard
      }, null, _parent));
      _push(`<div>wrap</div>`);
      _push(ssrRenderComponent(_component_Attachments, {
        "file-list": files.value,
        "http-request": handleHttpRequest,
        items: files.value,
        drag: "",
        overflow: "wrap",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/attachments/demos/scroll-mode.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
