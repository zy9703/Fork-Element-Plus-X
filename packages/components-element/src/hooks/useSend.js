import { ref } from 'vue';

export function useSend(
  {
    onAbort,
    sendHandler,
    abortHandler,
    finishHandler,
  } = {},
) {
  const loading = ref(false);

  const handleSend = (...args) => {
    if (loading.value)
      return;
    sendHandler && sendHandler(...args);
    loading.value = true;
  };

  const handleAbort = () => {
    loading.value = false;
    abortHandler && abortHandler();
    onAbort && onAbort();
  };

  const handleFinish = () => {
    loading.value = false;
    finishHandler && finishHandler();
  };

  return {
    loading,
    abort: handleAbort,
    send: handleSend,
    finish: handleFinish,
  };
}