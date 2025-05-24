// 需要安装依赖:  npm i eslint-define-config
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  globals: {},
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", 
    "prettier",
    "plugin:prettier/recommended",
    "./.eslintrc-auto-import.json",
  ],
  rules: {
    "no-var": "error",
    semi: "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-explicit-any": "off", 
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          // add a custom message to help explain why not to use it
          Foo: "Don't use Foo because it is unsafe",

          // add a custom message, AND tell the plugin how to fix it
          String: {
            message: "Use string instead",
            fixWith: "string",
          },

          "{}": {
            message: "Use object instead",
            fixWith: "object",
          },
        },
      },
    ],
    // 禁止出现未使用的变量
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "vue/html-indent": "off",
    // 关闭此规则 使用 prettier 的格式化规则，
    "vue/max-attributes-per-line": ["off"],
    // vue3.2.25之后为props使用解耦赋值语法，删除警告
    "vue/no-setup-props-destructure": "off",
    // 优先使用驼峰，element 组件除外
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        ignores: ["/^el-/", "/^router-/"],
        registeredComponentsOnly: false,
      },
    ],
    // 强制使用驼峰
    camelcase: ["error", { properties: "always" }],
    // 优先使用 const
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
  },
});
