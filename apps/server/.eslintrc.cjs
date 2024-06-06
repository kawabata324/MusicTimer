/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/index.cjs'],
  parserOptions: {
    project: '../../apps/server/tsconfig.json',
  },
  settings: {
    // see src/pages/_app.tsx
    polyfills: ['Object.hasOwn'],
  },
};
