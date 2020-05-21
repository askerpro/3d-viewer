module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'react-app',
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  rules: {
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['draft'] },
    ],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx'],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      typescript: {
        directory: __dirname,
      },
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
