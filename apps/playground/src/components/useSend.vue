<script setup lang="ts">
import { useSend } from 'vue-element-plus-x'

const es = ref<EventSource | null>(null)
const str = ref<string>('')

function clearEs() {
  if (es.value) {
    es.value.close()
    es.value = null
  }
}
function startFn() {
  str.value = ''
  es.value = new EventSource('https://sse.dev/test')
  es.value.onopen = () => {
    console.log('onOpen')
  }
  es.value.onerror = () => {
    clearEs()
  }
  es.value.onmessage = (e) => {
    console.log('getData:', e.data)
    const r = JSON.parse(e.data)
    str.value += `\n${r.msg}`
  }
}

const { send, loading, abort } = useSend({
  sendHandler: startFn,
  onAbort: clearEs,
  eventSource: es.value!,
})

setTimeout(() => {
  abort()
}, 20_000)
</script>

<template>
  <div>{{ str }}</div>
  <button v-if="!loading" @click="send">
    开始发送
  </button>
  <button v-else @click="abort">
    终止发送
  </button>
</template>
