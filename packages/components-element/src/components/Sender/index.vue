<template>
  <div
    class="el-sender-wrap"
    :style="{ cursor: disabled ? 'not-allowed' : 'default' }"
  >
    <div
      ref="senderRef"
      class="el-sender"
      :class="[
        { 
          'el-sender-disabled': disabled,
          'el-sender-focused': isFocused,
          'el-sender-loading': loading,
          'el-sender-empty': isEmpty && !loading,
        }
      ]"
      :style="customVars"
    >
      <!-- 头部容器 -->
      <transition name="slide">
        <div v-if="visiableHeader" class="el-sender-header-wrap">
          <div v-if="$slots.header" class="el-sender-header">
            <slot name="header"></slot>
          </div>
          <div v-if="showAttachments" class="el-sender-attachments">
            <div class="el-sender-attachments-header">
              <div class="el-sender-attachments-title">附件</div>
              <el-button 
                type="text" 
                icon="el-icon-close" 
                class="el-sender-attachments-close"
                @click="toggleAttachments"
              ></el-button>
            </div>
            <a3-attachments
              :before-upload="() => false"
              :items="attachmentsList"
              @change="handleAttachmentsChange"
              @remove="handleAttachmentRemove"
            />
            <div class="el-sender-attachments-footer" v-if="attachmentsList.length > 0">
              <el-button 
                type="text" 
                icon="el-icon-plus" 
                size="small"
                @click="selectMoreFiles"
              >添加更多文件</el-button>
            </div>
          </div>
        </div>
      </transition>
      
      <!-- 内容容器 -->
      <div class="el-sender-content" @mousedown="onContentMouseDown">
        <!-- Prefix 前缀 -->
        <div v-if="$slots.prefix" class="el-sender-prefix">
          <slot name="prefix"></slot>
        </div>
        
        <!-- 输入框 -->
        <div class="el-sender-input-wrapper">
          <el-input
            ref="inputRef"
            v-model="internalValue"
            class="el-sender-input"
            :style="inputStyle"
            :rows="1"
            :autosize="autoSize"
            type="textarea"
            :validate-event="false"
            :placeholder="placeholder"
            :readonly="readOnly || disabled"
            :disabled="disabled"
            @keydown.native.stop="handleKeyDown"
            @input="handleInput"
            @focus.native="handleFocus"
            @blur.native="handleBlur"
          />
          
          <!-- 发送提示 -->
          <div v-if="!isEmpty && !readOnly && !disabled && showSendTip" class="el-sender-submit-tip">
            {{ submitTip }}
          </div>
          
          <!-- @ 命令弹出菜单 -->
          <div v-if="showAtMenu" class="el-sender-dropdown-menu">
            <div class="el-sender-dropdown-title">插入文件或@提及</div>
            <div
              v-for="(item, index) in atCommands"
              :key="`at-${index}`"
              class="el-sender-dropdown-item"
              @click="handleSelectAtCommand(item)"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <span>{{ item.label }}</span>
            </div>
          </div>
          
          <!-- / 命令弹出菜单 -->
          <div v-if="showSlashMenu" class="el-sender-dropdown-menu">
            <div class="el-sender-dropdown-title">快捷指令</div>
            <div
              v-for="(item, index) in slashCommands"
              :key="`slash-${index}`"
              class="el-sender-dropdown-item"
              @click="handleSelectSlashCommand(item)"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <span>{{ item.label }}</span>
              <span class="el-sender-dropdown-item-desc">{{ item.description }}</span>
            </div>
          </div>
          
          <!-- 隐藏的文件上传输入 -->
          <input 
            ref="fileInput" 
            type="file" 
            style="display: none;" 
            @change="handleFileSelected" 
            :accept="fileAccept"
          />
        </div>
        
        <!-- 操作列表 -->
        <div class="el-sender-action-list">
          <slot name="action-list">
            <div class="el-sender-action-list-presets">
              <!-- 自定义按钮前置插槽 -->
              <slot name="before-actions"></slot>
              
              <!-- 发送/加载按钮 -->
              <el-button 
                v-if="!loading"
                circle
                :disabled="(isEmpty && attachmentsList.length === 0) || disabled || readOnly || loading"
                type="primary"
                size="mini"
                class="el-sender-send-btn"
                @click="submit"
              >
                <i class="el-icon-top"></i>
              </el-button>
              
              <el-button
                v-if="loading"
                circle
                type="warning"
                size="mini"
                class="el-sender-loading-btn"
                @click="cancel"
              >
                <i class="el-icon-loading"></i>
              </el-button>
              
              <!-- 语音按钮 -->
              <el-button
                v-if="!speechLoading && allowSpeech"
                circle
                type="success"
                size="mini"
                class="el-sender-speech-btn"
                @click="startRecognition"
              >
                <i class="el-icon-microphone"></i>
              </el-button>
              
              <el-button
                v-if="speechLoading && allowSpeech"
                circle
                type="success"
                size="mini"
                class="el-sender-speech-loading-btn"
                @click="stopRecognition"
              >
                <i class="el-icon-loading"></i>
              </el-button>
              
              <!-- 清空按钮 -->
              <el-button
                v-if="clearable && (!isEmpty || attachmentsList.length > 0)"
                circle
                type="info"
                size="mini"
                class="el-sender-clear-btn"
                @click="clear"
              >
                <i class="el-icon-delete"></i>
              </el-button>
              
              <!-- 附件按钮 -->
              <el-button
                circle
                :disabled="disabled || readOnly"
                type="info"
                size="mini"
                class="el-sender-attachment-btn"
                @click="toggleAttachments"
              >
                <i class="el-icon-paperclip"></i>
              </el-button>
              
              <!-- 自定义按钮后置插槽 -->
              <slot name="after-actions"></slot>
            </div>
          </slot>
        </div>
      </div>
      
      <!-- 底部插槽 -->
      <div v-if="$slots.footer" class="el-sender-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import A3Attachments from '../Attachments/index.vue';

