import type { CSSProperties, VNode as ComponentVNode } from 'vue'

// 基础ConversationItem接口
export interface BaseConversationItem {
  key: string
  label: string
  group?: string
  icon?: ComponentVNode | null
  disabled?: boolean
  prefixIcon?: ComponentVNode | null
  suffixIcon?: ComponentVNode | null
}

// 当groupable为true时，timestamp必须存在
export type ConversationItem<G extends boolean = false> = G extends true
  ? BaseConversationItem & { timestamp: number }
  : BaseConversationItem & { timestamp?: number }

export interface ConversationMenu {
  label: string
  key: string
  icon?: ComponentVNode | null
  disabled?: boolean
  onClick?: () => void
}

export interface Conversation {
  items: ConversationItem<boolean>[]
  style?: CSSProperties
  labelMaxWidth?: number
  defaultActiveKey?: string
  showTooltip?: boolean
  groupable?: boolean
  menu?: ConversationMenu[]
  loadMore?: () => void
  search?: string
  searchMethod?: (items: ConversationItem<boolean>[], searchValue: string) => ConversationItem<boolean>[]
  renderLabel?: () => ComponentVNode
  renderMenu?: () => ComponentVNode
}
