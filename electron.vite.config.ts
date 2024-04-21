import { defineConfig } from "electron-vite";

import eslint from "vite-plugin-eslint2";

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    plugins: [eslint()],
    resolve: {
      alias: {
        "@": "/src", // Set the alias to the root of your "src" directory
      },
    },
  },
});
