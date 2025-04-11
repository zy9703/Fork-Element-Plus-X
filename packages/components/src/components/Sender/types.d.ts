export interface SenderProps {
  modelValue?: string
  placeholder?: string
  autoSize?: {
    minRows: number
    maxRows: number
  }
  readOnly?: boolean
  disabled?: boolean
  loading?: boolean
  clearable?: boolean
  allowSpeech?: boolean
  submitType?: 'enter' | 'shiftEnter'
  headerAnimationTimer?: number
  inputWidth?: string
  triggerStrings?: string[]
  triggerPopoverVisible?: boolean // 指令提示框是否可见
  triggerPopoverWidth?: string
  triggerPopoverLeft?: string
  triggerPopoverOffset?: number
  triggerPopoverPlacement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
}

export interface TriggerEvent {
  oldValue: string // 明确触发的字符
  newValue: string // 当前输入框的值
  isOpen: boolean // 弹窗状态
}
