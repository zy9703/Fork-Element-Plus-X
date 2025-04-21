<template>
  <div id="app">
    <el-alert
      title="💖 欢迎使用 Element-Plus-X 的 Element UI 版本"
      type="success"
      :closable="false"
    >
      <p class="self-description">
        Vue2 + Element UI 组件库示例
      </p>
    </el-alert>

    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane label="A3AI聊天">
        <AiChatDemo />
      </el-tab-pane>
      <el-tab-pane label="A3Attachments">
        <AttachmentsDemo />
      </el-tab-pane>
      <el-tab-pane label="A3Sender">
        <SenderDemo />
      </el-tab-pane>
      <el-tab-pane label="A3Typewriter">
        <TypewriterDemo />
      </el-tab-pane>
      <el-tab-pane label="A3Bubble">
        <BubbleDemo />
      </el-tab-pane>
      <el-tab-pane label="A3BubbleList">
        <BubbleListDemo />
      </el-tab-pane>
      <!-- 可以在这里添加更多组件的tab -->
    </el-tabs>
  </div>
</template>

<script>
import BubbleDemo from './components/Bubble/demo.vue'
import TypewriterDemo from './components/Typewriter/demo.vue'
import BubbleListDemo from './components/BubbleList/demo.vue'
import SenderDemo from './components/Sender/demo.vue'
import AttachmentsDemo from './components/Attachments/demo.vue'
import AiChatDemo from './components/AiChatDemo/index.vue'

export default {
  name: 'App',
  components: {
    TypewriterDemo,
    BubbleDemo,
    BubbleListDemo,
    SenderDemo,
    AttachmentsDemo,
    AiChatDemo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-tabs {
  min-height: calc(100vh - 64px - 64px);
  background-color: beige;
}

.self-description {
  font-size: 14px;
}

.self-description a {
  text-emphasis: none;
  color: coral;
  font-weight: 700;
}
</style>
