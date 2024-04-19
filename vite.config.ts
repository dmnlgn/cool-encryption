import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      emitWarning: true,
      exclude: [/virtual:/, /node_modules/, /sb-preview/],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
