<script setup lang="ts">
import { useSend, SSE } from 'vue-element-plus-x/src/hooks/useSend'

const es = ref<EventSource | null>(null)
const str = ref<string>('')

const sse = new SSE({
  baseURL: 'https://sse.dev',
  type: 'fetch',
  transformer: (e) => {
    console.log('transformer:', e)
    return JSON.parse(e).msg
  },
  onMessage: (msg) => {
    console.log('onMessage:', msg)
    str.value += `\n${msg}`
  },
  onError: (es, e) => {
    console.log('onError:', es, e)
  },
  onOpen: () => {
    console.log('onOpen')
  },
  onAbort: (messages) => {
    console.log('onAbort', messages)
  },
  onFinish: (data)=> {
    console.log('onFinish:', data)
    finish();
  }
})

function clearEs() {
  console.log('clearEs')
  if (es.value) {
    es.value.close()
    es.value = null
  }
}
function startFn() {
  str.value = ''
  sse.send('/test')
  // es.value = new EventSource('https://sse.dev/test')
  // es.value.onopen = () => {
  //   console.log('onOpen')
  // }
  // es.value.onerror = () => {
  //   clearEs()
  // }
  // es.value.onmessage = (e) => {
  //   console.log('getData:', e.data)
  //   const r = JSON.parse(e.data)
  //   str.value += `\n${r.msg}`
  // }
}

const { send, loading, abort, finish } = useSend({
  sendHandler: startFn,
  onAbort: clearEs,
  abortHandler: sse.abort,
})

setTimeout(() => {
  abort()
}, 20_000)
</script>

<template>
  <button v-if="!loading" @click="send">
    开始发送
  </button>
  <button v-else @click="abort">
    终止发送
  </button>
  <div>{{ str }}</div>
</template>
