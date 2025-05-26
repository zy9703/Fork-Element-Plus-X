<script>
// 导入 Element UI 组件和 Message 提示
import { Button, Message } from 'element-ui';
import Sender from './index.vue'; // 假设 Sender 组件已转写为 Vue 2

export default {
  name: 'SenderDemo',
  components: {
    Sender,
    // 注册 Element UI 组件
    [Button.name]: Button,
  },
  data() {
    return {
      senderRef: null,
      value: '',
      loading: false,
      showHeaderFlog: false,
      time: null,
      triggerPopoverVisible: false,
    }
  },
  mounted() {
    if (this.senderRef) {
      console.log('senderRef', this.senderRef)
      this.senderRef.openHeader()
    }
  },
  methods: {
    openCloseHeader() {
      if (!this.showHeaderFlog) {
        this.senderRef.openHeader()
      }
      else {
        this.senderRef.closeHeader()
      }
      this.showHeaderFlog = !this.showHeaderFlog
    },
    closeHeader() {
      this.showHeaderFlog = false
      this.senderRef.closeHeader()
    },
    submit() {
      console.log('submit 提交参数', this.value)
      Message.warning('提交中,💌 注意组件内置提交按钮的变化 ~')
      this.loading = true
      this.time = setTimeout(() => {
        this.loading = false
        Message.success('提交成功')
      }, 3500)
    },
    // 取消提交
    cancel() {
      Message.info('取消提交')
      this.loading = false
      if (this.time)
        clearTimeout(this.time)
      this.time = null
    },
    blur() {
      this.senderRef.blur()
    },
    focus(type = 'all') {
      this.senderRef.focus(type)
    },
  },
}
</script>

