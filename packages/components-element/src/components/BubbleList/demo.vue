<template>
  <div class="component-container">
    <div class="top-wrap">
      <div class="control-panel">
        <h3>操作面板</h3>
        <div class="btn-list">
          <el-button type="primary" @click="addMessage">添加对话</el-button>
          <el-button type="success" @click="scrollToTop">滚动到顶部</el-button>
          <el-button type="warning" @click="scrollToBottom">滚动到底部</el-button>
          <div class="bubble-nav">
            <el-input-number v-model="selectedBubble" :min="0" :max="bubbleList.length - 1" size="small" />
            <el-button type="info" @click="scrollToBubble">滚动到指定气泡</el-button>
          </div>
        </div>
        <div class="switch-container" style="margin-top: 10px;">
          <span>显示切换内容：</span>
          <el-switch v-model="switchValue" @change="updateContent" />
          <span style="margin-left: 15px;">自定义加载状态：</span>
          <el-switch v-model="loading" @change="setLoading" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2>基础用法</h2>
      <p class="demo-desc">展示一组对话气泡并支持自动滚动</p>
      <div class="bubblelist-container">
        <a3-bubble-list 
          ref="bubbleListRef"
          :list="bubbleList"
          max-height="500px"
          @complete="onComplete"
        >
          <template #avatar="{ item }">
            <el-avatar 
              :size="40" 
              :src="item.role === 'ai' ? avatarAI : avatarUser" 
            />
          </template>
          
          <template #header="{ item }">
            <div class="custom-header">
              {{ item.role === 'ai' ? 'Element Plus X 🍧' : '🧁 用户' }}
              <span class="time">{{ getCurrentTime() }}</span>
            </div>
          </template>
          
          <template #footer="{ item }">
            <div v-if="item.role === 'ai'" class="custom-footer">
              <el-button type="text" size="mini" icon="el-icon-document-copy" @click="copyText(item.content)">复制</el-button>
              <el-button type="text" size="mini" icon="el-icon-refresh" @click="regenerateMessage(item)">重新生成</el-button>
            </div>
          </template>
          
          <template #loading="{ item }">
            <div v-if="!customLoading" style="padding: 10px 0;">
              {{ item.role === 'ai' ? 'AI 思考中...' : '用户输入中...' }}
            </div>
            <div v-else class="custom-loading-container">
              <span>#{{ item.role }}：</span>
              <span v-for="(char, index) in '我是自定义加载内容哦~'" :key="index" class="loading-char">
                {{ char }}
              </span>
            </div>
          </template>
        </a3-bubble-list>
      </div>
    </div>

    <div class="demo-section">
      <h2>自定义样式</h2>
      <p class="demo-desc">通过自定义气泡样式来创建个性化的对话列表</p>
      <div class="bubblelist-container">
        <a3-bubble-list 
          :list="customBubbleList"
          max-height="350px"
        >
          <template #avatar="{ item }">
            <div class="custom-avatar">
              <img :src="item.role === 'ai' ? avatarAI : avatarUser" alt="avatar">
            </div>
          </template>
          
          <template #content="{ item }">
            <div class="custom-content">
              {{ item.content }}
            </div>
          </template>
        </a3-bubble-list>
      </div>
    </div>
  </div>
</template>

<script>
import A3BubbleList from './index.vue'

