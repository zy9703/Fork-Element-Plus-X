<template>
  <div class="container">
    <div class="btn-list">
      <el-button :disabled="isLoading" @click="startSIPStream">
        {{ isLoading ? '加载中...' : '获取流数据' }}
      </el-button>

      <el-button :disabled="!isLoading" @click="cancel">
        中断请求
      </el-button>
    </div>
    <div v-if="error" class="error">
      {{ error.message }}
    </div>

    <Bubble :content="content" is-markdown max-width="700px" />
  </div>
</template>

<script>
import { useA3Stream } from './useA3Stream'
import Bubble from '../components/Bubble/index.vue'

export default {
  name: 'UseA3StreamSIPDemo',
  components: {
    Bubble
  },
  data() {
    return {
      data: [],
      error: null,
      isLoading: false,
    }
  },
  computed: {
    content() {
      if (!this.data.length)
        return ''
      let text = ''
      for (let index = 0; index < this.data.length; index++) {
        const chunk = this.data[index]
        try {
          console.log('chunk', chunk)
          text += chunk
        }
        catch (error) {
          console.error('解析数据时出错:', error)
        }
      }
      console.log('Text:', text)
      return text
    }
  },
  watch: {
    data: {
      handler(newVal) {
        console.log('New data:', newVal)
      },
      deep: true
    }
  },
  methods: {
    async startSIPStream() {
      try {
        this.isLoading = true
        this.error = null
        this.data = []
        
        const response = await fetch('https://node-test.element-plus-x.com/api/sip', {
          headers: { 'Content-Type': 'application/sip' },
        })
        const readableStream = response.body

        const sipTransformStream = new TransformStream({
          transform(chunk, controller) {
            controller.enqueue(chunk)
          },
        })

        const { startStream, cancel } = useA3Stream()
        this.cancel = cancel
        await startStream({ readableStream, transformStream: sipTransformStream })
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