export default {
  name: 'A3Sender',
  components: {
    A3Attachments
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    autoSize: {
      type: Object,
      default() {
        return {
          minRows: 1,
          maxRows: 6
        }
      }
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    allowSpeech: {
      type: Boolean,
      default: false
    },
    submitType: {
      type: String,
      default: 'enter',
      validator: value => ['enter', 'shiftEnter'].includes(value)
    },
    headerAnimationTimer: {
      type: Number,
      default: 300
    },
    inputWidth: {
      type: String,
      default: '100%'
    },
    clearOnSubmit: {
      type: Boolean,
      default: false
    },
    showSendTip: {
      type: Boolean,
      default: true
    },
    enableAtCommands: {
      type: Boolean,
      default: true
    },
    enableSlashCommands: {
      type: Boolean,
      default: true
    },
    customAtCommands: {
      type: Array,
      default: () => []
    },
    customSlashCommands: {
      type: Array,
      default: () => []
    },
    maxFileSize: {
      type: Number,
      default: 10  // 默认最大10MB
    },
    allowedFileTypes: {
      type: Object,
      default: () => ({
        image: true,
        document: true,
        video: true,
        audio: true
      })
    }
  },
  data() {
    return {
      internalValue: this.value,
      isFocused: false,
      visiableHeader: false,
      speechLoading: false,
      currentCursor: 0,
      showAtMenu: false,
      showSlashMenu: false,
      atCommandInput: '',
      slashCommandInput: '',
      currentFileAction: '',
      fileAccept: '',
      showAttachments: false,
      attachmentsList: [],
      
      recognition: null,
      
      fileTypeMap: {
        insertImage: {
          accept: 'image/*',
          types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        },
        insertAttachment: {
          accept: '*/*',
          types: []  // 允许所有类型
        },
        insertVideo: {
          accept: 'video/*',
          types: ['video/mp4', 'video/webm', 'video/ogg']
        },
        insertAudio: {
          accept: 'audio/*',
          types: ['audio/mp3', 'audio/wav', 'audio/ogg']
        },
        insertDocument: {
          accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt',
          types: [
            'application/pdf', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain'
          ]
        }
      },
      
      defaultAtCommands: [
        { icon: 'picture', label: '插入图片', action: 'insertImage' },
        { icon: 'paperclip', label: '插入附件', action: 'insertAttachment' },
        { icon: 'position', label: '插入位置', action: 'insertLocation' },
        { icon: 'video-camera', label: '插入视频', action: 'insertVideo' },
        { icon: 'document', label: '插入文档', action: 'insertDocument' }
      ],
      
      defaultSlashCommands: [
        { icon: 'success', label: '/help', description: '显示帮助信息', action: 'showHelp' },
        { icon: 'star-off', label: '/todo', description: '添加待办项', action: 'addTodo' },
        { icon: 'time', label: '/date', description: '插入当前日期', action: 'insertDate' },
        { icon: 'time', label: '/time', description: '插入当前时间', action: 'insertTime' },
        { icon: 'sunny', label: '/weather', description: '插入天气信息', action: 'insertWeather' },
        { icon: 'scissors', label: '/clear', description: '清空输入框', action: 'clearInput' }
      ]
    }
  },
  computed: {
    isEmpty() {
      return !this.internalValue || this.internalValue.trim() === ''
    },
    
    submitTip() {
      if (!this.showSendTip) return ''
      return this.submitType === 'enter' ? '按Enter发送' : '按Shift+Enter发送'
    },
    
    customVars() {
      return {
        '--el-padding-xs': '8px',
        '--el-padding-sm': '12px',
        '--el-padding': '16px',
        '--el-box-shadow-tertiary': '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        '--el-sender-input-input-font-size': '14px',
        '--el-sender-header-animation-duration': `${this.headerAnimationTimer}ms`
      }
    },
    
    inputStyle() {
      return {
        'resize': 'none',
        'max-height': '176px',
        'max-width': this.inputWidth
      }
    },
    
    atCommands() {
      return [...this.defaultAtCommands, ...this.customAtCommands].filter(cmd => {
        return this.atCommandInput === '' || cmd.label.toLowerCase().includes(this.atCommandInput.toLowerCase());
      });
    },
    
    slashCommands() {
      return [...this.defaultSlashCommands, ...this.customSlashCommands].filter(cmd => {
        return this.slashCommandInput === '' || 
               cmd.label.toLowerCase().includes(this.slashCommandInput.toLowerCase());
      });
    }
  },
  watch: {
    value(newVal) {
      if (this.readOnly || this.disabled) return
      this.internalValue = newVal
    },
    
    internalValue(newVal) {
      if (this.readOnly || this.disabled) {
        this.internalValue = this.value
        return
      }
      this.$emit('input', newVal)
    }
  },
  methods: {
    /* 内容容器聚焦 */
    onContentMouseDown(e) {
      // 点击容器后设置输入框的聚焦，会触发 &:focus-within 样式
      if (e.target !== this.$refs.senderRef.querySelector(`.el-textarea__inner`)) {
        e.preventDefault()
      }
      this.$refs.inputRef.focus()
    },
    
    /* 头部显示隐藏 */
    openHeader() {
      if (((!this.$slots.header && !this.showAttachments) || this.readOnly)) return false
      this.visiableHeader = true
    },
    
    closeHeader() {
      if ((!this.$slots.header && !this.showAttachments) || this.readOnly) return
      this.visiableHeader = false
    },
    
    /* 语音识别功能 */
    startRecognition() {
      if (this.readOnly) return
      
      // 如果有自定义处理函数
      if (this.$listeners && this.$listeners.recordingChange) {
        this.speechLoading = true
        this.$emit('recordingChange', true)
        return
      }
      
      // SpeechRecognition web API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition()
        this.recognition.continuous = true
        this.recognition.interimResults = true
        this.recognition.lang = 'zh-CN'
        
        this.recognition.onresult = (event) => {
          let results = ''
          for (let i = 0; i <= event.resultIndex; i++) {
            results += event.results[i][0].transcript
          }
          if (!this.readOnly) {
            this.internalValue = results
            this.$emit('input', results)
          }
        }
        
        this.recognition.onstart = () => {
          this.speechLoading = true
        }
        
        this.recognition.onend = () => {
          this.speechLoading = false
        }
        
        this.recognition.onerror = (event) => {
          console.error('语音识别出错:', event.error)
          this.speechLoading = false
        }
        
        this.recognition.start()
      } else {
        console.error('浏览器不支持 Web Speech API')
      }
    },
    
    stopRecognition() {
      // 如果有自定义处理函数
      if (this.$listeners && this.$listeners.recordingChange) {
        this.speechLoading = false
        this.$emit('recordingChange', false)
        return
      }
      
      if (this.recognition) {
        this.recognition.stop()
        this.speechLoading = false
      }
    },
    
    /* 输入框事件处理 */
    submit() {
      if (this.readOnly || this.loading || this.disabled || 
          (this.isEmpty && this.attachmentsList.length === 0)) return
      
      // 如果有附件，一并提交
      if (this.attachmentsList.length > 0) {
        this.$emit('submit', this.internalValue, this.attachmentsList);
      } else {
        this.$emit('submit', this.internalValue);
      }
      
      if (this.clearOnSubmit) {
        this.internalValue = '';
        this.$emit('input', '');
        
        // 如果配置了清除附件
        if (this.clearOnSubmit === true || this.clearOnSubmit === 'all') {
          this.attachmentsList = [];
          // 当附件清空后，如果没有头部插槽，则关闭头部
          if (!this.$slots.header) {
            this.showAttachments = false;
            this.visiableHeader = false;
          }
        }
      }
    },
    
    cancel() {
      if (this.readOnly) return
      
      this.$emit('cancel', this.internalValue)
    },
    
    clear() {
      if (this.readOnly) return
      
      if (this.$refs.inputRef) {
        this.$refs.inputRef.clear()
      }
      this.internalValue = ''
      this.$emit('input', '')
      
      // 清空附件
      this.attachmentsList = []
      
      // 关闭附件区域
      if (this.showAttachments && !this.$slots.header) {
        this.showAttachments = false
        this.visiableHeader = false
      }
      
      this.$emit('clear')
    },
    
    // 按键处理 (支持 enter 和 shiftEnter 两种模式)
    handleKeyDown(e) {
      if (this.readOnly) return
      
      // 辅助功能键处理
      if (e.ctrlKey && e.keyCode === 66) { // Ctrl+B
        e.preventDefault()
        const cursorPosition = e.target.selectionStart
        const selectionEnd = e.target.selectionEnd
        
        if (cursorPosition !== selectionEnd) {
          const textBeforeSelection = this.internalValue.slice(0, cursorPosition)
          const selectedText = this.internalValue.slice(cursorPosition, selectionEnd)
          const textAfterSelection = this.internalValue.slice(selectionEnd)
          
          this.internalValue = `${textBeforeSelection}**${selectedText}**${textAfterSelection}`
          this.$emit('input', this.internalValue)
          
          // 将光标放在加粗文本后面
          this.$nextTick(() => {
            e.target.setSelectionRange(selectionEnd + 4, selectionEnd + 4)
          })
        }
        return
      }
      
      if (this.submitType === 'enter') {
        // Shift + 回车键插入换行
        if (e.shiftKey && e.keyCode === 13) {
          e.preventDefault()
          const cursorPosition = e.target.selectionStart
          const textBeforeCursor = this.internalValue.slice(0, cursorPosition)
          const textAfterCursor = this.internalValue.slice(cursorPosition)
          this.internalValue = `${textBeforeCursor}\n${textAfterCursor}`
          this.$emit('input', this.internalValue)
          
          this.$nextTick(() => {
            e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1)
          })
        }
        // Enter 键提交，但在loading时不提交
        else if (e.keyCode === 13 && !e.shiftKey) {
          e.preventDefault()
          if (!this.loading) {
            this.submit()
          }
        }
      }
      else if (this.submitType === 'shiftEnter') {
        // Shift + 回车键提交，但在loading时不提交
        if (e.shiftKey && e.keyCode === 13) {
          e.preventDefault()
          if (!this.loading) {
            this.submit()
          }
        }
        // Enter 键插入换行
        else if (e.keyCode === 13 && !e.shiftKey) {
          e.preventDefault()
          const cursorPosition = e.target.selectionStart
          const textBeforeCursor = this.internalValue.slice(0, cursorPosition)
          const textAfterCursor = this.internalValue.slice(cursorPosition)
          this.internalValue = `${textBeforeCursor}\n${textAfterCursor}`
          this.$emit('input', this.internalValue)
          
          this.$nextTick(() => {
            e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1)
          })
        }
      }
    },
    
    /* 焦点事件处理 */
    handleFocus() {
      this.isFocused = true
      this.$emit('focus')
    },
    
    handleBlur() {
      this.isFocused = false
      setTimeout(() => {
        this.showAtMenu = false
        this.showSlashMenu = false
      }, 200)
      this.$emit('blur')
    },
    
    blur() {
      if (this.readOnly) return false
      
      if (this.$refs.inputRef) {
        this.$refs.inputRef.blur()
      }
    },
    
    focus(type = 'all') {
      if (this.readOnly) return false
      
      if (type === 'all') {
        this.$refs.inputRef.select()
      }
      else if (type === 'start') {
        this.focusToStart()
      }
      else if (type === 'end') {
        this.focusToEnd()
      }
    },
    
    // 聚焦到文本最前方
    focusToStart() {
      if (this.$refs.inputRef) {
        const textarea = this.$refs.inputRef.$el.querySelector('textarea')
        if (textarea) {
          textarea.focus()
          textarea.setSelectionRange(0, 0)
        }
      }
    },
    
    // 聚焦到文本最后方
    focusToEnd() {
      if (this.$refs.inputRef) {
        const textarea = this.$refs.inputRef.$el.querySelector('textarea')
        if (textarea) {
          textarea.focus()
          textarea.setSelectionRange(this.internalValue.length, this.internalValue.length)
        }
      }
    },
    
    // 处理输入事件，检测特殊字符并显示相应菜单
    handleInput() {
      if (this.readOnly || this.disabled) return;
      
      const textarea = this.$refs.inputRef.$el.querySelector('textarea');
      if (!textarea) return;
      
      this.currentCursor = textarea.selectionStart;
      
      // 获取光标前的文本
      const textBeforeCursor = this.internalValue.substring(0, this.currentCursor);
      
      // 检查@触发
      if (this.enableAtCommands) {
        const atMatch = textBeforeCursor.match(/@([^@\s]*)$/);
        if (atMatch) {
          this.atCommandInput = atMatch[1];
          this.showAtMenu = true;
          this.showSlashMenu = false;
          return;
        } else {
          this.showAtMenu = false;
        }
      }
      
      // 检查/触发
      if (this.enableSlashCommands) {
        const slashMatch = textBeforeCursor.match(/\/([^/\s]*)$/);
        if (slashMatch) {
          this.slashCommandInput = slashMatch[1];
          this.showSlashMenu = true;
          this.showAtMenu = false;
          return;
        } else {
          this.showSlashMenu = false;
        }
      }
    },
    
    // 处理选择@命令
    handleSelectAtCommand(command) {
      // 特殊处理附件命令
      if (command.action === 'insertAttachment') {
        this.toggleAttachments();
        return;
      }
      
      // 特殊处理文件选择命令
      if (['insertImage', 'insertVideo', 'insertDocument'].includes(command.action)) {
        this.openFileSelector(command.action);
        return;
      }
      
      // 其他命令的处理逻辑
      const textarea = this.$refs.inputRef.$el.querySelector('textarea');
      if (!textarea) return;
      
      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = this.internalValue.substring(0, cursorPos);
      const atPos = textBeforeCursor.lastIndexOf('@');
      
      if (atPos !== -1) {
        // 替换@及后面的内容
        const textBefore = this.internalValue.substring(0, atPos);
        const textAfter = this.internalValue.substring(cursorPos);
        
        // 插入特定内容
        if (command.action === 'insertLocation') {
          this.internalValue = `${textBefore}[位置信息]${textAfter}`;
          // 这里可以触发地图选择器，暂时只是插入文本
          this.$emit('atCommand', command.action, '用户位置');
        } else {
          this.internalValue = `${textBefore}[${command.label}]${textAfter}`;
          this.$emit('atCommand', command.action);
        }
        
        // 关闭菜单
        this.showAtMenu = false;
        
        // 将光标移动到插入内容后面
        this.$nextTick(() => {
          const newCursorPos = atPos + command.label.length + 2; // 2是[]的长度
          textarea.setSelectionRange(newCursorPos, newCursorPos);
          textarea.focus();
        });
      }
    },
    
    // 打开文件选择器
    openFileSelector(action) {
      this.currentFileAction = action;
      
      // 设置接受的文件类型
      if (this.fileTypeMap[action]) {
        this.fileAccept = this.fileTypeMap[action].accept;
      } else {
        this.fileAccept = '*/*';  // 默认接受所有文件
      }
      
      // 关闭菜单
      this.showAtMenu = false;
      
      // 触发文件选择
      this.$nextTick(() => {
        this.$refs.fileInput.click();
      });
    },
    
    // 处理文件选择
    handleFileSelected(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // 检查文件大小
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > this.maxFileSize) {
        this.$message.error(`文件过大，不能超过 ${this.maxFileSize}MB`);
        event.target.value = '';  // 清空选择
        return;
      }
      
      // 检查文件类型
      const fileTypeInfo = this.fileTypeMap[this.currentFileAction];
      if (fileTypeInfo && fileTypeInfo.types.length > 0) {
        if (!fileTypeInfo.types.includes(file.type) && !fileTypeInfo.types.some(type => file.name.endsWith(type.replace('application/', '.')))) {
          this.$message.error('不支持的文件类型');
          event.target.value = '';  // 清空选择
          return;
        }
      }
      
      // 获取文件类型的一般分类
      let fileCategory = 'file';
      if (file.type.startsWith('image/')) fileCategory = 'image';
      else if (file.type.startsWith('video/')) fileCategory = 'video';
      else if (file.type.startsWith('audio/')) fileCategory = 'audio';
      else if (file.type.includes('document') || file.type.includes('pdf') || file.type.includes('msword')) fileCategory = 'document';
      
      // 添加到附件列表
      const fileObj = {
        uid: Date.now() + Math.random().toString(36).substring(2),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'done',
        url: URL.createObjectURL(file),
        originFile: file
      };
      
      // 如果是通过@命令触发的，则将文件添加到附件列表并在编辑器中插入引用
      if (this.currentFileAction) {
        // 在光标位置插入文件标记
        const textarea = this.$refs.inputRef.$el.querySelector('textarea');
        if (textarea) {
          const cursorPos = textarea.selectionStart;
          const textBeforeCursor = this.internalValue.substring(0, cursorPos);
          const textAfterCursor = this.internalValue.substring(cursorPos);
          
          // 找到最后一个@的位置
          const atPos = textBeforeCursor.lastIndexOf('@');
          
          if (atPos !== -1) {
            // 替换@及后面的内容
            const textBefore = this.internalValue.substring(0, atPos);
            let insertText = '';
            
            // 根据文件类型插入不同内容
            if (fileCategory === 'image') {
              insertText = `[图片: ${file.name}]`;
            } else if (fileCategory === 'video') {
              insertText = `[视频: ${file.name}]`;
            } else if (fileCategory === 'audio') {
              insertText = `[音频: ${file.name}]`;
            } else if (fileCategory === 'document') {
              insertText = `[文档: ${file.name}]`;
            } else {
              insertText = `[附件: ${file.name}]`;
            }
            
            this.internalValue = `${textBefore}${insertText}${textAfterCursor}`;
            
            // 设置光标位置
            this.$nextTick(() => {
              const newCursorPos = atPos + insertText.length;
              textarea.setSelectionRange(newCursorPos, newCursorPos);
              textarea.focus();
            });
          }
        }
      }
      
      // 添加到附件列表
      this.attachmentsList.push(fileObj);
      
      // 确保头部区域显示
      if (!this.visiableHeader) {
        this.showAttachments = true;
        this.visiableHeader = true;
      }
      
      // 发送事件
      this.$emit('fileSelected', {
        file,
        action: this.currentFileAction,
        category: fileCategory,
        fileObj
      });
      
      // 重置文件输入
      this.currentFileAction = '';
      this.fileAccept = '';
      event.target.value = '';
    },
    
    // 处理选择/命令
    handleSelectSlashCommand(command) {
      // 找到触发/的位置
      const textarea = this.$refs.inputRef.$el.querySelector('textarea');
      if (!textarea) return;
      
      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = this.internalValue.substring(0, cursorPos);
      const slashPos = textBeforeCursor.lastIndexOf('/');
      
      if (slashPos !== -1) {
        // 替换/及后面的内容
        const textBefore = this.internalValue.substring(0, slashPos);
        const textAfter = this.internalValue.slice(cursorPos);
        
        // 处理特定的命令
        if (command.action === 'clearInput') {
          this.clear();
        } else if (command.action === 'insertDate') {
          const date = new Date().toLocaleDateString();
          this.internalValue = `${textBefore}${date}${textAfter}`;
        } else if (command.action === 'insertTime') {
          const time = new Date().toLocaleTimeString();
          this.internalValue = `${textBefore}${time}${textAfter}`;
        } else {
          // 默认只是替换命令文本
          this.internalValue = `${textBefore}${textAfter}`;
        }
        
        // 关闭菜单
        this.showSlashMenu = false;
        
        // 执行对应的操作
        this.$emit('slashCommand', command.action);
        
        // 对于需要移动光标的命令
        if (['insertDate', 'insertTime'].includes(command.action)) {
          this.$nextTick(() => {
            let insertedText = command.action === 'insertDate' 
              ? new Date().toLocaleDateString() 
              : new Date().toLocaleTimeString();
            const newCursorPos = slashPos + insertedText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
            textarea.focus();
          });
        }
      }
    },
    
    // 处理附件按钮点击
    toggleAttachments() {
      if (this.readOnly || this.disabled) return;
      
      this.showAttachments = !this.showAttachments;
      
      if (this.showAttachments) {
        this.visiableHeader = true;
      } else if (!this.$slots.header) {
        this.visiableHeader = false;
      }
    },
    
    // 处理附件变更
    handleAttachmentsChange(event) {
      this.attachmentsList = event.fileList;
      this.$emit('attachmentsChange', event);
    },
    
    // 处理附件删除
    handleAttachmentRemove(file) {
      const index = this.attachmentsList.findIndex(item => item.uid === file.uid);
      if (index !== -1) {
        this.attachmentsList.splice(index, 1);
      }
      
      // 当附件列表为空时，如果没有头部插槽内容，则隐藏头部
      if (this.attachmentsList.length === 0 && !this.$slots.header) {
        this.showAttachments = false;
        this.visiableHeader = false;
      }
      
      this.$emit('attachmentRemove', file);
    },
    
    // 添加更多文件
    selectMoreFiles() {
      this.$refs.fileInput.click();
    }
  },
  // 组件销毁前清理资源
  beforeDestroy() {
    if (this.recognition) {
      try {
        this.recognition.stop()
      } catch (e) {
        // 忽略错误
      }
    }
  }
}
</script>

