<!-- home 首页-使用 Bubble 组件 -->
<script setup lang="ts">
// import type { PromptsItemsProps } from 'vue-element-plus-x/types/components/Attachments/types.d.ts'
import { Attachments } from 'vue-element-plus-x'
</script>

<template>
  <div class="component-container">
    <div class="component-title">
      附件上传组件-基础演示
    </div>
    <Attachments />
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  height: calc(100vh - 120px);

  .component-title {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 8px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 12px;
    margin-top: 24px;

    &::after {
      position: absolute;
      content: '';
      display: block;
      width: 5px;
      height: 75%;
      border-radius: 15px;
      left: 0;
      background-color: #409EFF;
    }
  }
}
</style>
