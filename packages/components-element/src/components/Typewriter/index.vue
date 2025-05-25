<script>
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import 'github-markdown-css';
import { usePrism } from '../../hooks/usePrism'

export default {
  name: 'A3Typewriter',
  props: {
    /**
     * 要显示的内容
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * 是否为Markdown格式
     */
    isMarkdown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否启用打字效果或打字配置
     */
    typing: {
      type: [Boolean, Object],
      default: false
    },
    /**
     * 是否启用雾化效果或雾化配置
     */
    isFog: {
      type: [Boolean, Object],
      default: false
    },
    /**
     * 代码高亮函数
     */
    highlight: {
      type: Function,
      default: null
    },
    /**
     * Markdown插件数组
     */
    mdPlugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      typingIndex: 0,
      isTyping: false,
      timer: null,
      contentCache: '', // 添加缓存变量
      md: null,
      // defaultHighlight: null // Vue 3 中的 usePrism 钩子在 Vue 2 中需要重新实现或替换
    };
  },
  computed: {
    /**
     * 代码高亮函数
     */
    _highlight() {
      // TODO: APPconfig
      return this.highlight === null ? usePrism() : this.highlight;
    },
    /**
     * 打字配置
     */
    mergedConfig() {
      const defaultConfig = {
        step: typeof this.typing === 'object' ? this.typing.step ?? 2 : 2,
        interval: typeof this.typing === 'object' ? this.typing.interval ?? 50 : 50,
        // 根据条件动态设置后缀
        suffix: this.isMarkdown ? '' : typeof this.typing === 'object' ? this.typing.suffix ?? '|' : '|',
      };

      // 处理打字配置
      if (this.typing === true) {
        return {
          ...defaultConfig,
        };
      }

      if (typeof this.typing === 'object') {
        return {
          ...defaultConfig,
          ...this.typing,
          // 强制覆盖后缀设置
          suffix: this.isMarkdown ? '' : this.typing.suffix ?? '|',
        };
      }

      return defaultConfig;
    },
    /**
     * 处理后的内容 (打字效果)
     */
    processedContent() {
      if (!this.content)
        return '';

      // 非打字模式直接渲染完整内容
      if (!this.typing) {
        return this.content;
      }

      // 打字模式处理截断内容
      const displayed = this.contentCache.slice(0, this.typingIndex);
      return displayed;
    },
    /**
     * 打字进度百分比
     */
    typingProgress() {
      return this.contentCache
        ? Math.min((this.typingIndex / this.contentCache.length) * 100, 100)
        : 0;
    },
    /**
     * 最终渲染内容 (Markdown处理和安全过滤)
     */
    renderedContent() {
      // 非Markdown模式直接返回
      if (!this.isMarkdown) {
        return this.processedContent;
      }
      // Markdown模式添加安全过滤和样式类
      // 注意：Vue 2 中 DOMPurify.sanitize 可能需要手动引入和使用
      if (this.md) {
         return DOMPurify.sanitize(
          this.md.render(this.processedContent)
        );
      } else {
        return DOMPurify.sanitize(this.processedContent);
      }
    },
     /**
     * 雾化配置 (Vue 2 兼容实现)
     */
    fogConfig() {
      const defaultConfig = {
        color: 'currentColor',
        opacity: 0.5
      };

      if (typeof this.isFog === 'object') {
        return { ...defaultConfig, ...this.isFog };
      }

      return defaultConfig;
    }
  },
  watch: {
    content: {
      handler(newVal, oldVal) {
        if (!this.typing) {
          this.typingIndex = newVal?.length || 0; // 注意可选链在原生Vue 2中可能不支持
          this.isTyping = false;
          this.contentCache = newVal || '';
          return;
        }

        const shouldReset = !oldVal || !newVal?.startsWith(oldVal); // 注意可选链

        if (shouldReset) {
          this.typingIndex = 0;
          this.contentCache = newVal || '';
        }
        else {
          this.contentCache = newVal || '';
        }

        if (!this.isTyping) {
          this.startTyping();
        }
      },
      immediate: true
    },
    // isMarkdown() {
    //   // 在 Vue 2 中，isMarkdown 变化时 watch content 会触发 renderContent
    //   // this.renderContent();
    // }
  },
  mounted() {
    this.initMarkdown();
    // this.initHighlight(); // 高亮初始化已移至 computed
    // this.renderContent(); // content watch 会触发 renderContent

    // 初始化雾化背景色
    this.$nextTick(() => {
       this.updateFogColor();
    });

    // 监听DOM变化，更新雾化颜色 (Vue 2 兼容实现)
    // Vue 3 中的 onMounted 钩子在 Vue 2 中对应 mounted
    // Vue 3 中的 nextTick 在 Vue 2 中对应 this.$nextTick
    // Vue 3 中的 ref 在 Vue 2 中通过 this.$refs 访问
    // Vue 3 中的 watch 在 Vue 2 中通过 watch 选项
    // Vue 3 中的 computed 在 Vue 2 中通过 computed 选项
    // Vue 3 中的 defineEmits 在 Vue 2 中通过 this.$emit
    // Vue 3 中的 defineExpose 在 Vue 2 中需要手动添加到 methods 或 data 并通过 $refs 访问

    // 监听DOM变化，更新雾化颜色 (Vue 2 兼容实现)
    // if (typeof window !== 'undefined' && window.MutationObserver) {
    //   this.observer = new MutationObserver(this.updateFogColor);
    //   // 需要找到合适的DOM元素进行监听，这里简化处理，可能需要根据实际DOM结构调整
    //   // this.observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    // }
  },
  beforeDestroy() {
    this.destroy();
    // if (this.observer) {
    //   this.observer.disconnect();
    //   this.observer = null;
    // }
  },
  methods: {
    /**
     * 初始化Markdown解析器
     */
    initMarkdown() {
      this.md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: (code, lang) => {
          return this._highlight?.(code, lang)
        },
      });

      // 初始化Markdown插件
      this.initMarkdownPlugins();
    },

    /**
     * 初始化Markdown插件
     */
    initMarkdownPlugins() {
      if (this.mdPlugins && this.mdPlugins.length) {
        this.mdPlugins.forEach(plugin => {
          this.md.use(plugin);
        });
      }
    },
    /**
     * 渲染内容 (已合并到 watch content)
     */
    // renderContent() {
    //   if (!this.originalContent) {
    //     this.renderedContent = '';
    //     return;
    //   }

    //   let content = this.originalContent;

    //   if (this.isMarkdown && this.md) {
    //     content = this.md.render(content);
    //   }

    //   // 安全过滤
    //   content = DOMPurify.sanitize(content);

    //   if (this.typing && !this.typingComplete) {
    //     this.startTyping(content);
    //   } else {
    //     this.renderedContent = content;
    //   }
    // },

    /**
     * 开始打字效果
     */
    startTyping() {
      clearTimeout(this.timer);
      if (!this.typing || !this.contentCache)
        return;

      this.isTyping = true;
      // 发出开始事件 (Vue 2 使用 $emit)
      this.$emit('start', {
         interrupt: this.interrupt,
         continue: this.continueTyping,
         restart: this.restart,
         destroy: this.destroy,
         renderedContent: this.renderedContent, // 注意这里是 computed 属性，传递当前值
         isTyping: this.isTyping, // 注意这里是 data 属性，传递当前值
         progress: this.typingProgress // 注意这里是 computed 属性，传递当前值
      });

      const typeNext = () => {
        this.typingIndex += this.mergedConfig.step;
        // 发出打字中事件
        this.$emit('writing', {
           interrupt: this.interrupt,
           continue: this.continueTyping,
           restart: this.restart,
           destroy: this.destroy,
           renderedContent: this.renderedContent, // 注意这里是 computed 属性，传递当前值
           isTyping: this.isTyping, // 注意这里是 data 属性，传递当前值
           progress: this.typingProgress // 注意这里是 computed 属性，传递当前值
        });

        if (this.typingIndex >= this.contentCache.length) {
          this.finishTyping();
          return;
        }

        this.timer = setTimeout(typeNext, this.mergedConfig.interval);
      };

      this.timer = setTimeout(typeNext, this.mergedConfig.interval);
    },

    /**
     * 完成打字效果
     */
    finishTyping() {
      this.isTyping = false;
      this.typingIndex = this.contentCache.length;
      // 发出完成事件
      this.$emit('finish', {
         interrupt: this.interrupt,
         continue: this.continueTyping,
         restart: this.restart,
         destroy: this.destroy,
         renderedContent: this.renderedContent, // 注意这里是 computed 属性，传递当前值
         isTyping: this.isTyping, // 注意这里是 data 属性，传递当前值
         progress: this.typingProgress // 注意这里是 computed 属性，传递当前值
      });
    },

    /**
     * 中断打字效果
     */
    interrupt() {
      clearTimeout(this.timer);
      this.isTyping = false;
    },

    /**
     * 继续打字效果
     */
    continueTyping() {
      if (this.typingIndex < this.contentCache.length) {
        this.startTyping();
      }
    },

    /**
     * 重新开始打字效果
     */
    restart() {
      this.typingIndex = 0;
      this.startTyping();
    },

    /**
     * 销毁打字效果
     */
    destroy() {
      clearTimeout(this.timer);
      this.timer = null;
      this.typingIndex = 0;
      this.isTyping = false;
    },

    /**
     * 辅助函数：获取元素背景色并检查是否透明 (Vue 2 兼容实现)
     */
    getBackgroundColor(element) {
      if (!element)
        return null;
      const color = window.getComputedStyle(element).backgroundColor;
      const isTransparent = color === 'rgba(0, 0, 0, 0)' || color === 'transparent' || color === 'initial';
      return isTransparent ? null : color;
    },

    /**
     * 更新雾化颜色 (Vue 2 兼容实现)
     */
    updateFogColor() {
      // 在 Vue 2 中，需要通过 $refs 访问 DOM 元素
      // 假设模板中给需要获取背景色的元素添加了 ref="markdownContentRef" 和 ref="typeWriterRef"
      const markdownContentEl = this.$refs.markdownContentRef;
      const typeWriterEl = this.$refs.typeWriterRef;

      if (markdownContentEl) {
        let bgColor = this.getBackgroundColor(markdownContentEl);
        if (!bgColor) {
          bgColor = this.getBackgroundColor(typeWriterEl);
          if (!bgColor) {
            // 尝试查找父级元素，这里简化处理，可能需要根据实际DOM结构调整选择器
            const bubbleContent = document.querySelector('.el-bubble-content');
            bgColor = this.getBackgroundColor(bubbleContent);
            if (!bgColor) {
              const bubble = document.querySelector('.el-bubble');
              bgColor = this.getBackgroundColor(bubble);
            }
          }
        }
        if (bgColor) {
          // 使用 style.setProperty 设置 CSS 变量
          markdownContentEl.style.setProperty('--el-fill-color', bgColor);
        }
      }

       // 如果 isFog 为对象，且 color 为 'currentColor'，则更新雾化颜色为文本颜色
       if (typeof this.isFog === 'object' && this.isFog.color === 'currentColor' && this.$el) {
         const computedStyle = window.getComputedStyle(this.$el);
         const textColor = computedStyle.color;
         this.$el.style.setProperty('--el-typewriter-fog-color', textColor);
       }
    }
  }
  // Vue 2 中没有 defineExpose，需要手动将方法添加到 methods 或 data 中，并通过 $refs 访问
  // 例如，可以在 methods 中定义 interrupt, continueTyping, restart, destroy 方法
  // 然后在父组件中通过 this.$refs.typewriterRef.interrupt() 调用
};
</script>

