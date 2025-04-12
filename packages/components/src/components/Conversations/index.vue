<script setup lang="ts">
import type { ElScrollbar } from 'element-plus'
import type { Conversation, ConversationItem } from './types'
import { Search, Top } from '@element-plus/icons-vue'
import Item from './components/item.vue'

const props = withDefaults(defineProps<Conversation>(), {
  items: () => [],
  style: () => ({}),
  showTooltip: () => false,
  groupable: () => false,
  labelMaxWidth: () => 110,
  menu: () => [],
  renderLabel: undefined,
  renderMenu: undefined,
})

// 定义搜索值模型
const searchModel = defineModel<string>('search', { required: false })

// 当未绑定search属性但提供了searchMethod时，使用内部状态
const internalSearchValue = ref('')

// 实际用于搜索的值
const actualSearchValue = computed(() => {
  // 如果明确绑定了search属性，使用searchModel
  if (props.search !== undefined) {
    return searchModel.value || ''
  }
  // 否则使用内部状态
  return internalSearchValue.value
})

// 判断是否显示搜索框 - 当存在 search 或 searchMethod 时显示
const shouldShowSearch = computed(() => {
  // 检查props中是否明确传入了search或searchMethod
  return props.search !== undefined || props.searchMethod !== undefined
})

// 将传入的样式与默认样式合并
const mergedStyle = computed(() => {
  const defaultStyle = {
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '280px',
    height: '100%',
  }
  return { ...defaultStyle, ...props.style }
})

const activeKey = defineModel<string>('active', { required: false })

// 获取第一个非disabled的item的key，作为备选值
const firstAvailableKey = computed(() => {
  return props.items.find(item => !item.disabled)?.key || ''
})

// 如果defaultActiveKey对应的项不是disabled，则使用defaultActiveKey，否则使用第一个可用的key
const initialKey = computed(() => {
  const defaultItem = props.items.find(item => item.key === props.defaultActiveKey)
  return (!defaultItem?.disabled && props.defaultActiveKey) || firstAvailableKey.value
})

// 如果没有绑定activeKey或绑定的是disabled项，则使用initialKey
watchEffect(() => {
  if (!activeKey.value || props.items.find(item => item.key === activeKey.value)?.disabled) {
    activeKey.value = initialKey.value
  }
})

function handleClick(key: string) {
  // 如果是disabled状态，则不允许选中
  if (props.items.find(item => item.key === key)?.disabled) {
    return
  }
  activeKey.value = key
}

// 获取相对时间描述的函数
function getTimeDescription(timestamp: number): string {
  const now = new Date()
  const date = new Date(timestamp)

  // 获取今天的开始时间点
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // 获取昨天的开始时间点
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // 获取一周前的开始时间点
  const oneWeekAgo = new Date(today)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  // 获取一个月前的开始时间点
  const oneMonthAgo = new Date(today)
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

  // 判断时间属于哪个区间
  if (date >= today) {
    return '今天'
  }
  else if (date >= yesterday) {
    return '昨天'
  }
  else if (date >= oneWeekAgo) {
    return '近七天'
  }
  else if (date >= oneMonthAgo) {
    return '近一个月'
  }
  else {
    return '更久以前'
  }
}

// 根据搜索值过滤项目
const filteredItems = computed(() => {
  if (!actualSearchValue.value)
    return props.items

  // 当两者都存在时，优先使用searchMethod
  if (props.searchMethod !== undefined) {
    return props.searchMethod(props.items, actualSearchValue.value)
  }

  // 默认的搜索方法
  return props.items.filter(item =>
    item.label.toLowerCase().includes(actualSearchValue.value.toLowerCase()),
  )
})

// 根据时间戳进行分组
const groups = computed(() => {
  // 如果不需要分组，则返回空数组
  if (!props.groupable)
    return []

  // 用于存储每个时间组的项目
  const groupMap: Record<string, {
    title: string
    timestamp: number // 保留原始时间戳用于排序
    key: string
    children: ConversationItem[]
  }> = {}
  
  // 检查filteredItems是否有值
  if (!filteredItems.value || filteredItems.value.length === 0) {
    return []
  }

  // 使用过滤后的项目进行分组
  filteredItems.value.forEach((item) => {
    if (item.timestamp) {
      // 获取时间描述
      const timeDescription = getTimeDescription(item.timestamp)

      // 若该时间描述的组尚未创建，则创建一个新组
      if (!groupMap[timeDescription]) {
        groupMap[timeDescription] = {
          title: timeDescription,
          timestamp: item.timestamp, // 记录组内最新的时间戳，用于排序
          key: timeDescription,
          children: [],
        }
      }
      else {
        // 更新组的时间戳为最新的时间戳，确保排序正确
        groupMap[timeDescription].timestamp = Math.max(
          groupMap[timeDescription].timestamp,
          item.timestamp,
        )
      }

      // 将项目添加到相应的组中
      groupMap[timeDescription].children.push(item)
    }
  })

  // 对每个组内的项目进行排序（按时间戳降序）
  Object.values(groupMap).forEach(group => {
    group.children.sort((a, b) => {
      // 确保存在时间戳
      const timestampA = a.timestamp || 0
      const timestampB = b.timestamp || 0
      return timestampB - timestampA
    })
  })

  // 将分组转换为数组并按时间戳降序排列
  return Object.values(groupMap).sort((a, b) => b.timestamp - a.timestamp)
})

