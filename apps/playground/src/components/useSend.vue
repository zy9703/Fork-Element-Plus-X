<script setup lang="ts">
import { useSend, XRequest } from 'vue-element-plus-x'

const str = ref<string>('')
let finish = () => {
}

const sse = new XRequest({
  baseURL: 'https://sse.dev',
  type: 'fetch',
  transformer: (e) => {
    console.log('transformer:', e)
    const a = e.trim().split('\n')
    const r = a.pop()
    return r
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
  onFinish: (data) => {
    console.log('onFinish:', data)
    finish()
  },
})

function startFn() {
  str.value = ''
  sse.send('/api/sip')
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

const { send, loading, abort, finish: _finish } = useSend({
  sendHandler: startFn,
  abortHandler: sse.abort,
})

finish = _finish

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
