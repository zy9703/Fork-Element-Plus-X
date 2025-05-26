<script>
// 导入 Element UI 组件和 Message 提示
// import { Button, InputNumber, Message } from 'element-ui';
import Conversations from './index.vue'; // 假设 Conversations 组件已转写为 Vue 2

export default {
  name: 'ConversationsDemo',
  components: {
    Conversations,
    // 注册 Element UI 组件
    // [Button.name]: Button,
    // [InputNumber.name]: InputNumber,
  },
  data() {
    return {
      timeBasedItems: [
        {
          id: '1',
          label: '今天的会话111111111111111111111111111',
          group: 'today',
          disabled: true,
        },
        {
          id: '2',
          group: 'today',
          label: '今天的会话2',
        },
        {
          id: '3',
          group: 'yesterday',
          label: '昨天的会话1',
        },
        {
          id: '4',
          label: '昨天的会话2',
        },
        {
          id: '5',
          label: '一周前的会话',
        },
        {
          id: '6',
          label: '一个月前的会话',
        },
        {
          id: '7',
          label: '很久以前的会话',
        },
      ],
      groupBasedItems: [
        {
          key: 'g1',
          label: '工作文档1',
          group: '工作',
        },
        {
          key: 'g2',
          label: '工作文档11111111111111111111111111111111111111111',
          group: '工作',
        },
        {
          key: 'g3',
          label: '工作文档3',
          group: '工作',
        },
        {
          key: 'g4',
          label: '工作文档4',
          group: '工作',
        },
        {
          key: 'g5',
          label: '工作文档5',
          group: '工作',
        },
        {
          key: 'g6',
          label: '工作文档6',
          group: '工作',
        },
        {
          key: 'g7',
          label: '学习笔记1',
          group: '学习',
        },
        {
          key: 'g8',
          label: '学习笔记2',
          group: '学习',
        },
        {
          key: 'g9',
          label: '个人文档1',
          group: '个人',
        },
        {
          key: 'g10',
          label: '未分组项目',
        },
      ],
      menuTestItems: [
        {
          key: 'm1',
          label: '菜单测试项目 1 - 长文本效果演示文本长度溢出效果测试'.repeat(2),
        },
        {
          key: 'm2',
          label: '菜单测试项目 2',
          disabled: true,
        },
        {
          key: 'm3',
          label: '菜单测试项目 3',
        },
        {
          key: 'm4',
          label: '菜单测试项目 4',
        },
        {
          key: 'm5',
          label: '菜单测试项目 5',
        },
        {
          key: 'm6',
          label: '菜单测试项目 6',
        },
        {
          key: 'm7',
          label: '菜单测试项目 7',
        },
        {
          key: 'm8',
          label: '菜单测试项目 8',
        },
        {
          key: 'm9',
          label: '菜单测试项目 9',
        },
        {
          key: 'm10',
          label: '菜单测试项目 10',
        },
        {
          key: 'm11',
          label: '菜单测试项目 11',
        },
        {
          key: 'm12',
          label: '菜单测试项目 12',
        },
        {
          key: 'm13',
          label: '菜单测试项目 13',
        },
        {
          key: 'm14',
          label: '菜单测试项目 14',
        },
      ],
      lazyItems: [
        {
          key: 'l1',
          label: '初始项目1',
          prefixIcon: 'el-icon-chat-line-round', // Element UI icon class
        },
        {
          key: 'l2',
          label: '初始项目2',
          prefixIcon: 'el-icon-chat-dot-round', // Element UI icon class
        },
        {
          key: 'l3',
          label: '初始项目3',
          prefixIcon: 'el-icon-chat-line-round', // Element UI icon class
        },
        {
          key: 'l4',
          label: '初始项目1',
          prefixIcon: 'el-icon-chat-line-round', // Element UI icon class
        },
        {
          key: 'l5',
          label: '初始项目2',
          prefixIcon: 'el-icon-chat-dot-round', // Element UI icon class
        },
        {
          key: 'l6',
          label: '初始项目3',
          prefixIcon: 'el-icon-chat-line-round', // Element UI icon class
        },
        {
          key: 'l7',
          label: '初始项目1',
          prefixIcon: 'el-icon-chat-line-round', // Element UI icon class
        },
        {
          key: 'l8',
          label: '初始项目2',
          prefixIcon: 'el-icon-chat-dot-round', // Element UI icon class
        },\n        {
          key: 'l9',
          label: '初始项目3',
          prefixIcon: 'el-icon-chat-line-round', // Element UI icon class
        },
      ],
      customGroupOptions: {
        // 自定义分组排序，学习 > 工作 > 个人 > 未分组
        sort: (a, b) => {
          const order = { 学习: 0, 工作: 1, 个人: 2, 未分组: 3 }
          const orderA = order[a] !== undefined ? order[a] : 999
          const orderB = order[b] !== undefined ? order[b] : 999
          return orderA - orderB
        },
      },
      conversationMenuItems: [
        {
          key: 'edit',
          label: '编辑',
          icon: { name: 'edit' }, // Element UI icon name
          command: {
            self_id: '1',
            self_message: '编辑',
            self_type: 'text',
          },
        },
        {
          key: 'delete',
          label: '删除',
          icon: { name: 'delete' }, // Element UI icon name
          disabled: true,
          divided: true,
        },
        {
          key: 'share',
          label: '分享',
          icon: { name: 'share' }, // Element UI icon name
          command: 'share',
        },
      ],
      conversationMenuItems1: [
        {
          key: 'edit',
          label: '编辑',
          icon: '🍉',
          command: {
            self_id: '1',
            self_message: '编辑',
            self_type: 'text',
          },
        },
        {
          key: 'delete',
          label: '删除',
          icon: '🍎',
          disabled: true,
          divided: true,
        },
        {
          key: 'share',
          label: '分享',
          icon: '🍆',
          command: 'share',
        },
      ],
      isLoading: false,
      activeKey1: '1',
      activeKey2: 'g1',
      activeKey4: 'm1',
      activeKey5: 'm1',
      activeKey6: 'l1',
    }
  },
  methods: {
    handleMenuCommand(command, item) {
      // console.log('内置菜单点击事件：', command, item)
      // 直接修改 item 是否生效
      if (command === 'delete') {
        const index = this.menuTestItems.findIndex(itemSlef => itemSlef.key === item.key)

        if (index !== -1) {
          this.menuTestItems.splice(index, 1)
          Message.success('删除成功')
        }
      }
      if (command === 'rename') {
        item.label = '已修改'
        Message.success('重命名成功')
      }
    },
    loadMoreItems() {
      if (this.isLoading)
        return

      this.isLoading = true
      Message.info('加载更多数据...')

      // 模拟异步加载
      setTimeout(() => {
        const newItems = [
          {
            key: `l${this.lazyItems.length + 1}`,
            label: `加载的项目${this.lazyItems.length + 1}`,
            prefixIcon: 'el-icon-chat-line-round', // Element UI icon class
          },
          {
            key: `l${this.lazyItems.length + 2}`,
            label: `加载的项目${this.lazyItems.length + 2}`,
            prefixIcon: 'el-icon-chat-dot-round', // Element UI icon class
          },
        ]

        this.lazyItems = [...this.lazyItems, ...newItems]
        this.isLoading = false
      }, 2000)
    },
    handleMenuClick(menuKey, item) {
      // console.log('菜单点击', menuKey, item)

      switch (menuKey) {
        case 'edit':
          Message.info(`编辑: ${item.label}`)
          break
        case 'delete':
          Message.warning(`删除: ${item.label}`)
          break
        case 'share':
          Message.success(`分享: ${item.label}`)
          break
      }
    }
  }
}
</script>

