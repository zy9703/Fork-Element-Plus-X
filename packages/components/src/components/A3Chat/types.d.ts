import type { BubbleListItemProps } from '../BubbleList/types'
import type { ConversationItem, ConversationMenu, ConversationMenuCommand } from '../Conversations/types'
import type { ThinkingStatus } from '../Thinking/types'
import type { TypewriterInstance } from '../Typewriter/types'

export type A3MessageItem = BubbleListItemProps & {
  key: number
  role: 'ai' | 'user' | 'system'
  avatar: string
  thinkingStatus?: ThinkingStatus
  expanded?: boolean
}

export interface A3ChatProps {
  // Conversations组件相关
  conversationActive?: string // 当前激活的会话项
  conversationItems: ConversationItem[] // 会话列表数据
  conversationItemsStyle?: Record<string, any> // 会话项样式
  conversationItemsHoverStyle?: Record<string, any> // 会话项悬停样式
  conversationItemsActiveStyle?: Record<string, any> // 会话项激活样式
  conversationItemsMenuOpenedStyle?: Record<string, any> // 会话项菜单打开时样式
  conversationStyle?: Record<string, any> // 会话容器样式
  conversationLabelMaxWidth?: number // 标签最大宽度
  conversationLabelHeight?: number // 标签高度
  conversationShowTooltip?: boolean // 是否显示提示
  conversationTooltipPlacement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' // 提示位置
  conversationTooltipOffset?: number // 提示偏移
  conversationGroupable?: boolean | { sort?: (a: string, b: string) => number } // 是否可分组
  conversationUngroupedTitle?: string // 未分组标题
  conversationMenu?: ConversationMenu[] // 菜单配置
  conversationShowBuiltInMenu?: boolean // 是否显示内置菜单
  conversationMenuPlacement?: 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' // 菜单位置
  conversationMenuOffset?: number // 菜单偏移
  conversationMenuShowArrow?: boolean // 是否显示菜单箭头
  conversationMenuMaxHeight?: number // 菜单最大高度
  conversationMenuStyle?: Record<string, any> // 菜单样式
  conversationMenuClassName?: string // 菜单类名
  conversationMenuTeleported?: boolean // 菜单是否传送
  conversationLoadMore?: () => void // 加载更多方法
  conversationLoadMoreLoading?: boolean // 加载更多加载状态
  conversationShowToTopBtn?: boolean // 是否显示回到顶部按钮
  conversationRowKey?: string // 行键名
  conversationLabelKey?: string // 标签键名

  // BubbleList组件相关
  bubbleList: MessageItem[] // 气泡列表数据
  bubbleListMaxHeight?: string // 气泡列表最大高度
  bubbleListTriggerIndices?: 'only-last' | 'all' | number[] // 触发打字机效果的索引：only-last 仅最后一个，all 全部，或指定索引数组
  bubbleListAlwaysShowScrollbar?: boolean // 是否始终显示滚动条
  bubbleListBackButtonThreshold?: number // 返回顶部按钮出现的滚动阈值
  bubbleListShowBackButton?: boolean // 是否显示返回顶部按钮
  bubbleListBackButtonPosition?: { // 返回顶部按钮位置
    bottom?: string
    left?: string
  }
  bubbleListBtnLoading?: boolean // 返回顶部按钮是否显示加载动画
  bubbleListBtnColor?: string // 返回顶部按钮颜色
  bubbleListBtnIconSize?: number // 返回顶部按钮图标大小

  // Thinking组件相关
  thinkingAutoCollapse?: boolean, // 是否自动折叠思考内容

  // Sender组件相关
  senderValue: string // 输入框的值
  senderPlaceholder?: string // 输入框占位文本
  senderAutoSize?: { minRows: number, maxRows: number } // 输入框自适应高度配置
  senderReadOnly?: boolean // 是否只读
  senderDisabled?: boolean // 是否禁用
  senderLoading?: boolean // 是否加载中
  senderClearable?: boolean // 是否显示清空按钮
  senderAllowSpeech?: boolean // 是否启用语音输入
  senderSubmitType?: 'enter' | 'shiftEnter' // 提交方式：enter 或 shiftEnter
  senderHeaderAnimationTimer?: number // 头部动画持续时间（毫秒）
  senderInputWidth?: string // 输入框宽度
  senderVariant?: 'default' | 'updown' // 变体类型：default 或 updown
  senderShowUpdown?: boolean // 是否显示上下布局（仅在 variant 为 updown 时有效）
  senderSubmitBtnDisabled?: boolean // 提交按钮禁用状态
  senderInputStyle?: Record<string, any> // 输入框样式
  senderTriggerStrings?: string[] // 触发字符数组
  senderTriggerPopoverVisible?: boolean // 触发弹出框是否可见
  senderTriggerPopoverWidth?: string // 触发弹出框宽度
  senderTriggerPopoverLeft?: string // 触发弹出框左侧偏移
  senderTriggerPopoverOffset?: number // 触发弹出框偏移距离
  senderTriggerPopoverPlacement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' // 触发弹出框位置
}

export interface A3ChatEmits {
  // Conversations组件相关
  (e: 'conversationChange', item: ConversationItem): void
  (e: 'conversationMenuCommand', command: ConversationMenuCommand, item: ConversationItem): void

  // BubbleList组件相关
  (e: 'bubbleListComplete', instance: TypewriterInstance, index: number): void

  // Thinking组件相关
  (e: 'thinkingChange', value: { value: boolean, status: ThinkingStatus }): void

  // Sender组件相关
  (e: 'update:senderValue', value: string): void
  (e: 'update:senderTriggerPopoverVisible', value: boolean): void
  (e: 'senderSubmit'): void
  (e: 'senderCancel'): void
  (e: 'senderRecordingChange'): void
  (e: 'senderTrigger', event: { oldValue: string, newValue: string, isOpen: boolean }): void
}