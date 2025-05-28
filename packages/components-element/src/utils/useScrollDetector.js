import { onBeforeUnmount, onMounted, ref } from 'vue'

export default (elementRef) => {
  const hasVertical = ref(false)
  const hasHorizontal = ref(false)

  const check = () => {
    const el = elementRef.value
    if (!el)
      return
    hasVertical.value = el.scrollHeight > el.clientHeight
    hasHorizontal.value = el.scrollWidth > el.clientWidth
  }

  onMounted(() => {
    check()
    const observer = new ResizeObserver(check)
    if (elementRef.value) {
      observer.observe(elementRef.value);
    }
    onBeforeUnmount(() => observer.disconnect())
  })

  return {
    hasVertical, // 是否有纵向滚动条
    hasHorizontal, // 是否有横向滚动条
    check, // 检查滚动条状态
  }
}