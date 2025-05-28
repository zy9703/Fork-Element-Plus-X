import { ref, onUnmounted } from 'vue';

export function useRecord(props = {}) {
  const { onError, onStart, onEnd, onResult } = props;

  const loading = ref(false);
  const recognition = ref(null);
  const value = ref('');

  const start = () => {
    if ('webkitSpeechRecognition' in window) {
      recognition.value = new webkitSpeechRecognition();
      recognition.value.continuous = true;
      recognition.value.interimResults = true;
      recognition.value.lang = 'zh-CN';
      recognition.value.onstart = () => {
        loading.value = true;
        value.value = '';
        onStart && onStart();
      };
      recognition.value.onend = () => {
        loading.value = false;
        onEnd && onEnd(value.value);
      };
      recognition.value.onerror = (e) => {
        loading.value = false;
        onError && onError(e);
      };
      recognition.value.onresult = (e) => {
        let results = '';
        for (let i = 0; i <= e.resultIndex; i++) {
          results += e.results[i][0].transcript;
        }
        value.value = results;
        onResult && onResult(results);
      };
      recognition.value.start();
    } else {
      onError && onError({
        code: -1,
        message: 'The current browser does not support voice recognition',
      });
    }
  };

  const stop = () => {
    if (recognition.value) {
      recognition.value.stop();
    }
  };

  onUnmounted(() => {
    stop();
    recognition.value = null;
  });

  return {
    loading,
    start,
    stop,
    value,
  };
}