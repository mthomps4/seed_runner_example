module.exports = {
  extends: ['plugin:echobind/react'],
  ignorePatterns: ['generated', 'node_modules/', 'types', 'cypress', 'scripts'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
  },
};
