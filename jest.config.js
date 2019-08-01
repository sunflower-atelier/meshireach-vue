module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$'  : '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper: {
    '\~\/(.+)': '<rootDir>/$1'
  }
}
