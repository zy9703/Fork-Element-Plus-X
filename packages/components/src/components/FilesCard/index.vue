<script setup lang="ts">
import type { FilesCardProps } from './types.d.ts'
import svgIconMap from './fileSvg/index.ts'

const props = withDefaults(defineProps<FilesCardProps>(), {
  uid: undefined,
  name: undefined,
  fileSize: undefined,
  fileType: undefined,
  description: undefined,
  url: undefined,
  thumbUrl: undefined,
  fontSize: '42px',
  iconColor: '#00C8FF',
  maxWidth: '236px',
  noStyle: false,
})
</script>

<template>
  <div
    v-bind="$attrs" :style="{
      '--elx-files-card-icon-size': `${props.fontSize}`,
      '--elx-files-card-max-width': `${props.maxWidth}`,
    }" :class="{
      'elx-files-card': !props.noStyle,
      'elx-files-card-nostyle': props.noStyle,
    }"
  >
    <slot v-if="$slots.icon || fileType" name="icon" v-bind="{ item: props }">
      <component :is="svgIconMap[fileType]" class="elx-files-card-icon" :color="props.iconColor" />
    </slot>

    <slot
      v-if="$slots.content || props.name || props.description"
      name="content"
      v-bind="{ item: props }"
    >
      <div class="elx-files-card-content">
        <div v-if="props.name" class="elx-files-card-name">
          <div class="elx-files-card-name-prefix">
            <div class="elx-files-card-name-suffix" />
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
.elx-files-card {
  padding: 12px;
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  align-items: flex-start;
  border-radius: 6px;
  position: relative;
  background: rgba(0, 0, 0, 0.06);
  max-width: var(--elx-files-card-max-width);
}

.elx-files-card-icon {
  font-size: var(--elx-files-card-icon-size);
}

.elx-files-card-content {
  flex: auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .elx-files-card-name {
    display: flex;
    flex-wrap: nowrap;
    max-width: 100%;

    .elx-files-card-name-prefix {
      flex: 0 1 auto;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .elx-files-card-name-suffix {
      flex: none;
    }
  }
}
</style>
