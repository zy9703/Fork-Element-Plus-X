<template>
  <div class="container">
    <div class="btn-list">
      <el-button :disabled="isLoading" @click="startSSE">
        {{ isLoading ? '加载中...' : '获取流数据' }}
      </el-button>

      <el-button :disabled="!isLoading" @click="cancel">
        中断请求
      </el-button>
    </div>
    <div v-if="error" class="error">
      {{ error.message }}
    </div>

    <Bubble v-if="content" :content="content" is-markdown max-width="700px" />
  </div>
</template>

<script>
import { useA3Stream } from './useA3Stream'
import Bubble from '../components/Bubble/index.vue'

export default {
  name: 'UseA3StreamSSEDemo',
  components: {
    Bubble
  },
  data() {
    return {
      data: [],
      error: null,
      isLoading: false,
      cancel: null
    }
  },
  computed: {
    content() {
      if (!this.data.length)
        return ''
      let text = ''
      for (let index = 0; index < this.data.length; index++) {
        const chunk = this.data[index].data
        try {
          const parsedChunk = JSON.parse(chunk).content
          text += parsedChunk
        }
        catch (error) {
          if (chunk === ' [DONE]') {
            // 处理数据结束的情况
          }
          else {
            console.error('解析数据时出错:', error)
          }
        }
      }
      console.log('Text:', text)
      return text
    }
  },
  methods: {
    async startSSE() {
      try {
        this.isLoading = true
        this.error = null
        this.data = []
        
        const response = await fetch('https://node-test.element-plus-x.com/api/sse', {
          headers: { 'Content-Type': 'text/event-stream' },
        })
        const readableStream = response.body

        const { startStream, cancel } = useA3Stream()
        this.cancel = cancel
        await startStream({ readableStream })
      }
      catch (err) {
        console.error('Fetch error:', err)
        this.error = err
      }
      finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.container .el-button {
  width: fit-content;
}
.container :deep(.markdown-body) {
  background-color: transparent;
  padding: 12px;
}
</style>