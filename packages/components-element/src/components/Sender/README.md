# Sender 发送器组件

Sender组件是一个功能丰富的消息输入和发送组件，基于Element UI设计，适用于各种聊天、评论、反馈等场景。它提供了丰富的功能和高度的可定制性。

## 基础功能

- 基本输入和发送
- 附件上传和管理
- 语音输入 (Web Speech API)
- 命令功能 (@ 和 / 命令)
- 自定义头部和底部
- 动态调整高度
- 支持不同的提交模式 (Enter 或 Shift+Enter)
- 加载状态和禁用状态
- 提交后自动清空

## 基本用法

```vue
<template>
  <a3-sender 
    v-model="message" 
    placeholder="请输入内容..." 
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    handleSubmit(value) {
      console.log('提交的内容:', value)
      // 处理提交逻辑
    }
  }
}
</script>
```

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value / v-model | 输入框的内容 | String | '' |
| placeholder | 输入框占位文本 | String | '请输入内容' |
| autoSize | 自动调整文本域高度 | Object | { minRows: 1, maxRows: 6 } |
| readOnly | 是否只读 | Boolean | false |
| disabled | 是否禁用 | Boolean | false |
| loading | 是否加载中 | Boolean | false |
| clearable | 是否可清空 | Boolean | false |
| allowSpeech | 是否启用语音输入 | Boolean | false |
| submitType | 提交方式 | String | 'enter' |
| headerAnimationTimer | 头部动画持续时间 | Number | 300 |
| inputWidth | 输入框宽度 | String | '100%' |
| clearOnSubmit | 提交后是否清空 | Boolean/String | false |
| showSendTip | 是否显示发送提示 | Boolean | true |
| enableAtCommands | 是否启用@命令 | Boolean | true |
| enableSlashCommands | 是否启用/命令 | Boolean | true |
| customAtCommands | 自定义@命令 | Array | [] |
| customSlashCommands | 自定义/命令 | Array | [] |
| maxFileSize | 最大文件大小(MB) | Number | 10 |
| allowedFileTypes | 允许的文件类型 | Object | { image: true, document: true, video: true, audio: true } |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| submit | 提交时触发 | (value: String, attachments?: Array) |
| input | 输入值变化时触发 | (value: String) |
| focus | 获得焦点时触发 | - |
| blur | 失去焦点时触发 | - |
| clear | 清空时触发 | - |
| cancel | 取消加载时触发 | (value: String) |
| atCommand | @命令选择时触发 | (action: String, value?: any) |
| slashCommand | /命令选择时触发 | (action: String) |
| fileSelected | 文件选择时触发 | (fileData: Object) |
| recordingChange | 语音录制状态变化时触发 | (recording: Boolean) |
| attachmentsChange | 附件列表变化时触发 | (data: Object) |
| attachmentRemove | 附件被移除时触发 | (file: Object) |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| header | 自定义头部内容 |
| footer | 自定义底部内容 |
| prefix | 输入框前缀 |
| action-list | 自定义操作按钮区域 |
| before-actions | 操作按钮前置内容 |
| after-actions | 操作按钮后置内容 |

## 命令功能

### @ 命令
在输入框中输入 `@` 可以触发命令菜单，默认支持的命令有：
- @插入图片
- @插入附件
- @插入位置
- @插入视频
- @插入文档

### / 命令
在输入框中输入 `/` 可以触发快捷命令菜单，默认支持的命令有：
- /help - 显示帮助信息
- /todo - 添加待办项
- /date - 插入当前日期
- /time - 插入当前时间
- /weather - 插入天气信息
- /clear - 清空输入框

## 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| submit | 提交内容 | - |
| cancel | 取消加载状态 | - |
| clear | 清空内容 | - |
| focus | 使输入框获得焦点 | (type: String) 可选值: 'all', 'start', 'end' |
| blur | 使输入框失去焦点 | - |
| openHeader | 打开头部区域 | - |
| closeHeader | 关闭头部区域 | - |

## 示例

### 禁用与只读状态

```vue
<a3-sender v-model="message" disabled />
<a3-sender v-model="message" read-only />
```

### 不同提交模式

```vue
<!-- Enter键提交（默认） -->
<a3-sender v-model="message" submit-type="enter" />

<!-- Shift+Enter键提交 -->
<a3-sender v-model="message" submit-type="shiftEnter" />
```

### 加载状态

```vue
<a3-sender v-model="message" :loading="isLoading" @submit="handleLoadingSubmit" />
```

### 附件功能

```vue
<a3-sender v-model="message" @submit="handleAttachmentsSubmit">
  <template #before-actions>
    <el-badge :is-dot="hasAttachments">
      <el-button 
        type="text"
        icon="el-icon-paperclip"
        @click="toggleAttachments"
      ></el-button>
    </el-badge>
  </template>
  
  <template #header>
    <div v-show="attachmentsOpen" class="attachments-header">
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
          :items="attachments"
          @change="handleAttachmentsChange"
        />
      </div>
    </div>
  </template>
</a3-sender>
```

### 语音输入

```vue
<a3-sender v-model="message" allow-speech />
```

## 注意事项

1. 语音输入功能需要浏览器支持Web Speech API，不同浏览器兼容性可能有差异。
2. 文件上传功能需要与A3Attachments组件结合使用。
3. 如果需要在提交时包含附件，请使用附件按钮打开附件区域并上传文件。
4. 默认提交方式为按Enter键提交，如需换行请按Shift+Enter；如果设置submitType为"shiftEnter"，则相反。
5. 组件默认支持自动高度调整，可通过autoSize属性配置最小和最大行数。 