# Welcome 组件

欢迎提示组件，用于展示引导性信息。

## 功能特性

- 支持两种样式变体：填充模式 (filled) 和无边框模式 (borderless)
- 支持自定义图标、标题、描述和额外内容
- 支持 RTL 布局
- 支持自定义样式和类名

## 使用示例

```vue
<template>
  <Welcome
    variant="filled"
    icon="https://example.com/icon.png"
    title="欢迎使用"
    description="这是描述信息"
    extra="更多操作"
  />
</template>

<script setup>
import Welcome from './Welcome.vue';
</script>