<template>
  <div class="demo-container">
    <h2>绝对自定义-默认样式，悬停样式，选中样式，以及自定义 label</h2>
    <div class="demo-card">
      <Conversations
        v-model="activeKey5" :items="menuTestItems1" :label-max-width="200" :show-tooltip="true"
        tooltip-placement="right" :tooltip-offset="35" show-built-in-menu :groupable="customGroupOptions" row-key="key"
        :items-style="{
          padding: '10px 20px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          textAlign: 'center',
          boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s',
          marginBottom: '20px',
          border: '2px dashed transparent',
        }" :items-hover-style="{
          background: '#FAFAD2',
          border: '2px dashed #006400',
        }" :items-active-style="{
          background: '#006400',
          color: '#FFFAFA',
          border: '2px dashed transparent',
        }" :items-menu-opened-style="{
          // background: '#32CD32',  // 背景色和选中样式保持一致
          // color: '#FFFAFA',
          border: '2px dashed transparent',
        }" :menu-style="{
          backgroundColor: 'red',
          boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
          padding: '10px 20px',
        }"
      >
        <template #label="{ item }">
          <div class="custom-label">
            {{ item.label }}
          </div>
        </template>

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

        <template #more-filled="{ item, isHovered, isActive, isMenuOpened, isDisabled }">
          <span v-if="isHovered">✍️</span>
          <span v-if="isActive">✅</span>
          <span v-if="isMenuOpened">🥰</span>
          <span
            v-if="isDisabled" :style="{
              background: 'black',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }"
          >
            🫥是否禁用：{{ item?.disabled }}
          </span>
        </template>

        <template #menu="{ item }">
          <div class="menu-buttons">
            <div
              v-for="menuItem in conversationMenuItems1" :key="menuItem.key" class="menu-self-button"
              @click.stop="handleMenuClick(menuItem.key, item)"
            >
              <span v-if="menuItem.icon">{{ menuItem.icon }}</span>
              <span v-if="menuItem.label">{{ menuItem.label }}</span>
            </div>
          </div>
        </template>
      </Conversations>
    </div>

    <h2>内置下拉菜单测试 (内置 rename 和 delete)</h2>
    <div class="demo-card">
      <Conversations
        v-model="activeKey4" :items="menuTestItems" :label-max-width="200" :show-tooltip="true"
        row-key="key" tooltip-placement="right" :tooltip-offset="35" show-to-top-btn show-built-in-menu
        @menu-command="handleMenuCommand"
      />
    </div>

    <h2>基础时间分组 (groupable) 内置分组吸顶功能</h2>
    <div class="demo-card">
      <Conversations
        v-model="activeKey1" :items="timeBasedItems" groupable :label-max-width="200"
        :show-tooltip="false" row-key="id"
      />
    </div>

    <h2>自定义分组 (groupable为对象) 内置分组吸顶功能 </h2>
    <div class="demo-card">
      <Conversations
        v-model="activeKey2" :items="groupBasedItems" :groupable="customGroupOptions"
        :label-max-width="200" :show-tooltip="true" show-to-top-btn row-key="key"
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

    <h2>自定义菜单功能测试</h2>
    <div class="demo-card">
      <Conversations
        v-model="activeKey4" :items="menuTestItems" row-key="key" :label-max-width="200" :show-tooltip="true"
        show-to-top-btn show-built-in-menu
      >
        <template #more-filled>
          <!-- Element UI 图标使用 i 标签和类名 -->
          <i class="el-icon-edit-pen"></i>
        </template>

        <template #menu="{ item }">
          <div class="menu-buttons">
            <el-button
              v-for="menuItem in conversationMenuItems" :key="menuItem.key" type="text" size="small"
              @click.stop="handleMenuClick(menuItem.key, item)"
            >
              <!-- Element UI 图标使用 i 标签和类名 -->
              <i v-if="menuItem.icon" :class="'el-icon-' + menuItem.icon.name.toLowerCase()"></i>
              <span v-if="menuItem.label">{{ menuItem.label }}</span>
            </el-button>
          </div>
        </template>
      </Conversations>
    </div>

    <h2>加载更多功能</h2>
    <div class="demo-card">
      <Conversations
        v-model="activeKey6" :items="lazyItems" :label-max-width="200" row-key="key" :show-tooltip="true"
        :load-more="loadMoreItems" :load-more-loading="isLoading" show-to-top-btn
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
  height: calc(100vh - 220px);
  overflow: auto;

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
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 12px;

  // 自定义菜单按钮-el-button样式
  .el-button {
    padding: 4px 8px;
    margin-left: 0;

    .el-icon {
      margin-right: 8px;
    }
  }

  // 自定义菜单按钮-自定义样式
  .menu-self-button {
    display: flex;
    padding: 4px 8px;
    align-items: center;
    border-radius: 5px;
    margin-left: 0;
    cursor: pointer;
    gap: 8px;

    &:hover {
      background-color: #f5f7fa;
      color: #409EFF;
    }
  }
}

.custom-label {
  display: flex;
  align-items: center;
  // 溢出隐藏
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
</style>
