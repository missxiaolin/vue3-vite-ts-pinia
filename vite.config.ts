// @ts-nocheck

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import path from 'path'

function resolve(dir) {
  return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  //启动服务配置
  server: {
    host: '0.0.0.0',
    port: 8011,
    open: true,
    https: false,
    proxy: {},
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  //去除 console debugger
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
