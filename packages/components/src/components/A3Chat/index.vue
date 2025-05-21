<script setup lang="ts">
import type { BubbleListItemProps } from '../BubbleList/types'
import type { ConversationItem, ConversationMenuCommand } from '../Conversations/types'
import type { TriggerEvent } from '../Sender/types'
import type { A3ChatEmits, A3ChatProps } from './types'
import BubbleList from '../BubbleList/index.vue'
import Conversations from '../Conversations/index.vue'
import Sender from '../Sender/index.vue'

const props = withDefaults(defineProps<A3ChatProps>(), {
  // Conversations组件相关
  conversationLabelMaxWidth: 200,
  conversationShowTooltip: true,
  conversationRowKey: 'key',
  conversationTooltipPlacement: 'right',
  conversationTooltipOffset: 35,
  conversationShowToTopBtn: true,
  conversationShowBuiltInMenu: true,

  // BubbleList组件相关
  bubbleList: () => [] as BubbleListItemProps[], // 气泡列表数据
  bubbleListMaxHeight: 'auto', // 气泡列表最大高度
  bubbleListTriggerIndices: 'only-last', // 触发打字机效果的索引：only-last 仅最后一个，all 全部，或指定索引数组
  bubbleListAlwaysShowScrollbar: false, // 是否始终显示滚动条
  bubbleListBackButtonThreshold: 80, // 返回顶部按钮出现的滚动阈值
  bubbleListShowBackButton: true, // 是否显示返回顶部按钮
  bubbleListBackButtonPosition: () => ({ bottom: '20px', left: 'calc(50% - 19px)' }), // 返回顶部按钮位置
  bubbleListBtnLoading: true, // 返回顶部按钮是否显示加载动画
  bubbleListBtnColor: '#409EFF', // 返回顶部按钮颜色
  bubbleListBtnIconSize: 24, // 返回顶部按钮图标大小

  // Sender组件相关
  senderPlaceholder: '请输入内容', // 输入框占位文本
  senderAutoSize: () => ({ minRows: 1, maxRows: 6 }), // 输入框自适应高度配置
  senderSubmitType: 'enter', // 提交方式：enter 或 shiftEnter
  senderHeaderAnimationTimer: 300, // 头部动画持续时间（毫秒）
  senderInputWidth: '100%', // 输入框宽度
  senderVariant: 'default', // 变体类型：default 或 updown
  senderShowUpdown: true, // 是否显示上下布局（仅在 variant 为 updown 时有效）
  senderSubmitBtnDisabled: undefined, // 提交按钮禁用状态
  senderInputStyle: () => ({}), // 输入框样式
  senderTriggerStrings: () => [], // 触发字符数组
  senderTriggerPopoverVisible: false, // 触发弹出框是否可见
  senderTriggerPopoverWidth: 'fit-content', // 触发弹出框宽度
  senderTriggerPopoverLeft: '0px', // 触发弹出框左侧偏移
  senderTriggerPopoverOffset: 8, // 触发弹出框偏移距离
  senderTriggerPopoverPlacement: 'top-start', // 触发弹出框位置
  senderReadOnly: false, // 是否只读
  senderDisabled: false, // 是否禁用
  senderLoading: false, // 是否加载中
  senderClearable: true, // 是否显示清空按钮
  senderAllowSpeech: false, // 是否启用语音输入
})
const emit = defineEmits<A3ChatEmits>()
</script>

