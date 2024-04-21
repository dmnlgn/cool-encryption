import eslint from "@eslint/js";
import prettier from "prettier";
import tseslint from "typescript-eslint";

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
  {
    languageOptions: {
      globals: { browser: true, es2020: true },
      parser: tseslint.parser,
      parserOptions: {
        // tsconfigRootDir: __dirname,
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
    settings: {
      "import/resolver": {
        alias: {
          extension: [".ts", ".tsx"],
          map: ["@", "./src/renderer"],
        },
      },
    },
  }
);
