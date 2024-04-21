// const eslintParser = require("@typescript-eslint/parser");
// const reactRefresh = require("react-refresh");
// const tseslint = require("react-refresh");

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "prettier";
// import reactRefresh from "react-refresh";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { browser: true, es2020: true },
      // parser: eslintParser,
    },
    // extends: [
    //   "eslint:recommended",
    //   "plugin:@typescript-eslint/recommended",
    //   "plugin:react-hooks/recommended",
    //   "plugin:import/recommended",
    //   "plugin:import/errors",
    //   "plugin:import/warnings",

    //   "plugin:prettier/recommended",
    //   "plugin:react/recommended",
    //   "react-app",
    // ],
    // ignorePatterns: [
    //   "dist",
    //   ".eslintrc.json",
    //   "vite.config.ts",
    //   "electron.vite.config.ts",
    // ],

    plugins: {
      // "react-refresh": reactRefresh,
      "prettier/prettier": prettier,
    },
    rules: {
      // "react-refresh/only-export-components": [
      //   "warn",
      //   { allowConstantExport: true },
      // ],
      // semi: "off",
      // "no-console": "warn",
      // "no-unused-vars": "off",
      // "@typescript-eslint/no-unused-vars": ["error"],
      // // "prettier/prettier": [
      // //   "error",
      // //   {
      // //     endOfLine: "auto",
      // //   },
      // // ],
      // "@typescript-eslint/consistent-type-imports": [
      //   "warn",
      //   {
      //     prefer: "type-imports",
      //     disallowTypeAnnotations: true,
      //     fixStyle: "separate-type-imports",
      //   },
      // ],
    },
    // overrides: [
    //   {
    //     files: ["src/main/**/*.{ts,tsx}"],
    //     env: {
    //       node: true,
    //     },
    //   },
    //   {
    //     files: ["src/renderer/**/*.{ts,tsx}"],
    //     env: {
    //       browser: true,
    //       node: false,
    //     },
    //   },
    //   {
    //     files: ["src/preload/**/*.{ts,tsx}"],
    //     env: {
    //       node: true,
    //     },
    //   },
    // ],
    ignores: [
      "node_modules/",
      "out/*",
      ".prettierrc.js",
      ".eslintrc.cjss",
      "vite.config.ts",
      "dist",
      ".eslintrc.json",
      "vite.config.ts",
      "electron.vite.config.ts",
    ],
  }
);
