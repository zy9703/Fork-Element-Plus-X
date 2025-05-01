<script setup lang="ts">
import type { FilesCardProps } from '../FilesCard/types.d.ts'
import type { AttachmentsProps } from './types.d.ts'
import FilesCard from '../FilesCard/index.vue'

const props = withDefaults(defineProps<AttachmentsProps>(), {
  list: () => [],
})

// const emits = defineEmits([])

// 通义给的主题颜色
// const colorMap = {
//   word: '#5E74A8', // 蓝灰色调（微软Word蓝）
//   excel: '#4A6B4A', // 墨绿色（Excel经典绿）
//   ppt: '#C27C40', // 暖橙色（PowerPoint橙）
//   pdf: '#5A6976', // 冷灰色（Adobe PDF灰）
//   txt: '#D4C58C', // 米黄色（纯文本文件色）
//   image: '#8E7CC3', // 紫罗兰（图像文件通用色）
//   audio: '#A67B5B', // 浅陶土（音频文件色）
//   video: '#4A5568', // 深石墨（视频文件色）
//   three: '#5F9E86', // 青绿色（Three.js 3D文件）
//   code: '#4B636E', // 深海水蓝（代码文件）
//   database: '#4A5A6B', // 钢蓝色（数据库文件）
//   link: '#5D7CBA', // 天青石蓝（超链接色）
//   zip: '#8B5E3C', // 深琥珀色（压缩包）
//   file: '#AAB2BF', // 浅灰蓝（通用文件）
//   unknown: '#888888', // 中性灰（未知类型）
// }

// 豆包给的主题颜色
const colorMap = {
  word: '#0078D4', // 文档（柔和商务蓝）
  excel: '#4CB050', // 表格（低饱和青绿色）
  ppt: '#FF9933', // 演示文稿（暖调橙黄）
  pdf: '#E81123', // 文档（淡玫瑰红）
  txt: '#666666', // 纯文本（中灰度）
  image: '#B490F3', // 图片（淡薰衣草紫）
  audio: '#00B2EE', // 音频（天蓝色）
  video: '#2EC4B6', // 视频（薄荷绿）
  three: '#00C8FF', // 3D文件（清透 cyan 蓝）
  code: '#00589F', // 代码（深海蓝）
  database: '#F5A623', // 数据库（暖金色）
  link: '#007BFF', // 链接（淡普鲁士蓝）
  zip: '#888888', // 压缩包（深暖灰）
  file: '#F0D9B5', // 通用文件（米黄色）
  unknown: '#D8D8D8', // 未知文件（浅暖灰）
}

type ColorKey = keyof typeof colorMap

const colorKeys = Object.keys(colorMap) as ColorKey[]

const item = ref<FilesCardProps>({
  uid: '1',
  name: 'test.pdf',
  fileType: 'three',
  // noStyle: true,
})

console.log('props', props)
</script>

<template>
  <div>
    <FilesCard
      v-for="items in colorKeys"
      :key="items"
      :uid="items"
      v-bind="{ ...item, iconColor: colorMap[items], fileType: items }"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
