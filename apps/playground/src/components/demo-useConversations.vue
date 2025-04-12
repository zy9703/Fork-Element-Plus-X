<script setup lang="ts">
import { Edit, MoreFilled } from '@element-plus/icons-vue'
import { h, ref } from 'vue'
import Conversations from 'vue-element-plus-x/src/components/Conversations/index.vue'

// 将图标组件转换为VNode
const editIcon = h(Edit)
const moreIcon = h(MoreFilled)

// 创建会话数据
const conversations = ref([
  {
    key: 'item1',
    label: '普通会话项目1111111111111111111',
    timestamp: Date.now() - 1000 * 60 * 10, // 10分钟前,
    prefixIcon: editIcon,
    suffixIcon: moreIcon,
  },
  {
    key: 'item2',
    label: '带有图标的会话11',
    timestamp: Date.now() - 1000 * 60 * 10, // 10分钟前
  },
  {
    key: 'item3',
    label: '置顶会话示例',
    timestamp: Date.now() - 1000 * 60 * 10, // 10分钟前
    disabled: true,
  },
  {
    key: 'item4',
    label: '带有未读消息',
    // 如果groupable为true，这里就需要添加timestamp属性
  },
])

// 确保所有会话都有timestamp属性的会话数据（用于分组）
const groupableConversations = ref([
  {
    key: 'group1',
    label: '今天的会话1',
    timestamp: Date.now(), // 现在
    prefixIcon: editIcon,
  },
  {
    key: 'group2',
    label: '今天的会话2',
    timestamp: Date.now(), // 现在
  },
  {
    key: 'group3',
    label: '昨天的会话1',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 昨天
  },
  {
    key: 'group4',
    label: '昨天的会话2',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 昨天
  },
  {
    key: 'group4',
    label: '昨天的会话222222222222222222222222222222222222222',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 昨天
  },
  {
    key: 'group4',
    label: '昨天的会话2',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 昨天
  },
  {
    key: 'group4',
    label: '昨天的会话2',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 昨天
  },
  {
    key: 'group4',
    label: '昨天的会话2',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 昨天
  },
  {
    key: 'group5',
    label: '更早的会话',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7, // 一周前
  },
  {
    key: 'group5',
    label: '更早的会话',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7, // 一周前
  },
  {
    key: 'group5',
    label: '更早的会话',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7, // 一周前
  },
  {
    key: 'group5',
    label: '更早的会话',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7, // 一周前
  },
])

// 激活项
const activeKey = ref(null)
const groupActiveKey = ref('group1')

function loadMore() {
  console.log('loadMore')
  groupableConversations.value.push({
    key: 'group6',
    label: '更早的会话111111',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7, // 一周前
  })
}

const searchValue = ref('')

function searchMethod(items: any[], searchValue: string) {
  console.log(items, searchValue)
  return items.filter((item: any) => item.label.includes(searchValue))
}

// 自定义Label渲染函数
function customRenderLabel() {
  return h('div', { class: 'custom-label' }, [
    h('div', { class: 'custom-label-content' }, [
      h(ElIcon, {}, { default: () => h(moreIcon) }),
      h('span', { class: 'custom-label-text' }, '自定义标签渲染'),
    ]),
    // h('span', { class: 'custom-label-badge' }, '99+'),
  ])
}

// 自定义Menu渲染函数
function customRenderMenu() {
  return h('div', { class: 'custom-menu' }, [
    h(ElDropdown, {
      trigger: 'click',
      placement: 'bottom-end',
    }, {
      default: () => h(ElIcon, { class: 'menu-icon' }, { default: () => h(moreIcon) }),
      dropdown: () => h(ElDropdownMenu, {}, {
        default: () => [
          h(ElDropdownItem, {}, {
            default: () => [
              h(ElIcon, {}, { default: () => h(editIcon) }),
              h('span', { style: 'margin-left: 8px' }, '编辑'),
            ],
          }),
          h(ElDropdownItem, {}, {
            default: () => [
              h(ElIcon, {}, { default: () => h(editIcon) }),
              h('span', { style: 'margin-left: 8px' }, '归档'),
            ],
          }),
          h(ElDropdownItem, { divided: true, style: 'color: #F56C6C' }, {
            default: () => [
              h(ElIcon, {}, { default: () => h(editIcon) }),
              h('span', { style: 'margin-left: 8px' }, '删除'),
            ],
          }),
        ],
      }),
    }),
  ])
}
</script>

<template>
  <div class="demo-container">
    <h2>普通会话组件演示</h2>
    <!-- 普通会话组件 -->
    <Conversations
      v-model:active="activeKey"
      default-active-key="item2"
      :items="conversations"
      :show-tooltip="true"
      :label-max-width="120"
    />

    <h2 style="margin-top: 30px;">
      自定义渲染演示
    </h2>
    <p class="description">
      使用renderLabel和renderMenu自定义渲染内容
    </p>
    <!-- 带有自定义渲染的会话组件 -->
    <Conversations
      v-model:active="activeKey"
      :items="conversations"
      :render-label="customRenderLabel"
      :render-menu="customRenderMenu"
      style="margin-bottom: 30px;"
    />

    <h2 style="margin-top: 30px;">
      时间分组会话组件演示（带吸顶效果）
    </h2>
    <p class="description">
      会话按照时间分为：今天、昨天、近七天、近一个月、更久以前
    </p>
    <p class="description">
      向上滚动时，分组标题会吸附在顶部
    </p>
    <!-- 分组会话组件 -->
    <div class="sticky-container" style="height: 400px;">
      <Conversations
        v-model:active="groupActiveKey"
        :items="groupableConversations"
        :show-tooltip="true"
        :groupable="true"
        :label-max-width="120"
        :load-more="loadMore"
        :search="searchValue"
        :search-method="searchMethod"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-container {
  padding: 20px;

  .description {
    color: #909399;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .sticky-container {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    height: 400px;
  }
}

.custom-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .custom-label-content {
    display: flex;
    align-items: center;
    gap: 8px;

    .custom-label-text {
      font-weight: 500;
    }
  }

  .custom-label-badge {
    background-color: #f56c6c;
    color: white;
    border-radius: 10px;
    padding: 2px 8px;
    font-size: 12px;
  }
}

.custom-menu {
  .menu-icon {
    cursor: pointer;
    font-size: 16px;
    color: #909399;
    padding: 4px;
    border-radius: 4px;

    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>
