export interface BubbleProps {
  content?: string;
  placement?: "start" | "end";
  loading?: boolean;
  shape?: "round" | "corner";
  variant?: "filled" | "borderless" | "outlined" | "shadow";
  isMarkdown?: boolean;
  typing?: boolean | { speed: number; suffix: string };
  maxWidth?: string;
  avatarSize?: string;
  avatarGap?: string;
}
