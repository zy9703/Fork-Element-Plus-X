import { bR as Attachments } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-list",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))} data-v-4fd7f226>`);
      _push(ssrRenderComponent(_component_Attachments, {
        "file-list": files.value,
        "http-request": handleHttpRequest,
        items: files.value,
        drag: "",
        "before-upload": handleBeforUpload,
        "hide-upload": false,
        onUploadDrop: handleUploadDrop,
        onDeleteCard: handleDeleteCard
      }, {
        "file-list": withCtx(({ items }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="custom-list" data-v-4fd7f226${_scopeId}><!--[-->`);
            ssrRenderList(items, (item, index) => {
              _push2(`<div class="custom-item" data-v-4fd7f226${_scopeId}><div class="custom-item-name" data-v-4fd7f226${_scopeId}>${ssrInterpolate(item.name)}</div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "custom-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                  return openBlock(), createBlock("div", {
                    key: index,
                    class: "custom-item"
                  }, [
                    createVNode("div", { class: "custom-item-name" }, toDisplayString(item.name), 1)
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/attachments/demos/custom-list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4fd7f226"]]);
export {
  customList as default
};
