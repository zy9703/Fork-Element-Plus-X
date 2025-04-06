import type { RequiredDependency } from 'typescript-api-pro'
import type { TypingConfig } from '../Typewriter/types'

/**
 * 思考节点的id类型
 */
type ThoughtChainItemId = string | number

export type ThoughtChainType = 'info' | 'success' | 'warning' | 'danger' | 'primary'

export interface ThinkStatusEnum {
  loading: {
    value: string | number
    type: ThoughtChainType
  }
  error: {
    value: string | number
    type: ThoughtChainType
  }
  success: {
    value: string | number
    type: ThoughtChainType
  }
}

/**
 * 思考节点的基础类型
 */
interface ThoughtChainItemBase {
  /**
   * 唯一标识
   */
  id: ThoughtChainItemId
  /**
   * 节点标题
   */
  title?: string
  /**
   * 思考的内容 没有展开选项时content会作为思维显示的内容
   * 当展开选项时content会作为展开选项的标题 `thinkTitle` 会作为展开选项后显示的思维内容
   */
  thinkTitle?: string
  /**
   * 展开思考的详细内容
   */
  thinkContent?: string
  /**
   * 节点的图标
   */
  status?: 'loading' | 'error' | 'success'
  /**
   * footer对齐位置
   */
  placement?: 'top' | 'bottom'
  /**
   * 是否可以展开
   */
  isCanExpand?: boolean | ((item: ThoughtChainItemBase) => boolean)
  /**
   * 是否默认展开
   */
  isDefaultExpand?: boolean | ((item: ThoughtChainItemBase) => boolean)
  /**
   * 是否隐藏节点标题内容
   */
  hideTitle?: boolean | ((item: ThoughtChainItemBase) => boolean)
  /**
   *  是否使用markdown语法
   */
  isMarkdown?: boolean
  /**
   * 是否开启打字效果
   */
  typing?: TypingConfig
}

export type DefaultThoughtChainItemProps = RequiredDependency<ThoughtChainItemBase, 'isCanExpand' | 'thinkContent'>

export type ThoughtChainItemProps<T = DefaultThoughtChainItemProps> = Pick<ThoughtChainItemBase, 'hideTitle' | 'isMarkdown' | 'typing' | 'isDefaultExpand' | 'isCanExpand' | 'placement'> & T

/**
 * 思考组件的属性
 */
export interface ThoughtChainProps<T = ThoughtChainItemBase> {
  /**
   * 显示的节点列表
   */
  thinkingItems: ThoughtChainItemProps<T>[]
  /**
   * 节点id的key
   */
  rowKey?: string
  /**
   * 标题的key
   */
  titleKey?: string
  /**
   * 思考内容标题的key
   */
  thinkTitleKey?: string
  /**
   * 展开思考内容的key
   */
  thinkContentKey?: string
  /**
   * 状态的key
   */
  statusKey?: string
  /**
   * 节点状态枚举
   */
  statusEnum?: ThinkStatusEnum
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
