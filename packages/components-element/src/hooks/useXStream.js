// useXStream.js - Vue 2 Mixin

const DEFAULT_STREAM_SEPARATOR = '\n\n';
const DEFAULT_PART_SEPARATOR = '\n';
const DEFAULT_KV_SEPARATOR = ':';

// 工具函数
const isValidString = (str) => (str ?? '').trim() !== '';

// TransformStream 实现 (需要 polyfill 或确保环境支持)
// 注意：TransformStream 是现代 Web API，在旧版浏览器或非浏览器环境中可能需要 polyfill。
// 在 Vue 2 项目中，如果目标环境不支持，需要引入相应的 polyfill。
// 为了示例，这里保留了原有的结构，假设环境支持或已配置 polyfill。
function splitStream() {
  let buffer = '';

  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk;
      const parts = buffer.split(DEFAULT_STREAM_SEPARATOR);
      parts.slice(0, -1).forEach((part) => {
        if (isValidString(part))
          controller.enqueue(part);
      });
      buffer = parts[parts.length - 1];
    },
    flush(controller) {
      if (isValidString(buffer))
        controller.enqueue(buffer);
    },
  });
}

function splitPart() {
  return new TransformStream({
    transform(partChunk, controller) {
      const lines = partChunk.split(DEFAULT_PART_SEPARATOR);
      const sseEvent = lines.reduce((acc, line) => {
        const sepIndex = line.indexOf(DEFAULT_KV_SEPARATOR);
        if (sepIndex === -1)
          return acc;

        const key = line.slice(0, sepIndex);
        if (!isValidString(key))
          return acc;

        const value = line.slice(sepIndex + 1);
        return { ...acc, [key]: value };
      }, {});

      if (Object.keys(sseEvent).length > 0)
        controller.enqueue(sseEvent);
    },
  });
}

// 核心流处理函数（支持中断）
// 注意：ReadableStream 和 AbortController 是现代 Web API，可能需要 polyfill。
function XStream(
  options,
  signal,
) {
  const { readableStream, transformStream } = options;
  if (!(readableStream instanceof ReadableStream)) {
    // 使用 Vue 2 的警告或错误处理方式
    console.error('options.readableStream 必须是 ReadableStream 的实例。');
    // 或者抛出错误
    // throw new TypeError('options.readableStream 必须是 ReadableStream 的实例。');
    return null; // 返回 null 或一个空的模拟流
  }

  const decoderStream = new TextDecoderStream();
  const processedStream = transformStream
    ? readableStream
        .pipeThrough(decoderStream)
        .pipeThrough(transformStream)
    : readableStream
      .pipeThrough(decoderStream)
      .pipeThrough(splitStream())
      .pipeThrough(splitPart());

  // 为流添加异步迭代器并处理中断信号
  // 注意：异步迭代器是 ES2018 特性，可能需要 Babel 配置支持或 polyfill。
  processedStream[Symbol.asyncIterator] = async function* () {
    const reader = this.getReader();
    this.reader = reader; // 保存读取器引用
    try {
      while (true) {
        if (signal?.aborted) {
          await reader.cancel(); // 主动取消 reader
          break;
        }
        const { done, value } = await reader.read();
        if (done)
          break;
        if (value)
          yield value;
      }
    }
    finally {
      reader.releaseLock(); // 释放锁
    }
  };

  return processedStream;
}

// Vue 2 Mixin 实现
export default {
  data() {
    return {
      xstreamData: [],
      xstreamError: null,
      xstreamIsLoading: false,
      xstreamAbortController: null,
      xstreamCurrentStream: null,
    };
  },
  // watch: {
  //   // 监听 xstreamData 变化，触发处理逻辑
  //   xstreamData: {
  //     handler(newData) {
  //       // 这里的处理逻辑需要根据实际情况调整，
  //       // 在 Thinking/demo.vue 中，我们是在 watch 中处理 chunk 的。
  //       // 如果 useXStream 应该直接提供处理好的事件，则这里的 watch 可以简化。
  //       // 为了与 Thinking/demo.vue 中的 watch 逻辑匹配，这里不直接处理，
  //       // 而是让组件 watch mixin 提供的 xstreamData。
  //       // console.log('xstreamData changed in mixin:', newData);
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    // 启动流式请求
    async startXStream(options) {
      this.xstreamIsLoading = true;
      this.xstreamError = null;
      this.xstreamData = [];
      this.xstreamAbortController = new AbortController();
      this.xstreamCurrentStream = XStream(options, this.xstreamAbortController.signal);

      if (!this.xstreamCurrentStream) {
        this.xstreamIsLoading = false;
        return; // 处理 XStream 创建失败的情况
      }

      try {
        // 使用 for await...of 遍历流
        // 注意：异步迭代器和 for await...of 是 ES2018 特性，可能需要 Babel 配置支持或 polyfill。
        for await (const item of this.xstreamCurrentStream) {
          // 将接收到的数据添加到 mixin 的 data 中
          this.xstreamData.push(item);
        }
      }
      catch (err) {
        if (err instanceof Error) {
          this.xstreamError = err;
        }
      }
      finally {
        this.xstreamIsLoading = false;
        this.xstreamCurrentStream = null; // 释放流引用
        this.xstreamAbortController = null; // 释放控制器
      }
    },

    // 中断流式请求（强制关闭流）
    cancelXStream() {
      if (this.xstreamAbortController) {
        this.xstreamAbortController.abort();
      }
    },
  },
};