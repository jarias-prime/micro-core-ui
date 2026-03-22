import { fileURLToPath, URL } from 'url';

export default {
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('../src', import.meta.url)) },
  },
  server: {
    port: 8888,
  },
};
