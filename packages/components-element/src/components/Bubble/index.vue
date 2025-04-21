<template>
  <div
    v-if="!internalDestroyed"
    class="el-bubble"
    :class="{
      'el-bubble-start': placement === 'start',
      'el-bubble-end': placement === 'end',
      'el-bubble-no-style': noStyle,
      'el-bubble-is-typing': isTypingClass
    }"
    :style="{
      '--el-padding-sm': '12px',
      '--el-padding-xxs': '4px',
      '--el-box-shadow-tertiary': `0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)`,
      '--bubble-content-max-width': `${maxWidth}`,
      '--el-bubble-avatar-placeholder-width': `${$slots.avatar ? '' : avatarSize}`,
      '--el-bubble-avatar-placeholder-height': `${$slots.avatar ? '' : avatarSize}`,
      '--el-bubble-avatar-placeholder-gap': `${avatarGap}`
    }"
  >
    <!-- 头像 -->
    <div v-if="!$slots.avatar && avatar" class="el-bubble-avatar">
      <el-avatar v-if="avatarSize" :size="Number(avatarSize)" :src="avatar" :shape="avatarShape" :icon="avatarIcon" :fit="avatarFit" @error="avatarError" />
      <el-avatar v-else :size="40" :src="avatar" :shape="avatarShape" :icon="avatarIcon" :fit="avatarFit" @error="avatarError" />
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
        class="el-bubble-content"
        :class="{
          'el-bubble-content-loading': loading,
          'el-bubble-content-round': shape === 'round',
          'el-bubble-content-corner': shape === 'corner',
          'el-bubble-content-filled': variant === 'filled',
          'el-bubble-content-borderless': variant === 'borderless',
          'el-bubble-content-outlined': variant === 'outlined',
          'el-bubble-content-shadow': variant === 'shadow'
        }"
      >
        <div
          v-if="!loading"
          class="el-typewriter"
          :class="{
            'no-content': !content
          }"
        >
          <typewriter
            v-if="!$slots.content && content"
            ref="typewriterRef"
            :typing="_typing"
            :content="content"
            :is-markdown="isMarkdown"
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

<script>
import Typewriter from '../Typewriter/index.vue'

export default {
  name: 'A3Bubble',
  components: {
    Typewriter: Typewriter
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'start',
      validator: function(value) {
        return ['start', 'end'].indexOf(value) !== -1
      }
    },
    variant: {
      type: String,
      default: 'filled',
      validator: function(value) {
        return ['filled', 'borderless', 'outlined', 'shadow'].indexOf(value) !== -1
      }
    },
    maxWidth: {
      type: String,
      default: '500px'
    },
    avatarSize: {
      type: String,
      default: ''
    },
    avatarGap: {
      type: String,
      default: '12px'
    },
    avatarShape: {
      type: String,
      default: 'circle',
      validator: function(value) {
        return ['circle', 'square'].indexOf(value) !== -1
      }
    },
    avatarIcon: {
      type: String,
      default: ''
    },
    avatarSrcSet: {
      type: String,
      default: ''
    },
    avatarAlt: {
      type: String,
      default: ''
    },
    avatarFit: {
      type: String,
      default: 'cover',
      validator: function(value) {
        return ['cover', 'contain', 'fill', 'none', 'scale-down'].indexOf(value) !== -1
      }
    },
    noStyle: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      default: null,
      validator: function(value) {
        return value === null || ['round', 'corner'].indexOf(value) !== -1
      }
    },
    isMarkdown: {
      type: Boolean,
      default: false
    },
    typing: {
      type: [Boolean, Object],
      default: false
    }
  },
  data() {
    return {
      internalDestroyed: false, // 内部销毁状态
      isTypingClass: false, // 响应式变量跟踪打字状态
      dots: [1, 2, 3], // 定义三个点-加载中样式
    }
  },
  computed: {
    _step() {
      if (typeof this.typing === 'object' && this.typing.step)
        return this.typing.step
      else
        return 2
    },
    _suffix() {
      if (typeof this.typing === 'object' && this.typing.suffix)
        return this.typing.suffix
      else
        return '|'
    },
    _interval() {
      if (typeof this.typing === 'object' && this.typing.interval)
        return this.typing.interval
      else
        return 50
    },
    _typing() {
      if (typeof this.typing === 'boolean') {
        return this.typing
      } else {
        return {
          suffix: this._suffix,
          step: this._step,
          interval: this._interval
        }
      }
    }
  },
  watch: {
    content: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal && this.internalDestroyed) {
          this.restart() // 内容变化时自动重置
        }
      }
    }
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    onStart(instance) {
      this.$emit('start', instance)
    },
    onFinish(instance) {
      this.isTypingClass = false
      this.$emit('finish', instance)
    },
    onWriting(instance) {
      this.isTypingClass = true
      this.$emit('writing', instance)
    },
    avatarError(e) {
      this.$emit('avatarError', e)
    },
    interrupt() {
      if (this.$refs.typewriterRef) {
        this.$refs.typewriterRef.interrupt()
      }
    },
    continueTyping() {
      if (this.$refs.typewriterRef) {
        this.$refs.typewriterRef.continueTyping()
      }
    },
    restart() {
      this.internalDestroyed = false
      if (this.$refs.typewriterRef) {
        this.$refs.typewriterRef.restart()
      }
    },
    destroy() {
      if (this.$refs.typewriterRef) {
        this.$refs.typewriterRef.destroy()
      }
      this.internalDestroyed = true
    }
  }
}
</script>