<template>
  <div class="a3-chat">
    <div class="left">
      <Conversations
        :active="props.conversationActive"
        :items="props.conversationItems"
        :label-max-width="props.conversationLabelMaxWidth"
        :show-tooltip="props.conversationShowTooltip"
        :row-key="props.conversationRowKey"
        :tooltip-placement="props.conversationTooltipPlacement"
        :tooltip-offset="props.conversationTooltipOffset"
        :show-to-top-btn="props.conversationShowToTopBtn"
        :show-built-in-menu="props.conversationShowBuiltInMenu"
        @change="(item: ConversationItem) => emit('conversationChange', item)"
        @menu-command="(command: ConversationMenuCommand, item: ConversationItem) => emit('conversationMenuCommand', command, item)"
      />
    </div>
    <div class="right">
      <BubbleList 
        :list="props.bubbleList" 
        :max-height="props.bubbleListMaxHeight"
        :trigger-indices="props.bubbleListTriggerIndices"
        :always-show-scrollbar="props.bubbleListAlwaysShowScrollbar"
        :back-button-threshold="props.bubbleListBackButtonThreshold"
        :show-back-button="props.bubbleListShowBackButton"
        :back-button-position="props.bubbleListBackButtonPosition"
        :btn-loading="props.bubbleListBtnLoading"
        :btn-color="props.bubbleListBtnColor"
        :btn-icon-size="props.bubbleListBtnIconSize"
        @complete="(instance, index) => $emit('bubbleListComplete', instance, index)"
      >
        <template #avatar="{ item }">
          <slot name="bubbleListAvatar" :item="item" />
        </template>
        <template #header="{ item }">
          <slot name="bubbleListHeader" :item="item" />
        </template>
        <template #content="{ item }">
          <slot name="bubbleListContent" :item="item" />
        </template>
        <template #footer="{ item }">
          <slot name="bubbleListFooter" :item="item" />
        </template>
        <template #loading="{ item }">
          <slot name="bubbleListLoading" :item="item" />
        </template>
        <template #backToBottom>
          <slot name="bubbleListBackToBottom" />
        </template>
      </BubbleList>
      <Sender
        :model-value="props.senderValue"
        :placeholder="props.senderPlaceholder"
        :auto-size="props.senderAutoSize"
        :read-only="props.senderReadOnly"
        :disabled="props.senderDisabled"
        :loading="props.senderLoading"
        :clearable="props.senderClearable"
        :allow-speech="props.senderAllowSpeech"
        :submit-type="props.senderSubmitType"
        :header-animation-timer="props.senderHeaderAnimationTimer"
        :input-width="props.senderInputWidth"
        :variant="props.senderVariant"
        :show-updown="props.senderShowUpdown"
        :submit-btn-disabled="props.senderSubmitBtnDisabled"
        :input-style="props.senderInputStyle"
        :trigger-strings="props.senderTriggerStrings"
        :trigger-popover-visible="props.senderTriggerPopoverVisible"
        :trigger-popover-width="props.senderTriggerPopoverWidth"
        :trigger-popover-left="props.senderTriggerPopoverLeft"
        :trigger-popover-offset="props.senderTriggerPopoverOffset"
        :trigger-popover-placement="props.senderTriggerPopoverPlacement"
        @update:model-value="(value: string) => emit('update:senderValue', value)"
        @update:trigger-popover-visible="(value: boolean) => emit('update:senderTriggerPopoverVisible', value)"
        @submit="() => emit('senderSubmit')"
        @cancel="() => emit('senderCancel')"
        @recording-change="() => emit('senderRecordingChange')"
        @trigger="(event: TriggerEvent) => emit('senderTrigger', event)"
      >
        <template #header v-if="$slots.senderHeader">
          <slot name="senderHeader" />
        </template>
        <template #footer v-if="$slots.senderFooter">
          <slot name="senderFooter" />
        </template>
        <template #prefix v-if="$slots.senderPrefix">
          <slot name="senderPrefix" />
        </template>
        <template #action-list v-if="$slots.senderActionList">
          <slot name="senderActionList" />
        </template>
        <template #trigger-popover="scope" v-if="$slots.senderTriggerPopover">
          <slot name="senderTriggerPopover" v-bind="scope" />
        </template>
      </Sender>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a3-chat{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  .left{
    position: relative;
  }
  .right{
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 16px;
    .el-bubble-list{
      flex: 1;
    }
  }
}
</style>