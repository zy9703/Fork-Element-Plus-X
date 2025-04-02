<template>
  <div 
    class="el-attachments"
    :class="{
      'el-attachments-disabled': disabled,
      [`el-attachments-overflow-${overflow}`]: overflow && fileList.length,
      'el-attachments-ping-start': pingStart && (overflow === 'scrollX' || overflow === 'scrollY'),
      'el-attachments-ping-end': pingEnd && (overflow === 'scrollX' || overflow === 'scrollY'),
      'el-attachments-empty': fileList.length === 0
    }"
    :style="rootStyle"
  >
    <!-- 文件列表展示区域 -->
    <div 
      v-if="fileList.length > 0" 
      ref="listContainerRef"
      class="el-attachments-list" 
      @scroll="handleScroll"
    >
      <div 
        v-for="(file, index) in fileList" 
        :key="file.uid || index"
        class="el-attachments-item"
      >
        <file-card 
          :item="file" 
          :disabled="disabled"
          @remove="handleRemove" 
          @preview="handlePreview"
        />
      </div>
      
      <!-- 添加更多文件按钮 -->
      <div v-if="!disabled" class="el-attachments-item el-attachments-upload-btn-wrapper">
        <div class="el-attachments-upload-btn" @click="handlePlaceholderClick">
          <i class="el-icon-plus"></i>
        </div>
      </div>
      
      <!-- 滚动控制按钮 -->
      <template v-if="overflow === 'scrollX'">
        <button
          v-show="pingStart"
          type="button"
          class="el-attachments-prev-btn"
          @click="onScrollLeft"
        >
          <i class="el-icon-arrow-left"></i>
        </button>
        <button
          v-show="pingEnd"
          type="button"
          class="el-attachments-next-btn"
          @click="onScrollRight"
        >
          <i class="el-icon-arrow-right"></i>
        </button>
      </template>
    </div>
    
    <!-- 空状态占位符 -->
    <div v-else class="el-attachments-placeholder" @click="handlePlaceholderClick">
      <slot name="placeholder" :type="'inline'">
        <div class="el-attachments-placeholder-content">
          <i class="el-icon-upload"></i>
          <div class="el-attachments-placeholder-title">{{ placeholderTitle }}</div>
          <div v-if="placeholderDescription" class="el-attachments-placeholder-description">
            {{ placeholderDescription }}
          </div>
          <!-- 测试按钮 -->
          <el-button
            @click.stop="testAddFile"
            type="primary"
            size="small"
            style="margin-top: 10px;"
          >测试添加文件</el-button>
        </div>
      </slot>
    </div>
    
    <!-- 隐藏的上传组件 -->
    <el-upload
      ref="uploadRef"
      :action="action"
      :multiple="multiple"
      :show-file-list="false"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :disabled="disabled"
      :accept="accept"
      :drag="fileList.length === 0"
      :auto-upload="false"
      class="el-attachments-upload"
    >
      <template #trigger>
        <div style="display: none;"></div>
      </template>

      <template #drop>
        <div v-if="fileList.length === 0" class="el-attachments-drop-container">
          <slot name="placeholder" :type="'drop'">
            <div class="el-attachments-placeholder-content">
              <i class="el-icon-upload"></i>
              <div class="el-attachments-placeholder-title">{{ dropPlaceholderTitle || placeholderTitle }}</div>
            </div>
          </slot>
        </div>
      </template>
    </el-upload>
    
    <!-- 文件预览对话框 -->
    <el-dialog
      v-if="previewVisible"
      :visible.sync="previewVisible"
      :title="previewFile.name"
      class="el-attachments-preview-dialog"
      append-to-body
      width="80%"
    >
      <div class="el-attachments-preview-content">
        <template v-if="isImageFile(previewFile)">
          <img :src="previewFile.url || previewFile.thumbUrl" alt="Preview" class="el-attachments-preview-image" />
        </template>
        <template v-else-if="isVideoFile(previewFile)">
          <video 
            :src="previewFile.url" 
            controls 
            class="el-attachments-preview-video"
          ></video>
        </template>
        <template v-else-if="isAudioFile(previewFile)">
          <audio 
            :src="previewFile.url" 
            controls 
            class="el-attachments-preview-audio"
          ></audio>
        </template>
        <template v-else>
          <div class="el-attachments-preview-file">
            <i :class="getFileIcon(previewFile)"></i>
            <p>{{ previewFile.name }}</p>
            <p v-if="previewFile.size" class="el-attachments-preview-size">{{ formatFileSize(previewFile.size) }}</p>
            <el-button v-if="previewFile.url" type="primary" size="small" @click="downloadFile(previewFile)">
              下载文件
            </el-button>
          </div>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FileCard from './FileCard.vue';

