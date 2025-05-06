import "./useSend.GCLvJHLh.js";
import { defineComponent, ref, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { P as Prompts } from "./index.BAw9nyLv.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ElMessage } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/message/style/css";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "nested",
  __ssrInlineRender: true,
  setup(__props) {
    const items = ref([]);
    onMounted(() => {
      for (let index = 0; index < 3; index++) {
        items.value.push({
          key: index,
          label: `🐠 主标题 ${index}`,
          description: `描述 ${index}`,
          // icon: h(InfoFilled, { style: { color: '#409EFF' } }),
          // icon: 'ancient-gate-fill',
          disabled: false,
          itemStyle: {
            width: `calc(100% / ${3} - 43px)`,
            backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`
          },
          itemHoverStyle: {
            cursor: "unset"
            // background: '#409EFF',
            // color: '#fff',
          },
          // itemActiveStyle: {
          //   // background: 'red',
          //   // color: '#fff',
          // },
          children: [
            {
              key: `${index}-1`,
              label: `🐛 子标题 ${index}-1`,
              description: `描述 ${index}`,
              disabled: false,
              itemStyle: {
                backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`,
                border: "1px solid #FFF"
              },
              itemHoverStyle: {
                cursor: "unset"
              },
              children: [
                {
                  key: `${index}-1-1`,
                  label: `🐛 孙子标题 ${index}-1-1`,
                  description: `描述 ${index}`,
                  disabled: false,
                  itemStyle: {
                    background: "rgba(255,255,255,0.45)",
                    border: "1px solid #FFF"
                  }
                },
                {
                  key: `${index}-1-2`,
                  label: `🐛 孙子标题 ${index}-1-1`,
                  description: `描述 ${index}`,
                  disabled: false,
                  itemStyle: {
                    background: "rgba(255,255,255,0.45)",
                    border: "1px solid #"
                  }
                },
                {
                  key: `${index}-1-3`,
                  label: `🐛 孙子标题 ${index}-1-1`,
                  description: `描述 ${index}`,
                  disabled: false,
                  itemStyle: {
                    background: "rgba(255,255,255,0.45)",
                    border: "1px solid #FFF"
                  }
                }
              ]
            },
            {
              key: `${index}-2`,
              label: `🐛 子标题 ${index}-2`,
              description: `描述 ${index}`,
              disabled: false,
              itemStyle: {
                background: "rgba(255,255,255,0.45)",
                border: "1px solid #FFF"
              }
            },
            {
              key: `${index}-3`,
              label: `🐛 子标题 ${index}-3`,
              description: `描述 ${index}`,
              disabled: false,
              itemStyle: {
                background: "rgba(255,255,255,0.45)",
                border: "1px solid #FFF"
              }
            }
          ]
        });
      }
    });
    function handleItemClick(item) {
      ElMessage.success(`点击了 ${item.key}`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Prompts = Prompts;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-direction": "column", "gap": "12px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Prompts, {
        title: "🐛 提示集组件标题",
        items: unref(items),
        wrap: "",
        onItemClick: handleItemClick
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/prompts/demos/nested.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
