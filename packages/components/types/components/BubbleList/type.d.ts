import { BubbleProps } from '../Bubble/type';
export interface BubbleListProps<T extends BubbleProps = BubbleProps> {
    list: T[];
    maxHeight?: string;
}
