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

export interface ConversationMenu {
  label: string
  key: string
  icon?: ComponentVNode | null
  disabled?: boolean
  onClick?: () => void
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
  showTooltip?: boolean
  // 允许boolean或GroupableOptions类型或空字符串('')
  // 当为空字符串时，等同于传入groupable但不赋值，相当于groupable=true
  groupable?: boolean | GroupableOptions | ''
  // 未分组的标题，默认为"未分组"
  ungroupedTitle?: string
  menu?: ConversationMenu[]
  loadMore?: () => void
  search?: string
  /**
   * 搜索方法，接收搜索值作为参数
   * 用户可以在此方法中处理异步搜索逻辑，然后自行更新items数据
   * @param searchValue 搜索值
   */
  searchMethod?: (searchValue: string) => void
}
