import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "prettier";

export default tseslint.config(
  {
    ignores: [
      "node_modules/",
      "out",
      ".prettierrc.js",
      ".eslintrc.cjss",
      "vite.config.ts",
      "dist",
      ".eslintrc.json",
      "vite.config.ts",
      "electron.vite.config.ts",
    ],
    plugins: {
      "prettier/prettier": prettier,
      "@typescript-eslint": tseslint.plugin,
    },
    files: ["**/*.ts", "**/*.tsx"],
  },
  eslint.configs.recommended,
  // ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { browser: true, es2020: true },
      parser: tseslint.parser,
      parserOptions: {
        // tsconfigRootDir: import.meta.dirname,
        // project: "./tsconfig.json",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
      "no-console": "warn",
      "no-extra-boolean-cast": "off",
      "prefer-const": "error",
    },
  }
);
