<template>
  <div class="typer-container">
    <div
      class="typer-content"
      :class="[
        {
          'markdown-content': isMarkdown,
          'typing-cursor': typing && mergedConfig.suffix && isTyping,
        },
        isMarkdown ? 'markdown-body' : '',
      ]"
      :style="{ '--cursor-char': `'${mergedConfig.suffix}'` }"
      v-html="renderedContent"
    />
  </div>
</template>

<script>
import DOMPurify from 'dompurify' // 安全过滤
import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'
import 'github-markdown-css'
import 'prismjs/themes/prism.css'

export default {
  name: 'A3Typewriter',
  props: {
    content: {
      type: String,
      required: true
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
      typingIndex: 0,
      isTyping: false,
      timer: null,
      md: new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true,
        highlight: (code, language) => {
          try {
            if (Prism.languages[language]) {
              return Prism.highlight(code, Prism.languages[language], language)
            } else {
              return code // 返回原始代码，避免抛出异常
            }
          } catch (error) {
            console.error('Error during code highlighting:', error)
            return code // 返回原始代码，避免抛出异常
          }
        }
      })
    }
  },
  computed: {
    // 配置合并逻辑
    mergedConfig() {
      const defaultConfig = {
        step: typeof this.typing === 'object' ? this.typing.step ? this.typing.step : 2 : 2,
        interval: typeof this.typing === 'object' ? this.typing.interval ? this.typing.interval : 50 : 50,
        // 根据条件动态设置后缀
        suffix: this.isMarkdown ? '' : typeof this.typing === 'object' ? this.typing.suffix ? this.typing.suffix : '|' : '|'
      }

      // 处理打字配置
      if (this.typing === true) {
        return {
          ...defaultConfig
        }
      }

      if (typeof this.typing === 'object') {
        return {
          ...defaultConfig,
          ...this.typing,
          // 强制覆盖后缀设置
          suffix: this.isMarkdown ? '' : this.typing.suffix
        }
      }

      return defaultConfig
    },
    // 处理内容
    processedContent() {
      if (!this.content) {
        return ''
      }

      // 非打字模式直接渲染完整内容
      if (!this.typing) {
        return this.content
      }

      // 打字模式处理截断内容
      const displayed = this.content.slice(0, this.typingIndex)
      return displayed
    },
    // 计算进度
    typingProgress() {
      return this.content
        ? Math.min((this.typingIndex / this.content.length) * 100, 100)
        : 0
    },
    // 渲染内容
    renderedContent() {
      // 非Markdown模式直接返回
      if (!this.isMarkdown) {
        return this.processedContent
      }

      // Markdown模式添加安全过滤和样式类
      return DOMPurify.sanitize(
        this.md.render(this.processedContent)
      )
    }
  },
  watch: {
    content: {
      handler(newVal, oldVal) {
        if (!this.typing) {
          this.typingIndex = newVal ? newVal.length : 0
          this.isTyping = false
          return
        }

        const shouldReset = !oldVal || !newVal || !newVal.startsWith(oldVal)
        if (shouldReset) {
          this.typingIndex = 0
        }

        this.$nextTick(() => this.startTyping())
      },
      immediate: true
    }
  },
  methods: {
    startTyping() {
      clearTimeout(this.timer)
      if (!this.typing || !this.content) {
        return
      }

      this.isTyping = true
      this.$emit('start', this.instance)

      const typeNext = () => {
        this.typingIndex += this.mergedConfig.step
        this.$emit('writing', this.instance)

        if (this.typingIndex >= this.content.length) {
          this.finishTyping()
          return
        }

        this.timer = setTimeout(typeNext, this.mergedConfig.interval)
      }

      this.timer = setTimeout(typeNext, this.mergedConfig.interval)
    },
    finishTyping() {
      this.isTyping = false
      this.typingIndex = this.content ? this.content.length : 0
      this.$emit('finish', this.instance)
    },
    // 公共方法
    interrupt() {
      clearTimeout(this.timer)
      this.isTyping = false
    },
    continueTyping() {
      if (this.typingIndex < (this.content ? this.content.length : 0)) {
        this.startTyping()
      }
    },
    restart() {
      this.typingIndex = 0
      this.startTyping()
    },
    destroy() {
      clearTimeout(this.timer)
      this.timer = null
      this.typingIndex = 0
      this.isTyping = false
    }
  },
  created() {
    // 创建实例对象
    const self = this;
    this.instance = {
      interrupt: this.interrupt,
      continue: this.continueTyping,
      restart: this.restart,
      destroy: this.destroy,
      get renderedContent() { return self.renderedContent },
      get isTyping() { return self.isTyping },
      get progress() { return self.typingProgress }
    }
  },
  beforeDestroy() {
    this.destroy()
  }
}
</script>

<style scoped>
/* 修改光标样式 */
.typer-content.typing-cursor::after {
  content: var(--cursor-char);
  animation: blink 1s step-end infinite;
  margin-left: 2px;
  display: inline-block; /* 确保光标对齐 */
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

/* Markdown基础样式 */
.markdown-content >>> ul { list-style-type: disc; }
</style> 