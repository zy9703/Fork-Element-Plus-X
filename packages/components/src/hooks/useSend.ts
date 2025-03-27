interface WithAbortProps {
  promise: (signal: AbortSignal) => Promise<any>
}
interface WithSSEProps {
  eventSource: EventSource
}

export type UseSendProps = (WithAbortProps | WithSSEProps) & {
  onAbort?: () => void
  onSend?: () => void
}

export function useSend({ onAbort, onSend, ...props }: UseSendProps = {} as UseSendProps) {
  const loading = ref<boolean>(false)
  const abortController = new AbortController()
  const promise = (props as Partial<WithAbortProps>).promise
  const eventSource = computed(() => (props as Partial<WithSSEProps>).eventSource)
  const _promise_ = promise?.(abortController.signal)

  const handleSend = () => {
    if (loading.value) return;
    onSend?.()
    loading.value = true
    if (_promise_) {
      _promise_.finally(() => {
        loading.value = false
      })
    }
  }

  const handleAbort = () => {
    if (promise) {
      abortController.abort()
    }
    if (eventSource.value) {
      eventSource.value.close()
    }
    loading.value = false
    onAbort?.()
  }

  return {
    loading,
    promise: _promise_,
    abort: handleAbort,
    send: handleSend,
  }
}
