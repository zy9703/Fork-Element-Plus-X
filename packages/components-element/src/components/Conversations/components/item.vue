<script>
export default {
  name: 'ConversationItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    itemsStyle: {
      type: Object,
      default: () => ({})
    },
    itemsHoverStyle: {
      type: Object,
      default: () => ({})
    },
    itemsActiveStyle: {
      type: Object,
      default: () => ({})
    },
    itemsMenuOpenedStyle: {
      type: Object,
      default: () => ({})
    },
    prefixIcon: {
      type: [Object, null],
      default: null
    },
    suffixIcon: {
      type: [Object, null],
      default: null
    },
    showTooltip: {
      type: Boolean,
      default: false
    },
    labelMaxWidth: {
      type: Number,
      default: undefined
    },
    menu: {
      type: Array,
      default: () => []
    },
    showBuiltInMenu: {
      type: Boolean,
      default: false
    },
    tooltipPlacement: {
      type: String,
      default: 'top'
    },
    tooltipOffset: {
      type: Number,
      default: 12
    },
    menuPlacement: {
      type: String,
      default: 'bottom-start'
    },
    menuOffset: {
      type: Number,
      default: 50
    },
    menuMaxHeight: {
      type: Number,
      default: undefined
    },
    menuStyle: {
      type: Object,
      default: () => ({})
    },
    menuShowArrow: {
      type: Boolean,
      default: false
    },
    menuClassName: {
      type: String,
      default: ''
    },
    menuTeleported: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isHovered: false,
      isShowMenuBtn: false
    }
  },
  computed: {
    prefixIconRender() {
      return this.renderIcon(this.prefixIcon)
    },
    suffixIconRender() {
      return this.renderIcon(this.suffixIcon)
    },
    isTextOverflow() {
      return (label = '') => {
        // 如果没有设置labelMaxWidth，直接返回false
        if (!this.labelMaxWidth) return false

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
        return textWidth > this.labelMaxWidth
      }
    },
    labelStyle() {
      // 如果有labelMaxWidth，设置最大宽度并使用截断样式
      if (this.labelMaxWidth) {
        return {
          maxWidth: `${this.labelMaxWidth}px`,
          overflow: 'hidden'
        }
      }
      // 否则返回空对象
      return {}
    },
    shouldShowMenu() {
      return this.isHovered || this.active || this.isShowMenuBtn
    },
    mergedMenuStyle() {
      return {
        ...this.menuStyle
      }
    }
  },
  methods: {
    renderIcon(icon) {
      if (!icon) return null
      return icon
    },
    handleMouseEnter() {
      this.isHovered = true
    },
    handleMouseLeave() {
      this.isHovered = false
    },
    handleClick(key) {
      this.$emit('click', key)
    },
    // 辅助函数：驼峰式转短横线格式
    camelToKebab(str) {
      return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
    },
    // 当菜单显示、隐藏时候触发
    updateMenuStatus(isOpen) {
      this.isShowMenuBtn = isOpen
      if (isOpen) {
        // 延迟执行，确保菜单已经渲染完成
        // 展开菜单时候 决定隐藏箭头
        this.$nextTick(() => {
          // 获取页面的所有 conversation-dropdown-menu 组件
          const dropdownMenu = document.querySelectorAll('.conversation-dropdown-menu')
          if (dropdownMenu.length === 0) {
            return
          }
          dropdownMenu.forEach((dropdownMenuItem) => {
            // 将它子元素中所有 el-popper__arrow 元素的 display 设置为 none
            // 如果 dropdownMenuItem 存在，且display 不为 none
            if (dropdownMenuItem && dropdownMenuItem.style.display !== 'none') {
              // 隐藏箭头
              const arrows = dropdownMenuItem.querySelectorAll('.el-popper__arrow')
              if (arrows.length === 0) {
                return
              }
              arrows.forEach((arrow) => {
                arrow.style.display = this.menuShowArrow ? 'block' : 'none'
              })

              // 设置 .el-dropdown-menu__item 悬停样式
              const items = dropdownMenuItem.querySelectorAll('.el-dropdown-menu__item:not(.is-disabled)')
              if (items.length === 0) {
                return
              }
              items.forEach((item, index) => {
                if (!this.menu || this.menu.length === 0) {
                  return
                }
                const menuItemHoverStyle = this.menu[index].menuItemHoverStyle || {}
                // 生成固定类名（基于索引）
                const className = `custom-hover-${index}`
                item.classList.add(className)
                // 动态插入样式规则
                const style = document.createElement('style')
                style.textContent = `
                  .${className}:hover,
                  .${className}:focus {
                    ${Object.entries(menuItemHoverStyle)
                      .map(([prop, val]) => `${this.camelToKebab(prop)}: ${val} !important;`)
                      .join(' ')}
                  }
                `
                document.head.appendChild(style)
              })
            }
          })
        })
      }
    },
    // 菜单命令处理
    menuCommand(command, item) {
      // 如果已经有自定义插槽，则不执行这个函数
      // 菜单的所有内容由开发者自行处理
      if (this.$slots.menu) {
        return false
      }
      this.$emit('menuCommand', command, item)
    }
  }
}
</script>

<template>
  <li
    :key="item.key"
    class="conversation-item"
    :class="{
      disabled: item.disabled,
      active: active,
      hovered: item.disabled ? false : isHovered,
      'menu-opened': isShowMenuBtn,
    }"
    :style="{
      ...itemsStyle,
      ...(isHovered ? itemsHoverStyle : {}),
      ...(isShowMenuBtn ? itemsMenuOpenedStyle : {}),
      ...(active ? itemsActiveStyle : {}),
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
          <span v-if="prefixIconRender" class="conversation-prefix-icon">
            <el-icon>
              <component :is="prefixIconRender" />
            </el-icon>
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
      <span v-if="suffixIconRender" class="conversation-suffix-icon">
        <ElIcon>
          <component :is="suffixIconRender" />
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
            @command="(command) => menuCommand(command, item)"
          >
            <template #default>
              <slot
                name="more-filled"
                v-bind="{
                  item,
                  isHovered: item.disabled ? false : isHovered,
                  isActive: active,
                  isMenuOpened: isShowMenuBtn,
                  isDisabled: item.disabled,
                }"
              >
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

<style lang="scss" scoped>
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

  &.menu-opened {
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