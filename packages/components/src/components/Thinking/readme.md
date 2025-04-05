# Thinking 组件

## 介绍
Thinking 组件用于展示带有时间轴的思考过程，可以展开/折叠详细内容。
- 可以单个思考链 或者 多个
- 能够更改状态 加载中 和自定义 图标
- 配置标题或者思考内容的位置
- 可以折叠以及可以默认展开
- 可选的 使用 Markdown 渲染内容。
- 节点之间链接线支持渐变颜色。

## 安装

```bash
npm i vue-element-plus-x
```

### 引入组件

在你的 Vue 3 项目中引入 `Thinking` 组件：

```vue
<!-- home 首页-使用 Bubble 组件 -->
<script setup lang="typescript">
import type { ThinkingItem } from 'vue-element-plus-x/types/components/Thinking/types'
import { DocumentCopy, Refresh, Search, Star } from '@element-plus/icons-vue'

const avatar = ref(
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
)
const loading = ref(true)
const content = ref('')

const thinkings = ref<ThinkingItem[]>([{
  id: '1',
  thinkTitle: 'content--收到问题',
  title: 'title--进行搜索文字',
  status: 'success',
  isCanExpand: true,
  isDefaultExpand: true,
  thinkContent: '进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字',
}])

onMounted(() => {
  setTimeout(() => {
    thinkings.value[0] = {
      ...thinkings.value[0],
      isLoading: false,
    }
    thinkings.value.push({
      id: '2',
      thinkTitle: 'content--解决问题 title--被隐藏了  打字动画建议只给最后一个思维链接',
      title: 'title--进行搜索文字',
      hideTitle: true,
      status: 'success',
      isCanExpand: true,
      isDefaultExpand: true,
      isMarkdown: false,
      typing: {
        step: 4,
        interval: 60,
      },
      thinkContent: 'expandContent--进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字',
    })

    // 模拟思考结束
    setTimeout(() => {
      content.value = `
# 标题
这是一个 Markdown 示例。
- 列表项 1
- 列表项 2
**粗体文本** 和 *斜体文本*
\`\`\`javascript
console.log('Hello, world!');
\`\`\`
`.trim()
      loading.value = false
    }, 500)
  }, 2000)
})
</script>

<template>
  <div class="component-container">
    <div class="component-1">
      <Bubble
        placement="start"
        :content="content"
        shape="corner"
        variant="shadow"
        :loading="loading"
        :typing="{
          step: 2,
          suffix: '💗',
        }"
        :is-markdown="true"
      >
        <template #avatar>
          <el-avatar :size="32" :src="avatar" />
        </template>

        <template #header>
          <div class="header-container">
            <Thinking :thinking-items="thinkings" :line-gradient="true" @handle-expand="(id: string[]) => console.log(id)" />
          </div>
        </template>

        <template #footer>
          <div class="footer-container">
            <el-button type="info" :icon="Refresh" size="small" circle />
            <el-button type="success" :icon="Search" size="small" circle />
            <el-button type="warning" :icon="Star" size="small" circle />
            <el-button
              color="#626aef"
              :icon="DocumentCopy"
              size="small"
              circle
            />
          </div>
        </template>
      </Bubble>
    </div>
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  .component-1 {
    .footer-container {
      :deep() {
        .el-button + .el-button {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
```

## 组件属性ThinkingProps

| 参数            | 说明                                           | 类型                              | 默认值            |
| --------------- | ---------------------------------------------- | --------------------------------- | ----------------- |
| thinkingItems   | 节点列表                                       | `ThinkingItemUseProps<T>[]`       | `[]`              |
| rowKey          | 节点item的RowKey                               | `string \| undefined`             |                   |
| titleKey        | item的titleKey                                 | `string \| undefined`             |                   |
| thinkTitleKey   | item的thinkTitleKey                            | `string \| undefined`             |                   |
| thinkContentKey | item的thinkContentKey                          | `string \| undefined`             |                   |
| statusKey       | item的statusKey                                | `string \| undefined`             |                   |
| statusEnum      | 节点的状态枚举：`ThinkStatusEnum`              | `ThinkStatusEnum \| undefined`    | `ThinkStatusEnum` |
| dotSize         | 节点图标大小                                   | `'large' \| 'default' \| 'small'` | `default`         |
| maxWidth        | 思维链最大宽度                                 | `string \| undefined`             | '600px'           |
| lineGradient    | 是否启用节点之间链接线的渐变颜色 false默认颜色 | `boolean \| undefined`            | `false`           |

## 组件事件

| 事件名称     | 说明           | 回调参数                 |
| ------------ | -------------- | ------------------------ |
| handleExpand | 节点展开时触发 | `expandedKeys: string[]` |

## 组件部分类型定义

### ThinkingItemId
```typescript
  type ThinkingItemId = string | number
```

### ThinkType
```typescript
   type ThinkType = 'info' | 'success' | 'warning' | 'danger' | 'primary'
```

### ThinkStatusEnum
```typescript
interface ThinkStatusEnum {
  loading: {
    value: string | number
    type: ThinkType
  }
  error: {
    value: string | number
    type: ThinkType
  }
  success: {
    value: string | number
    type: ThinkType
  }
}
```

### ThinkingItemUseProps
```typescript
interface ThinkingItemBase {
  /**
   * 唯一标识
   */
  id: ThinkingItemId
  /**
   * 节点标题
   */
  title?: string
  /**
   * 思考的内容 没有展开选项时content会作为思维显示的内容
   * 当展开选项时content会作为展开选项的标题 `thinkTitle` 会作为展开选项后显示的思维内容
   */
  thinkTitle?: string
  /**
   * 展开思考的详细内容
   */
  thinkContent?: string
  /**
   * 节点的图标
   */
  status?: 'loading' | 'error' | 'success'
  /**
   * footer对齐位置
   */
  placement?: 'top' | 'bottom'
  /**
   * 是否可以展开
   */
  isCanExpand?: boolean | ((item: ThinkingItemBase) => boolean)
  /**
   * 是否默认展开
   */
  isDefaultExpand?: boolean | ((item: ThinkingItemBase) => boolean)
  /**
   * 是否隐藏节点标题内容
   */
  hideTitle?: boolean | ((item: ThinkingItemBase) => boolean)
  /**
   *  是否使用markdown语法
   */
  isMarkdown?: boolean
  /**
   * 是否开启打字效果
   */
  typing?: TypingConfig
}

  type ThinkingItemUseProps<T = ThinkingItemBase> = Pick<ThinkingItemBase, 'hideTitle' | 'isMarkdown' | 'typing' | 'isDefaultExpand' | 'isCanExpand' | 'placement'> & T
```
