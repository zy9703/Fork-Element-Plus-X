import { bT as Conversations } from "./useSend.nLhTyqQI.js";
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, createBlock, createTextVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-group-sort",
  __ssrInlineRender: true,
  setup(__props) {
    const groupBasedItems = ref([
      {
        key: "g1",
        label: "工作文档1",
        group: "工作"
      },
      {
        key: "g2",
        label: "工作文档11111111111111111111111111111111111111111",
        group: "工作"
      },
      {
        key: "g3",
        label: "工作文档3",
        group: "工作"
      },
      {
        key: "g4",
        label: "工作文档4",
        group: "工作"
      },
      {
        key: "g5",
        label: "工作文档5",
        group: "工作"
      },
      {
        key: "g6",
        label: "工作文档6",
        group: "工作"
      },
      {
        key: "g7",
        label: "学习笔记1",
        group: "学习"
      },
      {
        key: "g8",
        label: "学习笔记2",
        group: "学习"
      },
      {
        key: "g9",
        label: "个人文档1",
        group: "个人"
      },
      {
        key: "g10",
        label: "未分组项目"
      }
    ]);
    const customGroupOptions = {
      // 自定义分组排序，学习 > 工作 > 个人 > 未分组
      sort: (a, b) => {
        const order = { 学习: 0, 工作: 1, 个人: 2, 未分组: 3 };
        const orderA = order[a] !== void 0 ? order[a] : 999;
        const orderB = order[b] !== void 0 ? order[b] : 999;
        return orderA - orderB;
      }
    };
    const activeKey2 = ref("g1");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Conversations = Conversations;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px", "height": "420px" } }, _attrs))} data-v-99746254>`);
      _push(ssrRenderComponent(_component_Conversations, {
        active: unref(activeKey2),
        "onUpdate:active": ($event) => isRef(activeKey2) ? activeKey2.value = $event : null,
        items: unref(groupBasedItems),
        groupable: customGroupOptions,
        "label-max-width": 200,
        "show-tooltip": true,
        "show-to-top-btn": "",
        "row-key": "key"
      }, {
        groupTitle: withCtx(({ group }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="custom-group-title" data-v-99746254${_scopeId}>`);
            if (group.title === "工作") {
              _push2(`<span data-v-99746254${_scopeId}>📊 </span>`);
            } else if (group.title === "学习") {
              _push2(`<span data-v-99746254${_scopeId}>📚 </span>`);
            } else if (group.title === "个人") {
              _push2(`<span data-v-99746254${_scopeId}>🏠 </span>`);
            } else {
              _push2(`<span data-v-99746254${_scopeId}>📁 </span>`);
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
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/conversations/demos/custom-group-sort.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customGroupSort = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-99746254"]]);
export {
  customGroupSort as default
};
