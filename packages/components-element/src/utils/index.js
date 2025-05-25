/**
 * 文件类型枚举
 * @typedef {Object} FilesType
 * @property {string} IMAGE - 图片类型
 * @property {string} VIDEO - 视频类型
 * @property {string} AUDIO - 音频类型
 * @property {string} PDF - PDF类型
 * @property {string} DOC - 文档类型
 * @property {string} EXCEL - Excel类型
 * @property {string} PPT - PPT类型
 * @property {string} CODE - 代码类型
 * @property {string} TEXT - 文本类型
 * @property {string} UNKNOWN - 未知类型
 */

/**
 * 文件类型常量
 */
export const FilesType = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  PDF: 'pdf',
  DOC: 'doc',
  EXCEL: 'excel',
  PPT: 'ppt',
  CODE: 'code',
  TEXT: 'text',
  UNKNOWN: 'unknown',
}

/**
 * 文件类型前缀
 */
export const prefix = {
  [FilesType.IMAGE]: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
  [FilesType.VIDEO]: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'],
  [FilesType.AUDIO]: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'],
  [FilesType.PDF]: ['pdf'],
  [FilesType.DOC]: ['doc', 'docx', 'txt', 'rtf'],
  [FilesType.EXCEL]: ['xls', 'xlsx', 'csv'],
  [FilesType.PPT]: ['ppt', 'pptx'],
  [FilesType.CODE]: ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'less', 'scss', 'sass', 'json', 'xml', 'md', 'py', 'java', 'c', 'cpp', 'h', 'hpp', 'go', 'php', 'rb', 'swift', 'kt', 'rs', 'sh', 'bat', 'ps1'],
  [FilesType.TEXT]: ['txt', 'md', 'log'],
}

/**
 * 根据文件后缀获取文件类型
 * @param {string} suffix - 文件后缀
 * @returns {string} - 文件类型
 */
export function getFileType(suffix) {
  if (!suffix) return FilesType.UNKNOWN
  const lowerSuffix = suffix.toLowerCase()
  for (const type in prefix) {
    if (prefix[type].includes(lowerSuffix)) {
      return type
    }
  }
  return FilesType.UNKNOWN
}

/**
 * 格式化文件大小
 * @param {number} size - 文件大小（字节）
 * @returns {string} - 格式化后的文件大小
 */
export function getSize(size) {
  if (size < 1024) {
    return size + 'B'
  }
  else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'KB'
  }
  else if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + 'MB'
  }
  else {
    return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
  }
}

/**
 * 通过文件流生成图片预览
 * @param {Blob} file - 文件对象
 * @returns {Promise<string>} - 图片预览URL
 */
export function previewImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.onerror = (e) => {
      reject(e)
    }
    reader.readAsDataURL(file)
  })
}

/**
 * 为代码块添加行号
 * @param {string} code - 代码内容
 * @returns {string} - 添加行号后的代码
 */
export function generateCodeRowNumber(code) {
  if (!code) return ''
  const lines = code.split('\n')
  const maxLineNumberLength = String(lines.length).length
  const paddedLineNumbers = lines.map((_, i) => {
    const lineNumber = i + 1
    const paddedLineNumber = String(lineNumber).padStart(maxLineNumberLength, ' ')
    return paddedLineNumber
  })

  return lines
    .map((line, i) => `${paddedLineNumbers[i]} | ${line}`)
    .join('\n')
}

/**
 * 处理Mermaid图表的缩放和拖拽
 * @param {HTMLElement} container - 容器元素
 * @param {HTMLElement} svg - SVG元素
 */
export function zoomMermaid(container, svg) {
  if (!container || !svg) return

  let scale = 1
  let panning = false
  let pointX = 0
  let pointY = 0
  let start = { x: 0, y: 0 }

  function setTransform() {
    svg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`
  }

  container.onmousedown = (e) => {
    e.preventDefault()
    start = { x: e.clientX - pointX, y: e.clientY - pointY }
    panning = true
  }

  container.onmouseup = () => {
    panning = false
  }

  container.onmousemove = (e) => {
    e.preventDefault()
    if (!panning) return
    pointX = e.clientX - start.x
    pointY = e.clientY - start.y
    setTransform()
  }

  container.onwheel = (e) => {
    e.preventDefault()
    const xs = (e.clientX - pointX) / scale
    const ys = (e.clientY - pointY) / scale
    const delta = -e.deltaY
    if (delta > 0) {
      scale *= 1.2
    }
    else {
      scale /= 1.2
    }
    pointX = e.clientX - xs * scale
    pointY = e.clientY - ys * scale
    setTransform()
  }
}