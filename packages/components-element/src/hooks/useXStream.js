/**
 * @description A utility function for handling Server-Sent Events (SSE) streams, providing parsing, iteration, and state management.
 * @description 用于处理服务器发送事件（SSE）流的实用函数，提供解析、迭代和状态管理。
 *
 * @typedef {Object} XStreamOptions
 * @property {string} [delimiter='\n\n'] - The delimiter used to separate events in the stream.
 * @property {string} [delimiter='\n\n'] - 用于分隔流中事件的分隔符。
 *
 * @property {Function} [parser] - A function to parse each event chunk.
 * @property {Function} [parser] - 用于解析每个事件块的函数。
 *
 * @property {Function} [onError] - A callback function triggered when an error occurs.
 * @property {Function} [onError] - 当发生错误时触发的回调函数。
 *
 * @property {Function} [onData] - A callback function triggered when data is received.
 * @property {Function} [onData] - 当接收到数据时触发的回调函数。
 *
 * @property {Function} [onFinish] - A callback function triggered when the stream finishes.
 * @property {Function} [onFinish] - 当流结束时触发的回调函数。
 *
 * @function XStream
 * Creates a utility for handling SSE streams with parsing and iteration capabilities.
 * 创建一个用于处理 SSE 流的实用工具，具有解析、迭代和状态管理功能。
 *
 * @param {XStreamOptions} [options] - Configuration options for the stream handling.
 * @param {XStreamOptions} [options] - 流处理的配置选项。
 *
 * @returns {Object} - An object containing methods for stream handling.
 * @returns {Object} - 包含流处理方法的对象。
 *
 * @property {Function} parse - Parses a stream of data using the specified delimiter and parser.
 * @property {Function} parse - 使用指定的分隔符和解析器解析数据流。
 *
 * @property {Function} iterate - Asynchronously iterates through a stream, yielding parsed chunks.
 * @property {Function} iterate - 异步迭代流，生成解析后的数据块。
 *
 * @property {Function} abort - Aborts the stream processing.
 * @property {Function} abort - 中止流处理。
 *
 * @example
 * const stream = XStream({
 *   delimiter: '\n\n',
 *   parser: JSON.parse,
 *   onError: (error) => console.error('Stream error:', error),
 *   onData: (data) => console.log('Received data:', data),
 *   onFinish: () => console.log('Stream finished'),
 * });
 *
 * // Parse a stream
 * const parsedData = stream.parse('event1\n\nevent2\n\nevent3');
 * console.log(parsedData); // [parsed event1, parsed event2, parsed event3]
 *
 * // Iterate through a stream asynchronously
 * (async () => {
 *   for await (const chunk of stream.iterate(fetchStream())) {
 *     console.log('Chunk:', chunk);
 *   }
 * })();
 */
export function XStream({
  delimiter = '\n\n',
  parser,
  onError,
  onData,
  onFinish,
} = {}) {
  let aborted = false

  const parse = (data) => {
    if (!data)
      return []

    const chunks = data.split(delimiter).filter(Boolean)

    if (parser) {
      return chunks.map((chunk) => {
        try {
          return parser(chunk)
        } catch (error) {
          onError && onError(error)
          return null
        }
      }).filter(Boolean)
    }

    return chunks
  }

  const iterate = async function* (stream) {
    if (!stream)
      return

    const reader = stream.getReader()
    const decoder = new TextDecoder('utf-8')
    let buffer = ''

    try {
      while (!aborted) {
        const { done, value } = await reader.read()

        if (done) {
          if (buffer) {
            const chunks = parse(buffer)
            for (const chunk of chunks) {
              onData && onData(chunk)
              yield chunk
            }
          }
          onFinish && onFinish()
          return
        }

        const text = decoder.decode(value, { stream: true })
        buffer += text

        const chunks = parse(buffer)
        const lastDelimiterIndex = buffer.lastIndexOf(delimiter)

        if (lastDelimiterIndex !== -1) {
          buffer = buffer.slice(lastDelimiterIndex + delimiter.length)

          for (const chunk of chunks) {
            onData && onData(chunk)
            yield chunk
          }
        }
      }
    } catch (error) {
      onError && onError(error)
      reader.releaseLock()
      throw error
    } finally {
      if (!aborted) {
        reader.releaseLock()
      }
    }
  }

  const abort = () => {
    aborted = true
  }

  return {
    parse,
    iterate,
    abort,
  }
}

