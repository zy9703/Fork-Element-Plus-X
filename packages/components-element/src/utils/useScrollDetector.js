export default function useScrollDetector(elementRef) {
  return {
    data() {
      return {
        hasVertical: false, // 是否有纵向滚动条
        hasHorizontal: false, // 是否有横向滚动条
        observer: null,
      }
    },
    methods: {
      /**
       * 检查元素是否有滚动条
       */
      check() {
        const el = elementRef
        if (!el) return
        this.hasVertical = el.scrollHeight > el.clientHeight
        this.hasHorizontal = el.scrollWidth > el.clientWidth
      },
    },
    // watch: {
    //   elementRef: {
    //     immediate: true,
    //     handler(newEl, oldEl) {
    //       if (this.resizeObserver) {
    //         if (oldEl) {
    //           this.resizeObserver.unobserve(oldEl)
    //         }
    //         if (newEl) {
    //           this.resizeObserver.observe(newEl)
    //           this.check() // 调用 check 方法
    //         }
    //       }
    //     },
    //   },
    // },
    mounted() {
      this.check()
      this.observer = new ResizeObserver(this.check())
      this.observer.observe(elementRef)
      // // 使用ResizeObserver API监控元素大小变化
      // if (typeof ResizeObserver !== 'undefined') {
      //   this.resizeObserver = new ResizeObserver(() => {
      //     this.check() // 调用 check 方法
      //   })

      //   if (elementRef) {
      //     this.resizeObserver.observe(elementRef)
      //     this.check() // 调用 check 方法
      //   }
      // } else {
      //   // 降级方案：使用window resize事件
      //   const handleResize = () => {
      //     this.check() // 调用 check 方法
      //   }
      //   window.addEventListener('resize', handleResize)

      //   // 在 beforeDestroy 中移除事件监听器
      //   this.$once('hook:beforeDestroy', () => {
      //     window.removeEventListener('resize', handleResize)
      //   })

      //   if (elementRef) {
      //     this.check() // 调用 check 方法
      //   }
      // }
    },
    beforeDestroy() {
      this.observer.disconnect()
      // if (this.resizeObserver && elementRef) {
      //   this.resizeObserver.unobserve(elementRef)
      //   this.resizeObserver.disconnect()
      // }
    }
  }
}