import { BubbleProps } from '../Bubble/types';
// 暂时这样包一层，后续看有没有拓展
export interface BubbleListItemProps extends BubbleProps {}

export interface BubbleListProps<T extends BubbleListItemProps = BubbleListItemProps> {
  list: T[]
  maxHeight?: string
  triggerIndices?: 'only-last' | 'all' | number[]
}
