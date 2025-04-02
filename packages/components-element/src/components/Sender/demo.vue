<template>
  <div class="sender-demo-container">
    <h2>Sender 组件示例</h2>
    
    <!-- 基础用法 -->
    <section>
      <h3>基础用法</h3>
      <div class="demo-section">
        <a3-sender 
          v-model="basicMessage" 
          placeholder="请输入内容..." 
          clearable
          allow-speech
          @submit="handleSubmit"
        />
      </div>
    </section>

    <!-- 禁用与只读状态 -->
    <section>
      <h3>禁用与只读状态</h3>
      <div class="demo-section">
        <el-row :gutter="20">
          <el-col :span="12">
            <p>禁用状态</p>
            <a3-sender 
              v-model="disabledStates.disabled" 
              disabled
              placeholder="禁用状态" 
            />
          </el-col>
          <el-col :span="12">
            <p>只读状态</p>
            <a3-sender 
              v-model="disabledStates.readonly" 
              read-only
              placeholder="只读状态" 
            />
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 不同提交模式 -->
    <section>
      <h3>提交模式</h3>
      <div class="demo-section">
        <el-row :gutter="20">
          <el-col :span="12">
            <p>Enter键提交（默认）</p>
            <a3-sender 
              v-model="submitTypes.enter" 
              submit-type="enter"
              placeholder="按Enter键提交，Shift+Enter换行" 
              @submit="(val) => handleSubmitType('enter', val)"
            />
          </el-col>
          <el-col :span="12">
            <p>Shift+Enter键提交</p>
            <a3-sender 
              v-model="submitTypes.shiftEnter" 
              submit-type="shiftEnter"
              placeholder="按Shift+Enter键提交，Enter换行" 
              @submit="(val) => handleSubmitType('shiftEnter', val)"
            />
          </el-col>
        </el-row>
      </div>
    </section>
    
    <!-- 加载状态 -->
    <section>
      <h3>加载状态</h3>
      <div class="demo-section">
        <a3-sender 
          v-model="loadingMessage" 
          :loading="isLoading"
          clearable
          placeholder="提交后会进入加载状态..." 
          @submit="handleLoadingSubmit"
        />
      </div>
    </section>
    
    <!-- 提交后清空 -->
    <section>
      <h3>提交后清空</h3>
      <div class="demo-section">
        <a3-sender 
          v-model="clearAfterSubmitMessage" 
          clear-on-submit
          placeholder="提交后将自动清空..." 
          @submit="handleClearOnSubmit"
        />
        <div class="submit-result" v-if="submitResults.clearOnSubmit">
          <p>上次提交: {{ submitResults.clearOnSubmit }}</p>
        </div>
      </div>
    </section>
    

    
    <!-- 插槽使用 -->
    <section>
      <h3>自定义操作按钮</h3>
      <div class="demo-section">
        <a3-sender 
          v-model="customButtonsMessage" 
          placeholder="自定义操作按钮示例" 
        >
          <template #before-actions>
            <el-button 
              type="text" 
              icon="el-icon-picture"
              @click="handleCustomAction('图片')"
            ></el-button>
            <el-button 
              type="text" 
              icon="el-icon-paperclip"
              @click="handleCustomAction('附件')"
            ></el-button>
          </template>
          <template #after-actions>
            <el-button 
              type="text" 
              icon="el-icon-s-promotion"
              @click="handleCustomAction('发送')"
            ></el-button>
          </template>
        </a3-sender>
        <div class="submit-result" v-if="customActionMessage">
          <p>操作: {{ customActionMessage }}</p>
        </div>
      </div>
    </section>
    

    <!-- 自定义头部 -->
    <section>
      <h3>自定义头部 (Header)</h3>
      <div class="demo-section">
        <a3-sender 
          v-model="customHeaderMessage" 
          ref="headerSenderRef"
          placeholder="点击下方按钮打开/关闭自定义头部" 
        >
          <template #header>
            <div class="custom-header">
              <div class="header-title">
                <span>自定义头部内容</span>
                <el-button 
                  size="small" 
                  type="text" 
                  icon="el-icon-close"
                  @click="closeHeader"
                >关闭</el-button>
              </div>
              <div class="header-content">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-button type="primary" icon="el-icon-star-off" @click="insertTemplate('你好，')">插入问候</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="success" icon="el-icon-time" @click="insertTemplate('这是来自头部的消息')">插入文本</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </template>
        </a3-sender>
        <div class="controls">
          <el-button type="primary" @click="toggleHeader">打开/关闭头部</el-button>
        </div>
      </div>
    </section>

    <!-- 自定义底部 -->
    <section>
      <h3>自定义底部 (Footer)</h3>
      <div class="demo-section">
        <a3-sender 
          v-model="customFooterMessage" 
          placeholder="带有自定义底部的输入框" 
        >
          <template #footer>
            <div class="custom-footer">
              <p class="tip-text">提示: 您可以在这里添加任何辅助信息</p>
              <div class="quick-actions">
                <el-tag 
                  v-for="(tag, idx) in quickReplies" 
                  :key="idx"
                  size="small"
                  @click="useQuickReply(tag)"
                >{{ tag }}</el-tag>
              </div>
            </div>
          </template>
        </a3-sender>
      </div>
    </section>

    <!-- 命令功能 -->
    <section>
      <h3>命令功能 (@和/)</h3>
      <div class="demo-section">
        <el-alert
          title="提示：在输入框中输入 @ 可以插入文件，输入 / 可以使用快捷命令"
          type="info"
          :closable="false"
          show-icon
        />
        <div class="command-demo">
          <a3-sender 
            v-model="commandsMessage" 
            placeholder="试试输入 @ 或 / 看看会发生什么..."
            @atCommand="handleAtCommand"
            @slashCommand="handleSlashCommand"
            @fileSelected="handleFileSelected"
          />
          
          <div v-if="commandResult" class="command-result">
            <p>命令执行结果：{{ commandResult }}</p>
          </div>
          
          <!-- 显示上传的文件 -->
          <div v-if="selectedFile" class="selected-file-preview">
            <div class="file-preview-header">
              <h4>已选择的文件</h4>
              <el-button type="text" icon="el-icon-close" @click="clearSelectedFile"></el-button>
            </div>
            
            <div class="file-preview-content">
              <template v-if="selectedFile.category === 'image'">
                <img :src="selectedFileUrl" class="preview-image" alt="预览图片" />
              </template>
              <template v-else-if="selectedFile.category === 'video'">
                <video :src="selectedFileUrl" controls class="preview-video"></video>
              </template>
              <template v-else>
                <div class="file-info">
                  <i :class="getFileIcon(selectedFile.category)"></i>
                  <div class="file-details">
                    <span class="file-name">{{ selectedFile.file.name }}</span>
                    <span class="file-size">{{ formatFileSize(selectedFile.file.size) }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
          
          <el-card class="command-help" shadow="never">
            <div slot="header">
              <span>可用命令</span>
            </div>
            <div class="commands-list">
              <div class="commands-group">
                <h4>@ 命令</h4>
                <p><code>@</code> - 插入图片、附件、位置等</p>
              </div>
              <div class="commands-group">
                <h4>/ 命令</h4>
                <p><code>/help</code> - 显示帮助信息</p>
                <p><code>/date</code> - 插入当前日期</p>
                <p><code>/time</code> - 插入当前时间</p>
                <p><code>/todo</code> - 添加待办项</p>
                <p><code>/weather</code> - 插入天气信息</p>
                <p><code>/clear</code> - 清空输入框</p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </section>

    <!-- 集成附件功能 -->
    <section>
      <h3>集成附件功能</h3>
      <div class="demo-section">
        <el-alert
          title="提示：点击附件按钮可以打开附件上传区域，直接拖拽文件到区域中或点击上传"
          type="info"
          :closable="false"
          show-icon
        />
        <div class="attachments-demo">
          <a3-sender 
            v-model="attachmentsMessage" 
            placeholder="试试点击附件按钮或使用@附件命令..."
            clearable
            @submit="handleAttachmentsSubmit"
            @fileSelected="handleAttachmentsFileSelected"
            @attachmentsChange="handleAttachmentsChange"
          />
          
          <div v-if="attachmentsResult" class="attachments-result">
            <template v-if="submittedAttachments && submittedAttachments.length">
              <h4>提交的附件</h4>
              <el-table :data="submittedAttachments" style="width: 100%">
                <el-table-column prop="name" label="文件名"></el-table-column>
                <el-table-column prop="type" label="类型" width="120"></el-table-column>
                <el-table-column prop="size" label="大小" width="120">
                  <template slot-scope="scope">
                    {{ formatFileSize(scope.row.size) }}
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <p>{{ attachmentsResult }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import A3Sender from './index.vue'

export default {
  name: 'SenderDemo',
  components: {
    A3Sender
  },
  data() {
    return {
      // 基础用法
      basicMessage: '',
      
      // 提交模式
      submitTypes: {
        enter: '',
        shiftEnter: ''
      },
      
      // 加载状态
      loadingMessage: '',
      isLoading: false,
      
      // 提交后清空
      clearAfterSubmitMessage: '',
      
      // 自定义头部
      customHeaderMessage: '',
      
      // 自定义按钮
      customButtonsMessage: '',
      customActionMessage: '',
      
      // 禁用与只读
      disabledStates: {
        disabled: '禁用状态示例文本',
        readonly: '只读状态示例文本'
      },
      
      // 自定义底部
      customFooterMessage: '',
      
      // 快速回复
      quickReplies: ['谢谢反馈', '稍后回复', '正在处理中', '请提供更多信息'],
      
      // 提交结果
      submitResults: {
        basic: '',
        enter: '',
        shiftEnter: '',
        clearOnSubmit: ''
      },
      
      // 命令功能
      commandsMessage: '',
      commandResult: '',
      selectedFile: null,
      selectedFileUrl: null,
      
      // 附件功能
      attachmentsMessage: '',
      attachmentsResult: '',
      submittedAttachments: [],
    }
  },
  methods: {
    // 基础提交处理
    handleSubmit(value) {
      this.$message.success(`提交的内容: ${value}`)
      this.submitResults.basic = value
    },
    
    // 不同提交模式处理
    handleSubmitType(type, value) {
      this.$message.success(`使用 ${type} 模式提交: ${value}`)
      this.submitResults[type] = value
    },
    
    // 加载状态处理
    handleLoadingSubmit(value) {
      this.isLoading = true
      this.submitResults.loading = value
      setTimeout(() => {
        this.isLoading = false
        this.$message.success('提交成功')
      }, 1500)
    },
    
    // 提交后清空处理
    handleClearOnSubmit(value) {
      this.submitResults.clearOnSubmit = value
      this.$message.success('提交成功并已清空')
    },
    
    // 自定义头部处理
    toggleHeader() {
      if (this.$refs.headerSenderRef.visiableHeader) {
        this.$refs.headerSenderRef.closeHeader()
      } else {
        this.$refs.headerSenderRef.openHeader()
      }
    },
    
    closeHeader() {
      this.$refs.headerSenderRef.closeHeader()
    },
    
    insertTemplate(text) {
      this.customHeaderMessage += text
    },
    
    // 自定义操作按钮处理
    handleCustomAction(type) {
      this.customActionMessage = `点击了${type}按钮`
      this.$message.info(`您点击了${type}按钮`)
    },
    
    // 快速回复
    useQuickReply(text) {
      this.customFooterMessage = text
    },
    
    // 处理@命令
    handleAtCommand(action) {
      const actionMap = {
        insertImage: '已选择插入图片',
        insertAttachment: '已选择插入附件',
        insertLocation: '已选择插入位置',
        insertVideo: '已选择插入视频',
        insertDocument: '已选择插入文档'
      }
      
      this.commandResult = actionMap[action] || `执行了 ${action} 操作`;
      this.$message.success(this.commandResult);
    },
    
    // 处理/命令
    handleSlashCommand(action) {
      const actionMap = {
        showHelp: '显示帮助信息',
        addTodo: '添加了一个待办项',
        insertDate: '插入了当前日期',
        insertTime: '插入了当前时间',
        insertWeather: '插入了天气信息',
        clearInput: '已清空输入框'
      }
      
      this.commandResult = actionMap[action] || `执行了 ${action} 操作`;
      this.$message.success(this.commandResult);
    },
    
    // 处理文件选择
    handleFileSelected(fileData) {
      this.selectedFile = fileData;
      
      // 创建文件URL (用于预览)
      if (fileData.category === 'image' || fileData.category === 'video') {
        this.selectedFileUrl = URL.createObjectURL(fileData.file);
      } else {
        this.selectedFileUrl = null;
      }
      
      const categoryText = {
        image: '图片',
        video: '视频',
        audio: '音频',
        document: '文档',
        file: '附件'
      };
      
      this.commandResult = `已选择${categoryText[fileData.category]}: ${fileData.file.name}`;
      this.$message.success(this.commandResult);
    },
    
    // 清除选择的文件
    clearSelectedFile() {
      if (this.selectedFileUrl) {
        URL.revokeObjectURL(this.selectedFileUrl);
      }
      this.selectedFile = null;
      this.selectedFileUrl = null;
    },
    
    // 获取文件图标
    getFileIcon(category) {
      const iconMap = {
        image: 'el-icon-picture',
        video: 'el-icon-video-camera',
        audio: 'el-icon-headset',
        document: 'el-icon-document',
        file: 'el-icon-paperclip'
      };
      
      return iconMap[category] || 'el-icon-document';
    },
    
    // 格式化文件大小
    formatFileSize(size) {
      if (size < 1024) {
        return size + ' B';
      } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + ' KB';
      } else {
        return (size / (1024 * 1024)).toFixed(2) + ' MB';
      }
    },
    
    // 附件功能相关方法
    handleAttachmentsSubmit(value, attachments) {
      let message = `提交的内容: ${value || '(空)'}\n`;
      
      if (attachments && attachments.length) {
        message += `附带 ${attachments.length} 个附件`;
        this.submittedAttachments = attachments;
      } else {
        message += '没有附带附件';
        this.submittedAttachments = [];
      }
      
      this.attachmentsResult = message;
      this.$message.success('提交成功');
    },
    
    handleAttachmentsFileSelected(fileData) {
      this.$message.success(`添加了文件: ${fileData.file.name}`);
    },
    
    handleAttachmentsChange(data) {
      this.$message.info(`附件列表已更新，现有 ${data.fileList.length} 个文件`);
    }
  }
}
</script>

<style scoped>
.sender-demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
  margin-bottom: 24px;
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
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.controls {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.submit-result {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #f2f6fc;
  border-radius: 4px;
  border-left: 3px solid #409eff;
}

.custom-header {
  padding: 10px;
}

.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.header-content {
  padding: 10px 0;
}

.custom-footer {
  padding: 10px;
}

.tip-text {
  font-size: 12px;
  color: #909399;
  margin: 0 0 8px 0;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-actions .el-tag {
  cursor: pointer;
}

.command-demo {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.command-result {
  padding: 10px;
  background-color: #f0f9eb;
  border-radius: 4px;
  border-left: 3px solid #67c23a;
}

.command-help {
  margin-top: 15px;
}

.commands-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.commands-group {
  flex: 1;
  min-width: 200px;
}

.commands-group h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #606266;
}

.commands-group p {
  margin: 5px 0;
  font-size: 14px;
}

.commands-group code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
}

.selected-file-preview {
  margin-top: 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.file-preview-header {
  background-color: #f5f7fa;
  padding: 8px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-preview-header h4 {
  margin: 0;
  font-size: 14px;
  color: #606266;
}

.file-preview-content {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image, .preview-video {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.file-info i {
  font-size: 24px;
  color: #909399;
}

.file-details {
  display: flex;
  flex-direction: column;
}

.file-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  word-break: break-all;
}

.file-size {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.attachments-demo {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.attachments-result {
  padding: 15px;
  background-color: #f0f9eb;
  border-radius: 4px;
  border-left: 3px solid #67c23a;
}

.attachments-result h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: 500;
  color: #606266;
}
</style> 