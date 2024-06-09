/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "import-access"],
  extends: [
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    /*
     * =============== error ===============
     */
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "import-access/jsdoc": [
      "error",
      {
        defaultImportability: "package",
      },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling"],
        pathGroups: [
          {
            pattern: "src/**",
            group: "internal",
            position: "before",
          },
        ],
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
    /**
     * import文のアクセス制御に関するルールを指定する
     * デフォルトをpackageにしてJSDocでスコープを指定する
     * @see https://github.com/uhyo/eslint-plugin-import-access/blob/master/docs/rule-jsdoc.md
     * @example
     * // ----- sub/foo.ts -----
     * /**
     *  * /@package
     *  * /
     * export const fooPackageVariable = "I am package-private export";
     *
     * 🟢 // ----- sub/bar.ts -----
     * import { fooPackageVariable } from "./foo";
     * 🔴 // ----- baz.ts -----
     * import { fooPackageVariable } from "./sub/foo";
     */
    "import-access/jsdoc": [
      "error",
      {
        defaultImportability: "package",
      },
    ],

    /**
     * =============== off ===============
     */
    "@typescript-eslint/interface-name-prefix": "off",
    "import/no-unresolved": "off",
  },
};
