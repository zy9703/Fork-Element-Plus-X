<template>
  <div class="component-container">
    <div class="demo-section">
      <h2>基础用法</h2>
      <p class="demo-desc">最简单的使用方式，只需提供内容</p>
      <A3Typewriter content="content 属性设置 打字器内容" />
    </div>

    <div class="demo-section">
      <h2>支持 Markdown 内容渲染</h2>
      <p class="demo-desc">通过 isMarkdown 属性控制是否启用 Markdown 渲染模式</p>
      <A3Typewriter :content="markdownText" :is-markdown="true" />
    </div>

    <div class="demo-section">
      <h2>支持 开启/关闭 打字模式</h2>
      <p class="demo-desc">通过 typing 属性控制是否启用打字效果</p>
      
      <div style="margin-bottom: 15px;">
        <el-button style="width: fit-content;" @click="setContents('text')">
          重置文本
        </el-button>
        <el-button style="width: fit-content;" type="primary" @click="setContents('markdown')">
          重置 markdown
        </el-button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 20px;">
        <A3Typewriter :content="content" :typing="true" />
        <A3Typewriter :content="content1" :typing="{ step: 2, interval: 100, suffix: '💩' }" />
        <A3Typewriter :content="markdownTyping" :typing="true" :is-markdown="true" />
      </div>
    </div>

    <div class="demo-section">
      <h2>支持动态更新 content 内容</h2>
      <p class="demo-desc">当使用 typing 属性时，更新 content 如果是之前的子集，则会继续输出，否则会重新输出</p>
      
      <div style="margin-bottom: 15px;">
        <el-button style="width: fit-content;" @click="setContents('dynamic')">
          设置 content
        </el-button>
      </div>
      
      <A3Typewriter :typing="true" :content="dynamicContent" />
    </div>

    <div class="demo-section">
      <h2>支持控制组件播放、中断/继续、销毁</h2>
      <p class="demo-desc">支持监听组件状态</p>
      
      <div style="display: flex; gap: 10px; margin-bottom: 15px;">
        <el-button v-if="isTypingValue" type="warning" @click="onInterrupt">
          暂停
        </el-button>
        <el-button v-if="!isTypingValue && (progressValue !== 0 && progressValue !== 100)" type="success" @click="$refs.typerRef?.continueTyping()">
          继续
        </el-button>
        <el-button v-if="!isTypingValue && (progressValue === 0 || progressValue === 100)" type="primary" @click="$refs.typerRef?.restart()">
          重播
        </el-button>
        <el-button type="danger" @click="onDestroy">
          销毁
        </el-button>
      </div>

      <el-progress v-if="progressValue > 0 && progressValue < 100" :percentage="progressValue" />
      <el-progress v-if="progressValue === 100" :percentage="100" status="success" />

      <A3Typewriter 
        ref="typerRef"
        :content="controlContent"
        :typing="{ suffix: '💩', interval: 40 }"
        :is-markdown="true"
        @start="onStart"
        @writing="onWriting"
        @finish="onFinish"
      />
    </div>
  </div>
</template>

<script>
import A3Typewriter from './index.vue'

export default {
  name: 'TypewriterDemo',
  components: {
    A3Typewriter
  },
  data() {
    return {
      markdownText: '#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n ```javascript \n console.log(\'Hello, world!\'); \n ```',
      content: '',
      content1: '',
      markdownTyping: '',
      dynamicContent: '🥰 感谢使用 Element-Plus-X ! 你的支持，是我们开源的最强动力 ~ ',
      dynamicCount: 1,
      
      controlContent: '# 🔥 Typewriter 实例方法-事件 \n 😄 使你的打字器可高度定制化。\n - 更方便的控制打字器的状态 \n - 列表项 **粗体文本** 和 *斜体文本* \n ```javascript \n // 🙉 控制台可以查看相关打日志\n console.log(\'Hello, world!\'); \n ```',
      isTypingValue: false,
      progressValue: 0
    }
  },
  mounted() {
    // 初始化一些内容
    this.setContents('text')
  },
  methods: {
    setContents(type) {
      if (type === 'text') {
        this.content = ''
        this.content1 = ''
        setTimeout(() => {
          this.content = 'typing 属性开启打字效果'
          this.content1 = 'typing 属性也可以是对象，来控制打每次打字吐字、每次打字间隔、和打字器后缀'
        }, 300)
      }
      else if (type === 'markdown') {
        this.markdownTyping = ''
        setTimeout(() => {
          this.markdownTyping = ' ### 🐒 is-markdown 和 typing 结合使用 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n ```javascript \n console.log(\'Hello, world!\'); \n ``` '
        }, 300)
      }
      else if (type === 'dynamic') {
        this.dynamicCount++
        this.dynamicContent = '🥰 感谢使用 Element-Plus-X ! 你的支持，是我们开源的最强动力 ~ '.repeat(this.dynamicCount)
        if (this.dynamicCount > 3) {
          this.dynamicCount = 1
          this.dynamicContent = '🥰 感谢使用 Element-Plus-X ! 你的支持，是我们开源的最强动力 ~ '
        }
      }
    },
    
    // 实例方法相关
    onStart(instance) {
      console.log('开始打字：组件 ref 实例', instance)
      this.isTypingValue = true
    },
    onWriting(instance) {
      const progress = instance.progress.value
      // 避免打印太多次 onWriting 事件
      if (progress > 90 && progress < 100) {
        console.log('打字中 isTyping:', instance.isTyping.value, 'progress:', progress)
      }

      if (Math.floor(progress) === 80) {
        console.log('打字中 progress 为 80% 时候的内容', instance.renderedContent.value)
      }
      this.isTypingValue = true
      this.progressValue = Math.floor(progress) // 取整
    },
    onFinish(instance) {
      this.isTypingValue = false
      this.progressValue = 100
      console.log('打字结束 isTyping', instance.isTyping.value, 'progress:', instance.progress.value)
    },
    onInterrupt() {
      if (this.$refs.typerRef) {
        this.$refs.typerRef.interrupt()
        this.isTypingValue = false
      }
    },
    onDestroy() {
      if (this.$refs.typerRef) {
        this.$refs.typerRef.destroy()
        this.isTypingValue = false
        this.progressValue = 0
      }
    }
  }
}
</script>

<style scoped>
.component-container {
  width: 100%;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.demo-desc {
  margin-bottom: 15px;
  color: #606266;
  font-size: 14px;
}

h2 {
  margin-top: 0;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}
</style> 