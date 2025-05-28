import { ref } from 'vue';
const DEFAULT_STREAM_SEPARATOR = '\n\n'
const DEFAULT_PART_SEPARATOR = '\n'
const DEFAULT_KV_SEPARATOR = ':'

// 工具函数
const isValidString = (str) => (str ?? '').trim() !== ''

// TransformStream 实现
function splitStream() {
  let buffer = ''

  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk
      const parts = buffer.split(DEFAULT_STREAM_SEPARATOR)
      parts.slice(0, -1).forEach((part) => {
        if (isValidString(part))
          controller.enqueue(part)
      })
      buffer = parts[parts.length - 1]
    },
    flush(controller) {
      if (isValidString(buffer))
        controller.enqueue(buffer)
    },
  })
}

function splitPart() {
  return new TransformStream({
    transform(partChunk, controller) {
      const lines = partChunk.split(DEFAULT_PART_SEPARATOR)
      const sseEvent = lines.reduce((acc, line) => {
        const sepIndex = line.indexOf(DEFAULT_KV_SEPARATOR)
        if (sepIndex === -1)
          return acc

        const key = line.slice(0, sepIndex)
        if (!isValidString(key))
          return acc

        const value = line.slice(sepIndex + 1)
        return { ...acc, [key]: value }
      }, {})

      if (Object.keys(sseEvent).length > 0)
        controller.enqueue(sseEvent)
    },
  })
}

// 核心流处理函数（支持中断）
function XStream(
  options,
  signal,
) {
  const { readableStream, transformStream } = options
  if (!(readableStream instanceof ReadableStream)) {
    throw new TypeError('options.readableStream 必须是 ReadableStream 的实例。')
  }

  const decoderStream = new TextDecoderStream()
  const processedStream = transformStream
    ? readableStream
        .pipeThrough(decoderStream)
        .pipeThrough(transformStream)
    : readableStream
      .pipeThrough(decoderStream)
      .pipeThrough(splitStream())
      .pipeThrough(splitPart());

  // 为流添加异步迭代器并处理中断信号
  processedStream[Symbol.asyncIterator] = async function* () {
    const reader = this.getReader();
    this.reader = reader // 保存读取器引用
    try {
      while (true) {
        if (signal && signal.aborted) {
          await reader.cancel() // 主动取消 reader
          break
        }
        const { done, value } = await reader.read()
        if (done)
          break
        if (value)
          yield value
      }
    }
    finally {
      reader.releaseLock() // 释放锁
    }
  }

  return processedStream
}

// Vue2 兼容的 Hooks 实现
export function useXStream() {
  const data = ref([])
  const error = ref(null)
  const isLoading = ref(false)
  const abortController = ref(null)
  const currentStream = ref(null)

  // 启动流式请求
  const startStream = async (options) => {
    isLoading.value = true
    error.value = null
    data.value = []
    abortController.value = new AbortController()
    currentStream.value = XStream(options, abortController.value.signal)

    try {
      for await (const item of currentStream.value) {
        data.value.push(item)
      }
    }
    catch (err) {
      if (err instanceof Error) {
        error.value = err
      }
    }
    finally {
      isLoading.value = false
      currentStream.value = null // 释放流引用
      abortController.value = null // 释放控制器
    }
  }

  // 中断流式请求（强制关闭流）
  const cancel = () => {
    if (abortController.value) {
      abortController.value.abort()
    }
  }

  return {
    startStream,
    cancel, // 新增中断方法
    data,
    error,
    isLoading,
  }
}