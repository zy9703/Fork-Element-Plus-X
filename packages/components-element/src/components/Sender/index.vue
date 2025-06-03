<script>
import {
  ClearButton,
  LoadingButton,
  SendButton,
  SpeechButton,
  SpeechLoadingButton,
} from './components'

export default {
  name: 'A3Sender',
  components: {
    ClearButton,
    LoadingButton,
    SendButton,
    SpeechButton,
    SpeechLoadingButton,
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    showSubmit: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    submitText: {
      type: String,
      default: '发送'
    },
    submitType: {
      type: String,
      default: 'enter',
      validator: function(value) {
        return ['enter', 'shiftEnter'].indexOf(value) !== -1
      }
    },
    autoSize: {
      type: [Boolean, Object],
      default: function() {
        return {
          minRows: 1,
          maxRows: 6
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    allowSpeech: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: 'default',
      validator: function(value) {
        return ['default', 'updown'].indexOf(value) !== -1
      }
    },
    showUpdown: {
      type: Boolean,
      default: true
    },
    submitBtnDisabled: {
      type: Boolean,
      default: undefined
    },
    inputStyle: {
      type: Object,
      default: function() {
        return {}
      }
    },
    inputWidth: {
      type: String,
      default: '100%'
    },
    headerAnimationTimer: {
      type: Number,
      default: 300
    },
    triggerStrings: {
      type: Array,
      default: function() {
        return []
      }
    },
    triggerPopoverVisible: {
      type: Boolean,
      default: false
    },
    triggerPopoverWidth: {
      type: String,
      default: 'fit-content'
    },
    triggerPopoverLeft: {
      type: String,
      default: '0px'
    },
    triggerPopoverOffset: {
      type: Number,
      default: 8
    },
    triggerPopoverPlacement: {
      type: String,
      default: 'top-start'
    }
  },
  data() {
    return {
      isComposing: false,
      visiableHeader: false,
      speechLoading: false,
      recognition: null,
      triggerString: '',
      popoverVisible: this.triggerPopoverVisible
    }
  },
  computed: {
    internalValue: {
      get() {
        return this.value
      },
      set(val) {
        if (this.readOnly || this.disabled) { 
          return
        }
        this.$emit('input', val)
      }
    },
    // 计算提交按钮禁用状态
    isSubmitDisabled() {
      // 用户显式设置了 submitBtnDisabled 时优先使用
      if (typeof this.submitBtnDisabled === 'boolean') {
        return this.submitBtnDisabled
      }
      // 否则保持默认逻辑：无内容时禁用
      return !this.internalValue
    },
    // 判断是否存在 recordingChange 监听器
    hasOnRecordingChangeListener() {
      return this.$listeners && !!this.$listeners.recordingChange
    },
    // 判断是否存在 trigger 监听器
    hasOnTriggerListener() {
      return this.$listeners && !!this.$listeners.trigger
    }
  },
  watch: {
    internalValue(newVal, oldVal) {
      if (this.isComposing) return
      // 触发逻辑：当输入值等于数组中的任意一个指令字符时触发
      // 确保 oldVal 是字符串类型
      const triggerStrings = this.triggerStrings || [] // 如果为 undefined，就使用空数组
      const validOldVal = typeof oldVal === 'string' ? oldVal : ''
      const wasOldValTrigger = triggerStrings.includes(validOldVal)
      const isNewValTrigger = triggerStrings.includes(newVal)

      // 触发显示：从空变为触发字符
      if (oldVal === '' && isNewValTrigger) {
        this.triggerString = newVal
        if (this.hasOnTriggerListener) {
          this.$emit('trigger', {
            oldValue: oldVal, // 关闭时返回之前触发的字符
            newValue: newVal,
            triggerString: newVal,
            isOpen: true,
          })
          this.popoverVisible = true
        } else {
          this.popoverVisible = true
        }
      }
      // 关闭：从触发字符变为非触发字符
      else if (!isNewValTrigger && wasOldValTrigger) {
        if (this.hasOnTriggerListener) {
          this.$emit('trigger', {
            oldValue: oldVal, // 关闭时返回之前触发的字符
            newValue: newVal,
            triggerString: undefined,
            isOpen: false,
          })
          this.popoverVisible = false
        } else {
          this.popoverVisible = false
        }
      }
      // 触发显示：从非空且非触发字符变为触发字符
      else if (oldVal !== '' && isNewValTrigger && !wasOldValTrigger) {
        this.triggerString = newVal
        if (this.hasOnTriggerListener) {
          this.$emit('trigger', {
            oldValue: oldVal, // 关闭时返回之前触发的字符
            newValue: newVal,
            triggerString: newVal,
            isOpen: true,
          })
          this.popoverVisible = true
        } else {
          this.popoverVisible = true
        }
      }
    },
    triggerPopoverVisible(val) {
      this.popoverVisible = val
    },
    popoverVisible(val) {
      if (this.readOnly || this.disabled) return
      this.$emit('update:triggerPopoverVisible', val)
    }
  },
  methods: {
    /* 内容容器聚焦 开始 */
    onContentMouseDown(e) {
      // 点击容器后设置输入框的聚焦，会触发 &:focus-within 样式
      if (e.target !== this.$el.querySelector(`.el-textarea__inner`)) {
        e.preventDefault()
      }
      this.$refs.inputRef.focus()
    },
    /* 内容容器聚焦 结束 */

    /* 头部显示隐藏 开始 */
    openHeader() {
      if (!this.$slots.header) return false

      if (this.readOnly) return false

      this.visiableHeader = true
    },
    closeHeader() {
      if (!this.$slots.header) return
      if (this.readOnly) return
      this.visiableHeader = false
    },
    /* 头部显示隐藏 结束 */

    /* 使用浏览器自带的语音转文字功能 开始 */
    startRecognition() {
      if (this.readOnly) return // 直接返回，不执行后续逻辑
      if (this.hasOnRecordingChangeListener) {
        this.speechLoading = true
        this.$emit('recordingChange', true)
        return
      }
      if ('webkitSpeechRecognition' in window) {
        this.recognition = new window.webkitSpeechRecognition()
        this.recognition.continuous = true
        this.recognition.interimResults = true
        this.recognition.lang = 'zh-CN'
        this.recognition.onresult = (event) => {
          let results = ''
          for (let i = 0; i <= event.resultIndex; i++) {
            results += event.results[i][0].transcript
          }
          if (!this.readOnly) {
            this.internalValue = results
          }
        }
        this.recognition.onstart = () => {
          this.speechLoading = true
        }
        this.recognition.onend = () => {
          this.speechLoading = false
        }
        this.recognition.onerror = (event) => {
          console.error('语音识别出错:', event.error)
          this.speechLoading = false
        }
        this.recognition.start()
      }
      else {
        console.error('浏览器不支持 Web Speech API')
      }
    },
    stopRecognition() {
      // 如果有自定义处理函数
      if (this.hasOnRecordingChangeListener) {
        this.speechLoading = false
        this.$emit('recordingChange', false)
        return
      }
      if (this.recognition) {
        this.recognition.stop()
        this.speechLoading = false
      }
    },
    /* 使用浏览器自带的语音转文字功能 结束 */

    /* 输入框事件 开始 */
    submit() {
      if (this.readOnly || this.loading || this.disabled || this.isSubmitDisabled) return
      this.$emit('submit', this.internalValue)
    },
    // 取消按钮
    cancel() {
      if (this.readOnly) return
      this.$emit('cancel', this.internalValue)
    },
    clear() {
      if (this.readOnly) return // 直接返回，不执行后续逻辑
      this.internalValue = ''
    },
    // 在这判断组合键的回车键 (目前支持两种模式)
    handleKeyDown(e) {
      if (this.readOnly) return // 直接返回，不执行后续逻辑
      if (this.submitType === 'enter') {
        // 判断是否按下了 Shift + 回车键
        if (e.shiftKey && e.keyCode === 13) {
          e.preventDefault()
          const cursorPosition = e.target.selectionStart // 获取光标位置
          const textBeforeCursor = this.internalValue.slice(0, cursorPosition) // 光标前的文本
          const textAfterCursor = this.internalValue.slice(cursorPosition) // 光标后的文本
          this.internalValue = `${textBeforeCursor}\n${textAfterCursor}` // 插入换行符
          this.$nextTick(() => {
            e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1) // 更新光标位置
          })
        }
        else if (e.keyCode === 13 && !e.shiftKey) {
          // 阻止掉 Enter 的默认换行行为
          e.preventDefault()
          // 触发提交功能
          this.submit()
        }
      }
      else if (this.submitType === 'shiftEnter') {
        // 判断是否按下了 Shift + 回车键
        if (e.shiftKey && e.keyCode === 13) {
          // 阻止掉 Enter 的默认换行行为
          e.preventDefault()
          // 触发提交功能
          this.submit()
        }
        else if (e.keyCode === 13 && !e.shiftKey) {
          e.preventDefault()
          const cursorPosition = e.target.selectionStart // 获取光标位置
          const textBeforeCursor = this.internalValue.slice(0, cursorPosition) // 光标前的文本
          const textAfterCursor = this.internalValue.slice(cursorPosition) // 光标后的文本
          this.internalValue = `${textBeforeCursor}\n${textAfterCursor}` // 插入换行符
          this.$nextTick(() => {
            e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1) // 更新光标位置
          })
        }
      }
    },
    /* 输入框事件 结束 */

    /* 焦点 事件 开始 */
    blur() {
      if (this.readOnly) {
        return false
      }
      this.$refs.inputRef.blur()
    },
    focus(type = 'all') {
      if (this.readOnly) {
        return false
      }
      if (type === 'all') {
        this.$refs.inputRef.select()
      }
      else if (type === 'start') {
        this.focusToStart()
      }
      else if (type === 'end') {
        this.focusToEnd()
      }
    },
    // 聚焦到文本最前方
    focusToStart() {
      if (this.$refs.inputRef) {
        // 获取底层的 textarea DOM 元素
        const textarea = this.$refs.inputRef.$el.querySelector('textarea')
        if (textarea) {
          textarea.focus() // 聚焦到输入框
          textarea.setSelectionRange(0, 0) // 设置光标到最前方
        }
      }
    },
    // 聚焦到文本最后方
    focusToEnd() {
      if (this.$refs.inputRef) {
        // 获取底层的 textarea DOM 元素
        const textarea = this.$refs.inputRef.$el.querySelector('textarea')
        if (textarea) {
          textarea.focus() // 聚焦到输入框
          textarea.setSelectionRange(this.internalValue.length, this.internalValue.length) // 设置光标到最后方
        }
      }
    },
    /* 焦点 事件 结束 */

    // 处理输入法开始/结束 (此方法是拼音输入法的时候用)
    handleCompositionStart() {
      this.isComposing = true
    },
    handleCompositionEnd() {
      this.isComposing = false
    }
  }
}
</script>

