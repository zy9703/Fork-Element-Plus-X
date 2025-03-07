declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    content: {
        type: StringConstructor;
        default: string;
    };
    isMarkdown: {
        type: BooleanConstructor;
        default: boolean;
    };
    typing: {
        type: BooleanConstructor;
        default: boolean;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    suffix: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    onComplete: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    content: {
        type: StringConstructor;
        default: string;
    };
    isMarkdown: {
        type: BooleanConstructor;
        default: boolean;
    };
    typing: {
        type: BooleanConstructor;
        default: boolean;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    suffix: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onOnComplete?: ((...args: any[]) => any) | undefined;
}>, {
    content: string;
    isMarkdown: boolean;
    typing: boolean;
    step: number;
    suffix: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {
    typingContent: HTMLSpanElement;
}, any>;
export default _default;
