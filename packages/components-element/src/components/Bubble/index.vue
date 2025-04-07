<template>
  <!-- 
    主容器 - 当组件未被销毁时显示
    v-if控制组件销毁状态，internalDestroyed为false时显示
  -->
  <div
    v-if="!internalDestroyed"
    class="a3-bubble"
    :class="{
      'a3-bubble-start': placement === 'start',  // 左侧对齐样式类
      'a3-bubble-end': placement === 'end',      // 右侧对齐样式类
      'a3-bubble-no-style': noStyle,            // 无样式模式类
      'a3-bubble-is-typing': isTypingClass      // 打字动画状态类
    }"
    :style="{
      'max-width': maxWidth,
      'gap': avatarGap
    }"
  >
    <!-- 
      头像区域 - 当没有自定义头像插槽但有头像URL时显示
      v-if条件: 1. 没有avatar插槽内容 2. 有avatar属性值
    -->
    <div v-if="!$slots.avatar && avatar" class="a3-bubble-avatar">
      <!-- 
        头像组件 - 当指定了头像尺寸时使用
        size: 将字符串类型的头像尺寸转换为数字
        src: 头像图片URL
        shape: 头像形状(circle圆形/square方形)
        fit: 图片填充模式
        @error: 头像加载失败事件
      -->
      <el-avatar v-if="avatarSize" :size="Number(avatarSize)" :src="avatar" :shape="avatarShape" :icon="avatarIcon" :fit="avatarFit" @error="avatarError" />
      <!-- 
        默认头像 - 未指定尺寸时使用40px大小
        其他属性与上方相同
      -->
      <el-avatar v-else :size="40" :src="avatar" :shape="avatarShape" :icon="avatarIcon" :fit="avatarFit" @error="avatarError" />
    </div>

    <!-- 
      头像占位区域 - 当没有头像插槽、没有头像URL但设置了头像尺寸时显示
      用于保持布局一致性，避免内容区域跳动
    -->
    <div v-if="!$slots.avatar && !avatar && avatarSize" class="a3-bubble-avatar-placeholder" />

    <!-- 
      自定义头像插槽 - 当使用avatar插槽时显示
      优先级高于默认头像和头像占位区域
      允许完全自定义头像内容和样式
    -->
    <div v-if="$slots.avatar" class="a3-bubble-avatar">
      <slot name="avatar" />
    </div>

    <!-- 内容区域主容器 -->
    <div class="a3-bubble-content-wrapper">
      <!-- 头部内容插槽 - 可选的头部区域 -->
      <div v-if="$slots.header" class="a3-bubble-header">
        <slot name="header" />
      </div>
    
      <!-- 
        主要内容区域 - 包含多种样式变体
        根据不同的props动态添加样式类：
        - loading状态
        - 形状样式(round/corner)
        - 变体样式(filled/borderless/outlined/shadow)
      -->
      <div
        class="a3-bubble-content"
        :class="{
          'a3-bubble-content-loading': loading,
          'a3-bubble-content-round': shape === 'round',
          'a3-bubble-content-corner': shape === 'corner',
          'a3-bubble-content-filled': variant === 'filled',
          'a3-bubble-content-borderless': variant === 'borderless',
          'a3-bubble-content-outlined': variant === 'outlined',
          'a3-bubble-content-shadow': variant === 'shadow'
        }"
      >
        <!-- 
          打字机效果容器 - 非加载状态时显示
          根据content属性添加no-content类
        -->
        <div
          v-if="!loading"
          class="a3-typewriter"
          :class="{
            'no-content': !content
          }"
        >
          <!-- 
            打字机组件 - 当没有自定义内容插槽且有content时显示
            配置项：
            - typing: 打字效果配置
            - content: 显示文本
            - isMarkdown: 是否启用Markdown渲染
            绑定事件：
            - start: 开始打字
            - writing: 打字进行中
            - finish: 打字完成
          -->
          <typewriter
            v-if="!$slots.content && content"
            ref="typewriterRef"
            :typing="_typing"
            :content="content"
            :is-markdown="isMarkdown"
            @start="onStart"
            @writing="onWriting"
            @finish="onFinish"
          />
        </div>

        <!-- 内容区域 - 自定义插槽 -->
        <!-- 条件渲染：组件未销毁、存在content插槽且非加载状态时显示 -->
        <slot v-if="!internalDestroyed && $slots.content && !loading" name="content" />

        <!-- 加载状态 - 默认样式 -->
        <!-- 条件渲染：处于加载状态且没有自定义loading插槽时显示 -->
        <div v-if="loading && !$slots.loading" class="a3-bubble-loading-wrap">
          <!-- 加载动画点 - 使用v-for循环创建3个点 -->
          <!-- 每个点设置不同的动画延迟，实现波浪效果 -->
          <div v-for="(_, index) in dots" :key="index" class="dot" :style="{ animationDelay: `${index * 0.2}s` }" />
        </div>

        <!-- 加载状态 - 自定义插槽 -->
        <!-- 条件渲染：处于加载状态且提供了loading插槽时显示 -->
        <div v-if="loading && $slots.loading" class="a3-bubble-loading-wrap">
          <slot name="loading" />
        </div>
      </div>

        <!-- 底部区域 - 自定义插槽 -->
        <!-- 条件渲染：存在footer插槽时显示 -->
        <div v-if="$slots.footer" class="a3-bubble-footer">
          <slot name="footer" />
        </div>
    </div>
  </div>