// 添加滚动相关的状态
const scrollbarRef = ref<InstanceType<typeof ElScrollbar> | null>(null)
const showScrollTop = ref(false)

// 监听滚动事件
function handleScroll(e: any) {
  // 显示/隐藏回到顶部按钮
  const scrollTop = e.scrollTop
  showScrollTop.value = scrollTop > 200

  // 获取当前滚动容器
  const scrollbar = scrollbarRef.value
  if (!scrollbar)
    return

  // 使用scrollbar的wrapRef获取真实DOM以获取正确的尺寸
  const wrap = scrollbar.wrapRef
  if (!wrap)
    return

  // 检查是否需要加载更多
  // 当滚动到距离底部20px时触发加载
  const bottomOffset = 20
  const scrollHeight = wrap.scrollHeight
  const clientHeight = wrap.clientHeight

  // 计算是否接近底部
  const isNearBottom = scrollHeight - scrollTop - clientHeight < bottomOffset

  if (isNearBottom) {
    loadMoreData()
  }
}

// 加载更多数据
function loadMoreData() {
  if (!props.loadMore)
    return
  props.loadMore()
}

// 滚动到顶部
function scrollToTop() {
  scrollbarRef.value?.setScrollTop(0)
}
</script>

<template>
  <div class="conversations-container">
    <ul class="conversations-list" :style="mergedStyle">
      <!-- 搜索框 -->
      <li
        v-if="shouldShowSearch"
        class="conversations-search"
        :style="{
          width: mergedStyle.width,
          backgroundColor: mergedStyle.backgroundColor || '#fff',
        }"
      >
        <el-input
          :model-value="actualSearchValue"
          clearable
          placeholder="搜索"
          @update:model-value="props.search !== undefined ? searchModel = $event : internalSearchValue = $event"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </li>

      <!-- 滚动区域容器 -->
      <li class="conversations-scroll-wrapper">
        <el-scrollbar
          ref="scrollbarRef"
          height="100%"
          @scroll="handleScroll"
        >
          <div class="scroll-content">
            <template v-if="groupable">
              <!-- 分组显示 -->
              <div v-for="group in groups" :key="group.key" class="conversation-group">
                <div class="conversation-group-title">
                  {{ group.title }}
                </div>
                <Item
                  v-for="item in group.children"
                  :key="item.key"
                  :item="item"
                  :prefix-icon="item.prefixIcon"
                  :show-tooltip="showTooltip"
                  :suffix-icon="item.suffixIcon"
                  :active-key="activeKey || ''"
                  :label-max-width="labelMaxWidth"
                  :menu="menu"
                  :render-label="renderLabel"
                  :render-menu="renderMenu"
                  @click="handleClick"
                >
                  <!-- 传递插槽 -->
                  <template v-if="$slots.label" #label="slotProps">
                    <slot name="label" v-bind="slotProps" />
                  </template>

                  <template v-if="$slots.menu" #menu="slotProps">
                    <slot name="menu" v-bind="slotProps" />
                  </template>
                </Item>
              </div>
            </template>

            <template v-else>
              <Item
                v-for="item in filteredItems"
                :key="item.key"
                :item="item"
                :prefix-icon="item.prefixIcon"
                :show-tooltip="showTooltip"
                :suffix-icon="item.suffixIcon"
                :active-key="activeKey || ''"
                :label-max-width="labelMaxWidth"
                :menu="menu"
                :render-label="renderLabel"
                :render-menu="renderMenu"
                @click="handleClick"
              >
                <!-- 传递插槽 -->
                <template v-if="$slots.label" #label="slotProps">
                  <slot name="label" v-bind="slotProps" />
                </template>

                <template v-if="$slots.menu" #menu="slotProps">
                  <slot name="menu" v-bind="slotProps" />
                </template>
              </Item>
            </template>
          </div>
        </el-scrollbar>
      </li>
    </ul>

    <!-- 滚动到顶部按钮 -->
    <el-button
      v-show="showScrollTop"
      class="scroll-to-top-btn"
      circle
      @click="scrollToTop"
    >
      <el-icon><Top /></el-icon>
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.conversations-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.conversations-list {
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.conversations-search {
  z-index: 10;
  background-color: inherit;
  border-bottom: 1px solid #f0f0f0;
}

.conversations-scroll-wrapper {
  flex: 1;
  overflow: hidden;
}

.scroll-content {
  min-height: 100%;
  padding-bottom: 20px;
}

.loading-more {
  text-align: center;
  padding: 10px 0;
  color: #909399;
  font-size: 14px;
}

.conversation-group {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  .conversation-group-title {
    font-size: 14px;
    color: #909399;
    padding: 8px 10px;
    font-weight: 500;
    margin-bottom: 4px;
    border-radius: 4px;
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
