import type { Component } from 'vue'
import audio from './audio.vue'
import code from './code.vue'
import database from './database.vue'
import excel from './excel.vue'
import file from './file.vue'
import image from './image.vue'
import link from './link.vue'
import pdf from './pdf.vue'
import ppt from './ppt.vue'
import three from './three.vue'
import txt from './txt.vue'
import unknown from './unknown.vue'
import video from './video.vue'
import word from './word.vue'
import zip from './zip.vue'

export type FilesType = 'word' | 'excel' | 'ppt' | 'pdf' | 'txt' | 'image' | 'audio' | 'video' | 'three' | 'code' | 'database' | 'link' | 'zip' | 'file' | 'unknown'

export const IMG_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg']
export const AUDIO_EXTS = ['mp3', 'wav', 'ogg', 'flac', 'aac']
export const VIDEO_EXTS = ['mp4', 'avi', 'wmv', 'mov', 'flv', 'mkv', 'webm']
export const ZIP_EXTS = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'zst', 'lzma', 'lz', 'lzo', 'lz4', 'z', 'arj', 'cab', 'dmg', 'iso', 'vhd', 'vhdx', 'vmdk', 'vdi', 'vdi', 'vmdk', 'vhdx', 'vhd', 'dmg', 'iso', 'cab']
export const WORD_EXTS = ['doc', 'docx']
export const EXCEL_EXTS = ['xls', 'xlsx']
export const PPT_EXTS = ['ppt', 'pptx']
export const PDF_EXTS = ['pdf']
export const TXT_EXTS = ['txt']
export const CODE_EXTS = ['js', 'ts', 'json', 'html', 'css', 'less', 'scss', 'sass', 'md', 'vue', 'tsx', 'jsx', 'c', 'cpp', 'h', 'hpp', 'java', 'py', 'rb', 'go', 'php', 'sh', 'bat', 'cmd', 'ps1', 'psm1', 'pl', 'pm', 'rb', 'rhtml', 'erb', 'rake', 'gemspec', 'rakefile', 'gemfile', 'gemfile.lock', 'rakefile', 'rakefile.rb', 'gemfile', 'gemfile.lock', 'rakefile', 'rakefile.rb', 'gemfile', 'gemfile.lock', 'rakefile', 'rakefile.rb', 'gemfile', 'gemfile.lock', 'rakefile', 'rakefile.rb', 'gemfile']
export const THREE_EXTS = ['3ds', 'max', 'obj', 'fbx', 'ply', 'stl', 'dae', 'lwo', 'lws', 'lxo', 'mdl', 'md2', 'md3', 'mdc', 'md5', 'md5mesh', 'md5anim', 'md5camera', 'md5morph', 'md5skin', 'md5weight', 'md5vtx', 'md5anim', 'md5mesh', 'md5camera']
export const DATABASE_EXTS = ['db', 'sql', 'sqlite', 'sqlite3', 'mdb', 'accdb', 'dbf', 'csv', 'tsv', 'json']
export const UNKNOWN_EXTS = ['*']

export default {
  // 文档类
  word,
  excel,
  ppt,
  pdf,
  txt,
  // 图片类
  image,
  // 音频类
  audio,
  // 视频类
  video,
  // 3D 模型类
  three,
  // 可执行程序类
  code,
  // 数据库类
  database,
  // 链接文件类
  link,
  // 压缩包类
  zip,
  // 通用文件/文件夹类
  file,
  // 未知文件类
  unknown,
} as Record<FilesType, Component>