<template>
  <div ref="typeWriterRef" class="typer-container">
    <div
      ref="markdownContentRef" class="typer-content" :class="[
        {
          'markdown-content': isMarkdown,
          'typing-cursor': typing && mergedConfig.suffix && isTyping,
          'typing-cursor-foggy': isFog && typing && mergedConfig.suffix && isTyping,
          'typing-markdown-cursor-foggy': isMarkdown && isFog && typing && isTyping,
        },
        isMarkdown ? 'markdown-body' : '',
      ]" :style="{
        '--cursor-char': `'${mergedConfig.suffix}'`,
        '--cursor-fog-bg-color': isFog ? (typeof isFog === 'object' ? isFog.bgColor ?? 'var(--el-fill-color)' : 'var(--el-fill-color)') : '',
        '--cursor-fog-width': isFog ? (typeof isFog === 'object' ? isFog.width ?? '80px' : '80px') : '',
      }" v-html="renderedContent"
    />
  </div>
</template>

<style scoped lang="scss">
.typer-container{
  overflow-x: auto;
}
/* Markdown基础样式 */
.markdown-content :deep(ul) {
  list-style-type: disc;
}

// 新增 md 雾化效果
// 添加对 h1-h6, ol, ul 的特殊处理
.typing-markdown-cursor-foggy,
.typing-cursor-foggy {

  &.markdown-content :deep() h1,
  &.markdown-content :deep() h2,
  &.markdown-content :deep() h3,
  &.markdown-content :deep() h4,
  &.markdown-content :deep() h5,
  &.markdown-content :deep() h6,
  &.markdown-content :deep() p,
  &.markdown-content :deep() ol:last-child li,
  &.markdown-content :deep() ul:last-child li {
    position: relative;
    overflow: hidden;

    &:last-child:after {
      content: '';
      width: var(--cursor-fog-width);
      height: 1.5em;
      background: linear-gradient(90deg, transparent, var(--cursor-fog-bg-color));
      position: absolute;
      margin-left: calc(-1 * var(--cursor-fog-width));
    }
  }
}

/* 修改光标样式 */
.typer-content.typing-cursor::after {
  content: var(--cursor-char);
  margin-left: 2px;
  display: inline-block;
  /* 确保光标对齐 */
}

// 新增 雾化样式
.typer-content.typing-cursor-foggy {
  position: relative;
  overflow: hidden;

  &:last-child:after {
    content: '';
    width: var(--cursor-fog-width);
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--cursor-fog-bg-color));
    position: absolute;
    margin-left: calc(-1 * var(--cursor-fog-width));
  }
}

</style>