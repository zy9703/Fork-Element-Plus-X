<script>
export default {
  name: 'A3Thinking',
  props: {
    /** 初始展开状态 */
    value: {
      type: Boolean,
      default: true
    },
    /** 思维链内容（字符串格式） */
    content: {
      type: String,
      default: ''
    },
    /** 当前状态 */
    status: {
      type: String,
      default: 'start',
      validator: function(value) {
        return ['start', 'thinking', 'end', 'error'].indexOf(value) !== -1
      }
    },
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 自动收起 */
    autoCollapse: {
      type: Boolean,
      default: false
    },
    /** 动画时长 */
    duration: {
      type: String,
      default: '0.2s'
    },
    /** 展开收起按钮宽度 */
    buttonWidth: {
      type: String,
      default: '160px'
    },
    /** 展开内容最大宽度 */
    maxWidth: {
      type: String,
      default: '500px'
    },
    /** 展示内容的背景色 */
    backgroundColor: {
      type: String,
      default: '#fcfcfc'
    },
    /** 展开内容字体颜色 */
    color: {
      type: String,
      default: 'var(--el-color-info)'
    }
  },
  data() {
    return {
      isExpanded: this.value
    }
  },
  computed: {
    // 显示内容（带错误状态处理）
    displayedContent() {
      return this.status === 'error'
        ? '思考过程中出现错误'
        : this.content
    }
  },
  watch: {
    // 监听 value 变化
    value(newVal) {
      this.isExpanded = newVal
    },
    // 自动收起逻辑
    status(newVal) {
      if (newVal === 'end' && this.autoCollapse) {
        this.isExpanded = false
      }
    }
  },
  methods: {
    // 处理展开/收起
    changeExpand() {
      if (this.disabled) return
      
      this.isExpanded = !this.isExpanded
      this.$emit('change', { value: this.isExpanded, status: this.status })
      this.$emit('update:expanded', this.isExpanded)
    }
  }
}
</script>

<template>
  <div
    class="el-thinking" :style="{
      '--el-thinking-button-width': buttonWidth,
      '--el-thinking-animation-duration': duration,
      '--el-thinking-content-wrapper-width': maxWidth,
      '--el-thinking-content-wrapper-background-color': backgroundColor,
      '--el-thinking-content-wrapper-color': color,
    }"
  >
    <!-- 触发按钮 -->
    <button
      class="trigger"
      :class="[status, { disabled: !disabled }]"
      :disabled="disabled"
      @click="changeExpand"
    >
      <span class="status-icon">
        <slot name="status-icon" :status="status">
          <i
            v-if="status === 'thinking'"
            class="el-icon-loading is-loading el-icon-center"
          ></i>

          <i v-if="status === 'start'" class="el-icon-opportunity el-icon-center start-color"></i>

          <i v-if="status === 'end'" class="el-icon-success el-icon-center end-color"></i>

          <i v-if="status === 'error'" class="el-icon-circle-close el-icon-center error-color"></i>
        </slot>
      </span>

      <span class="label">
        <slot name="label" :status="status">
          {{
            status === 'thinking' ? '思考中...'
            : status === 'error' ? '思考遇到问题'
              : status === 'end' ? '思考完成' : '开始思考'
          }}
        </slot>
      </span>

      <transition name="rotate">
        <span v-if="!disabled" class="arrow el-icon-center" :class="{ expanded: isExpanded }">
          <slot name="arrow">
            <i class="el-icon-arrow-up el-icon-center"></i>
          </slot>
        </span>
      </transition>
    </button>

    <!-- 内容区域 -->
    <transition name="slide">
      <div
        v-show="isExpanded"
        v-if="displayedContent"
        class="content-wrapper"
        :class="{ 'error-state': status === 'error' }"
      >
        <div class="content">
          <slot v-if="status !== 'error'" name="content" :content="displayedContent">
            <pre>{{ displayedContent }}</pre>
          </slot>

          <slot v-else name="error" :error-content="displayedContent">
            <div class="error-message">
              {{ displayedContent }}
            </div>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.el-thinking {
  font-family: system-ui, sans-serif;
  margin: 0 auto;
}

.trigger {
  display: flex;
  align-items: center;
  height: 100%;
  width: var(--el-thinking-button-width);
  gap: 8px;
  padding: var(--el-padding-sm, 12px) calc(var(--el-padding-sm, 12px) + 4px);
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  margin-bottom: 8px;

  /* 居中 */
  .el-icon-center {
    height: 100%;
    display: flex;
    align-items: center;
  }

  /* 开始颜色 */
  .start-color {
    color: var(--el-color-warning);
  }

  /* 完成颜色 */
  .end-color {
    color: var(--el-color-success);
  }

  /* 思考中颜色 */
  .is-loading {
    color: var(--el-color-primary);
  }

  /* 思考失败颜色 */
  .error-color {
    color: var(--el-color-danger);
  }
}

.trigger:hover {
  background: #f8f8f8;
}

.trigger.disabled {
  cursor: pointer;
}

.trigger:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.status-icon {
  font-size: 1.2em;
}

.arrow {
  margin-left: auto;
  transition: transform var(--el-thinking-animation-duration);
}

.arrow.expanded {
  transform: rotate(180deg);
}

/* 滑动动画 */
.slide-enter-active,
.slide-leave-active {
  transition:
    height var(--el-thinking-animation-duration) ease-in-out,
    opacity var(--el-thinking-animation-duration) ease-in-out;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  height: 0 !important;
  opacity: 0;
}

/* 内容区域样式 */
.content-wrapper {
  box-sizing: border-box;
  min-width: 0;
}

.content pre {
  border: 1px solid #eee;
  background: var(--el-thinking-content-wrapper-background-color);
  padding: var(--el-padding-sm, 12px) calc(var(--el-padding-sm, 12px) + 4px);
  border-radius: calc(var(--el-border-radius-base) + 4px);
  max-width: var(--el-thinking-content-wrapper-width);
  font-size: 14px;
  color: var(--el-thinking-content-wrapper-color);
  white-space: pre-wrap;
  font-family: DeepSeek-CJK-patch,Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,Oxygen,Open Sans,sans-serif;
  margin: 0;
  line-height: var(--el-font-line-height-primary);
}

.error-state {
  border-color: #ffd0d0;
  background: #fff0f0;
}

.error-message {
  color: #dc3545;
  height: fit-content;
  padding: 8px;
  background: #ffeef0;
  border-radius: 4px;
}
</style>