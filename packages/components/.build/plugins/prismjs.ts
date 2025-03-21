import prismjsPlugin from "vite-plugin-prismjs";
import type { PluginOption } from "vite";

export default prismjsPlugin({
  languages: "all", // 语言
  plugins: [
    "line-numbers",
    "show-language",
    "copy-to-clipboard",
    "inline-color",
  ],
  theme: "default", // 主题
  css: true,
}) as PluginOption
