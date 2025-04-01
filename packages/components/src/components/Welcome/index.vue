<script setup lang="ts">
import type { WelcomeProps } from './types'
import { computed } from 'vue'

const props = withDefaults(defineProps<WelcomeProps>(), {
  variant: 'filled',
  direction: 'ltr',
})

const containerClass = computed(() => [
  props.prefixCls || 'welcome',
  props.className,
  props.rootClassName,
  `welcome-${props.variant}`,
  {
    'welcome-rtl': props.direction === 'rtl',
  },
])

const iconClass = computed(() => props.classNames?.icon)
const titleClass = computed(() => props.classNames?.title)
const extraClass = computed(() => props.classNames?.extra)
const descriptionClass = computed(() => props.classNames?.description)
</script>

<template>
  <div
    :class="containerClass"
    :style="style"
    class="welcome-container"
  >
    <!-- S Icon -->
    <div
      v-if="icon"
      :class="iconClass"
      :style="styles?.icon"
      class="welcome-icon"
    >
      <img
        v-if="typeof icon === 'string' && icon.startsWith('http')"
        :src="icon"
        alt="icon"
        class="icon-image"
      >
      <el-icon v-else>
        <component :is="icon" />
      </el-icon>
    </div>
    <!-- E Icon -->

    <div class="content-wrapper">
      <!-- S 标题 & Extra -->
      <div
        v-if="title || extra"
        class="title-wrapper"
      >
        <h4
          v-if="title"
          :class="titleClass"
          :style="styles?.title"
          class="welcome-title"
        >
          {{ title }}
        </h4>
        <div
          v-if="extra || $slots.extra"
          :class="extraClass"
          :style="styles?.extra"
          class="welcome-extra"
        >
          <slot name="extra">
            {{ extra }}
          </slot>
        </div>
      </div>
      <!-- E 标题 & Extra -->

      <!-- S 描述信息 -->
      <p
        v-if="description"
        :class="descriptionClass"
        :style="styles?.description"
        class="welcome-description"
      >
        {{ description }}
      </p>
      <!-- E 描述信息 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.welcome-container {
  display: flex;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;

  &.welcome-filled {
    background-color: #e6f4ff;
    border: 1px solid #91caff;
  }

  &.welcome-borderless {
    border: none;
  }

  &.welcome-rtl {
    direction: rtl;
  }
}

.welcome-icon {
  // 图标容器样式
  flex: 0 0 auto;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  font-size: 24px;

  .icon-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 4px;
  }

  // 小尺寸适配
  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
  }
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.welcome-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.88);
}

.welcome-extra {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  /* 如果内容需要换行 */
  :deep(*) {
    flex-shrink: 0;
  }
}

.welcome-description {
  margin: 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;
}
</style>
