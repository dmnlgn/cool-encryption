import eslint from "@eslint/js";
import prettier from "prettier";
import tseslint from "typescript-eslint";
import importEslint from "eslint-plugin-import";
// import path from "path";
// import importResolver from "eslint-import-resolver-typescript";

export default tseslint.config(
  eslint.configs.recommended,
  {
    plugins: {
      "prettier/prettier": prettier,
      "@typescript-eslint": tseslint.plugin,
      // import
      // import: importEslint,
      // import: importResolver,
      // "import/resolver": importResolverTypeScript,
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
      // "import/no-unresolved": ["error", { caseSensitive: false }],
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
      // "import/no-unresolved": ["error", { caseSensitive: false }],
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
        // alias: {
        //   map: [["@", "./src/renderer/src"]],
        // },
        // alias: {
        //   // map: [["@", "."]],
        //   // map: [["@", "./src/renderer/src"]],
        // },
      },
    },
    // settings: {
    //   "import/resolver2": {
    //     alias: {
    //       map: [["@", "./src/renderer/src"]],
    //       extensions: [".ts", ".tsx"],
    //     },
    //   },
    //   // "import/resolver": { "eslint-import-resolver-typescript": true },
    // },
  }
);
