import eslint from "@eslint/js";
import prettier from "prettier";
import tseslint from "typescript-eslint";
import importEslint from "eslint-plugin-import";

export default tseslint.config(
  eslint.configs.recommended,
  {
    plugins: {
      "prettier/prettier": prettier,
      "@typescript-eslint": tseslint.plugin,
    },
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: { browser: true, es2020: true },
      parser: tseslint.parser,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
      "no-console": "warn",
      "no-extra-boolean-cast": "off",
      "prefer-const": "error",
    },
  },
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
  },
  {
    plugins: { import: importEslint },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["./*", "../*"],
              message: "Usage of relative parent imports is not allowed.",
            },
          ],
        },
      ],
    },
    files: ["src/renderer/**/*"],
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
  }
);
