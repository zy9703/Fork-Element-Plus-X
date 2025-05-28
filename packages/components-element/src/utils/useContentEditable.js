// 封装的 Hooks 函数
export function useContentEditable(targetRef) {
  // 全选方法
  const selectAll = () => {
    const element = targetRef
    if (element) {
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(element)
      sel && sel.removeAllRanges()
      sel && sel.addRange(range)
    }
  }

  // 取消全选方法
  const deselectAll = () => {
    const sel = window.getSelection()
    sel && sel.removeAllRanges()
  }

  // 定位到最开头方法
  const moveToStart = () => {
    const element = targetRef
    if (element) {
      const range = document.createRange()
      const sel = window.getSelection()
      if (element.firstChild) {
        range.setStart(element.firstChild, 0)
        range.setEnd(element.firstChild, 0)
        sel && sel.removeAllRanges()
        sel && sel.addRange(range)
      }
    }
  }

  // 定位到最结尾方法
  const moveToEnd = () => {
    const element = targetRef
    if (element) {
      const range = document.createRange()
      const sel = window.getSelection()
      const lastChild = element.lastChild
      const length = lastChild ? (lastChild.textContent && lastChild.textContent.length) || 0 : 0
      if (lastChild) {
        range.setStart(lastChild, length)
        range.setEnd(lastChild, length)
        sel && sel.removeAllRanges()
        sel && sel.addRange(range)
      }
    }
  }

  // 聚焦方法
  const focusElement = () => {
    const element = targetRef
    element && element.focus()
  }

  // 失焦方法，同时取消选中状态
  const blurElement = () => {
    const element = targetRef
    if (element) {
      element.blur()
      const sel = window.getSelection()
      sel && sel.removeAllRanges()
    }
  }

  return {
    selectAll,
    deselectAll,
    moveToStart,
    moveToEnd,
    focusElement,
    blurElement,
  }
}