<style scoped>
.el-sender-wrap {
  width: 100%;
  position: relative;
}

.el-sender {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  box-shadow: var(--el-box-shadow-tertiary);
  transition: all 0.3s;
  border-radius: 8px;
  border-color: #dcdfe6;
  border-width: 0;
  border-style: solid;
  background-color: #ffffff;
}

.el-sender:after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: border-color 0.3s;
  border-radius: inherit;
  border-style: inherit;
  border-color: inherit;
  border-width: 1px;
}

.el-sender.el-sender-focused, .el-sender:focus-within {
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
  border-color: #409eff;
}

.el-sender.el-sender-focused::after, .el-sender:focus-within::after {
  border-width: 2px;
}

.el-sender.el-sender-loading {
  border-color: #e6a23c;
}

.el-sender-header-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--el-padding-xs);
  width: 100%;
  margin: 0;
  padding: 0;
}

/* 展开收起动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all var(--el-sender-header-animation-duration);
  max-height: 500px;
  opacity: 1;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.el-sender-header {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #dcdfe6;
  padding: var(--el-padding-sm) var(--el-padding);
}

.el-sender-content {
  display: flex;
  gap: var(--el-padding-xs);
  width: 100%;
  padding-block: var(--el-padding-sm);
  padding-inline-start: var(--el-padding);
  padding-inline-end: var(--el-padding-sm);
  box-sizing: border-box;
  align-items: center;
}

/* 前缀 */
.el-sender-prefix {
  flex: none;
}

