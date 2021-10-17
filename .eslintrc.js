

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@netsells'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": 0,
    "require-jsdoc-except": "off",
    "require-jsdoc-except": 0
  },
}
