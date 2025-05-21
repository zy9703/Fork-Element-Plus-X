<!-- home 首页-使用 A3Chat 组件 -->
<script>
export default {
  data() {
    return {
      // 对话列表配置
      conversationItems: [], // 会话列表数据
      conversationActive: '1', // 当前激活的会话ID
      conversationItemsStyle: {}, // 会话项基础样式
      conversationItemsHoverStyle: {}, // 会话项悬停样式
      conversationItemsActiveStyle: {}, // 会话项激活样式
      conversationItemsMenuOpenedStyle: {}, // 会话项菜单打开时的样式
      conversationStyle: {}, // 会话容器整体样式
      conversationLabelMaxWidth: undefined, // 会话标签最大宽度
      conversationLabelHeight: 20, // 会话标签高度
      conversationShowTooltip: false, // 是否显示会话标签提示
      conversationTooltipPlacement: 'top', // 提示框位置
      conversationTooltipOffset: 12, // 提示框偏移量
      conversationGroupable: false, // 是否支持分组
      conversationUngroupedTitle: '未分组', // 未分组标题
      conversationMenu: [ // 会话菜单配置
        {
          label: '重命名',
          key: 'rename',
          command: 'rename'
        },
        {
          label: '删除',
          key: 'delete',
          command: 'delete',
          menuItemHoverStyle: {
            color: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.1)'
          }
        }
      ],
      conversationShowBuiltInMenu: false, // 是否显示内置菜单
      conversationMenuPlacement: 'bottom-start', // 菜单位置
      conversationMenuOffset: 50, // 菜单偏移量
      conversationMenuShowArrow: false, // 是否显示菜单箭头
      conversationMenuMaxHeight: undefined, // 菜单最大高度
      conversationMenuStyle: {}, // 菜单样式
      conversationMenuClassName: '', // 菜单类名
      conversationMenuTeleported: true, // 菜单是否使用teleport
      conversationLoadMore: undefined, // 加载更多回调函数
      conversationLoadMoreLoading: false, // 加载更多状态
      conversationShowToTopBtn: false, // 是否显示回到顶部按钮
      conversationRowKey: 'id', // 会话项唯一键
      conversationLabelKey: 'label', // 会话显示文本键
      
      // 消息气泡配置
      bubbleList: [], // 消息列表数据
      bubbleListMaxHeight: 'auto', // 消息列表最大高度
      bubbleListTriggerIndices: 'only-last', // 触发打字机效果的索引
      bubbleListAlwaysShowScrollbar: false, // 是否始终显示滚动条
      bubbleListBackButtonThreshold: 80, // 返回顶部按钮出现的阈值
      bubbleListShowBackButton: true, // 是否显示返回顶部按钮
      bubbleListBackButtonPosition: { bottom: '20px', left: 'calc(50% - 19px)' }, // 返回按钮位置
      bubbleListBtnLoading: true, // 返回按钮加载状态
      bubbleListBtnColor: '#409EFF', // 返回按钮颜色
      bubbleListBtnIconSize: 24, // 返回按钮图标大小
      
      // 发送框配置
      senderValue: '', // 输入框值
      senderPlaceholder: '请输入内容', // 输入框占位文本
      senderAutoSize: { minRows: 1, maxRows: 6 }, // 输入框自适应高度
      senderSubmitType: 'enter', // 提交方式(enter/shiftEnter)
      senderHeaderAnimationTimer: 300, // 头部动画时间(ms)
      senderInputWidth: '100%', // 输入框宽度
      senderVariant: 'default', // 输入框变体(default/updown)
      senderShowUpdown: true, // 是否显示上下布局
      senderSubmitBtnDisabled: undefined, // 提交按钮禁用状态
      senderInputStyle: {}, // 输入框样式
      senderTriggerStrings: [], // 触发字符数组
      senderTriggerPopoverVisible: false, // 触发弹窗是否可见
      senderTriggerPopoverWidth: 'fit-content', // 触发弹窗宽度
      senderTriggerPopoverLeft: '0px', // 触发弹窗左侧偏移
      senderTriggerPopoverOffset: 8, // 触发弹窗偏移量
      senderTriggerPopoverPlacement: 'top-start', // 触发弹窗位置
      senderReadOnly: false, // 是否只读
      senderDisabled: false, // 是否禁用
      senderLoading: false, // 是否加载中
      senderClearable: true, // 是否可清空
      senderAllowSpeech: false // 是否允许语音输入
    }
  },
  mounted() {
    this.conversationItems = [
        { key: '1', label: '对话1', unread: false },
        { key: '2', label: '对话2', unread: true }
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
      :conversation-items-style="conversationItemsStyle"
      :conversation-items-hover-style="conversationItemsHoverStyle"
      :conversation-items-active-style="conversationItemsActiveStyle"
      :conversation-items-menu-opened-style="conversationItemsMenuOpenedStyle"
      :conversation-style="conversationStyle"
      :conversation-label-max-width="conversationLabelMaxWidth"
      :conversation-label-height="conversationLabelHeight"
      :conversation-show-tooltip="conversationShowTooltip"
      :conversation-tooltip-placement="conversationTooltipPlacement"
      :conversation-tooltip-offset="conversationTooltipOffset"
      :conversation-groupable="conversationGroupable"
      :conversation-ungrouped-title="conversationUngroupedTitle"
      :conversation-menu="conversationMenu"
      :conversation-show-built-in-menu="conversationShowBuiltInMenu"
      :conversation-menu-placement="conversationMenuPlacement"
      :conversation-menu-offset="conversationMenuOffset"
      :conversation-menu-show-arrow="conversationMenuShowArrow"
      :conversation-menu-max-height="conversationMenuMaxHeight"
      :conversation-menu-style="conversationMenuStyle"
      :conversation-menu-class-name="conversationMenuClassName"
      :conversation-menu-teleported="conversationMenuTeleported"
      :conversation-load-more="conversationLoadMore"
      :conversation-load-more-loading="conversationLoadMoreLoading"
      :conversation-show-to-top-btn="conversationShowToTopBtn"
      :conversation-row-key="conversationRowKey"
      :conversation-label-key="conversationLabelKey"
      :bubble-list="bubbleList"
      :bubble-list-max-height="bubbleListMaxHeight"
      :bubble-list-trigger-indices="bubbleListTriggerIndices"
      :bubble-list-always-show-scrollbar="bubbleListAlwaysShowScrollbar"
      :bubble-list-back-button-threshold="bubbleListBackButtonThreshold"
      :bubble-list-show-back-button="bubbleListShowBackButton"
      :bubble-list-back-button-position="bubbleListBackButtonPosition"
      :bubble-list-btn-loading="bubbleListBtnLoading"
      :bubble-list-btn-color="bubbleListBtnColor"
      :bubble-list-btn-icon-size="bubbleListBtnIconSize"
      :sender-value="senderValue"
      :sender-placeholder="senderPlaceholder"
      :sender-auto-size="senderAutoSize"
      :sender-submit-type="senderSubmitType"
      :sender-header-animation-timer="senderHeaderAnimationTimer"
      :sender-input-width="senderInputWidth"
      :sender-variant="senderVariant"
      :sender-show-updown="senderShowUpdown"
      :sender-submit-btn-disabled="senderSubmitBtnDisabled"
      :sender-input-style="senderInputStyle"
      :sender-trigger-strings="senderTriggerStrings"
      :sender-trigger-popover-visible="senderTriggerPopoverVisible"
      :sender-trigger-popover-width="senderTriggerPopoverWidth"
      :sender-trigger-popover-left="senderTriggerPopoverLeft"
      :sender-trigger-popover-offset="senderTriggerPopoverOffset"
      :sender-trigger-popover-placement="senderTriggerPopoverPlacement"
      :sender-read-only="senderReadOnly"
      :sender-disabled="senderDisabled"
      :sender-loading="senderLoading"
      :sender-clearable="senderClearable"
      :sender-allow-speech="senderAllowSpeech"
      @update:conversation-active="updateConversationActive"
      @update:sender-value="updateSenderValue"
      @sender-submit="handleSenderSubmit"
      @bubble-list-complete="handleBubbleListComplete"
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