export default {
  name: 'BubbleListDemo',
  components: {
    A3BubbleList
  },
  data() {
    return {
      avatarAI: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      avatarUser: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      bubbleList: [
        {
          content: '你好，我是AI助手，有什么我能帮助你的吗？',
          placement: 'start',
          role: 'ai',
          loading: false,
          shape: 'round',
          variant: 'filled',
          isMarkdown: false,
          typing: { step: 2, interval: 50, suffix: '|' }
        }
      ],
      customBubbleList: [],
      selectedBubble: 0,
      switchValue: false,
      loading: false,
      customLoading: false,
      messageCount: 0
    }
  },
  mounted() {
    // 模拟初始加载
    setTimeout(() => {
      this.addMessage()
    }, 2000)
    
    // 初始化自定义样式示例
    this.initCustomBubbles()
  },
  methods: {
    addMessage() {
      const isUser = this.bubbleList.length % 2 === 0
      const content = isUser 
        ? '我想了解更多关于气泡列表组件的信息。'
        : this.switchValue 
          ? `#ai-${this.messageCount}：💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~` 
          : '好的，气泡列表组件是一个展示聊天或对话内容的组件，支持多种功能，例如：\n\n1. 智能滚动管理\n2. 多模式滚动\n3. 交互感知\n4. 深度定制\n\n你可以通过引入组件和设置相应的属性来使用它。'
      
      const newMessage = {
        content: content,
        placement: isUser ? 'end' : 'start',
        role: isUser ? 'user' : 'ai',
        loading: true,
        shape: isUser ? 'corner' : 'round',
        variant: isUser ? 'shadow' : 'filled',
        isMarkdown: !isUser,
        typing: isUser ? false : { step: 2, interval: 30, suffix: '|' }
      }
      
      this.bubbleList.push(newMessage)
      this.messageCount++
      
      // 模拟加载结束
      setTimeout(() => {
        const index = this.bubbleList.length - 1
        this.bubbleList[index].loading = false
      }, 1500)
    },
    initCustomBubbles() {
      const generateFakeItems = (count) => {
        const messages = []
        for (let i = 0; i < count; i++) {
          const role = i % 2 === 0 ? 'ai' : 'user'
          const placement = role === 'ai' ? 'start' : 'end'
          const content = role === 'ai'
            ? '💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~'
            : '哈哈哈，让我试试'
          const shape = 'corner'
          const variant = role === 'ai' ? 'filled' : 'outlined'
          const noStyle = true
          
          messages.push({
            key: i,
            role,
            placement,
            content,
            shape,
            variant,
            noStyle
          })
        }
        return messages
      }
      
      this.customBubbleList = generateFakeItems(5)
    },
    scrollToTop() {
      this.$refs.bubbleListRef.scrollToTop()
    },
    scrollToBottom() {
      this.$refs.bubbleListRef.scrollToBottom()
    },
    scrollToBubble() {
      if (this.selectedBubble >= 0 && this.selectedBubble < this.bubbleList.length) {
        this.$refs.bubbleListRef.scrollToBubble(this.selectedBubble)
      }
    },
    updateContent() {
      // 更新内容以反映switchValue的变化
      this.bubbleList.forEach((item, index) => {
        if (item.role === 'ai') {
          item.content = this.switchValue 
            ? `#ai-${index}：💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~` 
            : '好的，气泡列表组件是一个展示聊天或对话内容的组件，支持多种功能。'
        }
      })
    },
    setLoading(val) {
      this.customLoading = val
      
      // 模拟将最后一条消息设置为加载状态
      if (this.bubbleList.length > 0) {
        const lastIndex = this.bubbleList.length - 1
        this.bubbleList[lastIndex].loading = val
      }
    },
    regenerateMessage(item) {
      // 找到当前消息的索引
      const index = this.bubbleList.findIndex(msg => msg === item)
      if (index !== -1) {
        // 设置为加载状态
        this.bubbleList[index].loading = true
        
        // 模拟重新生成
        setTimeout(() => {
          this.bubbleList[index].content = '已重新生成: 气泡列表组件是一个展示聊天或对话内容的组件，提供了更多自定义选项和功能增强。'
          this.bubbleList[index].loading = false
        }, 1500)
      }
    },
    onComplete(instance, index) {
      console.log(`Bubble at index ${index} typing completed!`)
    },
    getCurrentTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    },
    copyText(content) {
      console.log('copyText', content)
      // 在实际应用中，这里应该使用剪贴板API
      this.$message({
        message: '内容已复制到剪贴板',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.component-container {
  width: 100%;
}

.top-wrap {
  margin-bottom: 20px;
}

.control-panel {
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.control-panel h3 {
  margin-top: 0;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.btn-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.bubble-nav {
  display: flex;
  align-items: center;
  gap: 10px;
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

.bubblelist-container {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 10px;
  background-color: #f9f9f9;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: 0;
  padding: 0;
}

.custom-header .time {
  color: #909399;
  font-size: 12px;
}

.custom-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin: 0;
  padding: 0;
}

.custom-loading-container {
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
}

.loading-char {
  animation: pulse 1.5s infinite ease-in-out;
  animation-delay: calc(0.1s * var(--i));
  margin-right: 2px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.custom-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #409eff;
}

.custom-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.custom-content {
  padding: 10px;
  background-color: #ecf5ff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  color: #409eff;
}

.switch-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
}
</style> 