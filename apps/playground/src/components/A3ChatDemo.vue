<!-- home 首页-使用 A3Chat 组件 -->
<script>
export default {
  data() {
    return {
      // 必传属性
      conversationItems: [], // 会话列表数据
      conversationActive: 'm1', // 当前激活的会话ID
      bubbleList: [], // 消息列表数据
      senderValue: '', // 输入框值
    }
  },
  mounted() {
    this.conversationItems = [
        { id: 'm1', label: '对话1'},
        { id: 'm2', label: '对话2'}
    ]
    this.bubbleList = this.generateFakeItems(2)
//     this.bubbleList.push({
//       id: Date.now(),
//       content: `
// # 标题
// 这是一个 Markdown 示例。
// - 列表项 1
// - 列表项 2
// **粗体文本** 和 *斜体文本*
// \`\`\`javascript
// console.log('Hello, world!');
// \`\`\`

// \`\`\`java
// console.log('Hello, world!');
// \`\`\`

// \`\`\`mermaid
// pie
//     "传媒及文化相关" : 35
//     "广告与市场营销" : 8
//     "游戏开发" : 15
//     "影视动画与特效" : 12
//     "互联网产品设计" : 10
//     "VR/AR开发" : 5
//     "其他" : 15
// \`\`\`

// \`\`\`mermaid
// sequenceDiagram
//     autonumber
//     participant 1 as $$alpha$$
//     participant 2 as $$beta$$
//     1->>2: Solve: $$\sqrt{2+2}$$
//     2-->>1: Answer: $$2$$
//     Note right of 2: $$\sqrt{2+2}=\sqrt{4}=2$$
// \`\`\`
// `.trim(),
//       isMarkdown: true,
//     })
  },
  methods: {
    generateFakeItems(count){
      const messages =  []
      for (let i = 0; i < count; i++) {
        const role = i % 2 === 0 ? 'ai' : 'user'
        const placement = role === 'ai' ? 'start' : 'end'
        const key = i + 1
        const content = role === 'ai'
          ? '💖 感谢使用 A3Chat组件 ! ~'.repeat(5)
          : `哈哈哈，让我试试`
        const loading = false
        const shape = 'corner'
        const variant = role === 'ai' ? 'filled' : 'outlined'
        const isMarkdown = false
        const typing = role === 'ai' ? i === count - 1 : false
        const avatar = role === 'ai'
          ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
          : 'https://avatars.githubusercontent.com/u/76239030?v=4'
        messages.push({
          key, // 唯一标识
          role, // user | ai 自行更据模型定义
          placement, // start | end 气泡位置
          content, // 消息内容 流式接受的时候，只需要改这个值即可
          loading, // 当前气泡的加载状态
          shape, // 气泡的形状
          variant, // 气泡的样式
          isMarkdown, // 是否渲染为 markdown
          typing, // 是否开启打字器效果 该属性不会和流式接受冲突
          isFog: role === 'ai', // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
          avatar,
          avatarSize: '24px', // 头像占位大小
          avatarGap: '12px', // 头像与气泡之间的距离
        })
      }
      return messages
    },
    conversationChange(item) {
      console.log('Conversation change:', item)
      this.conversationActive = item.id
    },
    conversationMenuCommand(command, item) {
      console.log('Conversation menu command:',command, item)
    },
    // updateSenderValue(value) {
    //   this.senderValue = value
    // },
    handleSenderSubmit() {
      this.bubbleList.push({
        id: Date.now(),
        content: this.senderValue,
        placement: 'end',
        role: 'user'
      })
      this.bubbleList.push({
        id: Date.now(),
        content: `已收到：${this.senderValue}`,
        placement: 'start',
        role: 'ai'
      })
      this.senderValue = ''
    },
    handleBubbleListComplete(instance, index) {
      console.log('Bubble list complete:', instance, index)
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
      :sender-value="senderValue"
      :conversation-show-built-in-menu="true"
      @conversation-change="conversationChange"
      @conversation-menu-command="conversationMenuCommand"
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