</template>

<script>
import Typewriter from '../Typewriter/index.vue'

export default {
  name: 'A3Bubble',  // 组件名称
  components: {
    Typewriter: Typewriter  // 引入Typewriter子组件
  },
  // 组件属性定义
  props: {
    /**
     * 气泡内容文本
     * @type {String}
     * @default ''
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * 推理内容文本，用于显示AI推理过程或补充说明
     * @type {String}
     * @default ''
     * @description 当需要展示AI推理过程或额外的解释内容时使用
     * @example
     * // 基础用法
     * reasoning_content: '正在分析问题...'
     * // 多行内容
     * reasoning_content: '1. 首先分析输入\n2. 然后处理数据'
     */
    reasoning_content: {
      type: String,
      default: ''
    },
    /**
     * 头像URL地址
     * @type {String}
     * @default ''
     */
    avatar: {
      type: String,
      default: ''
    },
    /**
     * 气泡对齐方式
     * @type {String}
     * @values 'start' | 'end'
     * @default 'start'
     */
    placement: {
      type: String,
      default: 'start',
      validator: function(value) {
        return ['start', 'end'].indexOf(value) !== -1
      }
    },
    /**
     * 气泡样式变体
     * @type {String}
     * @values 'filled' | 'borderless' | 'outlined' | 'shadow'
     * @default 'filled'
     */
    variant: {
      type: String,
      default: 'filled',
      validator: function(value) {
        return ['filled', 'borderless', 'outlined', 'shadow'].indexOf(value) !== -1
      }
    },
    /**
     * 气泡最大宽度
     * @type {String}
     * @default '500px'
     */
    maxWidth: {
      type: String,
      default: '500px'
    },
    /**
     * 头像尺寸
     * @type {String}
     * @default ''
     */
    avatarSize: {
      type: String,
      default: ''
    },
    /**
     * 头像与内容间距
     * @type {String}
     * @default '12px'
     */
    avatarGap: {
      type: String,
      default: '12px'
    },
    /**
     * 头像形状
     * @type {String}
     * @values 'circle' | 'square'
     * @default 'circle'
     */
    avatarShape: {
      type: String,
      default: 'circle',
      validator: function(value) {
        return ['circle', 'square'].indexOf(value) !== -1
      }
    },
    /**
     * 头像图标
     * @type {String}
     * @default ''
     */
    avatarIcon: {
      type: String,
      default: ''
    },
    /**
     * 头像图片srcset属性
     * @type {String}
     * @default ''
     */
    avatarSrcSet: {
      type: String,
      default: ''
    },
    /**
     * 头像图片alt属性
     * @type {String}
     * @default ''
     */
    avatarAlt: {
      type: String,
      default: ''
    },
    /**
     * 头像图片填充模式
     * @type {String}
     * @values 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
     * @default 'cover'
     */
    avatarFit: {
      type: String,
      default: 'cover',
      validator: function(value) {
        return ['cover', 'contain', 'fill', 'none', 'scale-down'].indexOf(value) !== -1
      }
    },
    /**
     * 是否禁用默认样式
     * @type {Boolean}
     * @default false
     */
    noStyle: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示加载状态
     * @type {Boolean}
     * @default false
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 气泡形状
     * @type {String}
     * @values 'round' | 'corner' | null
     * @default null
     */
    shape: {
      type: String,
      default: null,
      validator: function(value) {
        return value === null || ['round', 'corner'].indexOf(value) !== -1
      }
    },
    /**
     * 是否启用Markdown渲染
     * @type {Boolean}
     * @default false
     */
    isMarkdown: {
      type: Boolean,
      default: false
    },
    /**
     * 打字机效果配置
     * @type {Boolean|Object}
     * @default false
     * @description 控制文本的打字机效果显示方式
     * @property {string} [suffix='|'] - 光标后缀字符
     * @property {number} [step=2] - 每次打字的字符数
     * @property {number} [interval=50] - 打字间隔时间(毫秒)
     * @example
     * // 布尔值用法 - 启用默认配置
     * typing: true
     * 
     * // 对象用法 - 自定义配置
     * typing: {
     *   suffix: '|',    // 光标后缀
     *   step: 2,        // 每次打字字符数
     *   interval: 50    // 打字间隔(ms)
     * }
     */
    typing: {
      type: [Boolean, Object],
      default: false
    }
  },
  data() {
    return {
      internalDestroyed: false, // 内部销毁状态
      isTypingClass: false, // 响应式变量跟踪打字状态
      dots: [1, 2, 3], // 定义三个点-加载中样式
    }
  },
  computed: {
    /**
     * 计算打字动画的步长
     * @return {number} 返回打字步长，默认2个字符
     */
    _step() {
      if (typeof this.typing === 'object' && this.typing.step)
        return this.typing.step
      else
        return 2
    },
    /**
     * 计算打字动画的光标后缀
     * @return {string} 返回光标后缀字符，默认'|'
     */
    _suffix() {
      if (typeof this.typing === 'object' && this.typing.suffix)
        return this.typing.suffix
      else
        return '|'
    },
    /**
     * 计算打字动画的时间间隔
     * @return {number} 返回打字间隔(毫秒)，默认50ms
     */
    _interval() {
      if (typeof this.typing === 'object' && this.typing.interval)
        return this.typing.interval
      else
        return 50
    },
    /**
     * 计算打字动画的完整配置
     * @return {boolean|Object} 返回打字配置，布尔值或包含suffix/step/interval的对象
     */
    _typing() {
      if (typeof this.typing === 'undefined') {
        return false // 返回false表示不启用打字机效果
      } else if (typeof this.typing === 'boolean') {
        return this.typing
      } else {
        return {
          suffix: this._suffix,
          step: this._step,
          interval: this._interval
        }
      }
    }
  },
  watch: {
    content: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal && this.internalDestroyed) {
          this.restart() // 内容变化时自动重置
        }
      }
    }
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    /**
     * 打字动画开始事件处理
     * @param {Object} instance - Typewriter组件实例
     * @emits start - 触发打字开始事件
     */
    onStart(instance) {
      this.$emit('start', instance)
    },
    /**
     * 打字动画完成事件处理
     * @param {Object} instance - Typewriter组件实例
     * @emits finish - 触发打字完成事件
     */
    onFinish(instance) {
      this.isTypingClass = false
      this.$emit('finish', instance)
    },
    /**
     * 打字动画进行中事件处理
     * @param {Object} instance - Typewriter组件实例
     * @emits writing - 触发打字进行中事件
     */
    onWriting(instance) {
      this.isTypingClass = true
      this.$emit('writing', instance)
    },
    /**
     * 头像加载失败事件处理
     * @param {Event} e - 错误事件对象
     * @emits avatarError - 触发头像加载失败事件
     */
    avatarError(e) {
      this.$emit('avatarError', e)
    },
    /**
     * 中断当前打字动画
     */
    interrupt() {
      if (this.$refs.typewriterRef) {
        this.$refs.typewriterRef.interrupt()
      }
    },
    /**
     * 继续被中断的打字动画
     */
    continueTyping() {
      if (this.$refs.typewriterRef) {
        this.$refs.typewriterRef.continueTyping()
      }
    },
    /**
     * 重置并重新开始打字动画
     */
    restart() {
      this.internalDestroyed = false
      if (this.$refs.typewriterRef) {
        this.$refs.typewriterRef.restart()
      }
    },
    /**
     * 销毁打字动画实例
     */
    destroy() {
      if (this.$refs.typewriterRef) {
        this.$refs.typewriterRef.destroy()
      }
      this.internalDestroyed = true
    }
  }
}
</script>

