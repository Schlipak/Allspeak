module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-param-reassign': ['error', { props: false }],
    'prefer-promise-reject-errors': 0,
  },
};
