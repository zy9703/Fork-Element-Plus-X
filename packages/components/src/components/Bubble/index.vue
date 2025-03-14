<!-- Bubble 对话气泡 -->
<script setup lang="ts">
import type Typed from "typed.js";
import { computed, withDefaults } from "vue";
import Typography from "../Typography/index.vue";
import type { BubbleProps } from "./type";

const props = withDefaults(defineProps<BubbleProps>(), {
  content: "",
  placement: "start",
  variant: "filled",
  maxWidth: "500px",
  avatarSize: "0px",
  avatarGap: "12px",
});

const emits = defineEmits(["onComplete"]);

const _speed = computed(() => {
  if (typeof props.typing === "object" && props.typing.speed)
    return props.typing.speed;
  else return 2;
});

const _suffix = computed(() => {
  if (typeof props.typing === "object" && props.typing.suffix)
    return props.typing.suffix;
  else return "|";
});

const _typing = computed(() => {
  if (typeof props.typing === "boolean") return props.typing;
  else return true;
});

function onCompleteFunc(self: Typed) {
  emits("onComplete", self);
}

// 定义三个点-加载中样式
const dots = [1, 2, 3];
</script>

<template>
  <div
    class="el-bubble"
    :class="{
      'el-bubble-start': placement === 'start',
      'el-bubble-end': placement === 'end',
    }"
    :style="{
      '--el-padding-sm': '12px',
      '--el-padding-xxs': '4px',
      '--el-box-shadow-tertiary': `0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)`,
      '--bubble-content-max-width': `${maxWidth}`,
      '--el-bubble-avatar-placeholder-width': `${avatarSize}`,
      '--el-bubble-avatar-placeholder-height': `${avatarSize}`,
      '--el-bubble-avatar-placeholder-gap': `${avatarGap}`,
    }"
  >
    <!-- 头像 -->
    <div v-if="$slots.avatar" class="el-bubble-avatar">
      <slot name="avatar" />
    </div>

    <!-- 头像属性进行占位 -->
    <div
      v-if="avatarSize && !$slots.avatar"
      class="el-bubble-avatar-placeholder"
    />

    <!-- 内容 -->
    <div class="el-bubble-content-wrapper">
      <!-- 头部内容 -->
      <div v-if="$slots.header" class="el-bubble-header">
        <slot name="header" />
      </div>

      <div
        class="el-bubble-content"
        :class="{
          'el-bubble-content-loading': loading,
          'el-bubble-content-round': shape === 'round',
          'el-bubble-content-corner': shape === 'corner',
          'el-bubble-content-filled': variant === 'filled',
          'el-bubble-content-borderless': variant === 'borderless',
          'el-bubble-content-outlined': variant === 'outlined',
          'el-bubble-content-shadow': variant === 'shadow',
        }"
      >
        <div
          v-if="!loading"
          class="el-typography"
          :class="{
            'no-content': !content,
          }"
        >
          <Typography
            v-if="!$slots.content && content"
            :typing="_typing"
            :content="content"
            :is-markdown="isMarkdown"
            :suffix="_suffix"
            :speed="_speed"
            @on-complete="onCompleteFunc"
          />
        </div>

        <!-- 内容-自定义 -->
        <slot v-if="$slots.content && !loading" name="content" />

        <!-- 加载中-默认 -->
        <div v-if="loading && !$slots.loading" class="el-bubble-loading-wrap">
          <div
            v-for="(_, index) in dots"
            :key="index"
            class="dot"
            :style="{ animationDelay: `${index * 0.2}s` }"
          />
        </div>

        <!-- 加载中-自定义 -->
        <div v-if="loading && $slots.loading" class="el-bubble-loading-wrap">
          <slot name="loading" />
        </div>
      </div>

      <div v-if="$slots.footer" class="el-bubble-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-bubble {
  display: flex;
  gap: var(--el-bubble-avatar-placeholder-gap);
}

.el-bubble-start {
  .el-bubble-content-wrapper {
    .el-bubble-content-corner {
      border-start-start-radius: calc(var(--el-border-radius-base) - 2px);
    }
  }
}

.el-bubble-end {
  justify-content: end;
  flex-direction: row-reverse;

  .el-bubble-content-wrapper {
    align-items: flex-end;

    .el-bubble-content-corner {
      border-start-end-radius: calc(var(--el-border-radius-base) - 2px);
    }
  }
}

.el-bubble-avatar-placeholder {
  width: var(--el-bubble-avatar-placeholder-width);
  height: var(--el-bubble-avatar-placeholder-height);
}

.el-bubble-content-wrapper {
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  max-width: 100%;

  .el-bubble-header,
  .el-bubble-content,
  .el-bubble-footer {
    font-size: var(--el-font-size-base);
    color: var(--el-text-color-primary);
    line-height: var(--el-font-line-height-primary);
  }

  // .el-bubble-header {
  //   margin-bottom: var();
  // }

  .el-bubble-content {
    background-color: var(--el-fill-color);
    padding: var(--el-padding-sm) calc(var(--el-padding-sm) + 4px);
    border-radius: calc(var(--el-border-radius-base) + 4px);

    position: relative;
    box-sizing: border-box;
    min-width: 0;
    max-width: var(--bubble-content-max-width);
    color: var(--el-text-color-primary);
    font-size: var(--el-font-size-base);
    line-height: var(--el-font-line-height-primary);
    min-height: calc(
      var(--el-padding-sm) * 2 + var(--el-font-line-height-primary) *
        var(--el-font-size-base)
    );
    word-break: break-word;

    // 打字器没有内容时候展示高度
    .no-content {
      height: 16px;
    }
  }

  // 气泡圆角
  .el-bubble-content-round {
    border-radius: var(--el-border-radius-round);
  }

  // 气泡样式
  .el-bubble-content-filled {
    background-color: var(--el-fill-color);
  }

  .el-bubble-content-borderless {
    background-color: var(--el-fill-color);
    border: var(--el-border-width) solid var(--el-border-color);
  }

  .el-bubble-content-outlined {
    background: none;
    border: var(--el-border-width) solid var(--el-border-color);
  }

  .el-bubble-content-shadow {
    background: none;
    // box-shadow: var(--el-box-shadow-tertiary);
    box-shadow: var(--el-box-shadow);
  }

  .el-bubble-content-loading {
    .el-bubble-loading-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 16px;
      /* 盒子高度 */
      gap: 5px;
    }

    .dot {
      width: 5px;
      height: 5px;
      background-color: var(--el-color-primary);
      /* 点的颜色 */
      border-radius: 50%;
      /* 圆形 */
      animation: wave 1s infinite ease-in-out;
      /* 动画 */
    }

    /* 波浪动画 */
    @keyframes wave {
      0%,
      100% {
        transform: translateY(-2px);
      }

      50% {
        transform: translateY(2px);
        /* 上下波动 */
      }
    }
  }

  .el-bubble-footer {
    margin-top: var(--el-padding-sm);
  }
}
</style>
