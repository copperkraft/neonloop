module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  ignorePatterns: [
    '.eslintrc.js'
  ],
  rules: {
    'react/require-default-props': 0, // interferes with typescript interfaces
    'import/prefer-default-export': 0, // i consider export default a bad practice
    'import/no-default-export': 2
  }
};
