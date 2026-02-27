export default [
  {
    files: ['*.ts', '*.js'], //apply to TypeScript and JavaScript files
    rules: {
      semi: 'error', //force semicolons
      'no-unused-vars': 'warn', //warn about unused variables
    },
  },
];
