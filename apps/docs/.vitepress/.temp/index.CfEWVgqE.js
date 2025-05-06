import { _ as _export_sfc, B as Bubble, c as ElIcon, bS as arrow_down_bold_default } from "./useSend.GCLvJHLh.js";
import { createElementBlock, openBlock, createStaticVNode, defineComponent, ref, computed, watch, nextTick, normalizeStyle, normalizeClass, createCommentVNode, Fragment, renderList, createBlock, createSlots, withCtx, renderSlot, unref, createVNode, onMounted, onBeforeUnmount } from "vue";
const _sfc_main$1 = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  version: "1.1",
  width: "704",
  height: "704",
  viewBox: "0 0 704 704"
};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createStaticVNode('<defs><filter id="master_svg0_62_10054" filterUnits="objectBoundingBox" color-interpolation-filters="sRGB" x="-0.030120481927710843" y="-0.030120481927710843" width="1.0602409638554218" height="1.0602409638554218"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur"></feGaussianBlur></filter><linearGradient id="master_svg1_62_10082" x1="0.5" y1="-0.13192443549633026" x2="0.42319029569625854" y2="1.368432641029358"><stop offset="9.145302325487137%" stop-color="currentColor" stop-opacity="1"></stop><stop offset="13.636428117752075%" stop-color="currentColor" stop-opacity="0.07539999485015869"></stop><stop offset="16.968481242656708%" stop-color="currentColor" stop-opacity="0"></stop></linearGradient></defs><g transform="matrix(0,1,-1,0,704,-664)" filter="url(#master_svg0_62_10054)"><path d="M1016,684C1199.359,684,1348,535.359,1348,352C1348,168.641,1199.359,20,1016,20C832.641,20,684,168.641,684,352C684,535.359,832.641,684,1016,684ZM1016,32C1192.731,32,1336,175.269,1336,352C1336,528.731,1192.731,672,1016,672C839.269,672,696,528.731,696,352C696,175.269,839.269,32,1016,32Z" fill-rule="evenodd" fill="url(#master_svg1_62_10082)" fill-opacity="1"></path></g>', 2)
  ]));
}
const loadingBg = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const useScrollDetector = (elementRef) => {
  const hasVertical = ref(false);
  const hasHorizontal = ref(false);
  const check = () => {
    const el = elementRef.value;
    if (!el)
      return;
    hasVertical.value = el.scrollHeight > el.clientHeight;
    hasHorizontal.value = el.scrollWidth > el.clientWidth;
  };
  onMounted(() => {
    check();
    const observer = new ResizeObserver(check);
    observer.observe(elementRef.value);
    onBeforeUnmount(() => observer.disconnect());
  });
  return {
    hasVertical,
    // 是否有纵向滚动条
    hasHorizontal,
    // 是否有横向滚动条
    check
    // 检查滚动条状态
  };
};
const threshold = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    list: { default: () => [] },
    maxHeight: { default: "500px" },
    triggerIndices: { default: "only-last" },
    alwaysShowScrollbar: { type: Boolean, default: false },
    backButtonThreshold: { default: 80 },
    showBackButton: { type: Boolean, default: true },
    backButtonPosition: { default: () => {
      return { bottom: "20px", left: "calc(50% - 19px)" };
    } },
    btnLoading: { type: Boolean, default: true },
    btnColor: { default: "#409EFF" },
    btnIconSize: { default: 24 },
    highlight: { type: Function, default: void 0 },
    mdPlugins: { default: void 0 }
  },
  emits: ["complete"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const scrollContainer = ref(null);
    const { hasVertical } = useScrollDetector(scrollContainer);
    const stopAutoScrollToBottom = ref(false);
    const lastScrollTop = ref(0);
    const accumulatedScrollUpDistance = ref(0);
    const resizeObserver = ref(null);
    const showBackToBottom = ref(false);
    const effectiveTriggerIndices = computed(() => {
      if (props.triggerIndices === "only-last") {
        const triggerIndices = props.list.filter((item) => item.typing).map((_, index) => index);
        return triggerIndices.length > 0 ? [triggerIndices[triggerIndices.length - 1]] : [];
      } else if (props.triggerIndices === "all") {
        return props.list.map((_, index) => index);
      } else if (Array.isArray(props.triggerIndices)) {
        const validIndices = getValidIndices(props.list, props.triggerIndices);
        return validIndices.length > 0 ? [validIndices[validIndices.length - 1]] : [];
      }
      return [];
    });
    function getValidIndices(list, indices) {
      const validIndices = [];
      for (let i = 0; i < indices.length; i++) {
        const index = indices[i];
        if (index < 0 || index >= list.length || !list[index].typing) ;
        else {
          validIndices.push(index);
        }
      }
      return validIndices;
    }
    watch(
      () => props.list.length,
      () => {
        if (props.list && props.list.length > 0) {
          nextTick(() => {
            autoScroll();
          });
        }
      },
      { immediate: true }
    );
    function scrollToTop() {
      stopAutoScrollToBottom.value = true;
      nextTick(() => {
        scrollContainer.value.scrollTop = 0;
      });
    }
    function scrollToBottom() {
      try {
        if (scrollContainer.value && scrollContainer.value.scrollHeight) {
          nextTick(() => {
            scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
            stopAutoScrollToBottom.value = false;
          });
        }
      } catch (error) {
      }
    }
    function scrollToBubble(index) {
      const container = scrollContainer.value;
      if (!container)
        return;
      const bubbles = container.querySelectorAll(".el-bubble");
      if (index >= bubbles.length)
        return;
      stopAutoScrollToBottom.value = true;
      const targetBubble = bubbles[index];
      const containerRect = container.getBoundingClientRect();
      const bubbleRect = targetBubble.getBoundingClientRect();
      const scrollPosition = bubbleRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
      });
    }
    function autoScroll() {
      if (scrollContainer.value) {
        const listBubbles = scrollContainer.value.querySelectorAll(".el-bubble-content-wrapper");
        if (resizeObserver.value) {
          resizeObserver.value.disconnect();
        }
        const lastItem = listBubbles[listBubbles.length - 1];
        if (lastItem) {
          resizeObserver.value = new ResizeObserver(() => {
            if (!stopAutoScrollToBottom.value) {
              scrollToBottom();
            }
          });
          resizeObserver.value.observe(lastItem);
        }
      }
    }
    function handleBubbleComplete(index, instance) {
      if (effectiveTriggerIndices.value.includes(index)) {
        emits("complete", instance, index);
      }
    }
    function handleScroll() {
      if (scrollContainer.value) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
        const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
        showBackToBottom.value = props.showBackButton && distanceToBottom > props.backButtonThreshold;
        const isCloseToBottom = scrollTop + clientHeight >= scrollHeight - 30;
        const isScrollingUp = lastScrollTop.value > scrollTop;
        const isScrollingDown = lastScrollTop.value < scrollTop;
        const scrollDelta = lastScrollTop.value - scrollTop;
        lastScrollTop.value = scrollTop;
        if (isScrollingUp) {
          accumulatedScrollUpDistance.value += scrollDelta;
          if (accumulatedScrollUpDistance.value >= threshold) {
            if (!stopAutoScrollToBottom.value) {
              stopAutoScrollToBottom.value = true;
            }
            accumulatedScrollUpDistance.value = 0;
          }
        } else {
          accumulatedScrollUpDistance.value = 0;
        }
        if (isScrollingDown && isCloseToBottom) {
          if (stopAutoScrollToBottom.value) {
            stopAutoScrollToBottom.value = false;
          }
        }
      }
    }
    __expose({
      scrollToTop,
      scrollToBottom,
      scrollToBubble
    });
    return (_ctx, _cache) => {
      const _component_el_icon = ElIcon;
      return openBlock(), createElementBlock("div", {
        ref_key: "scrollContainer",
        ref: scrollContainer,
        class: normalizeClass(["el-bubble-list", { "always-scrollbar": props.alwaysShowScrollbar }]),
        style: normalizeStyle({
          "--el-bubble-list-max-height": `${_ctx.maxHeight}`,
          "--el-bubble-list-btn-size": `${props.btnIconSize}px`
        }),
        onScroll: handleScroll
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (item, index) => {
          return openBlock(), createBlock(Bubble, {
            key: index,
            content: item.content,
            placement: item.placement,
            loading: item.loading,
            shape: item.shape,
            variant: item.variant,
            "is-markdown": item.isMarkdown,
            "is-fog": item.isFog,
            typing: item.typing,
            "max-width": item.maxWidth,
            avatar: item.avatar,
            "avatar-size": item.avatarSize,
            "avatar-gap": item.avatarGap,
            "avatar-shape": item.avatarShape,
            "avatar-icon": item.avatarIcon,
            "avatar-src-set": item.avatarSrcSet,
            "avatar-alt": item.avatarAlt,
            "avatar-fit": item.avatarFit,
            "no-style": item.noStyle,
            highlight: item.highlight ? item.highlight : props.highlight,
            "md-plugins": item.mdPlugins ? item.mdPlugins : props.mdPlugins,
            onFinish: (instance) => handleBubbleComplete(index, instance)
          }, createSlots({ _: 2 }, [
            _ctx.$slots.avatar ? {
              name: "avatar",
              fn: withCtx(() => [
                renderSlot(_ctx.$slots, "avatar", { item }, void 0, true)
              ]),
              key: "0"
            } : void 0,
            _ctx.$slots.header ? {
              name: "header",
              fn: withCtx(() => [
                renderSlot(_ctx.$slots, "header", { item }, void 0, true)
              ]),
              key: "1"
            } : void 0,
            _ctx.$slots.content ? {
              name: "content",
              fn: withCtx(() => [
                renderSlot(_ctx.$slots, "content", { item }, void 0, true)
              ]),
              key: "2"
            } : void 0,
            _ctx.$slots.footer ? {
              name: "footer",
              fn: withCtx(() => [
                renderSlot(_ctx.$slots, "footer", { item }, void 0, true)
              ]),
              key: "3"
            } : void 0,
            _ctx.$slots.loading ? {
              name: "loading",
              fn: withCtx(() => [
                renderSlot(_ctx.$slots, "loading", { item }, void 0, true)
              ]),
              key: "4"
            } : void 0
          ]), 1032, ["content", "placement", "loading", "shape", "variant", "is-markdown", "is-fog", "typing", "max-width", "avatar", "avatar-size", "avatar-gap", "avatar-shape", "avatar-icon", "avatar-src-set", "avatar-alt", "avatar-fit", "no-style", "highlight", "md-plugins", "onFinish"]);
        }), 128)),
        unref(showBackToBottom) && unref(hasVertical) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["el-bubble-list-default-back-button", {
            "el-bubble-list-back-to-bottom-solt": _ctx.$slots.backToBottom
          }]),
          style: normalizeStyle({
            bottom: _ctx.backButtonPosition.bottom,
            left: _ctx.backButtonPosition.left
          }),
          onClick: scrollToBottom
        }, [
          renderSlot(_ctx.$slots, "backToBottom", {}, () => [
            createVNode(_component_el_icon, {
              class: "el-bubble-list-back-to-bottom-icon",
              style: normalizeStyle({ color: props.btnColor })
            }, {
              default: withCtx(() => [
                createVNode(unref(arrow_down_bold_default)),
                props.btnLoading ? (openBlock(), createBlock(loadingBg, {
                  key: 0,
                  class: "back-to-bottom-loading-svg-bg"
                })) : createCommentVNode("", true)
              ]),
              _: 1
            }, 8, ["style"])
          ], true)
        ], 6)) : createCommentVNode("", true)
      ], 38);
    };
  }
});
const BubbleList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-35951370"]]);
export {
  BubbleList as B
};