<template>
  <div
    class="el-sender-wrap"
    :style="{
      'cursor': disabled ? 'not-allowed' : 'default',
      '--el-sender-trigger-popover-width': triggerPopoverWidth,
      '--el-sender-trigger-popover-left': triggerPopoverLeft,
    }"
  >
    <div
      ref="senderRef"
      class="el-sender"
      :style="{
        '--el-box-shadow-tertiary':
          '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        '--el-sender-input-input-font-size': '14px',
        '--el-sender-header-animation-duration': `${headerAnimationTimer}ms`,
      }"
      :class="{
        'el-sender-disabled': disabled,
      }"
    >
      <!-- 头部容器 -->
      <Transition name="slide">
        <div v-if="visiableHeader" class="el-sender-header-wrap">
          <div v-if="$slots.header" class="el-sender-header">
            <slot name="header" />
          </div>
        </div>
      </Transition>
      <!-- 内容容器 内置变体逻辑 -->
      <div
        class="el-sender-content"
        :class="{ 'content-variant-updown': variant === 'updown' }"
        @mousedown="onContentMouseDown"
      >
        <!-- Prefix 前缀 -->
        <div v-if="$slots.prefix && variant === 'default'" class="el-sender-prefix">
          <slot name="prefix" />
        </div>
        <!-- 输入框 -->
        <el-input
          ref="inputRef"
          v-model="internalValue"
          class="el-sender-input"
          :input-style="inputStyle || {
            'resize': 'none',
            'max-height': '176px',
            'max-width': inputWidth,
          }"
          :rows="1"
          :autosize="autoSize"
          type="textarea"
          :validate-event="false"
          :placeholder="placeholder"
          :read-only="readOnly || disabled"
          :disabled="disabled"
          @keydown.stop="handleKeyDown"
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
        />
        <!-- 操作列表 -->
        <div v-if="variant === 'default'" class="el-sender-action-list">
          <slot name="action-list">
            <div
              class="el-sender-action-list-presets"
            >
              <SendButton v-if="!loading" :disabled="isSubmitDisabled" @submit="submit" />

              <LoadingButton v-if="loading" @cancel="cancel" />

              <SpeechButton
                v-if="!speechLoading && allowSpeech"
                @click="startRecognition"
              />

              <SpeechLoadingButton
                v-if="speechLoading && allowSpeech"
                @click="stopRecognition"
              />

              <ClearButton v-if="clearable" @clear="clear" />
            </div>
          </slot>
        </div>

        <!-- 变体样式 -->
        <div v-if="variant === 'updown' && showUpdown" class="el-sender-updown-wrap">
          <!-- 变体 updown： Prefix 前缀 -->
          <div v-if="$slots.prefix" class="el-sender-prefix">
            <slot name="prefix" />
          </div>

          <!-- 变体 updown：操作列表 -->
          <div class="el-sender-action-list">
            <slot name="action-list">
              <div
                class="el-sender-action-list-presets"
              >
                <SendButton v-if="!loading" :disabled="isSubmitDisabled" @submit="submit" />

                <LoadingButton v-if="loading" @cancel="cancel" />

                <SpeechButton
                  v-if="!speechLoading && allowSpeech"
                  @click="startRecognition"
                />

                <SpeechLoadingButton
                  v-if="speechLoading && allowSpeech"
                  @click="stopRecognition"
                />

                <ClearButton v-if="clearable" @clear="clear" />
              </div>
            </slot>
          </div>
        </div>
      </div>

      <!-- 底部容器 -->
      <Transition name="slide">
        <div v-if="$slots.footer" class="el-sender-footer">
          <slot name="footer" />
        </div>
      </Transition>
    </div>

    <!-- 虚拟触发 popover -->
    <el-popover
      ref="popoverRef"
      :virtual-ref="senderRef"
      virtual-triggering
      :visible="popoverVisible"
      :disabled="disabled"
      :show-arrow="false"
      :placement="triggerPopoverPlacement"
      :offset="triggerPopoverOffset"
      popper-class="el-sender-trigger-popover"
      :teleported="false"
    >
      <slot name="trigger-popover" :trigger-string="triggerString" :readonly="readOnly">
        当前触发的字符为：{{ `${triggerString}` }} 在这里定义的内容，但注意这里的回车事件将会被 输入框 覆盖
      </slot>
    </el-popover>
  </div>