export default {
  name: 'A3Attachments',
  components: {
    FileCard
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    action: {
      type: String,
      required: false,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rootStyle: {
      type: Object,
      default: () => ({})
    },
    rootClassName: {
      type: String,
      default: ''
    },
    beforeUpload: {
      type: Function,
      default: () => true
    },
    overflow: {
      type: String,
      default: 'wrap',
      validator: value => ['wrap', 'scrollX', 'scrollY'].includes(value)
    },
    placeholder: {
      type: [Object, Function, String],
      default: null
    },
    getDropContainer: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      fileList: [],
      previewVisible: false,
      previewFile: {},
      dropContainerMounted: false,
      dragTargetElem: null,
      pingStart: false,
      pingEnd: false,
      listContainerRef: null
    };
  },
  computed: {
    placeholderTitle() {
      if (typeof this.placeholder === 'string') {
        return this.placeholder;
      } else if (this.placeholder && typeof this.placeholder === 'object' && this.placeholder.title) {
        return this.placeholder.title;
      }
      return '点击或拖拽文件到此区域上传';
    },
    placeholderDescription() {
      if (this.placeholder && typeof this.placeholder === 'object' && this.placeholder.description) {
        return this.placeholder.description;
      }
      return '支持的文件类型：图片、视频、音频、文档等';
    },
    dropPlaceholderTitle() {
      if (typeof this.placeholder === 'function') {
        const result = this.placeholder('drop');
        return result && result.title;
      } else if (this.placeholder && typeof this.placeholder === 'object' && this.placeholder.dropTitle) {
        return this.placeholder.dropTitle;
      }
      return '释放文件开始上传';
    }
  },
  watch: {
    items: {
      handler(newItems) {
        if (Array.isArray(newItems)) {
          // 深拷贝数组以确保变更不影响原数组
          this.fileList = JSON.parse(JSON.stringify(newItems));
          this.$nextTick(() => {
            this.checkPing();
          });
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.checkPing();
      this.setupDropContainer();
    });
  },
  methods: {
    // 设置拖拽区域
    setupDropContainer() {
      if (this.getDropContainer && typeof this.getDropContainer === 'function') {
        const container = this.getDropContainer();
        if (container instanceof HTMLElement) {
          // 这里可以添加对自定义拖拽区域的支持
          // 由于Element UI的Upload组件不如Ant Design灵活，我们这里只做简单处理
          // 实际项目中可能需要更复杂的实现
        }
      }
    },
    
    // 获取原生DOM元素，用于外部访问
    getNativeElement() {
      return this.$el;
    },
    
    // 手动触发上传
    upload(file) {
      if (this.$refs.uploadRef && !this.disabled) {
        return this.$refs.uploadRef.upload(file);
      }
    },
    
    // 文件下载
    downloadFile(file) {
      if (file && file.url) {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name || 'download';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    
    // 滚动相关方法
    handleScroll() {
      this.checkPing();
    },
    checkPing() {
      const containerEle = this.$refs.listContainerRef;
      if (!containerEle) return;

      const TOLERANCE = 1;
      
      if (this.overflow === 'scrollX') {
        this.pingStart = Math.abs(containerEle.scrollLeft) >= TOLERANCE;
        this.pingEnd = 
          containerEle.scrollWidth - containerEle.clientWidth - Math.abs(containerEle.scrollLeft) >=
          TOLERANCE;
      } else if (this.overflow === 'scrollY') {
        this.pingStart = containerEle.scrollTop !== 0;
        this.pingEnd = containerEle.scrollHeight - containerEle.clientHeight !== containerEle.scrollTop;
      }
    },
    onScrollLeft() {
      const containerEle = this.$refs.listContainerRef;
      if (containerEle) {
        containerEle.scrollTo({
          left: containerEle.scrollLeft - containerEle.clientWidth,
          behavior: 'smooth',
        });
      }
    },
    onScrollRight() {
      const containerEle = this.$refs.listContainerRef;
      if (containerEle) {
        containerEle.scrollTo({
          left: containerEle.scrollLeft + containerEle.clientWidth,
          behavior: 'smooth',
        });
      }
    },
    
    // 上传文件相关方法
    handlePlaceholderClick() {
      if (!this.disabled && this.$refs.uploadRef) {
        // 直接触发文件输入框的点击事件
        const inputEl = this.$refs.uploadRef.$el.querySelector('input[type=file]');
        if (inputEl) {
          inputEl.click();
        }
      }
    },
    handleChange(file, fileList) {
      console.log('文件变更:', file.name, fileList.length);
      
      // 确保文件对象包含必要的属性
      if (file.raw && !file.uid) {
        file.uid = Date.now() + '_' + Math.random().toString(36).substring(2, 10);
      }
      
      // 处理图片文件的预览
      if (file.raw && this.isImageFile(file) && !file.url && !file.thumbUrl) {
        try {
          file.thumbUrl = URL.createObjectURL(file.raw);
          file.url = file.thumbUrl;
        } catch (error) {
          console.error('创建预览URL失败:', error);
        }
      }
      
      // 复制新的文件列表
      const newFileList = fileList.map(f => {
        // 对于新上传的文件，确保它们有URL
        if (f.raw && !f.url && f.status !== 'error') {
          if (this.isImageFile(f) && !f.thumbUrl) {
            try {
              f.thumbUrl = URL.createObjectURL(f.raw);
              f.url = f.thumbUrl;
            } catch (error) {
              console.error('创建预览URL失败:', error);
            }
          }
        }
        return { ...f };
      });
      
      // 更新状态
      this.fileList = newFileList;
      
      // 触发变更事件
      this.$emit('change', { file, fileList: this.fileList });
      
      // 检查滚动状态
      this.$nextTick(() => {
        this.checkPing();
      });
    },
    handleProgress(event, file, fileList) {
      const targetFile = this.findFile(file.uid);
      if (targetFile) {
        targetFile.status = 'uploading';
        targetFile.percent = event.percent;
      }
      this.$emit('progress', { event, file, fileList });
    },
    handleSuccess(response, file, fileList) {
      const targetFile = this.findFile(file.uid);
      if (targetFile) {
        targetFile.status = 'done';
        targetFile.response = response;
      }
      this.$emit('success', { response, file, fileList });
    },
    handleError(error, file, fileList) {
      const targetFile = this.findFile(file.uid);
      if (targetFile) {
        targetFile.status = 'error';
        targetFile.response = error;
      }
      this.$emit('error', { error, file, fileList });
    },
    handleRemove(file) {
      const index = this.fileList.findIndex(item => item.uid === file.uid);
      if (index !== -1) {
        this.fileList.splice(index, 1);
        this.$emit('remove', file);
        this.$emit('change', { file, fileList: this.fileList });
        this.$nextTick(() => {
          this.checkPing();
        });
      }
    },
    handlePreview(file) {
      this.previewFile = file;
      this.previewVisible = true;
      this.$emit('preview', file);
    },
    findFile(uid) {
      return this.fileList.find(file => file.uid === uid);
    },
    
    // 文件类型相关方法
    isImageFile(file) {
      return this.getFileType(file) === 'image';
    },
    isVideoFile(file) {
      return this.getFileType(file) === 'video';
    },
    isAudioFile(file) {
      return this.getFileType(file) === 'audio';
    },
    getFileType(file) {
      if (!file) return '';
      
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
    getFileIcon(file) {
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
      
      return typeIconMap[this.getFileType(file)] || 'el-icon-document';
    },
    formatFileSize(size) {
      if (!size) return '';
      
      if (size < 1024) {
        return size + ' B';
      } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(0) + ' KB';
      } else if (size < 1024 * 1024 * 1024) {
        return (size / (1024 * 1024)).toFixed(1) + ' MB';
      } else {
        return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
      }
    },
    // 手动添加文件
    addFile(file) {
      if (!file || this.disabled) return;
      
      // 确保文件有唯一ID
      if (!file.uid) {
        file.uid = Date.now() + '_' + Math.random().toString(36).substring(2, 10);
      }
      
      // 设置状态为已完成
      if (!file.status) {
        file.status = 'done';
      }
      
      // 添加到文件列表
      this.fileList = [...this.fileList, { ...file }];
      
      // 触发变更事件
      this.$emit('change', { file, fileList: this.fileList });
      
      // 检查滚动状态
      this.$nextTick(() => {
        this.checkPing();
      });
    },
    // 测试方法，仅用于开发时调试
    testAddFile() {
      if (this.disabled) return;
      
      const fileTypes = [
        { ext: '.jpg', type: 'image/jpeg' },
        { ext: '.doc', type: 'application/msword' },
        { ext: '.pdf', type: 'application/pdf' },
        { ext: '.mp4', type: 'video/mp4' },
        { ext: '.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
      ];
      
      const randomType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
      
      const file = {
        uid: Date.now() + '_' + Math.random().toString(36).substring(2, 10),
        name: '测试文件_' + new Date().toLocaleTimeString() + randomType.ext,
        status: 'done',
        size: Math.floor(Math.random() * 1000000) + 1000,
        type: randomType.type
      };
      
      // 为图片类型添加缩略图
      if (randomType.type === 'image/jpeg') {
        file.thumbUrl = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
        file.url = file.thumbUrl;
      }
      
      this.addFile(file);
      console.log('添加测试文件:', file.name);
    }
  }
};
</script>

<style scoped>
.el-attachments {
  position: relative;
  width: 100%;
  background-color: #fff;
  transition: all 0.3s;
}

.el-attachments.el-attachments-empty {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  background-color: #fafafa;
  transition: border-color 0.3s;
}

.el-attachments.el-attachments-empty:hover {
  border-color: #409eff;
}

.el-attachments-disabled {
  cursor: not-allowed;
  background-color: #f5f7fa;
  border-color: #e4e7ed;
}

.el-attachments-disabled:hover {
  border-color: #e4e7ed;
}

/* 附件列表样式 */
.el-attachments-list {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 5px;
}

.el-attachments-overflow-wrap .el-attachments-list {
  flex-wrap: wrap;
}

.el-attachments-overflow-scrollX .el-attachments-list {
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.el-attachments-overflow-scrollX .el-attachments-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.el-attachments-overflow-scrollY .el-attachments-list {
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 6px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.el-attachments-overflow-scrollY .el-attachments-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.el-attachments-item {
  flex: 0 0 auto;
  box-sizing: border-box;
  margin-bottom: 0;
}

/* 添加文件按钮 */
.el-attachments-upload-btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-attachments-upload-btn {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.el-attachments-upload-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.el-attachments-upload-btn i {
  font-size: 28px;
  color: #8c8c8c;
}

.el-attachments-upload-btn:hover i {
  color: #409eff;
}

/* 滚动控制按钮 */
.el-attachments-prev-btn,
.el-attachments-next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.85);
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.3s;
}

.el-attachments-prev-btn {
  left: 2px;
}

.el-attachments-next-btn {
  right: 2px;
}

.el-attachments-prev-btn:hover,
.el-attachments-next-btn:hover {
  background-color: #fff;
  color: #409eff;
}

/* 滚动边缘渐变效果 */
.el-attachments-overflow-scrollX.el-attachments-ping-start .el-attachments-list::before,
.el-attachments-overflow-scrollX.el-attachments-ping-end .el-attachments-list::after,
.el-attachments-overflow-scrollY.el-attachments-ping-start .el-attachments-list::before,
.el-attachments-overflow-scrollY.el-attachments-ping-end .el-attachments-list::after {
  content: '';
  position: absolute;
  pointer-events: none;
  z-index: 9;
}

.el-attachments-overflow-scrollX.el-attachments-ping-start .el-attachments-list::before {
  left: 0;
  top: 0;
  bottom: 0;
  width: 30px;
  background: linear-gradient(to right, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0));
}

.el-attachments-overflow-scrollX.el-attachments-ping-end .el-attachments-list::after {
  right: 0;
  top: 0;
  bottom: 0;
  width: 30px;
  background: linear-gradient(to left, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0));
}

.el-attachments-overflow-scrollY.el-attachments-ping-start .el-attachments-list::before {
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: linear-gradient(to bottom, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0));
}

.el-attachments-overflow-scrollY.el-attachments-ping-end .el-attachments-list::after {
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: linear-gradient(to top, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0));
}

/* 占位符样式 */
.el-attachments-placeholder {
  height: 180px;
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s;
}

.el-attachments-placeholder:hover {
  border-color: #409eff;
}

.el-attachments-placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #909399;
}

.el-attachments-placeholder-content i {
  font-size: 32px;
  margin-bottom: 8px;
}

.el-attachments-placeholder-title {
  font-size: 16px;
  margin-bottom: 8px;
  color: #606266;
}

.el-attachments-placeholder-description {
  font-size: 14px;
  color: #909399;
}

/* 上传区域样式 */
.el-attachments-upload {
  display: none;
}

.el-attachments-drop-container {
  padding: 20px;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 预览对话框样式 */
.el-attachments-preview-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.el-attachments-preview-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.el-attachments-preview-video,
.el-attachments-preview-audio {
  width: 100%;
  max-width: 600px;
}

.el-attachments-preview-file {
  text-align: center;
  padding: 20px;
}

.el-attachments-preview-file i {
  font-size: 48px;
  margin-bottom: 16px;
  color: #409eff;
}

.el-attachments-preview-size {
  color: #909399;
  margin-top: 8px;
  margin-bottom: 16px;
}
</style> 