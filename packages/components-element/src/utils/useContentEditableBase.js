/**
 * @description A Vue 2 Options API mixin for manipulating contenteditable elements, providing methods for selection, cursor positioning, focus management, and inserting line breaks.
 * @description 一个用于操作 contenteditable 元素的 Vue 2 Options API mixin，提供选择、光标定位、焦点管理和插入换行符的方法。
 *
 * @mixin useContentEditableBaseMixin
 * Provides utilities for working with contenteditable elements in Vue 2.
 * 提供用于处理 contenteditable 元素的 Vue 2 实用工具。
 *
 * @property {Object} methods - Methods for manipulating the contenteditable element.
 * @property {Object} methods - 操作 contenteditable 元素的方法。
 *
 * @method selectAll(el) - Selects all content within the specified element.
 * @method selectAll(el) - 选择指定元素内的所有内容。
 *
 * @method deselectAll() - Cancels any current selection.
 * @method deselectAll() - 取消当前选择。
 *
 * @method moveToStart(el) - Moves the cursor to the start of the specified element.
 * @method moveToStart(el) - 将光标移动到指定元素的开头。
 *
 * @method moveToEnd(el) - Moves the cursor to the end of the specified element.
 * @method moveToEnd(el) - 将光标移动到指定元素的末尾。
 *
 * @method focusElement(el) - Focuses the specified element.
 * @method focusElement(el) - 聚焦指定元素。
 *
 * @method blurElement(el) - Removes focus from the specified element.
 * @method blurElement(el) - 从指定元素移除焦点。
 *
 * @method insertNewLine(el) - Inserts a line break at the current cursor position.
 * @method insertNewLine(el) - 在当前光标位置插入换行符。
 *
 * @example
 * import useContentEditableBaseMixin from './useContentEditableBaseMixin';
 *
 * export default {
 *   mixins: [useContentEditableBaseMixin],
 *   mounted() {
 *     const editor = this.$refs.editor;
 *     this.focusElement(editor);
 *   }
 * }
 */
export default {
  methods: {
    /**
     * 选择元素中的所有内容
     * @param {HTMLElement} el - 要选择内容的元素
     */
    selectAll(el) {
      if (!el) return

      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(el)
      sel?.removeAllRanges()
      sel?.addRange(range)
    },

    /**
     * 取消选择
     */
    deselectAll() {
      const sel = window.getSelection()
      sel?.removeAllRanges()
    },

    /**
     * 将光标移动到元素开头
     * @param {HTMLElement} el - 目标元素
     */
    moveToStart(el) {
      if (!el) return

      el.focus()
      const range = document.createRange()
      const sel = window.getSelection()
      if (el.firstChild) {
        range.setStart(el.firstChild, 0)
        range.setEnd(el.firstChild, 0)
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    },

    /**
     * 将光标移动到元素末尾
     * @param {HTMLElement} el - 目标元素
     */
    moveToEnd(el) {
      if (!el) return

      el.focus()
      const range = document.createRange()
      const sel = window.getSelection()
      const lastChild = el.lastChild
      const length = lastChild ? lastChild.textContent?.length || 0 : 0
      if (lastChild) {
        range.setStart(lastChild, length)
        range.setEnd(lastChild, length)
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    },

    /**
     * 聚焦元素
     * @param {HTMLElement} el - 要聚焦的元素
     */
    focusElement(el) {
      el?.focus()
    },

    /**
     * 取消元素的焦点
     * @param {HTMLElement} el - 要取消焦点的元素
     */
    blurElement(el) {
      if (el) {
        el.blur()
        const sel = window.getSelection()
        sel?.removeAllRanges()
      }
    },

    /**
     * 在当前光标位置插入换行符
     * @param {HTMLElement} el - 目标元素
     */
    insertNewLine(el) {
      if (!el) return

      const sel = window.getSelection()
      if (sel) {
        const range = sel.getRangeAt(0)
        // 插入换行符的文本节点和<br>元素
        const newLineText = document.createTextNode('\n')
        const br = document.createElement('div')
        br.innerHTML = '<br>'
        range.insertNode(br)
        range.insertNode(newLineText)
        // 移动光标到新位置
        range.setStartAfter(newLineText)
        range.setEndAfter(newLineText)
        sel.removeAllRanges()
        sel.addRange(range)
        // 触发input事件以更新高度
        el.dispatchEvent(new Event('input', { bubbles: true }))
        // Vue 2 中没有 nextTick，需要手动处理或使用 $nextTick
        // 这里简化处理，实际应用中可能需要更复杂的逻辑确保 DOM 更新
        // element.scrollTop = element.scrollHeight
        // moveToEnd()
      }
    },
  },
}