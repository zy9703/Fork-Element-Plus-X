<script setup lang="ts">
import type { BubbleListItemProps } from '../BubbleList/types'
import type { ConversationItem, ConversationMenuCommand } from '../Conversations/types'
import type { TriggerEvent } from '../Sender/types'
import type { A3ChatEmits, A3ChatProps } from './types'
import { Delete, Edit } from '@element-plus/icons-vue'
import { markRaw } from 'vue'
import BubbleList from '../BubbleList/index.vue'
import Conversations from '../Conversations/index.vue'
import Sender from '../Sender/index.vue'

const props = withDefaults(defineProps<A3ChatProps>(), {
  // Conversations组件相关
  conversationItems: () => [], // 会话列表数据
  conversationItemsStyle: () => ({}), // 会话项样式
  conversationItemsHoverStyle: () => ({}), // 会话项悬停样式
  conversationItemsActiveStyle: () => ({}), // 会话项激活样式
  conversationItemsMenuOpenedStyle: () => ({}), // 会话项菜单打开时样式
  conversationStyle: () => ({}), // 会话容器样式
  conversationLabelMaxWidth: undefined, // 标签最大宽度
  conversationLabelHeight: 20, // 标签高度
  conversationShowTooltip: false, // 是否显示提示
  conversationTooltipPlacement: 'top', // 提示位置
  conversationTooltipOffset: 12, // 提示偏移
  conversationGroupable: false, // 是否可分组
  conversationUngroupedTitle: '未分组', // 未分组标题
  conversationMenu: () => [
    {
      label: '重命名',
      key: 'rename',
      icon: markRaw(Edit),
      command: 'rename',
    },
    {
      label: '删除',
      key: 'delete',
      icon: markRaw(Delete),
      command: 'delete',
      menuItemHoverStyle: {
        color: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
      },
    },
  ], // 菜单配置
  conversationShowBuiltInMenu: false, // 是否显示内置菜单
  conversationMenuPlacement: 'bottom-start', // 菜单位置
  conversationMenuOffset: 50, // 菜单偏移
  conversationMenuShowArrow: false, // 是否显示菜单箭头
  conversationMenuMaxHeight: undefined, // 菜单最大高度
  conversationMenuStyle: () => ({}), // 菜单样式
  conversationMenuClassName: '', // 菜单类名
  conversationMenuTeleported: true, // 菜单是否传送
  conversationLoadMore: undefined, // 加载更多方法
  conversationLoadMoreLoading: false, // 加载更多加载状态
  conversationShowToTopBtn: false, // 是否显示回到顶部按钮
  conversationRowKey: 'id', // 行键名
  conversationLabelKey: 'label', // 标签键名

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
// 会话列表激活索引
const conversationActive = defineModel('conversationActive', { type: String, default: '', required: false })
// 输入框值
const senderValue = defineModel('senderValue', { type: String, default: '', required: false })
// 触发弹出框是否可见
const senderTriggerPopoverVisible = defineModel('senderTriggerPopoverVisible', { type: Boolean, default: false, required: false })
</script>

<template>
  <div class="a3-chat">
    <div class="left">
      <Conversations
        v-model:active="conversationActive"
        :items="props.conversationItems"
        :items-style="props.conversationItemsStyle"
        :items-hover-style="props.conversationItemsHoverStyle"
        :items-active-style="props.conversationItemsActiveStyle"
        :items-menu-opened-style="props.conversationItemsMenuOpenedStyle"
        :style="props.conversationStyle"
        :label-max-width="props.conversationLabelMaxWidth"
        :label-height="props.conversationLabelHeight"
        :show-tooltip="props.conversationShowTooltip"
        :tooltip-placement="props.conversationTooltipPlacement"
        :tooltip-offset="props.conversationTooltipOffset"
        :groupable="props.conversationGroupable"
        :ungrouped-title="props.conversationUngroupedTitle"
        :menu="props.conversationMenu"
        :show-built-in-menu="props.conversationShowBuiltInMenu"
        :menu-placement="props.conversationMenuPlacement"
        :menu-offset="props.conversationMenuOffset"
        :menu-show-arrow="props.conversationMenuShowArrow"
        :menu-max-height="props.conversationMenuMaxHeight"
        :menu-style="props.conversationMenuStyle"
        :menu-class-name="props.conversationMenuClassName"
        :menu-teleported="props.conversationMenuTeleported"
        :load-more="props.conversationLoadMore"
        :load-more-loading="props.conversationLoadMoreLoading"
        :show-to-top-btn="props.conversationShowToTopBtn"
        :row-key="props.conversationRowKey"
        :label-key="props.conversationLabelKey"
        @change="(item: ConversationItem) => emit('conversationChange', item)"
        @menu-command="(command: ConversationMenuCommand, item: ConversationItem) => emit('conversationMenuCommand', command, item)"
      >
        <template v-if="$slots.conversationHeader" #header>
          <slot name="conversationHeader" />
        </template>
        <template v-if="$slots.conversationFooter" #footer>
          <slot name="conversationFooter" />
        </template>
        <template v-if="$slots.conversationLabel" #label="scope">
          <slot name="conversationLabel" v-bind="scope" />
        </template>
        <template v-if="$slots.conversationMenu" #menu="scope">
          <slot name="conversationMenu" v-bind="scope" />
        </template>
        <template v-if="$slots.conversationMoreFilled" #more-filled="scope">
          <slot name="conversationMoreFilled" v-bind="scope" />
        </template>
        <template v-if="$slots.conversationGroupTitle" #groupTitle="scope">
          <slot name="conversationGroupTitle" v-bind="scope" />
        </template>
        <template v-if="$slots.conversationLoadMore" #load-more>
          <slot name="conversationLoadMore" />
        </template>
      </Conversations>
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
        <template v-if="$slots.bubbleListAvatar" #avatar="{ item }">
          <slot name="bubbleListAvatar" :item="item" />
        </template>
        <template v-if="$slots.bubbleListHeader" #header="{ item }">
          <slot name="bubbleListHeader" :item="item" />
        </template>
        <template v-if="$slots.bubbleListContent" #content="{ item }">
          <slot name="bubbleListContent" :item="item" />
        </template>
        <template v-if="$slots.bubbleListFooter" #footer="{ item }">
          <slot name="bubbleListFooter" :item="item" />
        </template>
        <template v-if="$slots.bubbleListLoading" #loading="{ item }">
          <slot name="bubbleListLoading" :item="item" />
        </template>
        <template v-if="$slots.bubbleListBackToBottom" #backToBottom>
          <slot name="bubbleListBackToBottom" />
        </template>
      </BubbleList>
      <Sender
        v-model="senderValue"
        v-model:trigger-popover-visible="senderTriggerPopoverVisible"
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
        <template v-if="$slots.senderHeader" #header>
          <slot name="senderHeader" />
        </template>
        <template v-if="$slots.senderFooter" #footer>
          <slot name="senderFooter" />
        </template>
        <template v-if="$slots.senderPrefix" #prefix>
          <slot name="senderPrefix" />
        </template>
        <template v-if="$slots.senderActionList" #action-list>
          <slot name="senderActionList" />
        </template>
        <template v-if="$slots.senderTriggerPopover" #trigger-popover="scope">
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
