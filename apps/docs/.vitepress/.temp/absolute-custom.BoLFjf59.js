import { bT as Conversations } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, withModifiers, createCommentVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "absolute-custom",
  __ssrInlineRender: true,
  setup(__props) {
    const menuTestItems1 = ref([
      {
        key: "m1",
        label: "菜单测试项目 1 - 长文本效果演示文本长度溢出效果测试".repeat(2),
        group: "工作"
      },
      {
        key: "m2",
        label: "菜单测试项目 2",
        disabled: true,
        group: "工作"
      },
      {
        key: "m3",
        label: "菜单测试项目 3",
        group: "工作"
      },
      {
        key: "m4",
        label: "菜单测试项目 4",
        group: "学习"
      },
      {
        key: "m5",
        label: "菜单测试项目 5",
        group: "学习"
      },
      {
        key: "m6",
        label: "菜单测试项目 6",
        group: "学习"
      },
      {
        key: "m7",
        label: "菜单测试项目 7",
        group: "学习"
      },
      {
        key: "m8",
        label: "菜单测试项目 8",
        group: "个人"
      },
      {
        key: "m9",
        label: "菜单测试项目 9",
        group: "个人"
      },
      {
        key: "m10",
        label: "菜单测试项目 10",
        group: "个人"
      },
      {
        key: "m11",
        label: "菜单测试项目 11",
        group: "个人"
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
    const conversationMenuItems1 = [
      {
        key: "edit",
        label: "编辑",
        icon: "🍉",
        command: {
          self_id: "1",
          self_message: "编辑",
          self_type: "text"
        }
      },
      {
        key: "delete",
        label: "删除",
        icon: "🍎",
        disabled: true,
        divided: true
      },
      {
        key: "share",
        label: "分享",
        icon: "🍆",
        command: "share"
      }
    ];
    const activeKey5 = ref("m1");
    const customGroupOptions = {
      // 自定义分组排序，学习 > 工作 > 个人 > 未分组
      sort: (a, b) => {
        const order = { 学习: 0, 工作: 1, 个人: 2, 未分组: 3 };
        const orderA = order[a] !== void 0 ? order[a] : 999;
        const orderB = order[b] !== void 0 ? order[b] : 999;
        return orderA - orderB;
      }
    };
    function handleMenuClick(menuKey, item) {
      console.log("菜单点击", menuKey, item);
      switch (menuKey) {
        case "edit":
          console.log(`编辑: ${item.label}`);
          ElMessage.warning(`编辑: ${item.label}`);
          break;
        case "delete":
          console.log(`删除: ${item.label}`);
          ElMessage.error(`删除: ${item.label}`);
          break;
        case "share":
          console.log(`分享: ${item.label}`);
          ElMessage.success(`分享: ${item.label}`);
          break;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Conversations = Conversations;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px", "height": "420px" } }, _attrs))} data-v-8d80b66e>`);
      _push(ssrRenderComponent(_component_Conversations, {
        active: unref(activeKey5),
        "onUpdate:active": ($event) => isRef(activeKey5) ? activeKey5.value = $event : null,
        items: unref(menuTestItems1),
        "label-max-width": 200,
        "show-tooltip": true,
        "tooltip-placement": "right",
        "tooltip-offset": 35,
        "show-built-in-menu": "",
        groupable: customGroupOptions,
        "row-key": "key",
        "items-style": {
          padding: "10px 20px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
          boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s",
          marginBottom: "20px",
          border: "2px dashed transparent"
        },
        "items-hover-style": {
          background: "#FAFAD2",
          border: "2px dashed #006400"
        },
        "items-active-style": {
          background: "#006400",
          color: "#FFFAFA",
          border: "2px dashed transparent"
        },
        "items-menu-opened-style": {
          border: "2px dashed transparent"
        },
        "menu-style": {
          backgroundColor: "red",
          boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
          padding: "10px 20px",
          height: "200px"
        }
      }, {
        label: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="custom-label" data-v-8d80b66e${_scopeId}>${ssrInterpolate(item.label)}</div>`);
          } else {
            return [
              createVNode("div", { class: "custom-label" }, toDisplayString(item.label), 1)
            ];
          }
        }),
        groupTitle: withCtx(({ group }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="custom-group-title" data-v-8d80b66e${_scopeId}>`);
            if (group.title === "工作") {
              _push2(`<span data-v-8d80b66e${_scopeId}>📊 </span>`);
            } else if (group.title === "学习") {
              _push2(`<span data-v-8d80b66e${_scopeId}>📚 </span>`);
            } else if (group.title === "个人") {
              _push2(`<span data-v-8d80b66e${_scopeId}>🏠 </span>`);
            } else {
              _push2(`<span data-v-8d80b66e${_scopeId}>📁 </span>`);
            }
            _push2(` ${ssrInterpolate(group.title)}</div>`);
          } else {
            return [
              createVNode("div", { class: "custom-group-title" }, [
                group.title === "工作" ? (openBlock(), createBlock("span", { key: 0 }, "📊 ")) : group.title === "学习" ? (openBlock(), createBlock("span", { key: 1 }, "📚 ")) : group.title === "个人" ? (openBlock(), createBlock("span", { key: 2 }, "🏠 ")) : (openBlock(), createBlock("span", { key: 3 }, "📁 ")),
                createTextVNode(" " + toDisplayString(group.title), 1)
              ])
            ];
          }
        }),
        "more-filled": withCtx(({ item, isHovered, isActive, isMenuOpened, isDisabled }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isHovered) {
              _push2(`<span data-v-8d80b66e${_scopeId}>✍️</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (isActive) {
              _push2(`<span data-v-8d80b66e${_scopeId}>✅</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (isMenuOpened) {
              _push2(`<span data-v-8d80b66e${_scopeId}>🥰</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (isDisabled) {
              _push2(`<span style="${ssrRenderStyle({
                background: "black",
                padding: "5px",
                borderRadius: "10px",
                color: "white",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              })}" data-v-8d80b66e${_scopeId}> 🫥是否禁用：${ssrInterpolate(item == null ? void 0 : item.disabled)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              isHovered ? (openBlock(), createBlock("span", { key: 0 }, "✍️")) : createCommentVNode("", true),
              isActive ? (openBlock(), createBlock("span", { key: 1 }, "✅")) : createCommentVNode("", true),
              isMenuOpened ? (openBlock(), createBlock("span", { key: 2 }, "🥰")) : createCommentVNode("", true),
              isDisabled ? (openBlock(), createBlock("span", {
                key: 3,
                style: {
                  background: "black",
                  padding: "5px",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }, " 🫥是否禁用：" + toDisplayString(item == null ? void 0 : item.disabled), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        menu: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="menu-buttons" data-v-8d80b66e${_scopeId}><!--[-->`);
            ssrRenderList(conversationMenuItems1, (menuItem) => {
              _push2(`<div class="menu-self-button" data-v-8d80b66e${_scopeId}>`);
              if (menuItem.icon) {
                _push2(`<span data-v-8d80b66e${_scopeId}>${ssrInterpolate(menuItem.icon)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (menuItem.label) {
                _push2(`<span data-v-8d80b66e${_scopeId}>${ssrInterpolate(menuItem.label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "menu-buttons" }, [
                (openBlock(), createBlock(Fragment, null, renderList(conversationMenuItems1, (menuItem) => {
                  return createVNode("div", {
                    key: menuItem.key,
                    class: "menu-self-button",
                    onClick: withModifiers(($event) => handleMenuClick(menuItem.key, item), ["stop"])
                  }, [
                    menuItem.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(menuItem.icon), 1)) : createCommentVNode("", true),
                    menuItem.label ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(menuItem.label), 1)) : createCommentVNode("", true)
                  ], 8, ["onClick"]);
                }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/conversations/demos/absolute-custom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const absoluteCustom = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d80b66e"]]);
export {
  absoluteCustom as default
};
