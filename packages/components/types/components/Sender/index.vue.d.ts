interface Props {
    placeholder?: string;
    autosize?: {
        minRows: number;
        maxRows: number;
    };
    readOnly?: boolean;
    disabled?: boolean;
    loading?: boolean;
    clearable?: boolean;
    allowSpeech?: boolean;
    submitType?: "enter" | "shiftEnter";
    headerAnimationTimer?: number;
    inputWidth?: string;
}
declare const value: import('vue').ModelRef<string, string, string, string>;
type __VLS_Props = Props;
type __VLS_PublicProps = {
    "value"?: typeof value['value'];
} & __VLS_Props;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Readonly<Record<string, any>> & Record<string, any>;
    refs: {
        senderRef: HTMLDivElement;
        inputRef: unknown;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_PublicProps, {
    openHeader: () => false | undefined;
    closeHeader: () => false | undefined;
    clear: () => false | undefined;
    blur: () => false | undefined;
    focus: (type?: string) => false | undefined;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    submit: (...args: any[]) => void;
    "update:value": (value: string) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onSubmit?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((value: string) => any) | undefined;
}>, {
    placeholder: string;
    autosize: {
        minRows: number;
        maxRows: number;
    };
    submitType: "enter" | "shiftEnter";
    headerAnimationTimer: number;
    inputWidth: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    senderRef: HTMLDivElement;
    inputRef: unknown;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
