/**
 * XRequest 类用于处理 SSE 和 Fetch 请求
 */
export class XRequest {
  #instance = null
  #transformer = null
  #baseURL = ''
  #baseOptions = null
  #onAbort = null
  #onMessage = null
  #onError = null
  #onOpen = null
  #type = 'sse'
  #controller = null
  #onFinish = null
  #messages = []

  constructor({ baseURL, onAbort, onMessage, onError, baseOptions, transformer, type, onFinish, ...props } = {}) {
    this.#baseURL = baseURL ?? ''
    this.#baseOptions = baseOptions ?? {}
    onAbort && (this.#onAbort = onAbort)
    onMessage && (this.#onMessage = onMessage)
    onError && (this.#onError = onError)
    onFinish && (this.#onFinish = onFinish);
    (props.onOpen) && (this.#onOpen = props.onOpen)
    transformer && (this.#transformer = transformer)
    type && (this.#type = type)
    this.abort = this.abort.bind(this)
    this.send = this.send.bind(this)
  }

  #sendWithFetch(url, options = {}) {
    this.#controller = new AbortController()
    const signal = this.#controller.signal
    const fetchOptions = {
      ...options,
      signal,
    }
    return fetch(this.#baseURL + url, fetchOptions).then(res => res.body).then(async (body) => {
      if (!body)
        return Promise.reject(new Error('Response body is null in stream mode'))
      const reader = body.getReader()
      const decoder = new TextDecoder('utf-8')
      let done = false
      while (!done) {
        const { value, done: streamDone } = await reader.read()
        done = streamDone
        if (streamDone) {
          this.#onFinish && this.#onFinish(this.#messages)
          return
        };
        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          const chunkUse = chunk.startsWith('data: ') ? chunk.slice(6) : chunk
          try {
            const res = this.#transformer ? this.#transformer(chunkUse) : chunkUse
            this.#messages.push(res)
            this.#onMessage && this.#onMessage(res)
          }
          catch (error) {
            this.#onError && this.#onError(error)
            this.#controller && this.#controller.abort()
            return Promise.reject(error)
          }
        }
      }
    }).catch((err) => {
      if (err.name === 'AbortError') {
        this.#onAbort && this.#onAbort(this.#messages)
        return
      }
      this.#onError && this.#onError(err)
      this.#controller && this.#controller.abort()
    })
  }

  #sendWithSSE(url, options = {}) {
    const es = new EventSource(this.#baseURL + url, { ...this.#baseOptions, ...options })
    es.onmessage = (e) => {
      const res = this.#transformer ? this.#transformer(e.data) : e
      this.#onMessage && this.#onMessage(res)
    }
    es.onopen = () => {
      this.#onOpen && this.#onOpen()
    }
    es.onerror = (ev) => {
      if (es.readyState === EventSource.CLOSED) {
        this.#onFinish && this.#onFinish(this.#messages)
      }
      else {
        this.#onError && this.#onError(es, ev)
      }
      this.abort()
    }
    this.#instance = es
    return es
  }

  send(url, options = {}) {
    switch (this.#type) {
      case 'fetch':
        this.#sendWithFetch(url, options)
        break
      default:
        this.#sendWithSSE(url, options)
    }
    return this
  }

  abort() {
    this.#instance && this.#instance.close && this.#instance.close()
    this.#instance = null
    this.#controller && this.#controller.abort()
    this.#controller = null
    this.#onAbort && this.#onAbort(this.#messages)
    this.#messages = []
  }
}

/**
 * @description A utility function for handling the request status of send operation management, supporting optional abort functionality, as well as Promise and Server-Sent Events (SSE).
 * @description 一个用于处理发送操作管理请求状态的实用函数，支持可选的中止功能，同时支持 Promise 和 SSE（服务端事件）。
 *
 * @typedef {object} UseSendProps
 * @property {() => void} [onAbort] - Optional callback triggered when the operation is aborted.
 * @property {() => void} [onAbort] - 可选的回调函数，在操作被中止时触发。
 * @property {(...args: any[]) => void} [sendHandler] - Optional handler function invoked before sending starts.
 * @property {(...args: any[]) => void} [sendHandler] - 可选的处理函数，在发送开始前调用。
 * @property {() => void} [abortHandler] - Optional handler function invoked when the operation is aborted.
 * @property {() => void} [abortHandler] - 可选的处理函数，在操作被中止时调用。
 * @property {() => void} [finishHandler] - Optional handler function invoked when the operation finishes.
 * @property {() => void} [finishHandler] - 可选的处理函数，在操作完成时调用。
 *
 * @mixin useSend
 * A Vue 2 mixin that provides reactive state management for send operations.
 * 一个提供发送操作响应式状态管理的 Vue 2 mixin。
 *
 * @property {boolean} loading - A reactive reference indicating whether a send operation is in progress.
 * @property {boolean} loading - 一个响应式引用，指示是否正在执行发送操作。
 *
 * @method handleSend - Internal handler for initiating the send operation.
 * @method handleSend - 启动发送操作的内部处理函数。
 *
 * @method handleAbort - Internal handler for aborting the ongoing operation.
 * @method handleAbort - 中止当前操作的内部处理函数。
 *
 * @method handleFinish - Internal handler for finishing the operation.
 * @method handleFinish - 完成操作的内部处理函数。
 *
 * @method abort - A function to abort the ongoing operation.
 * @method abort - 一个用于中止当前操作的函数。
 *
 * @method send - A function to initiate the send operation.
 * @method send - 一个用于启动发送操作的函数。
 *
 * @method finish - A function to mark the operation as finished.
 * @method finish - 一个用于标记操作完成的函数。
 *
 * @example
 * import useSend from './useSend';
 *
 * export default {
 *   mixins: [useSend],
 *   methods: {
 *     async performSend() {
 *       this.send(() => {
 *         // Your send logic here
 *         console.log('Sending...');
 *       });
 *       // Simulate async operation
 *       await new Promise(resolve => setTimeout(resolve, 1000));
 *       this.finish();
 *     },
 *     cancelSend() {
 *       this.abort();
 *     }
 *   }
 * };
 */
export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    onAbort: Function,
    sendHandler: Function,
    abortHandler: Function,
    finishHandler: Function
  },
  methods: {
    handleSend(...args) {
      if (this.loading)
        return
      this.sendHandler && this.sendHandler(...args)
      this.loading = true
    },
    handleAbort() {
      this.loading = false
      this.abortHandler && this.abortHandler()
      this.onAbort && this.onAbort()
    },
    handleFinish() {
      this.loading = false
      this.finishHandler && this.finishHandler()
    },
    abort() {
      this.handleAbort()
    },
    send(...args) {
      this.handleSend(...args)
    },
    finish() {
      this.handleFinish()
    }
  }
}