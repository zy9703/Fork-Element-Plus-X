# Typewriter 打字器

## 一、概述

`Typewriter` 是一个基于 Vue2 和 Element UI 的打字器组件，支持 Markdown 渲染和动态打字效果。通过配置属性，您可以轻松实现文本内容的展示、Markdown 渲染以及模拟打字机的效果。

## 二、功能特性

1. **Markdown 支持**：支持渲染 Markdown 格式的文本，并应用 GitHub 风格的样式。
2. **动态打字效果**：可以模拟打字机的效果，逐步显示文本内容。
3. **代码高亮**：内置 Prism.js，支持代码块的语法高亮。
4. **XSS 安全**：使用 DOMPurify 对 HTML 内容进行过滤，防止 XSS 攻击。
5. **灵活配置**：支持自定义打字速度、光标字符、后缀等参数。

## 三、安装与使用

### 安装依赖

```bash
npm i element-plus-x
```

### 引入组件

在你的 Vue 2 项目中引入 `Typewriter` 组件：

```vue
<script>
import { A3Typewriter } from 'element-plus-x'

export default {
  components: {
    A3Typewriter
  },
  data() {
    return {
      content: '# Hello, World!\nThis is a **Markdown** example.'
    }
  }
}
</script>

<template>
  <A3Typewriter :content="content" :is-markdown="true" :typing="true" />
</template>
```

## 四、组件属性

| 属性名       | 类型                | 默认值  | 描述                                           |
| ------------ | ------------------- | ------- | ---------------------------------------------- |
| `content`    | String              | `''`    | 要展示的文本内容，支持纯文本或 Markdown 格式。 |
| `isMarkdown` | Boolean             | `false` | 是否启用 Markdown 渲染模式。                   |
| `typing`     | Boolean 或 Object   | `false` | 是否启用打字机效果或打字机配置对象。           |

### typing 配置对象属性

当 `typing` 属性设为对象时，可以包含以下属性：

| 属性名     | 类型   | 默认值 | 描述                             |
| ---------- | ------ | ------ | -------------------------------- |
| `step`     | Number | `2`    | 每次打字的字符数                 |
| `interval` | Number | `50`   | 打字间隔（毫秒）                 |
| `suffix`   | String | `'|'`  | 光标字符（仅在非 Markdown 下）   |

## 五、组件事件

| 事件名    | 参数            | 描述                   |
| --------- | --------------- | ---------------------- |
| `start`   | 组件实例        | 当打字开始时触发       |
| `writing` | 组件实例        | 打字过程中触发         |
| `finish`  | 组件实例        | 当打字机效果完成时触发 |

## 六、组件实例方法

通过 `ref` 可以获取组件实例并调用以下方法：

| 方法名          | 描述                     |
| --------------- | ------------------------ |
| `interrupt()`   | 中断打字过程             |
| `continueTyping()` | 继续未完成的打字过程     |
| `restart()`     | 重新开始打字             |
| `destroy()`     | 销毁组件实例（清理资源） |

组件实例还提供以下属性：

| 属性名            | 类型    | 描述                       |
| ----------------- | ------- | -------------------------- |
| `renderedContent` | String  | 当前渲染的内容             |
| `isTyping`        | Boolean | 是否正在打字               |
| `progress`        | Number  | 当前进度百分比（0-100）    |

## 七、使用示例

### 1. 普通文本打字效果

```vue
<template>
  <A3Typewriter content="This is a plain text example." :typing="true" />
</template>
```

### 2. 自定义打字配置

```vue
<template>
  <A3Typewriter 
    content="This is a customized typing effect." 
    :typing="{ step: 1, interval: 100, suffix: '💩' }" 
  />
</template>
```

### 3. Markdown 内容展示与打字效果

```vue
<template>
  <A3Typewriter 
    :content="markdownContent" 
    :is-markdown="true" 
    :typing="true" 
  />
</template>

<script>
export default {
  data() {
    return {
      markdownContent: `
# Markdown Example

This is a **Markdown** example with code highlight:

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`
      `
    }
  }
}
</script>
```

### 4. 控制打字过程

```vue
<template>
  <div>
    <A3Typewriter 
      ref="typewriter"
      content="Control the typing process with instance methods." 
      :typing="true" 
    />
    <el-button @click="$refs.typewriter.interrupt()">暂停</el-button>
    <el-button @click="$refs.typewriter.continueTyping()">继续</el-button>
    <el-button @click="$refs.typewriter.restart()">重新开始</el-button>
  </div>
</template>
```

### 5. 监听打字事件

```vue
<template>
  <A3Typewriter 
    content="Monitor typing events." 
    :typing="true" 
    @start="onStart"
    @writing="onWriting"
    @finish="onFinish"
  />
</template>

<script>
export default {
  methods: {
    onStart(instance) {
      console.log('Typing started', instance)
    },
    onWriting(instance) {
      console.log('Typing in progress', instance.progress)
    },
    onFinish(instance) {
      console.log('Typing finished', instance)
    }
  }
}
</script>
```

## 八、注意事项

- 由于 Markdown 渲染后的 HTML 结构可能包含行内块元素，在 Markdown 格式下，组件默认不展示光标。
- 在组件销毁前，会自动销毁打字实例，避免内存泄漏。
- 当使用 Vue 实例方法时，需要使用 `$refs` 来访问组件实例。 