const js = require('@eslint/js');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const globals = require('globals');
// 1. ИМПОРТИРУЕМ ПЛАГИН JEST
const jestPlugin = require('eslint-plugin-jest');

module.exports = [
  // -------------------------------------------------------------------
  // 1. БАЗОВАЯ КОНФИГУРАЦИЯ (для всех JS/TS файлов)
  // -------------------------------------------------------------------
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      // Включаем рекомендуемые правила TypeScript-ESLint
      ...typescriptEslint.configs.recommended.rules,
    },
  },

  // -------------------------------------------------------------------
  // 2. КОНФИГУРАЦИЯ JEST (применяется только к тестовым файлам)
  // -------------------------------------------------------------------
  {
    // Применяем эту конфигурацию только к файлам тестов
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      // !!! ДОБАВЛЯЕМ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ JEST
      globals: {
        ...globals.jest,
      },
    },

    plugins: {
      // Включаем плагин Jest
      jest: jestPlugin,
    },

    rules: {
      // Применяем рекомендуемые правила Jest
      ...jestPlugin.configs.recommended.rules,
      // Отключаем no-undef в тестах, чтобы избежать конфликтов
      'no-undef': 'off',
    },
  },
];
