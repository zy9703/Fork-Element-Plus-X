# AiChatDemo 组件

AI聊天组件是一个模拟AI助手对话的界面组件，基于Element UI构建，集成了多种功能，提供了流畅的用户交互体验。

## 基本功能

- 聊天对话界面，支持用户与AI助手的消息交互
- 空状态下显示欢迎信息和常见问题推荐
- 支持附件上传功能，可展示附件列表
- 集成了`A3Sender`、`A3BubbleList`和`A3Attachments`组件
- 支持打字机效果显示AI回复
- 支持命令操作（@命令和/命令）

## 使用方法

### 基本用法

```vue
<template>
  <div style="height: 600px;">
    <ai-chat-demo />
  </div>
</template>

<script>
import AiChatDemo from './components/AiChatDemo';

export default {
  components: {
    AiChatDemo
  }
}
</script>
```

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| (暂无自定义属性) | - | - | - |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| (暂无自定义事件) | - | - |

## 项目集成

该组件主要作为演示使用，展示了如何集成其他基础组件（`A3Sender`、`A3BubbleList`、`A3Attachments`）来构建一个复杂的聊天界面。

## 扩展建议

1. 可以添加属性来自定义AI回复内容
2. 增加多会话支持
3. 添加历史记录保存功能
4. 增加更多的自定义主题选项
5. 实现真实的AI接口集成 