<template>
  <div class="attachments-demo-container">
    <h2>Attachments 输入附件</h2>
    <p>用于展示一组附件信息集合。</p>
    
    <!-- 控制区域 -->
    <div class="global-controls">
      <el-button 
        type="primary" 
        @click="fillPresetFiles" 
        :disabled="!!fileList.length || !!imageFiles.length"
      >
        填充示例文件
      </el-button>
      <el-button 
        @click="resetFiles" 
        :disabled="!fileList.length && !imageFiles.length"
      >
        重置所有文件
      </el-button>
    </div>
    
    <!-- 基本用法 -->
    <section>
      <h3>基本用法</h3>
      <el-alert
        title="基础用法，支持拖拽上传，完成上传后显示文件列表，点击+号可继续上传。"
        type="info"
        :closable="false"
        show-icon
      />
      <div class="demo-section">
        <a3-attachments
          ref="basicAttachments"
          :items="basicFiles"
          :before-upload="handleBeforeUpload"
          @change="handleBasicChange"
          placeholder="点击或拖拽文件到此区域上传"
        />
        
        <div class="controls">
          <el-button 
            @click="resetBasicFiles" 
            :disabled="!basicFiles.length"
            size="small"
          >
            清空文件
          </el-button>
          <el-button 
            @click="simulateFileUpload" 
            type="primary"
            size="small"
          >
            模拟上传文件
          </el-button>
        </div>
      </div>
    </section>
    
    <!-- 占位信息 -->
    <section>
      <h3>占位信息</h3>
      <el-alert
        title="修改占位信息，自定义显示内容。"
        type="info"
        :closable="false"
        show-icon
      />
      <div class="demo-section">
        <div class="placeholder-demo">
          <a3-attachments
            :items="fileList"
            :before-upload="() => false"
            @change="handlePlaceholderChange"
            :placeholder="{
              title: '点击或拖拽文件到此区域',
              description: '支持的文件类型：图片、视频、音频、文档等'
            }"
          />
        </div>
        
        <div class="placeholder-demo custom-placeholder">
          <a3-attachments
            :before-upload="() => false"
            @change="handlePlaceholderChange"
          >
            <template #placeholder="{ type }">
              <div v-if="type === 'inline'" class="custom-placeholder-content">
                <i class="el-icon-upload"></i>
                <div class="custom-placeholder-title">自定义占位内容</div>
                <el-button type="primary" size="small">选择文件</el-button>
              </div>
              <div v-else class="custom-placeholder-content">
                <i class="el-icon-upload"></i>
                <div class="custom-placeholder-title">释放文件开始上传</div>
              </div>
            </template>
          </a3-attachments>
        </div>
      </div>
    </section>
    
    <!-- 超出样式 -->
    <section>
      <h3>超出样式</h3>
      <el-alert
        title="控制附件超出区域长度时的展示方式。"
        type="info"
        :closable="false"
        show-icon
      />
      <div class="demo-section overflow-demo">
        <div class="overflow-controls">
          <el-radio-group v-model="overflow" size="medium">
            <el-radio-button label="wrap">Wrap</el-radio-button>
            <el-radio-button label="scrollX">Scroll X</el-radio-button>
            <el-radio-button label="scrollY">Scroll Y</el-radio-button>
          </el-radio-group>
          
          <el-switch
            v-model="overflowDisabled"
            active-text="禁用"
            inactive-text="启用"
          />
        </div>
        
        <a3-attachments
          :overflow="overflow"
          :items="overflowFiles"
          :disabled="overflowDisabled"
          :before-upload="() => false"
          @change="handleOverflowChange"
          placeholder="点击或拖拽文件到此区域上传"
        />
      </div>
    </section>
    
    <!-- 集成到Sender组件 -->
    <section>
      <h3>与Sender组件集成</h3>
      <el-alert
        title="配合 Sender 组件使用，在对话中插入附件。"
        type="info"
        :closable="false"
        show-icon
      />
      <div class="demo-section sender-integration">
        <a3-sender
          ref="senderRef"
          v-model="senderMessage"
          placeholder="在此输入消息，或点击附件按钮上传文件"
          @submit="handleSenderSubmit"
        >
          <template #before-actions>
            <el-badge :is-dot="senderFiles.length > 0 && !attachmentsOpen">
              <el-button 
                type="text"
                icon="el-icon-paperclip"
                @click="toggleAttachments"
              ></el-button>
            </el-badge>
          </template>
          
          <template #header>
            <div v-show="attachmentsOpen" class="sender-attachments-header">
              <div class="header-title">
                <span>附件</span>
                <el-button 
                  type="text" 
                  icon="el-icon-close"
                  @click="attachmentsOpen = false"
                ></el-button>
              </div>
              <div class="header-content">
                <a3-attachments
                  :before-upload="() => false"
                  :items="senderFiles"
                  @change="handleSenderFilesChange"
                  :placeholder="{
                    title: '上传文件',
                    description: '点击或拖拽文件到此区域上传'
                  }"
                />
              </div>
            </div>
          </template>
        </a3-sender>
        
        <div v-if="submitResult" class="submit-result">
          <h4>提交结果</h4>
          <p>文本内容: {{ submitResult.text || '(无)' }}</p>
          <p>文件数量: {{ submitResult.fileCount }}</p>
          <div v-if="submitResult.fileCount > 0" class="submitted-files">
            <div 
              v-for="(file, index) in submitResult.files" 
              :key="index"
              class="submitted-file"
            >
              <i :class="getFileIcon(file)"></i>
              <span>{{ file.name }}</span>
              <span>{{ formatFileSize(file.size) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 文件卡片展示 -->
    <section>
      <h3>文件卡片</h3>
      <el-alert
        title="单独的文件卡片，用于一些展示场景。"
        type="info"
        :closable="false"
        show-icon
      />
      <div class="demo-section file-cards-demo">
        <div 
          v-for="(file, index) in demoFiles" 
          :key="index"
          class="file-card-wrapper"
        >
          <file-card :item="file" />
        </div>
      </div>
    </section>

    <!-- 图片上传 -->
    <section>
      <h3>图片上传</h3>
      <el-alert
        title="图片上传示例，上传成功后可预览图片。"
        type="info"
        :closable="false"
        show-icon
      />
      <div class="demo-section">
        <a3-attachments
          :items="imageFiles"
          :accept="'image/*'"
          :before-upload="() => false"
          @change="handleImageChange"
          placeholder="点击或拖拽图片到此区域上传"
        />
      </div>
    </section>
  </div>
</template>

<script>
import A3Attachments from './index.vue';
import FileCard from './FileCard.vue';
import A3Sender from '../Sender/index.vue';

export default {
  name: 'AttachmentsDemo',
  components: {
    A3Attachments,
    FileCard,
    A3Sender
  },
  data() {
    return {
      // 基本用法
      basicFiles: [],
      
      // 图片上传
      imageFiles: [],
      
      // 占位符示例
      fileList: [],
      
      // 超出样式
      overflow: 'wrap',
      overflowDisabled: false,
      overflowFiles: [],
      
      // 与Sender集成
      senderMessage: '',
      senderFiles: [],
      attachmentsOpen: false,
      submitResult: null,
      
      // 演示文件
      demoFiles: [
        {
          uid: '1',
          name: 'excel-file.xlsx',
          size: 111111,
          status: 'done'
        },
        {
          uid: '2',
          name: 'word-file.docx',
          size: 222222,
          status: 'done'
        },
        {
          uid: '3',
          name: 'image-file.png',
          size: 333333,
          status: 'done'
        },
        {
          uid: '4',
          name: 'pdf-file.pdf',
          size: 444444,
          status: 'done'
        },
        {
          uid: '5',
          name: 'ppt-file.pptx',
          size: 555555,
          status: 'done'
        },
        {
          uid: '6',
          name: 'video-file.mp4',
          size: 666666,
          status: 'done'
        },
        {
          uid: '7',
          name: 'audio-file.mp3',
          size: 777777,
          status: 'done'
        },
        {
          uid: '8',
          name: 'zip-file.zip',
          size: 888888,
          status: 'done'
        },
        {
          uid: '9',
          name: 'markdown-file.md',
          size: 999999,
          description: '自定义描述信息',
          status: 'done'
        },
        {
          uid: '10',
          name: 'preview-image.png',
          thumbUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          size: 123456,
          status: 'done'
        }
      ]
    };
  },
  methods: {
    // 基本用法相关方法
    handleBeforeUpload(file) {
      // 这里直接返回false，阻止上传但允许文件被添加到列表
      console.log('准备上传文件:', file.name);
      return false;
    },
    
    handleBasicChange({ file, fileList }) {
      console.log('文件列表更新:', fileList);
      this.basicFiles = fileList;
      this.$message.success(`文件 ${file.name} 已添加`);
    },
    
    resetBasicFiles() {
      this.basicFiles = [];
      this.$message.success('已清空文件列表');
    },
    
    // 模拟上传文件
    simulateFileUpload() {
      // 创建一个示例文件对象
      const file = {
        uid: Date.now() + '_' + Math.random().toString(36).substring(2, 10),
        name: '测试文件_' + new Date().toLocaleTimeString() + '.txt',
        status: 'done',
        size: 12345,
        type: 'text/plain'
      };
      
      // 使用组件的addFile方法直接添加文件
      if (this.$refs.basicAttachments) {
        this.$refs.basicAttachments.addFile(file);
        this.$message.success(`模拟添加文件: ${file.name}`);
      } else {
        // 备用方法：直接更新数组
        this.basicFiles = [...this.basicFiles, file];
        this.$message.success(`模拟添加文件: ${file.name}`);
      }
    },
    
    // 占位符示例相关方法
    handlePlaceholderChange({ fileList }) {
      this.fileList = fileList;
    },
    fillPresetFiles() {
      this.fileList = [
        {
          uid: '1',
          name: 'uploading-file.xlsx',
          status: 'uploading',
          url: 'https://example.com/file.xlsx',
          percent: 93,
        },
        {
          uid: '2',
          name: 'uploaded-file.docx',
          status: 'done',
          size: 123456,
          description: '自定义描述信息',
          url: 'https://example.com/file.docx',
        },
        {
          uid: '3',
          name: 'error-file.zip',
          status: 'error',
          response: '服务器错误 500',
          url: 'https://example.com/file.zip',
        },
        {
          uid: '4',
          name: 'image-uploading.png',
          status: 'uploading',
          percent: 33,
          thumbUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
        {
          uid: '5',
          name: 'image-done.png',
          status: 'done',
          size: 123456,
          thumbUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        }
      ];
      
      // 同时为图片上传区域添加示例图片
      if (!this.imageFiles.length) {
        this.imageFiles = [
          {
            uid: '10',
            name: 'example-image.jpg',
            status: 'done',
            size: 54321,
            thumbUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          }
        ];
      }
      
      this.$message.success('已填充预设文件');
    },
    resetFiles() {
      this.fileList = [];
      this.imageFiles = [];
      this.$message.success('已重置所有文件列表');
    },
    
    // 超出样式相关方法
    handleOverflowChange({ fileList }) {
      this.overflowFiles = fileList;
    },
    
    // 与Sender集成相关方法
    toggleAttachments() {
      this.attachmentsOpen = !this.attachmentsOpen;
    },
    handleSenderFilesChange({ fileList }) {
      this.senderFiles = fileList;
    },
    handleSenderSubmit(value) {
      this.submitResult = {
        text: value,
        fileCount: this.senderFiles.length,
        files: [...this.senderFiles]
      };
      
      this.$message.success('消息已提交');
      this.senderMessage = '';
      this.senderFiles = [];
      this.attachmentsOpen = false;
    },
    
    // 辅助函数
    getFileIcon(file) {
      const name = file.name || '';
      const type = file.type || '';
      let fileType = 'file';
      
      if (type.startsWith('image/') || /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(name)) {
        fileType = 'image';
      } else if (type.startsWith('video/') || /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i.test(name)) {
        fileType = 'video';
      } else if (type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|flac|aac)$/i.test(name)) {
        fileType = 'audio';
      } else if (/\.(doc|docx)$/i.test(name) || type.includes('msword') || type.includes('document')) {
        fileType = 'word';
      } else if (/\.(xls|xlsx)$/i.test(name) || type.includes('spreadsheetml') || type.includes('excel')) {
        fileType = 'excel';
      } else if (/\.(ppt|pptx)$/i.test(name) || type.includes('presentation')) {
        fileType = 'ppt';
      } else if (/\.pdf$/i.test(name) || type.includes('pdf')) {
        fileType = 'pdf';
      } else if (/\.(zip|rar|7z|tar|gz)$/i.test(name) || type.includes('zip') || type.includes('compressed')) {
        fileType = 'zip';
      } else if (/\.txt$/i.test(name) || type.includes('text/plain')) {
        fileType = 'text';
      } else if (/\.(md|mdx)$/i.test(name) || type.includes('text/markdown')) {
        fileType = 'markdown';
      }
      
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
      
      return typeIconMap[fileType] || 'el-icon-document';
    },
    formatFileSize(size) {
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

    // 图片上传相关方法
    handleImageChange({ file, fileList }) {
      // 为图片添加预览URL
      if (file && file.raw && !file.url && !file.thumbUrl) {
        file.thumbUrl = URL.createObjectURL(file.raw);
        file.url = file.thumbUrl;
      }
      
      this.imageFiles = fileList;
      this.$message.success(`图片 ${file.name} 已添加`);
    }
  }
};
</script>

<style scoped>
.attachments-demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 600;
  color: #303133;
}

h3 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 500;
  color: #303133;
  border-left: 3px solid #409eff;
  padding-left: 10px;
}

.demo-section {
  margin-top: 16px;
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 占位符示例样式 */
.placeholder-demo {
  margin-bottom: 20px;
}

.custom-placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.custom-placeholder-content i {
  font-size: 32px;
  margin-bottom: 12px;
  color: #409eff;
}

.custom-placeholder-title {
  font-size: 16px;
  margin-bottom: 12px;
  color: #303133;
}

.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* 超出样式示例 */
.overflow-controls {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 与Sender集成示例 */
.sender-integration {
  min-height: 300px;
}

.sender-attachments-header {
  padding: 15px;
}

.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.header-title span {
  font-size: 16px;
  font-weight: 500;
}

.header-content {
  padding: 5px 0;
}

.submit-result {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f9eb;
  border-radius: 4px;
  border-left: 3px solid #67c23a;
}

.submit-result h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #67c23a;
}

.submitted-files {
  margin-top: 10px;
}

.submitted-file {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px dashed #e1e1e1;
}

.submitted-file i {
  font-size: 18px;
}

.submitted-file span:last-child {
  margin-left: auto;
  color: #909399;
}

/* 文件卡片示例 */
.file-cards-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.file-card-wrapper {
  margin-bottom: 10px;
}

.global-controls {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style> 