/* 输入框容器 */
.el-sender-input-wrapper {
  position: relative;
  flex: 1;
  width: 100%;
}

/* 发送提示 */
.el-sender-submit-tip {
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 12px;
  color: #909399;
  background-color: rgba(245, 247, 250, 0.9);
  padding: 2px 6px;
  border-radius: 4px;
  opacity: 0.6;
  pointer-events: none;
}

/* 输入框 */
.el-sender-input {
  height: 100%;
  display: flex;
  align-items: center;
  align-self: center;
}

.el-sender-input >>> .el-textarea__inner {
  padding: 0;
  margin: 0;
  color: #303133;
  font-size: var(--el-sender-input-input-font-size);
  line-height: 1.5;
  list-style: none;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  height: auto;
  min-height: auto !important;
  border-radius: 0;
  border: none;
  flex: auto;
  align-self: center;
  vertical-align: bottom;
  resize: none;
  background-color: transparent;
  transition: all 0.3s;
  box-shadow: none !important;
}

/* 操作列表 */
.el-sender-action-list {
  display: flex;
  align-items: center;
}

.el-sender-action-list-presets {
  display: flex;
  gap: var(--el-padding-xs);
  flex-direction: row-reverse;
  align-items: center;
}

/* 自定义按钮样式 */
.el-sender-action-list-presets .el-button {
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0 4px;
}

