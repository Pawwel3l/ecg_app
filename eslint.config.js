module.exports = {
  root: true,
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: {
    react: require('eslint-plugin-react'),
    'react-native': require('eslint-plugin-react-native'),
  },
  linterOptions: {
    reportUnusedDisableDirectives: 'error',
  },
  rules: {
    'no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      rules: {},
    },
  ],
};
