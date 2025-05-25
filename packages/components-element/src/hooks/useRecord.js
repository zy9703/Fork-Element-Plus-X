/**
 * @description Provides a hook for speech recognition, allowing voice input and handling various events such as start, end, result, and errors.
 * @description 提供语音识别的钩子，允许语音输入并处理开始、结束、结果及错误等各种事件。
 *
 * @typedef {Object} UseRecordError
 * Represents the structure of an error object for useRecord.
 * 表示 useRecord 的错误对象结构。
 *
 * @property {number} code - The error code.
 * @property {number} code - 错误代码。
 *
 * @property {string} message - The error message.
 * @property {string} message - 错误信息。
 *
 * @typedef {Object} UseRecordProps
 * Represents the configuration options for useRecord.
 * 表示 useRecord 的配置选项。
 *
 * @property {Function} [onError] - Callback function triggered when an error occurs.
 * @property {Function} [onError] - 当发生错误时触发的回调函数。
 *
 * @property {Function} [onStart] - Callback function triggered when voice recognition starts.
 * @property {Function} [onStart] - 当语音识别开始时触发的回调函数。
 *
 * @property {Function} [onEnd] - Callback function triggered when voice recognition ends, providing the final recognized text.
 * @property {Function} [onEnd] - 当语音识别结束时触发的回调函数，并提供最终识别的文本。
 *
 * @property {Function} [onResult] - Callback function triggered when intermediate recognition results are available.
 * @property {Function} [onResult] - 当有中间识别结果时触发的回调函数。
 *
 * @function useRecord
 * Initializes the speech recognition functionality and returns state and control functions.
 * 初始化语音识别功能并返回状态和控制函数。
 *
 * @param {UseRecordProps} [props] - Configuration options for the hook.
 * @param {UseRecordProps} [props] - 钩子的配置选项。
 *
 * @returns {object} - An object containing the state and methods for speech recognition.
 * @returns {object} - 包含语音识别状态和方法的对象。
 *
 * @property {Ref<boolean>} loading - Indicates whether speech recognition is currently active.
 * @property {Ref<boolean>} loading - 指示语音识别是否正在进行。
 *
 * @property {Function} start - Starts the speech recognition process.
 * @property {Function} start - 开始语音识别过程。
 *
 * @property {Function} stop - Stops the speech recognition process.
 * @property {Function} stop - 停止语音识别过程。
 *
 * @property {Ref<string>} value - Holds the recognized text.
 * @property {Ref<string>} value - 保存识别的文本。
 *
 * @example
 * const { loading, start, stop, value } = useRecord({
 *   onStart: () => console.log('Recognition started'),
 *   onEnd: (result) => console.log('Recognition ended with result:', result),
 *   onResult: (result) => console.log('Intermediate result:', result),
 *   onError: (error) => console.error('Error:', error),
 * });
 *
 * start(); // Start voice recognition
 * stop();  // Stop voice recognition
 * console.log(value.value); // Access the recognized text
 */
export default {
  data() {
    return {
      loading: false,
      recognition: null,
      value: ''
    }
  },
  props: {
    onError: Function,
    onStart: Function,
    onEnd: Function,
    onResult: Function,
  },
  methods: {
    start() {
      if ('webkitSpeechRecognition' in window) {
        this.recognition = new webkitSpeechRecognition()
        this.recognition.continuous = true
        this.recognition.interimResults = true
        this.recognition.lang = 'zh-CN'
        this.recognition.onstart = () => {
          this.loading = true
          this.value = ''
          this.onStart && this.onStart()
        }
        this.recognition.onend = () => {
          this.loading = false
          this.onEnd && this.onEnd(this.value)
        }
        this.recognition.onerror = (e) => {
          this.loading = false
          this.onError && this.onError(e)
        }
        this.recognition.onresult = (e) => {
          let results = ''
          for (let i = 0; i <= e.resultIndex; i++) {
            results += e.results[i][0].transcript
          }
          this.value = results
          this.onResult && this.onResult(results)
        }
        this.recognition.start()
      }
      else {
        this.onError && this.onError({
          code: -1,
          message: 'The current browser does not support voice recognition',
        })
      }
    },
    stop() {
      if (this.recognition) {
        this.recognition.stop()
      }
    }
  },
  beforeDestroy() {
    this.stop()
    this.recognition = null
  }
}