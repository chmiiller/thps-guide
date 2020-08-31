module.exports = {
  root: true,
  extends: 'airbnb',
  rules: {
      "no-use-before-define": ["error", { "variables": false }],
      "max-len": ["error", { "code": 120 }],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "indent": ["error", 4 , {"SwitchCase": 1, "MemberExpression": "off" }],
      "react/jsx-indent": ["error", 4],
      "react/jsx-indent-props": ["error", 4],
      "react/forbid-prop-types": ["warn", {
          "forbid": ["any", "array", "object"],
          "checkContextTypes": false,
          "checkChildContextTypes": false
      }],
      "import/no-unresolved": [2, { "ignore": ['^src/|^rubik/'] }],
      "import/no-extraneous-dependencies": 0,
      "import/prefer-default-export": 0,
      "no-underscore-dangle": 0,
      "global-require": 0,
      "no-console": 0
  },
  settings: {
      "import/resolver": {
          "node": {
              "paths": ["src"]
          }
      }
  },
  globals: {
      "fetch": false
  }
};
