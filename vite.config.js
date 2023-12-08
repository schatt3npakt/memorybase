import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    mkcert(),
    vue(),
    VitePWA({
      includeAssets: ["favicon.ico", "icon.png"],
      manifest: {
        name: "Memory!",
        short_name: "Memory!",
        description: "A description for the mmemory app!",
        theme_color: "#93c5fd",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    https: true,
  },
})
