<script setup lang="ts">
import type { GroupableOptions } from 'vue-element-plus-x/src/components/Conversations/types'
import { Calendar, ChatDotRound, ChatLineRound, Delete, Document, DocumentChecked, DocumentCopy, Download, Edit, InfoFilled, Lock, Message, MoreFilled, Search, Setting, Share, Star, StarFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Conversations from 'vue-element-plus-x/src/components/Conversations/index.vue'

const timeBasedItems = ref([
  {
    key: '1',
    label: '今天的会话111111111111111111111111111',
    group: 'today',
    disabled: true
  },
  {
    key: '2',
    label: '今天的会话2',
  },
  {
    key: '3',
    label: '昨天的会话1',
  },
  {
    key: '4',
    label: '昨天的会话2',
  },
  {
    key: '5',
    label: '一周前的会话',
  },
  {
    key: '6',
    label: '一个月前的会话',
  },
  {
    key: '7',
    label: '很久以前的会话',
  },
])

// 测试数据 - 有group字段的会话
const groupBasedItems = ref([
  {
    key: 'g1',
    label: '工作文档1',
    group: '工作'
  },
  {
    key: 'g2',
    label: '工作文档11111111111111111111111111111111111111111',
    group: '工作'
  },
  {
    key: 'g3',
    label: '工作文档3',
    group: '工作'
  },
  {
    key: 'g4',
    label: '工作文档4',
    group: '工作'
  },
  {
    key: 'g5',
    label: '工作文档5',
    group: '工作'
  },
  {
    key: 'g6',
    label: '工作文档6',
    group: '工作'
  },
  {
    key: 'g7',
    label: '学习笔记1',
    group: '学习'
  },
  {
    key: 'g8',
    label: '学习笔记2',
    group: '学习'
  },
  {
    key: 'g9',
    label: '个人文档1',
    group: '个人'
  },
  {
    key: 'g10',
    label: '未分组项目'
  },
])

// 测试数据 - 用于菜单测试的会话
const menuTestItems = ref([
  {
    key: 'm1',
    label: '菜单测试项目 1 - 长文本效果演示文本长度溢出效果测试'
  },
  {
    key: 'm2',
    label: '菜单测试项目 2'
  },
  {
    key: 'm3',
    label: '菜单测试项目 3'
  },
  {
    key: 'm4',
    label: '菜单测试项目 4'
  },
  {
    key: 'm5',
    label: '菜单测试项目 5'
  },
])

// 测试数据 - 用于搜索功能和图标功能测试的会话
const searchTestItems = ref([
  {
    key: 'i1',
    label: '重要文档Alpha',
    prefixIcon: h(Star)
  },
  {
    key: 'i2',
    label: '重要会议Beta',
    prefixIcon: h(StarFilled)
  },
  {
    key: 'i3',
    label: '普通文档Alpha',
    prefixIcon: h(Document)
  },
  {
    key: 'i4',
    label: '私密文档Secret',
    prefixIcon: h(Lock)
  },
  {
    key: 'i5',
    label: '日程Alpha',
    prefixIcon: h(Calendar)
  },
  {
    key: 'i6',
    label: '备份文档Beta',
    prefixIcon: h(DocumentCopy)
  },
  {
    key: 'i7',
    label: '系统设置',
    prefixIcon: h(Setting)
  },
  {
    key: 'i8',
    label: '已完成任务',
    prefixIcon: h(DocumentChecked)
  },
])

// 测试数据 - 懒加载测试
const lazyItems = ref([
  {
    key: 'l1',
    label: '初始项目1',
    prefixIcon: h(ChatLineRound)
  },
  {
    key: 'l2',
    label: '初始项目2',
    prefixIcon: h(ChatDotRound)
  },
  {
    key: 'l3',
    label: '初始项目3',
    prefixIcon: h(ChatLineRound)
  },
  {
    key: 'l1',
    label: '初始项目1',
    prefixIcon: h(ChatLineRound)
  },
  {
    key: 'l2',
    label: '初始项目2',
    prefixIcon: h(ChatDotRound)
  },
  {
    key: 'l3',
    label: '初始项目3',
    prefixIcon: h(ChatLineRound)
  },
  {
    key: 'l1',
    label: '初始项目1',
    prefixIcon: h(ChatLineRound)
  },
  {
    key: 'l2',
    label: '初始项目2',
    prefixIcon: h(ChatDotRound)
  },
  {
    key: 'l3',
    label: '初始项目3',
    prefixIcon: h(ChatLineRound)
  },
])

// 自定义分组选项
const customGroupOptions: GroupableOptions = {
  // 自定义分组排序，学习 > 工作 > 个人 > 未分组
  sort: (a, b) => {
    const order: Record<string, number> = { 学习: 0, 工作: 1, 个人: 2, 未分组: 3 }
    const orderA = order[a] !== undefined ? order[a] : 999
    const orderB = order[b] !== undefined ? order[b] : 999
    return orderA - orderB
  },
}

// 菜单项目定义
const conversationMenuItems = [
  {
    key: 'edit',
    label: '编辑',
    icon: h(Edit),
  },
  {
    key: 'delete',
    label: '删除',
    icon: h(Delete),
  },
  {
    key: 'share',
    label: '分享',
    icon: h(Share),
  },
]

// 搜索相关
const searchValue = ref('')
const searchResults = ref([...searchTestItems.value])

// 搜索处理函数
function handleSearch(value: string) {
  if (!value) {
    searchResults.value = [...searchTestItems.value]
    return
  }

  searchResults.value = searchTestItems.value.filter(item =>
    item.label.toLowerCase().includes(value.toLowerCase()),
  )
}

// 加载更多处理
const isLoading = ref(false)

function loadMoreItems() {
  if (isLoading.value)
    return

  isLoading.value = true
  ElMessage.info('加载更多数据...')

  // 模拟异步加载
  setTimeout(() => {
    const newItems = [
      {
        key: `l${lazyItems.value.length + 1}`,
        label: `加载的项目${lazyItems.value.length + 1}`,
        prefixIcon: h(ChatLineRound)
      },
      {
        key: `l${lazyItems.value.length + 2}`,
        label: `加载的项目${lazyItems.value.length + 2}`,
        prefixIcon: h(ChatDotRound)
      },
    ]

    lazyItems.value = [...lazyItems.value, ...newItems]
    isLoading.value = false
  }, 1000)
}

// 激活的键
const activeKey1 = ref('1')
const activeKey2 = ref('g1')
const activeKey4 = ref('m1')
const activeKey5 = ref('i1')
const activeKey6 = ref('l1')
const activeKey7 = ref('d1')

// 处理菜单点击
function handleMenuClick(menuKey: string, item: any) {
  switch (menuKey) {
    case 'edit':
      ElMessage.info(`编辑: ${item.label}`)
      break
    case 'delete':
      ElMessage.warning(`删除: ${item.label}`)
      break
    case 'share':
      ElMessage.success(`分享: ${item.label}`)
      break
  }
}
</script>

<template>
  <div class="demo-container">
    <h2>基础时间分组 (groupable)</h2>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey1"
        :items="timeBasedItems"
        groupable
        :label-max-width="200"
        :show-tooltip="true"
      />
    </div>

    <h2>自定义分组 (groupable为对象)</h2>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey2"
        :items="groupBasedItems"
        :groupable="customGroupOptions"
        :label-max-width="200"
        :show-tooltip="true"
      >
        <template #groupTitle="{ group }">
          <div class="custom-group-title">
            <!-- 为不同组添加不同的前缀 -->
            <span v-if="group.title === '工作'">📊 </span>
            <span v-else-if="group.title === '学习'">📚 </span>
            <span v-else-if="group.title === '个人'">🏠 </span>
            <span v-else>📁 </span>
            {{ group.title }}
          </div>
        </template>
      </Conversations>
    </div>

    <h2>菜单功能测试</h2>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey4"
        :items="menuTestItems"
        :label-max-width="200"
        :show-tooltip="true"
      >
        <template #menu="{ item }">
          <div class="menu-buttons">
            <el-button
              v-for="menuItem in conversationMenuItems"
              :key="menuItem.key"
              type="text"
              size="small"
              @click.stop="handleMenuClick(menuItem.key, item)"
            >
              <el-icon v-if="menuItem.icon">
                <component :is="menuItem.icon" />
              </el-icon>
              <span v-if="menuItem.label">{{ menuItem.label }}</span>
            </el-button>
          </div>
        </template>
      </Conversations>
    </div>

    <h2>搜索和图标功能</h2>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey5"
        :search="searchValue"
        :items="searchResults"
        :label-max-width="200"
        :show-tooltip="true"
      />
      <!-- :search-method="handleSearch" -->
    </div>

    <h2>加载更多功能</h2>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey6"
        :items="lazyItems"
        :label-max-width="200"
        :show-tooltip="true"
        :load-more="loadMoreItems"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-container {
  padding: 20px;

  h2 {
    margin-top: 30px;
    margin-bottom: 8px;
    font-size: 18px;
  }

  .description {
    color: #909399;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .demo-card {
    border: 1px solid #ebeef5;
    border-radius: 8px;
    overflow: hidden;
    height: 400px;
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

.custom-group-title {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #409EFF;
}

.menu-buttons {
  display: flex;
  gap: 8px;
  align-items: center;

  .el-button {
    padding: 4px 8px;
    margin-left: 0;

    .el-icon {
      margin-right: 2px;
    }
  }
}
</style>
