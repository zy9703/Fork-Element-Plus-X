<script>
import A3Typewriter from '../Typewriter/index.vue';

export default {
  name: 'A3Bubble',
  components: {
    A3Typewriter
  },
  props: {
    /**
     * 气泡内容
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * 推理内容
     */
    reasoning_content: {
      type: String,
      default: ''
    },
    /**
     * 气泡位置，开始或结束
     */
    placement: {
      type: String,
      default: 'start',
      validator: (value) => ['start', 'end'].includes(value)
    },
    /**
     * 头像URL
     */
    avatar: {
      type: String,
      default: ''
    },
    /**
     * 是否显示加载状态
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 气泡形状，圆形或方形
     */
    shape: {
      type: String,
      default: 'round',
      validator: (value) => ['round', 'corner'].includes(value)
    },
    /**
     * 气泡变体样式
     */
    variant: {
      type: String,
      default: 'filled',
      validator: (value) => ['filled', 'borderless', 'outlined', 'shadow'].includes(value)
    },
    /**
     * 是否为Markdown格式
     */
    isMarkdown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否启用打字效果
     */
    typing: {
      type: [Boolean, Object],
      default: false
    },
    /**
     * 是否启用雾化效果
     */
    isFog: {
      type: [Boolean, Object],
      default: false
    },
    /**
     * 最大宽度
     */
    maxWidth: {
      type: String,
      default: '500px'
    },
    /**
     * 头像大小
     */
    avatarSize: {
      type: String,
      default: ''
    },
    /**
     * 头像与气泡的间距
     */
    avatarGap: {
      type: String,
      default: '12px'
    },
    /**
     * 头像形状，圆形或方形
     */
    avatarShape: {
      type: String,
      default: 'circle',
      validator: (value) => ['circle', 'square'].includes(value)
    },
    /**
     * 头像图标
     */
    avatarIcon: {
      type: String,
      default: ''
    },
    /**
     * 头像srcset属性
     */
    avatarSrcSet: {
      type: String,
      default: ''
    },
    /**
     * 头像alt属性
     */
    avatarAlt: {
      type: String,
      default: ''
    },
    /**
     * 头像fit属性
     */
    avatarFit: {
      type: String,
      default: 'cover',
      validator: (value) => ['cover', 'contain', 'fill', 'none', 'scale-down'].includes(value)
    },
    /**
     * 是否无样式
     */
    noStyle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      internalDestroyed: false, // 内部销毁状态
      isTypingClass: false, // 跟踪打字状态
      dots: [1, 2, 3] // 定义三个点-加载中样式
    };
  },
  computed: {
    // 计算打字速度的步长
    _step() {
      if (typeof this.typing === 'object' && this.typing.step)
        return this.typing.step;
      else
        return 2;
    },
    // 计算打字效果的后缀
    _suffix() {
      if (typeof this.typing === 'object' && this.typing.suffix)
        return this.typing.suffix;
      else
        return '|';
    },
    // 计算打字效果的间隔
    _interval() {
      if (typeof this.typing === 'object' && this.typing.interval)
        return this.typing.interval;
      else
        return 50;
    },
    // 计算最终的打字配置
    _typing() {
      if (typeof this.typing === 'undefined') {
        return false;
      } else if (typeof this.typing === 'boolean') {
        return this.typing;
      } else {
        return {
          suffix: this._suffix,
          step: this._step,
          interval: this._interval,
        };
      }
    },
    // 暴露给父组件的实例方法和属性
    instance() {
      return {
        interrupt: this.interrupt,
        continue: this.continueTyping,
        restart: this.restart,
        destroy: this.destroy,
        // 渲染的内容
        renderedContent: this.$refs.typewriterRef ? this.$refs.typewriterRef.renderedContent : '',
        // 是否正在打字
        isTyping: this.$refs.typewriterRef ? this.$refs.typewriterRef.isTyping : false,
        // 打字进度
        progress: this.$refs.typewriterRef ? this.$refs.typewriterRef.progress : 0,
      };
    }
  },
  watch: {
    // 监听内容变化自动重置打字效果
    content(newVal, oldVal) {
      if (newVal !== oldVal && this.internalDestroyed) {
        this.restart();
      }
    }
  },
  methods: {
    // 打字开始事件处理
    onStart(instance) {
      this.$emit('start', instance);
    },
    // 打字完成事件处理
    onFinish(instance) {
      this.isTypingClass = false;
      this.$emit('finish', instance);
    },
    // 打字中事件处理
    onWriting(instance) {
      this.isTypingClass = true;
      this.$emit('writing', instance);
    },
    // 头像加载错误事件处理
    avatarError(e) {
      this.$emit('avatarError', e);
    },
    // 中断打字
    interrupt() {
      this.$refs.typewriterRef?.interrupt();
    },
    // 继续打字
    continueTyping() {
      this.$refs.typewriterRef?.continue();
    },
    // 重启打字
    restart() {
      this.internalDestroyed = false;
      this.$refs.typewriterRef?.restart();
    },
    // 销毁打字实例
    destroy() {
      this.$refs.typewriterRef?.destroy();
      this.internalDestroyed = true;
    }
  },
  mounted() {
    // 在组件挂载后暴露实例方法
    // Vue 2 没有 defineExpose，通常通过父组件传递 ref 或使用事件总线
    // 这里为了模拟，将 instance 赋值给组件实例，可以通过 $refs 访问
    // this.$refs.bubbleRef = this.instance; // 如果父组件使用 ref="bubbleRef"
  },
  beforeDestroy() {
    // 组件销毁前调用 destroy 方法
    this.destroy();
  }
};
</script>

