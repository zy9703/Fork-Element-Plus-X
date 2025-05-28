import { computed } from 'vue'

export default function useFileNameParser(name) {
  const namePrefix = computed(() => {
    const nameStr = name || ''
    const lastDotIndex = nameStr.lastIndexOf('.')
    return lastDotIndex === -1 ? nameStr : nameStr.slice(0, lastDotIndex)
  })

  const nameSuffix = computed(() => {
    const nameStr = name || ''
    const lastDotIndex = nameStr.lastIndexOf('.')
    if (lastDotIndex === -1 || nameStr.length - lastDotIndex > 7) {
      return '.file'
    }
    return lastDotIndex === -1 ? '' : nameStr.slice(lastDotIndex)
  })

  return {
    namePrefix,
    nameSuffix,
  }
}