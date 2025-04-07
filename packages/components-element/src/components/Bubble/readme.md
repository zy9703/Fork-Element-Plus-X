# A3Bubble 气泡

## 一、概述

`A3Bubble` 是一个基于 Vue 2 和 Element UI 开发的对话气泡组件，它可以用于展示对话内容，支持自定义头像、头部、内容、底部，并且具备打字效果和加载状态展示。该组件依赖于封装的 `A3Typewriter` 打字器组件，能够实现文本的打字动画效果。

## 二、功能特性

1. **布局方向** - 支持左对齐(`start`)和右对齐(`end`)
2. **内容类型** - 支持纯文本、Markdown、自定义插槽内容
3. **加载状态** - 内置加载动画，支持自定义加载内容
4. **视觉效果** - 提供多种形状和变体（圆角/直角、填充/描边/阴影等）
5. **打字动画** - 支持渐进式文字输出效果
6. **灵活插槽** - 提供头像、头部、内容、底部、加载状态等插槽

## 三、使用方法

### 引入组件

在你的 Vue 2 项目中引入 `A3Bubble` 组件：

```vue
<template>
  <A3Bubble :content="yourContent" :typing="true" />
</template>

<script>
import { A3Bubble } from '@/components/Bubble'

export default {
  components: {
    A3Bubble
  },
  data() {
    return {
      yourContent: 'This is a bubble content.'
    }
  }
}
</script>
```

## 四、组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `content` | String | '' | 气泡内要展示的文本内容，可与 `slot` 配合使用。 |
| `reasoning_content` | String | '' | 用于显示AI推理过程或补充说明的文本内容。支持多行文本，常用于展示AI的思考过程。 |
| `placement` | String | 'start' | 气泡的位置，可选值为 `'start'` 或 `'end'`，分别表示左侧和右侧。 |
| `loading` | Boolean | false | 是否显示加载状态。为 `true` 时，气泡内会显示加载动画。 |
| `shape` | String | null | 气泡的形状，可选值为 `'round'`（圆角）或 `'corner'`（有角）。 |
| `variant` | String | 'filled' | 气泡的样式变体，可选值为 `'filled'`（填充）、`'borderless'`（无边框）、`'outlined'`（轮廓）、`'shadow'`（阴影）。 |
| `isMarkdown` | Boolean | false | 是否将 `content` 内容作为 Markdown 格式处理。 |
| `typing` | Boolean \| Object | false | 打字机效果配置。可以是布尔值或配置对象：<br>- `Boolean`: true启用默认配置<br>- `Object`: 自定义配置，包含：<br>  - `suffix`: 光标后缀字符，默认'\|'<br>  - `step`: 每次打字字符数，默认2<br>  - `interval`: 打字间隔(毫秒)，默认50 |
| `maxWidth` | String | '500px' | 气泡内容的最大宽度。 |
| `avatarSize` | String | '' | 头像大小。 |
| `avatarGap` | String | '12px' | 头像与内容的间距。 |
| `avatarShape` | String | 'circle' | 头像形状，可选值为 `'circle'`（圆形）或 `'square'`（方形）。 |
| `avatarIcon` | String | '' | 头像图标。 |
| `avatarFit` | String | 'cover' | 头像图片填充模式，可选值为 `'cover'`、`'contain'`、`'fill'`、`'none'`、`'scale-down'`。 |
| `noStyle` | Boolean | false | 是否禁用默认样式。 |

## 五、组件事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `start` | 打字开始时触发的事件。 | `instance`：打字实例对象。 |
| `finish` | 打字完成时触发的事件。 | `instance`：打字实例对象。 |
| `writing` | 打字过程中触发的事件。 | `instance`：打字实例对象。 |
| `avatarError` | 头像加载错误时触发。 | `event`：错误事件对象。 |

## 六、组件方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `interrupt` | 中断当前打字动画。 | - |
| `continueTyping` | 继续被中断的打字动画。 | - |
| `restart` | 重置并重新开始打字动画。 | - |
| `destroy` | 销毁打字动画实例。 | - |

## 七、插槽

### 1. `avatar`

用于自定义气泡左侧或右侧的头像部分。

```vue
<template>
  <A3Bubble content="Hello!">
    <template #avatar>
      <el-avatar :size="32" src="https://example.com/avatar.jpg" />
    </template>
  </A3Bubble>
</template>
```

### 2. `header`

用于在气泡内容上方添加自定义头部内容。

```vue
<template>
  <A3Bubble content="Hello!">
    <template #header>
      <div>用户名 - 12:30</div>
    </template>
  </A3Bubble>
</template>
```

### 3. `content`

用于完全自定义气泡内容区域。当提供此插槽时，`content` 属性将被忽略。

```vue
<template>
  <A3Bubble>
    <template #content>
      <div>自定义内容区域，可以放置任何内容</div>
    </template>
  </A3Bubble>
</template>
```

### 4. `footer`

用于在气泡内容下方添加自定义底部内容。

```vue
<template>
  <A3Bubble content="Hello!">
    <template #footer>
      <div class="footer-actions">
        <el-button type="text" icon="el-icon-refresh">重新生成</el-button>
        <el-button type="text" icon="el-icon-copy-document">复制</el-button>
      </div>
    </template>
  </A3Bubble>
</template>
```

### 5. `loading`

用于自定义加载状态的显示内容。仅当 `loading` 属性为 `true` 时可见。

```vue
<template>
  <A3Bubble :loading="true">
    <template #loading>
      <el-loading type="primary" />
    </template>
  </A3Bubble>
</template>
```

## 八、示例

### 基础用法

```vue
<template>
  <div>
    <A3Bubble content="这是一条简单的消息" placement="start" />
    <A3Bubble content="这是用户发送的消息" placement="end" />
  </div>
</template>
```

### 带打字效果

```vue
<template>
  <A3Bubble 
    content="这是一条带打字效果的消息，会自动一个字一个字地显示出来。" 
    :typing="true" 
  />
</template>
```

### 自定义打字效果

```vue
<template>
  <A3Bubble 
    content="这是一条带自定义打字效果的消息。" 
    :typing="{ 
      step: 2,        // 每次显示2个字符
      interval: 100,  // 每100毫秒显示一次
      suffix: '❤️'    // 使用心形作为光标
    }" 
  />
</template>
```

### 加载状态

```vue
<template>
  <A3Bubble :loading="true" />
</template>
```

### 带头像和推理内容

```vue
<template>
  <A3Bubble 
    content="这是一条带头像和推理内容的消息" 
    reasoning_content="正在分析问题...
1. 首先理解用户输入
2. 然后生成回答"
    avatar="https://example.com/avatar.jpg" 
  />
</template>
```

### 完整示例

```vue
<template>
  <A3Bubble
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
      <div>我是头部内容</div>
    </template>

    <template #footer>
      <div>
        <el-button type="info" icon="el-icon-refresh" size="small" circle />
        <el-button type="success" icon="el-icon-search" size="small" circle />
        <el-button type="warning" icon="el-icon-star-off" size="small" circle />
        <el-button type="primary" icon="el-icon-document-copy" size="small" circle />
      </div>
    </template>
  </A3Bubble>
</template>

<script>
export default {
  data() {
    return {
      avatar: 'https://example.com/avatar.jpg',
      loading: false,
      content: `
# 标题
这是一个 Markdown 示例。
- 列表项 1
- 列表项 2
**粗体文本** 和 *斜体文本*
\`\`\`javascript
console.log('Hello, world!');
\`\`\`
      `.trim()
    }
  }
}
</script>
```