<style>
.el-bubble {
  display: flex;
  gap: 12px;
}

/* 调整适应元素UI的头像样式 */
.el-bubble .el-avatar {
  display: inline-block;
}

.el-bubble-avatar-placeholder {
  width: var(--el-bubble-avatar-placeholder-width);
  height: var(--el-bubble-avatar-placeholder-height);
}

.el-bubble-avatar {
  margin-right: 4px;
}

.el-bubble-end .el-bubble-avatar {
  margin-right: 0;
  margin-left: 4px;
}

.el-bubble-start .el-bubble-content-wrapper .el-bubble-content-corner {
  border-top-left-radius: calc(4px - 2px);
}

.el-bubble-end {
  justify-content: flex-end;
  flex-direction: row-reverse;
}

.el-bubble-end .el-bubble-content-wrapper {
  align-items: flex-end;
}

.el-bubble-end .el-bubble-content-wrapper .el-bubble-content-corner {
  border-top-right-radius: calc(4px - 2px);
}

.el-bubble-no-style .el-bubble-content-wrapper .el-bubble-content {
  background-color: transparent;
  padding: 0;
}

.el-bubble-content-wrapper {
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  max-width: 100%;
}

.el-bubble-content-wrapper .el-bubble-header,
.el-bubble-content-wrapper .el-bubble-content,
.el-bubble-content-wrapper .el-bubble-footer {
  font-size: 14px;
  color: #303133;
  line-height: 1.5;
}

.el-bubble-content-wrapper .el-bubble-header {
  margin-bottom: 4px;
}

.el-bubble-content-wrapper .el-bubble-content {
  background-color: #f5f7fa;
  padding: var(--el-padding-sm) calc(var(--el-padding-sm) + 4px);
  border-radius: calc(4px + 4px);
  position: relative;
  box-sizing: border-box;
  min-width: 0;
  max-width: var(--bubble-content-max-width);
  color: #303133;
  font-size: 14px;
  line-height: 1.5;
  min-height: calc(var(--el-padding-sm) * 2 + 1.5 * 14px);
  word-break: break-word;
}

.el-bubble-content-wrapper .el-bubble-content .no-content {
  height: 0;
}

.el-bubble-content-wrapper .el-bubble-content-round {
  border-radius: 20px;
}

.el-bubble-content-wrapper .el-bubble-content-filled {
  background-color: #f5f7fa;
}

.el-bubble-content-wrapper .el-bubble-content-borderless {
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
}

.el-bubble-content-wrapper .el-bubble-content-outlined {
  background: none;
  border: 1px solid #dcdfe6;
}

.el-bubble-content-wrapper .el-bubble-content-shadow {
  background: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-bubble-content-wrapper .el-bubble-content-loading .el-bubble-loading-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 0;
  width: 100%;
  height: 100%;
}

.el-bubble-content-wrapper .el-bubble-content-loading .dot {
  width: 5px;
  height: 5px;
  background-color: #409eff;
  border-radius: 50%;
  animation: wave 1s infinite ease-in-out;
}

@keyframes wave {
  0%, 100% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(2px);
  }
}

.el-bubble-content-wrapper .el-bubble-footer {
  margin-top: 4px;
}
</style> 