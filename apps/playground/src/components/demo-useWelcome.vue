<script setup lang="ts">

</script>

<template>
  <Welcome
    variant="filled"
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
    title="欢迎使用"
    description="这是描述信息"
    :style="{ background: 'linear-gradient(97deg, rgba(90,196,255,0.12) 0%, rgba(174,136,255,0.12) 100%)' }"
  >
    <template #extra>
      <el-button type="text">
        关于我
      </el-button>
    </template>
  </Welcome>
</template>

<style scoped lang="scss">

</style>
