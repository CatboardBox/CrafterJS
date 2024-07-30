module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "enum",
        format: ["PascalCase"],
      },
      {
        selector: "enumMember",
        format: ["PascalCase"],
      },
      {
        selector: "function",
        format: ["camelCase"],
      },
      {
        selector:'method',
        format: ['camelCase']
      }
      // Add more rules as needed
    ],
  },
};
