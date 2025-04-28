<script setup lang="ts">
import type { VNode as ComponentVNode, CSSProperties } from 'vue'
import type { ConversationItem, ConversationMenu, ConversationMenuCommand } from '../types'
import { MoreFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  item: ConversationItem
  activeKey: string
  prefixIcon?: ComponentVNode | null
  suffixIcon?: ComponentVNode | null
  showTooltip?: boolean
  labelMaxWidth?: number
  menu?: ConversationMenu[]
  showBuiltInMenu?: boolean
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  tooltipOffset?: number
  menuPlacement?: 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
  menuOffset?: number
  menuMaxHeight?: number
  menuStyle?: CSSProperties
  menuShowArrow?: boolean
  menuClassName?: string
  menuTeleported?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', key: string): void
  (e: 'menuCommand', command: ConversationMenuCommand, item: ConversationItem): void
}>()

const slots = defineSlots()

const {
  item,
  activeKey,
  prefixIcon,
  suffixIcon,
  showTooltip,
  labelMaxWidth,
  menu,
  showBuiltInMenu,
  tooltipPlacement,
  tooltipOffset,
  menuPlacement,
  menuOffset,
  menuMaxHeight,
  menuStyle,
  menuShowArrow,
  menuClassName,
  menuTeleported,
} = toRefs(props)

// 添加hover状态跟踪
const isHovered = ref(false)

function handleMouseEnter() {
  isHovered.value = true
}

function handleMouseLeave() {
  isHovered.value = false
}

function handleClick(key: string) {
  emit('click', key)
}

const isTextOverflow = computed(() => {
  return (label: string) => {
    // 如果没有设置labelMaxWidth，直接返回false
    if (!labelMaxWidth.value)
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
    return textWidth > labelMaxWidth.value
  }
})

// 计算标签样式
const labelStyle = computed(() => {
  // 如果有labelMaxWidth，设置最大宽度并使用截断样式
  if (labelMaxWidth.value) {
    return {
      maxWidth: `${labelMaxWidth.value}px`,
      overflow: 'hidden',
    }
  }
  // 否则返回空对象
  return {}
})

const isShowMenuBtn = ref(false)

// 判断是否显示菜单
const shouldShowMenu = computed(() => {
  return isHovered.value || item.value.key === activeKey.value || isShowMenuBtn.value
})

/* 内置菜单 开始 */
const menuButtonRef = ref<any>(null)

// 合并菜单样式
const mergedMenuStyle = computed(() => {
  return {
    ...menuStyle.value,
  }
})

