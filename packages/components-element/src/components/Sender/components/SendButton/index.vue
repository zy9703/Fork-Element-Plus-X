<template>
  <el-button
    class="el-sender-send-button"
    :disabled="disabled"
    circle
    @click="$emit('submit')"
  >
    <i class="el-icon-top"></i>
  </el-button>
</template>

<script>
export default {
  name: 'SenderSendButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.el-sender-send-button {
  --el-button-size: 32px;
  --el-button-padding-horizontal: 0;
  --el-button-padding-vertical: 0;
  --el-button-font-size: 16px;
  --el-button-border-radius: 50%;
  --el-button-bg-color: var(--el-color-primary);
  --el-button-text-color: var(--el-color-white);
  --el-button-border-color: var(--el-color-primary);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-bg-color: var(--el-color-primary-light-3);
  --el-button-hover-border-color: var(--el-color-primary-light-3);
  --el-button-active-text-color: var(--el-color-white);
  --el-button-active-border-color: var(--el-color-primary-dark-2);
  --el-button-active-bg-color: var(--el-color-primary-dark-2);
  --el-button-disabled-text-color: var(--el-color-white);
  --el-button-disabled-bg-color: var(--el-color-primary-light-5);
  --el-button-disabled-border-color: var(--el-color-primary-light-5);
}
</style>