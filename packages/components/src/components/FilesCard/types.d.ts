export type FilesType = 'word' | 'excel' | 'ppt' | 'pdf' | 'txt' | 'image' | 'audio' | 'video' | 'three' | 'code' | 'database' | 'link' | 'zip' | 'file' | 'unknown'

export interface FilesCardProps {
  uid?: string | number
  name?: string
  fileSize?: number
  fileType?: FilesType
  description?: string
  url?: string
  thumbUrl?: string
  fontSize?: string
  iconColor?: string
  maxWidth?: string
  noStyle?: boolean
}