<style lang="less">
// 气泡组件样式
.a3-bubble {
  display: flex;
  gap: 12px;

  // 头像样式
  .el-avatar {
    display: inline-block;
  }

  // 头像占位符
  &-avatar-placeholder {
    width: 40px;
    height: 40px;
  }

  // 头像容器
  &-avatar {
    margin-right: 4px;
  }

  // 右对齐时的头像样式
  &-end {
    .a3-bubble-avatar {
      margin-right: 0;
      margin-left: 4px;
    }
  }

  // 内容区域圆角样式
  &-start .a3-bubble-content-wrapper .a3-bubble-content-corner {
    border-top-left-radius: 2px;
  }

  &-end .a3-bubble-content-wrapper .a3-bubble-content-corner {
    border-top-right-radius: 2px;
  }

  // 无样式模式
  &-no-style .a3-bubble-content-wrapper .a3-bubble-content {
    background-color: transparent;
    padding: 0;
  }

  // 内容包装器
  &-content-wrapper {
    flex: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    max-width: 100%;

    // 公共文本样式
    .a3-bubble-header,
    .a3-bubble-content,
    .a3-bubble-footer {
      font-size: 14px;
      color: #303133;
      line-height: 1.5;
    }

    // 头部样式
    .a3-bubble-header {
      margin-bottom: 4px;
    }

    // 主要内容区域
    .a3-bubble-content {
      background-color: #f5f7fa;
      padding: 12px 16px;
      border-radius: 8px;
      position: relative;
      box-sizing: border-box;
      min-width: 0;
      max-width: var(--bubble-content-max-width);
      color: #303133;
      font-size: 14px;
      line-height: 1.5;
      min-height: 45px;
      word-break: break-word;

      // 无内容状态
      .no-content {
        height: 0;
      }

      // 圆形样式
      &-round {
        border-radius: 20px;
      }

      // 填充样式
      &-filled {
        background-color: #f5f7fa;
      }

      // 带边框样式
      &-borderless {
        background-color: #f5f7fa;
        border: 1px solid #dcdfe6;
      }

      // 轮廓样式
      &-outlined {
        background: none;
        border: 1px solid #dcdfe6;
      }

      // 阴影样式
      &-shadow {
        background: none;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }

      // 加载状态
      &-loading {
        .a3-bubble-loading-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          padding: 0;
          width: 100%;
          height: 100%;

          // 加载动画点
          .dot {
            width: 5px;
            height: 5px;
            background-color: #409eff;
            border-radius: 50%;
            animation: wave 1s infinite ease-in-out;
          }
        }
      }
    }

    // 底部样式
    .a3-bubble-footer {
      margin-top: 4px;
    }
  }
}

// 加载动画关键帧
@keyframes wave {
  0%, 100% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(2px);
  }
}
</style>