<template>
  <div
    ref="scrollContainer"
    class="el-bubble-list scroll-container"
    :style="{
      '--el-bubble-list-max-height': `${maxHeight}`,
    }"
    @scroll="handleScroll"
  >
    <a3-bubble
      v-for="(item, index) in list"
      :key="index"
      :content="item.content"
      :placement="item.placement"
      :loading="item.loading"
      :shape="item.shape"
      :variant="item.variant"
      :is-markdown="item.isMarkdown"
      :typing="item.typing"
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
      <template v-if="$scopedSlots.avatar" #avatar>
        <slot name="avatar" :item="item" />
      </template>
      <template v-if="$scopedSlots.header" #header>
        <slot name="header" :item="item" />
      </template>
      <template v-if="$scopedSlots.content" #content>
        <slot name="content" :item="item" />
      </template>
      <template v-if="$scopedSlots.footer" #footer>
        <slot name="footer" :item="item" />
      </template>
      <template v-if="$scopedSlots.loading" #loading>
        <slot name="loading" :item="item" />
      </template>
    </a3-bubble>
  </div>
</template>

<script>
import A3Bubble from '../Bubble/index.vue'

export default {
  name: 'A3BubbleList',
  components: {
    A3Bubble
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    maxHeight: {
      type: String,
      default: '500px'
    },
    triggerIndices: {
      type: [String, Array],
      default: 'only-last',
      validator: function(value) {
        if (typeof value === 'string') {
          return ['only-last', 'all'].includes(value)
        }
        return Array.isArray(value)
      }
    }
  },
  data() {
    return {
      // 滚动容器的引用
      scrollContainer: null,
      // 回复是否结束，只有回复结束，才会停止向底部滚动
      wasOver: false,
      // 上次滚动位置
      lastScrollTop: 0,
      // 累积向上滚动距离
      accumulatedScrollUpDistance: 0,
      // 阈值（像素）
      threshold: 15
    }
  },
  computed: {
    /* 计算有效的触发索引数组 */
    effectiveTriggerIndices() {
      if (this.triggerIndices === 'only-last') {
        // 定义一个 空数组，存储打字机属性的索引
        const triggerIndices = []
        if (this.list && this.list.length > 0) {
          for (let i = 0; i < this.list.length; i++) {
            const item = this.list[i]
            if (item.typing) {
              triggerIndices.push(i)
            }
          }
          return [triggerIndices[triggerIndices.length - 1]]
        }
        return []
      }
      else if (this.triggerIndices === 'all') {
        return this.list.map((_, index) => index)
      }
      else if (Array.isArray(this.triggerIndices)) {
        // 判断数组中的 index 是否在有效范围内
        const triggerIndices = []
        // 记录无效的索引
        const invalidIndices = []
        for (let i = 0; i < this.triggerIndices.length; i++) {
          const index = this.triggerIndices[i]
          if (index < 0 || index >= this.list.length) {
            invalidIndices.push(index)
          }
          // 判断索引是否在列表中开启了打字机效果
          else if (!this.list[index].typing) {
            invalidIndices.push(index)
          }
          // 保存有效的索引
          else if (index >= 0 && index < this.list.length && this.list[index].typing) {
            triggerIndices.push(index)
          }
        }
        if (invalidIndices && invalidIndices.length > 0) {
          console.warn(`无效索引 ${invalidIndices}`)
        }
        // 返回有效的索引
        if (triggerIndices && triggerIndices.length > 0) {
          return [triggerIndices[triggerIndices.length - 1]]
        }
        return []
      }
      return []
    }
  },
  watch: {
    // 监听数组长度变化，如果改变，则判断是否在最底部，如果在，就自动滚动到底部
    list: {
      handler() {
        if (this.list && this.list.length > 0) {
          const node = this.list[this.list.length - 1]
          if (node.typing) {
            this.scrollToBottomByTyping()
          }
          else {
            this.scrollToBottom()
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.scrollContainer = this.$refs.scrollContainer
  },
  methods: {
    // 父组件的触发方法，直接让滚动容器滚动到顶部
    scrollToTop() {
      // 处理在滚动时候，无法回到顶部的问题
      this.wasOver = true
      this.$nextTick(() => {
        // 自动滚动到最顶部
        if (this.scrollContainer) {
          this.scrollContainer.scrollTop = 0
        }
      })
    },
    // 父组件的触发方法，不跟随打字器滚动，滚动底部
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.scrollContainer) {
          this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight
        }
      })
    },
    // 父组件触发滚动到指定气泡框
    scrollToBubble(index) {
      const container = this.scrollContainer
      if (!container)
        return

      const bubbles = container.querySelectorAll('.el-bubble')
      if (index >= bubbles.length)
        return

      this.wasOver = true
      const targetBubble = bubbles[index]

      // 计算相对位置
      const containerRect = container.getBoundingClientRect()
      const bubbleRect = targetBubble.getBoundingClientRect()

      // 计算需要滚动的距离（元素顶部相对于容器顶部的位置 - 容器当前滚动位置）
      const scrollPosition = bubbleRect.top - containerRect.top + container.scrollTop

      // 使用容器自己的滚动方法
      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      })
    },
    // 父组件的触发方法，跟随打字器滚动，滚动底部
    scrollToBottomByTyping() {
      this.scrollToBottom()
      this.wasOver = false
      const self = this
      const scrollTimer = setInterval(() => {
        // 如果最后气泡不开启打字机效果，直接关闭定时器
        const item = self.list[self.list.length - 1]
        if (!item.typing) {
          clearInterval(scrollTimer)
          self.wasOver = true
          self.$nextTick(() => {
            if (self.scrollContainer) {
              self.scrollContainer.scrollTop = self.scrollContainer.scrollHeight
            }
          })
          return false
        }
        // 获取最后一个开启打字机效果的气泡的 dom
        const doms = document.querySelectorAll('.el-bubble')
        if (doms && doms.length > 0) {
          const endDom = doms[doms.length - 1]
          // 如果最后一个气泡包含 el-bubble-is-typing 类名，就说明还在打字中，如果不包括，则打字结束
          if (!endDom.classList.contains('el-bubble-is-typing')) {
            clearInterval(scrollTimer)
            self.wasOver = true
            return false
          }
        }
        else {
          // 没有打字机节点，但是还是传入了打字机属性
          clearInterval(scrollTimer)
          self.wasOver = true
          self.$nextTick(() => {
            if (self.scrollContainer) {
              self.scrollContainer.scrollTop = self.scrollContainer.scrollHeight
            }
          })
          return false
        }

        if (self.wasOver) {
          clearInterval(scrollTimer)
          return false
        }
        self.$nextTick(() => {
          if (self.scrollContainer) {
            self.scrollContainer.scrollTop = self.scrollContainer.scrollHeight
          }
        })
      }, 30)
    },
    // 打字机播放完成回调（终止自动向下滚动）
    handleBubbleComplete(index, instance) {
      if (this.effectiveTriggerIndices.includes(index)) {
        this.$emit('complete', instance, index)
      }
      if (index === this.list.length - 1) {
        this.wasOver = true
      }
    },
    // 监听用户滚动事件
    handleScroll() {
      if (this.scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = this.scrollContainer
        // 判断是否距离底部小于阈值 (这里吸附值大一些会体验更好)
        const isCloseToBottom = scrollTop + clientHeight >= scrollHeight - 30
        // 判断用户是否向上滚动
        const isScrollingUp = this.lastScrollTop > scrollTop
        // 判断用户是否向下滚动
        const isScrollingDown = this.lastScrollTop < scrollTop
        // 计算当前滚动距离的变化
        const scrollDelta = this.lastScrollTop - scrollTop
        // 更新上次滚动位置
        this.lastScrollTop = scrollTop
        
        // 处理向上滚动逻辑
        if (isScrollingUp) {
          // 累积向上滚动距离
          this.accumulatedScrollUpDistance += scrollDelta
          // 如果累积距离超过阈值，触发逻辑并重置累积距离
          if (this.accumulatedScrollUpDistance >= this.threshold) {
            // 如果打字器状态为 true，则停止滚动条的滚动，由用户控制
            if (!this.wasOver) {
              this.wasOver = true
            }
            // 重置累积距离
            this.accumulatedScrollUpDistance = 0
          }
        }
        else {
          // 如果用户停止向上滚动或开始向下滚动，重置累积距离
          this.accumulatedScrollUpDistance = 0
        }
        
        // 处理向下滚动且接近底部的逻辑
        if (isScrollingDown && isCloseToBottom) {
          if (this.wasOver) {
            // 如果已经终止自动滚动，并且打字机是否正在打字中，如果是则开启自动滚动
            this.scrollToBottomByTyping()
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.el-bubble-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  max-height: var(--el-bubble-list-max-height);
  overflow-y: auto;
  scroll-behavior: smooth;
}
</style> 