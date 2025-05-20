import type { BubbleListItemProps, BubbleListProps } from '../BubbleList/types'
import type { ConversationItem, ConversationMenuCommand } from '../Conversations/types'
import type { MentionOption } from '../MentionSender/types'

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

  // MentionSender组件相关
  senderValue: string
  senderPlaceholder?: string
  senderClearable?: boolean
  senderOptions: MentionOption[]
  senderTriggerStrings?: string[]
  senderDisabled?: boolean
  senderAutoSize?: { minRows: number, maxRows: number }
  senderReadOnly?: boolean
  senderSubmitBtnDisabled?: boolean
  senderLoading?: boolean
  senderAllowSpeech?: boolean
  senderSubmitType?: 'enter' | 'shiftEnter'
  senderHeaderAnimationTimer?: number
  senderInputWidth?: string
  senderVariant?: 'default' | 'updown'
  senderShowUpdown?: boolean
  senderInputStyle?: Record<string, any>
  senderTriggerPopoverVisible?: boolean
  senderTriggerPopoverWidth?: string
  senderTriggerPopoverLeft?: string
  senderTriggerPopoverOffset?: number
  senderTriggerPopoverPlacement?: 'top' | 'bottom'
}

export interface A3ChatEmits {
  // Conversations组件相关
  (e: 'conversationChange', item: ConversationItem): void
  (e: 'conversationMenuCommand', command: ConversationMenuCommand, item: ConversationItem): void

  // MentionSender组件相关
  (e: 'update:senderValue', value: string): void
  (e: 'senderSearch', searchText: string, prefix: string): void
  (e: 'senderSelect', option: MentionOption): void
  (e: 'senderSubmit'): void
  (e: 'senderCancel'): void
  (e: 'senderRecordingChange'): void
}