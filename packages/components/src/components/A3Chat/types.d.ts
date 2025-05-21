import type { BubbleListItemProps, BubbleListProps } from '../BubbleList/types'
import type { ConversationItem, ConversationMenuCommand } from '../Conversations/types'


export type listType = BubbleListItemProps & {
  key: number
  role: 'user' | 'ai'
}

export interface A3ChatProps {
  // Conversations组件相关
  conversationActive?: string
  conversationItems: ConversationItem[]
  conversationLabelMaxWidth?: number
  conversationShowTooltip?: boolean
  conversationRowKey?: string
  conversationTooltipPlacement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  conversationTooltipOffset?: number
  conversationShowToTopBtn?: boolean
  conversationShowBuiltInMenu?: boolean

  // BubbleList组件相关
  bubbleList: BubbleListProps<listType>['list']
  bubbleListMaxHeight?: string
  bubbleListTriggerIndices?: 'only-last' | 'all' | number[]
  bubbleListAlwaysShowScrollbar?: boolean
  bubbleListBackButtonThreshold?: number
  bubbleListShowBackButton?: boolean
  bubbleListBackButtonPosition?: {
    bottom?: string
    left?: string
  }
  bubbleListBtnLoading?: boolean
  bubbleListBtnColor?: string
  bubbleListBtnIconSize?: number

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

  // Sender组件相关
  (e: 'update:senderValue', value: string): void
  (e: 'update:senderTriggerPopoverVisible', value: boolean): void
  (e: 'senderSubmit'): void
  (e: 'senderCancel'): void
  (e: 'senderRecordingChange'): void
  (e: 'senderTrigger', event: { oldValue: string, newValue: string, isOpen: boolean }): void
}