</template>

<style scoped lang="scss">
.el-sender {
  width: 100%;
  display: flex;
  flex-direction: column;

  position: relative;
  box-sizing: border-box;
  box-shadow: var(--el-box-shadow-tertiary);
  transition: background var(--el-transition-duration);
  border-radius: calc(var(--el-border-radius-base) * 2);
  border-color: var(--el-border-color);
  border-width: 0;
  border-style: solid;
  transition: width var(--el-sender-header-animation-duration);

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: border-color var(--el-transition-duration);
    border-radius: inherit;
    border-style: inherit;
    border-color: inherit;
    border-width: var(--el-border-width);
  }
  &:focus-within {
    box-shadow: var(--el-box-shadow);
    border-color: var(--el-color-primary);
    &::after {
      border-width: 2px;
    }
  }

  .el-sender-header-wrap {
    display: flex;
    flex-direction: column;
    gap: var(--el-padding-xs, 8px);
    width: 100%;
    margin: 0;
    padding: 0;
  }

  // 展开收起动画
  // calc-size 新特性，解决无法对某些非固定尺寸（如 auto、min-content、max-content 等）进行动画过渡的新特性
  .slide-enter-active,
  .slide-leave-active {
    height: calc-size(max-content, size);
    opacity: 1;
    transition:
      height var(--el-sender-header-animation-duration),
      opacity var(--el-sender-header-animation-duration),
      border var(--el-sender-header-animation-duration);
    overflow: hidden;
  }

  .slide-enter-from,
  .slide-leave-to {
    height: 0;
    opacity: 0 !important;
  }

  .el-sender-header {
    border-bottom-width: var(--el-border-width);
    border-bottom-style: solid;
    border-bottom-color: var(--el-border-color);
  }

  .el-sender-content {
    display: flex;
    gap: var(--el-padding-xs, 8px);
    width: 100%;
    padding-block: var(--el-padding-sm, 12px);
    padding-inline-start: var(--el-padding, 16px);
    padding-inline-end: var(--el-padding-sm, 12px);
    box-sizing: border-box;
    align-items: flex-end;
    // 前缀
    .el-sender-prefix {
      flex: none;
    }
    // 输入框
    .el-sender-input {
      height: 100%;
      display: flex;
      align-items: center;
      align-self: center;

      :deep(.el-textarea__inner) {
        padding: 0;
        margin: 0;
        color: var(--el-text-color-primary);
        font-size: var(--el-sender-input-input-font-size);
        line-height: var(--el-font-line-height-primary);
        list-style: none;
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        max-width: 100%;
        height: auto;
        min-height: auto !important;
        border-radius: 0;
        border: none;
        flex: auto;
        align-self: center;
        vertical-align: bottom;
        resize: none;
        background-color: transparent;
        transition:
          all var(--el-transition-duration),
          height 0s;
        box-shadow: none !important;
      }
    }
    // 操作列表
    .el-sender-action-list-presets {
      display: flex;
      gap: var(--el-padding-xs, 8px);
      flex-direction: row-reverse;
    }
  }

  // 变体样式 --variant
  .content-variant-updown {
    display: flex;
    flex-direction: column;
    align-items: initial;
    .el-sender-updown-wrap {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      // 前缀
      .el-sender-prefix {
        flex: initial;
      }

      .el-sender-action-list {
        margin-left: auto;
      }
    }
  }

  // 底部容器
  .el-sender-footer {
    border-top-width: var(--el-border-width);
    border-top-style: solid;
    border-top-color: var(--el-border-color);
  }
}

.el-sender-disabled {
  background-color: var(--el-fill-color);
  pointer-events: none;
}

:deep(.el-sender-trigger-popover) {
  width: var(--el-sender-trigger-popover-width) !important;
  max-width: calc(100% - 54px) !important;
  margin-left: var(--el-sender-trigger-popover-left) !important;
}
</style>