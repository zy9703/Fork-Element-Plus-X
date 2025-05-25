import { ref } from 'vue'

/**
 * @description A Vue 2 Options API mixin for monitoring the width of a DOM element, providing a reactive width value.
 * @description 一个用于监控 DOM 元素宽度的 Vue 2 Options API mixin，提供响应式宽度值。
 *
 * @mixin useElementWidthMixin
 * Monitors the width of a DOM element and provides a reactive width value in Vue 2.
 * 监控 DOM 元素的宽度并提供响应式宽度值。
 *
 * @property {Object} data - Reactive data properties.
 * @property {Object} data - 响应式数据属性。
 * @property {number} data.elementWidth - The width of the monitored element.
 * @property {number} data.elementWidth - 被监控元素的宽度。
 *
 * @property {Object} methods - Methods for the mixin.
 * @property {Object} methods - mixin 的方法。
 * @property {Function} methods.updateElementWidth - Updates the width of the element.
 * @property {Function} methods.updateElementWidth - 更新元素的宽度。
 *
 * @property {Object} watch - Watchers for reactive properties.
 * @property {Object} watch - 响应式属性的侦听器。
 * @property {Function} watch.elementRef - Watches the element reference to observe changes.
 * @property {Function} watch.elementRef - 侦听元素引用以观察变化。
 *
 * @property {Object} mounted - Lifecycle hook.
 * @property {Object} mounted - 生命周期钩子。
 * @property {Object} beforeDestroy - Lifecycle hook.
 * @property {Object} beforeDestroy - 生命周期钩子。
 *
 * @example
 * import useElementWidthMixin from './useElementWidthMixin';
 *
 * export default {
 *   mixins: [useElementWidthMixin],
 *   data() {
 *     return {
 *       elementRef: null // Replace with your element reference
 *     };
 *   },
 *   mounted() {
 *     // Assign your element reference here, e.g., this.$refs.myElement
 *     this.elementRef = this.$refs.myElement;
 *   }
 * }
 */
export default {
  data() {
    return {
      elementWidth: 0,
      resizeObserver: null,
      // elementRef will be provided by the component using this mixin
      elementRef: null,
    }
  },
  methods: {
    /**
     * 更新宽度值
     * @param {HTMLElement} el - DOM元素
     */
    updateElementWidth(el) {
      if (!el) return
      // 使用最新的浏览器 API 获取宽度，优先使用 borderBoxSize
      if (el.borderBoxSize?.[0]?.inlineSize) {
        this.elementWidth = el.borderBoxSize[0].inlineSize
      } else {
        // 兼容旧版本浏览器
        this.elementWidth = el.getBoundingClientRect().width
      }
    },
  },
  watch: {
    elementRef: {
      immediate: true,
      handler(newEl, oldEl) {
        if (this.resizeObserver) {
          if (oldEl) {
            this.resizeObserver.unobserve(oldEl)
          }
          if (newEl) {
            this.resizeObserver.observe(newEl)
            this.updateElementWidth(newEl)
          }
        }
      },
    },
  },
  mounted() {
    // 使用ResizeObserver API监控元素大小变化
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === this.elementRef) {
            this.updateElementWidth(this.elementRef)
          }
        }
      })

      if (this.elementRef) {
        this.resizeObserver.observe(this.elementRef)
        this.updateElementWidth(this.elementRef)
      }
    } else {
      // 降级方案：使用window resize事件
      const handleResize = () => {
        this.updateElementWidth(this.elementRef)
      }
      window.addEventListener('resize', handleResize)

      // 在 beforeDestroy 中移除事件监听器
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', handleResize)
      })

      if (this.elementRef) {
        this.updateElementWidth(this.elementRef)
      }
    }
  },
  beforeDestroy() {
    if (this.resizeObserver && this.elementRef) {
      this.resizeObserver.unobserve(this.elementRef)
      this.resizeObserver.disconnect()
    }
  },
}