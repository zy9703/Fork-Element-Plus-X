<!-- home 首页-使用 A3Chat 组件 -->
<script>
export default {
  data() {
    return {
      // 对话列表数据
      conversationItems: [
        { key: '1', label: '对话1', unread: false },
        { key: '2', label: '对话2', unread: true }
      ],
      conversationActive: '1',
      // 消息气泡数据
      bubbleList: [
        { id: 1, content: '你好，这是一条测试消息', isMe: false },
        { id: 2, content: '你好，这是回复消息', isMe: true }
      ],
      // 发送框配置
      senderOptions: [
        { value: 'user1', label: '用户1' },
        { value: 'user2', label: '用户2' }
      ],
      senderValue: ''
    }
  },
  methods: {
    updateConversationActive(key) {
      this.conversationActive = key
    },
    updateSenderValue(value) {
      this.senderValue = value
    },
    handleSenderSubmit() {
      this.bubbleList.push({
        id: Date.now(),
        content: this.senderValue,
        isMe: true
      })
      this.senderValue = ''
    }
  }
}
</script>

<template>
  <div id="a3chatDemo" class="component-container">
    <A3Chat
      :conversation-items="conversationItems"
      :conversation-active="conversationActive"
      :bubble-list="bubbleList"
      :sender-options="senderOptions"
      :sender-value="senderValue"
      @update:conversation-active="updateConversationActive"
      @update:sender-value="updateSenderValue"
      @sender-submit="handleSenderSubmit"
    />
  </div>
</template>

<style scoped lang="scss">
#a3chatDemo{
  width: 100%;
  height: calc(100vh - 220px);
  background: #fff;
}
</style>