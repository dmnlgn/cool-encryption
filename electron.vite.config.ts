import { defineConfig } from "electron-vite";

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    plugins: [],
    resolve: {
      alias: {
        "@": "/src/renderer",
      },
    },
  },
});
