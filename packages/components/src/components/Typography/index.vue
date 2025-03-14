<script setup lang="ts">
import "github-markdown-css";
import MarkdownIt from "markdown-it";
import Typed from "typed.js";
import Prism from "prismjs";
import DOMPurify from "dompurify";
import { onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  isMarkdown: {
    type: Boolean,
    default: false,
  },
  typing: {
    type: Boolean,
    default: false,
  },
  speed: {
    type: Number,
    default: 2, // 打字速度
  },
  suffix: {
    type: String,
    default: "|", // 后缀内容
  },
});
const emits = defineEmits(["onComplete"]);
const typingContent = ref<HTMLElement | null>(null);
let typedInstance: Typed | null = null;

const md = new MarkdownIt({
  highlight: (code: string, language: string) =>
    Prism.highlight(
      code,
      Prism.languages[language] || Prism.languages.plain,
      language
    ),
});

const showContent = ref("");

function initTyped() {
  if (typedInstance) {
    typedInstance.destroy();
    typedInstance = null;
  }

  if (!typingContent.value) return;

  typedInstance = new Typed(typingContent.value, {
    strings: [showContent.value],
    typeSpeed: props.speed ? props.speed * 10 : 2,
    backSpeed: 50,
    backDelay: 500,
    loop: false,
    showCursor: !props.isMarkdown,
    smartBackspace: false,
    fadeOut: true,
    fadeOutClass: "typed-fade-out",
    fadeOutDelay: 500,
    cursorChar: props.suffix ? props.suffix : "|",
    onComplete: (self) => {
      if (!props.isMarkdown) {
        self.cursor.style.display = "none";
        (
          self as unknown as { el: HTMLElement }
        ).el.parentElement?.classList.remove("el-is-typing");
      }
      onCompleteFunc(self);
    },
    preStringTyped: (_arrayPos, self) => {
      (self as unknown as { el: HTMLElement }).el.parentElement?.classList.add(
        "el-is-typing"
      );
    },
  });
}

function onCompleteFunc(self: Typed) {
  emits("onComplete", self);
}

watch(
  () => [props.content, props.isMarkdown],
  () => {
    if (props.isMarkdown)
      showContent.value = DOMPurify.sanitize(md.render(props.content));
    else showContent.value = props.content;

    // 立即初始化打字器，无需等待下一个tick
    if (props.typing && typingContent.value) initTyped();
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (typedInstance) {
    typedInstance.destroy();
    typedInstance = null;
  }
});
</script>

<template>
  <div v-if="isMarkdown">
    <span
      v-if="typing"
      ref="typingContent"
      class="markdown-body"
      v-html="showContent"
    />
    <span v-if="!typing" class="markdown-body" v-html="showContent" />
  </div>
  <div v-else-if="!isMarkdown">
    <span v-if="typing" ref="typingContent" class="typing-content">{{
      showContent
    }}</span>
    <span v-else>{{ showContent }}</span>
  </div>
</template>

<style scoped>
.markdown-body {
  background-color: var(--el-fill-color);
}
</style>
