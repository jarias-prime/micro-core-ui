import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';
import Components from 'unplugin-vue-components/vite';
import dts from 'vite-plugin-dts';
import gzipPlugin from 'rollup-plugin-gzip';
import tailwindcss from '@tailwindcss/vite';

import { resolve } from 'path';

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    tailwindcss(),
    tsconfigPaths(),
    Components(),
    ...(command === 'build'
      ? [
          dts({
            include: ['lib/**/*.ts', 'src/components/**/*.ts', 'src/components/**/*.vue'],
            outDir: 'dist',
            insertTypesEntry: true,
            copyDtsFiles: false,
            staticImport: true,
            rollupTypes: true,
            exclude: ['src/**/*.spec.ts', 'tests/**/*'],
            compilerOptions: {
              composite: false,
              declaration: true,
              declarationMap: false,
            },
            beforeWriteFile: (filePath, content) => {
              return { filePath, content };
            },
            logLevel: 'silent',
          }),
          gzipPlugin(),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  ...(command === 'build' && {
    build: {
      lib: {
        entry: resolve(__dirname, 'lib/main.ts'),
        name: 'MicroCoreUI',
        fileName: (format) => `micro-core-ui.${format}.js`,
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
          exports: 'named',
        },
      },
      cssCodeSplit: true,
    },
  }),
}));
