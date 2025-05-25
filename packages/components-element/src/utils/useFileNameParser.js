/**
 * @description A Vue 2 Options API mixin for parsing file names, extracting the prefix and suffix.
 * @description 一个用于解析文件名的 Vue 2 Options API mixin，提取文件名前缀和后缀。
 *
 * @mixin useFileNameParserMixin
 * Parses a file name to extract its prefix and suffix in Vue 2.
 * 解析文件名以提取其前缀和后缀。
 *
 * @property {Object} computed - Computed properties for the mixin.
 * @property {Object} computed - mixin 的计算属性。
 * @property {string} computed.namePrefix - The prefix of the file name.
 * @property {string} computed.namePrefix - 文件名的前缀。
 * @property {string} computed.nameSuffix - The suffix of the file name.
 * @property {string} computed.nameSuffix - 文件名的后缀。
 *
 * @property {Object} props - Props for the mixin.
 * @property {Object} props - mixin 的 props。
 * @property {string} props.fileName - The file name to parse.
 * @property {string} props.fileName - 要解析的文件名。
 *
 * @example
 * import useFileNameParserMixin from './useFileNameParserMixin';
 *
 * export default {
 *   mixins: [useFileNameParserMixin],
 *   props: {
 *     fileName: String
 *   },
 *   mounted() {
 *     console.log('Prefix:', this.namePrefix);
 *     console.log('Suffix:', this.nameSuffix);
 *   }
 * }
 */
export default {
  props: {
    fileName: {
      type: String,
      default: '',
    },
  },
  computed: {
    /**
     * 文件名前缀
     */
    namePrefix() {
      const nameStr = this.fileName || ''
      const lastDotIndex = nameStr.lastIndexOf('.')
      return lastDotIndex === -1 ? nameStr : nameStr.slice(0, lastDotIndex)
    },

    /**
     * 文件名后缀
     */
    nameSuffix() {
      const nameStr = this.fileName || ''
      const lastDotIndex = nameStr.lastIndexOf('.')
      if (lastDotIndex === -1 || nameStr.length - lastDotIndex > 7) {
        return '.file'
      }
      return lastDotIndex === -1 ? '' : nameStr.slice(lastDotIndex)
    },
  },
}