<template>
  <el-button
    class="el-sender-clear-button"
    circle
    @click="$emit('clear')"
  >
    <i class="el-icon-brush"></i>
  </el-button>
</template>

<script>
export default {
  name: 'SenderClearButton'
}
</script>

<style scoped lang="scss">
.el-sender-clear-button {
  --el-button-size: 32px;
  --el-button-padding-horizontal: 0;
  --el-button-padding-vertical: 0;
  --el-button-font-size: 16px;
  --el-button-border-radius: 50%;
  --el-button-bg-color: var(--el-fill-color-light);
  --el-button-text-color: var(--el-text-color-regular);
  --el-button-border-color: var(--el-fill-color-light);
  --el-button-hover-text-color: var(--el-text-color-primary);
  --el-button-hover-bg-color: var(--el-fill-color);
  --el-button-hover-border-color: var(--el-fill-color);
  --el-button-active-text-color: var(--el-text-color-primary);
  --el-button-active-border-color: var(--el-fill-color-darker);
  --el-button-active-bg-color: var(--el-fill-color-darker);
  --el-button-disabled-text-color: var(--el-text-color-placeholder);
  --el-button-disabled-bg-color: var(--el-fill-color-light);
  --el-button-disabled-border-color: var(--el-fill-color-light);
}
</style>