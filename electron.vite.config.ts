import { defineConfig } from "electron-vite";
import path from "path";
import react from "@vitejs/plugin-react";
import eslintVite from "vite-plugin-eslint2";

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    plugins: [
      react(),
      eslintVite({
        cache: false,
        fix: (props) => {
          console.log("mess", props);

          return true;
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/renderer/src"),
      },
    },
  },
});
