import { BubbleListItemProps, BubbleListProps } from './types.d.ts';
type __VLS_Props = BubbleListProps<BubbleListItemProps>;
declare function scrollToTop(): void;
declare function scrollToBottom(): void;
declare function scrollToBubble(index: number): void;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        avatar?(_: {
            item: BubbleListItemProps;
        }): any;
        header?(_: {
            item: BubbleListItemProps;
        }): any;
        content?(_: {
            item: BubbleListItemProps;
        }): any;
        footer?(_: {
            item: BubbleListItemProps;
        }): any;
        loading?(_: {
            item: BubbleListItemProps;
        }): any;
    };
    refs: {
        scrollContainer: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {
    scrollToTop: typeof scrollToTop;
    scrollToBottom: typeof scrollToBottom;
    scrollToBubble: typeof scrollToBubble;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    complete: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onComplete?: ((...args: any[]) => any) | undefined;
}>, {
    list: BubbleListItemProps[];
    maxHeight: string;
    triggerIndices: "only-last" | "all" | number[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    scrollContainer: HTMLDivElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
