import { type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import prismjsPlugin from './prismjs';
import autoImportPlugin from './autoImport';
import dtsPlugin from './dts';

const plugins: PluginOption[] = [
  vue({
    script: {
      propsDestructure: true
    }
  }),
  prismjsPlugin,
  ...autoImportPlugin,
  dtsPlugin,
];

export default plugins;
