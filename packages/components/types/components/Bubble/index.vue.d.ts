import { BubbleProps } from './type';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        avatar?(_: {}): any;
        header?(_: {}): any;
        content?(_: {}): any;
        loading?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<BubbleProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    onComplete: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<BubbleProps> & Readonly<{
    onOnComplete?: ((...args: any[]) => any) | undefined;
}>, {
    content: string;
    placement: "start" | "end";
    variant: "filled" | "borderless" | "outlined" | "shadow";
    maxWidth: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