// 辅助函数：驼峰式转短横线格式
function camelToKebab(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

// 当菜单显示、隐藏时候触发
function updateMenuStatus(isOpen: boolean) {
  isShowMenuBtn.value = isOpen
  if (isOpen) {
    // 延迟执行，确保菜单已经渲染完成
    // 展开菜单时候 决定隐藏箭头
    nextTick(() => {
      // 获取页面的所有 conversation-dropdown-menu 组件
      const dropdownMenu = document.querySelectorAll('.conversation-dropdown-menu')
      if (dropdownMenu.length === 0) {
        return
      }
      dropdownMenu.forEach((dropdownMenuItem) => {
        // 将它子元素中所有 el-popper__arrow 元素的 display 设置为 none
        // 如果 dropdownMenuItem 存在，且display 不为 none
        if (dropdownMenuItem && (dropdownMenuItem as HTMLElement).style.display !== 'none') {
          // 隐藏箭头
          const arrows = dropdownMenuItem.querySelectorAll('.el-popper__arrow')
          if (arrows.length === 0) {
            return
          }
          arrows.forEach((arrow) => {
            (arrow as HTMLElement).style.display = menuShowArrow.value ? 'block' : 'none'
          })

          // 设置 .el-dropdown-menu__item 悬停样式
          const items = dropdownMenuItem.querySelectorAll('.el-dropdown-menu__item:not(.is-disabled)')
          if (items.length === 0) {
            return
          }
          items.forEach((item, index) => {
            if (!menu.value || menu.value.length === 0) {
              return
            }
            const menuItemHoverStyle = menu.value[index].menuItemHoverStyle || {}
            // 生成固定类名（基于索引）
            const className = `custom-hover-${index}`
            item.classList.add(className)
            // 动态插入样式规则
            const style = document.createElement('style')
            style.textContent = `
              .${className}:hover,
              .${className}:focus {
                ${Object.entries(menuItemHoverStyle)
                  .map(([prop, val]) => `${camelToKebab(prop)}: ${val} !important;`)
                  .join(' ')}
              }
            `
            document.head.appendChild(style)
          })
        }
      })
    })
  }
}

// 菜单命令处理
function nemuCommand(command: string | number | object, item: ConversationItem) {
  // 如果已经有自定义插槽，则不执行这个函数
  // 菜单的所有内容由开发者自行处理
  if (slots.menu) {
    return false
  }
  emit('menuCommand', command, item)
}

/* 内置菜单 结束 */
</script>

<template>
  <li
    :key="item.key"
    class="conversation-item"
    :class="{
      disabled: item.disabled,
      active: item.key === activeKey,
      hovered: isHovered,
      menuopened: isShowMenuBtn,
    }"
    @click="handleClick(item.key)"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="conversation-content">
      <!-- 标签区域 - 通过插槽自定义 -->
      <div class="conversation-content-main">
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
              :placement="tooltipPlacement"
              :offset="tooltipOffset"
              effect="dark"
            >
              <span
                class="conversation-label"
                :class="{ 'text-gradient': isTextOverflow(item.label) }"
                :style="labelStyle"
              >{{ item.label }}</span>
            </ElTooltip>
            <span
              v-else
              class="conversation-label"
              :class="{ 'text-gradient': isTextOverflow(item.label) }"
              :style="labelStyle"
            >{{ item.label }}</span>
          </div>
        </slot>
      </div>

      <!-- 后缀图标 -->
      <span v-if="suffixIcon" class="conversation-suffix-icon">
        <ElIcon>
          <component :is="suffixIcon" />
        </ElIcon>
      </span>

      <!-- 菜单区域 - 只在hover或active状态下显示 -->
      <div v-if="shouldShowMenu && showBuiltInMenu">
        <div v-if="menu && menu.length" ref="menuButtonRef" class="conversation-dropdown-more" @click="(e) => e.stopPropagation()">
          <el-dropdown
            trigger="click"
            :placement="menuPlacement"
            :offset="menuOffset"
            :teleported="menuTeleported"
            :popper-class="menuClassName ? `conversation-dropdown-menu ${menuClassName}` : 'conversation-dropdown-menu'"
            :max-height="menuMaxHeight"
            :disabled="item.disabled"
            @visible-change="updateMenuStatus"
            @command="(command: string | number | object) => nemuCommand(command, item)"
          >
            <template #default>
              <slot name="more-filled">
                <el-icon class="conversation-dropdown-more-icon">
                  <MoreFilled />
                </el-icon>
              </slot>
            </template>
            <template #dropdown>
              <slot name="menu">
                <el-dropdown-menu :style="mergedMenuStyle">
                  <el-dropdown-item
                    v-for="menuItem in menu"
                    :key="menuItem.key"
                    :icon="menuItem.icon"
                    :disabled="menuItem.disabled"
                    :divided="menuItem.divided"
                    :command="menuItem.command"
                    :style="menuItem.menuItemStyle"
                  >
                    {{ menuItem.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </slot>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.conversation-item {
  padding: 14px 10px;
  margin-right: 20px;
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

  &.hovered, &:hover {
    background-color: #f0f0f0;
  }

  &.menuopened {
    background-color: #f0f0f0;
  }
}

.conversation-content {
  display: flex;
  align-items: center;
  height: var(--conversation-label-height, 20px);

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
    font-size: 14px;
    color: #303133;
    position: relative;
    white-space: nowrap;

    &.text-gradient {
      mask-image: linear-gradient(to right, black 60%, transparent 100%);
      -webkit-mask-image: linear-gradient(to right, black 60%, transparent 100%);
    }
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

  .conversation-dropdown-more {
    justify-self: center;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .conversation-dropdown-more-icon {
    font-size: 16px;
    padding: 2px;
    border-radius: 5px;
    &:hover {
      background-color: #d3d3d3;
    }
  }

  .conversation-menu {
    margin-left: 8px;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s ease;

    .hovered &, .active & {
      opacity: 1;
    }
  }
}
</style>