<template>
  <div class="component-container">
    <div class="top-wrap">
      <div class="btn-list">
        <el-button type="success" plain @click="focus('start')">
          文本最前方
        </el-button>
        <el-button type="success" plain @click="focus('end')">
          文本最后方
        </el-button>
        <el-button type="success" plain @click="focus('all')">
          整个文本
        </el-button>
        <el-button type="success" plain @click="blur">
          取消焦点
        </el-button>
        <el-button type="success" plain @click="senderRef.openHeader()">
          打开头部
        </el-button>
        <el-button type="success" plain @click="senderRef.closeHeader()">
          关闭头部
        </el-button>
        <el-button type="success" plain @click="senderRef.submit()">
          提交
        </el-button>
        <el-button type="success" plain @click="cancel">
          取消提交
        </el-button>

        <el-button type="success" plain @click="senderRef.startRecognition()">
          开始录音
        </el-button>
        <el-button type="success" plain @click="senderRef.stopRecognition()">
          结束录音
        </el-button>
      </div>
    </div>

    <div class="component-1">
      <div>默认变体样式：默认左右结构</div>
      <Sender
        v-model="value"
        :trigger-popover-visible.sync="triggerPopoverVisible"
        allow-speech
        clearable
        submit-type="shiftEnter"
        placeholder="使用 / 或者 @ 触发指令，可支持自定义多个指令"
        :loading="loading"
        :trigger-strings="['/', '@']"
        @submit="submit"
      >
        <!-- 自定义头部 -->
        <template #header>
          <div class="header-self-wrap">
            <div class="header-self-title">
              <div class="header-left">
                自定义头部标题
              </div>
              <div class="header-right">
                <el-button @click.stop="closeHeader">
                  <!-- Element UI 图标使用 i 标签和类名 -->
                  <i class="el-icon-circle-close"></i>
                  <span>关闭头部</span>
                </el-button>
              </div>
            </div>
            <div class="header-self-content">
              自定义头部内容
            </div>
          </div>
        </template>

        <!-- 自定义 指令触发的 popover -->
        <template #trigger-popover="{ triggerString }">
          自定义 指令触发 当前触发条件：{{ triggerString }} 在这里存放的内容，回车效果会被内置的提交覆盖，如果想用列表渲染，请使用 MentionSenderDemo 提及发送组件
        </template>

        <!-- 自定义操作列表 -->
        <!-- <template #action-list>
          <div class="action-list-self-wrap">
            <span>自定义操作列表</span>
            <el-button type="success" plain @click="focus('start')">
              文本最前方
            </el-button>
            <el-button type="success" plain @click="focus('end')">
              文本最后方
            </el-button>
            <el-button type="success" plain @click="focus('all')">
              整个文本
            </el-button>
            <el-button type="success" plain @click="blur">
              取消焦点
            </el-button>
          </div>
        </template> -->

        <!-- 自定义底部 -->
        <template #footer>
          <div class="footer-self-wrap">
            <div class="prefix-self-wrap">
              这里是自定义底部
            </div>
          </div>
        </template>
      </Sender>
      <div>v1.2.X+ 变体样式：上下结构</div>
      <Sender
        ref="senderRef"
        v-model="value"
        :trigger-popover-visible.sync="triggerPopoverVisible"
        allow-speech
        clearable
        submit-type="shiftEnter"
        placeholder="使用 / 或者 @ 触发指令，可支持自定义多个指令"
        :loading="loading"
        :trigger-strings="['/', '@']"
        variant="updown"
        :show-header-flog="showHeaderFlog"
        @submit="submit"
      >
        <!-- 自定义头部 -->
        <template #header>
          <div class="header-self-wrap">
            <div class="header-self-title">
              <div class="header-left">
                自定义头部标题
              </div>
              <div class="header-right">
                <el-button @click.stop="closeHeader">
                  <!-- Element UI 图标使用 i 标签和类名 -->
                  <i class="el-icon-circle-close"></i>
                  <span>关闭头部</span>
                </el-button>
              </div>
            </div>
            <div class="header-self-content">
              自定义头部内容
            </div>
          </div>
        </template>

        <!-- 自定义前缀 -->
        <template #prefix>
          <div class="prefix-self-wrap">
            <el-button @click="openCloseHeader">
              <!-- Element UI 图标使用 i 标签和类名 -->
              <i class="el-icon-link"></i>
              <span>自定义前缀</span>
            </el-button>

            <span>这是 sender 变体后的 #prefix 前缀 和 #action-list 操作列表</span>
          </div>
        </template>

        <!-- 自定义 指令触发的 popover -->
        <template #trigger-popover="{ triggerString }">
          自定义 指令触发 当前触发条件：{{ triggerString }} 在这里存放的内容，回车效果会被内置的提交覆盖，如果想用列表渲染，请使用 MentionSenderDemo 提及发送组件
        </template>

        <!-- 自定义操作列表 -->
        <!-- <template #action-list>
          <div class="action-list-self-wrap">
            <span>自定义操作列表</span>
            <el-button type="success" plain @click="focus('start')">
              文本最前方
            </el-button>
            <el-button type="success" plain @click="focus('end')">
              文本最后方
            </el-button>
            <el-button type="success" plain @click="focus('all')">
              整个文本
            </el-button>
            <el-button type="success" plain @click="blur">
              取消焦点
            </el-button>
          </div>
        </template> -->

        <!-- 自定义底部 -->
        <template #footer>
          <div class="footer-self-wrap">
            <div class="prefix-self-wrap">
              这里是自定义底部
            </div>
          </div>
        </template>
      </Sender>
    </div>
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 220px);
  overflow: auto;
  // overflow: auto;

  .top-wrap {
    margin: 12px 0;
    .btn-list {
      display: flex;
      flex-wrap: wrap;
      ::v-deep {
        .el-button + .el-button {
          margin-left: 8px;
          margin-bottom: 8px;
        }
      }
    }
  }

  .component-1 {
    display: flex;
    gap: 24px;
    flex-direction: column;

    .header-self-wrap {
      flex: 1;
      display: block;
      display: flex;
      flex-direction: column;
      height: 130px;
      margin: 0;
      .header-self-title {
        padding: 16px;
        display: flex;
        height: 30px;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 8px;
      }
      .header-self-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #626aef;
        font-weight: 600;
      }
    }

    .prefix-self-wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .action-list-self-wrap {
      display: flex;
      align-items: center;
      & > span {
        width: 120px;
        font-weight: 600;
        color: var(--el-color-primary);
      }
    }

    .footer-self-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      color: #626aef;
      font-weight: 700;
      font-size: 20px;
    }
  }
}
</style>
