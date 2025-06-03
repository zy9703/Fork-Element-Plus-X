<!-- Conversations 组件 - Vue 2 版本 -->
<script>
import Item from './components/item.vue';
import { get } from 'radash'; // 引入 radash 库的 get 方法，用于安全地获取对象属性

export default {
  name: 'A3Conversations',
  components: {
    Item
  },
  props: {
    active: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
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
    customStyle: { // TODO区分 style
      type: Object,
      default: () => ({})
    },
    showTooltip: {
      type: Boolean,
      default: false
    },
    groupable: {
      type: [Boolean, Object],
      default: false
    },
    labelMaxWidth: {
      type: Number,
      default: undefined
    },
    labelHeight: {
      type: Number,
      default: 20
    },
    showBuiltInMenu: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Array,
      default: () => [
        {
          label: '重命名',
          key: 'rename',
          icon: null, // Vue 2 中不直接使用组件作为 icon，需要特殊处理或使用字符串
          command: 'rename'
        },
        {
          label: '删除',
          key: 'delete',
          icon: null, // Vue 2 中不直接使用组件作为 icon，需要特殊处理或使用字符串
          command: 'delete',
          menuItemHoverStyle: {
            color: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.1)'
          }
        }
      ]
    },
    ungroupedTitle: {
      type: String,
      default: '未分组'
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
    menuOffset: { // Vue 2 中 ElDropdown 没有 menuOffset 属性，需要通过 style 或其他方式调整位置
      type: Number,
      default: 50
    },
    menuShowArrow: { // Vue 2 中 ElDropdown 没有 menuShowArrow 属性
      type: Boolean,
      default: false
    },
    menuClassName: {
      type: String,
      default: ''
    },
    menuMaxHeight: {
      type: Number,
      default: undefined
    },
    menuTeleported: { // Vue 2 中 ElDropdown 没有 teleported 属性，默认就是 teleported
      type: Boolean,
      default: true
    },
    menuStyle: {
      type: Object,
      default: () => ({})
    },
    loadMoreLoading: {
      type: Boolean,
      default: false
    },
    showToTopBtn: {
      type: Boolean,
      default: false
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    rowKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      showScrollTop: false,
      groupRefs: {},
      // 使用 Set 存储吸顶组的 key
      stickyGroupKeys: new Set(),
      // 存储 ResizeObserver 实例
      resizeObserver: null,
    };
  },
  computed: {
    activeKey: {
      get() {
        return this.active;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    // 将传入的样式与默认样式合并
    mergedStyle() {
      const defaultStyle = {
        padding: '10px 0 10px 10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        width: '280px',
        height: '0'
      };
      return { ...defaultStyle, ...this.customStyle };
    },
    // 处理项目数据，添加唯一键和标签
    itemsUse() {
      return this.items.map((item, index) => ({
        ...item,
        // 使用引入的 get 方法获取属性值
        uniqueKey: this.rowKey ? get(item, this.rowKey) : index.toString(),
        label: get(item, this.labelKey)
      }));
    },
    // 判断是否需要使用分组
    shouldUseGrouping() {
      return !!this.groupable;
    },
    // 根据搜索值过滤项目 (Vue 3 中 filteredItems 依赖 search，这里简化处理)
    filteredItems() {
      return this.itemsUse; // 假设没有搜索过滤
    },
    // 根据分组方式进行分组
    groups() {
      // 如果不需要分组，则返回空数组
      if (!this.shouldUseGrouping) return [];

      // 检查filteredItems是否有值
      if (!this.filteredItems || this.filteredItems.length === 0) {
        return [];
      }

      // 用于存储每个组的项目
      const groupMap = {};

      // 使用过滤后的项目进行分组
      this.filteredItems.forEach((item) => {
        let groupName = null;

        // 优先使用item中的group字段
        if (item.group) {
          groupName = item.group;
        }
        // 如果没有找到分组，使用未分组
        const finalGroupName = groupName || this.ungroupedTitle;

        // 若该组尚未创建，则创建一个新组
        if (!groupMap[finalGroupName]) {
          groupMap[finalGroupName] = {
            title: finalGroupName,
            key: finalGroupName,
            children: [],
            isUngrouped: !groupName // 如果没有找到组名，则标记为未分组
          };
        }

        // 将项目添加到相应的组中
        groupMap[finalGroupName].children.push(item);
      });

      // 将分组转换为数组
      const groupArray = Object.values(groupMap);

      // 如果有自定义排序函数，使用它排序
      if (typeof this.groupable === 'object' && this.groupable.sort) {
        return groupArray.sort((a, b) => {
          // 确保未分组总是在最后
          if (a.isUngrouped) return 1;
          if (b.isUngrouped) return -1;

          const sortFn = this.groupable.sort;
          return sortFn ? sortFn(a.key, b.key) : 0;
        });
      }

      // 否则只确保未分组在最后，不做其他排序
      return groupArray.sort((a, b) => {
        // 确保未分组总是在最后
        if (a.isUngrouped) return 1;
        if (b.isUngrouped) return -1;

        // 不做其他排序
        return 0;
      });
    }
  },
  mounted() {
    // 组件挂载后初始化第一个标题为吸顶状态
    if (this.shouldUseGrouping && this.groups.length > 0) {
      // 添加第一个组的key到吸顶状态集合中
      this.stickyGroupKeys.add(this.groups[0].key);
    }

    // 初始化 ResizeObserver 监听滚动容器大小变化
    // 注意：ResizeObserver 是较新的 API，可能需要 polyfill 或降级处理
    if (typeof ResizeObserver !== 'undefined' && this.$refs.scrollbarRef && this.$refs.scrollbarRef.wrap) {
      this.resizeObserver = new ResizeObserver(() => {
        // 当滚动容器大小变化时，重新检查吸顶状态
        this.updateStickyStatus({}); // 传递一个空对象作为事件参数，因为 updateStickyStatus 不直接使用事件对象
      });
      this.resizeObserver.observe(this.$refs.scrollbarRef.wrap);
    }
  },
  beforeDestroy() {
    // 在组件销毁前断开 ResizeObserver 的监听
    if (this.resizeObserver && this.$refs.scrollbarRef && this.$refs.scrollbarRef.wrap) {
      this.resizeObserver.unobserve(this.$refs.scrollbarRef.wrap);
      this.resizeObserver.disconnect();
    }
  },
  methods: {
    // 从对象中获取属性值的辅助函数 (已移至 computed 中的 itemsUse)
    // get(obj, path, defaultValue) { ... },

    // 处理点击事件
    handleClick(item) {
      // 如果是disabled状态，则不允许选中
      if (item.disabled) return;
      this.$emit('change', item);
      // 触发 input 事件更新父组件的 v-model
      this.$emit('input', item.uniqueKey);
    },
    // 监听滚动事件
    handleScroll(e) {
      // 显示/隐藏回到顶部按钮
      const scrollTop = e.scrollTop;
      this.showScrollTop = scrollTop > 200;

      // 获取当前滚动容器
      const scrollbar = this.$refs.scrollbarRef;
      if (!scrollbar) return;

      // 使用scrollbar的wrapRef获取真实DOM以获取正确的尺寸
      const wrap = scrollbar.wrap;
      if (!wrap) return;

      // 检查是否需要加载更多
      // 当滚动到距离底部20px时触发加载
      const bottomOffset = 20;
      const scrollHeight = wrap.scrollHeight;
      const clientHeight = wrap.clientHeight;

      // 计算是否接近底部
      const isNearBottom = scrollHeight - scrollTop - clientHeight < bottomOffset;

      if (isNearBottom) {
        this.loadMoreData();
      }

      // 更新吸顶状态
      this.updateStickyStatus(); // 传递事件对象（实际没用到暂时不传）
    },
    // 更新标题吸顶状态
    updateStickyStatus() {
      if (!this.shouldUseGrouping || this.groups.length === 0) return;

      // 先清空当前的吸顶组
      this.stickyGroupKeys.clear();

      // 获取滚动容器
      const scrollContainer = this.$refs.scrollbarRef ? this.$refs.scrollbarRef.wrap : null;
      if (!scrollContainer) return;

      // 如果只有一个分组，直接设置为吸顶状态
      if (this.groups.length === 1) {
        this.stickyGroupKeys.add(this.groups[0].key);
        return;
      }

      const scrollContainerTop = scrollContainer.getBoundingClientRect().top;
      const containerHeight = scrollContainer.clientHeight;
      const scrollHeight = scrollContainer.scrollHeight;
      const scrollTop = scrollContainer.scrollTop;

      // 判断是否已经滚动到底部
      const isNearBottom = scrollHeight - scrollTop - containerHeight < 20;

      // 如果已接近底部，直接使最后一个分组吸顶
      if (isNearBottom && this.groups.length > 0) {
        this.stickyGroupKeys.add(this.groups[this.groups.length - 1].key);
        return;
      }

      // 检查每个分组的位置
      const visibleGroups = [];

      // 收集所有可见的分组
      for (const group of this.groups) {
        const groupElement = this.groupRefs[group.key];
        if (groupElement) {
          const groupRect = groupElement.getBoundingClientRect();
          const relativeTop = groupRect.top - scrollContainerTop;

          // 分组至少部分可见
          if ((relativeTop < containerHeight && relativeTop + groupRect.height > 0)) {
            visibleGroups.push({
              group,
              relativeTop,
              height: groupRect.height
            });
          }
        }
      }

      // 对可见分组按相对位置排序
      visibleGroups.sort((a, b) => a.relativeTop - b.relativeTop);

      // 如果有可见分组
      if (visibleGroups.length > 0) {
        // 寻找第一个完全进入视口的分组
        const fullyVisibleGroup = visibleGroups.find(g => g.relativeTop >= 0);

        if (fullyVisibleGroup) {
          // 如果有完全进入视口的分组，选择它
          this.stickyGroupKeys.add(fullyVisibleGroup.group.key);
        } else {
          // 否则选择第一个部分可见的分组（通常是标题已经滚出但内容还可见的）
          this.stickyGroupKeys.add(visibleGroups[0].group.key);
        }
      } else if (this.groups.length > 0) {
        // 如果没有可见分组，则选择第一个分组
        this.stickyGroupKeys.add(this.groups[0].key);
      }
    },
    // 加载更多数据
    loadMoreData() {
      // 在 Vue 2 中使用 $listeners 检查事件监听器是否存在
      if (this.$listeners.loadMore) return;
      this.$emit('loadMore');
    },
    // 滚动到顶部
    scrollToTop() {
      if (this.$refs.scrollbarRef) {
        // 在 Vue 2 中直接访问 wrap 元素的 scrollTop 属性
        this.$refs.scrollbarRef.wrap.scrollTop = 0;
      }
    },
    // 菜单 item 点击事件
    handleMenuItemClick(command, item) {
      this.$emit('menuCommand', command, item);
    },
    // 绑定分组引用
    bindGroupRef(el, item) {
      if (el) {
        this.groupRefs[item.key] = el;
      }
    }
  }
};
</script>

<template>
  <div
    class="conversations-container" :style="{
      '--conversation-label-height': `${labelHeight}px`,
      '--conversation-list-auto-bg-color': mergedStyle.backgroundColor,
    }"
  >
    <slot name="header" />
    <ul class="conversations-list" :style="mergedStyle">
      <!-- 滚动区域容器 -->
      <li class="conversations-scroll-wrapper">
        <el-scrollbar ref="scrollbarRef" height="100%" class="custom-scrollbar" always @scroll="handleScroll">
          <div class="scroll-content">
            <template v-if="shouldUseGrouping">
              <!-- 分组显示 -->
              <div
                v-for="group in groups" :key="group.key" :ref="el => bindGroupRef(el, group)"
                class="conversation-group"
              >
                <div
                  class="conversation-group-title sticky-title"
                  :class="{ 'active-sticky': stickyGroupKeys.has(group.key) }"
                >
                  <slot name="groupTitle" v-bind="{ group }">
                    {{ group.title }}
                  </slot>
                </div>
                <div class="conversation-group-items">
                  <Item
                    v-for="item in group.children" :key="item.uniqueKey" :item="item"
                    :active="item.uniqueKey === activeKey" :items-style="itemsStyle"
                    :items-hover-style="itemsHoverStyle" :items-active-style="itemsActiveStyle"
                    :items-menu-opened-style="itemsMenuOpenedStyle" :prefix-icon="item.prefixIcon"
                    :show-tooltip="showTooltip" :tooltip-placement="tooltipPlacement"
                    :tooltip-offset="tooltipOffset" :suffix-icon="item.suffixIcon" :active-key="activeKey || ''"
                    :label-max-width="labelMaxWidth" :menu="menu" :show-built-in-menu="showBuiltInMenu"
                    :menu-placement="menuPlacement" :menu-offset="menuOffset"
                    :menu-max-height="menuMaxHeight" :menu-style="menuStyle"
                    :menu-show-arrow="menuShowArrow" :menu-class-name="menuClassName"
                    :menu-teleported="menuTeleported" @click="handleClick(item)"
                    @menu-command="handleMenuItemClick"
                  >
                    <!-- 传递插槽 -->
                    <template v-if="$slots.label" #label>
                      <slot name="label" v-bind="{ item }" />
                    </template>

                    <template v-if="$slots['more-filled']" #more-filled="moreFilledSoltProps">
                      <slot name="more-filled" v-bind="moreFilledSoltProps" />
                    </template>

                    <template v-if="$slots.menu" #menu>
                      <slot name="menu" v-bind="{ item }" />
                    </template>
                  </Item>
                </div>
              </div>
            </template>

            <template v-else>
              <Item
                v-for="item in filteredItems" :key="item.uniqueKey" :item="item" :items-style="itemsStyle"
                :items-hover-style="itemsHoverStyle" :items-active-style="itemsActiveStyle"
                :active="item.uniqueKey === activeKey" :items-menu-opened-style="itemsMenuOpenedStyle"
                :prefix-icon="item.prefixIcon" :show-tooltip="showTooltip" :tooltip-placement="tooltipPlacement"
                :tooltip-offset="tooltipOffset" :suffix-icon="item.suffixIcon" :active-key="activeKey || ''"
                :label-max-width="labelMaxWidth" :menu="menu" :show-built-in-menu="showBuiltInMenu"
                :menu-placement="menuPlacement" :menu-offset="menuOffset"
                :menu-max-height="menuMaxHeight" :menu-style="menuStyle"
                :menu-show-arrow="menuShowArrow" :menu-class-name="menuClassName"
                :menu-teleported="menuTeleported" @click="handleClick(item)" @menu-command="handleMenuItemClick"
              >
                <!-- 传递插槽 -->
                <template v-if="$slots.label" #label>
                  <slot name="label" v-bind="{ item }" />
                </template>

                <template v-if="$slots['more-filled']" #more-filled="moreFilledSoltProps">
                  <slot name="more-filled" v-bind="moreFilledSoltProps" />
                </template>

                <template v-if="$slots.menu" #menu>
                  <slot name="menu" v-bind="{ item }" />
                </template>
              </Item>
            </template>
          </div>

          <!-- 加载更多 -->
          <div v-if="loadMoreLoading" class="conversations-load-more">
            <slot name="load-more">
              <i class="el-icon-loading conversations-load-more-is-loading" />
              <span>加载更多...</span>
            </slot>
          </div>
        </el-scrollbar>
      </li>
    </ul>
    <slot name="footer" />
    <!-- 滚动到顶部按钮 -->
    <el-button v-show="showScrollTop && showToTopBtn" class="scroll-to-top-btn" circle @click="scrollToTop">
      <el-icon>
        <Top />
      </el-icon>
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.conversations-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: fit-content;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.conversations-list {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.conversations-scroll-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;

  /* 在右侧添加留白区域 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    /* 右侧留白宽度 */
    height: 100%;
    background-color: transparent;
    pointer-events: none;
    /* 确保不影响交互 */
  }
}

// 加载更多
.conversations-load-more {
  display: flex;
  width: calc(100% - 20px);
  padding: 4px 0;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  gap: 3px;
  height: 100%;
  color: #909399;
  background-color: var(--conversation-list-auto-bg-color, #fff);
}

// 加载动画
.conversations-load-more-is-loading {
  margin-top: 2px;
  animation: spinloading 2s linear infinite;
}

@keyframes spinloading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.scroll-content {
  min-height: 100%;
}

.loading-more {
  text-align: center;
  padding: 10px 0;
  color: #909399;
  font-size: 14px;
}

.conversation-group {
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  .conversation-group-title {
    font-size: 14px;
    color: #909399;
    padding: 8px 0;
    font-weight: 500;
    margin-bottom: 4px;
    border-radius: 4px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    // 预留滚动条宽度
    width: calc(100% - 10px);
    box-sizing: border-box;
  }

  .sticky-title {
    position: sticky;
    top: 0;
    z-index: 20;
    background-color: var(--conversation-list-auto-bg-color, #fff);
  }

  .active-sticky {
    z-index: 10;
  }

  .conversation-group-items {
    padding-top: 0;
  }
}

.scroll-to-top-btn {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 99;
  opacity: 0.8;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
}
</style>