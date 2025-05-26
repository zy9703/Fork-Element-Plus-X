<script>
import A3Bubble from '../Bubble/index.vue';
import loadingBg from './loading.vue';
import useScrollDetector from '../../utils/useScrollDetector';

export default {
  name: 'A3BubbleList',
  components: {
    A3Bubble,
    loadingBg,
  },
  props: {
    /**
     * 气泡列表数据
     */
    list: {
      type: Array,
      default: () => []
    },
    /**
     * 列表最大高度
     */
    maxHeight: {
      type: String,
      default: 'auto'
    },
    /**
     * 触发打字机效果的索引
     */
    triggerIndices: {
      type: [String, Array],
      default: 'only-last',
      validator: (value) => {
        if (typeof value === 'string') {
          return ['only-last', 'all'].includes(value);
        }
        return Array.isArray(value);
      }
    },
    /**
     * 是否始终显示滚动条
     */
    alwaysShowScrollbar: {
      type: Boolean,
      default: false
    },
    /**
     * 返回底部按钮出现的滚动阈值
     */
    backButtonThreshold: {
      type: Number,
      default: 80
    },
    /**
     * 是否显示返回底部按钮
     */
    showBackButton: {
      type: Boolean,
      default: true
    },
    /**
     * 返回底部按钮位置
     */
    backButtonPosition: {
      type: Object,
      default: () => ({
        bottom: '20px',
        left: 'calc(50% - 19px)'
      })
    },
    /**
     * 返回底部按钮是否显示加载动画
     */
    btnLoading: {
      type: Boolean,
      default: true
    },
    /**
     * 返回底部按钮颜色
     */
    btnColor: {
      type: String,
      default: '#409EFF'
    },
    /**
     * 返回底部按钮图标大小
     */
    btnIconSize: {
      type: Number,
      default: 24
    }
  },
  mixins: [useScrollDetector],
  data() {
    return {
      // 滚动容器的引用，在 Vue 2 中通过 ref 获取 DOM 元素
      scrollContainer: null,
      // 是否有垂直滚动条的状态，需要根据实际滚动情况判断
      hasVertical: false, // 需要实现 useScrollDetector 的 Vue 2 版本逻辑来更新此状态
      // 是否停止自动滚动到底部
      stopAutoScrollToBottom: false,
      // 上次滚动位置
      lastScrollTop: 0,
      // 累积向上滚动距离
      accumulatedScrollUpDistance: 0,
      // 阈值（像素），用于判断向上滚动距离
      threshold: 20,
      // ResizeObserver 实例，用于监听最后一个气泡元素的大小变化，需要 Vue 2 兼容实现或替代方案
      resizeObserver: null,
      // 控制返回底部按钮显示
      showBackToBottom: false,
      // 用户是否正在滚动
      isUserScrolling: false, // 用于判断是否是用户手动滚动
      // 滚动定时器，用于判断用户滚动停止
      scrollTimer: null,
      // 是否滚动到底部
      isScrolledToBottom: true, // 用于判断是否在底部，结合 isUserScrolling 控制自动滚动
      // 打字机实例引用集合
      typingInstances: {}
    };
  },
  computed: {
    /* 计算有效的触发索引数组 */
    effectiveTriggerIndices() {
      if (this.triggerIndices === 'only-last') {
        // 过滤出 typing 为 true 的项，获取其索引
        const typingIndices = this.list.reduce((indices, item, index) => {
          if (item.typing) {
            indices.push(index);
          }
          return indices;
        }, []);
        // 返回最后一个 typing 项的索引，如果没有则返回空数组
        return typingIndices.length > 0 ? [typingIndices[typingIndices.length - 1]] : [];
      }
      else if (this.triggerIndices === 'all') {
        // 返回所有索引
        return this.list.map((_, index) => index);
      }
      else if (Array.isArray(this.triggerIndices)) {
        // 过滤出有效的索引
        const validIndices = this.getValidIndices(this.list, this.triggerIndices);
        // 返回最后一个有效索引，如果没有则返回空数组
        return validIndices.length > 0 ? [validIndices[validIndices.length - 1]] : [];
      }
      return [];
    }
  },
  watch: {
    // 监听列表长度变化
    list: {
      handler(newVal, oldVal) {
        // 如果列表长度增加
        if (newVal.length > (oldVal?.length || 0)) {
          this.$nextTick(() => {
            // 如果当前在底部或者不是用户手动滚动，则自动滚动到底部
            if (this.isScrolledToBottom || !this.isUserScrolling) {
              this.scrollToBottom();
            }
          });
        }
      },
      // 深度监听
      deep: true
    }
  },
  mounted() {
    // 组件挂载后，获取滚动容器的引用
    this.scrollContainer = this.$refs.scrollContainer; //TODO 兼容改动
    // 初始滚动到底部
    this.$nextTick(() => {
      this.scrollToBottom();
      // 初始化滚动检测（如果实现了 Vue 2 兼容版本）
      // this.initScrollDetector();
      // 初始化 ResizeObserver 监听（如果实现了 Vue 2 兼容版本）
      // this.initResizeObserver();
    });
  },
  beforeDestroy() {
    // 组件销毁前，清除定时器和 ResizeObserver
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
      this.scrollTimer = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  },
  methods: {
    // 提取有效索引判断逻辑到独立函数
    getValidIndices(list, indices) {
      const validIndices = [];
      const invalidIndices = [];
      for (let i = 0; i < indices.length; i++) {
        const index = indices[i];
        // 判断索引是否有效且对应项的 typing 为 true
        if (index < 0 || index >= list.length || !list[index].typing) {
          invalidIndices.push(index);
        }
        else {
          validIndices.push(index);
        }
      }
      if (invalidIndices.length > 0) {
        console.warn(`[A3BubbleList] 无效索引 ${invalidIndices}`);
      }
      return validIndices;
    },
    /**
     * 父组件的触发方法，直接让滚动容器滚动到顶部
     */
    scrollToTop() {
      // 处理在滚动时候，无法回到顶部的问题
      this.stopAutoScrollToBottom = true;
      this.$nextTick(() => {
        // 自动滚动到最顶部
        if (this.scrollContainer) {
          this.scrollContainer.scrollTop = 0;
        }
      });
    },
    /**
     * 父组件的触发方法，不跟随打字器滚动，滚动底部
     */
    scrollToBottom() {
      try {
        if (this.scrollContainer && this.scrollContainer.scrollHeight) {
          this.$nextTick(() => {
            this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
            // 修复清空BubbleList后，再次调用 scrollToBottom()，不触发自动滚动问题
            this.stopAutoScrollToBottom = false;
          });
        }
      }
      catch (error) {
        console.warn('[A3BubbleList error]: ', error);
      }
    },
    /**
     * 父组件触发滚动到指定气泡框
     */
    scrollToBubble(index) {
      const container = this.scrollContainer;
      if (!container)
        return;

      // 在 Vue 2 中通过 $refs 获取子组件实例，然后访问其 $el 获取 DOM 元素
      const bubbleRef = this.$refs[`bubble-${index}`];
      if (!bubbleRef || !bubbleRef[0] || !bubbleRef[0].$el)
        return;

      const targetBubble = bubbleRef[0].$el;

      // 计算相对位置
      const containerRect = container.getBoundingClientRect();
      const bubbleRect = targetBubble.getBoundingClientRect();

      // 计算需要滚动的距离（元素顶部相对于容器顶部的位置 - 容器当前滚动位置）
      const scrollPosition = bubbleRect.top - containerRect.top + container.scrollTop;

      // 使用容器自己的滚动方法
      // 注意：Vue 2 中 DOM 元素的 scrollTo 方法可能不支持 behavior: 'smooth'
      // 如果需要平滑滚动，可能需要使用第三方库或手动实现动画
      container.scrollTo({
        top: scrollPosition,
        // behavior: 'smooth', // Vue 2 原生可能不支持
      });
    },
    // 组件内部触发方法，跟随打字器滚动，滚动底部
    autoScroll() {
      if (this.scrollContainer) {
        // 获取所有气泡内容包装元素的 DOM 节点
        const listBubbles = this.scrollContainer.querySelectorAll('.el-bubble-content-wrapper');
        // 如果页面上有监听节点，先移除
        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
        }
        const lastItem = listBubbles[listBubbles.length - 1];
        if (lastItem) {
          // 使用 ResizeObserver 监听最后一个气泡元素的大小变化
          // 注意：ResizeObserver 是较新的 API，需要考虑兼容性或使用替代方案（如 MutationObserver 或轮询）
          this.resizeObserver = new ResizeObserver(() => {
            if (!this.stopAutoScrollToBottom) {
              this.scrollToBottom();
            }
          });
          this.resizeObserver.observe(lastItem);
        }
      }
    },
    // 打字机播放完成回调
    handleBubbleComplete(index, instance) {
      // 判断当前索引是否在有效的触发索引数组中
      if (this.effectiveTriggerIndices.includes(index)) {
        // 触发 complete 事件，并传递打字机实例和索引
        this.$emit('complete', instance, index);
      }
    },
    // 监听用户滚动事件
    handleScroll(e) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;

      // 计算距离底部的距离
      const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
      // 判断是否显示返回底部按钮
      this.showBackToBottom = this.showBackButton && distanceToBottom > this.backButtonThreshold;

      // 判断是否距离底部小于阈值 (这里吸附值大一些会体验更好)
      const isCloseToBottom = scrollTop + clientHeight >= scrollHeight - 30;
      // 判断用户是否向上滚动
      const isScrollingUp = this.lastScrollTop > scrollTop;
      // 判断用户是否向下滚动
      const isScrollingDown = this.lastScrollTop < scrollTop;
      // 计算当前滚动距离的变化
      const scrollDelta = this.lastScrollTop - scrollTop;
      // 更新上次滚动位置
      this.lastScrollTop = scrollTop;

      // 处理向上滚动逻辑
      if (isScrollingUp) {
        // 累积向上滚动距离
        this.accumulatedScrollUpDistance += scrollDelta;
        // 如果累积距离超过阈值，触发逻辑并重置累积距离
        if (this.accumulatedScrollUpDistance >= this.threshold) {
          // console.log(`用户向上滚动超过 ${this.threshold} 像素（累积）${this.stopAutoScrollToBottom}`);
          // 如果当前没有停止自动滚动，则停止自动滚动
          if (!this.stopAutoScrollToBottom) {
            this.stopAutoScrollToBottom = true;
          }
          // 重置累积距离
          this.accumulatedScrollUpDistance = 0;
        }
      }
      else {
        // 如果用户停止向上滚动或开始向下滚动，重置累积距离
        this.accumulatedScrollUpDistance = 0;
      }

      // 处理向下滚动且接近底部的逻辑
      if (isScrollingDown && isCloseToBottom) {
        // console.log(`用户向下滚动且距离底部小于 ${this.threshold} 像素`);
        // 如果当前停止了自动滚动，则恢复自动滚动
        if (this.stopAutoScrollToBottom) {
          this.stopAutoScrollToBottom = false;
        }
      }

      // 更新是否滚动到底部的状态（用于控制自动滚动）
      this.isScrolledToBottom = isCloseToBottom;

      // 判断是否是用户滚动（用于控制列表长度变化时的自动滚动）
      // 如果滚动距离变化较大，认为是用户滚动
      if (Math.abs(scrollTop - this.lastScrollTop) > 5) { // 阈值可以调整
        this.isUserScrolling = true;

        // 设置定时器，一段时间后重置用户滚动状态
        if (this.scrollTimer) {
          clearTimeout(this.scrollTimer);
        }

        this.scrollTimer = setTimeout(() => {
          this.isUserScrolling = false;
        }, 200); // 延迟时间可以调整
      }
    }
    // 注意：Vue 2 Options API 中，通过 this.$refs 获取子组件实例，然后通过 $el 访问其根 DOM 元素
    // defineExpose 的功能在 Vue 2 中不需要，直接在 methods 中定义方法即可在父组件通过 ref 调用
  }
};
</script>

