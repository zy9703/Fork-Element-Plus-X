import { ElButton, ElIcon } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/icon/style/css";
import { bT as Conversations } from "./useSend.GCLvJHLh.js";
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, resolveDynamicComponent, createBlock, openBlock, createCommentVNode, toDisplayString, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import { Edit, Delete, Share, EditPen } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-menu",
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
    const conversationMenuItems = [
      {
        key: "edit",
        label: "编辑",
        icon: Edit,
        command: {
          self_id: "1",
          self_message: "编辑",
          self_type: "text"
        }
      },
      {
        key: "delete",
        label: "删除",
        icon: Delete,
        disabled: true,
        divided: true
      },
      {
        key: "share",
        label: "分享",
        icon: Share,
        command: "share"
      }
    ];
    const activeKey4 = ref("m1");
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
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px", "height": "420px" } }, _attrs))} data-v-277c58e6>`);
      _push(ssrRenderComponent(_component_Conversations, {
        active: unref(activeKey4),
        "onUpdate:active": ($event) => isRef(activeKey4) ? activeKey4.value = $event : null,
        items: unref(menuTestItems),
        "row-key": "key",
        "label-max-width": 200,
        "show-tooltip": true,
        "show-to-top-btn": "",
        "show-built-in-menu": ""
      }, {
        "more-filled": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(EditPen), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(EditPen))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(EditPen))
                ]),
                _: 1
              })
            ];
          }
        }),
        menu: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="menu-buttons" data-v-277c58e6${_scopeId}><!--[-->`);
            ssrRenderList(conversationMenuItems, (menuItem) => {
              _push2(ssrRenderComponent(_component_el_button, {
                key: menuItem.key,
                link: "",
                size: "small",
                onClick: ($event) => handleMenuClick(menuItem.key, item)
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (menuItem.icon) {
                      _push3(ssrRenderComponent(_component_el_icon, null, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(menuItem.icon), null, null), _parent4, _scopeId3);
                          } else {
                            return [
                              (openBlock(), createBlock(resolveDynamicComponent(menuItem.icon)))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (menuItem.label) {
                      _push3(`<span data-v-277c58e6${_scopeId2}>${ssrInterpolate(menuItem.label)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      menuItem.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(menuItem.icon)))
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true),
                      menuItem.label ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(menuItem.label), 1)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "menu-buttons" }, [
                (openBlock(), createBlock(Fragment, null, renderList(conversationMenuItems, (menuItem) => {
                  return createVNode(_component_el_button, {
                    key: menuItem.key,
                    link: "",
                    size: "small",
                    onClick: withModifiers(($event) => handleMenuClick(menuItem.key, item), ["stop"])
                  }, {
                    default: withCtx(() => [
                      menuItem.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(menuItem.icon)))
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true),
                      menuItem.label ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(menuItem.label), 1)) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/conversations/demos/custom-menu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-277c58e6"]]);
export {
  customMenu as default
};
