module.exports = {
  testMatch: ["**/test/*.test.js", "!**/src/**"],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
};