<template>
  <div
    v-if="!internalDestroyed" class="el-bubble" :class="{
      'el-bubble-start': placement === 'start',
      'el-bubble-end': placement === 'end',
      'el-bubble-no-style': noStyle,
      'el-bubble-is-typing': isTypingClass, // 新增动态类名
    }" :style="{
      '--el-box-shadow-tertiary': `0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)`,
      '--bubble-content-max-width': `${maxWidth}`,
      '--el-bubble-avatar-placeholder-width': `${$slots.avatar ? '' : avatarSize}`,
      '--el-bubble-avatar-placeholder-height': `${$slots.avatar ? '' : avatarSize}`,
      '--el-bubble-avatar-placeholder-gap': `${avatarGap}`,
    }"
  >
    <!-- 头像 -->
    <div v-if="!$slots.avatar && avatar" class="el-bubble-avatar el-bubble-avatar-size">
      <el-avatar
        :size="0" :src="avatar" :shape="avatarShape" :icon="avatarIcon" :src-set="avatarSrcSet"
        :alt="avatarFit" @error="avatarError"
      />
    </div>

    <!-- 头像属性进行占位 -->
    <div v-if="!$slots.avatar && !avatar && avatarSize" class="el-bubble-avatar-placeholder" />

    <div v-if="$slots.avatar" class="el-bubble-avatar">
      <slot name="avatar" />
    </div>

    <!-- 内容 -->
    <div class="el-bubble-content-wrapper">
      <!-- 头部内容 -->
      <div v-if="$slots.header" class="el-bubble-header">
        <slot name="header" />
      </div>

      <div
        class="el-bubble-content" :class="{
          'el-bubble-content-loading': loading,
          'el-bubble-content-round': shape === 'round',
          'el-bubble-content-corner': shape === 'corner',
          'el-bubble-content-filled': variant === 'filled',
          'el-bubble-content-borderless': variant === 'borderless',
          'el-bubble-content-outlined': variant === 'outlined',
          'el-bubble-content-shadow': variant === 'shadow',
        }"
      >
        <div
          v-if="!loading" class="el-typewriter" :class="{
            'no-content': !content,
          }"
        >
          <A3Typewriter
            v-if="!$slots.content && content" ref="typewriterRef"
            :typing="_typing"
            :content="content"
            :is-markdown="isMarkdown"
            :is-fog="isFog"
            @start="onStart"
            @writing="onWriting"
            @finish="onFinish"
          />
        </div>

        <!-- 内容-自定义 -->
        <slot v-if="!internalDestroyed && $slots.content && !loading" name="content" />

        <!-- 加载中-默认 -->
        <div v-if="loading && !$slots.loading" class="el-bubble-loading-wrap">
          <div v-for="(_, index) in dots" :key="index" class="dot" :style="{ animationDelay: `${index * 0.2}s` }" />
        </div>

        <!-- 加载中-自定义 -->
        <div v-if="loading && $slots.loading" class="el-bubble-loading-wrap">
          <slot name="loading" />
        </div>
      </div>

      <div v-if="$slots.footer" class="el-bubble-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-bubble {
  display: flex;
  gap: var(--el-bubble-avatar-placeholder-gap);
}