const DEFAULT_STREAM_SEPARATOR = '\n\n'
const DEFAULT_PART_SEPARATOR = '\n'
const DEFAULT_KV_SEPARATOR = ':'

// 工具函数
const isValidString = (str) => (str ?? '').trim() !== ''

// TransformStream 实现 (Vue 2 环境可能需要 polyfill 或替代方案)
// 注意：TransformStream 是现代 Web API，在原生 Vue 2 环境中可能不支持。
// 如果需要兼容旧浏览器，可能需要引入 polyfill 或使用其他方式实现流处理。
function splitStream() {
  let buffer = ''

  // 这是一个简化的实现，假设环境支持 TransformStream
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
  // 这是一个简化的实现，假设环境支持 TransformStream
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
// 注意：ReadableStream 和 AbortSignal 也是现代 Web API，在原生 Vue 2 环境中可能不支持。
// 如果需要兼容旧浏览器，可能需要引入 polyfill 或使用其他方式实现流处理和中断。
function XStream(
  options,
  signal,
) {
  const { readableStream, transformStream } = options
  // 检查 readableStream 是否是 ReadableStream 的实例，需要环境支持
  if (!(readableStream instanceof ReadableStream)) {
    console.error('options.readableStream 必须是 ReadableStream 的实例。');
    // 在 Vue 2 mixin 中，可能需要通过 emit 或其他方式通知组件错误
    return null; // 返回 null 或抛出错误，取决于期望的行为
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

  // 为流添加异步迭代器并处理中断信号 (Vue 2 环境可能不支持 Symbol.asyncIterator)
  // 在 Vue 2 中，通常通过 ReadableStreamDefaultReader 手动读取流。
  // 以下代码是基于现代 JS 环境的实现，在 Vue 2 中需要调整。
  // 为了在 Vue 2 mixin 中使用，我们将把迭代逻辑移到 mixin 的 methods 中。

  return processedStream;
}

/**
 * @description A Vue 2 Options API mixin for handling Server-Sent Events (SSE) streams with reactive state management.
 * @description 一个用于处理服务器发送事件（SSE）流的 Vue 2 Options API mixin，具有响应式状态管理。
 *
 * @mixin useXStream
 * A Vue 2 mixin that provides reactive state management for SSE streams.
 * 一个提供 SSE 流响应式状态管理的 Vue 2 mixin。
 *
 * @property {boolean} loading - Indicates whether the stream is currently loading.
 * @property {boolean} loading - 指示流是否正在加载。
 *
 * @property {any} error - Contains any error that occurred during stream processing.
 * @property {any} error - 包含流处理过程中发生的任何错误。
 *
 * @property {Array} data - Contains the accumulated data from the stream.
 * @property {Array} data - 包含从流中累积的数据。
 *
 * @property {AbortController | null} abortController - The AbortController instance for cancelling the stream.
 * @property {AbortController | null} abortController - 用于取消流的 AbortController 实例。
 *
 * @property {ReadableStream | null} currentStream - The current active stream.
 * @property {ReadableStream | null} currentStream - 当前活动的流。
 *
 * @method startStream - Starts the stream processing.
 * @method startStream - 启动流处理。
 *
 * @method cancel - Aborts the stream processing.
 * @method cancel - 中止流处理。
 *
 * @example
 * import useXStream from './useXStream';
 *
 * export default {
 *   mixins: [useXStream],
 *   methods: {
 *     async fetchDataStream() {
 *       const readableStream = // get your readable stream here, e.g., from fetch
 *       this.startStream({ readableStream });
 *     }
 *   },
 *   beforeDestroy() {
 *     this.cancel(); // Ensure stream is cancelled on component destroy
 *   }
 * };
 */
export default {
  data() {
    return {
      loading: false,
      error: null,
      data: [],
      abortController: null,
      currentStream: null,
    }
  },
  methods: {
    /**
     * @description Starts the stream processing.
     * @description 启动流处理。
     *
     * @param {object} options - Options for the stream, including the readableStream.
     * @param {object} options - 流的选项，包括 readableStream。
     */
    async startStream(options) {
      this.loading = true;
      this.error = null;
      this.data = [];
      // 注意：AbortController 是现代 Web API，在原生 Vue 2 环境中可能不支持。
      // 如果需要兼容旧浏览器，可能需要引入 polyfill 或使用其他方式实现中断。
      this.abortController = new AbortController();

      // 使用上面定义的 XStream 实用函数获取处理后的流
      // 注意：XStream 实用函数本身依赖现代 Stream API，可能需要 polyfill 或重写。
      this.currentStream = XStream(options, this.abortController.signal);

      if (!this.currentStream) {
        this.loading = false;
        // 可以在这里触发一个错误事件或回调
        return;
      }

      // 在 Vue 2 中手动读取流
      const reader = this.currentStream.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      try {
        while (true) {
          // 检查中断信号 (需要 AbortSignal polyfill 或替代方案)
          if (this.abortController && this.abortController.signal.aborted) {
            await reader.cancel(); // 取消 reader
            break;
          }

          const { done, value } = await reader.read();
          if (done) {
            // 处理剩余的 buffer
            if (buffer) {
              const chunks = this.parseStreamChunk(buffer);
              chunks.forEach(chunk => this.data.push(chunk));
            }
            break;
          }

          if (value) {
            const text = decoder.decode(value, { stream: true });
            buffer += text;

            // 处理 buffer 中的完整事件
            const chunks = this.parseStreamChunk(buffer);
            const lastDelimiterIndex = buffer.lastIndexOf(DEFAULT_STREAM_SEPARATOR);

            if (lastDelimiterIndex !== -1) {
              buffer = buffer.slice(lastDelimiterIndex + DEFAULT_STREAM_SEPARATOR.length);
              chunks.forEach(chunk => this.data.push(chunk));
            }
          }
        }
      } catch (err) {
        // 检查是否是 AbortError
        if (err.name === 'AbortError') {
          console.log('Stream aborted');
          // 可以在这里触发一个中止事件或回调
        } else if (err instanceof Error) {
          this.error = err;
          // 可以在这里触发一个错误事件或回调
        } else {
           this.error = new Error('Unknown stream error');
        }
      } finally {
        reader.releaseLock(); // 释放锁
        this.loading = false;
        this.currentStream = null;
        this.abortController = null;
      }
    },

    /**
     * @description Parses a chunk of stream data into individual events.
     * @description 将流数据块解析为单个事件。
     *
     * @param {string} chunkData - The raw chunk data string.
     * @param {string} chunkData - 原始数据块字符串。
     *
     * @returns {Array} - An array of parsed event objects.
     * @returns {Array} - 解析后的事件对象数组。
     */
    parseStreamChunk(chunkData) {
       if (!chunkData) return [];

       const chunks = chunkData.split(DEFAULT_STREAM_SEPARATOR).filter(Boolean);

       // 这里可以根据需要添加自定义的 parser 逻辑
       // 目前直接返回分割后的块
       return chunks.map(chunk => {
           // 进一步解析每个事件块的 key-value 对
           const lines = chunk.split(DEFAULT_PART_SEPARATOR);
           const sseEvent = lines.reduce((acc, line) => {
               const sepIndex = line.indexOf(DEFAULT_KV_SEPARATOR);
               if (sepIndex === -1) return acc;

               const key = line.slice(0, sepIndex);
               if (!isValidString(key)) return acc;

               const value = line.slice(sepIndex + 1);
               return { ...acc, [key]: value };
           }, {});
           return Object.keys(sseEvent).length > 0 ? sseEvent : null;
       }).filter(Boolean);
    },

    /**
     * @description Aborts the stream processing.
     * @description 中止流处理。
     */
    cancel() {
      if (this.abortController) {
        this.abortController.abort();
      } else if (this.currentStream && this.currentStream.cancel) {
         // 如果没有 AbortController 但有流实例，尝试调用流的 cancel 方法
         // 注意：ReadableStream 的 cancel 方法也需要环境支持
         this.currentStream.cancel();
      }
    },
  },
  beforeDestroy() {
    // Ensure the stream is cancelled when the component is destroyed
    this.cancel();
  },
}