<template>
  <div
    ref="scrollContainer"
    class="el-bubble-list"
    :class="{ 'always-scrollbar': alwaysShowScrollbar }"
    :style="{
      '--el-bubble-list-max-height': `${maxHeight}`,
      '--el-bubble-list-btn-size': `${btnIconSize}px`,
    }"
    @scroll="handleScroll"
  >
    <!-- 如果给 BubbleList 的 item 传入 md 配置，则按照 item 的 md 配置渲染 -->
    <!-- 否则，则按照 BubbleList 的 md 配置渲染 -->
    <A3Bubble
      v-for="(item, index) in list"
      :key="index"
      :content="item.content"
      :placement="item.placement"
      :loading="item.loading"
      :shape="item.shape"
      :variant="item.variant"
      :is-markdown="item.isMarkdown"
      :is-fog="item.isFog"
      :typing="item.typing"
      :max-width="item.maxWidth"
      :avatar="item.avatar"
      :avatar-size="item.avatarSize"
      :avatar-gap="item.avatarGap"
      :avatar-shape="item.avatarShape"
      :avatar-icon="item.avatarIcon"
      :avatar-src-set="item.avatarSrcSet"
      :avatar-alt="item.avatarAlt"
      :avatar-fit="item.avatarFit"
      :no-style="item.noStyle"
      @finish="(instance) => handleBubbleComplete(index, instance)"
    >
      <template v-if="$slots.avatar" #avatar>
        <slot name="avatar" :item="item" />
      </template>
      <template v-if="$slots.header" #header>
        <slot name="header" :item="item" />
      </template>
      <template v-if="$slots.content" #content>
        <slot name="content" :item="item" />
      </template>
      <template v-if="$slots.footer" #footer>
        <slot name="footer" :item="item" />
      </template>
      <template v-if="$slots.loading" #loading>
        <slot name="loading" :item="item" />
      </template>
    </A3Bubble>

    <!-- 自定义按钮插槽 默认返回按钮 -->

    <div
      v-if="showBackToBottom && hasVertical"
      class="el-bubble-list-default-back-button"
      :class="{
        'el-bubble-list-back-to-bottom-solt': $slots.backToBottom,
      }"
      :style="{
        bottom: backButtonPosition.bottom,
        left: backButtonPosition.left,
      }"
      @click="scrollToBottom"
    >
      <slot name="backToBottom">
        <i
          class="el-icon-arrow-down el-bubble-list-back-to-bottom-icon"
          :style="{ color: btnColor, fontWeight: 'bold'}"
        >
          <loadingBg v-if="btnLoading" class="back-to-bottom-loading-svg-bg" />
        </i>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-bubble-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  max-height: var(--el-bubble-list-max-height);
  overflow: auto;
  scroll-behavior: smooth;

  position: relative;
  /* 默认滚动条样式（透明） */
  &::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    background-color: #0003;
    border-radius: 10px;
    transition: background-color .2s ease-in-out;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: transparent;
  }

  /* 悬停时显示滚动条 */
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  }

  /* 始终显示滚动条模式 */
  &.always-scrollbar {
    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
    }

    &:hover::-webkit-scrollbar-thumb {
      background: #a8a8a8;
    }
  }

}

/* 火狐浏览器滚动条样式 */
@supports (scrollbar-color: auto) {
  .el-bubble-list {
    scrollbar-color: transparent transparent;
    scrollbar-width: thin;

    &:hover {
      scrollbar-color: #c1c1c1 transparent;
    }

    &.always-scrollbar {
      scrollbar-color: #c1c1c1 transparent;
    }
  }
}

.el-bubble-list-default-back-button {
  position: sticky;
  user-select: none;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  // background-color: aquamarine;
  border-radius: 50%;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .02), 0 6px 10px 0 rgba(47, 53, 64, .1);
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .el-bubble-list-back-to-bottom-icon {
    font-size: var(--el-bubble-list-btn-size);
    position: relative;

    .back-to-bottom-loading-svg-bg {
      position: absolute;
      font-size: calc(var(--el-bubble-list-btn-size) + 26px);
      animation: is-loading 1s infinite linear;
    }

    @keyframes is-loading {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}

// 如果是有自定义插槽，则初始化默认样式
.el-bubble-list-back-to-bottom-solt {
  position: sticky;
  user-select: none;
  cursor: initial;
  width: fit-content;
  height: fit-content;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: initial;

  &:hover {
    transform: translateY(0px);
    box-shadow: initial;
  }
}
</style>