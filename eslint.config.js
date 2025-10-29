import {FlatCompat} from '@eslint/eslintrc-legacy';
import eslintRecommended from 'eslint/conf/eslint-recommended.js';
import eslintAll from 'eslint/conf/eslint-all.js';

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // используем базовые правила ESLint
  ...compat.config(eslintRecommended),
  // React/React Native правила
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      react: require('eslint-plugin-react'),
      'react-native': require('eslint-plugin-react-native'),
    },
    rules: {
      'no-unused-vars': 'warn',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
