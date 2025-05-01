<script setup lang="ts">
import type { AttachmentsProps } from './types.d.ts'

const props = withDefaults(defineProps<AttachmentsProps>(), {
  list: () => [],
})

// const emits = defineEmits([])

console.log('props', props)
</script>

<template>
  <div>
    上传组件
  </div>
</template>

<style scoped lang="scss">

</style>
