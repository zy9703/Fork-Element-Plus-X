import { bT as Conversations } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "built-in-menu",
  __ssrInlineRender: true,
  setup(__props) {
    const menuTestItems = ref([
      {
        key: "m1",
        label: "菜单测试项目 1 - 长文本效果演示文本长度溢出效果测试".repeat(2)
      },
      {
        key: "m2",
        label: "菜单测试项目 2",
        disabled: true
      },
      {
        key: "m3",
        label: "菜单测试项目 3"
      },
      {
        key: "m4",
        label: "菜单测试项目 4"
      },
      {
        key: "m5",
        label: "菜单测试项目 5"
      },
      {
        key: "m6",
        label: "菜单测试项目 6"
      },
      {
        key: "m7",
        label: "菜单测试项目 7"
      },
      {
        key: "m8",
        label: "菜单测试项目 8"
      },
      {
        key: "m9",
        label: "菜单测试项目 9"
      },
      {
        key: "m10",
        label: "菜单测试项目 10"
      },
      {
        key: "m11",
        label: "菜单测试项目 11"
      },
      {
        key: "m12",
        label: "菜单测试项目 12"
      },
      {
        key: "m13",
        label: "菜单测试项目 13"
      },
      {
        key: "m14",
        label: "菜单测试项目 14"
      }
    ]);
    const activeKey4 = ref("m1");
    function handleMenuCommand(command, item) {
      console.log("内置菜单点击事件：", command, item);
      if (command === "delete") {
        const index = menuTestItems.value.findIndex((itemSlef) => itemSlef.key === item.key);
        if (index !== -1) {
          menuTestItems.value.splice(index, 1);
          console.log("删除成功");
          ElMessage.success("删除成功");
        }
      }
      if (command === "rename") {
        item.label = "已修改";
        console.log("重命名成功");
        ElMessage.success("重命名成功");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Conversations = Conversations;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px", "height": "420px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Conversations, {
        active: unref(activeKey4),
        "onUpdate:active": ($event) => isRef(activeKey4) ? activeKey4.value = $event : null,
        items: unref(menuTestItems),
        "label-max-width": 200,
        "show-tooltip": true,
        "row-key": "key",
        "tooltip-placement": "right",
        "tooltip-offset": 35,
        "show-to-top-btn": "",
        "show-built-in-menu": "",
        onMenuCommand: handleMenuCommand
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/conversations/demos/built-in-menu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
