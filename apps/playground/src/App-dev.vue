<script setup lang="ts">
import PromptsDemo from './components/PromptsDemo.vue'
import ConversationsDemo from './components/ConversationsDemo.vue';
</script>

<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane label="Prompts">
      <!-- <PromptsDemo /> -->
      <ConversationsDemo />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-tabs {
  min-height: calc(100vh - 64px - 64px);
  background-color: beige;
}

.self-description {
  font-size: 14px;

  a {
    text-emphasis: none;
    color: coral;
    font-weight: 700;
  }
}
</style>
