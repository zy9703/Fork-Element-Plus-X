# BubbleList 气泡列表

## 一、概述

`BubbleList` 是一个基于 Vue 2 和 Element UI 开发的组件，它依赖于 `Bubble` 组件，用于展示一组对话气泡列表。该组件支持设置列表最大高度，具备自动滚动到底部的功能，无论是在普通状态还是打字效果进行中。同时，它还提供了多种滚动控制方法，方便父组件调用。

## 二、功能特性

1. **智能滚动管理** - 自动跟踪最新消息位置
2. **多模式滚动** - 支持即时滚动/渐进式滚动/定位滚动
3. **交互感知** - 自动识别用户滚动意图
4. **深度定制** - 完整的气泡组件插槽透传
5. **类型安全** - 严格的 props 类型校验

## 三、安装与使用

### 1.安装依赖

```bash
npm i element-plus-x
```

### 2.引入组件

在你的 Vue 2 项目中引入 `BubbleList` 组件：

```vue
<template>
  <a3-bubble-list :list="list" max-height="600px">
    <template #avatar="{ item }">
      <img :src="item.avatarUrl" alt="Avatar">
    </template>
  </a3-bubble-list>
</template>

<script>
import { A3BubbleList } from 'element-plus-x'

export default {
  components: {
    A3BubbleList
  },
  data() {
    return {
      list: [
        {
          content: 'Hello!',
          placement: 'start',
          loading: false,
          shape: 'round',
          variant: 'filled',
          isMarkdown: false,
          typing: false,
        }
      ]
    }
  }
}
</script>
```

## 四、组件属性

| 属性名      | 类型                     | 默认值      | 说明                                                                                                                                                                  |
| ----------- | ------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `list`      | Array                    | `[]`        | 包含气泡信息的数组，每个元素为一个对象，包含 `content`、`placement`、`loading`、`shape`、`variant`、`isMarkdown`、`typing` 等属性，用于配置每个气泡的显示内容和样式。 |
| `maxHeight` | String                   | `'500px'`   | 气泡列表容器的最大高度，超过该高度会出现垂直滚动条。                                                                                                                  |
| `triggerIndices` | String 或 Array    | `'only-last'` | 触发完成事件的气泡索引，可选值：`'only-last'` (仅最后一个)、`'all'` (所有气泡) 或自定义索引数组。                                                                      |

## 五、组件事件

| 事件名      | 说明                                     | 回调参数                      |
| ----------- | ---------------------------------------- | ----------------------------- |
| `complete` | 当某个气泡的打字效果完成时触发的事件。   | `(instance, index)`：打字实例对象和气泡索引 |

## 六、插槽

### 1. `avatar`

用于自定义每个气泡的头像部分，通过 `:item` 可以获取当前气泡的配置信息。

```vue
<template #avatar="{ item }">
  <img :src="item.avatarUrl" alt="Avatar">
</template>
```

### 2. `header`

用于自定义每个气泡的头部内容，通过 `:item` 可以获取当前气泡的配置信息。

```vue
<template #header="{ item }">
  <h3>{{ item.headerTitle }}</h3>
</template>
```

### 3. `content`

用于自定义每个气泡的主体内容，通过 `:item` 可以获取当前气泡的配置信息。

```vue
<template #content="{ item }">
  <p>{{ item.customContent }}</p>
</template>
```

### 4. `footer`

用于自定义每个气泡的底部内容，通过 `:item` 可以获取当前气泡的配置信息。

```vue
<template #footer="{ item }">
  <p>{{ item.footerInfo }}</p>
</template>
```

### 5. `loading`

用于自定义每个气泡加载状态下的内容，通过 `:item` 可以获取当前气泡的配置信息。

```vue
<template #loading="{ item }">
  <div>{{ item.loadingText }}</div>
</template>
```

## 七、组件方法

通过 `ref` 可以获取组件实例并调用以下方法：

### 1. `scrollToTop()`

将滚动容器滚动到顶部。

```vue
<template>
  <a3-bubble-list ref="bubbleListRef" :list="list" />
  <el-button @click="scrollToTop">滚动到顶部</el-button>
</template>

<script>
import { A3BubbleList } from 'element-plus-x'

export default {
  components: {
    A3BubbleList
  },
  data() {
    return {
      list: [/* ... */]
    }
  },
  methods: {
    scrollToTop() {
      this.$refs.bubbleListRef.scrollToTop()
    }
  }
}
</script>
```

### 2. `scrollToBottom()`

将滚动容器滚动到底部，不跟随打字器滚动。

```vue
<template>
  <a3-bubble-list ref="bubbleListRef" :list="list" />
  <el-button @click="scrollToBottom">滚动到底部</el-button>
</template>

<script>
import { A3BubbleList } from 'element-plus-x'

export default {
  components: {
    A3BubbleList
  },
  data() {
    return {
      list: [/* ... */]
    }
  },
  methods: {
    scrollToBottom() {
      this.$refs.bubbleListRef.scrollToBottom()
    }
  }
}
</script>
```

### 3. `scrollToBubble(index)`

将滚动容器滚动到指定索引的气泡框位置，实现平滑滚动。

```vue
<template>
  <a3-bubble-list ref="bubbleListRef" :list="list" />
  <el-button @click="scrollToSpecificBubble">滚动到索引 2 的气泡</el-button>
</template>

<script>
import { A3BubbleList } from 'element-plus-x'

export default {
  components: {
    A3BubbleList
  },
  data() {
    return {
      list: [/* ... */]
    }
  },
  methods: {
    scrollToSpecificBubble() {
      this.$refs.bubbleListRef.scrollToBubble(2)
    }
  }
}
</script>
```

### 4. `scrollToBottomByTyping()`

跟随打字器滚动，将滚动容器滚动到底部。在打字过程中，会持续检查打字状态并滚动。

```vue
<template>
  <a3-bubble-list ref="bubbleListRef" :list="list" />
  <el-button @click="scrollWithTyping">跟随打字滚动</el-button>
</template>

<script>
import { A3BubbleList } from 'element-plus-x'

export default {
  components: {
    A3BubbleList
  },
  data() {
    return {
      list: [/* ... */]
    }
  },
  methods: {
    scrollWithTyping() {
      this.$refs.bubbleListRef.scrollToBottomByTyping()
    }
  }
}
</script>
```

## 八、自动滚动逻辑

### 1. 数组长度变化时

当 `list` 数组长度发生变化时，如果最后一个气泡开启了打字效果，则调用 `scrollToBottomByTyping` 方法跟随打字器滚动到底部；否则，调用 `scrollToBottom` 方法直接滚动到底部。

### 2. 用户滚动事件处理

- **向上滚动**：当用户向上滚动超过一定阈值（默认为 15 像素）时，停止自动滚动，由用户控制滚动条。
- **向下滚动且接近底部**：当用户向下滚动且距离底部小于 30 像素时，如果之前停止了自动滚动且打字器正在打字中，则重新开启自动滚动。

## 九、注意事项

- 在使用插槽时，通过 `:item` 可以获取当前气泡的配置信息，方便进行自定义渲染。
- 使用 `ref` 获取组件实例时，需要通过 `this.$refs.refName` 的方式访问方法。
- 在组件销毁前，自动清理相关计时器和事件监听器，避免内存泄漏。 