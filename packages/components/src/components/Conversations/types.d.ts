import type { VNode as ComponentVNode, CSSProperties } from 'vue'

// 基础ConversationItem接口
export interface ConversationItem {
  key: string
  label: string
  group?: string
  icon?: ComponentVNode | null
  disabled?: boolean
  prefixIcon?: ComponentVNode | null
  suffixIcon?: ComponentVNode | null
}

export type ConversationMenuCommand = string | number | object

export interface ConversationMenu {
  label: string
  key: string
  icon?: ComponentVNode | null
  disabled?: boolean
  divided?: boolean
  command?: ConversationMenuCommand
  menuItemStyle?: CSSProperties
  menuItemHoverStyle?: CSSProperties
}

// 分组选项
export interface GroupableOptions {
  // 组排序方法
  sort?: (a: string, b: string) => number
}

export interface Conversation {
  items: ConversationItem[]
  style?: CSSProperties
  labelMaxWidth?: number
  labelHeight?: number
  showTooltip?: boolean
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  tooltipOffset?: number
  // 允许boolean或GroupableOptions类型
  groupable?: boolean | GroupableOptions
  // 未分组的标题，默认为"未分组"
  ungroupedTitle?: string
  menu?: ConversationMenu[]
  menuPlacement?: 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
  menuOffset?: number
  menuShowArrow?: boolean
  menuMaxHeight?: number
  menuStyle?: CSSProperties
  menuClassName?: string
  menuTeleported?: boolean
  loadMore?: () => void
  loadMoreLoading?: boolean
  showToTopBtn?: boolean
}
