import type { Component } from 'vue'
import type { TypingConfig } from '../Typewriter/types'

/**
 * 思考节点的id类型
 */
type ThinkingItemId = string | number

/**
 * 思考节点的基础类型
 */
export interface ThinkingItemBase {
  /**
   * 唯一标识
   */
  id: ThinkingItemId
  /**
   * 思考的内容 没有展开选项时content会作为思维显示的内容
   * 当展开选项时content会作为展开选项的标题  expandContent会作为展开选项后显示的思维内容
   */
  content: string
  /**
   * 节点的图标
   */
  dotIcon: Component
  /**
   * 节点类型
   */
  type?: 'info' | 'success' | 'warning' | 'danger' | 'primary'
  /**
   * footer对齐位置
   */
  placement?: 'top' | 'bottom'
  /**
   * 是否可以展开
   */
  isCanExpand?: boolean
  /**
   * 是否默认展开
   */
  isDefaultExpand?: boolean
  /**
   * 展开思考的详细内容
   */
  expandContent?: string
  /**
   * 节点是否正在加载
   */
  isLoading?: boolean
  /**
   * 节点标题
   */
  title?: string
  /**
   * 是否隐藏节点标题内容
   */
  hideTitle?: boolean
  /**
   * 节点的加载图标
   */
  loadingIcon?: Component
  /**
   *  是否使用markdown语法
   */
  isMarkdown?: boolean
  /**
   * 是否开启打字效果
   */
  typing?: TypingConfig
}

/**
 * 思考节点的类型
 */
export type ThinkingItem =
  | ThinkingItemBase & { isCanExpand?: false }
  | ThinkingItemBase & { isCanExpand: true, expandContent: string }

/**
 * 思考组件的属性
 */
export interface ThinkingProps {
  /**
   * 显示的节点列表
   */
  thinkingItems: ThinkingItem[]
  /**
   * 节点图标大小
   */
  dotSize?: 'large' | 'default' | 'small'
  /**
   * 思维链最大宽度
   */
  maxWidth?: string
  /**
   * 是否启用节点之间链接线的渐变颜色 false默认颜色
   */
  lineGradient?: boolean
}

export interface ThinkingInstance {
  /**
   * 展开的节点的id
   * @param id 节点的id
   */
  expandKeys: string[]
}
