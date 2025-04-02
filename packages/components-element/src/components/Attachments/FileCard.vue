<template>
  <div 
    class="el-file-card"
    :class="{
      'el-file-card-disabled': disabled,
      [`el-file-card-status-${item.status || 'normal'}`]: true,
      'el-file-card-type-preview': isImageFile && (item.thumbUrl || item.url),
      'el-file-card-type-overview': !isImageFile || !(item.thumbUrl || item.url)
    }"
    @click="isImageFile && handlePreview()"
  >
    <!-- 图片预览类型 -->
    <template v-if="isImageFile && (item.thumbUrl || item.url)">
      <img 
        :src="item.thumbUrl || item.url" 
        alt="thumbnail" 
        class="el-file-card-image"
      />

      <!-- 图片名称悬浮显示 -->
      <div class="el-file-card-image-name">
        <span class="el-file-card-ellipsis-prefix">{{ namePrefix }}</span>
      </div>

      <!-- 上传状态蒙层 -->
      <div v-if="item.status !== 'done'" class="el-file-card-img-mask">
        <el-progress 
          v-if="item.status === 'uploading' && item.percent !== undefined" 
          :percentage="item.percent" 
          :stroke-width="4"
          class="el-file-card-progress"
        ></el-progress>
        <div v-if="item.status === 'error'" class="el-file-card-desc">
          <div class="el-file-card-ellipsis-prefix">{{ errorMessage }}</div>
        </div>
      </div>
    </template>
    
    <!-- 普通文件类型 -->
    <template v-else>
      <div class="el-file-card-icon" :style="{ color: iconColor }">
        <i :class="fileIcon"></i>
      </div>
      <div class="el-file-card-content">
        <div class="el-file-card-name" :title="item.name">
          <div class="el-file-card-ellipsis-prefix">{{ namePrefix || '\u00A0' }}</div>
          <div class="el-file-card-ellipsis-suffix">{{ nameSuffix }}</div>
        </div>
        <div class="el-file-card-desc">
          <div class="el-file-card-ellipsis-prefix">
            <template v-if="item.status === 'uploading' && item.percent !== undefined">
              {{ item.percent }}%
            </template>
            <template v-else-if="item.status === 'error'">
              {{ errorMessage }}
            </template>
            <template v-else>
              {{ item.description || formattedSize || '\u00A0' }}
            </template>
          </div>
        </div>
      </div>
    </template>
    
    <!-- 删除按钮 -->
    <button
      v-if="!disabled"
      type="button"
      class="el-file-card-remove"
      @click.stop="handleRemove"
    >
      <i class="el-icon-close"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'FileCard',
  props: {
    item: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isImageFile() {
      return this.getFileType() === 'image';
    },
    isVideoFile() {
      return this.getFileType() === 'video';
    },
    isAudioFile() {
      return this.getFileType() === 'audio';
    },
    fileIcon() {
      const typeIconMap = {
        image: 'el-icon-picture',
        video: 'el-icon-video-camera',
        audio: 'el-icon-headset',
        word: 'el-icon-document',
        excel: 'el-icon-tickets',
        ppt: 'el-icon-data-analysis',
        pdf: 'el-icon-document',
        zip: 'el-icon-folder',
        text: 'el-icon-document-copy',
        markdown: 'el-icon-document',
        file: 'el-icon-document'
      };
      
      return typeIconMap[this.getFileType()] || 'el-icon-document';
    },
    iconColor() {
      const typeColorMap = {
        image: '#8c8c8c',
        video: '#ff4d4f',
        audio: '#8c8c8c',
        word: '#1677ff',
        excel: '#22b35e',
        ppt: '#ff6e31',
        pdf: '#ff4d4f',
        zip: '#fab714',
        text: '#8c8c8c',
        markdown: '#8c8c8c',
        file: '#8c8c8c'
      };
      
      return typeColorMap[this.getFileType()] || '#8c8c8c';
    },
    // 文件名分割
    namePrefix() {
      const name = this.item.name || '';
      const match = name.match(/^(.*)\.[^.]+$/);
      return match ? match[1] : name;
    },
    nameSuffix() {
      const name = this.item.name || '';
      const match = name.match(/^(.*)\.[^.]+$/);
      return match ? name.slice(match[1].length) : '';
    },
    formattedSize() {
      const size = this.item.size;
      if (!size) return '';
      
      if (size < 1024) {
        return size + ' B';
      } else if (size < 1024 * 1024) {
        return Math.floor(size / 1024) + ' KB';
      } else if (size < 1024 * 1024 * 1024) {
        return (size / (1024 * 1024)).toFixed(1) + ' MB';
      } else {
        return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
      }
    },
    errorMessage() {
      if (this.item.response && typeof this.item.response === 'string') {
        return this.item.response;
      }
      return '上传失败';
    }
  },
  methods: {
    getFileType() {
      const file = this.item;
      if (!file) return 'file';
      
      const name = file.name || '';
      const type = file.type || '';
      
      if (type.startsWith('image/') || /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(name)) {
        return 'image';
      } else if (type.startsWith('video/') || /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i.test(name)) {
        return 'video';
      } else if (type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|flac|aac)$/i.test(name)) {
        return 'audio';
      } else if (/\.(doc|docx)$/i.test(name) || type.includes('msword') || type.includes('document')) {
        return 'word';
      } else if (/\.(xls|xlsx)$/i.test(name) || type.includes('spreadsheetml') || type.includes('excel')) {
        return 'excel';
      } else if (/\.(ppt|pptx)$/i.test(name) || type.includes('presentation')) {
        return 'ppt';
      } else if (/\.pdf$/i.test(name) || type.includes('pdf')) {
        return 'pdf';
      } else if (/\.(zip|rar|7z|tar|gz)$/i.test(name) || type.includes('zip') || type.includes('compressed')) {
        return 'zip';
      } else if (/\.txt$/i.test(name) || type.includes('text/plain')) {
        return 'text';
      } else if (/\.(md|mdx)$/i.test(name) || type.includes('text/markdown')) {
        return 'markdown';
      }
      
      return 'file';
    },
    handlePreview() {
      this.$emit('preview', this.item);
    },
    handleRemove() {
      this.$emit('remove', this.item);
    }
  }
};
</script>

