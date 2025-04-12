<script setup lang="ts">
import type { ConversationItem, ConversationMenu } from '../types'
import type { VNode as ComponentVNode } from 'vue'
// import { MoreFilled } from '@element-plus/icons-vue'

const { item, activeKey, prefixIcon, suffixIcon, showTooltip, labelMaxWidth, renderLabel, renderMenu } = defineProps<{
  item: ConversationItem<boolean>
  activeKey: string
  prefixIcon?: ComponentVNode | null
  suffixIcon?: ComponentVNode | null
  showTooltip?: boolean
  labelMaxWidth?: number
  menu?: ConversationMenu[]
  renderLabel?: () => ComponentVNode // 添加renderLabel属性，用于自定义label渲染
  renderMenu?: () => ComponentVNode // 添加renderMenu属性，用于自定义menu渲染
}>()

const emit = defineEmits<{
  (e: 'click', key: string): void
}>()

function handleClick(key: string) {
  emit('click', key)
}

const isTextOverflow = computed(() => {
  return (label: string) => {
    // 判断文本是否溢出
    if (!labelMaxWidth)
      return false

    // 创建一个临时的span元素来测量文本宽度
    const span = document.createElement('span')
    span.style.visibility = 'hidden'
    span.style.position = 'absolute'
    span.style.whiteSpace = 'nowrap'
    span.style.fontSize = '14px' // 与CSS中定义的字体大小一致
    span.textContent = label

    document.body.appendChild(span)
    const textWidth = span.offsetWidth
    document.body.removeChild(span)

    // 如果文本宽度大于最大宽度，则返回true表示溢出
    return textWidth > labelMaxWidth
  }
})
</script>

<template>
  <li
    :key="item.key"
    class="conversation-item"
    :class="{
      disabled: item.disabled,
      active: item.key === activeKey,
    }"
    @click="handleClick(item.key)"
  >
    <div class="conversation-content">
      <!-- label区域，支持自定义渲染或默认渲染 -->
      <div class="conversation-content-main">
        <!-- 使用renderLabel属性或label插槽进行自定义渲染 -->
        <template v-if="renderLabel">
          <component :is="renderLabel()" />
        </template>
        <template v-else>
          <!-- 默认label渲染 -->
          <slot name="label">
            <!-- 前缀图标 -->
            <span v-if="prefixIcon" class="conversation-prefix-icon">
              <ElIcon>
                <component :is="prefixIcon" />
              </ElIcon>
            </span>

            <!-- 标签和时间戳 -->
            <div class="conversation-label-container">
              <ElTooltip
                v-if="showTooltip && isTextOverflow(item.label)"
                :content="item.label"
                placement="top"
                effect="dark"
              >
                <span
                  class="conversation-label"
                  :style="{ maxWidth: `${labelMaxWidth}px` }"
                >{{ item.label }}</span>
              </ElTooltip>
              <span
                v-else
                class="conversation-label"
                :style="{ maxWidth: `${labelMaxWidth}px` }"
              >{{ item.label }}</span>
              <span v-if="item.timestamp" class="conversation-timestamp">{{ item.timestamp }}</span>
            </div>
          </slot>
        </template>
      </div>

      <!-- 后缀图标 -->
      <span v-if="suffixIcon" class="conversation-suffix-icon">
        <ElIcon>
          <component :is="suffixIcon" />
        </ElIcon>
      </span>

      <!-- 菜单区域，支持自定义插槽或renderMenu -->
      <template v-if="renderMenu">
        <component :is="renderMenu()" />
      </template>
      <template v-else>
        <slot name="menu">
          <span v-if="menu?.length" class="conversation-menu">
            <!-- <ElDropdown>
              <span>
                打开
              </span>
            </ElDropdown> -->
          </span>
        </slot>
      </template>
    </div>
  </li>
</template>

<style scoped lang="scss">
.conversation-item {
  padding: 14px 4px 14px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  & + & {
    margin-top: 4px;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #c0c4cc;
  }

  &.active {
    background-color: #f0f0f0;
  }

  &:hover {
    background-color: #f0f0f0;
  }
}

.conversation-content {
  display: flex;
  align-items: center;

  .conversation-prefix-icon {
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .conversation-content-main {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .conversation-label-container {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }

  .conversation-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #303133;
  }

  .conversation-timestamp {
    font-size: 14px;
    color: #909399;
    margin-left: 8px;
  }

  .conversation-suffix-icon {
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .conversation-menu {
    margin-left: 8px;
  }
}
</style>
