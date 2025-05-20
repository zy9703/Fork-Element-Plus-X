<script setup lang="ts">
import type { ConversationItem, ConversationMenuCommand } from '../Conversations/types'
import type { MentionOption } from '../MentionSender/types'
import type { A3ChatEmits, A3ChatProps } from './types'
import BubbleList from '../BubbleList/index.vue'
import Conversations from '../Conversations/index.vue'
import MentionSender from '../MentionSender/index.vue'

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
  bubbleListMaxHeight: 'auto',
  bubbleListTriggerIndices: 'only-last',
  bubbleListAlwaysShowScrollbar: false,
  bubbleListBackButtonThreshold: 200,
  bubbleListShowBackButton: true,
  bubbleListBackButtonPosition: () => ({ bottom: '24px', left: '24px' }),
  bubbleListBtnLoading: false,
  bubbleListBtnColor: '#409EFF',
  bubbleListBtnIconSize: 20,

  // MentionSender组件相关
  senderPlaceholder: '输入 @ 和 # 触发指令弹框',
  senderClearable: true,
  senderTriggerStrings: () => ['@', '#'],
  senderAutoSize: () => ({ minRows: 1, maxRows: 6 }),
  senderReadOnly: false,
  senderSubmitBtnDisabled: false,
  senderLoading: false,
  senderAllowSpeech: false,
  senderSubmitType: 'enter',
  senderHeaderAnimationTimer: 300,
  senderInputWidth: '100%',
  senderVariant: 'default',
  senderShowUpdown: true,
  senderInputStyle: () => ({}),
  senderTriggerPopoverVisible: false,
  senderTriggerPopoverWidth: 'fit-content',
  senderTriggerPopoverLeft: '0px',
  senderTriggerPopoverOffset: 8,
  senderTriggerPopoverPlacement: 'top',
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
      />
      <MentionSender
        :model-value="props.senderValue"
        :placeholder="props.senderPlaceholder"
        :clearable="props.senderClearable"
        :options="props.senderOptions"
        :trigger-strings="props.senderTriggerStrings"
        :disabled="props.senderDisabled"
        :auto-size="props.senderAutoSize"
        :read-only="props.senderReadOnly"
        :submit-btn-disabled="props.senderSubmitBtnDisabled"
        :loading="props.senderLoading"
        :allow-speech="props.senderAllowSpeech"
        :submit-type="props.senderSubmitType"
        :header-animation-timer="props.senderHeaderAnimationTimer"
        :input-width="props.senderInputWidth"
        :variant="props.senderVariant"
        :show-updown="props.senderShowUpdown"
        :input-style="props.senderInputStyle"
        :trigger-popover-visible.sync="props.senderTriggerPopoverVisible"
        :trigger-popover-width="props.senderTriggerPopoverWidth"
        :trigger-popover-left="props.senderTriggerPopoverLeft"
        :trigger-popover-offset="props.senderTriggerPopoverOffset"
        :trigger-popover-placement="props.senderTriggerPopoverPlacement"
        @update:model-value="(value: string) => emit('update:senderValue', value)"
        @search="(value: string, prefix: string) => emit('senderSearch', value, prefix)"
        @select="(option: MentionOption) => emit('senderSelect', option)"
        @submit="() => emit('senderSubmit')"
        @cancel="() => emit('senderCancel')"
        @recording-change="() => emit('senderRecordingChange')"
      />
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