import type { BubbleProps } from "../../../../packages/components/types/components/Bubble/type";
import type { BubbleListProps } from "../../../../packages/components/types/components/BubbleList/type";

let avatar =
  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";

export type MessageItem = BubbleProps & {
  key: number;
  role: "ai" | "user";
  avatar: string;
};

export const messageArr: BubbleListProps<MessageItem>["list"] = [
  {
    key: 1,
    role: "ai",
    placement: "start",
    content:
      "这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息",
    loading: true,
    shape: "corner",
    variant: "filled",
    isMarkdown: false,
    typing: { step: 2, suffix: "💗" },
    avatar: avatar,
  },
  {
    key: 2,
    role: "user",
    placement: "end",
    content: "这是用户的消息",
    loading: true,
    shape: "corner",
    variant: "outlined",
    isMarkdown: false,
    avatar: avatar,
  },
  {
    key: 1,
    role: "ai",
    placement: "start",
    content:
      "这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息",
    loading: true,
    shape: "corner",
    variant: "filled",
    isMarkdown: false,
    typing: { step: 2, suffix: "💗" },
    avatar: avatar,
  },
  {
    key: 2,
    role: "user",
    placement: "end",
    content: "这是用户的消息",
    loading: true,
    shape: "corner",
    variant: "outlined",
    isMarkdown: false,
    avatar: avatar,
  },
  {
    key: 1,
    role: "ai",
    placement: "start",
    content:
      "这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息",
    loading: true,
    shape: "corner",
    variant: "filled",
    isMarkdown: false,
    typing: { step: 2, suffix: "💗" },
    avatar: avatar,
  },
  {
    key: 2,
    role: "user",
    placement: "end",
    content: "这是用户的消息",
    loading: true,
    shape: "corner",
    variant: "outlined",
    isMarkdown: false,
    avatar: avatar,
  },
  {
    key: 1,
    role: "ai",
    placement: "start",
    content:
      "这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息",
    loading: true,
    shape: "corner",
    variant: "filled",
    isMarkdown: false,
    typing: { step: 2, suffix: "💗" },
    avatar: avatar,
  },
  {
    key: 2,
    role: "user",
    placement: "end",
    content: "这是用户的消息",
    loading: true,
    shape: "corner",
    variant: "outlined",
    isMarkdown: false,
    avatar: avatar,
  },
];
