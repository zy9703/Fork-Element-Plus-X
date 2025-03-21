import { type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import prismjsPlugin from './prismjs';
import autoImportPlugin from './autoImport';
import dtsPlugin from './dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const plugins: PluginOption[] = [
  vue({
    script: {
      propsDestructure: true
    }
  }),
  prismjsPlugin,
  ...autoImportPlugin,
  dtsPlugin,
  libInjectCss() as PluginOption
];

export default plugins;
