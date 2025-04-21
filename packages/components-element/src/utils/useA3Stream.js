import { ref, shallowRef } from 'vue'

// 定义SSE（Server-Sent Events）流处理的分隔符常量
// 双换行符用于分隔不同的SSE消息块
const DEFAULT_STREAM_SEPARATOR = '\n\n'
// 单换行符用于分隔SSE消息块中的各个字段
const DEFAULT_PART_SEPARATOR = '\n'
// 冒号用于分隔SSE消息字段的键和值
const DEFAULT_KV_SEPARATOR = ':'

// 工具函数：检查字符串是否有效（非空且去除空格后长度大于0）
const isValidString = (str) => (str ?? '').trim() !== ''

// TransformStream 实现：将SSE流分割成独立的消息块
function splitStream() {
  // 用于存储未处理完的数据
  let buffer = ''

  return new TransformStream({
    // 处理每个数据块
    transform(chunk, controller) {
      // 将新数据追加到缓冲区
      buffer += chunk
      // 按双换行符分割消息块
      const parts = buffer.split(DEFAULT_STREAM_SEPARATOR)
      // 处理除最后一个部分外的所有完整消息块
      parts.slice(0, -1).forEach((part) => {
        if (isValidString(part))
          controller.enqueue(part)
      })
      // 保留最后一个可能不完整的部分
      buffer = parts[parts.length - 1]
    },
    // 处理流结束时的剩余数据
    flush(controller) {
      if (isValidString(buffer))
        controller.enqueue(buffer)
    },
  })
}

// 将SSE消息块解析为结构化的事件对象
function splitPart() {
  return new TransformStream({
    transform(partChunk, controller) {
      // 按换行符分割消息字段
      const lines = partChunk.split(DEFAULT_PART_SEPARATOR)
      // 解析每个字段的键值对
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

      // 只有当事件对象包含有效字段时才输出
      if (Object.keys(sseEvent).length > 0)
        controller.enqueue(sseEvent)
    },
  })
}

// 核心流处理函数：创建可中断的SSE流处理管道
function XStream(options, signal) {
  const { readableStream, transformStream } = options
  // 验证输入流的类型
  if (!(readableStream instanceof ReadableStream)) {
    throw new TypeError('options.readableStream 必须是 ReadableStream 的实例。')
  }

  // 创建文本解码器流
  const decoderStream = new TextDecoderStream()
  // 构建流处理管道
  const processedStream = transformStream
    ? readableStream
        .pipeThrough(decoderStream)
        .pipeThrough(transformStream)
    : readableStream
      .pipeThrough(decoderStream)
      .pipeThrough(splitStream())
      .pipeThrough(splitPart())

  // 为流添加异步迭代器，支持中断操作
  processedStream[Symbol.asyncIterator] = async function* () {
    const reader = this.getReader()
    this.reader = reader // 保存读取器引用以便后续清理
    try {
      while (true) {
        // 检查是否收到中断信号
        if (signal?.aborted) {
          await reader.cancel() // 主动取消读取器
          break
        }
        // 读取下一个数据块
        const { done, value } = await reader.read()
        if (done)
          break
        if (value)
          yield value
      }
    }
    finally {
      reader.releaseLock() // 确保释放读取器锁
    }
  }

  return processedStream
}

// Vue3 Hooks 实现：提供SSE流的状态管理和控制接口
export function useXStream() {
  // 状态管理
  const data = ref([]) // 存储接收到的SSE事件数据
  const error = ref(null) // 存储错误信息
  const isLoading = ref(false) // 标记加载状态
  const abortController = shallowRef(null) // 用于中断流的控制器
  const currentStream = shallowRef(null) // 当前活动的流引用

  // 启动流式请求
  const startStream = async (options) => {
    isLoading.value = true
    error.value = null
    data.value = []
    // 创建新的中断控制器
    abortController.value = new AbortController()
    // 初始化流处理
    currentStream.value = XStream(options, abortController.value.signal)

    try {
      // 异步迭代接收数据
      for await (const item of currentStream.value) {
        data.value.push(item)
      }
    }
    catch (err) {
      error.value = err
    }
    finally {
      // 清理资源
      isLoading.value = false
      currentStream.value = null // 释放流引用
      abortController.value = null // 释放控制器
    }
  }

  // 中断流式请求
  const cancel = () => {
    if (abortController.value) {
      abortController.value.abort()
    }
  }

  // 返回状态和控制方法
  return {
    startStream, // 启动流
    cancel, // 中断流
    data, // 数据列表
    error, // 错误信息
    isLoading, // 加载状态
  }
}