import { TypewriterInstance, TypewriterProps, TypingConfig } from './types.d.ts';
import { ComputedRef } from 'vue';
declare const _default: import('vue').DefineComponent<TypewriterProps, {
    interrupt: () => void;
    continue: () => void;
    restart: () => void;
    destroy: () => void;
    renderedContent: ComputedRef<string>;
    isTyping: import('vue').Ref<boolean>;
    progress: ComputedRef<number>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    start: (instance: TypewriterInstance) => any;
    writing: (instance: TypewriterInstance) => any;
    finish: (instance: TypewriterInstance) => any;
}, string, import('vue').PublicProps, Readonly<TypewriterProps> & Readonly<{
    onStart?: ((instance: TypewriterInstance) => any) | undefined;
    onWriting?: ((instance: TypewriterInstance) => any) | undefined;
    onFinish?: ((instance: TypewriterInstance) => any) | undefined;
}>, {
    isMarkdown: boolean;
    typing: boolean | TypingConfig;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
