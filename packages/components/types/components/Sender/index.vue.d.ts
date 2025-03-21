import { SenderProps } from './types.d.ts';
type __VLS_Props = SenderProps;
declare const value: import('vue').ModelRef<string, string, string, string>;
declare function openHeader(): false | undefined;
declare function closeHeader(): false | undefined;
declare function startRecognition(): false | undefined;
declare function stopRecognition(): void;
declare function submit(): false | undefined;
declare function cancel(): false | undefined;
declare function clear(): false | undefined;
declare function blur(): false | undefined;
declare function focus(type?: string): false | undefined;
type __VLS_PublicProps = {
    'value'?: typeof value['value'];
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
    openHeader: typeof openHeader;
    closeHeader: typeof closeHeader;
    clear: typeof clear;
    blur: typeof blur;
    focus: typeof focus;
    submit: typeof submit;
    cancel: typeof cancel;
    startRecognition: typeof startRecognition;
    stopRecognition: typeof stopRecognition;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    cancel: (...args: any[]) => void;
    submit: (...args: any[]) => void;
    recordingChange: (...args: any[]) => void;
    "update:value": (value: string) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onCancel?: ((...args: any[]) => any) | undefined;
    onSubmit?: ((...args: any[]) => any) | undefined;
    onRecordingChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((value: string) => any) | undefined;
}>, {
    placeholder: string;
    autoSize: {
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