.el-sender-action-list-presets .el-button i {
  font-size: 14px;
}

.el-sender-send-btn {
  background-color: #409eff;
  border-color: #409eff;
  color: white;
}

.el-sender-loading-btn {
  background-color: #e6a23c;
  border-color: #e6a23c;
  color: white;
}

.el-sender-speech-btn {
  background-color: #67c23a;
  border-color: #67c23a;
  color: white;
}

.el-sender-speech-loading-btn {
  background-color: #67c23a;
  border-color: #67c23a;
  color: white;
}

.el-sender-clear-btn {
  background-color: #909399;
  border-color: #909399;
  color: white;
}

/* 底部插槽 */
.el-sender-footer {
  padding: var(--el-padding-xs) var(--el-padding);
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #dcdfe6;
}

/* 禁用状态 */
.el-sender-disabled {
  background-color: #f5f7fa;
  pointer-events: none;
  opacity: 0.7;
}

/* 进一步美化移动端体验 */
@media (max-width: 768px) {
  .el-sender .el-sender-content {
    padding-inline-start: var(--el-padding-sm);
    padding-inline-end: var(--el-padding-xs);
  }
}

/* 下拉菜单相关样式 */
.el-sender-dropdown-menu {
  position: absolute;
  bottom: calc(100% + 5px);
  left: 16px;
  z-index: 10;
  width: 240px;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 5px 0;
}

.el-sender-dropdown-title {
  font-size: 12px;
  color: #909399;
  padding: 5px 15px;
  font-weight: 500;
  border-bottom: 1px solid #EBEEF5;
  margin-bottom: 5px;
}

.el-sender-dropdown-item {
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.el-sender-dropdown-item:hover {
  background-color: #F5F7FA;
}

.el-sender-dropdown-item i {
  font-size: 16px;
  color: #606266;
}

.el-sender-dropdown-item-desc {
  margin-left: auto;
  font-size: 12px;
  color: #909399;
}

.el-sender-attachments {
  padding: var(--el-padding-sm) var(--el-padding);
  border-bottom: 1px solid #dcdfe6;
}

.el-sender-attachments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.el-sender-attachments-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.el-sender-attachments-close {
  padding: 0;
  margin: 0;
}

.el-sender-attachments-footer {
  display: flex;
  justify-content: flex-start;
  margin-top: 12px;
}

.el-sender-attachment-btn {
  background-color: #409eff;
  border-color: #409eff;
  color: white;
}
</style> 