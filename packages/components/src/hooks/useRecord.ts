interface UseRecordError {
  code: number
  message: string
}

interface UseRecordProps {
  onError?: (err: SpeechRecognitionErrorEvent | UseRecordError) => void
  onStart?: () => void
  onEnd?: (v: string) => void
  onResult?: (result: string) => void
}

function useRecord({ onError, onStart, onEnd, onResult }: UseRecordProps = {}) {
  const loading = ref<boolean>(false)
  const recognition = ref<null | SpeechRecognition>(null)
  const value = ref<string>('')

  const start = () => {
    if ('webkitSpeechRecognition' in window) {
      recognition.value = new webkitSpeechRecognition()
      recognition.value!.continuous = true
      recognition.value.interimResults = true
      recognition.value.lang = 'zh-CN'
      recognition.value.onstart = () => {
        loading.value = true
        value.value = ''
        onStart?.()
      }
      recognition.value.onend = () => {
        loading.value = false
        onEnd?.(value.value)
      }
      recognition.value.onerror = (e) => {
        loading.value = false
        onError?.(e)
      }
      recognition.value.onresult = (e) => {
        let results = ''
        for (let i = 0; i <= e.resultIndex; i++) {
          results += e.results[i][0].transcript
        }
        value.value = results
        onResult?.(results)
      }
      recognition.value.start()
    }
    else {
      onError?.({
        code: -1,
        message: 'The current browser does not support voice recognition',
      })
    }
  }

  const stop = () => {
    if (recognition.value) {
      recognition.value.stop()
    }
  }

  onUnmounted(() => {
    stop()
    recognition.value = null
  })

  return {
    loading,
    start,
    stop,
    value,
  }
}

export default useRecord