<style scoped>
.el-file-card {
  position: relative;
  background-color: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.el-file-card:hover {
  border-color: #c0c4cc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.el-file-card-disabled {
  cursor: not-allowed;
  opacity: 0.7;
  pointer-events: none;
}

/* 图片类型样式 */
.el-file-card-type-preview {
  width: 90px;
  height: 90px;
  display: block;
  cursor: pointer;
  position: relative;
}

.el-file-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-file-card-image-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.el-file-card-type-preview:hover .el-file-card-image-name {
  transform: translateY(0);
}

.el-file-card-img-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

/* 普通文件类型样式 */
.el-file-card-type-overview {
  width: 300px;
  padding: 8px 36px 8px 8px;
  display: flex;
  align-items: center;
}

.el-file-card-icon {
  flex: 0 0 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: #8c8c8c;
}

.el-file-card-icon i {
  font-size: 24px;
}

.el-file-card-content {
  flex: 1;
  min-width: 0;
}

.el-file-card-name {
  font-size: 14px;
  margin-bottom: 2px;
  color: #303133;
  display: flex;
}

.el-file-card-ellipsis-prefix {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-file-card-ellipsis-suffix {
  flex-shrink: 0;
}

.el-file-card-desc {
  font-size: 12px;
  color: #909399;
}

/* 删除按钮 */
.el-file-card-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 10;
  padding: 0;
  font-size: 12px;
  color: #909399;
}

.el-file-card:hover .el-file-card-remove {
  opacity: 1;
}

.el-file-card-remove:hover {
  background-color: #fff;
  color: #f56c6c;
}

/* 上传状态样式 */
.el-file-card-status-uploading .el-file-card-desc {
  color: #409eff;
}

.el-file-card-status-error {
  border-color: #f56c6c;
}

.el-file-card-status-error .el-file-card-desc {
  color: #f56c6c;
}

.el-file-card-progress {
  width: 80%;
}
</style> 