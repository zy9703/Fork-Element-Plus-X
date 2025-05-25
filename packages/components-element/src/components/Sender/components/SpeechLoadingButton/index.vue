<template>
  <el-button
    class="el-sender-speech-loading-button"
    circle
    @click="$emit('click')"
  >
    <div class="loading-container">
      <div class="loading-circle"></div>
    </div>
  </el-button>
</template>

<script>
export default {
  name: 'SenderSpeechLoadingButton'
}
</script>

<style scoped lang="scss">
.el-sender-speech-loading-button {
  --el-button-size: 32px;
  --el-button-padding-horizontal: 0;
  --el-button-padding-vertical: 0;
  --el-button-font-size: 16px;
  --el-button-border-radius: 50%;
  --el-button-bg-color: var(--el-color-danger);
  --el-button-text-color: var(--el-color-white);
  --el-button-border-color: var(--el-color-danger);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-bg-color: var(--el-color-danger-light-3);
  --el-button-hover-border-color: var(--el-color-danger-light-3);
  --el-button-active-text-color: var(--el-color-white);
  --el-button-active-border-color: var(--el-color-danger-dark-2);
  --el-button-active-bg-color: var(--el-color-danger-dark-2);
  --el-button-disabled-text-color: var(--el-color-white);
  --el-button-disabled-bg-color: var(--el-color-danger-light-5);
  --el-button-disabled-border-color: var(--el-color-danger-light-5);
}

.loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--el-color-white);
  border-top-color: transparent;
  animation: loading-rotate 1s linear infinite;
}

@keyframes loading-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>