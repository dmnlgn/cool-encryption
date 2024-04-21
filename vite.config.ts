import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import eslintPlugin from "vite-plugin-eslint";
import eslint from "vite-plugin-eslint2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // react(),
    // eslintPlugin({
    //   emitWarning: true,
    //   // exclude: [/virtual:/, /node_modules/],
    // }),
    eslint(),
  ],
  resolve: {
    alias: {
      "@": "/src", // Set the alias to the root of your "src" directory
    },
  },
});
