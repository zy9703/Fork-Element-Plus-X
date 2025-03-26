<script setup lang="ts">
import { useRecord } from 'vue-element-plus-x'

const { start, value: text, loading, stop } = useRecord({
  onEnd: handleEnd,
})
function handleStart() {
  start()
}

function handleEnd(res: string) {
  console.log('end:', res)
}
</script>

<template>
  <button v-if="loading" @click="stop">
    结束
  </button>
  <button v-else @click="handleStart">
    开始
  </button>
  <div>{{ text }}</div>
</template>