.el-bubble-avatar-size {
  :deep(.el-avatar) {
    width: var(--el-bubble-avatar-placeholder-width);
    height: var(--el-bubble-avatar-placeholder-height);
  }
}

.el-bubble-avatar-placeholder {
  width: var(--el-bubble-avatar-placeholder-width);
  height: var(--el-bubble-avatar-placeholder-height);
}

.el-bubble-start {
  .el-bubble-content-wrapper {
    .el-bubble-content-corner {
      border-start-start-radius: calc(var(--el-border-radius-base) - 2px);
    }
  }
}

.el-bubble-end {
  justify-content: end;
  flex-direction: row-reverse;

  .el-bubble-content-wrapper {
    align-items: flex-end;

    .el-bubble-content-corner {
      border-start-end-radius: calc(var(--el-border-radius-base) - 2px);
    }
  }
}

.el-bubble-no-style {
  .el-bubble-content-wrapper {
    .el-bubble-content {
      background-color: transparent;
      padding: 0;
    }
  }
}

.el-bubble-content-wrapper {
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  max-width: 100%;

  .el-bubble-header,
  .el-bubble-content,
  .el-bubble-footer {
    font-size: var(--el-font-size-base);
    color: var(--el-text-color-primary);
    line-height: var(--el-font-line-height-primary);
  }

  // .el-bubble-header {
  //   margin-bottom: var();
  // }

  .el-bubble-content {
    background-color: var(--el-fill-color);
    padding: var(--el-padding-sm, 12px) calc(var(--el-padding-sm, 12px) + 4px);
    border-radius: calc(var(--el-border-radius-base) + 4px);
    position: relative;
    box-sizing: border-box;
    min-width: 0;
    max-width: var(--bubble-content-max-width);
    color: var(--el-text-color-primary);
    font-size: var(--el-font-size-base);
    line-height: var(--el-font-line-height-primary);
    min-height: calc(var(--el-padding-sm, 12px) * 2 + var(--el-font-line-height-primary) * var(--el-font-size-base));
    word-break: break-word;

    // 打字器没有内容时候展示高度
    .no-content {
      // height: 16px;
      height: 0;
    }
  }

  // 气泡圆角
  .el-bubble-content-round {
    border-radius: var(--el-border-radius-round);
  }

  // 气泡样式
  .el-bubble-content-filled {
    background-color: var(--el-fill-color);
  }

  .el-bubble-content-borderless {
    background-color: var(--el-fill-color);
    border: var(--el-border-width) solid var(--el-border-color);
  }

  .el-bubble-content-outlined {
    background: none;
    border: var(--el-border-width) solid var(--el-border-color);
  }

  .el-bubble-content-shadow {
    background: none;
    // box-shadow: var(--el-box-shadow-tertiary);
    box-shadow: var(--el-box-shadow);
  }

  .el-bubble-content-loading {
    width: fit-content;

    .el-bubble-loading-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      // height: 16px;
      /* 盒子高度 */
      gap: 5px;
    }

    .dot {
      width: 5px;
      height: 5px;
      background-color: var(--el-color-primary);
      /* 点的颜色 */
      border-radius: 50%;
      /* 圆形 */
      animation: wave 1s infinite ease-in-out;
      /* 动画 */
    }

    /* 波浪动画 */
    @keyframes wave {

      0%,
      100% {
        transform: translateY(-2px);
      }

      50% {
        transform: translateY(2px);
        /* 上下波动 */
      }
    }
  }

  .el-bubble-footer {
    margin-top: var(--el-padding-sm, 12px);
  }
}
</style>