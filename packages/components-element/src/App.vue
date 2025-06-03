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
      <!--<el-tab-pane label="A3Chat">-->
      <!--  <A3ChatDemo />-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="A3BubbleList">
        <BubbleListDemo />
      </el-tab-pane>
      <el-tab-pane label="A3Bubble">
        <BubbleDemo />
      </el-tab-pane>
      <el-tab-pane label="A3BubbleList">
        <BubbleListDemo />
      </el-tab-pane>
      <el-tab-pane label="A3Conversations">
        <ConversationsDemo />
      </el-tab-pane>
      <el-tab-pane label="A3Sender">
        <SenderDemo />
      </el-tab-pane>
      <el-tab-pane label="A3Thinking">
        <ThinkingDemo />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import A3ChatDemo from './components/A3Chat/demo.vue'
import BubbleDemo from './components/Bubble/demo.vue'
import BubbleListDemo from './components/BubbleList/demo.vue'
import ConversationsDemo from './components/Conversations/demo.vue'
import SenderDemo from './components/Sender/demo.vue'
import ThinkingDemo from './components/Thinking/demo.vue'

export default {
  name: 'App',
  components: {
    // A3ChatDemo,
    BubbleDemo,
    BubbleListDemo,
    ConversationsDemo,
    SenderDemo,
    ThinkingDemo
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
